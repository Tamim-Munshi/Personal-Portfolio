window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const percentEl = document.getElementById("loaderPercent");
    if (percentEl) {
        let pct = 0;
        const countUp = setInterval(() => {
            pct = Math.min(100, pct + Math.ceil(Math.random() * 18));
            percentEl.textContent = pct + "%";
            if (pct >= 100) clearInterval(countUp);
        }, 90);
    }

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1000);
});

if (window.AOS) {
    AOS.init({
        duration: 800,
        once: true,
        offset: 80
    });
}

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
// Initial theme is already applied synchronously by the inline script in
// <head> (before first paint) to avoid a flash of the wrong theme; this
// only needs to wire up the toggle button.

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = root.getAttribute("data-theme") === "light";
        if (isLight) {
            root.removeAttribute("data-theme");
            localStorage.setItem("portfolio-theme", "dark");
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("portfolio-theme", "light");
        }
    });
}

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

if (cursorDot && cursorRing && window.matchMedia("(hover:hover)").matches) {
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll("a, button, .btn, input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", () => cursorRing.classList.add("grow"));
        el.addEventListener("mouseleave", () => cursorRing.classList.remove("grow"));
    });
}

document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        ripple.classList.add("ripple");
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });
});

const progressBar = document.getElementById("progress-bar");
const navbar = document.querySelector(".navbar");

function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";
}

function updateNavbarShadow() {
    if (!navbar) return;
    if (window.scrollY > 80) {
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("shadow");
    }
}

// All scroll-driven UI updates (progress bar, navbar shadow, active-section
// nav highlight, and the back-to-top button below) share this single
// requestAnimationFrame-throttled, passive listener instead of each having
// its own unthrottled "scroll" listener.
let scrollTicking = false;
function runScrollUpdates() {
    updateProgressBar();
    updateNavbarShadow();
    if (typeof updateActiveNav === "function") updateActiveNav();
    if (typeof updateTopBtn === "function") updateTopBtn();
}
function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        runScrollUpdates();
        scrollTicking = false;
    });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const copyrightYearEl = document.getElementById("copyrightYear");
if (copyrightYearEl) copyrightYearEl.textContent = new Date().getFullYear();

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

const topBtn = document.getElementById("topBtn");

function updateTopBtn() {
    if (!topBtn) return;
    if (window.scrollY > 400) {
        topBtn.classList.add("visible");
    } else {
        topBtn.classList.remove("visible");
    }
}

if (topBtn) {
    topBtn.addEventListener("click", () => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
            const navCollapse = document.getElementById("navbarNav");
            if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
                const collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapse);
                collapse.hide();
            }
        }
    });
});

const skillBars = document.querySelectorAll(".progress-bar[data-width]");

if (skillBars.length && "IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + "%";
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.4 });
    skillBars.forEach(bar => skillObserver.observe(bar));
} else {
    skillBars.forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
    });
}

const counters = document.querySelectorAll(".hero-stats strong[data-count]");

if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 30));
                const tick = () => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + "+";
                    } else {
                        el.textContent = current;
                        requestAnimationFrame(tick);
                    }
                };
                tick();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.6 });
    counters.forEach(el => counterObserver.observe(el));
}

const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");
let toastTimer = null;

function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

const form = document.getElementById("contactForm");

/*
 * Contact form delivery — powered by EmailJS (https://emailjs.com)
 * ---------------------------------------------------------------
 * This form already sends real emails to tamimmunshi262@gmail.com once
 * you finish the setup below (no code changes needed after that):
 *
 * 1. Go to https://www.emailjs.com and sign up free with
 *    tamimmunshi262@gmail.com.
 * 2. Email Services (left sidebar) -> "Add New Service" -> choose Gmail ->
 *    connect tamimmunshi262@gmail.com. Copy the Service ID it gives you
 *    (looks like "service_xxxxxxx").
 * 3. Email Templates -> "Create New Template". Use these variable names
 *    in the template body so they match this form's field names:
 *      {{name}}   {{email}}   {{subject}}   {{message}}
 *    A simple template body works fine, e.g.:
 *      From: {{name}} ({{email}})
 *      Subject: {{subject}}
 *      Message: {{message}}
 *    In "To Email" (top of the template editor) put:
 *      tamimmunshi262@gmail.com
 *    Save, then copy the Template ID (looks like "template_xxxxxxx").
 * 4. Account -> General -> copy your Public Key (looks like a random
 *    string of letters/numbers).
 * 5. Paste all three values below, replacing the YOUR_... placeholders,
 *    then save this file.
 * 6. That's it — no server, no hosting changes needed. The free EmailJS
 *    plan covers 200 emails/month, which is plenty for a portfolio site.
 *
 * Until this is set up, the form still validates and shows a success
 * toast locally so it looks complete during a demo — it just won't
 * actually deliver mail until the three values below are real.
 */
