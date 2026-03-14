import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import img1 from "../../assets/images/Cleveroad.jpg";
import img2 from "../../assets/images/Capture d'écran 2025-10-22 182207.png";
import img3 from "../../assets/images/Weather Forecast Dashboard.jpg";
import img4 from "../../assets/images/WordPress dashboard design concept.jpg";
import img5 from "../../assets/images/Game Dashboard Design.jpg";
import img6 from "../../assets/images/Task manager app.jpg";
import "./Project.css";

const projects = [
  { title: "E-Commerce Website", img: img1, desc: "Modern online store with product filtering, cart, and payment system.", skills: ["HTML", "CSS", "JavaScript"] },
  { title: "Portfolio Website", img: img2, desc: "Personal portfolio to showcase design and coding projects.", skills: ["HTML", "CSS", "Bootstrap"] },
  { title: "Weather App", img: img3, desc: "Responsive app showing real-time weather data using API integration.", skills: ["HTML", "CSS", "API"] },
  { title: "Blog Website", img: img4, desc: "Clean and simple blogging platform with markdown support.", skills: ["HTML", "Tailwind", "JavaScript"] },
  { title: "Game Landing Page", img: img5, desc: "Landing page for a game with animations and parallax effects.", skills: ["HTML", "CSS", "GSAP"] },
  { title: "Task Manager", img: img6, desc: "Task tracking web app with CRUD features and clean UI.", skills: ["HTML", "CSS", "JS"] },
];

export default function Project() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="project" id="project" ref={ref}>
      <motion.span
        className="project-sec-num"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.35 } : {}}
        transition={{ duration: 0.5 }}
      >
        04
      </motion.span>
      <motion.h2
        className="section-title project-title-ref"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <motion.div
        className="projects-container"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          hidden: {},
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="project-card glass-panel"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
          >
            <img src={project.img} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="skills">
              {project.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
            <div className="btns">
              <a href="#" className="btn">GitHub</a>
              <a href="#" className="btn">Live Demo</a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
