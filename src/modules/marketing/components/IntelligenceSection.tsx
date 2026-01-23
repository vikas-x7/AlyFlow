export const IntelligenceSection = () => {
  const cards = [
    {
      title: "Simple Excel-style Canvas",
      desc: "A lightweight, spreadsheet-like drawing surface where you can freely create and arrange nodes, shapes and connections designed for fast workflow sketching.",
    },
    {
      title: "Draw Workflows Visually",
      desc: "Drag, drop and connect elements to map processes, ideas or data flows. Intuitive tools let you focus on structure, not tooling.",
    },
    {
      title: "Organize & Collaborate",
      desc: "Group related nodes, add labels and comments, and keep your projects organized for easy sharing and iteration.",
    },
    {
      title: "Export & Iterate",
      desc: "Save or export your workflows for reporting or further editing  perfect for quick prototypes and handoffs.",
    },
  ];

  return (
    <section className="relative bg-black text-white font-gothic py-16 md:py-24 lg:py-32">
      <div className="mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          <div className="flex-1 lg:px-8  overflow-x-auto scroll-smooth pb-4 no-scrollbar">
            <div className="flex gap-4 md:gap-6">
              {cards.map((c, idx) => (
                <div
                  key={idx}
                  className="relative flex-none w-[320px] h-80 md:h-96 bg-white/70 text-black p-6 md:p-10 flex flex-col justify-end rounded-lg hover:bg-white transition-colors duration-300 group cursor-pointer"
                >
                  <div className="absolute left-4 top-4 text-4xl font-bold text-black/10">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:opacity-80 transition">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm text-black/70">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
