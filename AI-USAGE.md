# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-10-04 - Usage and guidance of AI for my project.

- **Tool:**
- Claude (Opus 4.6) and Gemini (3.8 Flash) were used during the development of the project.

- **What I asked for:**
- Provide and guide me on a step-by-step guide in developing a portfolio that integrates all of my experiences, knowledge, and projects in a website while showing a task list that shows all of my on-going tasks and goals that I need to achieve.

- **What it gave back:**
- A high-level architectural breakdown recommending a decoupled full-stack approach (React/Vite for frontend, Express backend, PostgreSQL database), alongside a phased development roadmap.

- **What I kept, what I changed, and why:**
- I kept the overall architecture and tech stack recommendation because it aligned perfectly with my goals. I modified the database suggestion from a standard local PostgreSQL setup to Supabase to streamline cloud deployment and database administration.

- **Commit:** `[Insert Commit Link Here]`

### Initial Backend Setup

- **Tool:**
- Gemini

- **What I asked for:**
- A boilerplate setup script for configuring an Express backend with CORS and environment variables for a REST API.

- **What it gave back:**
- A standard `server.js` file with `express`, `cors`, and `dotenv` initialized, including basic middleware setup and a health-check route.

- **What I kept, what I changed, and why:**
- I kept the core middleware configuration and routing structure. I changed the allowed CORS origins to specifically match my GitHub Pages production URL instead of allowing all origins (`*`) to ensure the API was secure.

- **Commit:** `[Insert Commit Link Here]`

### Frontend UI Components

- **Tool:**
- Gemini

- **What I asked for:**
- Code for a responsive React component to display the task list UI, utilizing modern CSS flexbox and grid layouts.

- **What it gave back:**
- A functional component using React hooks (`useState`, `useEffect`) populated with placeholder data and basic inline styling.

- **What I kept, what I changed, and why:**
- I kept the React state management logic but completely discarded the inline styles. I rewrote the CSS using my own design system to ensure the portfolio maintained a unique, cohesive visual identity rather than looking generic.

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Database Connection Method

- **What it gave me:**
- Implementation details for connecting to the database using the standard `pg` pooling library.
- **What was wrong with it:**
- While technically functional for PostgreSQL, it completely bypassed the built-in features, security policies, and simplified API provided by the official `@supabase/supabase-js` SDK, making the code unnecessarily complex for my specific stack.
- **What I did instead:**
- I discarded the `pg` pool approach entirely and rewrote the database interaction layer using the official Supabase JavaScript client, resulting in cleaner and more maintainable code.
- **Commit:** `[Insert Commit Link Here]`

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

- **File:**
- **Commit:**
- **What it does and why it is built this way:**

### The AI-written part I understand best

- **File:**
- **Commit:**
- **What it does and why we kept it:**
