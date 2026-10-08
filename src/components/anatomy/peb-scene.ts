import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Procedural pre-engineered building that assembles as `stage` advances.
 *
 * Stages follow Orion's six erection milestones, then fit-out and handover:
 * 0 anchor bolts, 1 columns, 2 rafters, 3 purlins/girts/bracing,
 * 4 roof sheets, 5 wall cladding, 6 structural utilities, 7 complete.
 * `stage` is continuous (0..STAGE_COUNT); within each stage the camera moves
 * first, then that stage's members are lifted into place in order.
 */
export const STAGE_COUNT = 8;

type SystemKey = "primary" | "secondary" | "cladding" | "utilities";

// Geometry, in metres.
const HALF = 12; // half span
const LENGTH = 48;
const BAY = 6;
const PED = 0.6; // pedestal height
const EAVE = 8;
const RISE = 1.2; // ridge rise (1:10 roof)
const TOP = PED + EAVE;
const FRAMES = LENGTH / BAY + 1;
const SLOPE = Math.atan2(RISE, HALF);
const SLOPE_LEN = Math.hypot(HALF, RISE);

// Highlight strength per system: lighter materials need less to read as rust.
const GLOW: Record<"primary" | "secondary" | "cladding" | "utilities", number> = {
  primary: 0.5,
  secondary: 0.22,
  cladding: 0.18,
  utilities: 0.3,
};

const NAVY = 0x0e1d31;
const RUST = new THREE.Color(0xc2622e);
const APRICOT = 0xe0916a;

type Piece = {
  obj: THREE.Object3D;
  home: THREE.Vector3;
  offset: THREE.Vector3;
  t0: number; // stage time at which the lift starts
};

// Which system glows (and how much) for each integer stage.
const HIGHLIGHT: (SystemKey | null)[] = [
  null,
  "primary",
  "primary",
  "secondary",
  "cladding",
  "cladding",
  "utilities",
  null,
];

// Camera position and look-at per stage, framed for a landscape viewport.
const CAMERA: [number, number, number, number, number, number][] = [
  [-21, 5, 33, -12, 0.6, 22], // anchor bolts, close on a corner
  [-36, 15, 46, -1, 4, 8],
  [-40, 22, 40, 0, 6, 0],
  [32, 26, 38, 0, 7, 0],
  [38, 36, 30, 0, 6, 0],
  [42, 14, 40, 0, 4, 0],
  [36, 9, 28, -3, 4.5, -3], // cut-away view inside
  [50, 22, 48, 0, 4, 0], // finished shell, dock side
];

function smooth(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function easeOut(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 3);
}

/** Box member along +Y from 0..len whose X depth tapers from d0 to d1. */
function taperedMember(len: number, d0: number, d1: number, w: number) {
  const g = new THREE.BoxGeometry(1, 1, 1);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) + 0.5;
    pos.setX(i, pos.getX(i) * (d0 + (d1 - d0) * y));
    pos.setY(i, y * len);
    pos.setZ(i, pos.getZ(i) * w);
  }
  g.computeVertexNormals();
  return g;
}

