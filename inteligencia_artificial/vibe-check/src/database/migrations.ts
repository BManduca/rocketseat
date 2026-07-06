import { db } from './connection.js'

export function runMigrations(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      sentiment TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)
}
