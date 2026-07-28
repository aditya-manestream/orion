import Image from "next/image";
import { Reveal } from "./reveal";

const CLIENTS = [
  { name: "Rajendra Agro", logo: "/logos/rajendra-agro.jpg" },
  { name: "Suryakiran Textile", logo: "/logos/suryakiran-textile.jpg" },
  { name: "Akash Poultry", logo: "/logos/akash-poultry.jpg" },
  { name: "Starwalk Pvt Ltd", logo: "/logos/starwalk.png" },
  { name: "Vimal Textile Industries", logo: "/logos/vimal-textile.jpg" },
  { name: "VKD English Medium School", logo: "/logos/vkd-school.png" },
];

export function ClientsStrip() {
  return (
    <section className="border-b border-white/[0.07] bg-navy-mid">
      <Reveal className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-[clamp(18px,3vw,44px)] px-6 py-[clamp(22px,2.6vw,32px)] sm:px-8 lg:px-16">
        <span className="flex-none font-mono text-[11px] tracking-[0.24em] text-rust uppercase">
          Recent clients
        </span>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="flex h-12 w-[92px] flex-none items-center justify-center bg-white/95 p-1.5 transition-transform duration-300 hover:scale-105"
              title={client.name}
            >
              <div className="relative h-full w-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  sizes="92px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
