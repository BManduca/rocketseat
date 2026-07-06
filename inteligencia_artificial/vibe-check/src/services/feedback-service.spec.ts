import { describe, it, expect, beforeEach, afterAll } from 'vitest'

import { runMigrations, closeDatabase } from '../database/index.js'
import { deleteAllFeedbacks } from '../repositories/feedback.repository.js'
import { Sentiment } from '../types/feedback.js'

import {
  createFeedback,
  getAllFeedbacks,
  analyzeSentiment,
} from './feedback-service.js'

// ─── Setup ──────────────────────────────────────────────────────
runMigrations()

// ─── Lifecycle ──────────────────────────────────────────────────

beforeEach(() => {
  deleteAllFeedbacks()
})

afterAll(() => {
  closeDatabase()
})

// ─── 1. Validação de Conteúdo (5 testes) ────────────────────────

describe('Validação de conteúdo', () => {
  it('deve rejeitar feedback com menos de 10 caracteres', () => {
    expect(() => createFeedback({ content: 'curto' })).toThrow(
      'Feedback must be between 10 and 500 characters'
    )
  })

  it('deve rejeitar feedback vazio', () => {
    expect(() => createFeedback({ content: '' })).toThrow(
      'Feedback must be between 10 and 500 characters'
    )
  })

  it('deve rejeitar feedback com exatamente 9 caracteres', () => {
    expect(() => createFeedback({ content: '123456789' })).toThrow(
      'Feedback must be between 10 and 500 characters'
    )
  })

  it('deve aceitar feedback com exatamente 10 caracteres', () => {
    const feedback = createFeedback({ content: '1234567890' })
    expect(feedback.content).toBe('1234567890')
  })

  it('deve rejeitar feedback com mais de 500 caracteres', () => {
    const longContent = 'a'.repeat(501)
    expect(() => createFeedback({ content: longContent })).toThrow(
      'Feedback must be between 10 and 500 characters'
    )
  })
})

// ─── 2. Análise de Sentimento (8 testes) ─────────────────────────

describe('Análise de sentimento', () => {
  it('deve retornar POSITIVE para texto com "ótimo"', () => {
    expect(analyzeSentiment('Serviço ótimo, parabéns!')).toBe(Sentiment.POSITIVE)
  })

  it('deve retornar POSITIVE para texto com "bom"', () => {
    expect(analyzeSentiment('O atendimento é muito bom')).toBe(Sentiment.POSITIVE)
  })

  it('deve retornar POSITIVE para texto com "excelente"', () => {
    expect(analyzeSentiment('Experiência excelente do início ao fim')).toBe(Sentiment.POSITIVE)
  })

  it('deve retornar NEGATIVE para texto com "ruim"', () => {
    expect(analyzeSentiment('A experiência foi ruim')).toBe(Sentiment.NEGATIVE)
  })

  it('deve retornar NEGATIVE para texto com "lento"', () => {
    expect(analyzeSentiment('O sistema está lento demais')).toBe(Sentiment.NEGATIVE)
  })

  it('deve retornar NEGATIVE para texto com "erro"', () => {
    expect(analyzeSentiment('Aconteceu um erro no sistema')).toBe(Sentiment.NEGATIVE)
  })

  it('deve retornar NEUTRAL para texto sem palavras-chave', () => {
    expect(analyzeSentiment('Utilizei o serviço normalmente')).toBe(Sentiment.NEUTRAL)
  })

  it('deve ser case-insensitive na análise', () => {
    expect(analyzeSentiment('O serviço é ÓTIMO e EXCELENTE')).toBe(Sentiment.POSITIVE)
    expect(analyzeSentiment('Está LENTO e com ERRO')).toBe(Sentiment.NEGATIVE)
  })
})

// ─── 3. Estrutura do Feedback Criado (5 testes) ─────────────────

