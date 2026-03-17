"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Alyflow?",
    answer:
      "Alyflow is a powerful, Canva-like unlimited canvas built specifically for creating mind maps. It's designed for seamless brainstorming just drop nodes, change colors, and connect your ideas.",
  },
  {
    question: "What makes it different?",
    answer:
      "Unlike traditional tools, Alyflow focuses purely on unlimited visual mind mapping. You get an infinite canvas, auto-saving, seamless link sharing, and the ability to import/export your maps effortlessly.",
  },
  {
    question: "How do I start a new mind map?",
    answer:
      "Click 'create new' in the sidebar or open the Canvas. You can add nodes, customize colors, drag to connect them, and your mind map is automatically saved in the background.",
  },
  {
    question: "How does sharing and saving work?",
    answer:
      "Every change you make is auto-saved instantly. You can keep your mind maps private, or generate a link to share them with others. You can also import or export your maps at any time.",
  },
  {
    question: "Is Alyflow free to use?",
    answer:
      "The core unlimited mind mapping experience is free to start. You can create, color, share, and export your mind maps right away.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-16 px-4 font-gothic">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* LEFT */}
        <div className="flex flex-col gap-1">
          <p className="text-[20px] uppercase text-gray-950 font-semibold mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-[34px] font-light text-gray-900 mb-2">
            Any questions? We got you.
          </h2>
          <p className="text-gray-500 max-w-sm mb-4">
            Everything you need to know about Alyflow.
          </p>

          {/* Accordion */}
          <div className="border-t border-gray-200 mt-2">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="border-b border-gray-200 cursor-pointer"
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between py-4">
                  <span
                    className={`font-medium text-base transition-colors duration-200 ${
                      activeIndex === i ? "text-black" : "text-gray-900"
                    }`}
                  >
                    {f.question}
                  </span>
                  <span
                    className={`text-gray-400 text-lg transition-transform duration-300 ${
                      activeIndex === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === i ? "max-h-40 pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {f.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - same image */}
        <div className="relative rounded-[5px] overflow-hidden h-[520px]">
          <img
            src="https://cdn.prod.website-files.com/6812d02840d393aa2c663370/68f7be903d5e939249ef4dab_6ad532de28b288f9a07b16c9b42376ce_hyperline-pattern.svg"
            alt="Alyflow canvas preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
