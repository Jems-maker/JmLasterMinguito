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
            Hi, I&apos;m <strong className="text-[var(--color-text)] font-semibold">Jm Laster D. Minguito</strong>, a passionate Information Technology student and developer.
            I specialize in building responsive web systems, cross-platform mobile applications, and innovative IoT hardware solutions.
            Bridging the gap between the physical and digital world through Arduino and ESP32 programming is what drives my curiosity.
            Whether I&apos;m writing clean code in modern frameworks or wiring hardware components, I am dedicated to crafting real-world solutions that are both functional and visually appealing.
          </p>
        </div>
      </div>
    </section>
  );
}
