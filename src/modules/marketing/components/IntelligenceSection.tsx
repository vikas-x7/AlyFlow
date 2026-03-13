export const IntelligenceSection = () => {
  const cards = [
    {
      title: "Infinite canvas — zero limits",
      desc: "Drop text, images, code, videos, and links onto a boundless workspace — arrange them however your thinking demands.",
      mockup: (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-xs">
          <div className="mb-3 text-white/40 uppercase tracking-widest text-[10px]">
            Node Types
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-blue-400 font-semibold">Text</span>
              <span className="text-white/30 text-[10px]">— notes, labels, headings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 font-semibold">Image</span>
              <span className="text-white/30 text-[10px]">— references & mood boards</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-purple-400 font-semibold">Code</span>
              <span className="text-white/30 text-[10px]">— snippets with syntax highlighting</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-amber-400 font-semibold">Drawing</span>
              <span className="text-white/30 text-[10px]">— freehand sketches & annotations</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Connect everything — visually",
      desc: "Draw edges between any nodes to map relationships, dependencies, and flows — turning scattered ideas into structured systems.",
      mockup: (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-xs">
          <div className="mb-3 text-white/40 uppercase tracking-widest text-[10px]">
            Connected Flow
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 border border-blue-400/30 rounded text-blue-400 text-[10px]">Research</div>
              <span className="text-white/20">→</span>
              <div className="px-2 py-1 border border-green-400/30 rounded text-green-400 text-[10px]">Ideate</div>
              <span className="text-white/20">→</span>
              <div className="px-2 py-1 border border-purple-400/30 rounded text-purple-400 text-[10px]">Build</div>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <span className="text-white/20">↳</span>
              <div className="px-2 py-1 border border-amber-400/30 rounded text-amber-400 text-[10px]">Deploy</div>
              <span className="text-white/20">→</span>
              <div className="px-2 py-1 border border-red-400/30 rounded text-red-400 text-[10px]">Review</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Auto-save — always protected",
      desc: "Every node you place, every edge you connect — saved automatically in the background. Pick up right where you left off, every time.",
      mockup: (
        <div className="mt-6 font-mono text-xs space-y-3">
          <div className="border border-white/10 rounded p-3 bg-white/5">
            <div className="text-white/50 uppercase tracking-widest text-[9px] mb-2">
              SYNC STATUS
            </div>
            <div className="flex items-center gap-2 text-[10px] text-green-400/70">
              <span>✓</span> 12 nodes saved
            </div>
            <div className="flex items-center gap-2 text-[10px] text-green-400/70">
              <span>✓</span> 8 edges synced
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <span>⟳</span> All changes up to date
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-black text-white py-16 md:py-24 px-6">
      <div className="relative px-2 mx-auto ">
        <div className="h-50 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 ">
          {cards.map((card, idx) => (
            <div key={idx} className="p-8 md:p-5 ">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-3  font-gothic">
                {card.title}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mb-30  font-gothic">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex border border-white/10 divide-x divide-white/10 text-white font-gothic">
          <div className="w-[60%] p-10">
            <p className="text-xl leading-relaxed text-white/70">
              One workspace for all your thinking — sketch systems, map
              dependencies, and structure complex projects with nodes, edges,
              and freehand drawing.
            </p>
          </div>

          <div className="w-[40%] p-10 flex flex-col justify-center gap-6">
            <p className="text-white/60">
              Start with a blank canvas and build outward — add text, images,
              code, links, and videos. Connect them into flows that make sense
              to you.
            </p>

            <button className="w-fit px-6 py-2 rounded-xs bg-white/10 hover:bg-white/20 transition">
              START CREATING
            </button>
          </div>
        </div>

        <div className="min-h-[80vh] flex flex-col justify-between mt-50 relative overflow-hidden font-gothic">
          {/* TOP LEFT */}
          <h1 className="text-5xl md:text-7xl lg:text-6xl font-light  tracking-tight">
            Craft exceptional
          </h1>

          {/* CENTER IMAGE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[30vw] min-w-[260px] min-h-[160px]">
            {/* APNI IMAGE YAHAN DAALO */}
            <img
              src="https://i.pinimg.com/originals/78/a5/ff/78a5ff90131c88c3e0fa328c54451c3e.gif"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          {/* BOTTOM RIGHT */}
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-light  tracking-tight self-end text-right">
            visual workflows
          </h1>
        </div>
      </div>
    </section>
  );
};
