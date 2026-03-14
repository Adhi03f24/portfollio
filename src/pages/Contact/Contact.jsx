import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { profile } from "../../data/profile";
import "./Contact.css";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact transmit-section" id="contact" ref={ref}>
      <motion.span
        className="transmit-sec-num"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.5 }}
      >
        08
      </motion.span>
      <motion.h2
        className="section-title transmit-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        TRANSMIT
      </motion.h2>
      <motion.p
        className="transmit-subtitle"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Open a channel
      </motion.p>

      <motion.div
        className="contact-container transmit-container"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="contact-info glass-panel transmit-info">
          <div className="transmit-prompt">
            <span className="transmit-prefix">transmission@{profile.username || "adhi03f24"}</span>
            <span className="transmit-tilde"> ~</span>
          </div>
          <h3>Get In Touch</h3>
          <p>
            Want to collaborate, train your team, or build something with AI augmentation?
            Reach out.
          </p>
          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="info-item">
            <FaPhone className="contact-icon" />
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </div>
          <p className="contact-handle">{profile.socials.all} on all platforms</p>
        </div>

        <form className="contact-form glass-panel transmit-form" onSubmit={handleSubmit}>
          <div className="transmit-prompt transmit-prompt-form">
            <span className="transmit-prefix">visitor@portfolio</span>
            <span className="transmit-tilde">:~$</span>
          </div>
          <label className="transmit-label">
            <span className="transmit-input-prefix">enter_name</span>
            <input type="text" placeholder="Your Name" required className="transmit-input" />
          </label>
          <label className="transmit-label">
            <span className="transmit-input-prefix">enter_email</span>
            <input type="email" placeholder="Your Email" required className="transmit-input" />
          </label>
          <label className="transmit-label">
            <span className="transmit-input-prefix">enter_message</span>
            <textarea placeholder="Your Message" rows={5} required className="transmit-input transmit-textarea" />
          </label>
          <motion.button
            type="submit"
            className="contact-submit transmit-submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SEND TRANSMISSION
          </motion.button>
          {submitted && (
            <p className="transmit-success">✓ Transmission received. Channel open.</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