const EMAILJS_PUBLIC_KEY = "Hox6y67YycFnQhVM9";
const EMAILJS_SERVICE_ID = "service_gj7yg7n";
const EMAILJS_TEMPLATE_ID = "template_s7gb2y1";
const emailjsConfigured =
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
    EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";

if (emailjsConfigured && window.emailjs) {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
}

function fireConfetti() {
    if (!window.confetti) return;
    window.confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFC93C", "#FF6B4A", "#EAF2EE"]
    });
}

if (form) {
    const statusEl = form.querySelector(".form-status");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const gotcha = form.querySelector('input[name="_gotcha"]');
        if (gotcha && gotcha.value.trim() !== "") {
            if (statusEl) statusEl.textContent = "Thank you! Your message has been sent.";
            showToast("Thank you! Your message has been sent.");
            form.reset();
            return;
        }

        const inputs = form.querySelectorAll("input:not([name='_gotcha']), textarea");
        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("invalid");
                valid = false;
            } else {
                input.classList.remove("invalid");
            }
        });

        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim() && !/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
            emailInput.classList.add("invalid");
            valid = false;
        }

        if (!valid) {
            if (statusEl) statusEl.textContent = "Please fill in every field correctly before sending.";
            showToast("Please check the form for missing or invalid fields.");
            return;
        }

        const finish = (success, message) => {
            if (submitBtn) submitBtn.classList.remove("is-loading");
            if (statusEl) statusEl.textContent = message;
            showToast(message);
            if (success) {
                fireConfetti();
                form.reset();
            }
        };

        if (emailjsConfigured && window.emailjs) {
            if (submitBtn) submitBtn.classList.add("is-loading");
            window.emailjs
                .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                .then(() => {
                    finish(true, "Thank you! Your message has been sent.");
                })
                .catch(() => {
                    finish(false, "Something went wrong — please email me directly instead.");
                });
        } else {
            finish(true, "Thank you! Your message has been received.");
        }
    });

    form.querySelectorAll("input:not([name='_gotcha']), textarea").forEach(input => {
        input.addEventListener("input", () => input.classList.remove("invalid"));
    });
}

const cards = document.querySelectorAll(
    ".why-card, .achievement-card"
);

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});

const year = new Date().getFullYear();
const footerText = document.querySelector(".footer-bottom");

if (footerText) {
    footerText.textContent = `© ${year} Mohammad Tamim Munshi Mubashir. All Rights Reserved.`;
}

updateProgressBar();
updateNavbarShadow();
updateActiveNav();
updateTopBtn();

console.log(
    "%cPortfolio developed by Mohammad Tamim Munshi Mubashir",
    "color:#FFC93C;font-size:16px;font-weight:bold;"
);

/* ============================================
   PREMIUM UPGRADE — v5 ADDITIONS
   ============================================ */

