"use client";

const educationData = [
  {
    school: "Sultan Kudarat State University",
    degree: "Bachelor of Science in Information Technology — 3rd Year",
    period: "2026 — Present",
    icon: "graduation-cap",
  },
  {
    school: "Norala National High School",
    degree: "Junior & Senior High School",
    period: "2016 — 2024",
    icon: "school",
  },
  {
    school: "Norala Central Elementary School",
    degree: "Primary Education",
    period: "2010 — 2016",
    icon: "book-open",
  },
];

const iconSvgs: Record<string, string> = {
  "graduation-cap": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  school: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 22V8l-6-4-6 4v14"/><path d="M2 22h20"/><path d="M12 6v.01"/><path d="M12 10v.01"/><path d="M12 14v.01"/></svg>',
  "book-open": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
};

export default function Education() {
  return (
    <section id="education" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-10 tracking-tight relative inline-block">
          Education
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {educationData.map((item, i) => (
            <div
              key={item.school}
              className="card flex items-start gap-4 relative edu-card-hover"
              style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
            >
              {/* Accent glow pseudo-element */}
              <div className="edu-glow" />
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent-mid)] flex-shrink-0 transition-all duration-200 edu-icon-hover">
                <span dangerouslySetInnerHTML={{ __html: iconSvgs[item.icon] || "" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-[family-name:var(--font-sans)] text-[1.05rem] font-semibold mb-1">
                  {item.school}
                </h3>
                <p className="text-[0.85rem] text-[var(--color-text-muted)] tracking-tight">
                  {item.degree}
                </p>
                <p className="text-[0.85rem] text-[var(--color-text-muted)] mt-0.5">
                  {item.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
