/* ═══════════════════════════════════════
   SCENE — Canvas Worlds + Torch + Cursor
   ═══════════════════════════════════════ */
const SCENE = (() => {
  "use strict";
  const $ = s => document.querySelector(s);

  let mouseX = -500, mouseY = -500;
  let normX = 0, normY = 0;

  /* ═══ LIGHT CANVAS — Sakura Petals + Fireflies ═══ */
  function initLightCanvas() {
    const c = $("#lightCanvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h;

    function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
    resize();
    addEventListener("resize", resize);

    const petals = [];
    const flies = [];

    class Petal {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = -10 - Math.random() * h * 0.3;
        this.s = 3 + Math.random() * 5;
        this.vy = 0.3 + Math.random() * 0.8;
        this.vx = -0.2 + Math.random() * 0.5;
        this.rot = Math.random() * Math.PI * 2;
        this.rv = (Math.random() - 0.5) * 0.03;
        this.a = 0.3 + Math.random() * 0.5;
        this.drift = Math.random() * 2;
      }
      update(t) {
        this.x += this.vx + Math.sin(t * 0.5 + this.drift) * 0.3;
        this.y += this.vy;
        this.rot += this.rv;
        if (this.y > h + 20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.s, this.s * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${150 + Math.random() * 50},${180 + Math.random() * 40},${this.a})`;
        ctx.fill();
        ctx.restore();
      }
    }

    class Firefly {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * w;
        this.y = h * 0.5 + Math.random() * h * 0.45;
        this.r = 1 + Math.random() * 2;
        this.phase = Math.random() * Math.PI * 2;
        this.spd = 0.5 + Math.random() * 1.5;
      }
      update(t) {
        this.x += Math.sin(t * this.spd + this.phase) * 0.5;
        this.y += Math.cos(t * this.spd * 0.7 + this.phase) * 0.3;
        if (this.x < -20 || this.x > w + 20) this.init();
      }
      draw(t) {
        const a = 0.3 + Math.sin(t * 2 + this.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,180,${a})`;
        ctx.shadowColor = "rgba(255,255,150,.4)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < 40; i++) petals.push(new Petal());
    for (let i = 0; i < 25; i++) flies.push(new Firefly());

    function loop(t) {
      requestAnimationFrame(loop);
      t *= 0.001;
      ctx.clearRect(0, 0, w, h);
      petals.forEach(p => { p.update(t); p.draw(); });
      flies.forEach(f => { f.update(t); f.draw(t); });
    }
    requestAnimationFrame(loop);
  }

  /* ═══ DARK CANVAS — Matrix Rain + Embers ═══ */
  function initDarkCanvas() {
    const c = $("#darkCanvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h;

    function resize() { w = c.width = innerWidth; h = c.height = innerHeight; }
    resize();
    addEventListener("resize", resize);

    const cols = Math.floor(w / 16);
    const drops = new Array(cols).fill(0).map(() => Math.random() * h);
    const chars = "01アイウエオカキクケコ影侵入HACK3R";

    const embers = [];
    class Ember {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * w;
        this.y = h + 10 + Math.random() * 50;
        this.s = 1 + Math.random() * 3;
        this.vy = -(0.5 + Math.random() * 1.5);
        this.vx = (Math.random() - 0.5) * 0.8;
        this.life = 1;
        this.decay = 0.002 + Math.random() * 0.005;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0) this.init();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.s * this.life, 0, Math.PI * 2);
        const r = 200 + Math.random() * 55;
        ctx.fillStyle = `rgba(${r},${50 + Math.random() * 80},0,${this.life * 0.6})`;
        ctx.shadowColor = `rgba(${r},80,0,.3)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    for (let i = 0; i < 35; i++) embers.push(new Ember());

    function loop() {
      requestAnimationFrame(loop);

      ctx.fillStyle = "rgba(5,10,5,0.08)";
      ctx.fillRect(0, 0, w, h);

      // Matrix rain
      ctx.font = "13px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const a = 0.1 + Math.random() * 0.2;
        ctx.fillStyle = `rgba(0,255,65,${a})`;
        ctx.fillText(ch, i * 16, drops[i]);
        drops[i] += 14;
        if (drops[i] > h && Math.random() > 0.97) drops[i] = 0;
      }

      // Embers
      embers.forEach(e => { e.update(); e.draw(); });
    }
    loop();
  }

  /* ═══ TORCH EFFECT (fixed) ═══ */
  function initTorch() {
    const light = $("#worldLight");
    const hero = $("#hero");
    if (!light || !hero) return;

    const resetMask = "radial-gradient(circle 1px at -500px -500px, transparent 0%, transparent 1px, black 2px)";

    hero.addEventListener("mousemove", e => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const mask = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, transparent 120px, black 160px)`;
      light.style.maskImage = mask;
      light.style.webkitMaskImage = mask;
    });

    hero.addEventListener("mouseleave", () => {
      light.style.maskImage = resetMask;
      light.style.webkitMaskImage = resetMask;
    });

    // Also reset on page load
    light.style.maskImage = resetMask;
    light.style.webkitMaskImage = resetMask;
  }

  /* ═══ PARALLAX ON MOUSE ═══ */
  function initParallax() {
    const layers = [
      { el: ".light-mountains", speed: 0.02 },
      { el: ".dark-mountains", speed: 0.02 },
      { el: ".world-trees", speed: 0.04 },
      { el: ".char-hero", speed: 0.03 },
      { el: ".char-villain", speed: 0.03 },
      { el: ".light-info", speed: -0.015 },
      { el: ".dark-info", speed: -0.015 },
      { el: ".cloud", speed: 0.01 }
    ];

    document.addEventListener("mousemove", e => {
      const mx = (e.clientX / innerWidth - 0.5) * 2;
      const my = (e.clientY / innerHeight - 0.5) * 2;

      layers.forEach(l => {
        document.querySelectorAll(l.el).forEach(el => {
          const tx = mx * l.speed * 100;
          const ty = my * l.speed * 50;
          el.style.transform = `translate(${tx}px, ${ty}px)` +
            (el.style.transform.includes("translateX") ? "" : "");
        });
      });
    });
  }

  /* ═══ CURSOR ═══ */
  function initCursor() {
    const dot = $("#curDot");
    const ring = $("#curRing");
    const trail = $("#curTrail");
    if (!dot || !trail) return;

    const tCtx = trail.getContext("2d");
    trail.width = innerWidth;
    trail.height = innerHeight;
    addEventListener("resize", () => { trail.width = innerWidth; trail.height = innerHeight; });

    let cx = -100, cy = -100, ax = -100, ay = -100;
    const pts = [];

    document.addEventListener("mousemove", e => {
      cx = e.clientX; cy = e.clientY;
      pts.push({ x: cx, y: cy, t: Date.now() });
      if (pts.length > 20) pts.shift();
    });

    function loop() {
      requestAnimationFrame(loop);
      dot.style.left = cx + "px";
      dot.style.top = cy + "px";
      ax += (cx - ax) * 0.12;
      ay += (cy - ay) * 0.12;
      ring.style.left = ax + "px";
      ring.style.top = ay + "px";

      tCtx.clearRect(0, 0, trail.width, trail.height);
      const now = Date.now();
      for (let i = 1; i < pts.length; i++) {
        const age = now - pts[i].t;
        if (age > 250) continue;
        const a = (1 - age / 250) * 0.35;
        const w = (1 - age / 250) * 3;
        tCtx.beginPath();
        tCtx.moveTo(pts[i - 1].x, pts[i - 1].y);
        tCtx.lineTo(pts[i].x, pts[i].y);
        tCtx.strokeStyle = `rgba(255,23,68,${a})`;
        tCtx.lineWidth = w;
        tCtx.lineCap = "round";
        tCtx.stroke();
      }
      while (pts.length > 0 && now - pts[0].t > 250) pts.shift();
    }
    loop();

    // Hover
    document.querySelectorAll("a,button,.pc,.skc,.cc,.dc,.skf,.cf").forEach(el => {
      el.addEventListener("mouseenter", () => { dot.classList.add("hov"); ring.classList.add("hov"); });
      el.addEventListener("mouseleave", () => { dot.classList.remove("hov"); ring.classList.remove("hov"); });
    });
  }

  /* ═══ PRELOADER MATRIX ═══ */
  function initPreMatrix(cb) {
    const c = $("#preCanvas");
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width = innerWidth; c.height = innerHeight;
    const cols = Math.floor(c.width / 14);
    const drops = new Array(cols).fill(1);
    const chars = "01影コーダーADHI03F24侵入禁止ハッカー";
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(6,6,16,0.06)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "rgba(255,23,68,0.16)";
      ctx.font = "12px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, drops[i] * 14);
        if (drops[i] * 14 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 40);
    if (cb) cb(id);
  }

  /* ═══ CLICK SPARKS ═══ */
  function initClickSparks() {
    document.addEventListener("click", e => {
      const colors = ["#ff1744", "#a855f7", "#00e5ff", "#ffd700", "#00ff41"];
      for (let i = 0; i < 10; i++) {
        const s = document.createElement("div");
        s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;
          width:${3 + Math.random() * 4}px;height:${3 + Math.random() * 4}px;border-radius:50%;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          pointer-events:none;z-index:99999;box-shadow:0 0 6px currentColor`;
        document.body.appendChild(s);
        const angle = (Math.PI * 2 / 10) * i + Math.random();
        const dist = 30 + Math.random() * 70;
        s.animate([
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px),calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 }
        ], { duration: 400 + Math.random() * 300, easing: "cubic-bezier(.23,1,.32,1)" }).onfinish = () => s.remove();
      }
    });
  }

  /* ═══ FLASH ═══ */
  function flash(c) {
    const f = $("#flash");
    if (!f) return;
    if (c) f.style.background = c;
    f.style.transition = "none";
    f.style.opacity = "1";
    requestAnimationFrame(() => {
      f.style.transition = "opacity .4s";
      f.style.opacity = "0";
    });
  }

  return {
    initLightCanvas, initDarkCanvas, initTorch, initParallax,
    initCursor, initPreMatrix, initClickSparks, flash,
    get normX() { return normX }, get normY() { return normY }
  };
})();
