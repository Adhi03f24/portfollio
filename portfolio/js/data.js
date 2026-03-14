/* ═══════════════════════════════════════════════════════
   ADHI03F24 — DATA LAYER
   All portfolio content — persisted in localStorage
   ═══════════════════════════════════════════════════════ */

const DATA_KEY = "adhi03f24_v2";

const DEFAULT_DATA = {
  profile: {
    name: "Adhithiyan Maliackal",
    username: "adhi03f24",
    dob: "2003-02-24",
    title: "AI-Augmented Senior Software Developer",
    subtitle: "Ethical Hacker → Vibe Coder → AI Mentor",
    tagline: "I don't just write code — I breathe it.",
    bio: "Born on 24 Feb 2003. Started as an Ethical Hacker in 2021, mastering penetration testing and cyber warfare. Evolved into an AI-Augmented Senior Software Developer and Vibe Coder — channeling hacker instincts into building intelligent systems. Now training the next generation in Prompt Engineering, AI-Augmented Development, and Cybersecurity.",
    email: "adhithiyanmaliackal@gmail.com",
    phone: "+91 7559964383",
    location: "India",
    social: {
      github: "https://github.com/adhi03f24",
      linkedin: "https://linkedin.com/in/adhi03f24",
      twitter: "https://twitter.com/adhi03f24",
      instagram: "https://instagram.com/adhi03f24",
      youtube: "https://youtube.com/@adhi03f24"
    }
  },

  stats: {
    level: 42,
    xp: "142,800",
    rank: "S-RANK",
    class: "SHADOW DEVELOPER",
    title: "The One Who Codes in Shadows",
    certsCount: 53,
    projectsShipped: 30,
    studentsTrainedCount: "100+",
    yearsActive: 4
  },

  timeline: [
    { id: 1, year: "2021", phase: "ARC 1", title: "THE HACKER AWAKENS", desc: "The journey began in the shadows. Dove deep into ethical hacking — penetration testing, network exploitation, vulnerability assessment. Earned certifications from Google, Microsoft, IBM, Cisco, EC-Council. The digital underworld became a training ground.", icon: "fa-skull-crossbones", color: "#00ff41" },
    { id: 2, year: "2022", phase: "ARC 2", title: "THE TRANSFORMATION", desc: "A turning point. Realized the power of building over breaking. Transitioned from hacking systems to engineering them. Mastered full-stack development — React, Node.js, Python, TypeScript. The hacker's eye for vulnerabilities became a developer's instinct for robust architecture.", icon: "fa-bolt", color: "#a855f7" },
    { id: 3, year: "2023", phase: "ARC 3", title: "AI AUGMENTATION", desc: "Evolved into an AI-Augmented Developer. Embraced prompt engineering, LLMs, TensorFlow, LangChain. Became a Vibe Coder — letting AI amplify every keystroke. The fusion of security knowledge and AI created something unprecedented.", icon: "fa-brain", color: "#ff1744" },
    { id: 4, year: "2024-NOW", phase: "ARC 4", title: "THE SENSEI", desc: "The dojo is open. Now training students in Prompt Engineering, AI-Augmented Software Development, and Cybersecurity. Passing on the combined knowledge of 50+ certifications, real-world hacking experience, and cutting-edge AI development. The legacy begins.", icon: "fa-torii-gate", color: "#ffd700" }
  ],

  skills: [
    { id: 1, name: "Python", level: 95, cat: "language", rank: "S" },
    { id: 2, name: "JavaScript", level: 92, cat: "language", rank: "S" },
    { id: 3, name: "TypeScript", level: 88, cat: "language", rank: "A" },
    { id: 4, name: "HTML / CSS", level: 90, cat: "language", rank: "S" },
    { id: 5, name: "Rust", level: 65, cat: "language", rank: "B" },
    { id: 6, name: "C / C++", level: 70, cat: "language", rank: "B" },
    { id: 7, name: "SQL", level: 80, cat: "language", rank: "A" },
    { id: 8, name: "Bash / Shell", level: 92, cat: "language", rank: "S" },
    { id: 9, name: "React / Next.js", level: 90, cat: "framework", rank: "S" },
    { id: 10, name: "Node.js / Express", level: 88, cat: "framework", rank: "A" },
    { id: 11, name: "Django / Flask", level: 85, cat: "framework", rank: "A" },
    { id: 12, name: "FastAPI", level: 82, cat: "framework", rank: "A" },
    { id: 13, name: "MEAN Stack", level: 85, cat: "framework", rank: "A" },
    { id: 14, name: "Selenium", level: 80, cat: "framework", rank: "A" },
    { id: 15, name: "Prompt Engineering", level: 97, cat: "ai", rank: "S+" },
    { id: 16, name: "LangChain / LLMs", level: 94, cat: "ai", rank: "S" },
    { id: 17, name: "OpenAI / GPT", level: 95, cat: "ai", rank: "S" },
    { id: 18, name: "GitHub Copilot", level: 93, cat: "ai", rank: "S" },
    { id: 19, name: "TensorFlow", level: 80, cat: "ai", rank: "A" },
    { id: 20, name: "AI-Augmented Dev", level: 96, cat: "ai", rank: "S+" },
    { id: 21, name: "Penetration Testing", level: 95, cat: "security", rank: "S" },
    { id: 22, name: "Network Security", level: 92, cat: "security", rank: "S" },
    { id: 23, name: "Kali Linux", level: 93, cat: "security", rank: "S" },
    { id: 24, name: "Metasploit", level: 90, cat: "security", rank: "S" },
    { id: 25, name: "Burp Suite", level: 88, cat: "security", rank: "A" },
    { id: 26, name: "OWASP ZAP", level: 85, cat: "security", rank: "A" },
    { id: 27, name: "Nmap", level: 90, cat: "security", rank: "S" },
    { id: 28, name: "Wireshark", level: 88, cat: "security", rank: "A" },
    { id: 29, name: "OSINT", level: 85, cat: "security", rank: "A" },
    { id: 30, name: "Red Teaming", level: 88, cat: "security", rank: "A" },
    { id: 31, name: "Reverse Engineering", level: 78, cat: "security", rank: "A" },
    { id: 32, name: "Privilege Escalation", level: 85, cat: "security", rank: "A" },
    { id: 33, name: "SOC Operations", level: 82, cat: "security", rank: "A" },
    { id: 34, name: "Docker / K8s", level: 82, cat: "tool", rank: "A" },
    { id: 35, name: "Git / CI-CD", level: 90, cat: "tool", rank: "S" },
    { id: 36, name: "Linux Admin", level: 93, cat: "tool", rank: "S" },
    { id: 37, name: "AWS / Azure / GCP", level: 82, cat: "tool", rank: "A" },
    { id: 38, name: "VS Code", level: 95, cat: "tool", rank: "S" },
    { id: 39, name: "Postman / API Testing", level: 85, cat: "tool", rank: "A" }
  ],

  certifications: [
    { id: 1, title: "Google Cybersecurity Professional Certificate", provider: "Google", courses: 8, cat: "professional", icon: "fa-shield-halved" },
    { id: 2, title: "Microsoft Cybersecurity Analyst Professional Certificate", provider: "Microsoft", courses: 9, cat: "professional", icon: "fa-shield-halved" },
    { id: 3, title: "Certified Ethical Hacker (CEH) v.12", provider: "Packt / EC-Council", courses: 3, cat: "professional", icon: "fa-user-secret" },
    { id: 4, title: "CompTIA PenTest+ (PT0-002)", provider: "Packt", courses: 3, cat: "professional", icon: "fa-crosshairs" },
    { id: 5, title: "Cisco CCNP Security SCOR (350-701)", provider: "Packt / Cisco", courses: 3, cat: "professional", icon: "fa-network-wired" },
    { id: 6, title: "Cisco CCNP Enterprise ENCOR (350-401)", provider: "Packt / Cisco", courses: 3, cat: "professional", icon: "fa-network-wired" },
    { id: 7, title: "CompTIA A+ Certification Core 1 (220-1101)", provider: "Packt", courses: 3, cat: "professional", icon: "fa-desktop" },
    { id: 8, title: "Cybersecurity Operations Fundamentals", provider: "Cisco", courses: 7, cat: "professional", icon: "fa-eye" },
    { id: 9, title: "Microsoft Azure Security Tools Specialization", provider: "Microsoft", courses: 5, cat: "professional", icon: "fa-cloud" },
    { id: 10, title: "Certified Cloud Security Professional (CCSP)", provider: "Infosec", courses: 1, cat: "professional", icon: "fa-cloud-bolt" },
    { id: 11, title: "Advanced Network Security Specialization", provider: "LearnQuest", courses: 3, cat: "specialization", icon: "fa-shield-virus" },
    { id: 12, title: "Managing Cybersecurity Specialization", provider: "Kennesaw State University", courses: 5, cat: "specialization", icon: "fa-briefcase" },
    { id: 13, title: "Information Assurance Analysis", provider: "Johns Hopkins University", courses: 3, cat: "specialization", icon: "fa-magnifying-glass" },
    { id: 14, title: "Introduction to Cyber Security Specialization", provider: "New York University", courses: 4, cat: "specialization", icon: "fa-lock" },
    { id: 15, title: "Cybersecurity Fundamentals Specialization", provider: "IBM", courses: 4, cat: "specialization", icon: "fa-shield-halved" },
    { id: 16, title: "The Complete Ethical Hacking Bootcamp", provider: "Packt", courses: 3, cat: "specialization", icon: "fa-hat-cowboy" },
    { id: 17, title: "Selenium Python Automation Testing & Frameworks", provider: "Packt", courses: 3, cat: "specialization", icon: "fa-robot" },
    { id: 18, title: "Advanced Python Scripting for Cybersecurity", provider: "Infosec", courses: 3, cat: "specialization", icon: "fa-code" },
    { id: 19, title: "Generative AI: Prompt Engineering Basics", provider: "IBM", courses: 1, cat: "ai", icon: "fa-wand-magic-sparkles" },
    { id: 20, title: "Generative AI: Introduction and Applications", provider: "IBM", courses: 1, cat: "ai", icon: "fa-brain" },
    { id: 21, title: "Generative AI: Boost Your Cybersecurity Career", provider: "IBM", courses: 1, cat: "ai", icon: "fa-microchip" },
    { id: 22, title: "Applied ChatGPT for Cybersecurity", provider: "Infosec", courses: 1, cat: "ai", icon: "fa-comments" },
    { id: 23, title: "Red Teaming LLM Applications", provider: "DeepLearning.AI", courses: 1, cat: "ai", icon: "fa-chess-knight" },
    { id: 24, title: "Optimizing Workflow with GitHub Copilot & VS Code", provider: "Microsoft", courses: 1, cat: "ai", icon: "fa-code-branch" },
    { id: 25, title: "Secure Full Stack MEAN Developer", provider: "EC-Council", courses: 1, cat: "development", icon: "fa-layer-group" },
    { id: 26, title: "Security Operations Center (SOC)", provider: "EC-Council", courses: 1, cat: "security", icon: "fa-satellite-dish" },
    { id: 27, title: "Penetration Testing, Threat Hunting & Cryptography", provider: "IBM", courses: 1, cat: "security", icon: "fa-key" },
    { id: 28, title: "The Complete Pentesting & Privilege Escalation Course", provider: "Packt", courses: 1, cat: "security", icon: "fa-arrow-up" },
    { id: 29, title: "Web Hacker's Toolbox", provider: "Packt", courses: 1, cat: "security", icon: "fa-toolbox" },
    { id: 30, title: "Intermediate Ethical Hacking Hands-on Training", provider: "Packt", courses: 1, cat: "security", icon: "fa-terminal" },
    { id: 31, title: "Nmap for Penetration Testing: Beginner to Advanced", provider: "Packt", courses: 1, cat: "security", icon: "fa-radar" },
    { id: 32, title: "Introduction to AWS Pentesting", provider: "Packt", courses: 1, cat: "security", icon: "fa-aws" },
    { id: 33, title: "Offensive Hacking Unfolded", provider: "Packt", courses: 1, cat: "security", icon: "fa-skull" },
    { id: 34, title: "Pentesting Fundamentals for Beginners", provider: "Packt", courses: 1, cat: "security", icon: "fa-graduation-cap" },
    { id: 35, title: "Security & Risk Management", provider: "Packt", courses: 1, cat: "security", icon: "fa-chart-line" },
    { id: 36, title: "Web Application Security Testing with OWASP ZAP", provider: "Coursera", courses: 1, cat: "security", icon: "fa-bug" },
    { id: 37, title: "Introduction to Computer Security", provider: "University of London", courses: 1, cat: "security", icon: "fa-university" },
    { id: 38, title: "Metasploit for Beginners: Ethical Penetration Testing", provider: "Coursera", courses: 1, cat: "security", icon: "fa-crosshairs" },
    { id: 39, title: "Cybersecurity for Managers", provider: "Campus BBVA", courses: 1, cat: "management", icon: "fa-user-tie" },
    { id: 40, title: "Cybersecurity in Healthcare", provider: "Erasmus University Rotterdam", courses: 1, cat: "security", icon: "fa-hospital" },
    { id: 41, title: "Cybersecurity for Everyone", provider: "University of Maryland", courses: 1, cat: "security", icon: "fa-users" },
    { id: 42, title: "International Cyber Conflicts", provider: "SUNY", courses: 1, cat: "security", icon: "fa-globe" },
    { id: 43, title: "Security & Ethical Hacking: Attacking the Network", provider: "University of Colorado Boulder", courses: 1, cat: "security", icon: "fa-wifi" },
    { id: 44, title: "Computer Hardware and Software", provider: "UC Irvine", courses: 1, cat: "other", icon: "fa-computer" },
    { id: 45, title: "Introduction to Cybersecurity Fundamentals", provider: "Coursera", courses: 1, cat: "security", icon: "fa-shield-halved" },
    { id: 46, title: "Introduction to Cybersecurity Tools & Cyberattacks", provider: "IBM", courses: 1, cat: "security", icon: "fa-screwdriver-wrench" },
    { id: 47, title: "Postman Tutorial: API Testing", provider: "Packt", courses: 1, cat: "development", icon: "fa-vial" },
    { id: 48, title: "Developing a Leadership Framework", provider: "Kennesaw State University", courses: 1, cat: "management", icon: "fa-crown" },
    { id: 49, title: "Introduction to Psychology", provider: "Yale University", courses: 1, cat: "other", icon: "fa-brain" },
    { id: 50, title: "Astrobiology & Search for Extraterrestrial Life", provider: "University of Edinburgh", courses: 1, cat: "other", icon: "fa-rocket" },
    { id: 51, title: "Ethical Hacking Fundamentals", provider: "LearnKartS", courses: 1, cat: "security", icon: "fa-terminal" },
    { id: 52, title: "Advanced Ethical Hacking & Cybersecurity", provider: "LearnKartS", courses: 1, cat: "security", icon: "fa-shield-virus" },
    { id: 53, title: "System & Network Security Essentials", provider: "LearnKartS", courses: 1, cat: "security", icon: "fa-network-wired" }
  ],

  projects: [
    { id: 1, title: "Neural Sentinel", desc: "AI-powered intrusion detection system using deep learning for zero-day attack identification in real-time network traffic.", tech: ["Python", "TensorFlow", "FastAPI", "Docker"], icon: "fa-brain", link: "", github: "" },
    { id: 2, title: "VibeCoder Engine", desc: "AI-augmented development environment that generates, reviews, and optimizes code using fine-tuned LLMs and prompt engineering.", tech: ["React", "Node.js", "OpenAI", "LangChain"], icon: "fa-wand-magic-sparkles", link: "", github: "" },
    { id: 3, title: "PhantomScan", desc: "Automated vulnerability scanner and pentesting framework with intelligent exploit suggestion engine built on security expertise.", tech: ["Python", "Nmap", "Metasploit", "Docker"], icon: "fa-ghost", link: "", github: "" },
    { id: 4, title: "SenseiDojo Platform", desc: "Interactive learning platform for AI development, prompt engineering, and cybersecurity training with real-time coding challenges.", tech: ["Next.js", "Python", "WebSocket", "PostgreSQL"], icon: "fa-torii-gate", link: "", github: "" },
    { id: 5, title: "CryptoVault", desc: "End-to-end encrypted communication system with zero-knowledge architecture, built with the paranoia of a penetration tester.", tech: ["TypeScript", "Rust", "WebCrypto", "React"], icon: "fa-vault", link: "", github: "" },
    { id: 6, title: "AIShield", desc: "Red teaming toolkit for LLM applications — testing AI systems for prompt injection, jailbreaks, and adversarial attacks.", tech: ["Python", "LangChain", "OpenAI", "FastAPI"], icon: "fa-shield-halved", link: "", github: "" }
  ],

  testimonials: [
    { id: 1, name: "Sample Student", initials: "SS", course: "AI-Augmented Development Bootcamp", rating: 5, text: "Adhi's teaching style is incredible. He breaks down complex AI and prompt engineering concepts into digestible pieces. The hands-on projects were absolute game-changers for my career.", linkedin: "https://linkedin.com/in/" },
    { id: 2, name: "Another Student", initials: "AS", course: "Cybersecurity Fundamentals", rating: 5, text: "Learning from someone who was an actual ethical hacker gives you a completely different perspective on writing secure code. Best investment I've ever made in my education.", linkedin: "https://linkedin.com/in/" },
    { id: 3, name: "Third Student", initials: "TS", course: "Prompt Engineering Masterclass", rating: 5, text: "The depth of knowledge is unreal. From basic prompts to building production AI systems with LangChain — this course changed my entire career trajectory. Adhi is the real deal.", linkedin: "https://linkedin.com/in/" }
  ],

  settings: {
    adminPass: "adhi2024",
    theme: "jujutsu"
  }
};

function getData() {
  const raw = localStorage.getItem(DATA_KEY);
  if (!raw) {
    localStorage.setItem(DATA_KEY, JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  try {
    const parsed = JSON.parse(raw);
    const merged = JSON.parse(JSON.stringify(DEFAULT_DATA));
    if (parsed.profile) Object.assign(merged.profile, parsed.profile);
    if (parsed.stats) Object.assign(merged.stats, parsed.stats);
    if (Array.isArray(parsed.timeline)) merged.timeline = parsed.timeline;
    if (Array.isArray(parsed.skills)) merged.skills = parsed.skills;
    if (Array.isArray(parsed.certifications)) merged.certifications = parsed.certifications;
    if (Array.isArray(parsed.projects)) merged.projects = parsed.projects;
    if (Array.isArray(parsed.testimonials)) merged.testimonials = parsed.testimonials;
    if (parsed.settings) Object.assign(merged.settings, parsed.settings);
    return merged;
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function resetData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(DEFAULT_DATA));
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}
