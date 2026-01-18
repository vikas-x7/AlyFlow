export const IntelligenceSection = () => {
  return (
    <section className="relative bg-black text-white font-gothic py-16 md:py-24 lg:py-32">
      <div className="mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          <div className="flex-1 lg:px-8  overflow-x-auto scroll-smooth pb-4 no-scrollbar">
            <div className="flex justify-between gap-4 md:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="min-w-70 sm:min-w-[320px] md:min-w-80 h-80 md:h-90 bg-white/70 text-black p-6 md:p-10 flex items-end rounded-lg hover:bg-white transition-colors duration-300 group cursor-pointer"
                >
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight group-hover:opacity-80 transition">
                    Card Title {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
