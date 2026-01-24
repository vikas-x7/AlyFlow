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
    question: "Can I share or export my workflows?",
    answer:
      "Yes — you can export workflows for reporting or share a link with collaborators (coming soon). Export options include common image and JSON formats for handoff or backup.",
  },
  {
    question: "Is my data saved and private?",
    answer:
      "Workflows are saved to your account and only accessible to you and collaborators you explicitly share with. We recommend using a secure account and keeping your credentials private.",
  },
  {
    question: "Is Alyflow free to use?",
    answer:
      "The core canvas experience is free to start. Advanced features, team collaboration, and additional export options may be offered under paid plans in the future.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="min-h-screen px-6 py-16 sm:px-10 md:px-16 lg:px-6 font-gothic"
    >
      {/* Heading */}
      <h1 className="text-white mb-12 leading-none tracking-[-0.02em] text-[clamp(2.5rem,6vw,4rem)] font-light">
        FAQ's
      </h1>

      {/* Accordion */}
      <div className="w-full">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border-t border-[#2e2e2e] last:border-b"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-7 sm:py-8 text-left group transition-all duration-200 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-white pr-6 transition-opacity duration-200 group-hover:opacity-70 text-[clamp(0.95rem,2vw,1.1rem)] font-normal tracking-[0.01em]">
                  {faq.question}
                </span>

                {/* Plus / Minus icon */}
                <span
                  className={`shrink-0 text-white text-[clamp(1.2rem,2.5vw,1.5rem)] font-extralight leading-none inline-block transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer panel */}
              <div
                className="overflow-hidden transition-[max-height] duration-400ms ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ maxHeight: isOpen ? "400px" : "0px" }}
              >
                <p className="text-[#999] pb-8 pr-12 text-[clamp(0.875rem,1.5vw,1rem)] font-normal leading-[1.7] tracking-[0.01em]">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
