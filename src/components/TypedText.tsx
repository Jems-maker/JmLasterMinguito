"use client";

import { useEffect, useRef, useCallback } from "react";

const phrases = [
  "Web Systems",
  "Mobile Apps",
  "Arduino Projects",
  "IoT Systems",
];

export default function TypedText() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const phraseIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const isDeletingRef = useRef(false);

  const updateHighlight = useCallback(() => {
    const el = typedRef.current;
    if (!el) return;
    const current = phrases[phraseIdxRef.current];
    const progress = current.length > 0 ? (charIdxRef.current / current.length) * 100 : 0;
    el.style.backgroundSize = `${progress}% 100%`;
  }, []);

  useEffect(() => {
    const el = typedRef.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    function type() {
      if (!el) return;
      const current = phrases[phraseIdxRef.current];

      if (isDeletingRef.current) {
        el.textContent = current.substring(0, charIdxRef.current - 1);
        charIdxRef.current--;
      } else {
        el.textContent = current.substring(0, charIdxRef.current + 1);
        charIdxRef.current++;
      }

      updateHighlight();

      let speed = isDeletingRef.current ? 40 : 80;

      if (!isDeletingRef.current && charIdxRef.current === current.length) {
        speed = 2000;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && charIdxRef.current === 0) {
        isDeletingRef.current = false;
        phraseIdxRef.current = (phraseIdxRef.current + 1) % phrases.length;
        speed = 500;
      }

      timeoutId = setTimeout(type, speed);
    }

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, [updateHighlight]);

  return <span ref={typedRef} className="typed-text" />;
}
