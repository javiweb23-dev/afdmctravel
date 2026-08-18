"use client";

import {useState} from "react";

/** Bullets shown before the visitor asks for the rest. Deliberately few:
 * the point is to keep the page scannable, not to preview the list. */
const VISIBLE_COUNT = 2;

export function ServiceBullets({
  bullets,
  showMoreLabel,
  showLessLabel,
}: {
  bullets: string[];
  showMoreLabel: string;
  showLessLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);

  if (bullets.length === 0) return null;

  const hasMore = bullets.length > VISIBLE_COUNT;
  // Every bullet is rendered either way; the extras are hidden rather than
  // removed so the full text stays in the page for anyone reading it with
  // assistive technology or copying it out.
  const hiddenFrom = expanded ? bullets.length : VISIBLE_COUNT;

  return (
    <>
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet, index) => (
          <li
            key={index}
            hidden={index >= hiddenFrom}
            className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
            {bullet}
          </li>
        ))}
      </ul>

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-4 text-sm font-semibold text-[#0c4a7a] underline-offset-4 transition hover:underline"
        >
          {expanded
            ? showLessLabel
            : `${showMoreLabel} (${bullets.length - VISIBLE_COUNT})`}
        </button>
      ) : null}
    </>
  );
}
