// Manestream measurement script: headless Chrome over the DevTools protocol.
// No npm dependencies (Node 22+ global WebSocket); uses the installed Google Chrome.
// Fallback for when playwright-cli / chrome-devtools MCP are not installed.
// Run against a production server: npm run build && npx next start -p 3100
// Usage: URL_=http://localhost:3100/ node library/scripts/cdp.mjs <mode> [outDir]
//   shots  <dir>  viewport + per-section screenshots at 375x812 and 1440x900
//   checks        page width at 375/768/1440, tap targets, small text, contrast, reduced motion
//   perf          3 runs, Lighthouse-style mobile throttling: LCP element/time, CLS, bytes
//   eval          EXPR="js expression" evaluated at 375x812
// perf is an approximation, not Lighthouse; report it as such.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const URL_ = process.env.URL_ || "http://localhost:3100/";
const [mode = "shots", outDir = "."] = process.argv.slice(2);
const PORT = 9333 + Math.floor(Math.random() * 500);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${join(tmpdir(), `cdp-profile-${PORT}`)}`,
  "--no-first-run", "--hide-scrollbars", "--mute-audio", "--autoplay-policy=no-user-gesture-required",
], { stdio: "ignore" });

async function getJSON(path, method = "GET") {
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}${path}`, { method }); return await r.json(); }
    catch { await sleep(200); }
  }
  throw new Error("chrome not reachable");
}

async function openPage() {
  const t = await getJSON("/json/new?about:blank", "PUT");
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pending = new Map(); const listeners = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
    else listeners.forEach((l) => l(m));
  });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expr) => { const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500)); return r.result.value; };
  return { send, evaluate, on: (f) => listeners.push(f), close: () => ws.close() };
}

async function setViewport(p, w, h) {
  await p.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  if (w < 768) await p.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
}

async function load(p, url = URL_, wait = 4500) {
  await p.send("Page.enable");
  const loaded = new Promise((r) => p.on((m) => m.method === "Page.loadEventFired" && r()));
  await p.send("Page.navigate", { url });
  await loaded; await sleep(wait);
}

// Scroll through the page so whileInView reveals fire, then back to top.
async function primeReveals(p) {
  await p.evaluate(`(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=innerHeight/2){window.scrollTo(0,y);await s(120);}window.scrollTo(0,0);await s(600);})()`);
}

async function shots(dir) {
  mkdirSync(dir, { recursive: true });
  for (const [w, h] of [[375, 812], [1440, 900]]) {
    const p = await openPage();
    await setViewport(p, w, h);
    await load(p);
    const hero = await p.send("Page.captureScreenshot", { format: "jpeg", quality: 70 });
    writeFileSync(join(dir, `${w}-00-viewport.jpg`), Buffer.from(hero.data, "base64"));
    await primeReveals(p);
    const secs = await p.evaluate(`[...document.querySelectorAll('main section, footer')].filter(s=>s.offsetParent!==null||s.tagName==='FOOTER').map((s,i)=>{const r=s.getBoundingClientRect();return {i,id:s.id||s.tagName.toLowerCase(),top:r.top+scrollY,h:r.height}})`);
    let n = 1;
    for (const s of secs) {
      if (s.h < 10) continue;
      // Scroll so section top sits under the header; capture its own box (cap at 2 viewports tall).
      await p.evaluate(`window.scrollTo(0, ${Math.max(0, s.top - 0)})`); await sleep(700);
      const clipH = Math.min(s.h, h * 2.2);
      const shot = await p.send("Page.captureScreenshot", { format: "jpeg", quality: 65, captureBeyondViewport: true, clip: { x: 0, y: s.top, width: w, height: clipH, scale: 1 } });
      writeFileSync(join(dir, `${w}-${String(n++).padStart(2, "0")}-${s.id}.jpg`), Buffer.from(shot.data, "base64"));
    }
    p.close();
  }
}

