import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRobot, FaChalkboardTeacher, FaShieldAlt } from "react-icons/fa";
import { profile } from "../../data/profile";
import "./Services.css";

const iconMap = { ai: FaRobot, teach: FaChalkboardTeacher, cyber: FaShieldAlt };

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="services" id="serv" ref={ref}>
      <motion.span
        className="services-sec-num"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.5 }}
      >
        05
      </motion.span>
      <motion.h2
        className="section-title services-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Services
      </motion.h2>

      <motion.div
        className="services-container"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
          hidden: {},
        }}
      >
        {profile.services.map((s, i) => {
          const Icon = iconMap[s.icon] || FaRobot;
          return (
            <motion.div
              key={s.title}
              className="service-card glass-panel"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              <Icon className="service-icon" />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
