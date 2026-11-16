-- People who asked for event emails from the website signup box.
CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT,
  role TEXT,
  interests TEXT,
  page TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
