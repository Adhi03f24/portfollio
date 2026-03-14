import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Hero from "./pages/Hero/Hero";
import Story from "./pages/Story/Story";
import About from "./pages/About/About";
import Project from "./pages/Project/Project";
import Services from "./pages/Services/Services";
import Courses from "./pages/Courses/Courses";
import Dojo from "./pages/Dojo/Dojo";
import Contact from "./pages/Contact/Contact";
import Footer from "./pages/Footer/Footer";
import Admin from "./pages/Admin/Admin";

const pageVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

function MainContent() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const done = sessionStorage.getItem("adhi03f24_intro_done");
    if (done === "true") setIntroDone(true);
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("adhi03f24_intro_done", "true");
    setIntroDone(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!introDone ? (
        <Intro key="intro" onComplete={handleIntroComplete} />
      ) : (
        <motion.div
          key="main"
          initial="initial"
          animate="enter"
          variants={pageVariants}
          className="main-content"
        >
          <Header />
          <main>
            <Hero />
            <Story />
            <About />
            <Project />
            <Services />
            <Courses />
            <Dojo />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
