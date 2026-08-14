"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Project {
  title: string;
  desc: string;
  img: string;
  category: string;
  badge: string;
  tags: string[];
  icon: string;
}

const projects: Project[] = [
  // Web Systems
  { title: "Library Book Management", desc: "A full-stack library management system with REST API backend, React frontend, and MySQL database for efficient book tracking and patron management.", img: "/LBMS.png", category: "web", badge: "Web System", tags: ["Laravel REST API", "React", "TypeScript", "Tailwind CSS", "MySQL"], icon: "book" },
  { title: "ClinicCare", desc: "Clinic management and authentication system designed for seamless healthcare administration.", img: "/ClinicCare.jpg", category: "web", badge: "Web System", tags: ["PHP", "Laravel", "Tailwind CSS", "MySQL"], icon: "activity" },
  { title: "LENDSYS", desc: "Comprehensive lending administration system featuring an analytics dashboard and loan tracking.", img: "/lendsys.jpg", category: "web", badge: "Web System", tags: ["PHP", "MySQL", "JS", "Tailwind CSS"], icon: "credit-card" },
  { title: "TripTrack", desc: "Tricycle ride information, operations management, and trip reporting analytics control system for efficient transportation oversight.", img: "/TripTrack.png", category: "web", badge: "Web System", tags: ["PHP", "MySQL", "Bootstrap 5"], icon: "map-pin" },
  { title: "POS Web System", desc: "Point-of-sale system built with PHP & MySQL featuring inventory management, transaction processing, and a responsive dashboard.", img: "/pos.jpg", category: "web", badge: "Web System", tags: ["PHP", "MySQL", "Bootstrap"], icon: "shopping-cart" },
  { title: "SENIOR-CARE System", desc: "Senior citizen Engagement, Assistance, and Records management System built to streamline tracking and support for the elderly community.", img: "/senior_care.png", category: "web", badge: "Web System", tags: ["PHP", "MySQL", "Bootstrap 5"], icon: "users" },
  { title: "JemSite Media Platform", desc: "Ad-free, high-performance streaming environment for KDrama and Anime content.", img: "/JemSite.jpg", category: "web", badge: "Web System", tags: ["Node.js", "API", "React"], icon: "film" },
  // Mobile Apps
  { title: "AI Facial Assistance", desc: "AI-powered facial health assessment app built with React Native & TensorFlow. Analyzes skin conditions and provides personalized recommendations.", img: "/AiFacialAssistance.jpg", category: "mobile", badge: "Mobile App", tags: ["React Native", "Firebase", "TensorFlow"], icon: "scan-face" },
  { title: "PawCare App", desc: "Mobile application for pet care management, allowing seamless control of automated feeders and monitoring pet activities.", img: "/PawCareApp.jpg", category: "mobile", badge: "Mobile App", tags: ["Flutter", "Firebase", "IoT"], icon: "smartphone" },
  { title: "Jems App", desc: "A comprehensive Budget Tracker mobile application tailored for user convenience, featuring an intuitive UI to manage finances efficiently.", img: "/Jems.jpg", category: "mobile", badge: "Mobile App", tags: ["React Native", "Expo"], icon: "app-window" },
  // Hardware & IoT
  { title: "Medicare Arduino", desc: "Medical assistance and health monitoring system powered by Arduino and specialized bio-sensors.", img: "/Medicare.jpg", category: "hardware", badge: "Hardware", tags: ["Arduino", "C++", "Sensors"], icon: "heart-pulse" },
  { title: "Laundry Notifier", desc: "Automated system that detects when laundry is finished and sends real-time notifications.", img: "/LaundryNotifier.jpg", category: "hardware", badge: "Hardware", tags: ["Arduino", "C++", "IoT"], icon: "bell" },
  { title: "Automated Pet Feeder", desc: "Automated Pet Feeder connected and controlled using the PawCare App, enabling precise meal scheduling and monitoring.", img: "/IoTSystem.jpg", category: "hardware", badge: "IoT System", tags: ["ESP32", "IoT", "Firebase"], icon: "dog" },
];

const iconSvgs: Record<string, string> = {
  "shopping-cart": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  users: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  "map-pin": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  activity: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  film: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',
  "credit-card": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  "scan-face": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>',
  smartphone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  "app-window": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  "heart-pulse": '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  bell: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  dog: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 4.34-5 7.5-.86 2.242.8 4.5 2.06 4.5 1.5 0 3.13-1.5 4.44-2.5"/><path d="M14 5.172C14 3.782 15.577 2.679 17.5 3c2.823.47 4.113 4.34 5 7.5.86 2.242-.8 4.5-2.06 4.5-1.5 0-3.13-1.5-4.44-2.5"/><path d="M2 20c0-1.5 1.5-3 3-3h14c1.5 0 3 1.5 3 3v0c0 1-1 2-2 2H4c-1 0-2-1-2-2z"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
};

