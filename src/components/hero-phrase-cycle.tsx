"use client";

import { useEffect, useState } from "react";

const phrases = [
  "build together",
  "learn together",
  "launch together",
  "grow together",
];

const DISPLAY_DURATION = 2200;
const TRANSITION_DURATION = 320;

export function HeroPhraseCycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsEntering(false);
    }, DISPLAY_DURATION);

    const swapTimer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % phrases.length);
      setIsEntering(true);
    }, DISPLAY_DURATION + TRANSITION_DURATION);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(swapTimer);
    };
  }, [activeIndex]);

  return (
    <span
      className="mt-2 block min-h-[1.25em] text-foreground sm:mt-3"
      aria-live="polite"
    >
      <span
        className={`inline-block transition-all duration-300 ease-out ${
          isEntering
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-2 opacity-0 blur-md"
        }`}
      >
        {phrases[activeIndex]}
      </span>
    </span>
  );
}
