"use client";

import {useEffect} from "react";

/**
 * Brings the form into view as soon as the page opens.
 *
 * Used on pages where the form is the whole point and the hero above it is
 * only decoration, so a visitor should not have to scroll past it.
 *
 * Deliberately instant rather than animated: a smooth scroll on arrival looks
 * like the page is drifting on its own. And deliberately not focusing the
 * first input — on a phone that pops the keyboard open before the visitor has
 * decided to type. Focus goes to the section, so a screen reader announces
 * where it has landed.
 */
export function ScrollToFormOnLoad({targetId}: {targetId: string}) {
  useEffect(() => {
    // Someone arriving with the page already scrolled — a back navigation, a
    // restored tab — has a position of their own. Leave it alone.
    if (window.scrollY > 0) return;

    let placedAt = 0;

    const settle = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      placedAt = window.scrollY + target.getBoundingClientRect().top - margin;
      window.scrollTo({top: placedAt, behavior: "auto"});
      target.focus({preventScroll: true});
    };

    // First pass as soon as there is a layout to measure, so the jump happens
    // before the visitor starts reading.
    const early = window.setTimeout(settle, 100);

    // The hero above still grows as its image arrives, which would leave the
    // form short of the top. Correcting on load rather than on a guessed
    // delay makes that deterministic — but only if the visitor has not
    // scrolled away from where we put them in the meantime.
    const correct = () => {
      if (Math.abs(window.scrollY - placedAt) < 8) settle();
    };

    let late: number | undefined;
    if (document.readyState === "complete") {
      late = window.setTimeout(correct, 300);
    } else {
      window.addEventListener("load", correct, {once: true});
    }

    return () => {
      window.clearTimeout(early);
      if (late) window.clearTimeout(late);
      window.removeEventListener("load", correct);
    };
  }, [targetId]);

  return null;
}
