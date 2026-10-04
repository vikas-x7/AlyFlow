'use client';

const mindMapNodes = [
  { name: 'Infinite Canvas' },
  { name: 'Node Editor' },
  { name: 'Edge Routing' },
  { name: 'Flowcharts' },
  { name: 'Mind Maps' },
  { name: 'Drag & Drop' },
  { name: 'Visual Thinking' },
  { name: 'System Design' },
  { name: 'Wireframing' },
  { name: 'Team Collaboration' },
];

export default function MarqueeSection() {
  return (
    <section className="w-full overflow-hidden font-gothic bg-black ">
      <div className="relative flex border-y border-dashed border-black/5 py-2 sm:py-2 md:py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...mindMapNodes, ...mindMapNodes].map((node, i) => (
            <span key={i} className="font-bold  text-white mx-5 sm:mx-8 md:mx-10 opacity-80 hover:opacity-100 transition-opacity duration-200 select-none text-[10px] sm:text-[15px] md:text-[13px]">
              {node.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
