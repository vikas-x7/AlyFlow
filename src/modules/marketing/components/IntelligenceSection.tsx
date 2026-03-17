export const IntelligenceSection = () => {
  const cards = [
    {
      title: "Infinite mind maps  zero limits",
      img: "https://i.pinimg.com/736x/43/18/b0/4318b0a02575658a4d065e5810abb1ab.jpg",
      desc: "Create stunning mind maps on an unlimited Canva-styled canvas. Visualize your ideas, customize node colors, and let your creativity flow without boundaries.",
    },
    {
      title: "Auto-save  always protected",
      img: "https://i.pinimg.com/1200x/72/01/b9/7201b9141b51e2a81263cd18663037c6.jpg",
      desc: "Every node you place, every color you tweak  saved automatically in the background. Pick up your mind map right where you left off, every time.",
    },
    {
      title: "Share, import & export",
      img: "https://i.pinimg.com/1200x/e2/51/1e/e2511e774ecfa5f41f2a108c5877bce4.jpg",
      desc: "Generate shareable links instantly to showcase your mind maps. Import existing data or export your final masterpiece with just a single click.",
    },
  ];

  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 lg:px-30  ">
      {/* <div className="h-[50vh] w-3xl font-gothic flex flex-col justify-center gap-4 px-10 ">
        <p className="text-[40px] leading-[1.15]">
          <span className="text-gray-900">
            Alyflow gives you an infinite canvas to map your thoughts,{" "}
          </span>
          <span className="text-gray-400">
            connect ideas visually, and share your mind maps with anyone
            instantly.
          </span>
        </p>
      </div> */}
      <div className="mx-auto mt-16 md:mt-0 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3   border border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {cards.map((card, idx) => (
            <div key={idx} className="p-5 md:p-8 ">
              <div className="mt-6 h-48 sm:h-56 md:h-64 lg:h-70 flex items-center justify-center overflow-hidden">
                <img
                  src={card.img}
                  alt=""
                  className="rounded-[2px] w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg md:text-2xl  lg:text-2xl font-light tracking-tight text-black mb-3 font-gothic mt-5">
                {card.title}
              </h2>
              <p className="text-[14px] text-black/90  font-gothic">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