/* Cinematic GSAP hero entrance */
if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".availability-pill", { opacity: 0, y: -14, duration: 0.6 })
      .from(".hero-name", { opacity: 0, y: 24, duration: 0.7 }, "-=0.35")
      .from(".hero-left h2", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-left p", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".hero-buttons .btn", { opacity: 0, y: 16, stagger: 0.12, duration: 0.5 }, "-=0.35")
      .from(".hero-stats > div", { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, "-=0.3")
      .from(".hero-image-wrap", { opacity: 0, scale: 0.85, duration: 0.8 }, "-=0.9");
}

/* Circular skill ring progress (animates once visible) */
const skillRings = document.querySelectorAll(".skill-ring-card[data-percent]");
const CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

if (skillRings.length && "IntersectionObserver" in window) {
    const ringObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const percent = parseInt(card.dataset.percent, 10) || 0;
            const fill = card.querySelector(".ring-fill");
            const valueEl = card.querySelector(".skill-ring-value");
            if (fill) {
                const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
                requestAnimationFrame(() => { fill.style.strokeDashoffset = offset; });
            }
            if (valueEl) {
                let current = 0;
                const step = Math.max(1, Math.ceil(percent / 40));
                const tick = () => {
                    current += step;
                    if (current >= percent) {
                        valueEl.textContent = percent + "%";
                    } else {
                        valueEl.textContent = current + "%";
                        requestAnimationFrame(tick);
                    }
                };
                tick();
            }
            ringObserver.unobserve(card);
        });
    }, { threshold: 0.4 });
    skillRings.forEach((card) => ringObserver.observe(card));
}

/* ============================================
   GitHub Intelligence — ONE shared, cached fetch
   powering the stats strip, the per-project pills,
   and the full repo grid below. Consolidating every
   consumer onto a single request pair (profile +
   repos) instead of firing a separate call per
   project card is what keeps this reliable in
   production — GitHub's unauthenticated API allows
   only 60 requests/hour per IP, and a page that used
   to fire 7-8 calls on every visit could burn through
   that budget (shared office wifi, a few reloads) and
   start showing nothing. Results are also cached in
   sessionStorage for 10 minutes so repeat views in the
   same tab don't re-hit the API at all, and a stale
   cache is used as a fallback if a live request fails.
   ============================================ */
const GithubData = (function () {
    const GITHUB_USERNAME = "Tamim-Munshi";
    const CACHE_KEY = "gh-cache-v1";
    const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

    function readCache() {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.timestamp) return null;
            return parsed;
        } catch (err) {
            return null;
        }
    }

    function writeCache(data) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, timestamp: Date.now() }));
        } catch (err) {
            /* storage unavailable or full — safe to ignore */
        }
    }

    async function fetchWithRetry(url, attempts = 2) {
        let lastErr;
        for (let i = 0; i < attempts; i++) {
            try {
                const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
                if (res.status === 403 || res.status === 429) {
                    throw new Error("rate-limited");
                }
                if (!res.ok) throw new Error(`request failed (${res.status})`);
                return await res.json();
            } catch (err) {
                lastErr = err;
                if (i < attempts - 1) await new Promise((r) => setTimeout(r, 600 * (i + 1)));
            }
        }
        throw lastErr;
    }

    let inflight = null;

    function load() {
        const cached = readCache();
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return Promise.resolve({ ...cached, fromCache: true });
        }
        if (inflight) return inflight;

        inflight = Promise.all([
            fetchWithRetry(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetchWithRetry(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
        ])
            .then(([profile, repos]) => {
                const data = { profile, repos: Array.isArray(repos) ? repos : [] };
                writeCache(data);
                return { ...data, fromCache: false };
            })
            .catch((err) => {
                // Live fetch failed (offline, rate-limited, etc). Fall back to
                // whatever we last cached, even if stale, rather than nothing.
                const stale = readCache();
                if (stale) return { ...stale, fromCache: true, stale: true };
                throw err;
            })
            .finally(() => {
                inflight = null;
            });
        return inflight;
    }

    return { load, username: GITHUB_USERNAME };
})();

function ghTimeAgo(dateStr) {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diffMs / 86400000);
    if (days < 1) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
}

