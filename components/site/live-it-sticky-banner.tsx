"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

export function LiveItStickyBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let stopTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const currentY = window.scrollY;
      clearTimeout(stopTimer);

      if (currentY < 200) {
        setVisible(false);
      } else if (currentY < lastY) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastY = currentY;
      stopTimer = setTimeout(() => setVisible(false), 150);
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-[150%] opacity-0"
      }`}
    >
      <a
        href="https://liveitpuntacana.com"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto mx-auto w-full max-w-3xl scale-90 px-4"
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
