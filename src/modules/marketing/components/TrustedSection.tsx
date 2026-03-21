"use client";

const stats = [
  { label: "Files analyzed", value: "14M" },
  { label: "Citations generated", value: "530K" },
  { label: "Answers generated", value: "27M" },
  { label: "Hours saved per paper", value: "20H" },
];

export default function TrustedSection() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-gothic">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[10px] p-8 flex flex-col justify-between min-h-55"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <span className="text-sm text-black font-medium tracking-wide">
                {stat.label}
              </span>
              <span className="text-6xl font-light text-black/80 mt-6">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
