"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Alyflow?",
    answer:
      "Alyflow is a lightweight, Excel-style canvas for visually drawing workflows and diagrams. It's built for fast sketching - drag nodes, connect them, add labels, and organize ideas into reusable workflows.",
  },
  {
    question: "Is it like Excel?",
    answer:
      "While inspired by the grid and simplicity of spreadsheets, Alyflow focuses on visual workflows rather than cells and formulas. Think of it as a drawing canvas with spreadsheet-like speed and familiarity.",
  },
  {
    question: "How do I start a new workflow?",
    answer:
      "Click 'create new' in the sidebar or open the Canvas. You can add nodes, drag to connect them, rename items, and save your project. Workflows are automatically stored in your account.",
  },

  {
    question: "Is my data saved and private?",
    answer:
      "Workflows are saved to your account and only accessible to you , We recommend using a secure account and keeping your credentials private.",
  },
  {
    question: "Is Alyflow free to use?",
    answer:
      "The core canvas experience is free to start. Advanced features,options may be offered under paid plans in the future.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="min-h-screen w px-6 py-20 sm:px-5 font-gothic flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-7xl px-6">
        <div className="lg:w-[38%] lg:sticky lg:top-20 lg:self-start">
          <h1 className=" md:text-3xl mb-3  ">
            Any questions? <span className="block">We got you</span>
          </h1>

          <p className=" text-[13px] leading-[1.75] font-normal mb-8 max-w-xs">
            Everything you need to know about Alyflow.
          </p>
        </div>

        <div className="lg:w-[62%]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-t border-[#2e2e2e] last:border-b"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-6 sm:py-7 text-left group transition-all duration-200 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className=" pr-6 transition-opacity duration-200 group-hover:opacity-70 text-[14px] font-normal tracking-[0.01em]">
                    {faq.question}
                  </span>

                  <span
                    className={`shrink-0  text-[clamp(1.2rem,2.5vw,1.4rem)] font-extralight leading-none inline-block transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                  <p className=" pb-7 pr-10 text-[clamp(0.875rem,1.4vw,0.95rem)] font-normal leading-[1.75] tracking-[0.01em]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
