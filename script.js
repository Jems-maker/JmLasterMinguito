// ===== Loading Screen with Progress Bar =====
const loader = document.getElementById('loader');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let progress = 0;
let progressInterval = null;

function setProgress(value) {
  progress = Math.min(value, 100);
  if (progressBar) progressBar.style.width = progress + '%';
  if (progressText) progressText.textContent = progress + '%';
}

function animateProgress() {
  // Smooth climb to 90% in 2.7 seconds (27 steps × 100ms)
  const step = 90 / 27;
  if (progress < 90) {
    setProgress(progress + step);
  } else {
    clearInterval(progressInterval);
    progressInterval = null;
  }
}

function completeLoading() {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  // Animate from current progress to 100% smoothly
  const remaining = 100 - progress;
  const steps = 10;
  const stepSize = remaining / steps;
  let count = 0;
  const finishInterval = setInterval(() => {
    count++;
    setProgress(progress + stepSize * count);
    if (count >= steps) {
      clearInterval(finishInterval);
      setProgress(100);
      // Hide loader after user sees 100%
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
      }, 400);
    }
  }, 50);
}

// Start progress animation – fills to 90% over 2.7 seconds (27 steps × 100ms)
progressInterval = setInterval(animateProgress, 100);

// Only complete after at least 3 seconds have passed
let loadEventFired = false;
let minTimeReached = false;

window.addEventListener('load', () => {
  loadEventFired = true;
  if (minTimeReached) completeLoading();
});

setTimeout(() => {
  minTimeReached = true;
  if (loadEventFired) completeLoading();
}, 3000);

// Fallback: force complete after 5 seconds
setTimeout(completeLoading, 5000);

setTimeout(() => {
  minTimeReached = true;
  if (loadEventFired) completeLoading();
}, 5000);

// Fallback: force complete after 7 seconds
setTimeout(completeLoading, 7000);

// ===== Live Views Counter =====
const viewsDisplay = document.getElementById('views-count');
const viewsBadge = document.getElementById('views-badge');

function updateLiveViews() {
  let viewerId = localStorage.getItem('portfolio-viewer-id');
  if (!viewerId) {
    // First visit: generate a unique ID and register this viewer
    viewerId = 'viewer-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('portfolio-viewer-id', viewerId);
    localStorage.setItem('portfolio-viewed', 'true');
  }

  // Count total unique viewers stored in localStorage
  // Each new viewer gets their own entry
  const viewerKey = 'portfolio-viewer-list';
  let viewersList = JSON.parse(localStorage.getItem(viewerKey) || '[]');

  if (!viewersList.includes(viewerId)) {
    viewersList.push(viewerId);
    localStorage.setItem(viewerKey, JSON.stringify(viewersList));
  }

  const count = viewersList.length;
  if (viewsDisplay) viewsDisplay.textContent = count;
  return count;
}

// Run on page load
const totalViewers = updateLiveViews();

// ===== Views Badge Click - Show Dropdown =====
let viewsDropdown = null;

function getViewsMessage(count) {
  if (count === 1) return { emoji: '👑', text: 'You are the very first viewer!' };
  if (count === 2) return { emoji: '🥈', text: 'You are the second viewer!' };
  if (count === 3) return { emoji: '🥉', text: 'You are the third viewer!' };
  if (count <= 10) return { emoji: '⭐', text: `You are one of the first ${count} viewers!` };
  if (count <= 50) return { emoji: '🚀', text: `Viewer #${count} — you're early!` };
  if (count <= 100) return { emoji: '📈', text: `Viewer #${count} — hitting triple digits!` };
  return { emoji: '⚡', text: `Viewer #${count} — part of the crew!` };
}

function toggleViewsDropdown(count) {
  // Remove if already open
  if (viewsDropdown) {
    viewsDropdown.remove();
    viewsDropdown = null;
    return;
  }

  const msg = getViewsMessage(count);

  viewsDropdown = document.createElement('div');
  viewsDropdown.className = 'views-dropdown';
  viewsDropdown.innerHTML = `
    <div class="views-dropdown-arrow"></div>
    <div class="views-dropdown-body">
      <span class="views-dropdown-emoji">${msg.emoji}</span>
      <div>
        <div class="views-dropdown-text">${msg.text}</div>
        <div class="views-dropdown-total">Total: <strong>${count}</strong> visitors</div>
      </div>
    </div>
  `;

  // Position it after the badge
  viewsBadge.parentElement.style.position = 'relative';
  viewsBadge.parentElement.appendChild(viewsDropdown);

  // Show with animation
  requestAnimationFrame(() => {
    viewsDropdown.classList.add('visible');
  });
}

