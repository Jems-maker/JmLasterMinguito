"use client";

import { useEffect } from "react";

function initScrollReveal() {
  const revealElements = document.querySelectorAll<HTMLElement>(
    ".reveal, .reveal-sm, .reveal-scale"
  );

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("active");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Loader hides after 3s, so init scroll reveal just after that
    const timer = setTimeout(initScrollReveal, 3200);
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
