/* ═══════════════════════════════════════════
   ADMIN PANEL — Full CRUD + Cert Management
   ═══════════════════════════════════════════ */
(function () {
  "use strict";
  var D = getData();
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };

  function toast(m, c) {
    var t = $("#toast");
    t.textContent = m;
    t.style.background = c || "var(--green)";
    t.classList.add("show");
    setTimeout(function () { t.classList.remove("show"); }, 3000);
  }

  function nextId(arr) {
    return arr.reduce(function (m, i) { return Math.max(m, i.id); }, 0) + 1;
  }

  function initAuth() {
    var ov = $("#loginOverlay");
    if (sessionStorage.getItem("adhi_admin") === "1") {
      ov.classList.add("hidden");
      $("#adminWrap").style.display = "flex";
      loadDash();
      return;
    }
    function attempt() {
      var p = $("#loginPass").value.trim();
      if (p === D.settings.adminPass) {
        sessionStorage.setItem("adhi_admin", "1");
        ov.classList.add("hidden");
        $("#adminWrap").style.display = "flex";
        loadDash();
        toast("ACCESS GRANTED");
      } else {
        $("#loginErr").style.display = "block";
        $("#loginPass").value = "";
        setTimeout(function () { $("#loginErr").style.display = "none"; }, 3000);
      }
    }
    $("#loginBtn").addEventListener("click", attempt);
    $("#loginPass").addEventListener("keypress", function (e) { if (e.key === "Enter") attempt(); });
  }

  window.switchPage = function (pg) {
    $$(".sidebar-nav a").forEach(function (l) { l.classList.remove("active"); });
    var al = $('.sidebar-nav a[data-page="' + pg + '"]');
    if (al) al.classList.add("active");
    $$(".page").forEach(function (p) { p.classList.remove("active"); });
    var ap = $("#page-" + pg);
    if (ap) ap.classList.add("active");
    var loaders = { dash: loadDash, profile: loadProfile, skills: loadSkills, projects: loadProjects, certs: loadCerts, testimonials: loadTests, timeline: loadTimeline };
    if (loaders[pg]) loaders[pg]();
  };

  $$(".sidebar-nav a").forEach(function (l) {
    l.addEventListener("click", function (e) { e.preventDefault(); switchPage(l.dataset.page); });
  });

  function loadDash() {
    D = getData();
    $("#dSk").textContent = D.skills.length;
    $("#dPr").textContent = D.projects.length;
    $("#dCe").textContent = D.certifications ? D.certifications.length : 0;
    $("#dTe").textContent = D.testimonials.length;
  }

  function loadProfile() {
    D = getData();
    var p = D.profile;
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

  $("#profileForm").addEventListener("submit", function (e) {
    e.preventDefault();
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
  });

  function loadSkills() {
    D = getData();
    $("#skList").innerHTML = D.skills.map(function (s) {
      return '<div class="ie"><div class="ie-info"><h4>' + s.name + ' <span style="color:var(--cyan);font-size:.65rem">LVL ' + s.level + ' | ' + s.rank + '</span></h4><p>' + s.cat.toUpperCase() + '</p></div>' +
        '<div class="ie-actions"><button class="btn-a btn-d btn-sm" onclick="delSkill(' + s.id + ')">DEL</button></div></div>';
    }).join("");
  }

  $("#addSkill").addEventListener("click", function () {
    var n = $("#sN").value.trim();
    if (!n) return toast("Enter name", "var(--red)");
    D = getData();
    var lvl = parseInt($("#sL").value, 10) || 50;
    D.skills.push({ id: nextId(D.skills), name: n, level: Math.min(100, Math.max(0, lvl)), cat: $("#sC").value, rank: $("#sR").value });
    saveData(D);
    $("#sN").value = "";
    loadSkills();
    toast("SKILL ADDED");
  });

  window.delSkill = function (id) {
    if (!confirm("Delete this skill?")) return;
    D = getData();
    D.skills = D.skills.filter(function (s) { return s.id !== id; });
    saveData(D);
    loadSkills();
    toast("DELETED", "var(--red)");
  };

  function loadProjects() {
    D = getData();
    $("#prList").innerHTML = D.projects.map(function (p) {
      return '<div class="ie"><div class="ie-info"><h4>' + p.title + '</h4><p>' + (p.tech ? p.tech.join(", ") : "") + '</p></div>' +
        '<div class="ie-actions"><button class="btn-a btn-d btn-sm" onclick="delProj(' + p.id + ')">DEL</button></div></div>';
    }).join("");
  }

  $("#addProj").addEventListener("click", function () {
    var t = $("#prT").value.trim();
    if (!t) return toast("Enter title", "var(--red)");
    D = getData();
    var techStr = $("#prTe").value.trim();
    var tech = techStr ? techStr.split(",").map(function (s) { return s.trim(); }).filter(Boolean) : [];
    D.projects.push({
      id: nextId(D.projects),
      title: t,
      desc: $("#prD").value.trim(),
      tech: tech,
      icon: $("#prI").value.trim() || "fa-code",
      link: $("#prLk").value.trim(),
      github: $("#prGh").value.trim()
    });
    saveData(D);
    $("#prT").value = ""; $("#prD").value = ""; $("#prTe").value = ""; $("#prI").value = ""; $("#prLk").value = ""; $("#prGh").value = "";
    loadProjects();
    toast("PROJECT ADDED");
  });

  window.delProj = function (id) {
    if (!confirm("Delete this project?")) return;
    D = getData();
    D.projects = D.projects.filter(function (p) { return p.id !== id; });
    saveData(D);
    loadProjects();
    toast("DELETED", "var(--red)");
  };

  function loadCerts() {
    D = getData();
    if (!D.certifications) D.certifications = [];
    $("#ceCount").textContent = D.certifications.length;
    $("#ceList").innerHTML = D.certifications.map(function (c) {
      return '<div class="ie"><div class="ie-info"><h4>' + c.title + '</h4><p>' + (c.provider || "") + ' | ' + (c.cat || "") + ' | ' + (c.courses || 1) + ' course(s)</p></div>' +
        '<div class="ie-actions"><button class="btn-a btn-d btn-sm" onclick="delCert(' + c.id + ')">DEL</button></div></div>';
    }).join("");
  }

  $("#addCert").addEventListener("click", function () {
    var t = $("#ceT").value.trim();
    if (!t) return toast("Enter title", "var(--red)");
    D = getData();
    if (!D.certifications) D.certifications = [];
    D.certifications.push({
      id: nextId(D.certifications),
      title: t,
      provider: $("#cePr").value.trim(),
      courses: parseInt($("#ceCo").value, 10) || 1,
      cat: $("#ceCa").value,
      icon: $("#ceIc").value.trim() || "fa-certificate"
    });
    saveData(D);
    $("#ceT").value = ""; $("#cePr").value = ""; $("#ceIc").value = "";
    loadCerts();
    toast("CERT ADDED");
  });

  window.delCert = function (id) {
    if (!confirm("Delete this certification?")) return;
    D = getData();
    D.certifications = D.certifications.filter(function (c) { return c.id !== id; });
    saveData(D);
    loadCerts();
    toast("DELETED", "var(--red)");
  };

  function loadTests() {
    D = getData();
    $("#teList").innerHTML = D.testimonials.map(function (t) {
      return '<div class="ie"><div class="ie-info"><h4>' + t.name + ' ' + "★".repeat(t.rating) + '</h4><p>' + t.course + '</p></div>' +
        '<div class="ie-actions"><button class="btn-a btn-d btn-sm" onclick="delTest(' + t.id + ')">DEL</button></div></div>';
    }).join("");
  }

  $("#addTest").addEventListener("click", function () {
    var n = $("#tN").value.trim();
    var tx = $("#tTx").value.trim();
    if (!n || !tx) return toast("Enter name + feedback", "var(--red)");
    D = getData();
    var init = $("#tI").value.trim().toUpperCase() || n.substring(0, 2).toUpperCase();
    D.testimonials.push({
      id: nextId(D.testimonials),
      name: n,
      initials: init,
      course: $("#tC").value.trim(),
      rating: Math.min(5, Math.max(1, parseInt($("#tR").value, 10) || 5)),
      linkedin: $("#tL").value.trim(),
      text: tx
    });
    saveData(D);
    $("#tN").value = ""; $("#tI").value = ""; $("#tC").value = ""; $("#tL").value = ""; $("#tTx").value = "";
    loadTests();
    toast("TESTIMONIAL ADDED");
  });

  window.delTest = function (id) {
    if (!confirm("Delete this testimonial?")) return;
    D = getData();
    D.testimonials = D.testimonials.filter(function (t) { return t.id !== id; });
    saveData(D);
    loadTests();
    toast("DELETED", "var(--red)");
  };

  function loadTimeline() {
    D = getData();
    $("#tlList").innerHTML = D.timeline.map(function (t) {
      return '<div class="ie"><div class="ie-info"><h4 style="color:' + (t.color || "#00e5ff") + '">' + (t.phase || "") + ' — ' + t.title + '</h4><p>' + t.year + '</p></div>' +
        '<div class="ie-actions"><button class="btn-a btn-d btn-sm" onclick="delTime(' + t.id + ')">DEL</button></div></div>';
    }).join("");
  }

  $("#addTime").addEventListener("click", function () {
    var y = $("#tlY").value.trim();
    var t = $("#tlT").value.trim();
    if (!y || !t) return toast("Enter year + title", "var(--red)");
    D = getData();
    D.timeline.push({
      id: nextId(D.timeline),
      year: y,
      phase: $("#tlP").value.trim() || "ARC",
      title: t,
      desc: $("#tlD").value.trim(),
      icon: $("#tlI").value.trim() || "fa-star",
      color: $("#tlC").value || "#00e5ff"
    });
    saveData(D);
    $("#tlY").value = ""; $("#tlP").value = ""; $("#tlT").value = ""; $("#tlD").value = ""; $("#tlI").value = "";
    loadTimeline();
    toast("EVENT ADDED");
  });

  window.delTime = function (id) {
    if (!confirm("Delete this event?")) return;
    D = getData();
    D.timeline = D.timeline.filter(function (t) { return t.id !== id; });
    saveData(D);
    loadTimeline();
    toast("DELETED", "var(--red)");
  };

  $("#chgPass").addEventListener("click", function () {
    var p = $("#newPass").value.trim();
    if (!p || p.length < 4) return toast("Min 4 characters", "var(--red)");
    D = getData();
    D.settings.adminPass = p;
    saveData(D);
    $("#newPass").value = "";
    toast("PASSWORD UPDATED");
  });

  $("#exportBtn").addEventListener("click", function () {
    D = getData();
    var blob = new Blob([JSON.stringify(D, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "adhi03f24_data.json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("EXPORTED");
  });

  $("#resetBtn").addEventListener("click", function () {
    if (!confirm("RESET ALL DATA to defaults? This cannot be undone.")) return;
    D = resetData();
    loadDash();
    toast("RESET COMPLETE", "var(--gold)");
  });

  $("#impBtn").addEventListener("click", function () {
    var r = $("#impData").value.trim();
    if (!r) return toast("Paste JSON first", "var(--red)");
    try {
      var parsed = JSON.parse(r);
      if (!parsed.profile) throw new Error("Invalid structure: missing profile");
      saveData(parsed);
      D = parsed;
      $("#impData").value = "";
      loadDash();
      toast("IMPORTED");
    } catch (err) {
      toast("Invalid JSON: " + err.message, "var(--red)");
    }
  });

  initAuth();
})();