async function checks() {
  const out = {};
  for (const [w, h] of [[375, 812], [768, 1024], [1440, 900]]) {
    const p = await openPage();
    await setViewport(p, w, h);
    await load(p);
    await primeReveals(p);
    out[w] = await p.evaluate(`(() => {
      const de = document.documentElement;
      const res = { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, hscroll: de.scrollWidth > de.clientWidth };
      // widest offenders
      res.overflowers = [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>de.clientWidth+1 && r.width>0 && getComputedStyle(e).position!=='fixed'}).slice(0,8).map(e=>e.tagName+'.'+String(e.className).slice(0,60));
      const vis = e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width>0 && r.height>0 && cs.visibility!=='hidden' && cs.display!=='none' && e.closest('[class*="hidden"]')===null || (r.width>0&&r.height>0&&e.offsetParent!==null); };
      res.tapSmall = [...document.querySelectorAll('a,button,input,select,textarea,[role=button]')].filter(e=>e.offsetParent!==null).map(e=>{const r=e.getBoundingClientRect();return {t:(e.innerText||e.getAttribute('aria-label')||e.tagName).trim().replace(/\\s+/g,' ').slice(0,40),w:Math.round(r.width),h:Math.round(r.height)}}).filter(x=>x.w<44||x.h<44);
      // text nodes
      const lum = c => { const m = c.match(/[\\d.]+/g).map(Number); const [r,g,b] = m.slice(0,3).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}); return 0.2126*r+0.7152*g+0.0722*b; };
      const alpha = c => { const m = c.match(/[\\d.]+/g).map(Number); return m.length>3?m[3]:1; };
      const blend = (fg, bg) => { const f=fg.match(/[\\d.]+/g).map(Number), b=bg.match(/[\\d.]+/g).map(Number); const a=f.length>3?f[3]:1; return 'rgb('+[0,1,2].map(i=>Math.round(f[i]*a+b[i]*(1-a))).join(',')+')'; };
      const bgOf = e => { let n=e, over=[]; while(n && n!==document.documentElement){ const cs=getComputedStyle(n); if(cs.backgroundImage!=='none' && !cs.backgroundImage.includes('repeating')) return {img:true}; if(n.querySelector && n!==e && [...n.children].some(c=>c.tagName==='IMG'||c.querySelector&&c.querySelector(':scope > div > img'))) {} const bc=cs.backgroundColor; if(alpha(bc)>0){ if(alpha(bc)>=0.99){ let col=bc; for(const o of over.reverse()) col=blend(o,col); return {col}; } over.push(bc);} n=n.parentElement;} return {col:'rgb(19,36,59)'}; };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const small = new Map(), contrast = new Map(); let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.trim()) continue; const e = node.parentElement; if (!e || e.offsetParent===null) continue;
        const cs = getComputedStyle(e); const fs = parseFloat(cs.fontSize); const txt = node.textContent.trim().slice(0,40);
        if (fs < 14) { const k = fs+'px '+cs.fontFamily.split(',')[0]; small.set(k, (small.get(k)||[]).concat(txt).slice(0,4)); }
        const insideImg = e.closest('a,div') && [...(e.closest('section,a')||document.body).querySelectorAll('img')].some(i=>{const a=i.getBoundingClientRect(),b=e.getBoundingClientRect();return b.top>=a.top&&b.bottom<=a.bottom&&b.left>=a.left&&b.right<=a.right});
        const bg = insideImg ? {img:true} : bgOf(e);
        if (bg.img) { const k='OVER IMAGE '+cs.color; contrast.set(k,{ratio:null,size:fs,sample:txt}); continue; }
        const fg = alpha(cs.color)<1 ? blend(cs.color,bg.col) : cs.color;
        const L1=lum(fg), L2=lum(bg.col); const ratio = (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
        const large = fs>=24 || (fs>=18.66 && parseInt(cs.fontWeight)>=700);
        const need = large?3:4.5;
        const k = fg+' on '+bg.col+' @'+fs;
        if (!contrast.has(k)) contrast.set(k,{ratio:+ratio.toFixed(2),need,size:fs,sample:txt});
      }
      res.smallText = Object.fromEntries(small);
      res.contrastFails = [...contrast.entries()].filter(([k,v])=>v.ratio!==null && v.ratio<v.need).map(([k,v])=>({k,...v}));
      res.overImage = [...contrast.entries()].filter(([k,v])=>v.ratio===null).length;
      res.focusVisibleRules = [...document.styleSheets].flatMap(s=>{try{return [...s.cssRules]}catch{return []}}).map(r=>r.cssText||'').filter(t=>t.includes('focus-visible')).length;
      res.reducedMotionRules = [...document.styleSheets].flatMap(s=>{try{return [...s.cssRules]}catch{return []}}).map(r=>r.cssText||'').filter(t=>t.includes('prefers-reduced-motion')).length;
      res.imgs = [...document.images].map(i=>({src:i.currentSrc.split('/').pop().slice(0,60),loading:i.loading,fetchpriority:i.fetchPriority,w:i.getAttribute('width'),h:i.getAttribute('height'),natural:i.naturalWidth}));
      res.pageHeight = de.scrollHeight;
      return res;
    })()`);
    p.close();
  }
  // Reduced motion: does the loader still show, do reveals still animate?
  const p = await openPage();
  await setViewport(p, 375, 812);
  await p.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await p.send("Page.enable");
  await p.send("Page.navigate", { url: URL_ }); await sleep(800);
  out.reducedMotion = await p.evaluate(`({loaderVisible: !!document.querySelector('video') && getComputedStyle(document.querySelector('video').closest('div')).opacity, h1Opacity: getComputedStyle(document.querySelector('h1')).opacity, matches: matchMedia('(prefers-reduced-motion: reduce)').matches})`);
  p.close();
  console.log(JSON.stringify(out, null, 1));
}

