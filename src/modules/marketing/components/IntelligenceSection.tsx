export const IntelligenceSection = () => {
  const features = [
    {
      title: "Poop Mode (aka Smelly Chaos)",
      desc: "Blow things up without consequences. Simulate everything, send nothing.",
      variant: "purpleLines",
    },
    {
      title: "Webhooks That Actually Work",
      desc: "We ping your server the second something happens — delivery, open, click, bounce, interpretive dance.",
      variant: "grayLines",
    },
    {
      title: "Blink-and-you’ll-miss-it speed",
      desc: "Flabbergasted responds faster than you can regret your last input.",
      variant: "grayLines",
    },
    {
      title: "Doesn’t butcher your address",
      desc: "From “48 Elm St.” to international phone numbers, it nails the details like it’s been stalking your mailbox.",
      variant: "gradient",
    },
  ];

  return (
    <section className=" text-white px-6 mt-30 mb-40 font-gothic">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        {/* <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl leading-snug mb-6">
            Actually understands you in real time,
            <br /> no awkward pauses, no blank stares
          </h2>

          <p className="text-gray-400 leading-relaxed">
            It doesn’t just keep up — it dominates. Complex addresses? Weird
            phone numbers? Random acronyms no one should be saying out loud? All
            handled without flinching. You talk, it listens, and responds like
            it actually paid attention.
          </p>
        </div> */}

        {/* Feature Grid */}
        <div className="grid md:grid-cols-4 gap-1">
          {features.map((feature, i) => (
            <div key={i} className="space-y-4">
              {/* Visual Block */}
              <div className="h-50  overflow-hidden relative bg-[#11161d]">
                {feature.variant === "purpleLines" && (
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#7c3aed,#7c3aed_2px,transparent_2px,transparent_6px)] opacity-60" />
                )}

                {feature.variant === "grayLines" && (
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#9ca3af,#9ca3af_1px,transparent_1px,transparent_5px)] opacity-40" />
                )}

                {feature.variant === "gradient" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300" />
                )}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
