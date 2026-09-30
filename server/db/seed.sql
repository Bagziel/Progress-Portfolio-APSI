-- Sample development seed data for Progress Portfolio.
-- TRUNCATE clears tables before inserting.

TRUNCATE TABLE tasks, projects RESTART IDENTITY CASCADE;

-- Initial Learning Tasks
INSERT INTO tasks (title, description, category, completed, created_at) VALUES
  ('[Work in Progress] Complete Data Cleaning & EDA Course',
   '[Template Text] Documenting core techniques in data preprocessing and exploratory analysis.',
   'SQL & Databases', true, now() - interval '14 days'),
  ('[Work in Progress] Build Interactive BI Dashboard',
   '[Template Text] Design executive reporting dashboards with filterable KPI widgets.',
   'Data Visualization', false, now() - interval '10 days'),
  ('[Template Text] Master SQL Window Functions and CTEs',
   '[Template Text] Practice complex query aggregations, partitioning, and indexing.',
   'SQL & Databases', false, now() - interval '6 days');

-- Initial Portfolio Projects
INSERT INTO projects (name, description, tools, repository, live_demo, featured, completed, created_at) VALUES
  ('[Work in Progress] Portfolio & Analytics Tracker',
   '[Template Text] A web platform showcasing projects and tracking ongoing technical milestones.',
   ARRAY['React', 'CSS', 'Vite', 'JavaScript', 'PostgreSQL'],
   'https://github.com/Bagziel/Progress-Portfolio-APSI',
   'https://Bagziel.github.io/Progress-Portfolio-APSI',
   true, false, now() - interval '20 days'),
  ('[Template Text] Exploratory Customer Analysis Model',
   '[Template Text] Detailed case study on consumer retention and cohort segmentation.',
   ARRAY['Python', 'Pandas', 'PostgreSQL'],
   'https://github.com/Bagziel/Progress-Portfolio-APSI',
   'https://github.com/Bagziel',
   true, false, now() - interval '12 days');
