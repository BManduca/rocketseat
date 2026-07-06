import type Database from 'better-sqlite3'

import { db } from '../database/index.js'
import type { Feedback } from '../types/feedback.js'
import type { Sentiment } from '../types/feedback.js'

// ─── Tipo interno para rows do banco (snake_case) ──────────────
interface FeedbackRow {
  id: string
  content: string
  sentiment: string
  created_at: string
}

// ─── Prepared Statements (lazy — criados após migrations) ───────
let insertStmt: Database.Statement<[string, string, string, string]>
let selectAllStmt: Database.Statement<[]>
let deleteAllStmt: Database.Statement<[]>

function ensureStatements(): void {
  if (!insertStmt) {
    insertStmt = db.prepare(
      'INSERT INTO feedbacks (id, content, sentiment, created_at) VALUES (?, ?, ?, ?)'
    )
    selectAllStmt = db.prepare(
      'SELECT * FROM feedbacks ORDER BY created_at DESC'
    )
    deleteAllStmt = db.prepare(
      'DELETE FROM feedbacks'
    )
  }
}

// ─── Operações ──────────────────────────────────────────────────

export function insertFeedback(feedback: Feedback): void {
  ensureStatements()
  insertStmt.run(feedback.id, feedback.content, feedback.sentiment, feedback.createdAt)
}

export function findAllFeedbacks(): Feedback[] {
  ensureStatements()
  const rows = selectAllStmt.all() as FeedbackRow[]
  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    sentiment: row.sentiment as Sentiment,
    createdAt: row.created_at, // snake_case → camelCase
  }))
}

export function deleteAllFeedbacks(): void {
  ensureStatements()
  deleteAllStmt.run()
}