describe('Estrutura do feedback criado', () => {
  it('deve retornar um objeto com as propriedades corretas', () => {
    const feedback = createFeedback({ content: 'Este é um feedback de teste válido' })
    expect(feedback).toHaveProperty('id')
    expect(feedback).toHaveProperty('content')
    expect(feedback).toHaveProperty('sentiment')
    expect(feedback).toHaveProperty('createdAt')
  })

  it('deve gerar um UUID v4 como id', () => {
    const feedback = createFeedback({ content: 'Este é um feedback de teste válido' })
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    expect(feedback.id).toMatch(uuidV4Regex)
  })

  it('deve preservar o conteúdo original', () => {
    const content = 'Este é o conteúdo original do feedback'
    const feedback = createFeedback({ content })
    expect(feedback.content).toBe(content)
  })

  it('deve gerar um timestamp ISO-8601 em createdAt', () => {
    const feedback = createFeedback({ content: 'Este é um feedback de teste válido' })
    const date = new Date(feedback.createdAt)
    expect(date.toISOString()).toBe(feedback.createdAt)
  })

  it('deve atribuir o sentimento correto automaticamente', () => {
    const feedback = createFeedback({ content: 'O serviço é ótimo, adorei a experiência!' })
    expect(feedback.sentiment).toBe(Sentiment.POSITIVE)
  })
})

// ─── 4. Persistência SQLite (7 testes) ──────────────────────────

describe('Persistência SQLite', () => {
  it('deve persistir o feedback criado no banco de dados', () => {
    const created = createFeedback({ content: 'Este feedback deve ser persistido no banco' })
    const all = getAllFeedbacks()

    expect(all).toHaveLength(1)
    expect(all[0].id).toBe(created.id)
    expect(all[0].content).toBe(created.content)
  })

  it('deve retornar uma lista vazia quando não há feedbacks', () => {
    const all = getAllFeedbacks()
    expect(all).toEqual([])
  })

  it('deve retornar múltiplos feedbacks persistidos', () => {
    createFeedback({ content: 'Primeiro feedback de teste válido' })
    createFeedback({ content: 'Segundo feedback de teste válido' })
    createFeedback({ content: 'Terceiro feedback de teste válido' })

    const all = getAllFeedbacks()
    expect(all).toHaveLength(3)
  })

  it('deve retornar feedbacks ordenados por data (DESC)', async () => {
    const first = createFeedback({ content: 'Primeiro feedback criado aqui' })

    // Delay para garantir timestamps distintos
    await new Promise((resolve) => setTimeout(resolve, 10))

    const second = createFeedback({ content: 'Segundo feedback criado aqui' })

    const all = getAllFeedbacks()

    // O mais recente deve vir primeiro
    expect(all[0].id).toBe(second.id)
    expect(all[1].id).toBe(first.id)
  })

  it('deve mapear corretamente created_at → createdAt', () => {
    const created = createFeedback({ content: 'Feedback para testar mapeamento de campo' })
    const all = getAllFeedbacks()

    expect(all[0].createdAt).toBeDefined()
    expect(all[0].createdAt).toBe(created.createdAt)
    // Garantir que não existe created_at no retorno (camelCase é o contrato)
    expect((all[0] as unknown as Record<string, unknown>)['created_at']).toBeUndefined()
  })

  it('deve isolar dados entre testes (beforeEach)', () => {
    // Se o beforeEach está funcionando, a lista deve estar vazia
    const all = getAllFeedbacks()
    expect(all).toHaveLength(0)

    // Inserir e confirmar
    createFeedback({ content: 'Feedback isolado neste teste apenas' })
    expect(getAllFeedbacks()).toHaveLength(1)
  })

  it('deve preservar integridade com caracteres especiais', () => {
    const specialContent = 'Feedback com acentuação: ã, é, ç, ü e emojis: 🚀🎉✨'
    const created = createFeedback({ content: specialContent })
    const all = getAllFeedbacks()

    expect(all[0].content).toBe(specialContent)
    expect(all[0].id).toBe(created.id)
  })
})
