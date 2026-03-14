import "./Header.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { profile } from "../data/profile";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socials = [
    { icon: faGithub, href: profile.socials.github },
    { icon: faLinkedin, href: profile.socials.linkedin },
    { icon: faXTwitter, href: profile.socials.twitter },
    { icon: faInstagram, href: profile.socials.instagram },
  ].filter((s) => s.href);

  return (
    <motion.header
      className={scrolled ? "header scroll" : "header"}
      initial={{ y: -80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="logo">
        <a href="#hero">
          <span className="logo-main">ADHI03F24</span>
        </a>
      </div>

      <ul className="links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#story">Origin</a></li>
        <li><a href="#about">Arsenal</a></li>
        <li><a href="#project">Projects</a></li>
        <li><a href="#serv">Services</a></li>
        <li><a href="#courses">Certifications</a></li>
        <li><a href="#dojo">Dojo</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <ul className="icons">
        {socials.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label="Social link">
              <FontAwesomeIcon icon={s.icon} />
            </a>
          </li>
        ))}
      </ul>
    </motion.header>
  );
}

export default Header;
