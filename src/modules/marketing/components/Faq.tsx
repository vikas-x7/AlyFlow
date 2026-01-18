"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much does a website cost?",
    answer:
      "Our pricing depends on the scope and complexity of your project. We offer flexible packages starting from a one-time build fee to ongoing subscription plans. Book a free discovery call and we'll provide a custom quote tailored to your needs.",
  },
  {
    question: "How does the subscription work?",
    answer:
      "Our subscription gives you access to unlimited design revisions, monthly updates, hosting, and priority support — all for a flat monthly fee. You stay in full control with no long-term contracts.",
  },
  {
    question: "How do I pause or cancel?",
    answer:
      "You can pause or cancel your subscription at any time from your client dashboard. Pausing freezes billing for up to 60 days. Cancellations take effect at the end of your current billing cycle.",
  },
  {
    question: "How do I communicate with you?",
    answer:
      "We primarily communicate via a shared Slack channel or email — whichever you prefer. You'll have a dedicated point of contact and can expect responses within one business day.",
  },
  {
    question: "What if I don't like the design?",
    answer:
      "We offer unlimited revisions until you're 100% satisfied. Our process begins with a detailed brief so we understand your vision before a single pixel is placed. Your approval is non-negotiable.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen px-6 py-16 sm:px-10 md:px-16 lg:px-6 font-gothic">
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
                  className={`flex-shrink-0 text-white text-[clamp(1.2rem,2.5vw,1.5rem)] font-extralight leading-none inline-block transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              {/* Answer panel */}
              <div
                className="overflow-hidden transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
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
