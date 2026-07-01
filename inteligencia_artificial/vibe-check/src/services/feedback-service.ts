import Database from 'better-sqlite3'
import { v4 as uuidv4 } from 'uuid'

import { Sentiment, type CreateFeedbackInput, type Feedback } from '../types/feedback.js'

// ─── Conexão com o Banco de Dados ──────────────────────────────
const isTestEnv = process.env.NODE_ENV === 'test'
const dbPath = isTestEnv ? ':memory:' : (process.env.DATABASE_PATH ?? 'database.db')

const db = new Database(dbPath)

// Habilitar WAL mode para melhor performance de escrita em ambiente de desenvolvimento
if (!isTestEnv) {
  db.pragma('journal_mode = WAL')
}

// ─── Inicialização DDL ─────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`)

// ─── Statements Preparados (reutilizáveis) ─────────────────────
const insertStmt = db.prepare(
  'INSERT INTO feedbacks (id, content, sentiment, created_at) VALUES (?, ?, ?, ?)',
)
const selectAllStmt = db.prepare('SELECT * FROM feedbacks ORDER BY created_at DESC')
const deleteAllStmt = db.prepare('DELETE FROM feedbacks')

// ─── Palavras-chave para análise de sentimento (case-insensitive) ──
const POSITIVE_KEYWORDS = ['ótimo', 'bom', 'excelente']
const NEGATIVE_KEYWORDS = ['ruim', 'lento', 'erro']

function analyzeSentiment(text: string): Sentiment {
  const lowerText = text.toLowerCase()

  if (POSITIVE_KEYWORDS.some((word) => lowerText.includes(word))) {
    return Sentiment.POSITIVE
  }

  if (NEGATIVE_KEYWORDS.some((word) => lowerText.includes(word))) {
    return Sentiment.NEGATIVE
  }

  return Sentiment.NEUTRAL
}

// ─── Operações de Feedback ─────────────────────────────────────

export function createFeedback(input: CreateFeedbackInput): Feedback {
  // Validação de conteúdo (regra de negócio do PRD)
  if (input.content.length < 10 || input.content.length > 500) {
    throw new Error('Feedback must be between 10 and 500 characters')
  }

  const feedback: Feedback = {
    id: uuidv4(),
    content: input.content,
    sentiment: analyzeSentiment(input.content),
    createdAt: new Date().toISOString(),
  }

  insertStmt.run(feedback.id, feedback.content, feedback.sentiment, feedback.createdAt)

  return feedback
}

interface FeedbackRow {
  id: string
  content: string
  sentiment: Sentiment
  created_at: string
}

export function getAllFeedbacks(): Feedback[] {
  const rows = selectAllStmt.all() as FeedbackRow[]

  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    sentiment: row.sentiment,
    createdAt: row.created_at,
  }))
}

// ─── Funções Auxiliares (testes e ciclo de vida) ────────────────

export function clearFeedbacks(): void {
  deleteAllStmt.run()
}

export function closeDatabase(): void {
  db.close()
}
