"use client";

export default function About() {
  return (
    <section id="about" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-6 tracking-tight relative inline-block">
          About Me
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>
        <div className="reveal-sm" style={{ transitionDelay: "0.15s" }}>
          <p className="text-[0.95rem] text-[var(--color-text)] leading-[1.8] text-justify">
            Hi, I'm <span className="text-[var(--color-text)]">Jm Laster D. Minguito</span>, a <span className="text-[var(--color-text)]">20 years old, 3rd year Information Technology student</span> and developer passionate about building innovative technology solutions. I specialize in developing <span className="text-[var(--color-text)]">responsive web systems</span>, <span className="text-[var(--color-text)]">cross-platform mobile applications</span>, and <span className="text-[var(--color-text)]">hardware systems using Arduino and ESP32</span>. I enjoy creating practical solutions that bridge software and hardware, transforming ideas into reliable, efficient, and user-friendly applications. As I continue to learn and grow, I'm always exploring new technologies and taking on projects that challenge me to build impactful solutions for real-world needs.
          </p>
        </div>
      </div>
    </section>
  );
}
