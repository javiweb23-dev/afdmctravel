"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

export function LiveItStickyBanner() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let stopTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 0) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = currentY;
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => setHidden(false), 150);
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out ${
        hidden
          ? "translate-y-[150%] opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <a
        href="https://liveitpuntacana.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto w-full max-w-4xl px-4"
      >
        <Image
          src="/images/live-it-banner-2026.jpg"
          alt="Live It Punta Cana 2026"
          width={1200}
          height={300}
          className="h-auto w-full rounded-xl shadow-2xl"
        />
      </a>
    </div>
  );
}
