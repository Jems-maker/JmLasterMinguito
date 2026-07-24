"use client";

export default function About() {
  return (
    <section id="about" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-10 tracking-tight relative inline-block">
          About Me
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>
        <div className="reveal-sm" style={{ transitionDelay: "0.15s" }}>
          <p className="text-[1.05rem] text-[var(--color-text)] leading-relaxed">
            Hi, I&apos;m <strong className="text-[var(--color-text)] font-semibold">Jm Laster D. Minguito</strong>, a <strong className="text-[var(--color-text)] font-semibold">20 years old, 3rd year Information Technology student</strong> and developer passionate about building innovative technology solutions. I specialize in developing <strong className="text-[var(--color-text)] font-semibold">responsive web systems</strong>, <strong className="text-[var(--color-text)] font-semibold">cross-platform mobile applications</strong>, and <strong className="text-[var(--color-text)] font-semibold">hardware systems using Arduino and ESP32</strong>. I enjoy creating practical solutions that bridge software and hardware, transforming ideas into reliable, efficient, and user-friendly applications. As I continue to learn and grow, I&apos;m always exploring new technologies and taking on projects that challenge me to build impactful solutions for real-world needs.
          </p>
        </div>
      </div>
    </section>
  );
}
