import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { profile } from "../../data/profile";
import "./Footer.css";

const socials = [
  { icon: FaGithub, href: profile.socials.github },
  { icon: FaLinkedin, href: profile.socials.linkedin },
  { icon: FaInstagram, href: profile.socials.instagram },
].filter((s) => s.href);

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-container">
        <p className="footer-tagline">[ADHI03F24] — AI-Augmented Developer. Former Ethical Hacker. Mentor. Born to code. Trained to hack. Built to teach.</p>
        <nav className="footer-nav">
          <a href="#story">Origin</a>
          <a href="#about">Arsenal</a>
          <a href="#courses">Certifications</a>
          <a href="#dojo">Dojo</a>
        </nav>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ADHI03F24. All systems operational.</p>
          <div className="footer-right">
            <div className="social-icons">
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label="Social">
                  <s.icon />
                </a>
              ))}
            </div>
            <Link to="/admin" className="footer-admin">ADMIN</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
