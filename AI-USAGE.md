# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-09-26 - Restructuring Data Model and Mock API from Goals to Tasks

- **Tool:** Gemini (3.8 Flash)
- **What I asked for:**
  How to adapt the baseline starter template from tracking basic goals to managing categorized learning tasks and milestones, including mock API handlers for offline/preview mode.
- **What it gave back:**
  A modified `mockApi.js` along with updated `seed.json` structure, converting the data schema to support task items (`title`, `description`, `category`, `completed`) and CRUD simulation via `localStorage`.
- **What I kept, what I changed, and why:**
  Kept the `localStorage` CRUD abstraction logic and simulated network delay (`delay(250)`) because it replicates real server latency. Fixed broken object mutation and array referencing bugs in `mockApi.js` and corrected mismatched key references between `seed.json` and storage keys.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/f14bd59a25880cf6a39d31cf0aa7377b72297ecc

---

### 2026-09-26 - Modular 3-Page Layout and Component Architecture

- **Tool:** Gemini (3.8 Flash)
- **What I asked for:**
  A modular React component architecture splitting a single monolithic page into distinct functional views: Home, Projects, and Progress, plus dedicated Header and Footer components.
- **What it gave back:**
  Scaffolded React components (`HomePage.jsx`, `ProjectsPage.jsx`, `ProgressPage.jsx`, `Header.jsx`, `Footer.jsx`) with basic JSX structures and initial state hooks.
- **What I kept, what I changed, and why:**
  Kept the component file separation and prop-passing hierarchy. Customized the layout contents, added course-specific project context and metadata, and adjusted component props so the parent component could control task state consistently across pages.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/584f015501a9919debaabd6457e71a9482bc4265

---

### 2026-09-27 - Centralizing Task State Management and Optimistic UI Handling

- **Tool:** Gemini (3.8 Flash)
- **What I asked for:**
  Refactoring `App.jsx` to manage centralized task state (adding, toggling, editing, deleting) with asynchronous API synchronization and graceful fallback.
- **What it gave back:**
  State handlers in `App.jsx` using `useState` and `useEffect` to fetch tasks on mount and dispatch updates to the API client (`listTasks`, `createTask`, `updateTask`, `deleteTask`).
- **What I kept, what I changed, and why:**
  Kept the core asynchronous fetch and dispatch logic. Changed error handling to ensure UI notifications inform the user when an API call fails instead of failing silently, and preserved local state consistency during network delays.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/89262bfbaafc5a82c117287ad6d2db918690b100

---

### 2026-09-30 - Zero-Dependency Client Hash Routing and Design System

- **Tool:** Claude (Opus 4.6)
- **What I asked for:**
  A lightweight, zero-dependency client-side routing solution compatible with GitHub Pages hosting without requiring heavy external routing libraries like `react-router-dom`, plus a comprehensive CSS design system.
- **What it gave back:**
  A `window.location.hash` listener hook in `App.jsx` switching active views (`#home`, `#projects`, `#progress`), alongside an expanded `styles.css` with color tokens, responsive container rules, and card styling.
- **What I kept, what I changed, and why:**
  Kept the `hashchange` event listener and popstate synchronization because it works reliably with static web servers and GitHub Pages without 404 routing issues. Overhauled the CSS styles to apply custom dark slate palettes and emerald accents tailored to my personal data portfolio.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/5ab0da2036bcbed281de83f5c514830225afbcd8

---

### 2026-10-01 - Express REST API Endpoints and PostgreSQL Schema Migration

- **Tool:** Claude (Opus 4.6)
- **What I asked for:**
  Express route handlers and PostgreSQL relational database schema for tasks and portfolio projects, migrating away from the starter codebase's sighting schema.
- **What it gave back:**
  Updated `schema.sql` defining `tasks` and `projects` tables, seed queries in `seed.sql`, and RESTful endpoints in `server.js` (`/api/tasks`, `/api/projects`) with input validation and parameterization.
- **What I kept, what I changed, and why:**
  Kept the parameterized SQL queries (`$1`, `$2`), `/healthz`, and `/readyz` probe endpoints. Adjusted table constraints and data columns (such as tools array and project status flags) to match our actual coursework deliverables.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/cfc75d622acece212feb1b3a6c1a7f4917e8a3b3

---

### 2026-10-04 - Prominent Project Showcase Layout and Repository Data Layer

- **Tool:** Claude (Opus 4.6)
- **What I asked for:**
  Assistance in diagnosing why backend task routes failed after the schema migration, and redesigning the Projects showcase and cards to be significantly more prominent with detailed descriptions, tech badges, and direct links.
- **What it gave back:**
  A complete implementation of `server/tasksRepo.js` (which was left empty after the previous migration), redesigned CSS for `.project-card` featuring 3px accent borders, featured project highlighting, and updated JSX in `ProjectsPage.jsx` and `HomePage.jsx`.
- **What I kept, what I changed, and why:**
  Kept the data access functions (`getAll`, `getById`, `create`, `update`, `remove`) in `tasksRepo.js` with PostgreSQL connection pooling. Replaced emoji and unicode glyphs (such as star and arrow symbols) that became corrupted on Windows shells with clean, resilient ASCII markers and accessible HTML elements.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/d18dc69a45f5b8b81c53ca79c14d486051308eb9

---

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Corrupted Object State Mutation in Mock API

- **What it gave me:**
  In the `updateTask` function within `client/src/api/mockApi.js`, the AI generated:
  ```javascript
  const updated = [...current[index], ...updates]
  ```
