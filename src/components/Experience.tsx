"use client";

export default function Experience() {
  return (
    <section id="experience" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-10 tracking-tight relative inline-block">
          Work Experience
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>

        <div className="card flex items-start gap-4 relative edu-card-hover" style={{ transitionDelay: "0.25s" }}>
          <div className="edu-glow" />
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent-mid)] flex-shrink-0 overflow-hidden transition-all duration-200 edu-icon-hover">
            <img src="/Lumnaire.jpeg" alt="Lumnaire" className="w-6 h-6 object-contain block" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-[family-name:var(--font-sans)] text-[1.05rem] font-semibold mb-1">
              Lumnaire
            </h3>
            <p className="text-[0.85rem] text-[var(--color-text-muted)] tracking-tight">
              Web Developer
            </p>
            <p className="text-[0.85rem] text-[var(--color-text-muted)] mt-0.5">
              2026 — Present
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
