-- Run this in the Cloudflare D1 studio (or via wrangler d1 execute) to create
-- the food and drinks tables. No seed data — all items are managed in D1.
-- Database: centerpiece-db (id: 4c4798e8-1d86-4105-92fa-8fcee7944d6b)

CREATE TABLE IF NOT EXISTS food (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  desc TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS drinks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  desc TEXT NOT NULL,
  price TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);
