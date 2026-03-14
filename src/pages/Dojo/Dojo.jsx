import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonials } from "../../data/testimonials";
import "./Dojo.css";

export default function Dojo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="dojo-section" id="dojo" ref={ref}>
      <motion.span
        className="dojo-sec-num"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.5 }}
      >
        07
      </motion.span>
      <motion.h2
        className="section-title dojo-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        TRAINING_DOJO
      </motion.h2>
      <motion.p
        className="dojo-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Voices from the students I've trained
      </motion.p>

      <motion.div
        className="dojo-categories"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <span className="dojo-cat">Prompt Engineering</span>
        <span className="dojo-cat">AI-Augmented Development</span>
        <span className="dojo-cat">Cybersecurity</span>
      </motion.div>

      <motion.div
        className="dojo-grid"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          hidden: {},
        }}
      >
        {testimonials.map((t, i) => (
          <motion.article
            key={t.id}
            className="dojo-card glass-panel"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 24 },
            }}
          >
            <div className="dojo-card-header">
              <span className="dojo-initials">{t.initials}</span>
              <div>
                <span className="dojo-name">{t.name}</span>
                <span className="dojo-course">{t.course}</span>
              </div>
            </div>
            <div className="dojo-stars" aria-hidden>
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
            <p className="dojo-text">"{t.text}"</p>
            {t.linkedin && (
              <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="dojo-link">
                View LinkedIn
              </a>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
