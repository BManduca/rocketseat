import Database from 'better-sqlite3'
import type { Database as DatabaseType } from 'better-sqlite3'

const isTestEnv = process.env.NODE_ENV === 'test'
const dbPath = isTestEnv ? ':memory:' : (process.env.DATABASE_PATH ?? 'data/database.db')

const db: DatabaseType = new Database(dbPath)

// WAL mode melhora a performance de escrita concorrente
if (!isTestEnv) {
  db.pragma('journal_mode = WAL')
}

export { db }

export function closeDatabase(): void {
  db.close()
}
