export const IntelligenceSection = () => {
  const cards = [
    {
      title: "Infinite canvas  zero limits",
      img: "https://i.pinimg.com/736x/43/18/b0/4318b0a02575658a4d065e5810abb1ab.jpg",
      desc: "Drop text, images, code, videos, and links onto a boundless workspace  arrange them however your thinking demands.",
    },
    {
      title: "Connect everything  visually",
      img: "https://i.pinimg.com/1200x/72/01/b9/7201b9141b51e2a81263cd18663037c6.jpg",
      desc: "Draw edges between any nodes to map relationships, dependencies, and flows turning scattered ideas into structured systems.",
    },
    {
      title: "Auto-save  always protected",
      img: "https://i.pinimg.com/1200x/e2/51/1e/e2511e774ecfa5f41f2a108c5877bce4.jpg",
      desc: "Every node you place, every edge you connect  saved automatically in the background. Pick up right where you left off, every time.",
    },
  ];

  return (
    <section className="relative  py-12 md:py-24  ">
      <div className="mx-auto mt-40 w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-x border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {cards.map((card, idx) => (
            <div key={idx} className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl lg:text-2xl font-light tracking-tight text-white mb-3 font-gothic">
                {card.title}
              </h2>
              <p className="text-xs text-[#626262]  leading-relaxed font-gothic">
                {card.desc}
              </p>

              <div className="mt-7 h-70 flex items-center justify-center overflow-hidden">
                <img
                  src={card.img}
                  alt=""
                  className="rounded-[5px]  w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row border border-t-0 border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 text-white font-gothic">
          <div className="w-full md:w-[60%] p-6 md:p-10">
            <p className=" md:text-sm leading-relaxed text-[#626262]">
              One workspace for all your thinking sketch systems, map
              dependencies, and structure complex projects with nodes, edges,
              and freehand drawing.
            </p>
          </div>

          <div className="w-full md:w-[40%] p-6 md:p-10 flex flex-col justify-center gap-6">
            <p className="text-xs text-[#626262] leading-relaxed">
              Start with a blank canvas and build outward add text, images,
              code, links, and videos. Connect them into flows that make sense
              to you.
            </p>
            <button className="w-fit px-4 py-2 text-black  bg-[#E1E1E1] hover:bg-white/20 transition text-xs tracking-widest">
              START CREATING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
