import { describe, it, expect, beforeEach, afterAll } from 'vitest'

import { runMigrations, closeDatabase } from '../database/index.js'
import { Sentiment } from '../types/feedback.js'
import type { Feedback } from '../types/feedback.js'

import {
  insertFeedback,
  findAllFeedbacks,
  deleteAllFeedbacks,
} from './feedback.repository.js'

// ─── Setup ──────────────────────────────────────────────────────
runMigrations()

beforeEach(() => {
  deleteAllFeedbacks()
})

afterAll(() => {
  closeDatabase()
})

// Helper para criar um feedback válido
function makeFeedback(overrides?: Partial<Feedback>): Feedback {
  return {
    id: crypto.randomUUID(),
    content: 'Conteúdo de teste padrão para repositório',
    sentiment: Sentiment.NEUTRAL,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

// ─── 1. insertFeedback ──────────────────────────────────────────

describe('insertFeedback', () => {
  it('deve inserir um feedback e torná-lo recuperável', () => {
    const feedback = makeFeedback()
    insertFeedback(feedback)

    const all = findAllFeedbacks()
    expect(all).toHaveLength(1)
    expect(all[0].id).toBe(feedback.id)
  })

  it('deve inserir múltiplos feedbacks', () => {
    insertFeedback(makeFeedback())
    insertFeedback(makeFeedback())
    insertFeedback(makeFeedback())

    expect(findAllFeedbacks()).toHaveLength(3)
  })
})

// ─── 2. findAllFeedbacks ────────────────────────────────────────

describe('findAllFeedbacks', () => {
  it('deve retornar lista vazia quando não há registros', () => {
    expect(findAllFeedbacks()).toEqual([])
  })

  it('deve retornar feedbacks ordenados por data DESC', () => {
    const first = makeFeedback({ createdAt: '2026-01-01T00:00:00.000Z' })
    const second = makeFeedback({ createdAt: '2026-06-01T00:00:00.000Z' })

    insertFeedback(first)
    insertFeedback(second)

    const all = findAllFeedbacks()
    expect(all[0].id).toBe(second.id)
    expect(all[1].id).toBe(first.id)
  })

  it('deve mapear created_at → createdAt corretamente', () => {
    const feedback = makeFeedback()
    insertFeedback(feedback)

    const result = findAllFeedbacks()[0]
    expect(result.createdAt).toBe(feedback.createdAt)
    expect((result as unknown as Record<string, unknown>)['created_at']).toBeUndefined()
  })

  it('deve preservar caracteres especiais e emojis', () => {
    const content = 'Acentuação: ã, é, ç e emojis: 🚀🎉✨'
    const feedback = makeFeedback({ content })
    insertFeedback(feedback)

    expect(findAllFeedbacks()[0].content).toBe(content)
  })
})

// ─── 3. deleteAllFeedbacks ──────────────────────────────────────

describe('deleteAllFeedbacks', () => {
  it('deve remover todos os registros', () => {
    insertFeedback(makeFeedback())
    insertFeedback(makeFeedback())
    expect(findAllFeedbacks()).toHaveLength(2)

    deleteAllFeedbacks()
    expect(findAllFeedbacks()).toEqual([])
  })

  it('não deve lançar erro quando a tabela já está vazia', () => {
    expect(() => deleteAllFeedbacks()).not.toThrow()
  })
})
