import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { courses, courseThemes } from "../../data/courses";
import { profile } from "../../data/profile";
import { fadeIn } from "../../lib/motion";
import "./Achievements.css";

const getTheme = (themeKey) => courseThemes[themeKey] || courseThemes.cyber;

const achievementFilters = [
  { key: "all", label: "ALL" },
  { key: "professional", label: "PROFESSIONAL" },
  { key: "specialization", label: "SPECIALIZATION" },
  { key: "ai", label: "AI / GEN-AI" },
  { key: "cyber", label: "SECURITY" },
  { key: "university", label: "OTHER" },
];

const mapThemeToFilter = (theme) => {
  const t = (theme || "").toLowerCase();
  if (t === "ai" || t === "deeplearning") return "ai";
  if (["cyber", "ecouncil", "comptia", "infosec", "cisco"].includes(t)) return "cyber";
  if (t === "university" || t === "packt" || t === "coursera" || t === "learnquest") return "university";
  if (t === "google" || t === "microsoft" || t === "ibm") return "professional";
  return "specialization";
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? courses
      : courses.filter((c) => mapThemeToFilter(c.theme) === filter);

  const certCount = profile.stats?.certsCount ?? courses.length;
  const specCount = profile.stats?.specializationsCount ?? 15;

  return (
    <section className="achievements-section" id="achievements" ref={ref}>
      <motion.span
        className="achievements-sec-num"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.5 }}
      >
        06
      </motion.span>
      <motion.h2
        className="section-title achievements-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        ACHIEVEMENTS
      </motion.h2>
      <motion.p
        className="achievements-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {specCount}+ specializations and {certCount}+ certifications
      </motion.p>

      <motion.div
        className="achievements-count-wrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="achievements-count-num">{certCount}+</span>
        <span className="achievements-count-label">ACHIEVEMENTS UNLOCKED</span>
      </motion.div>

      <div className="achievements-filters">
        {achievementFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`achievements-filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div
        className="achievements-grid"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
          hidden: {},
        }}
      >
        {filtered.slice(0, 24).map((course, i) => {
          const t = getTheme(course.theme);
          return (
            <motion.div
              key={`${course.provider}-${course.name}-${i}`}
              className="achievement-card"
              style={{
                "--ach-bg": t.bg,
                "--ach-border": t.border,
                "--ach-accent": t.accent,
              }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 16 },
              }}
            >
              <span className="achievement-icon">{t.icon}</span>
              <span className="achievement-type">{course.type}</span>
              <h3 className="achievement-name" title={course.name}>{course.name}</h3>
              <p className="achievement-provider">{course.provider}</p>
              <span className="achievement-progress" style={{ color: t.accent }}>
                {course.progress}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
