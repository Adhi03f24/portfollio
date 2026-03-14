import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "../../data/profile";
import Skills from "./Skills";
import "./About.css";

const BASE = import.meta.env.BASE_URL;
const PLACEHOLDER_IMG = "https://placehold.co/300x400/1a1a2e/9ca3af?text=Your+Photo";

export default function About() {
  const [flip, setFlip] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [frontSrc, setFrontSrc] = useState(BASE + "img3.png");
  const [backSrc, setBackSrc] = useState(BASE + "img4.png");

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-content">
        <motion.div
          className="about-photo-wrap"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div
            className="photo-card"
            onClick={() => setFlip(!flip)}
          >
            <div className={flip ? "photo-inner flip" : "photo-inner"}>
              <div className="photo-front">
                <img
                  src={frontSrc}
                  alt="Adhithiyan Maliackal"
                  onError={() => setFrontSrc(PLACEHOLDER_IMG)}
                />
              </div>
              <div className="photo-back">
                <img
                  src={backSrc}
                  alt="Adhithiyan Maliackal"
                  onError={() => setBackSrc(PLACEHOLDER_IMG)}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-about"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p>{profile.bio}</p>
        </motion.div>
      </div>

      <motion.span className="about-sec-num" initial={{ opacity: 0 }} animate={inView ? { opacity: 0.35 } : {}} transition={{ duration: 0.5 }}>
        03
      </motion.span>
      <motion.h2
        className="section-title about-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        SKILL_TREE
      </motion.h2>
      <motion.p className="about-subtitle" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
        Power levels acquired through years of combat
      </motion.p>

      <Skills />
    </section>
  );
}
