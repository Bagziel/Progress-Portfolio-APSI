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
  ('E-Commerce Customer Segmentation & Cohort Analysis',
   'Analyzed over 50,000 transaction records using Python and Pandas to identify retention patterns and customer lifetime value cohorts.',
   ARRAY['Python', 'Pandas', 'PostgreSQL', 'Matplotlib'],
   'https://github.com/Bagziel/Progress-Portfolio-APSI',
   'https://github.com/Bagziel',
   true, true, now() - interval '20 days'),
  ('Clinic Appointment No-Show Analytics Dashboard',
   'Exploratory analysis and data cleaning of patient attendance logs to uncover patterns behind appointment no-shows, visualized in an interactive dashboard.',
   ARRAY['SQL', 'Tableau', 'Excel'],
   'https://github.com/Bagziel/Progress-Portfolio-APSI',
   'https://github.com/Bagziel',
   true, false, now() - interval '12 days'),
  ('Real-Time Weather & Air Quality ETL Pipeline',
   'Constructed an automated data collection pipeline fetching open air quality API metrics and staging them in PostgreSQL for time-series forecasting.',
   ARRAY['Python', 'REST API', 'PostgreSQL'],
   'https://github.com/Bagziel/Progress-Portfolio-APSI',
   'https://github.com/Bagziel',
   false, false, now() - interval '5 days');

