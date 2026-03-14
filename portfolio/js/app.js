/* ═══════════════════════════════════════════════════════
   ADHI03F24 — MAIN APPLICATION
   GSAP, ScrollTrigger, Torch, Content, Animations
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var D = getData();
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };

  function rankClass(rank) {
    if (!rank) return "rank-a";
    var r = String(rank).toUpperCase();
    if (r === "S+") return "rank-s-plus";
    if (r === "S") return "rank-s";
    if (r === "A") return "rank-a";
    if (r === "B") return "rank-b";
    return "rank-a";
  }

  var bootMsgs = [
    "> Initializing shadow subsystem...",
    "> Loading combat certifications [53 found]...",
    "> Decrypting ethical hacking archives...",
    "> Mounting AI augmentation layer...",
    "> Calibrating prompt engineering core...",
    "> Loading Kali Linux modules...",
    "> Establishing encrypted connection...",
    "> Compiling origin story arcs...",
    "> Deploying adhi03f24...",
    "> DOMAIN EXPANSION: READY."
  ];

  function runPreloader() {
    var log = $("#bootLog");
    var bar = $("#loaderBar");
    var pct = $("#loaderPct");
    var pre = $("#preloader");

    var matrixId;
    ENGINE.initMatrixRain("preloaderCanvas", function (id) { matrixId = id; });

    var progress = 0, msgIdx = 0;

    var interval = setInterval(function () {
      if (msgIdx < bootMsgs.length) {
        var s = document.createElement("span");
        s.textContent = bootMsgs[msgIdx];
        s.style.animationDelay = "0s";
        log.appendChild(s);
        log.scrollTop = log.scrollHeight;
        msgIdx++;
      }

      progress += Math.random() * 14 + 4;
      if (progress > 100) progress = 100;
      bar.style.width = progress + "%";
      pct.textContent = Math.floor(progress) + "%";

      if (progress >= 100) {
        clearInterval(interval);
        if (matrixId) clearInterval(matrixId);
        setTimeout(function () {
          pre.classList.add("done");
          launchHero();
        }, 700);
      }
    }, 280);
  }

  function launchHero() {
    ENGINE.screenFlash();

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero-badge",     { opacity: 1, y: 0, duration: 0.5 }, 0.1)
      .to(".hero-kanji",     { opacity: 0.3, duration: 0.6 }, 0.3)
      .to(".hero-name",      { opacity: 1, y: 0, duration: 0.9 }, 0.4)
      .to(".hero-typed-wrap", { opacity: 1, duration: 0.5 }, 0.9)
      .to(".hero-tags",      { opacity: 1, duration: 0.5 }, 1.1)
      .to(".hero-stats-bar", { opacity: 1, duration: 0.5 }, 1.3)
      .to(".hero-cta",       { opacity: 1, y: 0, duration: 0.6 }, 1.5);

    startTypewriter();
    setTimeout(function () { ENGINE.initCursor(); }, 200);
  }

  function startTypewriter() {
    var el = $("#heroTyped");
    var phrases = [
      D.profile.title,
      D.profile.subtitle,
      D.profile.tagline,
      "echo 'Hacker by nature, Developer by evolution'",
      "50+ certifications loaded.",
      "Prompt Engineering is my superpower.",
      "sudo rm -rf /mediocrity"
    ];
    var pi = 0, ci = 0, deleting = false;

    function tick() {
      var current = phrases[pi];
      if (!deleting) {
        el.textContent = current.substring(0, ci + 1);
        ci++;
        if (ci === current.length) { deleting = true; setTimeout(tick, 2200); return; }
        setTimeout(tick, 40 + Math.random() * 40);
      } else {
        el.textContent = current.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; }
        setTimeout(tick, 20);
      }
    }
    setTimeout(tick, 1200);
  }

  function populate() {
    var p = D.profile;
    var heroName = $("#heroName");
    if (heroName) {
      heroName.textContent = (p.name || "ADHITHIYAN MALIACKAL").toUpperCase();
      heroName.setAttribute("data-text", (p.name || "ADHITHIYAN MALIACKAL").toUpperCase());
    }
    var heroLevel = $("#heroLevel");
    var heroXP = $("#heroXP");
    var heroRank = $("#heroRank");
    var navRank = $("#navRank");
    var heroClass = $("#heroClass");
    var hudPlayer = $("#hudPlayer");
    if (D.stats) {
      if (heroLevel) heroLevel.textContent = D.stats.level != null ? D.stats.level : "42";
      if (heroXP) heroXP.textContent = D.stats.xp || "142,800";
      if (heroRank) heroRank.textContent = (D.stats.rank || "S-RANK").replace(/-RANK$/, "") || "S";
      if (navRank) navRank.textContent = D.stats.rank || "S-RANK";
      if (heroClass && D.stats.class) heroClass.textContent = D.stats.class;
    }
    if (hudPlayer && p.username) hudPlayer.textContent = (p.username || "ADHI03F24").toUpperCase();

    var tlEl = $("#originTimeline");
    if (tlEl) {
      tlEl.innerHTML = D.timeline.map(function (t) {
        var color = t.color || "#00e5ff";
        return '<div class="tl-item" data-anim style="--bullet-color:' + color + '">' +
          '<div class="tl-icon"><i class="fas ' + (t.icon || "fa-star") + '"></i></div>' +
          '<span class="tl-phase" style="color:' + (t.color || "#00e5ff") + '">' + (t.phase || "") + '</span>' +
          '<span class="tl-year">' + t.year + '</span>' +
          '<h3 class="tl-title" style="color:' + (t.color || "#00e5ff") + '">' + t.title + '</h3>' +
          '<p class="tl-desc">' + t.desc + '</p>' +
          '</div>';
      }).join("");
    }

    renderSkills("all");

    $$("#skillFilters .sf-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$("#skillFilters .sf-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderSkills(btn.dataset.cat);
      });
    });

    var hudSC = $("#hudSkillCount");
    var hudCC = $("#hudCerts");
    if (hudSC) hudSC.textContent = D.skills.length;
    if (hudCC) hudCC.textContent = D.certifications ? D.certifications.length : 0;

    var pGrid = $("#projectsGrid");
    if (pGrid) {
      pGrid.innerHTML = D.projects.map(function (pr) {
        return '<div class="proj-card" data-anim>' +
          '<div class="proj-inner">' +
          '<div class="proj-img"><i class="fas ' + (pr.icon || "fa-code") + '"></i></div>' +
          '<h3 class="proj-title">' + pr.title + '</h3>' +
          '<p class="proj-desc">' + pr.desc + '</p>' +
          '<div class="proj-tech">' + pr.tech.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>' +
          '<div class="proj-links">' +
          (pr.link ? '<a href="' + pr.link + '" target="_blank"><i class="fas fa-external-link-alt"></i> LIVE</a>' : "") +
          (pr.github ? '<a href="' + pr.github + '" target="_blank"><i class="fab fa-github"></i> CODE</a>' : "") +
          '</div></div></div>';
      }).join("");
    }

    renderCerts("all");
    $$("#certFilters .cf-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$("#certFilters .cf-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        renderCerts(btn.dataset.cat);
      });
    });

    var dGrid = $("#dojoGrid");
    if (dGrid) {
      dGrid.innerHTML = D.testimonials.map(function (t) {
        return '<div class="dojo-card" data-anim>' +
          '<div class="dojo-head">' +
          '<div class="dojo-avatar">' + (t.initials || "??") + '</div>' +
          '<div><div class="dojo-name">' + t.name + '</div><div class="dojo-course">' + t.course + '</div></div>' +
          '</div>' +
          '<div class="dojo-stars">' + "★".repeat(t.rating) + "☆".repeat(5 - t.rating) + '</div>' +
          '<p class="dojo-text">"' + t.text + '"</p>' +
          '<div class="dojo-link"><a href="' + (t.linkedin || "#") + '" target="_blank"><i class="fab fa-linkedin"></i> View LinkedIn</a></div>' +
          '</div>';
      }).join("");
    }

    var cInfo = $("#contactInfo");
    if (cInfo) {
      cInfo.innerHTML =
        '<h3>// CONNECTION_DETAILS</h3>' +
        (p.email ? '<div class="ci-item"><i class="fas fa-envelope"></i>' + p.email + '</div>' : "") +
        (p.phone ? '<div class="ci-item"><i class="fas fa-phone"></i>' + p.phone + '</div>' : "") +
        (p.location ? '<div class="ci-item"><i class="fas fa-map-marker-alt"></i>' + p.location + '</div>' : "") +
        '<div class="ci-social">' +
        (p.social.github ? '<a href="' + p.social.github + '" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>' : "") +
        (p.social.linkedin ? '<a href="' + p.social.linkedin + '" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>' : "") +
        (p.social.twitter ? '<a href="' + p.social.twitter + '" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>' : "") +
        (p.social.instagram ? '<a href="' + p.social.instagram + '" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>' : "") +
        (p.social.youtube ? '<a href="' + p.social.youtube + '" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>' : "") +
        '</div>';
    }

    var fSoc = $("#footerSocial");
    if (fSoc) {
      fSoc.innerHTML =
        (p.social.github ? '<a href="' + p.social.github + '" target="_blank"><i class="fab fa-github"></i></a>' : "") +
        (p.social.linkedin ? '<a href="' + p.social.linkedin + '" target="_blank"><i class="fab fa-linkedin"></i></a>' : "") +
        (p.social.twitter ? '<a href="' + p.social.twitter + '" target="_blank"><i class="fab fa-twitter"></i></a>' : "") +
        (p.social.instagram ? '<a href="' + p.social.instagram + '" target="_blank"><i class="fab fa-instagram"></i></a>' : "") +
        (p.social.youtube ? '<a href="' + p.social.youtube + '" target="_blank"><i class="fab fa-youtube"></i></a>' : "");
    }
    var fy = $("#footerYear");
    if (fy) fy.textContent = new Date().getFullYear();
  }

  function renderSkills(cat) {
    var grid = $("#skillsGrid");
    if (!grid) return;
    var skills = cat === "all" ? D.skills : D.skills.filter(function (s) { return s.cat === cat; });

    grid.innerHTML = skills.map(function (s, i) {
      return '<div class="sk-card" data-anim style="transition-delay:' + (i * 0.03) + 's">' +
        '<div class="sk-top">' +
        '<span class="sk-name">' + s.name + '</span>' +
        '<span class="sk-rank ' + rankClass(s.rank) + '">' + s.rank + '</span>' +
        '</div>' +
        '<div class="sk-lvl">POWER ' + s.level + ' / 100</div>' +
        '<div class="sk-bar-bg"><div class="sk-bar ' + s.cat + '" data-level="' + s.level + '"></div></div>' +
        '</div>';
    }).join("");

    requestAnimationFrame(function () {
      initScrollAnim();
      animateBars();
    });
  }

  function renderCerts(cat) {
    var grid = $("#certsGrid");
    if (!grid || !D.certifications) return;
    var certs = cat === "all" ? D.certifications : D.certifications.filter(function (c) { return c.cat === cat; });

    grid.innerHTML = certs.map(function (c, i) {
      return '<div class="cert-card ' + c.cat + '" data-anim style="transition-delay:' + (i * 0.02) + 's">' +
        '<div class="cert-icon"><i class="fas ' + (c.icon || "fa-certificate") + '"></i></div>' +
        '<div class="cert-info">' +
        '<div class="cert-title">' + c.title + '</div>' +
        '<div class="cert-provider">' + c.provider + '</div>' +
        (c.courses > 1 ? '<div class="cert-courses">' + c.courses + ' courses completed</div>' : "") +
        '</div></div>';
    }).join("");

    requestAnimationFrame(function () { initScrollAnim(); });
  }

  function animateBars() {
    var bars = $$(".sk-bar");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.style.width = e.target.dataset.level + "%"; }, 150);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    bars.forEach(function (b) { obs.observe(b); });
  }

  function initScrollAnim() {
    var items = $$("[data-anim]:not(.vis)");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { obs.observe(el); });
  }

  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    $$(".section-header").forEach(function (h) {
      gsap.from(h, {
        scrollTrigger: { trigger: h, start: "top 82%" },
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out"
      });
    });

    $$(".sec-num").forEach(function (n) {
      gsap.from(n, {
        scrollTrigger: { trigger: n, start: "top 88%" },
        scale: 4, opacity: 0, duration: 0.7, ease: "back.out(1.5)"
      });
    });

    ScrollTrigger.create({
      onUpdate: function (self) {
        var nav = $("#mainNav");
        if (self.direction === 1 && self.scroll() > 120) nav.classList.add("hide");
        else nav.classList.remove("hide");
      }
    });

    $$(".section").forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec, start: "top center", end: "bottom center",
        onEnter: function () { setNav(sec.id); },
        onEnterBack: function () { setNav(sec.id); }
      });
    });

    $$(".section").forEach(function (sec, i) {
      if (i === 0) return;
      ScrollTrigger.create({
        trigger: sec, start: "top 92%",
        onEnter: function () { ENGINE.screenFlash(); },
        once: true
      });
    });

    ScrollTrigger.create({
      trigger: ".certs-section",
      start: "top 75%",
      once: true,
      onEnter: function () {
        var el = $("#certCountAnim");
        if (!el) return;
        var count = { v: 0 };
        gsap.to(count, {
          v: D.certifications ? D.certifications.length : 0,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () { el.textContent = Math.round(count.v); }
        });
      }
    });

    gsap.from(".torch-stage", {
      scrollTrigger: { trigger: ".torch-section", start: "top 72%" },
      scale: 0.92, opacity: 0, duration: 1, ease: "power3.out"
    });

    setTimeout(function () {
      $$(".proj-card").forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          var r = card.getBoundingClientRect();
          var x = e.clientX - r.left, y = e.clientY - r.top;
          var rx = ((y - r.height / 2) / r.height) * -10;
          var ry = ((x - r.width / 2) / r.width) * 10;
          card.style.transform = "perspective(800px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) scale(1.02)";
        });
        card.addEventListener("mouseleave", function () {
          card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
        });
      });
    }, 1500);
  }

  function setNav(id) {
    $$(".nav-link").forEach(function (l) { l.classList.remove("active"); });
    var link = $('.nav-link[href="#' + id + '"]');
    if (link) link.classList.add("active");
  }

  function initTorch() {
    var stage = $("#torchStage");
    var over = $("#torchOver");
    if (!stage || !over) return;

    var rafId = null;
    var lastX = -300, lastY = -300;

    function applyMask(x, y) {
      lastX = x;
      lastY = y;
      var mask = "radial-gradient(circle 140px at " + x + "px " + y + "px, transparent 0%, transparent 110px, black 150px)";
      over.style.maskImage = mask;
      over.style.webkitMaskImage = mask;
    }

    stage.addEventListener("mousemove", function (e) {
      var r = stage.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(function () {
        applyMask(x, y);
        rafId = null;
      });
    });

    stage.addEventListener("mouseleave", function () {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      var mask = "radial-gradient(circle 1px at -300px -300px, transparent 0%, transparent 1px, black 2px)";
      over.style.maskImage = mask;
      over.style.webkitMaskImage = mask;
    });
  }

  function initNav() {
    var burger = $("#navBurger");
    var links = $("#navLinks");
    if (burger && links) {
      burger.addEventListener("click", function () {
        burger.classList.toggle("open");
        links.classList.toggle("open");
      });
    }
    $$(".nav-link").forEach(function (l) {
      l.addEventListener("click", function () {
        if (burger) burger.classList.remove("open");
        if (links) links.classList.remove("open");
      });
    });
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var t = document.querySelector(a.getAttribute("href"));
        if (t) t.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initContact() {
    var form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      ENGINE.screenFlash("rgba(0,255,65,.15)");
      var msg = document.createElement("div");
      msg.className = "tl";
      msg.innerHTML = '<span class="tp" style="color:var(--gold)">SYSTEM:</span><span style="color:var(--green)">✓ Transmission received from ' + fd.get("name") + "!</span>";
      form.appendChild(msg);
      form.reset();
      setTimeout(function () { msg.remove(); }, 5000);
    });
  }

  function init() {
    D = getData();
    populate();
    runPreloader();
    ENGINE.initThree();
    ENGINE.initParticles();
    ENGINE.initCursor();
    ENGINE.initClickBurst();
    ENGINE.initResize();
    initTorch();
    initNav();
    initContact();
    initGSAP();
    initScrollAnim();
    animateBars();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