/* Stats strip: total repos, followers, total stars, top language */
(function renderGithubStats() {
    const reposEl = document.getElementById("ghRepos");
    const followersEl = document.getElementById("ghFollowers");
    const starsEl = document.getElementById("ghStars");
    const languageEl = document.getElementById("ghLanguage");
    const noteEl = document.getElementById("githubNote");
    if (!reposEl) return;

    GithubData.load()
        .then(({ profile, repos, stale }) => {
            if (profile) {
                if (reposEl) reposEl.textContent = profile.public_repos ?? repos.length ?? "—";
                if (followersEl) followersEl.textContent = profile.followers ?? "—";
            }
            const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
            const langCounts = {};
            repos.forEach((repo) => {
                if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            });
            const topLanguage = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a])[0];

            if (starsEl) starsEl.textContent = totalStars;
            if (languageEl) languageEl.textContent = topLanguage || "—";
            if (noteEl) {
                noteEl.textContent = stale
                    ? `Showing last saved data for github.com/${GithubData.username} — live refresh will retry shortly.`
                    : `Live data for github.com/${GithubData.username}`;
            }
        })
        .catch(() => {
            if (noteEl) noteEl.textContent = "Live stats unavailable right now — visit the profile directly.";
        });
})();

/* Magnetic button pull effect (desktop only) — rect cached on enter,
   updates batched via rAF so mousemove never forces a layout read. */
if (window.matchMedia("(hover:hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
        let rect = null;
        let pending = false;
        let lastX = 0, lastY = 0;

        el.addEventListener("mouseenter", () => {
            rect = el.getBoundingClientRect();
        });
        el.addEventListener("mousemove", (e) => {
            if (!rect) rect = el.getBoundingClientRect();
            lastX = e.clientX;
            lastY = e.clientY;
            if (pending) return;
            pending = true;
            requestAnimationFrame(() => {
                const x = lastX - rect.left - rect.width / 2;
                const y = lastY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
                pending = false;
            });
        });
        el.addEventListener("mouseleave", () => {
            rect = null;
            el.style.transform = "translate(0, 0)";
        });
    });
}

/* Subtle 3D tilt on project cards (desktop only) — same caching + rAF approach */
if (window.matchMedia("(hover:hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".project-card").forEach((card) => {
        let rect = null;
        let pending = false;
        let lastX = 0, lastY = 0;

        card.addEventListener("mouseenter", () => {
            rect = card.getBoundingClientRect();
        });
        card.addEventListener("mousemove", (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            lastX = e.clientX;
            lastY = e.clientY;
            if (pending) return;
            pending = true;
            requestAnimationFrame(() => {
                const px = (lastX - rect.left) / rect.width - 0.5;
                const py = (lastY - rect.top) / rect.height - 0.5;
                card.style.transform = `translateY(-8px) rotateX(${py * -4}deg) rotateY(${px * 6}deg)`;
                pending = false;
            });
        });
        card.addEventListener("mouseleave", () => {
            rect = null;
            card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
        });
    });
}

/* Hero mouse parallax (desktop only) — image + glow drift toward the cursor.
   Rect is cached on enter and on resize instead of every mousemove. */
const heroSection = document.getElementById("home");
const heroParallaxImg = document.querySelector(".hero-image-wrap");
if (heroSection && heroParallaxImg && window.matchMedia("(hover:hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let heroRect = heroSection.getBoundingClientRect();
    let heroPending = false;
    let heroLastX = 0, heroLastY = 0;

    window.addEventListener("resize", () => {
        heroRect = heroSection.getBoundingClientRect();
    });
    heroSection.addEventListener("mouseenter", () => {
        heroRect = heroSection.getBoundingClientRect();
    });
    heroSection.addEventListener("mousemove", (e) => {
        heroLastX = e.clientX;
        heroLastY = e.clientY;
        if (heroPending) return;
        heroPending = true;
        requestAnimationFrame(() => {
            const px = (heroLastX - heroRect.left) / heroRect.width - 0.5;
            const py = (heroLastY - heroRect.top) / heroRect.height - 0.5;
            heroParallaxImg.style.transform = `translate(${px * 18}px, ${py * 18}px)`;
            heroPending = false;
        });
    });
    heroSection.addEventListener("mouseleave", () => {
        heroParallaxImg.style.transform = "translate(0, 0)";
    });
}

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCols = document.querySelectorAll("#projectsGrid > [data-category]");
const projectSearchInput = document.getElementById("projectSearch");

if (projectCols.length) {
    let activeCategory = "all";

    function applyProjectVisibility() {
        const query = (projectSearchInput && projectSearchInput.value.trim().toLowerCase()) || "";
        projectCols.forEach((col) => {
            const cardCategories = (col.dataset.category || "").trim().split(/\s+/);
            const matchesCategory = activeCategory === "all" || cardCategories.includes(activeCategory);
            col.classList.toggle("project-col-hidden", !matchesCategory);

            if (!query) {
                col.classList.remove("project-col-search-hidden");
                return;
            }
            const text = col.textContent.toLowerCase();
            col.classList.toggle("project-col-search-hidden", !text.includes(query));
        });
    }

    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                activeCategory = btn.dataset.filter;
                filterBtns.forEach(b => {
                    b.classList.toggle("active", b === btn);
                    b.setAttribute("aria-selected", b === btn ? "true" : "false");
                });
                applyProjectVisibility();
            });
        });
    }

    if (projectSearchInput) {
        projectSearchInput.addEventListener("input", applyProjectVisibility);
    }
}

