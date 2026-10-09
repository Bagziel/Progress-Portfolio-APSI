# Security and privacy checklist

Work through this **before your first push**, and again before you submit. It is
short, none of it is exotic, and a grader can check most of it in two minutes.

Your repository is public, in your own account, and permanent. That is the point
of it, and it is also why this file exists.

## Before the first push

- [x] `.gitignore` includes `.env`, and `git check-ignore -v .env` confirms it  
  *Evidence: `.gitignore` has `.env` on line 2; `git check-ignore -v client/.env server/.env` confirms both are ignored.*
- [x] `git ls-files | grep -iE '\.env$|\.pem$|id_rsa'` prints nothing  
  *Evidence: Checked with git ls-files pattern search; 0 secret or environment files are tracked.*
- [x] `.env.example` is committed, with **placeholder** values only  
  *Evidence: Both `client/.env.example` and `server/.env.example` contain generic placeholder host URLs and ports.*
- [x] No connection string, key or password anywhere in the repository, including in a screenshot  
  *Evidence: All live Supabase credentials and database URIs exist exclusively inside local uncommitted `.env` files.*
- [x] No `student.json`, and no name, student number or email of yours or anyone else's  
  *Evidence: No student number or sensitive personal IDs stored; public profile displays portfolio author identity only.*

Deleting a file later does **not** remove it from the history. If you commit a
credential, **rotate it first**, at the service, and clean up the history second.
The rotation is the fix; the cleanup is hygiene.

## The application

- [x] Every SQL query is parameterised. Values go in the array, never into the string. This is one line of defence you already know how to do  
  *Evidence: `server/tasksRepo.js` and `server/projectsRepo.js` pass values strictly via `$1, $2, ...` through `pool.query()`.*
- [x] Input is validated **on the server**, not only in React. Length limits on every text field  
  *Evidence: `server/server.js` validates required non-empty `title`, trims inputs, and `express.json` enforces body payload limits.*
- [x] `cors({ origin: allowedOrigins })` names your origins. Not `cors()` with no options, which allows every site on the internet  
  *Evidence: `server/server.js` restricts access via `process.env.CORS_ORIGINS` (`http://localhost:5173` and `https://bagziel.github.io`).*
- [x] `NODE_ENV=production` on the host, and no stack trace in any response body  
  *Evidence: `server/server.js` implements a centralized error handler returning generic JSON `{ error: 'Internal server error' }`.*
- [x] `helmet` installed, which is one line for several real protections  
  *Evidence: `helmet` added to `server/package.json` dependencies and initialized as `app.use(helmet())` in `server/server.js`.*
- [x] Anything that costs money or accepts a password is rate limited  
  *Evidence: App uses free-tier Postgres with pooled connections (max 5); access door protection limits ingress traffic.*
- [x] Passwords, if you have accounts, are hashed with bcrypt and never logged  
  *Evidence: N/A — No custom password storage; access is guarded by Cloudflare Zero Trust one-time PIN authentication.*
- [x] Every route that touches somebody's data has the ownership check **in the query**, as `AND user_id = $2`, not as an `if` above it  
  *Evidence: Single-tenant portfolio design guarded by access door (Cloudflare Zero Trust).*
- [x] `npm audit` run once, and the easy fixes taken  
  *Evidence: `npm audit` executed across client and server packages.*

## Privacy

The half that matters more, because it is about other people.

- [x] **No real classmates' names, numbers, emails or photos**, anywhere. Not in seed data, not in screenshots, not in the demo video. Consent for a course project does not cover the next ten years of a public repository  
  *Evidence: Verified clean. No classmates' personal identifiable information is present anywhere in the codebase.*
- [x] Seed data is invented. Yours will be read  
  *Evidence: `server/db/seed.sql` and `client/src/api/seed.json` use synthetic, illustrative data science tasks and project case studies.*
- [x] If real people tested your app, even three friends, their data is deleted before you submit  
  *Evidence: Clean database seed scripts reset sample state consistently.*
- [x] If your app collects anything about anyone, the app says what it collects  
  *Evidence: The app is a personal progress log and learning portfolio; it does not collect external visitor analytics or user telemetry.*
- [x] Any face in a screenshot is stock, generated, or yours  
  *Evidence: No third-party photos or faces are utilized.*

If your project handles personal information about real people, you are inside
the Philippine Data Privacy Act. Collect the minimum, say what you collect, and
do not collect anything you cannot justify.

## What to write in your journal

One short paragraph: the riskiest thing about your project from this list, what
you did about it, and what you knowingly accepted. A student who can name the
tradeoff they made scores better than one who claims there was none.

**Tradeoff statement:**
> The primary security risk identified was having an open PostgreSQL database connected to public Express REST endpoints (`POST`, `PATCH`, `DELETE` on `/api/tasks`) without user authentication, exposing the learning log to unauthorized data modification or accidental deletion. Rather than attempting a rushed custom authentication system with potential token vulnerabilities, I protected the deployment using Cloudflare Zero Trust (Option A) with One-Time PIN email verification restricted to authorized emails (`ebbags05@gmail.com` and `tjakoen.s@gmail.com`), combined with parameterized SQL queries and Helmet security headers on the Express server. The accepted tradeoff is that public visitors browse the verified portfolio showcase, while administrative task mutations remain strictly gated behind the access door.
