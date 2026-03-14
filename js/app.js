/* ═══════════════════════════════════════
   APP — Main Logic + GSAP Scrollytelling
   ═══════════════════════════════════════ */
(function () {
  "use strict";
  const D = getData();
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  /* ═══ PRELOADER ═══ */
  const bootMsgs = [
    "> Awakening shadow subsystem...",
    "> Loading 100+ combat certifications...",
    "> Decrypting ethical hacking archives...",
    "> Mounting AI augmentation layer...",
    "> Calibrating prompt engineering core...",
    "> Initializing dual-world renderer...",
    "> Loading Kali Linux modules...",
    "> Building anime scene graph...",
    "> Deploying adhi03f24...",
    "> DOMAIN EXPANSION: READY."
  ];

  function runPreloader() {
    let matrixId;
    SCENE.initPreMatrix(id => matrixId = id);
    const log = $("#preLog"), bar = $("#preFill"), pct = $("#prePct"), pre = $("#preloader");
    let prog = 0, mi = 0;

    const iv = setInterval(() => {
      if (mi < bootMsgs.length) {
        const s = document.createElement("span");
        s.textContent = bootMsgs[mi++];
        log.appendChild(s);
        log.scrollTop = log.scrollHeight;
      }
      prog += Math.random() * 13 + 4;
      if (prog > 100) prog = 100;
      bar.style.width = prog + "%";
      pct.textContent = Math.floor(prog) + "%";
      if (prog >= 100) {
        clearInterval(iv);
        if (matrixId) clearInterval(matrixId);
        setTimeout(() => {
          pre.classList.add("done");
          SCENE.flash();
          launchHero();
        }, 600);
      }
    }, 260);
  }

  /* ═══ HERO ENTRANCE ═══ */
  function launchHero() {
    gsap.to(".light-info", { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    gsap.to(".char-hero", { opacity: 1, duration: 1, delay: 0.5 });
    gsap.to(".torch-hint", { opacity: 1, duration: 0.8, delay: 1.5 });
    gsap.to(".scroll-cue", { opacity: 1, duration: 0.8, delay: 2 });

    // Dark world elements (always visible but start hidden)
    gsap.to(".dark-info", { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: "power3.out" });
    gsap.to(".char-villain", { opacity: 1, duration: 1.2, delay: 1 });

    // Reinit cursor hovers
    setTimeout(() => SCENE.initCursor(), 500);
  }

  /* ═══ POPULATE ═══ */
  function populate() {
    const p = D.profile;

    // Timeline
    $("#storyTimeline").innerHTML = D.timeline.map(t => `
      <div class="tl-item" data-a>
        <div class="tl-icon"><i class="fas ${t.icon}"></i></div>
        <span class="tl-phase" style="color:${t.color}">${t.phase}</span>
        <span class="tl-year">${t.year}</span>
        <h3 class="tl-title" style="color:${t.color}">${t.title}</h3>
        <p class="tl-desc">${t.desc}</p>
      </div>`).join("");

    // Skills
    renderSkills("all");
    $$("#skFilters .skf").forEach(b => b.addEventListener("click", () => {
      $$("#skFilters .skf").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      renderSkills(b.dataset.c);
    }));
    if ($("#skCount")) $("#skCount").textContent = D.skills.length;

    // Projects
    $("#projGrid").innerHTML = D.projects.map(pr => `
      <div class="pc" data-a>
        <div class="pc-inner">
          <div class="pc-img"><i class="fas ${pr.icon}"></i></div>
          <h3 class="pc-t">${pr.title}</h3>
          <p class="pc-d">${pr.desc}</p>
          <div class="pc-tech">${pr.tech.map(t => `<span>${t}</span>`).join("")}</div>
          <div class="pc-links">
            ${pr.link ? `<a href="${pr.link}" target="_blank"><i class="fas fa-external-link-alt"></i> LIVE</a>` : ""}
            ${pr.github ? `<a href="${pr.github}" target="_blank"><i class="fab fa-github"></i> CODE</a>` : ""}
          </div>
        </div>
      </div>`).join("");

    // Certs
    renderCerts("all");
    $$("#certFlt .cf").forEach(b => b.addEventListener("click", () => {
      $$("#certFlt .cf").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      renderCerts(b.dataset.c);
    }));

    // Testimonials
    $("#dojoGrid").innerHTML = D.testimonials.map(t => `
      <div class="dc" data-a>
        <div class="dc-head">
          <div class="dc-av">${t.initials}</div>
          <div><div class="dc-name">${t.name}</div><div class="dc-course">${t.course}</div></div>
        </div>
        <div class="dc-stars">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>
        <p class="dc-text">"${t.text}"</p>
        <div class="dc-link"><a href="${t.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></div>
      </div>`).join("");

    // Contact info
    $("#conInfo").innerHTML = `
      <h3>// CONNECTION_DETAILS</h3>
      ${p.email ? `<div class="ci"><i class="fas fa-envelope"></i>${p.email}</div>` : ""}
      ${p.phone ? `<div class="ci"><i class="fas fa-phone"></i>${p.phone}</div>` : ""}
      ${p.location ? `<div class="ci"><i class="fas fa-map-marker-alt"></i>${p.location}</div>` : ""}
      <div class="ci-soc">
        ${p.social.github ? `<a href="${p.social.github}" target="_blank"><i class="fab fa-github"></i></a>` : ""}
        ${p.social.linkedin ? `<a href="${p.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ""}
        ${p.social.twitter ? `<a href="${p.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ""}
        ${p.social.instagram ? `<a href="${p.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : ""}
        ${p.social.youtube ? `<a href="${p.social.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>` : ""}
      </div>`;

    // Footer
    $("#ftSoc").innerHTML = [
      p.social.github && `<a href="${p.social.github}" target="_blank"><i class="fab fa-github"></i></a>`,
      p.social.linkedin && `<a href="${p.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>`,
      p.social.twitter && `<a href="${p.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`,
      p.social.instagram && `<a href="${p.social.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`,
      p.social.youtube && `<a href="${p.social.youtube}" target="_blank"><i class="fab fa-youtube"></i></a>`
    ].filter(Boolean).join("");
    $("#ftYr").textContent = new Date().getFullYear();
  }

  function renderSkills(cat) {
    const grid = $("#skGrid");
    const sk = cat === "all" ? D.skills : D.skills.filter(s => s.cat === cat);
    grid.innerHTML = sk.map((s, i) => `
      <div class="skc" data-a style="transition-delay:${i * .02}s">
        <div class="skc-top">
          <span class="skc-name">${s.name}</span>
          <span class="skc-rank" data-r="${s.rank}">${s.rank}</span>
        </div>
        <div class="skc-lvl">PWR ${s.level}/100</div>
        <div class="skc-bar"><div class="skc-fill ${s.cat}" data-lv="${s.level}"></div></div>
      </div>`).join("");
    requestAnimationFrame(() => { initScrollAnim(); animBars(); });
  }

  function renderCerts(cat) {
    const grid = $("#certGrid");
    const c = cat === "all" ? D.certifications : D.certifications.filter(x => x.cat === cat);
    grid.innerHTML = c.map((cert, i) => `
      <div class="cc ${cert.cat}" data-a style="transition-delay:${i * .015}s">
        <div class="cc-icon"><i class="fas fa-certificate"></i></div>
        <div class="cc-info">
          <div class="cc-t">${cert.t}</div>
          <div class="cc-p">${cert.p}</div>
          ${cert.c > 1 ? `<div class="cc-c">${cert.c} courses</div>` : ""}
        </div>
      </div>`).join("");
    requestAnimationFrame(initScrollAnim);
  }

  function animBars() {
    const bars = $$(".skc-fill");
    const obs = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.style.width = e.target.dataset.lv + "%", 100);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    bars.forEach(b => obs.observe(b));
  }

  /* ═══ SCROLL ANIM ═══ */
  function initScrollAnim() {
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    $$("[data-a]:not(.vis)").forEach(el => obs.observe(el));
  }

  /* ═══ GSAP SCROLLTRIGGER ═══ */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Section headers
    $$(".sec-head").forEach(h => {
      gsap.from(h, { scrollTrigger: { trigger: h, start: "top 82%" },
        y: 45, opacity: 0, duration: .8, ease: "power3.out" });
    });

    $$(".sn").forEach(n => {
      gsap.from(n, { scrollTrigger: { trigger: n, start: "top 88%" },
        scale: 3.5, opacity: 0, duration: .6, ease: "back.out(1.5)" });
    });

    // Nav hide/show
    ScrollTrigger.create({
      onUpdate: self => {
        const nav = $("#nav");
        if (self.direction === 1 && self.scroll() > 100) nav.classList.add("hide");
        else nav.classList.remove("hide");
      }
    });

    // Active nav
    $$(".section,.hero").forEach(sec => {
      ScrollTrigger.create({
        trigger: sec, start: "top center", end: "bottom center",
        onEnter: () => setActiveNav(sec.id),
        onEnterBack: () => setActiveNav(sec.id)
      });
    });

    // Flash on section enter
    $$(".section").forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec, start: "top 92%",
        onEnter: () => SCENE.flash(),
        once: true
      });
    });

    // Cert counter
    ScrollTrigger.create({
      trigger: ".certs-section", start: "top 75%", once: true,
      onEnter: () => {
        const el = $("#certNum");
        if (!el) return;
        let v = { n: 0 };
        gsap.to(v, {
          n: D.certifications.length, duration: 2.5, ease: "power2.out",
          onUpdate: () => el.textContent = Math.round(v.n) + "+"
        });
      }
    });

    // 3D tilt on project cards
    setTimeout(() => {
      $$(".pc").forEach(card => {
        card.addEventListener("mousemove", e => {
          const r = card.getBoundingClientRect();
          const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -8;
          const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 8;
          card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
        });
      });
    }, 2000);
  }

  function setActiveNav(id) {
    $$(".nlink").forEach(l => l.classList.remove("active"));
    const link = $(`.nlink[href="#${id}"]`);
    if (link) link.classList.add("active");
  }

  /* ═══ NAV ═══ */
  function initNav() {
    const burger = $("#burger"), links = $("#navLinks");
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      links.classList.toggle("open");
    });
    $$(".nlink").forEach(l => l.addEventListener("click", () => {
      burger.classList.remove("open"); links.classList.remove("open");
    }));
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute("href"));
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ═══ CONTACT ═══ */
  function initContact() {
    const form = $("#conForm");
    form.addEventListener("submit", e => {
      e.preventDefault();
      SCENE.flash("rgba(0,255,65,.15)");
      const fd = new FormData(form);
      const msg = document.createElement("div");
      msg.className = "tl";
      msg.innerHTML = `<span class="tp" style="color:var(--gold)">SYS:</span>
        <span style="color:var(--green)">✓ Transmission from ${fd.get("name")} received!</span>`;
      form.appendChild(msg);
      form.reset();
      setTimeout(() => msg.remove(), 5000);
    });
  }

  /* ═══ INIT ═══ */
  function init() {
    populate();
    runPreloader();
    SCENE.initLightCanvas();
    SCENE.initDarkCanvas();
    SCENE.initTorch();
    SCENE.initParallax();
    SCENE.initCursor();
    SCENE.initClickSparks();
    initNav();
    initContact();
    initGSAP();
    initScrollAnim();
    animBars();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