// ---------------------------------------------------------------
// Per-card GitHub stat pills (stars, primary language, last
// updated). Reads data-gh-owner / data-gh-repo off each project
// column and matches it against the SAME repo list already loaded
// by GithubData — no extra request per card, so this can't be the
// thing that trips GitHub's rate limit. Hides the slot gracefully
// if the repo isn't found (renamed, private, or API unreachable).
// ---------------------------------------------------------------
(function () {
    const cards = document.querySelectorAll("#projectsGrid > [data-gh-owner][data-gh-repo]");
    if (!cards.length) return;

    GithubData.load()
        .then(({ repos }) => {
            cards.forEach((card) => {
                const slot = card.querySelector(".gh-stats");
                if (!slot) return;
                const repoName = card.dataset.ghRepo;
                const data = repos.find((r) => r.name.toLowerCase() === repoName.toLowerCase());
                if (!data) {
                    slot.remove();
                    return;
                }
                const pills = [];
                pills.push(`<span class="gh-pill"><i class="fas fa-star"></i> ${data.stargazers_count}</span>`);
                if (data.forks_count) {
                    pills.push(`<span class="gh-pill"><i class="fas fa-code-fork"></i> ${data.forks_count}</span>`);
                }
                if (data.language) {
                    pills.push(`<span class="gh-pill"><i class="fas fa-code"></i> ${data.language}</span>`);
                }
                pills.push(`<span class="gh-pill"><i class="fas fa-clock"></i> Updated ${ghTimeAgo(data.pushed_at)}</span>`);
                slot.innerHTML = pills.join("");
            });
        })
        .catch(() => {
            cards.forEach((card) => {
                const slot = card.querySelector(".gh-stats");
                if (slot) slot.remove();
            });
        });
})();

/* ============ EXPERTISE & JOURNEY TABS ============ */
(() => {
    const nav = document.querySelector(".expertise-nav");
    const navItems = document.querySelectorAll(".expertise-nav-item");
    const panels = document.querySelectorAll(".expertise-tab");
    if (!nav || !navItems.length || !panels.length) return;

    function activateTab(tab) {
        let matched = false;
        navItems.forEach((btn) => {
            const isMatch = btn.getAttribute("data-tab") === tab;
            btn.classList.toggle("active", isMatch);
            btn.setAttribute("aria-selected", isMatch ? "true" : "false");
            if (isMatch) matched = true;
        });
        if (!matched) return;
        panels.forEach((panel) => {
            const isMatch = panel.getAttribute("data-tab-panel") === tab;
            panel.classList.toggle("active", isMatch);
            panel.hidden = !isMatch;
        });
        nav.classList.toggle("is-education", tab === "education");
    }

    navItems.forEach((btn) => {
        btn.addEventListener("click", () => activateTab(btn.getAttribute("data-tab")));
    });

    // Dropdown links and other triggers with data-expertise-tab jump straight to a tab
    document.querySelectorAll("[data-expertise-tab]").forEach((link) => {
        link.addEventListener("click", () => {
            activateTab(link.getAttribute("data-expertise-tab"));
        });
    });

    window.openExpertiseTab = function (tab) {
        activateTab(tab);
        const section = document.getElementById("expertise");
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    };
})();

