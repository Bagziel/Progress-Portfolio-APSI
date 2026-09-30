# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

The value is entirely in writing them **while it is happening**. What took four
hours and why is invisible a month later, and it is exactly what your journal
needs.

---

## Week of 2026-09-29

**Done.** Rebuilt the frontend client into a 3-page application (Home, Projects, Progress). Implemented zero-dependency hash navigation (`#home`, `#projects`, `#progress`) in `App.jsx`. Standardized terminology from "goals" to "tasks". Replaced placeholder ghost sightings in `seed.json` with real Data Analyst projects and learning tasks. Configured `mockApi.js` with browser `localStorage` persistence so demo mode is fully interactive. Added styling and modular layout components (Header, Footer, DemoNotice).

**Stuck.** `mockApi.js` had initial bugs with `localStorage` resetting on reload, an undeclared `TASKS_KEY`, and syntax errors in destructuring. Reconciling `react-router-dom` imports with the template's zero-dependency setup required deciding on native hash navigation.

**Hours.** Roughly 8 hours.

**Next.** Build the Express server endpoints (`/api/tasks`, `/api/projects`) and configure PostgreSQL schema/seed files to replace the template's sightings backend.

---

## Week of 2026-09-22

**Done.** Cloned the repository from `HAU-6APSI/final-project-template` as `Progress-Portfolio-APSI`. Completed preliminary planning documentation, wireframes, and design system tokens. Explored the starter template's file structure and mock/real API toggle pattern.

**Stuck.** Previous scaffold assumed Tailwind, React Router, and a deeper component split that didn't match the starter template's plain-CSS, single-page architecture.

**Hours.** Roughly 5 hours.

**Next.** Rebuild `App.jsx`, `httpApi.js`, and `seed.json` with domain-specific project and progress content.
