export function Features() {
  return (
    <section className="px-6">
      {/* <div className="border ">
        <img
          src=""
          alt=""
          className="w-full rounded-[5px] shadow-[0_0_60px_10px_rgba(0,0,0,0.6)]"
        />
      </div> */}

      <div className="w-full h-64 sm:h-96 md:h-[500px] lg:h-130 rounded-[5px] relative overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/ec/33/40/ec334048c56d2cfbbdcd7e04de2a3094.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-3 sm:p-5 md:p-7">
          <img
            src="https://res.cloudinary.com/dyv9kenuj/image/upload/v1773367551/Screenshot_from_2026-03-13_07-33-24_puglsk.png"
            alt=""
            className="w-full sm:w-3/4 md:w-auto rounded-[5px]"
          />
        </div>
      </div>
    </section>
  );
}