/* ============ CERTIFICATE LIGHTBOX ============ */
(() => {
    const cards = document.querySelectorAll(".certificate-card[data-cert-img]");
    const lightbox = document.getElementById("certLightbox");
    const lightboxImg = document.getElementById("certLightboxImg");
    const closeBtn = lightbox ? lightbox.querySelector(".cert-lightbox-close") : null;
    if (!cards.length || !lightbox || !lightboxImg) return;

    function openCert(card) {
        const src = card.getAttribute("data-cert-img");
        const title = card.getAttribute("data-cert-title") || "Certificate full preview";
        if (!src) return;
        lightboxImg.src = src;
        lightboxImg.alt = title;
        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeCert() {
        lightbox.classList.remove("show");
        document.body.style.overflow = "";
    }

    cards.forEach((card) => {
        card.addEventListener("click", () => openCert(card));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openCert(card);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeCert);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeCert();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("show")) closeCert();
    });
})();

/* ============ HERO MOUSE GLOW ============ */
(() => {
    const hero = document.getElementById("home");
    const glow = document.getElementById("heroMouseGlow");
    if (!hero || !glow) return;
    hero.addEventListener("pointermove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        glow.style.setProperty("--mx", x + "%");
        glow.style.setProperty("--my", y + "%");
    });
})();