// Click to toggle dropdown
if (viewsBadge) {
  viewsBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleViewsDropdown(totalViewers);
  });
}

// Click outside to close
document.addEventListener('click', (e) => {
  if (viewsDropdown && !e.target.closest('.views-dropdown') && !e.target.closest('.views-badge')) {
    viewsDropdown.remove();
    viewsDropdown = null;
  }
});

// ===== Initialize Lucide Icons =====
lucide.createIcons();

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ===== Active nav link =====
function updateActiveNav() {
  const sections = ['home', 'about', 'stack', 'projects', 'education', 'contact'];
  const scrollY = window.scrollY + 100;
  
  sections.forEach(id => {
    const el = document.getElementById(id);
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!el || !link) return;
    
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    
    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// ===== Hamburger menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const hamburgerIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  // Swap icon between menu and X
  if (isOpen) {
    hamburgerIcon.setAttribute('data-lucide', 'x');
  } else {
    hamburgerIcon.setAttribute('data-lucide', 'menu');
  }
  lucide.createIcons();
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburgerIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  }
});

// ===== Typed Text Effect =====
const phrases = [
  'Web Systems',
  'Mobile Apps',
  'Arduino Projects',
  'IoT Systems',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  if (!typedEl) return;
  const current = phrases[phraseIdx];
  
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }
  
  let speed = isDeleting ? 40 : 80;
  
  if (!isDeleting && charIdx === current.length) {
    speed = 2000; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    speed = 500; // Pause before typing next word
  }
  
  setTimeout(type, speed);
}

// Start typing effect
setTimeout(type, 1000);

// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const iconLight = document.querySelector('.icon-light');
const iconDark = document.querySelector('.icon-dark');

// Check for saved user preference
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';

if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  updateToggleUI('dark');
} else {
  document.documentElement.removeAttribute('data-theme');
  updateToggleUI('light');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  if (newTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  
  localStorage.setItem('portfolio-theme', newTheme);
  updateToggleUI(newTheme);
});

function updateToggleUI(theme) {
  if (theme === 'dark') {
    iconLight.style.display = 'block';
    iconDark.style.display = 'none';
    themeText.textContent = 'Light Mode';
  } else {
    iconLight.style.display = 'none';
    iconDark.style.display = 'block';
    themeText.textContent = 'Dark Mode';
  }
}

// ===== Chatbot: Portfolio Assistant =====
const chatbotToggle   = document.getElementById('chatbot-toggle');
const chatbotWindow   = document.getElementById('chatbot-window');
const chatbotClose    = document.getElementById('chatbot-close');
const chatbotInput    = document.getElementById('chatbot-input');
const chatbotSend     = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// === Toggle open/close ===
chatbotToggle.addEventListener('click', () => {
  chatbotWindow.classList.toggle('open');
  if (chatbotWindow.classList.contains('open') && chatbotMessages.children.length === 0) {
    addMessage("Hi! 👋 Ask me anything about Jm Laster's portfolio — projects, skills, or contact info!", 'ai-message');
    addQuickChips(['Projects', 'Tech Stack', 'Contact', 'About']);
  }
});
chatbotClose?.addEventListener('click', () => {
  chatbotWindow.classList.remove('open');
});

// === Quick Chips ===
function addQuickChips(labels) {
  const wrap = document.createElement('div');
  wrap.className = 'quick-chips';
  labels.forEach(label => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = label;
    chip.addEventListener('click', () => {
      chatbotInput.value = label;
      handleSendMessage();
    });
    wrap.appendChild(chip);
  });
  chatbotMessages.appendChild(wrap);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// === Portfolio Knowledge Base ===
