"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Simple: show loader for 3 seconds, then fade out
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate progress smoothly from 0 to 100 over 3 seconds
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;

    const startTime = Date.now();
    const duration = 2800; // slightly less than 3s so it reaches 100% before hide

    const raf = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(raf);
    };

    const frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  return (
    <div
      id="loader"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-bg)] transition-opacity duration-500 ease ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center flex flex-col items-center gap-4">
        <img
          src="/profile.jpg"
          alt="Jems"
          className="w-[72px] h-[72px] rounded-full object-cover border-2 border-[var(--color-border)] animate-[loaderPulse_1.5s_ease-in-out_infinite]"
        />
        <div className="text-[1.5rem] font-bold tracking-tighter text-[var(--color-text)]">
          Jems Dev
        </div>
        <div className="w-[200px] h-1 bg-[var(--color-border)] rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-[var(--color-text)] rounded-full transition-none"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <div className="text-[0.8rem] text-[var(--color-text-muted)] tracking-wider">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
