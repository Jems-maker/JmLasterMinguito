"use client";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const captchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setCaptchaError("");
    const captchaToken = captchaRef.current?.getValue();

    if (!captchaToken) {
      setCaptchaError("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const result = (await response.json()) as { success: boolean; message: string };

      if (!response.ok || !result.success) {
        setCaptchaError(result.message || "Something went wrong. Please try again.");
        captchaRef.current?.reset();
        return;
      }

      setSubmitted(true);
      setShowModal(true);
      setFormData({ name: "", email: "", message: "" });
      captchaRef.current?.reset();
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setCaptchaError("Something went wrong. Please try again.");
      captchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="contact-icon-comp">
              <MailIcon />
            </span>
            <span>Email</span>
          </a>
          <a
            href="https://github.com/Jems-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item-comp reveal-sm"
            style={{ transitionDelay: "0.2s" }}
          >
            <span className="contact-icon-comp contact-icon-github">
              <GithubIcon />
            </span>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.facebook.com/JmMinguitoDev/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item-comp reveal-sm"
            style={{ transitionDelay: "0.3s" }}
          >
            <span className="contact-icon-comp contact-icon-facebook">
              <FacebookIcon />
            </span>
            <span>Facebook</span>
          </a>
        </div>

        {/* macOS-inspired contact window */}
        <div className="mt-16 reveal-sm" style={{ transitionDelay: "0.4s" }}>
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dots" role="img" aria-label="Window controls">
                <span className="terminal-dot terminal-dot-red" title="Close" />
                <span className="terminal-dot terminal-dot-yellow" title="Minimize" />
                <span className="terminal-dot terminal-dot-green" title="Maximize" />
              </div>
              <span className="terminal-title">Contact Form</span>
            </div>

            <div className="terminal-body">
              <form onSubmit={handleSubmit}>
                <div className="terminal-line">
                  <label className="terminal-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="terminal-input"
                    required
                  />
                </div>

                <div className="terminal-line">
                  <label className="terminal-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="terminal-input"
                    required
                  />
                </div>

                <div className="terminal-line">
                  <label className="terminal-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry"
                    className="terminal-textarea"
                    rows={4}
                    required
                  />
                </div>

                <div className="terminal-captcha">
                  {siteKey ? (
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={siteKey}
                      theme="dark"
                    />
                  ) : (
                    <p className="terminal-error" role="alert">
                      reCAPTCHA is not configured.
                    </p>
                  )}
                </div>

                {captchaError ? (
                  <p className="terminal-error" role="alert">
                    {captchaError}
                  </p>
                ) : null}

                <div className="terminal-button-row">
                  <button
                    type="submit"
                    className="terminal-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="terminal-loading">
                        <span className="terminal-loading-dot" />
                        <span>Sending...</span>
                      </span>
                    ) : submitted ? (
                      <span className="terminal-success">
                        <CheckIcon />
                        <span>Message sent</span>
                      </span>
                    ) : (
                      <span className="terminal-btn-text">
                        <span>Send Message</span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <CheckIcon />
            </div>
            <h3 id="contact-modal-title" className="modal-title">
              Message Sent Successfully!
            </h3>
            <p className="modal-description">
              Thank you for reaching out! Just wait for Jm's response — he'll get back to you as soon as possible.
            </p>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
