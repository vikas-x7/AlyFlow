export const IntelligenceSection = () => {
  const cards = [
    {
      title: "Create MCP tools",
      desc: "Bootstrap your AI platform from your existing REST APIs.",
      mockup: (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-xs">
          <div className="mb-3 text-white/40 uppercase tracking-widest text-[10px]">
            Auto Generated Tools
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-blue-400 font-semibold">addPet</span>
              <div className="text-white/40 text-[10px]">POST /pet</div>
            </div>
            <div>
              <span className="text-green-400 font-semibold">getPetById</span>
              <div className="text-white/40 text-[10px]">
                GET /pet/&#123;id&#125;
              </div>
            </div>
            <div>
              <span className="text-red-400 font-semibold">removePetById</span>
              <div className="text-white/40 text-[10px]">
                DELETE /pet/&#123;id&#125;
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Curate custom tools",
      desc: "Refine prompts and design higher order tools for your MCP servers.",
      mockup: (
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {["🔗", "✏️", "✂️", "🔨", "🎯", null, "🔑", "🔧"].map((icon, i) =>
              icon === null ? (
                <div
                  key={i}
                  className="h-10 rounded border-2 border-transparent"
                  style={{
                    background:
                      "linear-gradient(black, black) padding-box, linear-gradient(90deg, #f97316, #a855f7, #3b82f6) border-box",
                  }}
                >
                  <div className="h-full flex items-center justify-center text-[10px] font-mono font-bold tracking-widest text-white">
                    AI-READY
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-sm"
                >
                  {icon}
                </div>
              ),
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["🚀", "🔧", "👤", "📡"].map((icon, i) => (
              <div
                key={i}
                className="h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-sm"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Deploy MCP servers",
      desc: "Deploy a remotely hosted MCP server for public consumption.",
      mockup: (
        <div className="mt-6 font-mono text-xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px]">
              🔗
            </div>
            <div className="h-8 w-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px]">
              ✂️
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px]">
              🔗
            </div>
            <span className="text-white/30">&gt;</span>
            <div className="px-4 h-8 rounded border border-orange-500/60 bg-orange-500/5 flex items-center text-orange-300 text-[11px] font-bold tracking-widest">
              AGENT
            </div>
            <span className="text-white/30">&lt;</span>
            <div className="h-8 w-8 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[10px]">
              ✏️
            </div>
          </div>
          <div className="border border-white/10 rounded p-3 bg-white/5">
            <div className="text-white/50 uppercase tracking-widest text-[9px] mb-2">
              FIND_AND_UPDATE_PETS
            </div>
            <div className="flex items-center gap-2 text-[10px] text-green-400/70">
              <span>✓</span> getPetByName("milo")
            </div>
            <div className="flex items-center gap-2 text-[10px] text-green-400/70">
              <span>✓</span> updatePetById("1", &#123; name: "spot" &#125;)
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-black text-white py-16 md:py-24">
      <div className="relative px-2 mx-auto ">
        <div className="h-120 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 ">
          {cards.map((card, idx) => (
            <div key={idx} className="p-8 md:p-5 flex flex-col">
              <h2
                className="text-2xl md:text-3xl font-light tracking-tight text-white mb-3 "
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {card.title}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mb-30 ">
                {card.desc}
              </p>
              {card.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