const portfolioKB = [
  {
    keys: ['project', 'built', 'made', 'work', 'app', 'system'],
    answer: `Here are Jm Laster's projects:\n\n🌐 **Web Systems**\n• POS Web System — PHP, MySQL, Bootstrap\n• SENIOR-CARE System — PHP, MySQL, Bootstrap 5\n• TripTrack — PHP, MySQL, Bootstrap 5\n• ClinicCare — PHP, Laravel, Tailwind CSS, MySQL\n• JemSite Media Platform — Node.js, React, API\n• LENDSYS — PHP, MySQL, JS, Tailwind CSS\n\n📱 **Mobile Apps**\n• AI Facial Assistance — React Native, Firebase, TensorFlow\n• PawCare App — Flutter, Firebase, IoT\n• Jems App (Budget Tracker) — React Native, Expo\n\n🔧 **Hardware & IoT**\n• Medicare Arduino — Arduino, C++, Sensors\n• Laundry Notifier — Arduino, C++, IoT\n• Automated Pet Feeder — ESP32, IoT, Firebase`
  },
  {
    keys: ['tech', 'stack', 'language', 'framework', 'skill', 'use', 'know'],
    answer: `💻 **Tech Stack**\n\n**Languages:** PHP, JavaScript, Dart, C++\n**Frameworks:** Laravel, React, React Native, Flutter, Bootstrap, Tailwind CSS\n**Databases:** MySQL, Firebase\n**Hardware:** Arduino, ESP32\n**Tools:** Node.js, Expo, REST APIs, TensorFlow, IoT`
  },
  {
    keys: ['contact', 'email', 'reach', 'hire', 'message', 'get in touch', 'github', 'facebook'],
    answer: `📬 **Contact Jm Laster**\n\n• 📧 Email: jmlasterminguito@gmail.com\n• 🐙 GitHub: github.com/Jems-maker\n• 📘 Facebook: facebook.com/JmMinguitoDev\n\nHe is currently **Open for Commission!** 🎉`
  },
  {
    keys: ['hi', 'hello', 'hey', 'greetings', 'sup', 'morning', 'afternoon', 'evening'],
    answer: `Hello there! 👋 I'm Jems Assistant. You can ask me about Jm Laster's projects, skills, contact info, or background!`
  },
  {
    keys: ['nickname', 'pogi', 'jems'],
    answer: `Jm Laster's nicknames are **Pogi** and **Jems**! 😎`
  },
  {
    keys: ['age', 'birthday', 'born', 'how old', 'birthdate'],
    answer: `🎂 Jm Laster is **20 years old**. His birthdate is **October 22, 2005**.`
  },
  {
    keys: ['live', 'location', 'where', 'address', 'from'],
    answer: `📍 He lives in **Brgy. Bs Aquino Purok Legada, Norala, South Cotabato**.`
  },
  {
    keys: ['status', 'single', 'relationship', 'girlfriend'],
    answer: `👤 His current status is **Single**.`
  },
  {
    keys: ['weakness', 'weak'],
    answer: `💔 His weakness is: **Selos** 🥺`
  },
  {
    keys: ['strength', 'strong'],
    answer: `💪 His strength is: **Si Ano po Hehehe secrettt** 🥰`
  },
  {
    keys: ['course', 'college', 'university', 'degree', 'currently studying'],
    answer: `🎓 He is currently a **3rd Year BS Information Technology** student at **Sultan Kudarat State University**.`
  },
  {
    keys: ['high school', 'senior high', 'junior high'],
    answer: `🏫 He attended **Norala National High School** for Junior and Senior High School. He even won the *"Most cute in classroom"* award! 😄`
  },
  {
    keys: ['elementary'],
    answer: `🎒 He attended **Norala Central Elementary School**, where he received the Loyalty award, *"most adorable person HAHAH"*, and *"most Cute in Classroom Hehe"*.`
  },
  {
    keys: ['education', 'school'],
    answer: `🎓 **Education:**\n• **College:** Sultan Kudarat State University (BSIT, 3rd Yr)\n• **High School:** Norala National High School\n• **Elementary:** Norala Central Elementary School\n\n*(Tip: Ask me about his high school or elementary specifically to see his funny awards!)*`
  },
  {
    keys: ['about', 'who', 'jm', 'laster', 'minguito', 'developer', 'person', 'background'],
    answer: `👨‍💻 **About Jm Laster D. Minguito**\n\nJm Laster (aka Jems) is a passionate 20-year-old IT student and developer from South Cotabato.\n\nHe specializes in building Web Systems, Mobile Apps, and IoT/Arduino projects. He is currently **Open for Commission** — feel free to reach out!`
  },
  {
    keys: ['cliniccare', 'clinic'],
    answer: `🏥 **ClinicCare**\nA clinic management & authentication system for seamless healthcare administration.\n\n**Stack:** PHP · Laravel · Tailwind CSS · MySQL`
  },
  {
    keys: ['lendsys', 'lending', 'loan'],
    answer: `💳 **LENDSYS**\nA comprehensive lending administration system with an analytics dashboard and loan tracking.\n\n**Stack:** PHP · MySQL · JavaScript · Tailwind CSS`
  },
  {
    keys: ['pawcare', 'paw', 'pet feeder', 'pet', 'feeder'],
    answer: `🐾 **PawCare App + Automated Pet Feeder**\nA Flutter mobile app for pet care management that controls an ESP32-based automated pet feeder via Firebase.\n\n**Mobile Stack:** Flutter · Firebase · IoT\n**IoT Stack:** ESP32 · Firebase`
  },
  {
    keys: ['jems app', 'budget', 'tracker', 'finance'],
    answer: `💰 **Jems App** (Budget Tracker)\nA comprehensive Budget Tracker mobile app tailored for managing finances efficiently with an intuitive UI.\n\n**Stack:** React Native · Expo`
  },
  {
    keys: ['jemsite', 'streaming', 'kdrama', 'anime', 'media'],
    answer: `🎬 **JemSite Media Platform**\nAn ad-free, high-performance streaming environment for KDrama and Anime content.\n\n**Stack:** Node.js · React · TMDB API`
  },
  {
    keys: ['pos', 'point of sale', 'inventory', 'motor'],
    answer: `🛒 **POS Web System**\nA point-of-sale system with inventory management, transaction processing, and a responsive dashboard.\n\n**Stack:** PHP · MySQL · Bootstrap`
  },
  {
    keys: ['triptrack', 'trip', 'travel'],
    answer: `🗺️ **TripTrack**\nA travel management system for booking and tracking trip details.\n\n**Stack:** PHP · MySQL · Bootstrap 5`
  },
  {
    keys: ['senior care', 'senior', 'elderly'],
    answer: `🧓 **SENIOR-CARE System**\nA system for elderly care management with health monitoring.\n\n**Stack:** PHP · MySQL · Bootstrap 5`
  },
  {
    keys: ['medicare', 'health', 'sensor', 'arduino'],
    answer: `❤️ **Medicare Arduino**\nA medical assistance and health monitoring system powered by Arduino and specialized bio-sensors.\n\n**Stack:** Arduino · C++ · Sensors`
  },
  {
    keys: ['laundry', 'notifier', 'notification'],
    answer: `🧺 **Laundry Notifier**\nAutomated system that detects when laundry is done and sends real-time notifications.\n\n**Stack:** Arduino · C++ · IoT`
  }
];

