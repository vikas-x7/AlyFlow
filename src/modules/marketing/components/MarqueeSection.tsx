"use client";

const mindMapNodes = [
  { name: "Infinite Canvas" },
  { name: "Node Editor" },
  { name: "Edge Routing" },
  { name: "Flowcharts" },
  { name: "Mind Maps" },
  { name: "Drag & Drop" },
  { name: "Visual Thinking" },
  { name: "System Design" },
  { name: "Wireframing" },
  { name: "Team Collaboration" },
];

export default function MarqueeSection() {
  return (
    <section className="w-full overflow-hidden font-gothic">
      <div className="relative flex border-y border-dashed border-black/10 py-3 sm:py-4 md:py-6">
        <div
          className="absolute left-0 top-0 h-full w-10 sm:w-16 md:w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #FAFAFA, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-10 sm:w-16 md:w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #FAFAFA, transparent)",
          }}
        />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...mindMapNodes, ...mindMapNodes].map((node, i) => (
            <span
              key={i}
              className="font-bold text-black mx-5 sm:mx-8 md:mx-10 opacity-80 hover:opacity-100 transition-opacity duration-200 select-none text-[13px] sm:text-[15px] md:text-[17px]"
            >
              {node.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
