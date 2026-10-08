import Image from "next/image";
import { Reveal } from "./reveal";

// Single-colour knockouts of each client's logo (white on transparent),
// generated from the originals in /public/logos so they sit on navy without
// a white box. Dimensions are the PNGs' intrinsic sizes.
const CLIENTS = [
  { name: "Rajendra Agro", logo: "/logos/mono/rajendra-agro.png", w: 146, h: 152 },
  { name: "Suryakiran Textile", logo: "/logos/mono/suryakiran-textile.png", w: 139, h: 149 },
  { name: "Akash Poultry", logo: "/logos/mono/akash-poultry.png", w: 329, h: 240 },
  { name: "Starwalk Pvt Ltd", logo: "/logos/mono/starwalk.png", w: 409, h: 146 },
  { name: "Vimal Textile Industries", logo: "/logos/mono/vimal-textile.png", w: 120, h: 118 },
  { name: "VKD English Medium School", logo: "/logos/mono/vkd-school.png", w: 149, h: 135 },
];

export function ClientsStrip() {
  return (
    <section
      aria-label="Recent clients"
      className="border-b border-white/[0.07] bg-navy-mid"
    >
      <Reveal className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-[clamp(18px,3vw,44px)] gap-y-5 px-6 py-[clamp(22px,2.6vw,32px)] sm:px-8 lg:px-16">
        <span className="flex-none font-mono text-[11px] tracking-[0.24em] text-apricot uppercase">
          Recent clients
        </span>
        <ul className="flex flex-1 flex-wrap items-center gap-x-[clamp(24px,3.4vw,52px)] gap-y-5">
          {CLIENTS.map((client) => (
            <li key={client.name} className="flex-none">
              <Image
                src={client.logo}
                alt={client.name}
                width={client.w}
                height={client.h}
                className="h-[clamp(34px,3.2vw,46px)] w-auto max-w-[130px] object-contain opacity-75 transition-opacity duration-200 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
