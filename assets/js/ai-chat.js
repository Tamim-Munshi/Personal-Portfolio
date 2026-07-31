/* =========================================================================
   AI CHATBOX v2 — "Ask About Tamim"
   Self-contained, dependency-free (no React/Framer Motion build step exists
   in this project, so premium motion is implemented with CSS keyframes +
   Web Animations timing that mirrors Framer Motion's easing curves).
   Answers are generated entirely from PORTFOLIO_DATA below — no external
   AI API call, so nothing is ever hallucinated. Edit PORTFOLIO_DATA to
   update what the assistant knows.
   ========================================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. PORTFOLIO KNOWLEDGE BASE — the single source of truth
   * ------------------------------------------------------------------ */
  const PORTFOLIO_DATA = {
    name: "Mohammad Tamim Munshi Mubashir",
    shortName: "Tamim",
    role: "Software Engineering Student & Aspiring AI Engineer",
    university: "Daffodil International University (DIU)",
    program: "B.Sc. in Software Engineering — currently in semester 6 of 12",
    email: "tamimmunshi262@gmail.com",
    phone: "+880 1997-421522",
    github: "https://github.com/Tamim-Munshi",
    linkedin: "https://www.linkedin.com/in/tamim-munshi-a33536306",
    cv: "assets/cv/Tamim_Munshi_CV.pdf",
    about:
      "Tamim is a Software Engineering student at Daffodil International University, passionate about Artificial Intelligence, Machine Learning, Data Science and modern Web Development — he enjoys building real-world applications and turning what he learns into working projects.",
    skills: [
      "Java", "Python", "JavaScript", "C", "HTML", "CSS", "Responsive Design", "MySQL", "Machine Learning", "Data Science", "Pandas", "NumPy"
    ],
    experience:
      "Tamim is currently a Software Engineering student and an Executive Member of the DIU Software Engineering Club, while also learning Machine Learning, Deep Learning, Python, Data Science and Computer Vision through self-study and practical projects.",
    education:
      "Pursuing a B.Sc. in Software Engineering at Daffodil International University (DIU) since 2024 — currently in semester 6 of the 12-semester program, with a 3.70/4.00 CGPA. Completed HSC and SSC at Uttara High School & College with a GPA of 5.00 in both.",
    certificates: [
      { title: "DIU Code Trap Programming Contest" },
      { title: "DIU Science Olympiad — Fall 2024" },
      { title: "Object-Oriented Programming in Java" },
      { title: "AI Innovation Hackathon 2026" },
      { title: "Python for Data Science" },
      { title: "Machine Learning Fundamentals" }
    ],
    projects: [
      {
        title: "AI Marketplace Platform",
        subtitle: "AI + Web",
        desc: "An AI-powered marketplace that detects product condition, suggests categories, and recommends prices using Machine Learning.",
        tech: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
        github: "https://github.com/Tamim-Munshi",
        icon: "robot"
      },
      {
        title: "Student Management System",
        subtitle: "Java desktop app",
        desc: "Desktop application for managing student information, attendance, and academic records.",
        tech: ["Java", "MySQL"],
        github: "https://github.com/Tamim-Munshi",
        icon: "graduate"
      },
      {
        title: "Portfolio Website",
        subtitle: "Frontend",
        desc: "A modern portfolio website built with HTML, CSS and JavaScript using modular architecture.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/Tamim-Munshi",
        icon: "globe"
      }
    ]
  };

  const OFF_TOPIC_REPLY =
    "I'm designed to answer questions about Tamim and his portfolio. Please ask about my projects, skills, experience, resume, or contact information.";

  /* ------------------------------------------------------------------ *
   * 2. ICONS — inline SVG, no external requests
   * ------------------------------------------------------------------ */
  const ICON = {
    chat: '<svg viewBox="0 0 24 24" fill="none" class="aic-icon-chat"><path d="M8 10h8M8 14h5M21 12c0 4.97-4.03 9-9 9-1.5 0-2.9-.36-4.14-1L3 21l1.1-3.9A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" class="aic-icon-close"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z" stroke="currentColor" stroke-width="1.7"/><path d="M19 11a7 7 0 01-14 0M12 19v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" stroke-width="1.6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.7"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.65.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none"><path d="M10 14a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M14 10a5 5 0 00-7.07 0L4.1 12.83a5 5 0 007.07 7.07l1.49-1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 2h9l5 5v15H6V2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15 2v5h5M9 13h6M9 17h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v13m0 0l-5-5m5 5l5-5M4 21h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="1.6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5c0 8.5 6.5 15 15 15l2-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5-4 1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.5L2.7 12.1c-1.2.5-1.2 1.2-.2 1.5l4.9 1.5 11.3-7.1c.5-.3 1-.1.6.2l-9.2 8.3-.3 4.8c.5 0 .7-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.4-1.7-1.6-1.2z"/></svg>',
    graduation: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 8l10-5 10 5-10 5-10-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" stroke="currentColor" stroke-width="1.6"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="1.6"/><path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none"><path d="M8 6L2 12l6 6M16 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" stroke-width="1.6"/></svg>',
    project: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M8 4v5" stroke="currentColor" stroke-width="1.6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.4-9.5-8.8C.7 7.6 2.6 4 6.2 4c2 0 3.4 1 5.8 3.6C14.4 5 15.8 4 17.8 4c3.6 0 5.5 3.6 3.7 7.2C19 15.6 12 20 12 20z" stroke="currentColor" stroke-width="1.6"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20c8-1 14-7 15-15-8 1-14 7-15 15z" stroke="currentColor" stroke-width="1.6"/><path d="M9 15c2-2 5-5 9-8" stroke="currentColor" stroke-width="1.6"/></svg>',
    droplet: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2s7 8 7 13a7 7 0 11-14 0c0-5 7-13 7-13z" stroke="currentColor" stroke-width="1.6"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0119 18H6z" stroke="currentColor" stroke-width="1.6"/></svg>',
    calc: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M7 6h10M7 11h2m3 0h2m3 0h2M7 15h2m3 0h2m3 0h2M7 19h2m3 0h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    dice: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="16" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="16" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>'
  };

  /* ------------------------------------------------------------------ *
   * 3. INTENTS — keyword-matched, each yields text + optional rich card
   * ------------------------------------------------------------------ */
  const INTENTS = [
    {
      id: "about",
      keywords: ["about", "who are you", "who is tamim", "introduce", "tell me about"],
      question: "About Me",
      icon: "user",
      render: () => ({ text: PORTFOLIO_DATA.about + "\n\nWant to dig into a specific area — skills, projects, or education?" })
    },
    {
      id: "skills",
      keywords: ["skill", "tech", "stack", "language", "know", "expert", "proficient", "programming"],
      question: "Skills",
      icon: "code",
      render: () => ({
        text: "Here's Tamim's core tech stack:",
        rich: { type: "skills" }
      })
    },
    {
      id: "projects",
      keywords: ["project", "built", "build", "portfolio work", "marketplace", "ai", "app", "system", "student management", "portfolio website"],
      question: "Projects",
      icon: "project",
      render: () => ({
        text: "Here are a few things Tamim has shipped — **Healthcare Management System** is the flagship, a full hospital admin platform built end-to-end.",
        rich: { type: "projects" }
      })
    },
    {
      id: "experience",
      keywords: ["experience", "job", "internship", "career", "work history"],
      question: "Experience",
      icon: "briefcase",
      render: () => ({ text: PORTFOLIO_DATA.experience })
    },
    {
      id: "education",
      keywords: ["education", "university", "school", "degree", "study", "studying", "diu", "daffodil", "semester"],
      question: "Education",
      icon: "graduation",
      render: () => ({ text: PORTFOLIO_DATA.education })
    },
    {
      id: "certificates",
      keywords: ["certificate", "certification", "certs", "course", "badge"],
      question: "Certifications",
      icon: "award",
      render: () => ({
        text: "Tamim holds a few certifications:\n" + PORTFOLIO_DATA.certificates.map((c) => "- " + c.title).join("\n")
      })
    },
    {
      id: "resume",
      keywords: ["resume", "cv", "download"],
      question: "Resume",
      icon: "file",
      render: () => ({
        text: "Here's Tamim's resume — you can preview it inline or download the PDF.",
        rich: { type: "resume" }
      })
    },
    {
      id: "contact",
      keywords: ["contact", "email", "phone", "reach", "whatsapp", "telegram", "message", "linkedin"],
      question: "Contact",
      icon: "mail",
      render: () => ({
        text: "Best ways to reach Tamim:",
        rich: { type: "contact" }
      })
    },
    {
      id: "github",
      keywords: ["github", "repo", "repository", "source code"],
      question: null,
      icon: "code",
      render: () => ({ text: "All of Tamim's public repositories and code live on GitHub — [github.com/Tamim-Munshi](" + PORTFOLIO_DATA.github + ")." })
    },
    {
      id: "hire",
      keywords: ["hire", "available", "freelance", "collaborate", "work together", "opportunity", "job offer"],
      question: null,
      icon: "briefcase",
      render: () => ({
        text: "Tamim's open to new opportunities! The fastest way in is his resume, email, or the contact form on this site.",
        rich: { type: "contact" }
      })
    },
    {
      id: "services",
      keywords: ["service", "offer", "what can you do", "what does he do"],
      question: null,
      icon: "sparkle",
      render: () => ({ text: "Tamim builds responsive front-end interfaces and full-stack, database-backed web apps — from UI to schema design. His **Skills** and **Projects** tabs are the best places to see that in action." })
    },
    {
      id: "greeting",
      keywords: ["hi", "hello", "hey", "yo", "assalamu", "good morning", "good evening"],
      question: null,
      icon: "sparkle",
      render: () => ({ text: "Hey there! 👋 I can tell you about Tamim's skills, projects, education, certificates, or how to reach him — what would you like to know?" })
    },
    {
      id: "thanks",
      keywords: ["thanks", "thank you", "thx", "great", "cool", "nice", "awesome"],
      question: null,
      icon: "sparkle",
      render: () => ({ text: "You're welcome! Let me know if there's anything else you'd like to know about Tamim's work." })
    }
  ];

  const QUICK_ACTIONS = ["about", "skills", "projects", "experience", "resume", "contact", "education", "certificates"];

  /* ------------------------------------------------------------------ *
   * 4. Lightweight markdown -> HTML (bold, italic, inline code, code
   *    blocks with tiny syntax highlighting, links, bullet lists)
   * ------------------------------------------------------------------ */
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function highlightCode(code) {
    let out = escapeHtml(code);
    out = out.replace(/(\/\/.*$)/gm, '<span class="aic-tok-com">$1</span>');
    out = out.replace(/(&quot;.*?&quot;|&#39;.*?&#39;)/g, '<span class="aic-tok-str">$1</span>');
    out = out.replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|new|await|async)\b/g, '<span class="aic-tok-kw">$1</span>');
    out = out.replace(/\b(\d+)\b/g, '<span class="aic-tok-num">$1</span>');
    return out;
  }

  function renderMarkdown(raw) {
    const blocks = raw.split(/```/);
    let html = "";
    blocks.forEach((block, i) => {
      if (i % 2 === 1) {
        const firstBreak = block.indexOf("\n");
        const lang = firstBreak > -1 ? block.slice(0, firstBreak).trim() : "";
        const code = firstBreak > -1 ? block.slice(firstBreak + 1) : block;
        const codeId = "aic-code-" + Math.random().toString(36).slice(2, 9);
        html += `<div class="aic-codeblock"><div class="aic-codeblock-head"><span>${escapeHtml(lang || "code")}</span><button type="button" class="aic-copy-btn" data-copy-target="${codeId}">${ICON.copy}<span>Copy</span></button></div><pre><code id="${codeId}">${highlightCode(code.replace(/\n$/, ""))}</code></pre></div>`;
      } else {
        let t = escapeHtml(block);
        t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        t = t.replace(/\*(.+?)\*/g, "<em>$1</em>");
        t = t.replace(/`([^`]+?)`/g, '<code class="aic-inline-code">$1</code>');
        t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        const lines = t.split("\n");
        let htmlLines = [];
        let inList = false;
        lines.forEach((line) => {
          if (/^\s*-\s+/.test(line)) {
            if (!inList) { htmlLines.push("<ul>"); inList = true; }
            htmlLines.push("<li>" + line.replace(/^\s*-\s+/, "") + "</li>");
          } else {
            if (inList) { htmlLines.push("</ul>"); inList = false; }
            if (line.trim()) htmlLines.push("<p>" + line + "</p>");
          }
        });
        if (inList) htmlLines.push("</ul>");
        html += htmlLines.join("");
      }
    });
    return html;
  }

  /* ------------------------------------------------------------------ *
   * 5. Boot — wait for DOM
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    const root = buildMarkup();
    document.body.appendChild(root);

    const els = {
      root,
      trigger: root.querySelector(".aic-trigger"),
      badge: root.querySelector(".aic-trigger-badge"),
      panel: root.querySelector(".aic-panel"),
      closeBtn: root.querySelector(".aic-close-btn"),
      clearBtn: root.querySelector(".aic-clear-btn"),
      body: root.querySelector(".aic-body"),
      form: root.querySelector(".aic-composer-form"),
      textarea: root.querySelector(".aic-textarea"),
      sendBtn: root.querySelector(".aic-send-btn"),
      micBtn: root.querySelector(".aic-mic-btn")
    };

    const STORAGE_KEY = "aic_history_v1";
    let history = loadHistory();
    let askedIds = new Set();
    let isOpen = false;
    let isFirstOpen = history.length === 0;

    /* ---------- persistence ---------- */
    function loadHistory() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) { return []; }
    }
    function saveHistory() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-40))); } catch (e) {}
    }

    /* ---------- scrolling ---------- */
    function scrollToBottom(smooth) {
      requestAnimationFrame(() => {
        els.body.scrollTo({ top: els.body.scrollHeight, behavior: smooth ? "smooth" : "auto" });
      });
    }

    /* ---------- rich content builders ---------- */
    function buildProjectsCard() {
      const wrap = document.createElement("div");
      wrap.className = "aic-card-scroll";
      PORTFOLIO_DATA.projects.forEach((p) => {
        const card = document.createElement("div");
        card.className = "aic-project-card";
        card.innerHTML = `
          <div class="aic-project-thumb">${ICON[p.icon] || ICON.project}</div>
          <div class="aic-project-body">
            <div class="aic-project-title">${escapeHtml(p.title)}</div>
            <div class="aic-project-desc">${escapeHtml(p.desc)}</div>
            <div class="aic-project-tech">${p.tech.map((t) => `<span class="aic-tech-tag">${escapeHtml(t)}</span>`).join("")}</div>
            <div class="aic-project-actions">
              <a class="aic-btn aic-btn-ghost" href="${p.github}" target="_blank" rel="noopener">${ICON.github}<span>Code</span></a>
              ${p.demo ? `<a class="aic-btn aic-btn-primary" href="${p.demo}" target="_blank" rel="noopener">${ICON.link}<span>Live</span></a>` : ""}
            </div>
          </div>`;
        wrap.appendChild(card);
      });
      return wrap;
    }

    function buildSkillsCard() {
      const wrap = document.createElement("div");
      wrap.className = "aic-skills-wrap";
      PORTFOLIO_DATA.skills.forEach((s, i) => {
        const badge = document.createElement("span");
        badge.className = "aic-skill-badge";
        badge.style.animationDelay = (i * 0.05) + "s";
        badge.innerHTML = `<span class="aic-skill-dot"></span>${escapeHtml(s)}`;
        wrap.appendChild(badge);
      });
      return wrap;
    }

    function buildResumeCard() {
      const wrap = document.createElement("div");
      wrap.className = "aic-resume-card";
      wrap.innerHTML = `
        <div class="aic-resume-icon">${ICON.file}</div>
        <div class="aic-resume-info"><strong>${escapeHtml(PORTFOLIO_DATA.name)}</strong><span>PDF resume · updated</span></div>
        <div class="aic-resume-actions">
          <a class="aic-btn aic-btn-primary" href="${PORTFOLIO_DATA.cv}" download>${ICON.download}<span>Download</span></a>
          <a class="aic-btn aic-btn-ghost" href="${PORTFOLIO_DATA.cv}" target="_blank" rel="noopener">${ICON.eye}<span>Preview</span></a>
        </div>`;
      return wrap;
    }

    function buildContactCard() {
      const wrap = document.createElement("div");
      wrap.className = "aic-contact-card";
      const rows = [
        { icon: "mail", label: "Email", value: PORTFOLIO_DATA.email, href: "mailto:" + PORTFOLIO_DATA.email },
        { icon: "phone", label: "Phone", value: PORTFOLIO_DATA.phone, href: "tel:" + PORTFOLIO_DATA.phone.replace(/\s|-/g, "") },
        { icon: "linkedin", label: "LinkedIn", value: "Mohammad Tamim Munshi Mubashir", href: PORTFOLIO_DATA.linkedin },
        { icon: "github", label: "GitHub", value: "Tamim-Munshi", href: PORTFOLIO_DATA.github }
      ];
      rows.forEach((r) => {
        const a = document.createElement("a");
        a.className = "aic-contact-row";
        a.href = r.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = `<span class="aic-contact-icon">${ICON[r.icon]}</span><span><strong>${r.label}</strong><small>${escapeHtml(r.value)}</small></span>`;
        wrap.appendChild(a);
      });
      return wrap;
    }

    function buildRich(rich) {
      if (rich.type === "projects") return buildProjectsCard();
      if (rich.type === "skills") return buildSkillsCard();
      if (rich.type === "resume") return buildResumeCard();
      if (rich.type === "contact") return buildContactCard();
      return null;
    }

    /* ---------- message rows ---------- */
    function timeNow() {
      return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    function addUserRow(text) {
      const row = document.createElement("div");
      row.className = "aic-row user";
      row.innerHTML = `
        <div class="aic-row-avatar">${ICON.user}</div>
        <div class="aic-bubble-col">
          <div class="aic-bubble">${escapeHtml(text)}</div>
          <div class="aic-msg-foot"><span>${timeNow()}</span></div>
        </div>`;
      els.body.appendChild(row);
      scrollToBottom(true);
    }

    function addTypingRow() {
      const row = document.createElement("div");
      row.className = "aic-row bot";
      row.id = "aic-typing-row";
      row.innerHTML = `<div class="aic-row-avatar">${ICON.sparkle}</div><div class="aic-typing"><span></span><span></span><span></span></div>`;
      els.body.appendChild(row);
      scrollToBottom(true);
      return row;
    }

    function removeTypingRow() {
      const row = document.getElementById("aic-typing-row");
      if (row) row.remove();
    }

    function bindCopyButtons(scope) {
      scope.querySelectorAll("[data-copy-target]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const codeEl = scope.querySelector("#" + btn.getAttribute("data-copy-target"));
          copyText(codeEl ? codeEl.textContent : "", btn);
        });
      });
    }

    function copyText(text, btn) {
      const done = () => {
        const original = btn.innerHTML;
        btn.innerHTML = ICON.check + "<span>Copied</span>";
        setTimeout(() => { btn.innerHTML = original; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        ta.remove(); done();
      }
    }

    function addBotRow(answer, opts) {
      opts = opts || {};
      const row = document.createElement("div");
      row.className = "aic-row bot";
      const col = document.createElement("div");
      col.className = "aic-bubble-col";
      const bubble = document.createElement("div");
      bubble.className = "aic-bubble";
      row.innerHTML = `<div class="aic-row-avatar">${ICON.sparkle}</div>`;
      col.appendChild(bubble);
      row.appendChild(col);
      els.body.appendChild(row);

      function finalize() {
        bubble.innerHTML = renderMarkdown(answer.text);
        bindCopyButtons(bubble);
        if (answer.rich) {
          const richEl = buildRich(answer.rich);
          if (richEl) col.appendChild(richEl);
        }
        const foot = document.createElement("div");
        foot.className = "aic-msg-foot";
        foot.innerHTML = `<span>${timeNow()}</span><button type="button" class="aic-msg-copy">${ICON.copy}<span>Copy</span></button>`;
        foot.querySelector(".aic-msg-copy").addEventListener("click", (e) => copyText(answer.text, e.currentTarget));
        col.appendChild(foot);
        scrollToBottom(true);
        if (!opts.silent) renderFollowUps(col, opts.excludeId);
      }

      if (opts.stream === false) {
        finalize();
        return;
      }

      // Streaming reveal: word-by-word into plain text, then swap to rich markdown.
      const words = answer.text.split(/(\s+)/);
      let idx = 0;
      const cursor = document.createElement("span");
      cursor.className = "aic-cursor";
      function step() {
        if (idx >= words.length) {
          cursor.remove();
          finalize();
          return;
        }
        bubble.textContent += words[idx];
        bubble.appendChild(cursor);
        idx++;
        scrollToBottom(false);
        setTimeout(step, 16 + Math.random() * 14);
      }
      step();
    }

    function renderFollowUps(col, excludeId) {
      const remaining = INTENTS.filter((it) => it.question && it.id !== excludeId && !askedIds.has(it.id)).slice(0, 3);
      if (!remaining.length) return;
      const wrap = document.createElement("div");
      wrap.className = "aic-suggestions";
      wrap.style.paddingLeft = "0";
      remaining.forEach((it) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "aic-chip";
        chip.innerHTML = `${ICON[it.icon] || ICON.sparkle}<span>${it.question}</span>`;
        chip.addEventListener("click", () => handleUserMessage(it.question, it.id));
        wrap.appendChild(chip);
      });
      col.appendChild(wrap);
    }

    /* ---------- welcome screen ---------- */
    function renderWelcome() {
      const wrap = document.createElement("div");
      wrap.className = "aic-welcome";
      wrap.innerHTML = `
        <div class="aic-welcome-orb">${ICON.sparkle}</div>
        <h3>Ask about ${PORTFOLIO_DATA.shortName}</h3>
        <p>I can walk you through skills, projects, resume, and how to get in touch — all pulled straight from this portfolio.</p>
        <div class="aic-quick-grid"></div>`;
      const grid = wrap.querySelector(".aic-quick-grid");
      QUICK_ACTIONS.forEach((id, i) => {
        const intent = INTENTS.find((it) => it.id === id);
        if (!intent) return;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "aic-quick-btn";
        btn.style.animationDelay = (i * 0.05) + "s";
        btn.innerHTML = `${ICON[intent.icon] || ICON.sparkle}<span>${intent.question}</span>`;
        btn.addEventListener("click", () => handleUserMessage(intent.question, intent.id));
        grid.appendChild(btn);
      });
      els.body.appendChild(wrap);
    }

    /* ---------- intent matching ---------- */
    function matchIntent(text) {
      const q = " " + text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ") + " ";
      let best = null, bestScore = 0;
      INTENTS.forEach((it) => {
        const score = it.keywords.reduce((acc, kw) => acc + (q.includes(" " + kw) || q.includes(kw + " ") || q.includes(kw) ? 1 : 0), 0);
        if (score > bestScore) { bestScore = score; best = it; }
      });
      return bestScore > 0 ? best : null;
    }

    /* ---------- core send handler ---------- */
    function handleUserMessage(text, forcedIntentId) {
      text = text.trim();
      if (!text) return;
      addUserRow(text);
      history.push({ who: "user", text });
      saveHistory();

      const typingRow = addTypingRow();
      const delay = 350 + Math.random() * 450;
      setTimeout(() => {
        removeTypingRow();
        const intent = forcedIntentId ? INTENTS.find((it) => it.id === forcedIntentId) : matchIntent(text);
        let answer;
        if (intent) {
          askedIds.add(intent.id);
          answer = intent.render();
        } else {
          answer = { text: OFF_TOPIC_REPLY };
        }
        addBotRow(answer, { excludeId: intent && intent.id });
        history.push({ who: "bot", answer });
        saveHistory();
      }, delay);
    }

    /* ---------- replay persisted history (no streaming) ---------- */
    function replayHistory() {
      history.forEach((entry) => {
        if (entry.who === "user") {
          const row = document.createElement("div");
          row.className = "aic-row user";
          row.innerHTML = `<div class="aic-row-avatar">${ICON.user}</div><div class="aic-bubble-col"><div class="aic-bubble">${escapeHtml(entry.text)}</div></div>`;
          els.body.appendChild(row);
        } else {
          addBotRow(entry.answer, { stream: false, silent: true });
        }
      });
      scrollToBottom(false);
    }

    /* ---------- open / close ---------- */
    function openPanel() {
      isOpen = true;
      els.panel.classList.add("is-open");
      els.trigger.classList.add("is-open");
      els.trigger.setAttribute("aria-expanded", "true");
      els.badge.hidden = true;
      if (isFirstOpen) {
        renderWelcome();
        isFirstOpen = false;
      } else if (els.body.children.length === 0 && history.length) {
        replayHistory();
      }
      setTimeout(() => els.textarea.focus(), 150);
      document.addEventListener("keydown", onKeydown);
    }
    function closePanel() {
      isOpen = false;
      els.panel.classList.remove("is-open");
      els.trigger.classList.remove("is-open");
      els.trigger.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKeydown);
      els.trigger.focus();
    }
    function onKeydown(e) {
      if (e.key === "Escape") closePanel();
    }

    els.trigger.addEventListener("click", () => (isOpen ? closePanel() : openPanel()));

    // Any element elsewhere on the page (e.g. the "Chat Now" banner in the
    // Why Me section) can open this panel by adding a data-open-ai-chat attribute.
    document.querySelectorAll("[data-open-ai-chat]").forEach((el) => {
      el.addEventListener("click", () => {
        if (!isOpen) openPanel();
        els.panel.scrollIntoView({ block: "nearest" });
      });
    });
    els.closeBtn.addEventListener("click", closePanel);
    els.clearBtn.addEventListener("click", () => {
      history = [];
      askedIds = new Set();
      saveHistory();
      els.body.innerHTML = "";
      isFirstOpen = true;
      renderWelcome();
    });

    /* ---------- composer ---------- */
    function autoGrow() {
      els.textarea.style.height = "auto";
      els.textarea.style.height = Math.min(els.textarea.scrollHeight, 100) + "px";
    }
    els.textarea.addEventListener("input", () => {
      els.sendBtn.disabled = els.textarea.value.trim().length === 0;
      autoGrow();
    });
    els.textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        els.form.requestSubmit();
      }
    });
    els.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = els.textarea.value.trim();
      if (!text) return;
      els.textarea.value = "";
      els.sendBtn.disabled = true;
      autoGrow();
      handleUserMessage(text);
    });

    /* ---------- voice input ---------- */
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = "en-US";
      let listening = false;
      els.micBtn.addEventListener("click", () => {
        if (listening) { recognizer.stop(); return; }
        try { recognizer.start(); listening = true; els.micBtn.classList.add("is-listening"); } catch (e) {}
      });
      recognizer.addEventListener("result", (e) => {
        const transcript = e.results[0][0].transcript;
        els.textarea.value = transcript;
        els.sendBtn.disabled = transcript.trim().length === 0;
        autoGrow();
      });
      recognizer.addEventListener("end", () => { listening = false; els.micBtn.classList.remove("is-listening"); });
      recognizer.addEventListener("error", () => { listening = false; els.micBtn.classList.remove("is-listening"); });
    } else {
      els.micBtn.remove();
    }
  }

  /* ------------------------------------------------------------------ *
   * 6. Markup scaffold
   * ------------------------------------------------------------------ */
  function buildMarkup() {
    const root = document.createElement("div");
    root.className = "aic-root";
    root.innerHTML = `
      <button type="button" class="aic-trigger" aria-haspopup="dialog" aria-expanded="false" aria-controls="aicPanel" aria-label="Open AI assistant chat">
        <span class="aic-trigger-glow" aria-hidden="true"></span>
        <span class="aic-online-dot" aria-hidden="true"></span>
        <span class="aic-trigger-badge">1</span>
        <span class="aic-trigger-icon">${ICON.chat}${ICON.close}</span>
      </button>
      <section class="aic-panel" id="aicPanel" role="dialog" aria-modal="false" aria-label="Ask about ${PORTFOLIO_DATA.shortName} — AI assistant">
        <header class="aic-header">
          <div class="aic-avatar">${ICON.sparkle}<span class="aic-avatar-status" aria-hidden="true"></span></div>
          <div class="aic-header-info">
            <div class="aic-header-name">Ask About ${PORTFOLIO_DATA.shortName}</div>
            <div class="aic-header-status">Online · answers from this portfolio</div>
          </div>
          <div class="aic-header-actions">
            <button type="button" class="aic-icon-btn aic-clear-btn" aria-label="Clear chat">${ICON.trash}</button>
            <button type="button" class="aic-icon-btn aic-close-btn" aria-label="Close chat">${ICON.x}</button>
          </div>
        </header>
        <div class="aic-body" aria-live="polite"></div>
        <div class="aic-composer">
          <form class="aic-composer-form">
            <div class="aic-input-row">
              <textarea class="aic-textarea" rows="1" placeholder="Ask about skills, projects, resume…" aria-label="Message"></textarea>
              <button type="button" class="aic-mic-btn" aria-label="Voice input">${ICON.mic}</button>
              <button type="submit" class="aic-send-btn" disabled aria-label="Send message">${ICON.send}</button>
            </div>
          </form>
          <div class="aic-composer-hint">${ICON.sparkle}<span>Answers only from Tamim's real portfolio data</span></div>
        </div>
      </section>`;
    return root;
  }
})();
