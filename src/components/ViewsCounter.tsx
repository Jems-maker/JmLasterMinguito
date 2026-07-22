"use client";

import { useState, useEffect, useRef } from "react";

function getViewsMessage(count: number) {
  if (count === 1) return { emoji: "👑", text: "You are the very first viewer!" };
  if (count === 2) return { emoji: "🥈", text: "You are the second viewer!" };
  if (count === 3) return { emoji: "🥉", text: "You are the third viewer!" };
  if (count <= 10) return { emoji: "⭐", text: `You are one of the first ${count} viewers!` };
  if (count <= 50) return { emoji: "🚀", text: `Viewer #${count} — you're early!` };
  if (count <= 100) return { emoji: "📈", text: `Viewer #${count} — hitting triple digits!` };
  return { emoji: "⚡", text: `Viewer #${count} — part of the crew!` };
}

export default function ViewsCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cached = localStorage.getItem("portfolio-cached-views");
    if (cached) setCount(parseInt(cached));

    fetch("https://api.counterapi.dev/v1/jemsminguito/portfolio/up")
      .then((res) => res.json())
      .then((data) => {
        const c = data.count ?? 0;
        setCount(c);
        localStorage.setItem("portfolio-cached-views", String(c));
      })
      .catch(() => {
        const cached = parseInt(localStorage.getItem("portfolio-cached-views") || "0");
        setCount(cached || null);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.closest(".views-wrapper")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="views-wrapper relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[0.78rem] text-[var(--color-text-muted)] cursor-pointer bg-transparent border border-[var(--color-border)] rounded-lg px-3 py-1 transition-all duration-200 hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
        title="Live Views"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>{count ?? "—"}</span>
      </button>

      {open && count !== null && (
        <div className="views-dropdown-comp visible">
          <div className="views-dropdown-body-comp">
            <span className="text-lg">{getViewsMessage(count).emoji}</span>
            <div>
              <div className="text-[0.8rem] text-[var(--color-text)] font-medium">
                {getViewsMessage(count).text}
              </div>
              <div className="text-[0.75rem] text-[var(--color-text-muted)]">
                Total: <strong>{count}</strong> visitors
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