async function perf() {
  const runs = [];
  for (let run = 0; run < 3; run++) {
    const p = await openPage();
    await setViewport(p, 412, 823);
    await p.send("Network.enable"); await p.send("Network.setCacheDisabled", { cacheDisabled: true });
    // Lighthouse mobile defaults: 150ms RTT, 1.6 Mbps down, 750 Kbps up, 4x CPU.
    await p.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1638400 / 8, uploadThroughput: 750000 / 8 });
    await p.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    const bytes = {}; const reqs = new Map();
    p.on((m) => {
      if (m.method === "Network.responseReceived") reqs.set(m.params.requestId, { type: m.params.type, url: m.params.response.url });
      if (m.method === "Network.loadingFinished") { const r = reqs.get(m.params.requestId); if (r) { bytes[r.type] = (bytes[r.type] || 0) + m.params.encodedDataLength; r.size = m.params.encodedDataLength; } }
    });
    await p.send("Page.addScriptToEvaluateOnNewDocument", { source: `window.__lcp=[];window.__cls=0;window.__shifts=[];new PerformanceObserver(l=>{for(const e of l.getEntries()){const el=e.element;window.__lcp.push({t:Math.round(e.startTime),size:e.size,el:el?(el.tagName+' '+(el.currentSrc||el.textContent||'').slice(0,70)):e.url})}}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput){window.__cls+=e.value;window.__shifts.push({v:+e.value.toFixed(4),src:(e.sources||[]).map(s=>s.node&&s.node.nodeName+'.'+String(s.node.className).slice(0,40))})}}}).observe({type:'layout-shift',buffered:true});` });
    await load(p, URL_, 9000);
    const r = await p.evaluate(`({lcp: window.__lcp, cls: +window.__cls.toFixed(4), shifts: window.__shifts.slice(0,5), fcp: Math.round((performance.getEntriesByName('first-contentful-paint')[0]||{}).startTime||0), load: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd)})`);
    r.bytesKB = Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v / 1024)]));
    r.heaviest = [...reqs.values()].filter((x) => x.size).sort((a, b) => b.size - a.size).slice(0, 6).map((x) => `${Math.round(x.size / 1024)}KB ${x.type} ${x.url.replace(URL_, "/").slice(0, 90)}`);
    runs.push(r); p.close();
  }
  console.log(JSON.stringify(runs, null, 1));
}

try {
  if (mode === "shots") await shots(outDir);
  else if (mode === "checks") await checks();
  else if (mode === "perf") await perf();
  else if (mode === "eval") { const p = await openPage(); await setViewport(p, 375, 812); await load(p); console.log(JSON.stringify(await p.evaluate(process.env.EXPR), null, 1)); }
} catch (e) { console.error("ERR", e.message); }
finally { chrome.kill(); process.exit(0); }