function getPortfolioAnswer(text) {
  const lower = text.toLowerCase();
  for (const entry of portfolioKB) {
    if (entry.keys.some(k => lower.includes(k))) {
      return entry.answer;
    }
  }
  return "Hmm, I'm not sure about that 🤔 Try asking about **projects**, **tech stack**, **contact**, or **about Jm Laster**!";
}

// === Send Message Handler ===
function handleSendMessage() {
  const text = chatbotInput.value.trim();
  if (!text) return;
  addMessage(text, 'user-message');
  chatbotInput.value = '';

  setTimeout(() => {
    const answer = getPortfolioAnswer(text);
    addMessage(answer, 'ai-message');
  }, 300);
}

function addMessage(text, className, id = null) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${className}`;
  if (id) msgDiv.id = id;
  msgDiv.innerHTML = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotSend.addEventListener('click', handleSendMessage);
chatbotInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSendMessage(); });


// ===== Projects Carousel & Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsCarousel = document.getElementById('projects-carousel');
const prevNav = document.querySelector('.prev-nav');
const nextNav = document.querySelector('.next-nav');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
    
    if (projectsCarousel) {
      projectsCarousel.scrollLeft = 0;
      updateCarouselNav();
    }
  });
});

if (projectsCarousel && prevNav && nextNav) {
  const getScrollAmount = () => {
    const card = Array.from(projectCards).find(c => c.style.display !== 'none');
    return card ? card.offsetWidth + 24 : 340;
  };

  nextNav.addEventListener('click', () => {
    projectsCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  prevNav.addEventListener('click', () => {
    projectsCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  projectsCarousel.addEventListener('scroll', updateCarouselNav);
  window.addEventListener('resize', updateCarouselNav);

  function updateCarouselNav() {
    if (projectsCarousel.scrollLeft <= 5) {
      prevNav.classList.add('hidden');
    } else {
      prevNav.classList.remove('hidden');
    }
    
    const maxScroll = projectsCarousel.scrollWidth - projectsCarousel.clientWidth;
    if (maxScroll <= 0 || projectsCarousel.scrollLeft >= maxScroll - 5) {
      nextNav.classList.add('hidden');
    } else {
      nextNav.classList.remove('hidden');
    }
  }

  // Initial check
  setTimeout(updateCarouselNav, 100);
}
