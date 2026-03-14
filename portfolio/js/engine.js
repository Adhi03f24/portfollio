/* ═══════════════════════════════════════════════════════
   ENGINE — Three.js, Particles, Cursor Trail, Effects
   ═══════════════════════════════════════════════════════ */

const ENGINE = (function () {
  "use strict";

  const $ = function (s) { return document.querySelector(s); };

  var scene, camera, renderer, shapes = [], clock;
  var mouseNX = 0, mouseNY = 0;

  function initThree() {
    var canvas = $("#bgCanvas");
    if (!canvas) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    clock = new THREE.Clock();

    scene.add(new THREE.AmbientLight(0x1a1a33, 0.6));

    var lights = [
      { color: 0xff1744, pos: [25, 15, 20], intensity: 2.5 },
      { color: 0xa855f7, pos: [-25, -15, 15], intensity: 2 },
      { color: 0x00e5ff, pos: [0, 20, 25], intensity: 1.5 },
      { color: 0xffd700, pos: [15, -20, 10], intensity: 1 }
    ];
    lights.forEach(function (l) {
      var pl = new THREE.PointLight(l.color, l.intensity, 120);
      pl.position.set(l.pos[0], l.pos[1], l.pos[2]);
      scene.add(pl);
    });

    var geos = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1.1, 0),
      new THREE.TorusGeometry(0.9, 0.25, 8, 20),
      new THREE.BoxGeometry(0.9, 0.9, 0.9),
      new THREE.TorusKnotGeometry(0.6, 0.2, 50, 8),
      new THREE.DodecahedronGeometry(0.8, 0),
      new THREE.ConeGeometry(0.7, 1.4, 6)
    ];

    var colors = [0xff1744, 0xa855f7, 0x00e5ff, 0xffd700, 0x00ff41, 0xff69b4];

    for (var i = 0; i < 60; i++) {
      var geo = geos[Math.floor(Math.random() * geos.length)];
      var mat = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        wireframe: true,
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2
      });
      var mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 50 - 15
      );
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.008,
        ry: (Math.random() - 0.5) * 0.008,
        floatSpd: 0.2 + Math.random() * 0.6,
        floatAmp: 0.3 + Math.random() * 1.2,
        oy: mesh.position.y
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    animate3D();
  }

  function animate3D() {
    requestAnimationFrame(animate3D);
    var t = clock.getElapsedTime();

    shapes.forEach(function (m) {
      m.rotation.x += m.userData.rx;
      m.rotation.y += m.userData.ry;
      m.position.y = m.userData.oy + Math.sin(t * m.userData.floatSpd) * m.userData.floatAmp;
    });

    camera.position.x += (mouseNX * 4 - camera.position.x) * 0.015;
    camera.position.y += (-mouseNY * 4 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  function initParticles() {
    var c = $("#particleCanvas");
    if (!c) return;
    var ctx = c.getContext("2d");
    var w, h, parts = [];

    function resize() {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    var cColors = ["255,23,68", "168,85,247", "0,229,255", "255,215,0", "0,255,65"];

    function P() {
      this.init();
    }
    P.prototype.init = function () {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2.2 + 0.3;
      this.a = Math.random() * 0.35 + 0.05;
      this.c = cColors[Math.floor(Math.random() * cColors.length)];
    };
    P.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) this.init();
    };
    P.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + this.c + "," + this.a + ")";
      ctx.fill();
    };

    for (var i = 0; i < 90; i++) parts.push(new P());

    function loop() {
      requestAnimationFrame(loop);
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < parts.length; i++) {
        for (var j = i + 1; j < parts.length; j++) {
          var dx = parts[i].x - parts[j].x;
          var dy = parts[i].y - parts[j].y;
          var d = dx * dx + dy * dy;
          if (d < 14400) {
            ctx.beginPath();
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.strokeStyle = "rgba(168,85,247," + (0.04 * (1 - Math.sqrt(d) / 120)) + ")";
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
      parts.forEach(function (p) { p.update(); p.draw(); });
    }
    loop();
  }

  function initCursor() {
    var core = $("#cursorCore");
    var aura = $("#cursorAura");
    var trail = $("#cursorTrail");
    if (!core || !trail) return;

    var tCtx = trail.getContext("2d");
    trail.width = window.innerWidth;
    trail.height = window.innerHeight;
    window.addEventListener("resize", function () {
      trail.width = window.innerWidth;
      trail.height = window.innerHeight;
    });

    var cx = -100, cy = -100, ax = -100, ay = -100;
    var trailPts = [];
    var MAX_TRAIL = 25;

    document.addEventListener("mousemove", function (e) {
      cx = e.clientX;
      cy = e.clientY;
      mouseNX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseNY = (e.clientY / window.innerHeight - 0.5) * 2;
      trailPts.push({ x: cx, y: cy, t: Date.now() });
      if (trailPts.length > MAX_TRAIL) trailPts.shift();
    });

    function updateCursor() {
      requestAnimationFrame(updateCursor);
      core.style.left = cx + "px";
      core.style.top = cy + "px";
      ax += (cx - ax) * 0.12;
      ay += (cy - ay) * 0.12;
      if (aura) {
        aura.style.left = ax + "px";
        aura.style.top = ay + "px";
      }

      if (trail.width && trail.height) {
        tCtx.clearRect(0, 0, trail.width, trail.height);
      }
      var now = Date.now();
      for (var i = 1; i < trailPts.length; i++) {
        var age = now - trailPts[i].t;
        if (age > 300) continue;
        var alpha = (1 - age / 300) * 0.4;
        var width = (1 - age / 300) * 3;
        tCtx.beginPath();
        tCtx.moveTo(trailPts[i - 1].x, trailPts[i - 1].y);
        tCtx.lineTo(trailPts[i].x, trailPts[i].y);
        tCtx.strokeStyle = "rgba(255,23,68," + alpha + ")";
        tCtx.lineWidth = width;
        tCtx.lineCap = "round";
        tCtx.stroke();
      }
      while (trailPts.length > 0 && now - trailPts[0].t > 300) trailPts.shift();
    }
    updateCursor();

    var hovers = document.querySelectorAll("a,button,.proj-card,.sk-card,.cert-card,.dojo-card,.sf-btn,.cf-btn,.htag");
    [].forEach.call(hovers, function (el) {
      el.addEventListener("mouseenter", function () { core.classList.add("hover"); aura.classList.add("hover"); });
      el.addEventListener("mouseleave", function () { core.classList.remove("hover"); aura.classList.remove("hover"); });
    });
  }

  function initMatrixRain(canvasId, callback) {
    var c = document.getElementById(canvasId);
    if (!c) return;
    var ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    var cols = Math.floor(c.width / 14);
    var drops = new Array(cols);
    for (var i = 0; i < cols; i++) drops[i] = 1;
    var chars = "01\u30a2\u30a4\u30a6\u30a8\u30aa\u30ab\u30ad\u30af\u30b1\u30b3ADHI03F24\u5f71\u30b3\u30fc\u30c0\u30fc\u4fb5\u5165\u7981\u6b62";

    var id = setInterval(function () {
      ctx.fillStyle = "rgba(6,6,17,0.06)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "rgba(255,23,68,0.18)";
      ctx.font = "12px monospace";
      for (var i = 0; i < drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 40);

    if (callback) callback(id);
    return id;
  }

  function initClickBurst() {
    document.addEventListener("click", function (e) {
      var colors = ["#ff1744", "#a855f7", "#00e5ff", "#ffd700"];
      for (var i = 0; i < 8; i++) {
        var spark = document.createElement("div");
        spark.style.cssText =
          "position:fixed;left:" + e.clientX + "px;top:" + e.clientY + "px;" +
          "width:4px;height:4px;border-radius:50%;" +
          "background:" + colors[Math.floor(Math.random() * 4)] + ";" +
          "pointer-events:none;z-index:99999;box-shadow:0 0 6px currentColor;";
        document.body.appendChild(spark);

        var angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
        var dist = 40 + Math.random() * 60;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist;

        spark.animate([
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          { transform: "translate(calc(-50% + " + dx + "px), calc(-50% + " + dy + "px)) scale(0)", opacity: 0 }
        ], { duration: 500 + Math.random() * 300, easing: "cubic-bezier(.23,1,.32,1)" }).onfinish = function () { spark.remove(); };
      }
    });
  }

  function initResize() {
    window.addEventListener("resize", function () {
      if (renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });
  }

  function screenFlash(color) {
    var f = $("#screenFlash");
    if (!f) return;
    f.style.background = color || "linear-gradient(135deg,rgba(255,23,68,.15),rgba(168,85,247,.15))";
    f.style.transition = "none";
    f.style.opacity = "1";
    requestAnimationFrame(function () {
      f.style.transition = "opacity .4s";
      f.style.opacity = "0";
    });
  }

  return {
    initThree: initThree,
    initParticles: initParticles,
    initCursor: initCursor,
    initMatrixRain: initMatrixRain,
    initClickBurst: initClickBurst,
    initResize: initResize,
    screenFlash: screenFlash
  };
})();
