import { useRef, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import "./Hero.css";

const BASE = import.meta.env.BASE_URL;
const TORCH_FADEOUT_MS = 180;

function Particles({ count = 60 }) {
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const isCyan = Math.random() > 0.3;
      arr.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1.5 + Math.random() * 3.5,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 8,
        opacity: 0.12 + Math.random() * 0.4,
        color: isCyan ? "var(--accent-cyan)" : "var(--accent-magenta)",
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="hero-particles" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="hero-particle"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            "--p-opacity": d.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const torchRef = useRef(null);
  const [torchVisible, setTorchVisible] = useState(false);

  const handleCharacterMove = useCallback((e) => {
    if (!torchRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    torchRef.current.style.setProperty("--torch-x", `${x}px`);
    torchRef.current.style.setProperty("--torch-y", `${y}px`);
    setTorchVisible(true);
  }, []);

  const handleCharacterLeave = useCallback(() => {
    if (torchRef.current) {
      torchRef.current.style.setProperty("--torch-x", "-9999px");
      torchRef.current.style.setProperty("--torch-y", "-9999px");
    }
    setTorchVisible(false);
  }, []);

  return (
    <motion.div
      className="hero"
      id="hero"
      ref={heroRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-bg">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-bg-hex" aria-hidden="true" />
        <div className="hero-bg-streams" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="hero-stream-line" style={{ "--si": i }} />
          ))}
        </div>
        <div className="hero-bg-circuits" aria-hidden="true">
          <span className="hero-circuit hero-circuit-1" />
          <span className="hero-circuit hero-circuit-2" />
          <span className="hero-circuit hero-circuit-3" />
        </div>
        <div className="hero-bg-beacons" aria-hidden="true">
          <span className="hero-beacon hero-beacon-1" />
          <span className="hero-beacon hero-beacon-2" />
          <span className="hero-beacon hero-beacon-3" />
          <span className="hero-beacon hero-beacon-4" />
          <span className="hero-beacon hero-beacon-5" />
        </div>
        <div className="hero-bg-radial" aria-hidden="true" />
      </div>
      <div className="hero-scanline" aria-hidden="true" />
      <div className="hero-cyber-corners hero-cyber-corners-tl" aria-hidden="true" />
      <div className="hero-cyber-corners hero-cyber-corners-br" aria-hidden="true" />
      <div className="hero-cyber-corners hero-cyber-corners-tr" aria-hidden="true" />
      <div className="hero-cyber-corners hero-cyber-corners-bl" aria-hidden="true" />
      <div className="hero-hud-lines" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-orb hero-orb-4" />
      <Particles count={85} />
      <div className="hero-energy-ring" />
      <div className="hero-hologram-ring" aria-hidden="true" />
      <div className="hero-glow-ring" />

      <div
        className="hero-torch"
        ref={torchRef}
        style={{
          opacity: torchVisible ? 1 : 0,
          transition: torchVisible
            ? "opacity 0.08s ease"
            : `opacity ${TORCH_FADEOUT_MS}ms ease`,
        }}
      >
        <img
          className="hero-torch-img"
          src={BASE + "img2.png"}
          alt=""
          draggable={false}
        />
      </div>

      <img
        className="hero-character"
        src={BASE + "img1.png"}
        alt=""
        draggable={false}
        onMouseMove={handleCharacterMove}
        onMouseLeave={handleCharacterLeave}
      />

      <div className="hero-overlay" />
      <div className="hero-vignette" />

      <div className="hero-content">
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {(profile.tagline || "").split("·").map((part, i, arr) => (
            <span key={i} className="hero-tagline-segment">
              {part.trim()}
              {i < arr.length - 1 && <span className="hero-tagline-sep" aria-hidden="true" />}
            </span>
          ))}
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#contact" className="hero-btn hero-btn-primary">
            <span className="hero-btn-text">CONTACT</span>
            <span className="hero-btn-scan" aria-hidden="true" />
          </a>
          <a href="#about" className="hero-btn hero-btn-secondary">
            <span className="hero-btn-text">ABOUT ME</span>
            <span className="hero-btn-scan" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </motion.div>
  );
}
