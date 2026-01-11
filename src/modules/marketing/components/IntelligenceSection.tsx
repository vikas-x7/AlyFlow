export const IntelligenceSection = () => {
  return (
    <section className="relative bg-black text-white font-gothic py-32">
      <div className="mx-auto flex pl-6">
        {/* Section Title */}
        <h2 className="text-5xl w-250 font-light tracking-tight mb-20">
          How many <br /> feature
        </h2>

        {/* Horizontal Cards */}
        <div className="flex gap-8 overflow-x-auto scroll-smooth pb-6  no-scrollbar">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="min-w-[320px] md:min-w-80 h-90 bg-white/70 text-black p-10 flex items-end"
            >
              <h3 className="text-3xl font-light tracking-tight">
                Card Title {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
