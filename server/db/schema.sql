-- Database schema for Progress Portfolio.
-- Safe to run against an empty database, and safe to run repeatedly.

-- 1. Tasks / Learning Milestones
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  category    TEXT        NOT NULL DEFAULT 'General',
  completed   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tasks_created_at_idx
  ON tasks (created_at DESC);

-- 2. Projects
CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  tools       TEXT[]      NOT NULL DEFAULT '{}',
  repository  TEXT        NOT NULL DEFAULT '',
  live_demo   TEXT        NOT NULL DEFAULT '',
  featured    BOOLEAN     NOT NULL DEFAULT FALSE,
  completed   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_created_at_idx
  ON projects (created_at DESC);

