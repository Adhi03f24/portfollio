import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { courses, courseThemes } from "../../data/courses";
import { profile } from "../../data/profile";
import "./Courses.css";

const getTheme = (themeKey) => courseThemes[themeKey] || courseThemes.cyber;

/* Custom SVG icons per theme (no emoji) */
function CourseThemeIcon({ themeKey, accent = "#00f5ff" }) {
  const color = accent;
  const common = { width: 28, height: 28, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  const icons = {
    cyber: (
      <svg {...common} aria-hidden="true"><path d="M16 4L4 10v12l12 6 12-6V10L16 4zm0 2.5l8.5 4.25v8.5L16 23.5l-8.5-4.25v-8.5L16 6.5z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg>
    ),
    ai: (
      <svg {...common} aria-hidden="true"><path d="M8 10h2v4H8zm14 0h2v4h-2zm-8 2v8h4v-8h-4zm-4 4H6v2h4v-2zm12 0v2h4v-2h-4z" stroke={color} strokeWidth="1.2" fill="none"/><circle cx="16" cy="16" r="2" fill={color} opacity="0.8"/></svg>
    ),
    network: (
      <svg {...common} aria-hidden="true"><circle cx="16" cy="8" r="4" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="8" cy="20" r="3" stroke={color} strokeWidth="1.2" fill="none"/><circle cx="24" cy="20" r="3" stroke={color} strokeWidth="1.2" fill="none"/><path d="M16 12v4M14 20l-4-8M18 20l4-8" stroke={color} strokeWidth="1.2" fill="none"/></svg>
    ),
    microsoft: (
      <svg {...common} aria-hidden="true"><rect x="4" y="4" width="10" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none"/><rect x="18" y="4" width="10" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none"/><rect x="4" y="18" width="10" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none"/><rect x="18" y="18" width="10" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none"/></svg>
    ),
    google: (
      <svg {...common} aria-hidden="true"><circle cx="16" cy="14" r="6" stroke={color} strokeWidth="1.5" fill="none"/><path d="M20 20l4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>
    ),
    cisco: (
      <svg {...common} aria-hidden="true"><path d="M16 4l12 6v12l-12 6L4 22V10l12-6z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg>
    ),
    ibm: (
      <svg {...common} aria-hidden="true"><path d="M8 8h4v4H8V8zm12 0h4v4h-4V8zM8 20h4v4H8v-4zm12 0h4v4h-4v-4z" stroke={color} strokeWidth="1.2" fill="none"/><rect x="14" y="14" width="4" height="4" stroke={color} strokeWidth="1.2" fill="none"/></svg>
    ),
    packt: (
      <svg {...common} aria-hidden="true"><path d="M8 6h12a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" stroke={color} strokeWidth="1.5" fill="none"/><path d="M8 6l6 8 6-8" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round"/></svg>
    ),
    coursera: (
      <svg {...common} aria-hidden="true"><path d="M8 8h16v2l-6 10-4 4-4-4-2-6V8z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg>
    ),
    learnquest: (
      <svg {...common} aria-hidden="true"><circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="16" cy="16" r="4" fill={color} opacity="0.9"/></svg>
    ),
    infosec: (
      <svg {...common} aria-hidden="true"><rect x="6" y="12" width="20" height="12" rx="2" stroke={color} strokeWidth="1.5" fill="none"/><path d="M10 12V8a4 4 0 018 0v4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
    ),
    ecouncil: (
      <svg {...common} aria-hidden="true"><path d="M16 4l4 12h8l-6 8 2 8-8-6-8 6 2-8-6-8h8L16 4z" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round"/></svg>
    ),
    comptia: (
      <svg {...common} aria-hidden="true"><path d="M16 4L28 10v12L16 28 4 22V10L16 4z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/><path d="M16 10v12M10 14l6 4 6-4" stroke={color} strokeWidth="1.2" fill="none"/></svg>
    ),
    university: (
      <svg {...common} aria-hidden="true"><path d="M16 4l12 6v2H4v-2l12-6zM4 14h24v8l-12 4-12-4v-8z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg>
    ),
    deeplearning: (
      <svg {...common} aria-hidden="true"><path d="M8 16c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4zm8 0c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4zm-4-8c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4z" stroke={color} strokeWidth="1.2" fill="none"/><path d="M16 12v8M12 16h8" stroke={color} strokeWidth="1" fill="none"/></svg>
    ),
  };
  return <span className="course-theme-icon-svg">{icons[themeKey] || icons.cyber}</span>;
}

/* Map course to reference-style category (Adhi03f24/portfollio) */
function getCourseCat(course) {
  const type = (course.type || "").toLowerCase();
  const theme = (course.theme || "").toLowerCase();
  const name = (course.name || "").toLowerCase();
  if (type.includes("professional certificate")) return "professional";
  if (type.includes("specialization")) return "specialization";
  if (theme === "ai" || theme === "deeplearning") return "ai";
  if (["cyber", "ecouncil", "comptia", "infosec", "cisco", "coursera"].includes(theme) || name.includes("security") || name.includes("hack") || name.includes("pentest")) return "security";
  if (theme === "packt" || theme === "network" || name.includes("development") || name.includes("selenium") || name.includes("api")) return "development";
  if (theme === "university" && (name.includes("management") || name.includes("leadership") || name.includes("ciso"))) return "management";
  if (theme === "university" || theme === "microsoft" || theme === "google" || theme === "ibm") return "professional";
  return "other";
}

const certFilters = [
  { key: "all", label: "ALL" },
  { key: "professional", label: "PROFESSIONAL" },
  { key: "specialization", label: "SPECIALIZATION" },
  { key: "ai", label: "AI / GEN-AI" },
  { key: "security", label: "SECURITY" },
  { key: "development", label: "DEVELOPMENT" },
  { key: "management", label: "MANAGEMENT" },
  { key: "other", label: "OTHER" },
];

const categoryOrder = certFilters.map((f) => f.key).filter((k) => k !== "all");
const typeOrder = { "Professional Certificate": 0, Specialization: 1, Course: 2 };

function sortCourses(list) {
  return [...list].sort((a, b) => {
    const catA = getCourseCat(a);
    const catB = getCourseCat(b);
    const catIdxA = categoryOrder.indexOf(catA);
    const catIdxB = categoryOrder.indexOf(catB);
    if (catIdxA !== catIdxB) return catIdxA - catIdxB;
    const typeA = typeOrder[a.type] ?? 3;
    const typeB = typeOrder[b.type] ?? 3;
    if (typeA !== typeB) return typeA - typeB;
    return (a.provider || "").localeCompare(b.provider || "") || (a.name || "").localeCompare(b.name || "");
  });
}

const totalCount = courses.length;

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("all");

  const filtered = sortCourses(
    filter === "all"
      ? courses
      : courses.filter((c) => getCourseCat(c) === filter)
  );

  const certCount = profile.stats?.certsCount ?? totalCount;
  const specCount = profile.stats?.specializationsCount ?? 15;

  return (
    <section className="courses-section certs-achievements" id="courses" ref={ref}>
      <motion.span
        className="courses-sec-num"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.5 }}
      >
        06
      </motion.span>
      <motion.h2
        className="section-title courses-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        CERTIFICATIONS & COURSES
      </motion.h2>
      <motion.p
        className="courses-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {specCount}+ specializations and {certCount}+ certifications
      </motion.p>

      <motion.div
        className="courses-count-wrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="courses-count-num">{certCount}+</span>
        <span className="courses-count-label">ACHIEVEMENTS UNLOCKED</span>
        <span className="courses-count-spec">{specCount}+ specializations</span>
      </motion.div>

      <div className="courses-filters">
        {certFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`courses-filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div
        className="courses-grid"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
          hidden: {},
        }}
      >
        {filtered.map((course, i) => (
          <CourseCard key={`${course.provider}-${course.name}-${i}`} course={course} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

function CourseCard({ course, index }) {
  const t = getTheme(course.theme);
  const coursesLabel =
    course.type === "Specialization" || course.type === "Professional Certificate"
      ? `${(course.progress || "").replace(/[^0-9/]/g, "").split("/").filter(Boolean).pop() || "?"} courses completed`
      : null;
  const progressNum = (course.progress || "").replace(/[^0-9]/g, "");
  const isComplete = course.progress === "100%" || course.progress === "Complete" || (progressNum && progressNum.length > 0);

  return (
    <motion.div
      className="course-card achievement-style"
      data-theme={course.theme || "cyber"}
      style={{
        "--ach-bg": t.bg,
        "--ach-border": t.border,
        "--ach-accent": t.accent,
      }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="course-card-accent-bar" aria-hidden="true" />
      <span className="course-card-icon achievement-icon">
        <CourseThemeIcon themeKey={course.theme || "cyber"} accent={t.accent} />
      </span>
      <span className="course-card-type achievement-type">{course.type}</span>
      <h3 className="course-card-name achievement-name" title={course.name}>
        {course.name}
      </h3>
      <p className="course-card-provider achievement-provider">{course.provider}</p>
      {coursesLabel && (
        <span className="course-courses-label">{coursesLabel}</span>
      )}
      <span className="course-card-progress-wrap">
        <span
          className="course-card-progress achievement-progress"
          style={{ color: t.accent }}
        >
          {course.progress}
        </span>
        {isComplete && <span className="course-card-done" aria-label="Completed">✓</span>}
      </span>
    </motion.div>
  );
}
