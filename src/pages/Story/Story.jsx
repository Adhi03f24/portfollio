import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "../../data/profile";
import "./Story.css";

const timeline = profile.timeline || profile.story.map((s, i) => ({ id: i + 1, year: s.year, phase: "", title: s.title, desc: s.desc, color: "#00f5ff" }));

export default function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="story-section origin-story" id="story" ref={ref}>
      <div className="story-bg" aria-hidden="true" />
      <div className="story-inner">
        <motion.span
          className="story-sec-num"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.35 } : {}}
          transition={{ duration: 0.5 }}
        >
          02
        </motion.span>
        <motion.h2
          className="section-title story-title-ref"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ORIGIN_STORY
        </motion.h2>
        <motion.p
          className="story-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="story-subtitle-bracket">[</span>
          The evolution of a digital warrior
          <span className="story-subtitle-bracket">]</span>
        </motion.p>
        <div className="story-timeline-wrap">
          <div className="story-timeline-line" />
          <div className="story-timeline">
          {timeline.map((step, i) => (
            <motion.div
              key={step.id || step.title}
              className="story-step"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="story-step-marker" style={{ "--arc-color": step.color || "#00f5ff" }}>
                <span className="story-step-marker-ring" />
                <span className="story-step-phase">{step.phase}</span>
                <span className="story-step-year">{step.year}</span>
              </div>
              <div className="story-step-content glass-panel" style={{ "--arc-color": step.color || "#00f5ff" }}>
                <span className="story-step-badge">{step.phase}</span>
                <div className="story-step-corner story-step-corner-tl" />
                <div className="story-step-corner story-step-corner-br" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
