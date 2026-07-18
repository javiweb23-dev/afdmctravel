"use client";

import Image from "next/image";
import {useEffect, useState} from "react";

export function LiveItStickyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 350) {
        setIsVisible(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) <= 15) {
        return;
      }

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-in-out transform ${
        isVisible
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
