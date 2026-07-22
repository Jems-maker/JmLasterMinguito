"use client";

export default function Contact() {
  return (
    <section id="contact" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-10 tracking-tight relative inline-block">
          Let&apos;s Connect
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>

        <p className="text-[var(--color-text-muted)] text-base mb-8 reveal-sm" style={{ transitionDelay: "0.2s" }}>
          Open for collaborations, internships, and exciting projects.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:jmlasterminguito@gmail.com"
            className="contact-item-comp reveal-sm"
            style={{ transitionDelay: "0.1s" }}
          >
            <MailIcon />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/Jems-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item-comp reveal-sm"
            style={{ transitionDelay: "0.2s" }}
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.facebook.com/JmMinguitoDev/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item-comp reveal-sm"
            style={{ transitionDelay: "0.3s" }}
          >
            <FacebookIcon />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
