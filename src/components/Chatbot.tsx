"use client";

import { useState, useRef, useEffect } from "react";

interface KBEntry {
  keys: string[];
  answer: string;
}

const portfolioKB: KBEntry[] = [
  {
    keys: ["project", "built", "made", "work", "app", "system"],
    answer: `Here are Jm Laster's projects:\n\n🌐 Web Systems\n• POS Web System — PHP, MySQL, Bootstrap\n• SENIOR-CARE System — PHP, MySQL, Bootstrap 5\n• TripTrack — PHP, MySQL, Bootstrap 5\n• ClinicCare — PHP, Laravel, Tailwind CSS, MySQL\n• JemSite Media Platform — Node.js, React, API\n• LENDSYS — PHP, MySQL, JS, Tailwind CSS\n\n📱 Mobile Apps\n• AI Facial Assistance — React Native, Firebase, TensorFlow\n• PawCare App — Flutter, Firebase, IoT\n• Jems App (Budget Tracker) — React Native, Expo\n\n🔧 Hardware & IoT\n• Medicare Arduino — Arduino, C++, Sensors\n• Laundry Notifier — Arduino, C++, IoT\n• Automated Pet Feeder — ESP32, IoT, Firebase`,
  },
  {
    keys: ["tech", "stack", "language", "framework", "skill", "use", "know"],
    answer: `💻 Tech Stack\n\nLanguages: PHP, JavaScript, Dart, C++\nFrameworks: Next.js, React, Laravel, React Native, Flutter, Tailwind CSS\nDatabases: MySQL, Firebase\nHardware: Arduino, ESP32\nTools: Node.js, Expo, REST APIs, TensorFlow, IoT`,
  },
  {
    keys: ["contact", "email", "reach", "hire", "message", "github", "facebook"],
    answer: `📬 Contact Jm Laster\n\n• Email: jmlasterminguito@gmail.com\n• GitHub: github.com/Jems-maker\n• Facebook: facebook.com/JmMinguitoDev\n\nHe is currently Open for Commission! 🎉`,
  },
  {
    keys: ["hi", "hello", "hey", "sup"],
    answer: "Hello there! 👋 I'm Jems Assistant. Ask me about Jm Laster's projects, skills, contact info, or background!",
  },
  {
    keys: ["about", "who", "jm", "laster", "minguito", "developer"],
    answer: `👨‍💻 About Jm Laster D. Minguito\n\nJm Laster (aka Jems) is a passionate 20-year-old IT student and developer from South Cotabato. He specializes in building Web Systems, Mobile Apps, and IoT/Arduino projects. He is currently Open for Commission!`,
  },
  {
    keys: ["course", "college", "university", "degree", "education", "school"],
    answer: `🎓 Education\n\n• College: Sultan Kudarat State University (BSIT, 3rd Yr)\n• High School: Norala National High School\n• Elementary: Norala Central Elementary School`,
  },
  {
    keys: ["age", "birthday", "how old"],
    answer: "🎂 Jm Laster is 20 years old. His birthdate is October 22, 2005.",
  },
  {
    keys: ["live", "location", "where", "from"],
    answer: "📍 He lives in Brgy. Bs Aquino Purok Legada, Norala, South Cotabato.",
  },
];

function getAnswer(text: string): string {
  const lower = text.toLowerCase();
  for (const entry of portfolioKB) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.answer;
  }
  return "Hmm, I'm not sure about that 🤔 Try asking about projects, tech stack, contact, or about Jm Laster!";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ text: "Hi! 👋 Ask me anything about Jm Laster's portfolio — projects, skills, or contact info!", isUser: false }]);
    }
  }, [open, messages.length]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { text, isUser: true }]);
    setTimeout(() => {
      const answer = getAnswer(text);
      setMessages((prev) => [...prev, { text: answer, isUser: false }]);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
      {open && (
        <div className="w-[320px] h-[480px] bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg flex flex-col overflow-hidden animate-[slideUp_0.3s_ease]">
          <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg)]">
            <div>
              <h4 className="text-[0.95rem] font-semibold mb-0.5">Jems Assistant</h4>
              <span className="text-[0.75rem] text-green-500 flex items-center gap-1.5 before:content-[''] before:w-[6px] before:h-[6px] before:bg-green-500 before:rounded-full">
                Instant replies · Ask me anything!
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="bg-transparent border-none text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[0.85rem] leading-relaxed ${
                  msg.isUser
                    ? "bg-[var(--color-accent)] text-[var(--color-bg)] self-end rounded-br-[4px]"
                    : "bg-[var(--color-bg)] border border-[var(--color-border)] self-start rounded-bl-[4px]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\n/g, "<br/>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3.5 border-t border-[var(--color-border)] flex gap-2 bg-[var(--color-bg)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] px-3.5 py-2 rounded-lg text-[var(--color-text)] text-[0.82rem] outline-none focus:border-[var(--color-accent-mid)]"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-[var(--color-accent-hover)] hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] border-none cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-108"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
}
