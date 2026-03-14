import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { profile } from "../../data/profile";
import "./Contact.css";

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const name = form.name?.value?.trim() || "";
    const email = form.email?.value?.trim() || "";
    const message = form.message?.value?.trim() || "";

    if (!FORM_ENDPOINT) {
      setError(
        "Form backend not set up. Add VITE_CONTACT_FORM_ENDPOINT in .env (see README). You can email me using the address on the left."
      );
      return;
    }

    setSending(true);
    try {
      const isOwnApi = FORM_ENDPOINT.includes("/api/send-contact");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: isOwnApi ? { "Content-Type": "application/json" } : undefined,
        body: isOwnApi
          ? JSON.stringify({ name, email, message })
          : (() => {
              const fd = new FormData();
              fd.append("name", name);
              fd.append("email", email);
              fd.append("message", message);
              return fd;
            })(),
      });
      const data = res.ok ? null : await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Send failed");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err.message || "Transmission failed. Try email below or try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact transmit-section contact-show-get-in-touch-only" id="contact" ref={ref}>
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
          {!FORM_ENDPOINT && (
            <p className="transmit-setup-hint">
              To receive submissions at your email, add <code>VITE_CONTACT_FORM_ENDPOINT</code> in <code>.env</code> (Formspree — see README).
            </p>
          )}
          <div className="transmit-prompt transmit-prompt-form">
            <span className="transmit-prefix">visitor@portfolio</span>
            <span className="transmit-tilde">:~$</span>
          </div>
          <label className="transmit-label">
            <span className="transmit-input-prefix">enter_name</span>
            <input name="name" type="text" placeholder="Your Name" required className="transmit-input" />
          </label>
          <label className="transmit-label">
            <span className="transmit-input-prefix">enter_email</span>
            <input name="email" type="email" placeholder="Your Email" required className="transmit-input" />
          </label>
          <label className="transmit-label">
            <span className="transmit-input-prefix">enter_message</span>
            <textarea name="message" placeholder="Your Message" rows={5} required className="transmit-input transmit-textarea" />
          </label>
          <motion.button
            type="submit"
            className="contact-submit transmit-submit"
            disabled={sending}
            whileHover={!sending ? { scale: 1.02 } : undefined}
            whileTap={!sending ? { scale: 0.98 } : undefined}
          >
            {sending ? "SENDING…" : "SEND TRANSMISSION"}
          </motion.button>
          {error && <p className="transmit-error">{error}</p>}
          {submitted && !error && (
            <p className="transmit-success">✓ Transmission received. Channel open.</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
