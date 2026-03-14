# ADHI03F24 — Extreme Anime Portfolio

Portfolio for **Adhithiyan Maliackal** (@adhi03f24): AI-Augmented Senior Software Developer, Former Ethical Hacker, Mentor.

## Run locally

```bash
# From project root (e.g. c:\Users\adhit\Downloads\portfolio)
npx serve .
# Or: python -m http.server 8080
```

Then open **http://localhost:3000** (or 8080).

## Admin panel

- Open **admin.html** or click **ADMIN** in the footer.
- **Default password:** `adhi2024` (change under Settings).

## Structure

- `index.html` — Main portfolio (hero, origin, skills, torch reveal, projects, certs, dojo, contact).
- `admin.html` — Admin panel (profile, skills, projects, certifications, testimonials, timeline, settings).
- `css/style.css` — Full theme (crimson/purple/cyan/gold, glitch, sections, responsive).
- `js/data.js` — Data layer (localStorage key: `adhi03f24_v2`); `getData()`, `saveData()`, `resetData()`.
- `js/engine.js` — Three.js background, particles, cursor trail, matrix preloader, click burst.
- `js/app.js` — GSAP/ScrollTrigger, torch effect, content population, animations.
- `js/admin.js` — Auth and CRUD for all sections.

## Features

- **Torch section:** Move cursor over the dual-identity block to reveal the “hacker” layer.
- **50+ certifications** in data; filterable on the Achievements section.
- **Skills** with S+/S/A/B ranks and animated bars.
- **Admin:** Edit profile, skills, projects, certifications, testimonials, timeline; export/import JSON; change password.