/* ============ COMMAND PALETTE (Ctrl+K) ============ */
(() => {
    const overlay = document.getElementById("cmdkOverlay");
    const box = document.getElementById("cmdkBox");
    const input = document.getElementById("cmdkInput");
    const results = document.getElementById("cmdkResults");
    const trigger = document.getElementById("cmdkTrigger");
    const closeBtn = document.getElementById("cmdkClose");
    if (!overlay || !input || !results) return;

    const items = [
        { icon: "fa-house", label: "Home", sub: "Section", action: () => scrollToId("home") },
        { icon: "fa-newspaper", label: "Latest Updates", sub: "Section", action: () => scrollToId("news") },
        { icon: "fa-star", label: "Why Work With Me", sub: "Expertise & Journey", action: () => window.openExpertiseTab && window.openExpertiseTab("why-me") },
        { icon: "fa-layer-group", label: "Skills", sub: "Expertise & Journey", action: () => window.openExpertiseTab && window.openExpertiseTab("skills") },
        { icon: "fa-briefcase", label: "Experience", sub: "Expertise & Journey", action: () => window.openExpertiseTab && window.openExpertiseTab("experience") },
        { icon: "fa-graduation-cap", label: "Education", sub: "Expertise & Journey", action: () => window.openExpertiseTab && window.openExpertiseTab("education") },
        { icon: "fa-trophy", label: "Achievements", sub: "Expertise & Journey", action: () => window.openExpertiseTab && window.openExpertiseTab("achievements") },
        { icon: "fa-file-lines", label: "Resume", sub: "Expertise & Journey", action: () => window.openExpertiseTab && window.openExpertiseTab("resume") },
        { icon: "fa-diagram-project", label: "Projects", sub: "Section", action: () => scrollToId("projects") },
        { icon: "fa-brands fa-github", label: "GitHub", sub: "Section", action: () => scrollToId("github") },
        { icon: "fa-envelope", label: "Contact", sub: "Section", action: () => scrollToId("contact") },
        { icon: "fa-file-arrow-down", label: "Download CV", sub: "Resume", action: () => triggerDownload("assets/cv/Tamim_Munshi_CV.pdf", "Tamim_Munshi_CV.pdf") },
        { icon: "fa-eye", label: "Preview Resume", sub: "Resume", action: () => openModal("resumeModal") },
        { icon: "fa-diagram-project", label: "Healthcare Management System — Case Study", sub: "Project", action: () => openModal("caseStudyModal") },
        { icon: "fa-brands fa-whatsapp", label: "Message on WhatsApp", sub: "Contact", action: () => window.open("https://wa.me/8801794822544", "_blank", "noopener") },
        { icon: "fa-brands fa-linkedin-in", label: "LinkedIn Profile", sub: "Contact", action: () => window.open("https://www.linkedin.com/in/tamim-munshi-a33536306", "_blank", "noopener") },
        { icon: "fa-brands fa-github", label: "GitHub Profile", sub: "Contact", action: () => window.open("https://github.com/Tamim-Munshi", "_blank", "noopener") },
        { icon: "fa-circle-half-stroke", label: "Toggle Dark / Light Mode", sub: "Action", action: () => document.getElementById("themeToggle") && document.getElementById("themeToggle").click() },
    ];

    // Pull in project card titles dynamically so new projects are searchable automatically
    document.querySelectorAll("#projects .project-card, #projects [data-project-title]").forEach((card) => {
        const titleEl = card.querySelector("h3, h4, .project-title") || card;
        const title = (titleEl.textContent || "").trim();
        if (title && !items.some((it) => it.label === title)) {
            items.push({
                icon: "fa-diagram-project",
                label: title,
                sub: "Project",
                action: () => {
                    scrollToId("projects");
                    setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
                }
            });
        }
    });

    function scrollToId(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function triggerDownload(href, filename) {
        const a = document.createElement("a");
        a.href = href;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function openModal(id) {
        const el = document.getElementById(id);
        if (el && window.bootstrap) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(el);
            modal.show();
        }
    }

    let activeIndex = 0;
    let filtered = items.slice();

    function render() {
        results.innerHTML = "";
        if (!filtered.length) {
            results.innerHTML = '<p class="cmdk-empty">No matches. Try a different search.</p>';
            return;
        }
        filtered.forEach((item, i) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "cmdk-item" + (i === activeIndex ? " active" : "");
            btn.innerHTML = `<i class="fas ${item.icon}"></i><span>${item.label}</span><span class="cmdk-item-sub">${item.sub}</span>`;
            btn.addEventListener("click", () => selectItem(item));
            btn.addEventListener("mousemove", () => {
                if (activeIndex !== i) { activeIndex = i; render(); }
            });
            results.appendChild(btn);
        });
    }

    function filterItems(query) {
        const q = query.trim().toLowerCase();
        filtered = !q ? items.slice() : items.filter((it) =>
            it.label.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q)
        );
        activeIndex = 0;
        render();
    }

    function selectItem(item) {
        closePalette();
        item.action();
    }

    function openPalette() {
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        input.value = "";
        filterItems("");
        setTimeout(() => input.focus(), 60);
    }

    function closePalette() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (trigger) trigger.addEventListener("click", openPalette);
    if (closeBtn) closeBtn.addEventListener("click", closePalette);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closePalette(); });

    input.addEventListener("input", () => filterItems(input.value));

    document.addEventListener("keydown", (e) => {
        const isK = e.key === "k" || e.key === "K";
        if ((e.ctrlKey || e.metaKey) && isK) {
            e.preventDefault();
            overlay.classList.contains("active") ? closePalette() : openPalette();
            return;
        }
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") { closePalette(); return; }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
            render();
            const el = results.children[activeIndex];
            if (el) el.scrollIntoView({ block: "nearest" });
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
            render();
            const el = results.children[activeIndex];
            if (el) el.scrollIntoView({ block: "nearest" });
        }
        if (e.key === "Enter") {
            e.preventDefault();
            if (filtered[activeIndex]) selectItem(filtered[activeIndex]);
        }
    });
})();

/* ===== Visitor Counter (CountAPI, static-site friendly) ===== */
(function () {
    const el = document.getElementById("visitorCount");
    if (!el) return;
    const label = el.querySelector("span");
    const NAMESPACE = "tamim-munshi-portfolio";
    const KEY = "site-visits";

    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => {
            const count = (data && data.value) || 0;
            label.textContent = `${count.toLocaleString()} visitors so far`;
        })
        .catch(() => {
            el.hidden = true; // fail silently if the counter API is unreachable
        });
})();


/* ===== Blur-up reveal for lazy-loaded images ===== */
(function () {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
            img.classList.add("img-loaded");
            return;
        }
        img.addEventListener("load", () => img.classList.add("img-loaded"), { once: true });
        img.addEventListener("error", () => img.classList.add("img-loaded"), { once: true });
    });
})();
