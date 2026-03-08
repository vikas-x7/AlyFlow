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
      mockup: <div className="mt-6"></div>,
    },
    {
      title: "Deploy MCP servers",
      desc: "Deploy a remotely hosted MCP server for public consumption.",
      mockup: (
        <div className="mt-6 font-mono text-xs space-y-3">
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
              Turn your API into an MCP server with structured inputs,
              prompt-tuned descriptions, and hosted execution.
            </p>
          </div>

          <div className="w-[40%] p-10 flex flex-col justify-center gap-6">
            <p className="text-white/60">
              Start with your OpenAPI spec and unlock tools that work out of the
              box with agents like Claude and Cursor.
            </p>

            <button className="w-fit px-6 py-2 rounded-xs bg-white/10 hover:bg-white/20 transition">
              START BUILDING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
