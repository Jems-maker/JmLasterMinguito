"use client";

import { useEffect, useRef, useState } from "react";
import ViewsCounter from "./ViewsCounter";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      // Active nav link tracking
      const sections = navLinks.map((l) => l.href.slice(1));
      const scrollY = window.scrollY + 100;
      sections.forEach((id) => {
        const el = document.getElementById(id);
        const link = navbar.querySelector(`a[href="#${id}"]`);
        if (!el || !link) return;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          navbar.querySelectorAll(".nav-link-comp").forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-[720px] md:max-w-[1000px]
          bg-[color-mix(in_srgb,var(--color-bg-card)_80%,transparent)]
          backdrop-blur-[16px] border border-[color-mix(in_srgb,var(--color-border)_60%,transparent)]
          rounded-xl px-2 transition-all duration-300"
      >
        <div className="flex items-center justify-between h-[52px] px-3">
          <a
            href="#home"
            className="font-[family-name:var(--font-sans)] font-semibold text-[var(--color-text)] no-underline text-base tracking-tight"
          >
            Jems Dev
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-1 items-center list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link-comp text-[var(--color-text-muted)] no-underline text-[0.85rem] px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-bg-hover)_60%,transparent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ViewsCounter />

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden bg-transparent border-none cursor-pointer text-[var(--color-text)] flex items-center p-1"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-nav-links md:hidden ${mobileOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="nav-link-comp"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
