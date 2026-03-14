import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "../../data/profile";
import { skills as skillsData, skillCategories } from "../../data/skills";
import "./Skills.css";

/* Category order from reference: https://github.com/Adhi03f24/portfollio/tree/portfolio
   Languages → Frameworks → AI/Prompt → IDE & AI Tools → Security → Tools.
   Within each category, skills follow data order (id) like the reference. */
const CATEGORY_ORDER = ["language", "framework", "ai", "ide", "security", "tool"];

export default function Skills() {
  const [filter, setFilter] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    const list = filter === "all" ? [...skillsData] : skillsData.filter((s) => s.cat === filter);
    if (filter === "all") {
      list.sort((a, b) => {
        const catA = CATEGORY_ORDER.indexOf(a.cat);
        const catB = CATEGORY_ORDER.indexOf(b.cat);
        if (catA !== catB) return catA - catB;
        return (a.id ?? 0) - (b.id ?? 0);
      });
    } else {
      list.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    }
    return list;
  }, [filter]);
  const stats = profile.stats || {};

  return (
    <div className="skills skill-tree" ref={ref}>
      <motion.div
        className="skill-tree-hud"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="skill-hud-item">
          <span className="skill-hud-label">PLAYER</span>
          <span className="skill-hud-value">{(profile.username || "ADHI03F24").toUpperCase()}</span>
        </div>
        <div className="skill-hud-item">
          <span className="skill-hud-label">RANK</span>
          <span className="skill-hud-value skill-hud-rank">{stats.rank || "S-RANK"}</span>
        </div>
        <div className="skill-hud-item">
          <span className="skill-hud-label">SKILLS</span>
          <span className="skill-hud-value">{stats.skillsCount ?? skillsData.length}+</span>
        </div>
        <div className="skill-hud-item">
          <span className="skill-hud-label">CERTS</span>
          <span className="skill-hud-value">{stats.certsCount ?? 127}+</span>
        </div>
      </motion.div>

      <div className="skill-filters-wrap">
        <span className="skill-filters-heading">CATEGORIES</span>
        <div className="skill-filters">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`skill-filter-btn ${filter === cat.key ? "active" : ""}`}
              onClick={() => setFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="skill-grid"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          hidden: {},
        }}
      >
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.id}
            className="skill-card"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
          >
            <div className="skill-card-head">
              <span className="skill-name">{skill.name}</span>
              <span className={`skill-rank rank-${(skill.rank || "A").toLowerCase().replace("+", "-plus")}`}>
                {skill.rank}
              </span>
            </div>
            <div className="skill-bar-wrap">
              <motion.div
                className="skill-bar"
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.03 }}
              />
            </div>
            <span className="skill-power">POWER {skill.level} / 100</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
