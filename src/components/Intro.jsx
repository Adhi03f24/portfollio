import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "../lib/motion";
import "./Intro.css";

const STAR_COUNT = 180;

const BOOT_MSGS = [
  "> Initializing shadow subsystem...",
  "> Loading combat certifications...",
  "> Mounting AI augmentation layer...",
  "> Calibrating prompt engineering core...",
  "> Establishing encrypted connection...",
  "> Deploying adhi03f24...",
  "> DOMAIN EXPANSION: READY.",
];

function Starfield() {
  const stars = useMemo(() =>
    Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    })),
    []
  );
  return (
    <div className="intro-starfield" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="intro-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState("loading");
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState([]);

  useEffect(() => {
    const duration = 3200;
    const start = performance.now();
    const msgInterval = duration / BOOT_MSGS.length;
    let lastMsgIdx = -1;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);

      const msgIdx = Math.min(
        BOOT_MSGS.length - 1,
        Math.floor(elapsed / msgInterval)
      );
      if (msgIdx !== lastMsgIdx && msgIdx >= 0) {
        lastMsgIdx = msgIdx;
        setBootLines((prev) => [...prev, BOOT_MSGS[msgIdx]]);
      }

      if (p < 100) requestAnimationFrame(tick);
      else setPhase("complete");
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (phase !== "complete") return;
    const t = setTimeout(() => setPhase("exiting"), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <AnimatePresence mode="wait">
      {phase !== "exiting" ? (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="intro-bg">
            <div className="intro-gradient" />
            <div className="intro-gradient-2" />
            <div className="intro-data-lines" aria-hidden="true" />
            <div className="intro-hud-corners intro-hud-tl" aria-hidden="true" />
            <div className="intro-hud-corners intro-hud-br" aria-hidden="true" />
            <div className="intro-hud-corners intro-hud-tr" aria-hidden="true" />
            <div className="intro-hud-corners intro-hud-bl" aria-hidden="true" />
            <div className="intro-orbit-ring intro-orbit-1" aria-hidden="true" />
            <div className="intro-orbit-ring intro-orbit-2" aria-hidden="true" />
            <div className="intro-noise" />
            <Starfield />
            <motion.div
              className="intro-glow intro-glow-1"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="intro-glow intro-glow-2"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="intro-glow intro-glow-3"
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="intro-content">
            <motion.div
              className="intro-welcome-box"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="intro-system-label" aria-hidden="true">SYSTEM INITIALIZING...</span>
              <motion.span
                className="intro-kanji"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                影
              </motion.span>
              {phase === "loading" && bootLines.length > 0 && (
                <div className="intro-boot-log" aria-hidden="true">
                  {bootLines.map((line, i) => (
                    <motion.span
                      key={i}
                      className="intro-boot-line"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </div>
              )}
              <motion.div
                className="intro-logo-wrap"
                initial="hidden"
                animate="visible"
                variants={slideInFromLeft(0.3)}
              >
                <motion.span
                  className="intro-logo intro-logo-gradient intro-logo-glitch"
                  data-text="ADHI03F24"
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "0.2em", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  ADHI03F24
                </motion.span>
                <motion.span
                  className="intro-logo-glow"
                  aria-hidden="true"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.span
                className="intro-tagline"
                initial="hidden"
                animate="visible"
                variants={slideInFromRight(0.6)}
              >
                AI-Augmented Developer · Educator · Ex-Ethical Hacker
              </motion.span>

              {phase === "loading" && (
                <motion.div
                  className="intro-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="intro-loader-pct" aria-hidden="true">
                    {Math.floor(progress)}%
                  </span>
                  <div className="intro-loading-bar-wrap">
                    <div className="intro-loading-bar-shine" aria-hidden="true" />
                    <motion.div
                      className="intro-loading-bar"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <motion.span
                    className="intro-loading-text"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    Loading experience...
                  </motion.span>
                </motion.div>
              )}

              {phase === "complete" && (
                <motion.span
                  className="intro-ready-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Ready
                </motion.span>
              )}
            </motion.div>
          </div>

          <div className="intro-scanline" />
          <div className="intro-vignette" />
        </motion.div>
      ) : (
        <motion.div
          className="intro-wipe"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  );
}
