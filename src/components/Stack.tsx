"use client";

const categories = [
  {
    label: "Web",
    items: [
      { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Expo", icon: "https://cdn.simpleicons.org/expo/000020" },
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "SQLite", icon: "https://cdn.simpleicons.org/sqlite/003B57" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8F" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "Arduino", icon: "https://cdn.simpleicons.org/arduino/00979D" },
      { name: "ESP32", icon: "https://cdn.simpleicons.org/espressif/E7352C" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg" },
      { name: "Arduino IDE", icon: "https://cdn.simpleicons.org/arduino/00979D" },
      { name: "XAMPP", icon: "https://cdn.simpleicons.org/xampp/FB7A24" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-10 tracking-tight relative inline-block">
          Tech Stack
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>

        <div className="space-y-6 overflow-visible">
          {categories.map((category) => (
            <div key={category.label}>
              <h3 className="font-[family-name:var(--font-sans)] text-[0.85rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {category.items.map((item) => (
                  <div key={item.name} className="tech-item-comp">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-[22px] h-[22px] opacity-85 transition-all duration-300 flex-shrink-0 tech-item-icon"
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
