-- Sample development seed data for Progress Portfolio.
-- TRUNCATE clears tables before inserting.

TRUNCATE TABLE tasks, projects RESTART IDENTITY CASCADE;

-- Initial Learning Tasks
INSERT INTO tasks (title, description, category, completed, created_at) VALUES
  ('Master SQL window functions, CTEs, and query indexing',
   'Deep dive into PostgreSQL windowing and subqueries.',
   'SQL & Databases', true, now() - interval '14 days'),
  ('Build customer retention cohort dashboard in Tableau',
   'Visualize retention curves and monthly active user cohorts.',
   'Data Visualization', false, now() - interval '10 days'),
  ('Complete Exploratory Data Analysis (EDA) on retail churn dataset with Pandas',
   'Data cleaning, missing value imputation, and correlation matrices.',
   'Python & Pandas', false, now() - interval '6 days'),
  ('Learn statistical hypothesis testing and A/B test analysis',
   'Understand p-values, significance levels, and sample size calculations.',
   'Statistics', false, now() - interval '2 days');

-- Initial Portfolio Projects
INSERT INTO projects (name, description, tools, repository, live_demo, featured, completed, created_at) VALUES
  ('Hands Free',
   'Offline speech recognition and voice-control accessibility overlay for Android utilizing an on-device fine-tuned Whisper-tiny model deployed through ONNX Runtime.',
   ARRAY['Android', 'ONNX Runtime', 'Whisper-tiny', 'Python', 'CRISP-DM', 'PyTorch'],
   'https://github.com/JCDC0/HandsFree',
   'https://github.com/JCDC0/HandsFree',
   true, true, now() - interval '60 days'),
  ('Procrastimate',
   'A gamified task management and productivity mobile application built with Flutter, focused on improving time management and helping users organize tasks to avoid procrastination.',
   ARRAY['Flutter', 'Dart', 'Firebase', 'Firestore', 'Android', 'UI/UX'],
   'https://github.com/Haruuowo/procastimate_app',
   'https://github.com/Haruuowo/procastimate_app',
   true, true, now() - interval '180 days'),
  ('Frequency',
   'A web-based music platform that helps users discover music genres through a structured and clean front-end interface with responsive layouts across diverse screen sizes.',
   ARRAY['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
   'https://github.com/Bagziel/WEBCS_proj',
   'https://Bagziel.github.io/WEBCS_proj',
   true, true, now() - interval '365 days'),
  ('Progress Portfolio & Milestone Tracker',
   'Editorial Cyber-Obsidian Bento HUD personal portfolio and learning progression system, featuring real-time task telemetry, interactive filtering, and an integrated system terminal.',
   ARRAY['React', 'JavaScript', 'Vite', 'CSS3', 'PostgreSQL', 'Express'],
   'https://github.com/Bagziel/Progress-Portfolio-APSI',
   'https://Bagziel.github.io/Progress-Portfolio-APSI',
   true, true, now() - interval '10 days');