const FILTERS = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "hardware", label: "Hardware & IoT" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDragging, setIsDragging] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll(".project-card-comp");
    const card = cards[index] as HTMLElement | undefined;
    if (card) {
      carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: "smooth" });
    }
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (userInteracted) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    autoSlideRef.current = setInterval(() => {
      const visibleCards = Array.from(carousel.querySelectorAll(".project-card-comp"));
      if (visibleCards.length === 0) return;

      const cardWidth = (visibleCards[0] as HTMLElement).offsetWidth + 24;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
      updateDots();
    }, 3000);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [activeFilter, userInteracted]);

  const updateDots = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = carousel.querySelectorAll(".project-card-comp");
    const dots = document.querySelectorAll(".carousel-dot-comp");
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let activeIdx = 0;

    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      if (cardCenter <= center) activeIdx = i;
    });

    dots.forEach((dot, i) => {
      if (i === activeIdx) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  };

  // Mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setUserInteracted(true);
    dragStartX.current = e.screenX;
    if (carouselRef.current) {
      dragStartScroll.current = carouselRef.current.scrollLeft;
      carouselRef.current.classList.add("grabbing");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const diff = e.screenX - dragStartX.current;
    carouselRef.current.scrollLeft = dragStartScroll.current - diff;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);
    carouselRef.current.classList.remove("grabbing");

    const diff = e.screenX - dragStartX.current;
    if (Math.abs(diff) < 30) return;

    const visibleCards = Array.from(carouselRef.current.querySelectorAll(".project-card-comp"));
    if (visibleCards.length === 0) return;
    const cardWidth = (visibleCards[0] as HTMLElement).offsetWidth + 24;

    if (diff < -50) {
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    } else if (diff > 50) {
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  // Touch swipe
  const touchStartX = useRef(0);
  const touchStartScroll = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setUserInteracted(true);
    touchStartX.current = e.touches[0].screenX;
    if (carouselRef.current) {
      touchStartScroll.current = carouselRef.current.scrollLeft;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    const diffX = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diffX) < 30) return;

    const visibleCards = Array.from(carouselRef.current.querySelectorAll(".project-card-comp"));
    if (visibleCards.length === 0) return;
    const cardWidth = (visibleCards[0] as HTMLElement).offsetWidth + 24;

    if (diffX > 50) {
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    } else if (diffX < -50) {
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    setUserInteracted(true);
    // Reset scroll when filter changes
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="section reveal">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="font-[family-name:var(--font-sans)] text-[1.5rem] font-semibold mb-10 tracking-tight relative inline-block">
          Projects
          <span className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[var(--color-accent)] rounded-full" />
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterClick(f.value)}
              className={`filter-btn-comp ${activeFilter === f.value ? "active" : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative carousel-wrapper">
          <button
            onClick={() => {
              setUserInteracted(true);
              const carousel = carouselRef.current;
              if (!carousel) return;
              const cards = carousel.querySelectorAll(".project-card-comp");
              if (!cards.length) return;
              const cardWidth = (cards[0] as HTMLElement).offsetWidth + 24;
              carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
            }}
            className="carousel-nav-comp absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
            aria-label="Previous Project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="projects-carousel flex gap-6 overflow-x-auto px-2 py-1"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              if (isDragging) {
                setIsDragging(false);
                carouselRef.current?.classList.remove("grabbing");
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onScroll={updateDots}
          >
            {filteredProjects.map((project, i) => (
              <div key={`${project.title}-${i}`} className="card project-card-comp">
                <div className="project-img-wrapper-comp">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-[var(--color-text-muted)]"
                    dangerouslySetInnerHTML={{ __html: iconSvgs[project.icon] || "" }}
                  />
                  <span className="project-badge-comp">{project.badge}</span>
                </div>
                <h3 className="font-[family-name:var(--font-sans)] text-[1.1rem] font-semibold tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-[0.85rem] text-[var(--color-text-muted)] leading-relaxed">
                  {project.desc}
                </p>
                <div className="project-tags-comp">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setUserInteracted(true);
              const carousel = carouselRef.current;
              if (!carousel) return;
              const cards = carousel.querySelectorAll(".project-card-comp");
              if (!cards.length) return;
              const cardWidth = (cards[0] as HTMLElement).offsetWidth + 24;
              carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
            }}
            className="carousel-nav-comp absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
            aria-label="Next Project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        {filteredProjects.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setUserInteracted(true);
                  scrollToIndex(i);
                }}
                className={`carousel-dot-comp ${i === 0 ? "active" : ""}`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}