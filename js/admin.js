/* ═══════════════════════════════════════
   ADMIN PANEL — Full CRUD
   ═══════════════════════════════════════ */
(function () {
  "use strict";
  let D = getData();
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  function toast(m, c) {
    const t = $("#toast");
    t.textContent = m;
    t.style.background = c || "var(--green)";
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3000);
  }

  function nid(a) {
    return a.reduce((m, i) => Math.max(m, i.id), 0) + 1;
  }

  /* ══════ AUTH ══════ */
  function initAuth() {
    const ov = $("#lov");
    if (sessionStorage.getItem("a03f24") === "1") {
      ov.classList.add("h");
      $("#aw").style.display = "flex";
      loadDash();
      return;
    }

    function attempt() {
      const pass = $("#lp").value.trim();
      if (pass === D.settings.adminPass) {
        sessionStorage.setItem("a03f24", "1");
        ov.classList.add("h");
        $("#aw").style.display = "flex";
        loadDash();
        toast("ACCESS GRANTED");
      } else {
        $("#lerr").style.display = "block";
        $("#lp").value = "";
        $("#lp").focus();
        setTimeout(() => ($("#lerr").style.display = "none"), 3000);
      }
    }

    $("#lb").addEventListener("click", attempt);
    $("#lp").addEventListener("keypress", e => {
      if (e.key === "Enter") attempt();
    });
  }

  /* ══════ NAVIGATION ══════ */
  window.sp = function (page) {
    $$(".sbn a").forEach(l => l.classList.remove("on"));
    const activeLink = $(`.sbn a[data-p="${page}"]`);
    if (activeLink) activeLink.classList.add("on");

    $$(".pg").forEach(p => p.classList.remove("on"));
    const activePage = $(`#pg-${page}`);
    if (activePage) activePage.classList.add("on");

    const loaders = {
      dash: loadDash,
      profile: loadProfile,
      skills: loadSkills,
      projects: loadProjects,
      certs: loadCerts,
      tests: loadTests,
      timeline: loadTimeline
    };
    if (loaders[page]) loaders[page]();
  };

  $$(".sbn a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      sp(link.dataset.p);
    });
  });

  /* ══════ DASHBOARD ══════ */
  function loadDash() {
    D = getData();
    $("#dS").textContent = D.skills.length;
    $("#dP").textContent = D.projects.length;
    $("#dC").textContent = D.certifications.length;
    $("#dT").textContent = D.testimonials.length;
  }

  /* ══════ PROFILE ══════ */
  function loadProfile() {
    D = getData();
    const p = D.profile;
    $("#pN").value = p.name || "";
    $("#pU").value = p.username || "";
    $("#pT").value = p.title || "";
    $("#pSt").value = p.subtitle || "";
    $("#pTg").value = p.tagline || "";
    $("#pB").value = p.bio || "";
    $("#pE").value = p.email || "";
    $("#pPh").value = p.phone || "";
    $("#pL").value = p.location || "";
    $("#pGh").value = p.social.github || "";
    $("#pLi").value = p.social.linkedin || "";
    $("#pTw").value = p.social.twitter || "";
    $("#pIg").value = p.social.instagram || "";
    $("#pYt").value = p.social.youtube || "";
  }

  function saveProfile() {
    D = getData();
    D.profile.name = $("#pN").value.trim();
    D.profile.username = $("#pU").value.trim();
    D.profile.title = $("#pT").value.trim();
    D.profile.subtitle = $("#pSt").value.trim();
    D.profile.tagline = $("#pTg").value.trim();
    D.profile.bio = $("#pB").value.trim();
    D.profile.email = $("#pE").value.trim();
    D.profile.phone = $("#pPh").value.trim();
    D.profile.location = $("#pL").value.trim();
    D.profile.social = {
      github: $("#pGh").value.trim(),
      linkedin: $("#pLi").value.trim(),
      twitter: $("#pTw").value.trim(),
      instagram: $("#pIg").value.trim(),
      youtube: $("#pYt").value.trim()
    };
    saveData(D);
    toast("PROFILE SAVED");
  }

  $("#pf").addEventListener("submit", e => {
    e.preventDefault();
    saveProfile();
  });

  /* ══════ SKILLS CRUD ══════ */
  function loadSkills() {
    D = getData();
    const list = $("#sLi");
    list.innerHTML = D.skills.map(s => `
      <div class="ie">
        <div>
          <h4>${s.name} <span style="color:var(--cyan);font-size:.6rem">LVL ${s.level} | ${s.rank}</span></h4>
          <p>${s.cat.toUpperCase()}</p>
        </div>
        <div class="ie-a">
          <button class="ba bd bsm" onclick="dS(${s.id})">DEL</button>
        </div>
      </div>
    `).join("");
  }

  function addSkill() {
    const name = $("#sN").value.trim();
    if (!name) return toast("Enter skill name", "var(--red)");
    D = getData();
    D.skills.push({
      id: nid(D.skills),
      name: name,
      level: Math.min(100, Math.max(0, parseInt($("#sL").value) || 50)),
      cat: $("#sC").value,
      rank: $("#sR").value
    });
    saveData(D);
    $("#sN").value = "";
    $("#sL").value = "50";
    loadSkills();
    toast("SKILL ADDED");
  }

  $("#aS").addEventListener("click", addSkill);

  window.dS = function (id) {
    if (!confirm("Delete this skill?")) return;
    D = getData();
    D.skills = D.skills.filter(s => s.id !== id);
    saveData(D);
    loadSkills();
    toast("SKILL DELETED", "var(--red)");
  };

  /* ══════ PROJECTS CRUD ══════ */
  function loadProjects() {
    D = getData();
    const list = $("#pLi");
    list.innerHTML = D.projects.map(p => `
      <div class="ie">
        <div>
          <h4><i class="fas ${p.icon || 'fa-code'}" style="margin-right:.4rem;opacity:.5"></i>${p.title}</h4>
          <p>${p.tech.join(", ")}</p>
        </div>
        <div class="ie-a">
          <button class="ba bd bsm" onclick="dP(${p.id})">DEL</button>
        </div>
      </div>
    `).join("");
  }

  function addProject() {
    const title = $("#prT").value.trim();
    if (!title) return toast("Enter project title", "var(--red)");
    D = getData();
    D.projects.push({
      id: nid(D.projects),
      title: title,
      desc: $("#prD").value.trim(),
      tech: $("#prTe").value.split(",").map(s => s.trim()).filter(Boolean),
      icon: $("#prI").value.trim() || "fa-code",
      link: $("#prLk").value.trim(),
      github: $("#prGh").value.trim()
    });
    saveData(D);
    ["prT", "prD", "prTe", "prI", "prLk", "prGh"].forEach(id => {
      $("#" + id).value = "";
    });
    loadProjects();
    toast("PROJECT ADDED");
  }

  $("#aP").addEventListener("click", addProject);

  window.dP = function (id) {
    if (!confirm("Delete this project?")) return;
    D = getData();
    D.projects = D.projects.filter(p => p.id !== id);
    saveData(D);
    loadProjects();
    toast("PROJECT DELETED", "var(--red)");
  };

  /* ══════ CERTIFICATIONS CRUD ══════ */
  function loadCerts() {
    D = getData();
    const countEl = $("#ceC");
    if (countEl) countEl.textContent = D.certifications.length;

    const list = $("#ceLi");
    list.innerHTML = D.certifications.map(c => `
      <div class="ie">
        <div>
          <h4>${c.t}</h4>
          <p>${c.p} | ${c.cat.toUpperCase()} | ${c.c} course${c.c > 1 ? 's' : ''}</p>
        </div>
        <div class="ie-a">
          <button class="ba bd bsm" onclick="dC(${c.id})">DEL</button>
        </div>
      </div>
    `).join("");
  }

  function addCert() {
    const title = $("#ceT").value.trim();
    if (!title) return toast("Enter cert title", "var(--red)");
    D = getData();
    D.certifications.push({
      id: nid(D.certifications),
      t: title,
      p: $("#cePr").value.trim(),
      c: parseInt($("#ceCo").value) || 1,
      cat: $("#ceCa").value
    });
    saveData(D);
    $("#ceT").value = "";
    $("#cePr").value = "";
    $("#ceCo").value = "1";
    loadCerts();
    toast("CERTIFICATION ADDED");
  }

  $("#aCe").addEventListener("click", addCert);

  window.dC = function (id) {
    if (!confirm("Delete this certification?")) return;
    D = getData();
    D.certifications = D.certifications.filter(c => c.id !== id);
    saveData(D);
    loadCerts();
    toast("CERTIFICATION DELETED", "var(--red)");
  };

  /* ══════ TESTIMONIALS CRUD ══════ */
  function loadTests() {
    D = getData();
    const list = $("#teLi");
    list.innerHTML = D.testimonials.map(t => `
      <div class="ie">
        <div>
          <h4>${t.name} <span style="color:var(--gold)">${"★".repeat(t.rating)}</span></h4>
          <p>${t.course} ${t.linkedin ? '| <a href="' + t.linkedin + '" target="_blank">LinkedIn</a>' : ''}</p>
          <p style="margin-top:.2rem;font-style:italic;color:var(--white);font-size:.65rem">"${t.text.length > 80 ? t.text.substring(0, 80) + '...' : t.text}"</p>
        </div>
        <div class="ie-a">
          <button class="ba bd bsm" onclick="dT(${t.id})">DEL</button>
        </div>
      </div>
    `).join("");
  }

  function addTestimonial() {
    const name = $("#tN").value.trim();
    const text = $("#tTx").value.trim();
    if (!name || !text) return toast("Enter name and feedback", "var(--red)");

    D = getData();
    const initials = ($("#tI").value.trim() || name.substring(0, 2)).toUpperCase();
    const course = $("#tC").value.trim();
    const rating = Math.min(5, Math.max(1, parseInt($("#tR").value) || 5));
    const linkedin = $("#tLi").value.trim();

    D.testimonials.push({
      id: nid(D.testimonials),
      name: name,
      initials: initials,
      course: course,
      rating: rating,
      text: text,
      linkedin: linkedin
    });
    saveData(D);

    // Clear form
    ["tN", "tI", "tC", "tLi", "tTx"].forEach(id => {
      $("#" + id).value = "";
    });
    $("#tR").value = "5";
    loadTests();
    toast("TESTIMONIAL ADDED");
  }

  $("#aTe").addEventListener("click", addTestimonial);

  window.dT = function (id) {
    if (!confirm("Delete this testimonial?")) return;
    D = getData();
    D.testimonials = D.testimonials.filter(t => t.id !== id);
    saveData(D);
    loadTests();
    toast("TESTIMONIAL DELETED", "var(--red)");
  };

  /* ══════ TIMELINE CRUD ══════ */
  function loadTimeline() {
    D = getData();
    const list = $("#tlLi");
    list.innerHTML = D.timeline.map(t => `
      <div class="ie">
        <div>
          <h4 style="color:${t.color || 'var(--cyan)'}">${t.phase || ''} — ${t.title}</h4>
          <p>${t.year} | ${t.desc.length > 60 ? t.desc.substring(0, 60) + '...' : t.desc}</p>
        </div>
        <div class="ie-a">
          <button class="ba bd bsm" onclick="dTl(${t.id})">DEL</button>
        </div>
      </div>
    `).join("");
  }

  function addTimelineEvent() {
    const year = $("#tlY").value.trim();
    const title = $("#tlT").value.trim();
    if (!year || !title) return toast("Enter year and title", "var(--red)");

    D = getData();
    D.timeline.push({
      id: nid(D.timeline),
      year: year,
      phase: $("#tlP").value.trim() || "ARC " + (D.timeline.length + 1),
      title: title,
      desc: $("#tlD").value.trim(),
      icon: $("#tlI").value.trim() || "fa-star",
      color: $("#tlCo").value || "#00e5ff"
    });
    saveData(D);

    ["tlY", "tlP", "tlT", "tlD", "tlI"].forEach(id => {
      $("#" + id).value = "";
    });
    loadTimeline();
    toast("TIMELINE EVENT ADDED");
  }

  $("#aTl").addEventListener("click", addTimelineEvent);

  window.dTl = function (id) {
    if (!confirm("Delete this timeline event?")) return;
    D = getData();
    D.timeline = D.timeline.filter(t => t.id !== id);
    saveData(D);
    loadTimeline();
    toast("EVENT DELETED", "var(--red)");
  };

  /* ══════ SETTINGS ══════ */
  function initSettings() {
    // Change password
    $("#cP").addEventListener("click", () => {
      const newPass = $("#nP").value.trim();
      if (!newPass || newPass.length < 4) {
        return toast("Password must be at least 4 characters", "var(--red)");
      }
      D = getData();
      D.settings.adminPass = newPass;
      saveData(D);
      $("#nP").value = "";
      toast("PASSWORD UPDATED");
    });

    // Export data
    $("#exB").addEventListener("click", () => {
      D = getData();
      const jsonStr = JSON.stringify(D, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "adhi03f24_portfolio_data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast("DATA EXPORTED");
    });

    // Reset all data
    $("#rsB").addEventListener("click", () => {
      if (!confirm("⚠️ RESET ALL DATA TO DEFAULTS?\nThis cannot be undone!")) return;
      if (!confirm("Are you absolutely sure? All custom data will be lost.")) return;
      D = resetData();
      loadDash();
      toast("ALL DATA RESET TO DEFAULTS", "var(--gold)");
    });

    // Import data
    $("#imB").addEventListener("click", () => {
      const raw = $("#imD").value.trim();
      if (!raw) return toast("Paste JSON data first", "var(--red)");
      try {
        const imported = JSON.parse(raw);
        // Basic validation
        if (!imported.profile || !imported.skills || !imported.certifications) {
          throw new Error("Invalid data structure — missing required fields");
        }
        saveData(imported);
        D = imported;
        $("#imD").value = "";
        loadDash();
        toast("DATA IMPORTED SUCCESSFULLY");
      } catch (e) {
        toast("Invalid JSON: " + e.message, "var(--red)");
      }
    });
  }

  /* ══════ INIT ══════ */
  initAuth();
  initSettings();

})();