/** Profiled-sheet texture: ribs along U (vertical stripes) or V. */
function ribTexture(base: string, rib: string, axis: "u" | "v") {
  const c = document.createElement("canvas");
  c.width = axis === "u" ? 64 : 8;
  c.height = axis === "u" ? 8 : 64;
  const x = c.getContext("2d")!;
  x.fillStyle = base;
  x.fillRect(0, 0, c.width, c.height);
  const stripe = (from: number, size: number, color: string) => {
    x.fillStyle = color;
    if (axis === "u") x.fillRect(from, 0, size, c.height);
    else x.fillRect(0, from, c.width, size);
  };
  stripe(0, 9, rib);
  stripe(10, 3, "rgba(255,255,255,0.35)");
  stripe(40, 2, "rgba(0,0,0,0.08)");
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function createPebScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  });
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(NAVY);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(NAVY);
  scene.fog = new THREE.Fog(NAVY, 95, 200);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.5;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.5, 400);

  // Lights: warm low sun for long shadows, cool sky fill.
  scene.add(new THREE.HemisphereLight(0xdfe8f5, NAVY, 0.7));
  const sun = new THREE.DirectionalLight(0xffe4c8, 2.0);
  sun.position.set(-34, 46, 28);
  sun.castShadow = true;
  sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
  const sc = sun.shadow.camera;
  sc.left = -42;
  sc.right = 42;
  sc.top = 42;
  sc.bottom = -42;
  sc.near = 10;
  sc.far = 140;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);

  // Ground and the brand blueprint grid.
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500).rotateX(-Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x13243b, roughness: 1 })
  );
  ground.receiveShadow = true;
  scene.add(ground);
  const grid = new THREE.GridHelper(240, 120, APRICOT, APRICOT);
  const gridMat = grid.material as THREE.LineBasicMaterial;
  gridMat.transparent = true;
  gridMat.opacity = 0.13;
  gridMat.depthWrite = false;
  grid.position.y = 0.012;
  scene.add(grid);

  // Materials, one set per structural system so each can be highlighted.
  const std = (p: THREE.MeshStandardMaterialParameters) =>
    new THREE.MeshStandardMaterial(p);
  const mats = {
    concrete: std({ color: 0x5c636a, roughness: 0.95 }),
    bolt: std({ color: 0x6a7179, metalness: 0.8, roughness: 0.35 }),
    primary: std({ color: 0x33465c, metalness: 0.55, roughness: 0.45 }),
    secondary: std({ color: 0xb2bcc6, metalness: 0.85, roughness: 0.3 }),
    roofFar: std({ map: ribTexture("#c9d0d6", "#aeb7bf", "v"), metalness: 0.6, roughness: 0.38 }),
    roofNear: std({ map: ribTexture("#c9d0d6", "#aeb7bf", "v"), metalness: 0.6, roughness: 0.38, transparent: true }),
    wallFar: std({ map: ribTexture("#e4e8eb", "#c8cfd5", "u"), metalness: 0.35, roughness: 0.5 }),
    wallNear: std({ map: ribTexture("#e4e8eb", "#c8cfd5", "u"), metalness: 0.35, roughness: 0.5, transparent: true }),
    bandFar: std({ map: ribTexture("#b9592b", "#9c4a22", "u"), metalness: 0.3, roughness: 0.55 }),
    bandNear: std({ map: ribTexture("#b9592b", "#9c4a22", "u"), metalness: 0.3, roughness: 0.55, transparent: true }),
    door: std({ map: ribTexture("#5a6674", "#4a5562", "v"), metalness: 0.5, roughness: 0.5, transparent: true }),
    skylight: std({ color: 0xf2f6fa, emissive: 0xffffff, emissiveIntensity: 0.12, roughness: 0.2, transparent: true, opacity: 0.6 }),
    crane: std({ color: 0xd6a22a, metalness: 0.4, roughness: 0.5 }),
    mezz: std({ color: 0x46596f, metalness: 0.5, roughness: 0.5 }),
    canopy: std({ map: ribTexture("#c9d0d6", "#aeb7bf", "v"), metalness: 0.6, roughness: 0.4 }),
  };
  const systemMats: Record<SystemKey, THREE.MeshStandardMaterial[]> = {
    primary: [mats.primary],
    secondary: [mats.secondary],
    cladding: [mats.roofFar, mats.roofNear, mats.wallFar, mats.wallNear, mats.bandFar, mats.bandNear, mats.door],
    utilities: [mats.crane, mats.mezz, mats.canopy],
  };
  // Near-side shell fades out for the inside view at stage 6.
  const cutaway = [mats.roofNear, mats.wallNear, mats.bandNear, mats.door];
  for (const list of Object.values(systemMats)) {
    for (const m of list) m.emissive = m.emissive ?? new THREE.Color();
  }

  const pieces: Piece[] = [];
  const root = new THREE.Group();
  scene.add(root);

  const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material) => {
    const m = new THREE.Mesh(geo, mat);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  };
  const add = (
    obj: THREE.Object3D,
    stage: number,
    order: number,
    offset: [number, number, number]
  ) => {
    root.add(obj);
    pieces.push({
      obj,
      home: obj.position.clone(),
      offset: new THREE.Vector3(...offset),
      t0: stage + 0.35 + order * 0.45,
    });
  };

  const frameZ = (i: number) => -LENGTH / 2 + i * BAY;
  const sides = [-1, 1];

  // Stage 0: floor slab, pedestals and anchor bolts.
  const slab = mesh(new THREE.BoxGeometry(HALF * 2 + 1.2, 0.12, LENGTH + 1.2), mats.concrete);
  slab.position.set(0, 0.06, 0);
  add(slab, -1, 0, [0, -0.5, 0]); // already in place when the section pins
  const boltGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.4, 8);
  for (let i = 0; i < FRAMES; i++) {
    for (const s of sides) {
      const g = new THREE.Group();
      const ped = mesh(new THREE.BoxGeometry(1, PED, 0.8), mats.concrete);
      ped.position.y = PED / 2;
      g.add(ped);
      for (const [bx, bz] of [[-0.22, -0.16], [0.22, -0.16], [-0.22, 0.16], [0.22, 0.16]]) {
        const b = mesh(boltGeo, mats.bolt);
        b.position.set(bx, PED + 0.12, bz);
        g.add(b);
      }
      g.position.set(s * HALF, 0, frameZ(i));
      // Nearest the opening camera first, starting almost at once.
      add(g, -0.3, (FRAMES - 1 - i + (s > 0 ? 0.5 : 0)) / FRAMES, [0, -1.2, 0]);
    }
  }

  // Stage 1: tapered columns with base plates, hoisted in from above.
  const columnGeo = taperedMember(EAVE, 0.42, 0.78, 0.3);
  for (let i = 0; i < FRAMES; i++) {
    for (const s of sides) {
      const g = new THREE.Group();
      const plate = mesh(new THREE.BoxGeometry(0.7, 0.05, 0.5), mats.primary);
      plate.position.y = 0.025;
      g.add(plate);
      const col = mesh(columnGeo, mats.primary);
      col.position.x = -s * 0.1; // inner flange stays plumb as depth grows
      g.add(col);
      g.position.set(s * HALF, PED, frameZ(i));
      add(g, 1, (i + (s > 0 ? 0.5 : 0)) / FRAMES, [0, 12, 0]);
    }
  }

  // Stage 2: rafters from each eave to the ridge, plus ridge splice plates.
  const rafterGeo = taperedMember(SLOPE_LEN + 0.2, 0.78, 0.42, 0.28);
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < FRAMES; i++) {
    const g = new THREE.Group();
    for (const s of sides) {
      const r = mesh(rafterGeo, mats.primary);
      const dir = new THREE.Vector3(-s * HALF, RISE, 0).normalize();
      r.quaternion.setFromUnitVectors(up, dir);
      r.position.set(s * (HALF + 0.1), TOP - 0.25, 0);
      g.add(r);
    }
    const splice = mesh(new THREE.BoxGeometry(0.3, 0.7, 0.36), mats.primary);
    splice.position.set(0, TOP + RISE - 0.25, 0);
    g.add(splice);
    g.position.z = frameZ(i);
    add(g, 2, i / FRAMES, [0, 9, 0]);
  }

  // Stage 3: Z-purlins on the roof, C-girts on the walls, end-bay bracing.
  const rafterTop = (f: number) => TOP - 0.25 + RISE * f + 0.42;
  const purlinGeo = new THREE.BoxGeometry(0.09, 0.22, LENGTH + 0.6);
  const fractions = [0.03, 0.16, 0.29, 0.42, 0.55, 0.68, 0.81, 0.95];
  fractions.forEach((f, k) => {
    for (const s of sides) {
      const p = mesh(purlinGeo, mats.secondary);
      p.position.set(s * HALF * (1 - f), rafterTop(f), 0);
      p.rotation.z = -s * SLOPE;
      add(p, 3, (k / fractions.length) * 0.55, [0, 6, 0]);
    }
  });
  const girtGeo = new THREE.BoxGeometry(0.09, 0.22, LENGTH + 0.4);
  const girtHeights = [1.9, 3.7, 5.5, 7.3];
  girtHeights.forEach((y, k) => {
    for (const s of sides) {
      const gt = mesh(girtGeo, mats.secondary);
      gt.position.set(s * (HALF + 0.3), y, 0);
      add(gt, 3, 0.2 + (k / girtHeights.length) * 0.4, [s * 5, 0, 0]);
    }
  });
  const rod = (a: THREE.Vector3, b: THREE.Vector3) => {
    const len = a.distanceTo(b);
    const m = mesh(new THREE.CylinderGeometry(0.025, 0.025, len, 6), mats.secondary);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(up, b.clone().sub(a).normalize());
    return m;
  };
  for (const [z0, z1] of [[frameZ(0), frameZ(1)], [frameZ(FRAMES - 2), frameZ(FRAMES - 1)]]) {
    const g = new THREE.Group();
    for (const s of sides) {
      const x = s * (HALF + 0.2);
      g.add(rod(new THREE.Vector3(x, PED + 0.3, z0), new THREE.Vector3(x, TOP - 0.4, z1)));
      g.add(rod(new THREE.Vector3(x, PED + 0.3, z1), new THREE.Vector3(x, TOP - 0.4, z0)));
      const eave = new THREE.Vector3(s * HALF, rafterTop(0) - 0.2, 0);
      const ridge = new THREE.Vector3(0, rafterTop(1) - 0.2, 0);
      g.add(rod(eave.clone().setZ(z0), ridge.clone().setZ(z1)));
      g.add(rod(eave.clone().setZ(z1), ridge.clone().setZ(z0)));
    }
    add(g, 3, 0.75, [0, 4, 0]);
  }

  // Stage 4: galvalume roof sheets bay by bay, skylights, ridge ventilator.
  const roofY = (f: number) => rafterTop(f) + 0.16;
  const sheetGeo = new THREE.BoxGeometry(SLOPE_LEN + 0.7, 0.05, BAY);
  for (const tex of [mats.roofFar.map!, mats.roofNear.map!]) tex.repeat.set(1, BAY / 0.3);
  for (let b = 0; b < FRAMES - 1; b++) {
    for (const s of sides) {
      const sheet = mesh(sheetGeo, s > 0 ? mats.roofNear : mats.roofFar);
      sheet.position.set(s * (HALF / 2 + 0.3), roofY(0.5) - 0.02, frameZ(b) + BAY / 2);
      sheet.rotation.z = -s * SLOPE;
      add(sheet, 4, (b / (FRAMES - 1)) * 0.75 + (s > 0 ? 0.04 : 0), [0, 3.5, 0]);
    }
  }
  const skyGeo = new THREE.BoxGeometry(SLOPE_LEN * 0.62, 0.06, 1.1);
  for (const z of [-15, -3, 9, 21]) {
    for (const s of sides) {
      const sk = mesh(skyGeo, mats.skylight);
      sk.castShadow = false;
      sk.position.set(s * HALF * 0.5, roofY(0.5) + 0.02, z);
      sk.rotation.z = -s * SLOPE;
      add(sk, 4, 0.8, [0, 2, 0]);
    }
  }
  const vent = new THREE.Group();
  const ventBody = mesh(new THREE.BoxGeometry(0.9, 0.5, LENGTH * 0.62), mats.secondary);
  ventBody.position.y = 0.25;
  vent.add(ventBody);
  const ventCap = mesh(new THREE.BoxGeometry(1.5, 0.08, LENGTH * 0.62 + 0.3), mats.roofFar);
  ventCap.position.y = 0.6;
  vent.add(ventCap);
  vent.position.set(0, roofY(1) - 0.05, 0);
  add(vent, 4, 0.9, [0, 3, 0]);

  // Stage 5: wall cladding (rust dado band, light profiled sheet above),
  // end walls with gables, dock shutters and a personnel door.
  const BAND = 1.6;
  const wallUpper = new THREE.BoxGeometry(0.06, TOP - PED - BAND, BAY);
  const wallBand = new THREE.BoxGeometry(0.06, BAND, BAY);
  for (const m of [mats.wallFar, mats.wallNear, mats.bandFar, mats.bandNear]) {
    m.map!.repeat.set(BAY / 0.32, 1);
  }
  for (let b = 0; b < FRAMES - 1; b++) {
    for (const s of sides) {
      const g = new THREE.Group();
      const upper = mesh(wallUpper, s > 0 ? mats.wallNear : mats.wallFar);
      upper.position.y = PED + BAND + (TOP - PED - BAND) / 2;
      const band = mesh(wallBand, s > 0 ? mats.bandNear : mats.bandFar);
      band.position.y = PED + BAND / 2;
      g.add(upper, band);
      g.position.set(s * (HALF + 0.42), 0, frameZ(b) + BAY / 2);
      add(g, 5, (b / (FRAMES - 1)) * 0.7, [s * 5, 0, 0]);
    }
  }
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-HALF - 0.45, PED);
  gableShape.lineTo(HALF + 0.45, PED);
  gableShape.lineTo(HALF + 0.45, TOP + 0.3);
  gableShape.lineTo(0, TOP + RISE + 0.35);
  gableShape.lineTo(-HALF - 0.45, TOP + 0.3);
  gableShape.closePath();
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, { depth: 0.06, bevelEnabled: false });
  const gableMat = std({ map: ribTexture("#e4e8eb", "#c8cfd5", "u"), metalness: 0.35, roughness: 0.5 });
  gableMat.map!.repeat.set(1 / 0.32, 1);
  gableMat.map!.offset.set(0, 0);
  gableMat.emissive = new THREE.Color();
  systemMats.cladding.push(gableMat);
  for (const s of sides) {
    const gable = mesh(gableGeo, gableMat);
    gable.position.z = s * (LENGTH / 2 + 0.42);
    add(gable, 5, 0.75, [0, 0, s * 6]);
  }
  mats.door.map!.repeat.set(1, 14);
  for (const z of [-12, 0, 12]) {
    const door = mesh(new THREE.BoxGeometry(0.12, 4.6, 4.2), mats.door);
    door.position.set(HALF + 0.5, PED + 2.3, z);
    add(door, 5, 0.85, [4, 0, 0]);
  }
  const pDoor = mesh(new THREE.BoxGeometry(1.4, 2.4, 0.12), mats.door);
  pDoor.position.set(-6, PED + 1.2, LENGTH / 2 + 0.52);
  add(pDoor, 5, 0.9, [0, 0, 3]);

  // Stage 6: crane runway brackets and girders, EOT crane, mezzanine,
  // dock canopies.
  const bracketGeo = new THREE.BoxGeometry(0.7, 0.45, 0.32);
  for (let i = 0; i < FRAMES; i++) {
    for (const s of sides) {
      const br = mesh(bracketGeo, mats.mezz);
      br.position.set(s * (HALF - 0.62), 6.0, frameZ(i));
      add(br, 6, (i / FRAMES) * 0.3, [0, 3, 0]);
    }
  }
  for (const s of sides) {
    const runway = mesh(new THREE.BoxGeometry(0.32, 0.6, LENGTH), mats.mezz);
    runway.position.set(s * (HALF - 0.75), 6.5, 0);
    add(runway, 6, 0.32, [0, 4, 0]);
  }
  const crane = new THREE.Group();
  for (const dz of [-0.5, 0.5]) {
    const girder = mesh(new THREE.BoxGeometry(HALF * 2 - 1.3, 0.75, 0.32), mats.crane);
    girder.position.set(0, 7.2, dz);
    crane.add(girder);
  }
  for (const s of sides) {
    const truck = mesh(new THREE.BoxGeometry(0.6, 0.5, 2.6), mats.crane);
    truck.position.set(s * (HALF - 0.75), 7.05, 0);
    crane.add(truck);
  }
  const trolley = mesh(new THREE.BoxGeometry(1.6, 0.7, 1.6), mats.mezz);
  trolley.position.set(-3, 7.85, 0);
  crane.add(trolley);
  const hook = mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.2, 6), mats.bolt);
  hook.position.set(-3, 5.9, 0);
  crane.add(hook);
  crane.position.z = -9;
  add(crane, 6, 0.45, [0, 5, 0]);

  const mezz = new THREE.Group();
  const deck = mesh(new THREE.BoxGeometry(HALF - 0.8, 0.25, BAY * 2 - 0.4), mats.mezz);
  deck.position.set(-HALF / 2 - 0.1, 4.4, 0);
  mezz.add(deck);
  for (const [px, pz] of [[-2, -5.2], [-2, 0], [-2, 5.2]]) {
    const c = mesh(new THREE.BoxGeometry(0.3, 3.8, 0.3), mats.mezz);
    c.position.set(px, PED + 1.9, pz);
    mezz.add(c);
  }
  const rail = mesh(new THREE.BoxGeometry(0.05, 1, BAY * 2 - 0.4), mats.crane);
  rail.position.set(-1.25, 5.0, 0);
  mezz.add(rail);
  for (let k = 0; k < 11; k++) {
    const step = mesh(new THREE.BoxGeometry(1.2, 0.08, 0.32), mats.mezz);
    step.position.set(-0.3 + k * 0.0, PED + 0.35 + k * 0.33, -5.6 + k * 0.32);
    mezz.add(step);
  }
  mezz.position.z = LENGTH / 2 - BAY;
  add(mezz, 6, 0.6, [0, 6, 0]);

  for (const z of [-12, 0, 12]) {
    const canopy = mesh(new THREE.BoxGeometry(2.6, 0.12, 5.6), mats.canopy);
    canopy.position.set(HALF + 1.8, PED + 5.4, z);
    canopy.rotation.z = -0.12;
    add(canopy, 6, 0.75, [3, 0, 0]);
  }

  // State.
  let width = 1;
  let height = 1;
  let current = -1;
  const glow: Record<SystemKey, number> = { primary: 0, secondary: 0, cladding: 0, utilities: 0 };
  let near = 1;
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const tmpA = new THREE.Vector3();
  const tmpB = new THREE.Vector3();

  function framing() {
    // Pull back on narrow screens so the whole frame fits.
    const aspect = width / height;
    return aspect < 0.6 ? 2.85 : aspect < 0.8 ? 2.1 : aspect < 1.2 ? 1.45 : 1.2;
  }

  function placeCamera(stage: number) {
    const k = Math.min(STAGE_COUNT - 1, Math.floor(stage));
    const prev = Math.max(0, k - 1);
    const t = k === 0 ? 1 : smooth((stage - k) / 0.4);
    const a = CAMERA[prev];
    const b = CAMERA[k];
    camLook.set(a[3], a[4], a[5]).lerp(tmpB.set(b[3], b[4], b[5]), t);
    camPos.set(a[0], a[1], a[2]).lerp(tmpA.set(b[0], b[1], b[2]), t);
    camPos.sub(camLook).multiplyScalar(framing()).add(camLook);
    camera.position.copy(camPos);
    camera.lookAt(camLook);
  }

  /** Advance to `stage` (0..STAGE_COUNT). Returns true while still settling. */
  function update(stage: number, dt: number) {
    let busy = false;
    if (stage !== current) {
      current = stage;
      for (const p of pieces) {
        const local = (stage - p.t0) / 0.32;
        p.obj.visible = local > 0;
        if (p.obj.visible) {
          const e = easeOut(local);
          p.obj.position.copy(p.home).addScaledVector(p.offset, 1 - e);
        }
      }
      placeCamera(stage);
      busy = true;
    }

    // Ease highlights and the cut-away toward their targets.
    const k = Math.min(STAGE_COUNT - 1, Math.floor(stage));
    const active = HIGHLIGHT[k];
    const rate = 1 - Math.exp(-dt * 6);
    (Object.keys(glow) as SystemKey[]).forEach((key) => {
      const target = key === active ? GLOW[key] : 0;
      const next = glow[key] + (target - glow[key]) * rate;
      if (Math.abs(next - glow[key]) > 0.002) busy = true;
      glow[key] = Math.abs(target - next) < 0.002 ? target : next;
      for (const m of systemMats[key]) {
        m.emissive.copy(RUST);
        m.emissiveIntensity = glow[key];
      }
    });
    const nearTarget = stage > 6.12 && stage < 6.92 ? 0 : 1;
    const nextNear = near + (nearTarget - near) * rate;
    if (Math.abs(nextNear - near) > 0.002) busy = true;
    near = Math.abs(nearTarget - nextNear) < 0.002 ? nearTarget : nextNear;
    for (const m of cutaway) {
      m.opacity = near;
      m.depthWrite = near > 0.6;
      m.visible = near > 0.02;
    }
    return busy;
  }

  function resize(w: number, h: number) {
    width = Math.max(1, w);
    height = Math.max(1, h);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Desktop: push the building right of the text column.
    // Mobile: lift it above the caption sheet.
    if (width >= 1024) camera.setViewOffset(width, height, -width * 0.2, 0, width, height);
    else camera.setViewOffset(width, height, 0, height * 0.16, width, height);
    // Keep haze proportional to camera distance so far framings stay crisp.
    const fog = scene.fog as THREE.Fog;
    fog.near = 80 * framing();
    fog.far = 170 * framing();
    camera.updateProjectionMatrix();
    current = -1;
  }

  function render() {
    renderer.render(scene, camera);
  }

  function dispose() {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
    });
    const all = new Set<THREE.Material>([...Object.values(mats), gableMat, gridMat]);
    all.forEach((m) => {
      const map = (m as THREE.MeshStandardMaterial).map;
      if (map) map.dispose();
      m.dispose();
    });
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
  }

  return { update, resize, render, dispose };
}