- **What was wrong with it:**
  `current[index]` is an Object representing an individual task, not an Array. Attempting to spread an object inside array brackets (`[...]`) throws a runtime `TypeError: current[index] is not iterable` in JavaScript, completely crashing the mock task toggle feature.
- **What I did instead:**
  Identified the runtime exception in the browser console, corrected the syntax to proper object spread syntax:
  ```javascript
  const updated = { ...current[index], ...updates }
  ```
  and verified task state persistence across page reloads.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/f14bd59a25880cf6a39d31cf0aa7377b72297ecc

---

### Case 2 - Broken Empty Repository Layer Causing Server Crashes

- **What it gave me:**
  During the backend refactoring to transition from the sightings starter to tasks and projects, the AI updated `server/server.js` with `import * as tasks from './tasksRepo.js'`, but generated an empty file for `tasksRepo.js` (0 bytes).
- **What was wrong with it:**
  When starting the Express server and querying `/api/tasks`, the route handler attempted to execute `tasks.getAll(pool)`, which resulted in `TypeError: tasks.getAll is not a function`. The server was unable to service any task requests.
- **What I did instead:**
  Created the complete repository layer in `server/tasksRepo.js` with exported asynchronous functions (`getAll`, `getById`, `create`, `update`, `remove`), properly parameterizing SQL queries to prevent SQL injection vulnerabilities.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/d18dc69a45f5b8b81c53ca79c14d486051308eb9

---

### Case 3 - Syntax & Character Encoding Errors in React Components

- **What it gave me:**
  In `ProjectsPage.jsx` and `HomePage.jsx`, the AI generated unicode emojis and arrow glyphs (such as `★`, `✓`, `↗`) along with a double-escaped HTML entity (`&amp;amp;`) and an extraneous closing brace `}`.
- **What was wrong with it:**
  Vite's JSX parser immediately threw a build failure (`Unexpected token (85:0)`). Furthermore, saving UTF-8 multi-byte glyphs through certain Windows shell tools caused byte-level corruption (rendering as mojibake `~.`), producing broken UI text and build warnings.
- **What I did instead:**
  Cleaned up the malformed JSX tags, removed the misplaced brace, and replaced all fragile multi-byte unicode glyphs with standard ASCII text labels ("Featured", "Completed", "In Progress", "->") and styled CSS badges.
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/d18dc69a45f5b8b81c53ca79c14d486051308eb9

---

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Bagziel

#### Written by me

- **File:** [client/src/App.jsx](https://github.com/Bagziel/Progress-Portfolio-APSI/blob/main/client/src/App.jsx)
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/5ab0da2036bcbed281de83f5c514830225afbcd8
- **What it does and why it is built this way:**
  I implemented the client-side hash routing mechanism directly inside `App.jsx` using React's native `useState` and `useEffect` hooks coupled to `window.location.hash`. When the user navigates between Home, Projects, and Progress, the `hashchange` listener detects changes, strips `#`, sanitizes the target string against an allowed page set (`['home', 'projects', 'progress']`), and renders the corresponding component view.
  
  I built it this way because the project needs to deploy statically onto GitHub Pages without dedicated server-side routing support. Standard HTML5 History routing (`pushState`) on static hosting results in 404 errors when a user refreshes deep URLs unless custom 404 redirection hacks are used. Hash-based routing provides full deep-linking and browser Back/Forward navigation support with zero third-party bundle dependencies.

---

- **File:** [server/tasksRepo.js](https://github.com/Bagziel/Progress-Portfolio-APSI/blob/main/server/tasksRepo.js)
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/d18dc69a45f5b8b81c53ca79c14d486051308eb9
- **What it does and why it is built this way:**
  I wrote the data access layer for learning tasks, consisting of five core methods: `getAll`, `getById`, `create`, `update`, and `remove`. In `update`, I implemented a selective merge pattern: it retrieves the current record first with `getById`, inspects which properties (`title`, `description`, `category`, `completed`) are explicitly defined in the update payload, and applies only those updates while preserving existing values.
  
  Every database operation strictly passes values through PostgreSQL parameterized placeholders (`$1`, `$2`, etc.) via `pool.query()`. This architecture completely insulates the application against SQL injection attacks, keeps database logic cleanly decoupled from HTTP request/response handling in `server.js`, and ensures database connections are efficiently recycled via connection pooling.

---

#### The AI-written part I understand best

- **File:** [server/db/pool.js](https://github.com/Bagziel/Progress-Portfolio-APSI/blob/main/server/db/pool.js)
- **Commit:** https://github.com/Bagziel/Progress-Portfolio-APSI/commit/cfc75d622acece212feb1b3a6c1a7f4917e8a3b3
- **What it does and why we kept it:**
  This module initializes and exports a single shared PostgreSQL connection pool instance (`pg.Pool`) configured from the `DATABASE_URL` environment variable. It intelligently detects the environment: if the connection target is localhost, it connects via plain TCP; if connecting to a remote host (such as Supabase or Neon), it dynamically activates SSL with `rejectUnauthorized: false` to allow secure TLS connections through cloud load balancers. It also caps maximum concurrent connections to 5 to protect database quotas on serverless tiers.
  
  We kept this implementation because creating individual database clients per HTTP request degrades performance and quickly exhausts PostgreSQL connection limits. A shared pool manages connection reuse efficiently, recovers automatically from network drops, and allows seamless switching between local development and cloud-hosted Supabase instances without changing any application code.
