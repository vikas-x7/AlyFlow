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
      title: "Road map",
      desc: "Create personalized learning roadmaps to master skills faster.",
      img: "https://cdn-icons-png.flaticon.com/128/17145/17145905.png",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-4xl md:text-6xl text-white/60 mb-6 tracking-tight">
          <span>The simple way to</span> <br />
          portfolio resume apply
        </h1>

        <p className="text-sm text-[#666666] mb-8">
          <i className="ri-instance-fill"></i> Easiest way to build your
          portfolio, resume, and apply to jobs
        </p>

        <Link
          href="/canvas"
          className="inline-block rounded bg-red-700 text-white px-4 py-2 text-sm font-medium"
        >
          Open Canvas
        </Link>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-20">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-left rounded-lg w-[230px]"
            >
              <h3 className="text-[18px] mb-2 flex items-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-5 h-5 mr-2"
                />
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
