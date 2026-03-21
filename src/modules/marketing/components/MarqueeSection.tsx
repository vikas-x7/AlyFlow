"use client";

const mindMapNodes = [
  { name: "Self-Awareness", style: "font-bold text-2xl" },
  { name: "Goal Setting", style: "font-bold text-2xl" },
  { name: "Deep Work", style: "font-bold text-2xl" },
  { name: "Mental Models", style: "font-bold text-2xl" },
  { name: "Atomic Habits", style: "font-bold text-2xl" },
  { name: "Emotional Intelligence", style: "font-bold text-2xl" },
  { name: "Growth Mindset", style: "font-bold text-2xl" },
  { name: "Time Blocking", style: "font-bold text-2xl" },
  { name: "Ikigai", style: "font-bold text-2xl" },
  { name: "Second Brain", style: "font-bold text-2xl" },
];
export default function MarqueeSection() {
  return (
    <section className="w-full overflow-hidden font-gothic">
      <div className="relative flex border-y border-dashed border-black/10 py-6">
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #FAFAFA, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #FAFAFA, transparent)",
          }}
        />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...mindMapNodes, ...mindMapNodes].map((node, i) => (
            <span
              key={i}
              className={`${node.style} text-black mx-10 opacity-80 hover:opacity-100 transition-opacity duration-200 select-none text-[17px]`}
            >
              {node.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
