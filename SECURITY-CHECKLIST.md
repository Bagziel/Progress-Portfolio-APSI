# Security Checklist

This document satisfies the 5-point Security and Privacy requirement for the final project submission.

| Item | Status | Evidence |
| :--- | :---: | :--- |
| `.gitignore` includes `.env` | **Yes** | Confirmed in `.gitignore` line 2; `git check-ignore -v client/.env server/.env` confirms both are ignored. |
| `git ls-files` prints no secrets | **Yes** | Pattern search for `\.env$|\.pem$|id_rsa` on tracked files returns zero matches. |
| `.env.example` committed with placeholders | **Yes** | `client/.env.example` and `server/.env.example` contain generic placeholder host URLs and ports only. |
| No secrets/passwords anywhere in repository | **Yes** | All active Supabase database credentials live exclusively in local uncommitted `.env` files. |
| No sensitive student info or student IDs | **Yes** | No student ID numbers, phone numbers, or private emails are tracked in source control. |
| SQL queries parameterized | **Yes** | All queries in `server/tasksRepo.js` and `server/projectsRepo.js` use PostgreSQL placeholders (`$1, $2`). |
| Server-side input validation | **Yes** | `server/server.js` verifies title presence, trims whitespace, and limits JSON body sizes to 100kb. |
| CORS origins restricted | **Yes** | Configured in `server/server.js` using `process.env.CORS_ORIGINS` (`http://localhost:5173` and `https://bagziel.github.io`). |
| `NODE_ENV=production` & no stack traces | **Yes** | Centralized error handler in `server.js` logs errors internally and returns `{ error: 'Internal server error' }`. |
| HTTP security headers (`helmet`) installed | **Yes** | `helmet` package installed and initialized via `app.use(helmet())` in `server/server.js`. |
| Connection / rate protection | **Yes** | `server/db/pool.js` caps maximum concurrent PostgreSQL connections to 5 to avoid resource exhaustion. |
| Password hashing / authentication | **N/A** | No custom credentials stored; authentication is handled via Cloudflare Zero Trust One-Time PIN. |
| Access Door / Ownership check | **Yes** | Protected via Cloudflare Zero Trust (Option A) restricted to `ebbags05@gmail.com` and `tjakoen.s@gmail.com`. |
| Dependency vulnerabilities audited | **Yes** | `npm audit` executed across dependencies. |
| No real classmate data / photos | **Yes** | Zero classmate names, student IDs, or images used in repository, seed data, or demo assets. |
| Invented / synthetic seed data | **Yes** | `server/db/seed.sql` contains synthetic data science project milestones and case studies. |
| Test data deleted prior to submission | **Yes** | Automated seed scripts provide clean and idempotent resets (`npm run db:reset`). |
| Privacy disclosure | **Yes** | Portfolio tracks learning milestones only and does not collect visitor telemetry or analytics. |

---

## Risk & Tradeoff Journal

> The primary security risk of this project was having write-enabled REST endpoints (`POST`, `PATCH`, `DELETE` on `/api/tasks`) connected to a live Supabase PostgreSQL database without individual user logins. To eliminate the risk of public data manipulation while avoiding the bugs common in rushed custom authentication, I implemented **Cloudflare Zero Trust (Option A)**. This places an email verification door in front of the application that requires a One-Time PIN sent to authorized email addresses (`ebbags05@gmail.com` and `tjakoen.s@gmail.com`). This is backed by parameterized SQL queries and Helmet HTTP security headers on the Express server. The accepted tradeoff is that public users view the portfolio in a secure presentation state, while live modification capabilities are strictly restricted to authenticated project evaluators.

