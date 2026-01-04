import Link from "next/link";

export const Hero = () => {
  const features = [
    {
      title: "Portfolio",
      desc: "Design, customize, and deploy your portfolio with one click",
      img: "https://cdn-icons-png.flaticon.com/128/10453/10453141.png",
    },
    {
      title: "Resume",
      desc: "Smart resumes, powered by LaTeX and AI.",
      img: "https://cdn-icons-png.flaticon.com/128/9386/9386860.png",
    },
    {
      title: "Road map ",
      desc: "Create personalized learning roadmaps to master skills faster.",
      img: "https://cdn-icons-png.flaticon.com/128/17145/17145905.png",
    },
    {
      title: "Apply job",
      desc: "Find the right job and apply instantly with just one click",
      img: "https://cdn-icons-png.flaticon.com/128/10490/10490250.png",
    },
  ];

  return (
    <section className="relative flex flex-col md:flex-row items-center max-w-6xl  px-5 mx-auto py-16 font-[Gabarito] gap-8 h-screen ">
      <div className="flex-1 relative z-10 ">
        <div className="mb-12">
          <p className="text-sm text-[#666666] mb-8 mt-[40px]">
            {" "}
            <i className="ri-instance-fill"></i> Easiest way to build your
            portfolio, resume, and apply to jobs
          </p>
          <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 -tracking-[2px]">
            <span className="text-[#666666] ">The simple way to</span> <br />
            portfolio resume apply
          </h1>

          <div className="flex gap-4 mt-[20px]">
            <Link
              href="/canvas"
              className="rounded bg-black text-white px-3 py-1.5 text-sm font-medium"
            >
              Open Canvas
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[40px] mt-[100px]">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-start rounded-lg w-[230px] py-2"
            >
              <h3 className="text-[18px] mb-2 flex items-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-5 h-5 mr-2 "
                />
                {feature.title}{" "}
                <i className="ri-arrow-right-line ml-[75px]"></i>
              </h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <img
          className="h- object-cover translate-x-[390px]"
          src="https://cdn.prod.website-files.com/6812d02840d393aa2c663370/6847f9fe57cfb544f7d5818a_hero-home.svg"
          alt="Hero Background"
        />
      </div>
    </section>
  );
};
