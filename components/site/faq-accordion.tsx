"use client";

import {useState} from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({items}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.question}
              </h3>
              <span
                className={`mt-1 shrink-0 text-amber-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                ▾
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-slate-100 px-5 pb-5 pt-3">
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
