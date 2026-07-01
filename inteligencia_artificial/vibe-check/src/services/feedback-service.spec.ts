import { describe, it, expect, beforeEach, afterAll } from 'vitest'

import { createFeedback, getAllFeedbacks, clearFeedbacks, closeDatabase } from './feedback-service.js'
import { Sentiment } from '../types/feedback.js'

describe('feedback-service', () => {
  // Limpar os feedbacks antes de cada teste para garantir isolamento total
  beforeEach(() => {
    clearFeedbacks()
  })

  // Fechar a conexão do banco de dados ao final da suíte de testes
  afterAll(() => {
    closeDatabase()
  })

  // ─── Validação de Conteúdo ────────────────────────────────────

  describe('validação de conteúdo', () => {
    it('deve rejeitar feedback com menos de 10 caracteres', () => {
      expect(() => createFeedback({ content: 'curto' })).toThrowError(
        'Feedback must be between 10 and 500 characters',
      )
    })

    it('deve rejeitar feedback com exatamente 9 caracteres', () => {
      expect(() => createFeedback({ content: '123456789' })).toThrowError(
        'Feedback must be between 10 and 500 characters',
      )
    })

    it('deve aceitar feedback com exatamente 10 caracteres', () => {
      const feedback = createFeedback({ content: '1234567890' })
      expect(feedback.content).toBe('1234567890')
    })

    it('deve aceitar feedback com exatamente 500 caracteres', () => {
      const content = 'a'.repeat(500)
      const feedback = createFeedback({ content })
      expect(feedback.content).toBe(content)
    })

    it('deve rejeitar feedback com mais de 500 caracteres', () => {
      const content = 'a'.repeat(501)
      expect(() => createFeedback({ content })).toThrowError(
        'Feedback must be between 10 and 500 characters',
      )
    })
  })

  // ─── Análise de Sentimento ────────────────────────────────────

  describe('análise de sentimento', () => {
    it('deve retornar POSITIVE para texto com "ótimo"', () => {
      const feedback = createFeedback({ content: 'O serviço é ótimo demais!' })
      expect(feedback.sentiment).toBe(Sentiment.POSITIVE)
    })

    it('deve retornar POSITIVE para texto com "bom"', () => {
      const feedback = createFeedback({ content: 'O atendimento foi muito bom' })
      expect(feedback.sentiment).toBe(Sentiment.POSITIVE)
    })

    it('deve retornar POSITIVE para texto com "excelente"', () => {
      const feedback = createFeedback({ content: 'Experiência excelente no geral' })
      expect(feedback.sentiment).toBe(Sentiment.POSITIVE)
    })

    it('deve retornar NEGATIVE para texto com "ruim"', () => {
      const feedback = createFeedback({ content: 'A experiência foi muito ruim' })
      expect(feedback.sentiment).toBe(Sentiment.NEGATIVE)
    })

    it('deve retornar NEGATIVE para texto com "lento"', () => {
      const feedback = createFeedback({ content: 'O sistema está muito lento' })
      expect(feedback.sentiment).toBe(Sentiment.NEGATIVE)
    })

    it('deve retornar NEGATIVE para texto com "erro"', () => {
      const feedback = createFeedback({ content: 'Encontrei um erro no sistema' })
      expect(feedback.sentiment).toBe(Sentiment.NEGATIVE)
    })

    it('deve retornar NEUTRAL para texto sem palavras-chave', () => {
      const feedback = createFeedback({ content: 'Utilizei o serviço normalmente hoje' })
      expect(feedback.sentiment).toBe(Sentiment.NEUTRAL)
    })

    it('deve ser case-insensitive na análise', () => {
      const feedback = createFeedback({ content: 'O serviço é ÓTIMO demais!' })
      expect(feedback.sentiment).toBe(Sentiment.POSITIVE)
    })
  })

  // ─── Estrutura do Feedback ────────────────────────────────────

  describe('estrutura do feedback criado', () => {
    it('deve retornar um objeto com id, content, sentiment e createdAt', () => {
      const feedback = createFeedback({ content: 'Feedback de teste para validar' })

      expect(feedback).toHaveProperty('id')
      expect(feedback).toHaveProperty('content')
      expect(feedback).toHaveProperty('sentiment')
      expect(feedback).toHaveProperty('createdAt')
    })

    it('deve gerar um UUID válido como id', () => {
      const feedback = createFeedback({ content: 'Feedback de teste para validar' })
      // UUID v4 pattern
      expect(feedback.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
    })

    it('deve gerar um timestamp ISO-8601 válido', () => {
      const feedback = createFeedback({ content: 'Feedback de teste para validar' })
      const date = new Date(feedback.createdAt)
      expect(date.toISOString()).toBe(feedback.createdAt)
    })

    it('deve preservar o conteúdo original', () => {
      const content = 'Meu feedback sobre o serviço'
      const feedback = createFeedback({ content })
      expect(feedback.content).toBe(content)
    })

    it('deve gerar IDs únicos para cada feedback', () => {
      const f1 = createFeedback({ content: 'Primeiro feedback do teste' })
      const f2 = createFeedback({ content: 'Segundo feedback do teste' })
      expect(f1.id).not.toBe(f2.id)
    })
  })

  // ─── Persistência com SQLite ──────────────────────────────────

  describe('persistência com SQLite', () => {
    it('deve persistir o feedback criado no banco de dados', () => {
      const created = createFeedback({ content: 'Feedback persistido no banco' })
      const allFeedbacks = getAllFeedbacks()

      expect(allFeedbacks).toHaveLength(1)
      expect(allFeedbacks[0].id).toBe(created.id)
      expect(allFeedbacks[0].content).toBe(created.content)
    })

    it('deve retornar uma lista vazia quando não há feedbacks', () => {
      const allFeedbacks = getAllFeedbacks()
      expect(allFeedbacks).toEqual([])
    })

    it('deve retornar múltiplos feedbacks persistidos', () => {
      createFeedback({ content: 'Primeiro feedback de teste' })
      createFeedback({ content: 'Segundo feedback de teste' })
      createFeedback({ content: 'Terceiro feedback de teste' })

      const allFeedbacks = getAllFeedbacks()
      expect(allFeedbacks).toHaveLength(3)
    })

    it('deve retornar feedbacks ordenados por data de criação (mais recente primeiro)', () => {
      createFeedback({ content: 'Feedback mais antigo criado' })
      createFeedback({ content: 'Feedback mais recente criado' })

      const allFeedbacks = getAllFeedbacks()

      expect(allFeedbacks).toHaveLength(2)
      expect(allFeedbacks[0].createdAt >= allFeedbacks[1].createdAt).toBe(true)
    })

    it('deve mapear corretamente created_at do banco para createdAt no TypeScript', () => {
      createFeedback({ content: 'Feedback para validar mapeamento' })
      const allFeedbacks = getAllFeedbacks()

      expect(allFeedbacks[0]).toHaveProperty('createdAt')
      expect(allFeedbacks[0]).not.toHaveProperty('created_at')
    })

    it('deve isolar os dados entre testes (via beforeEach)', () => {
      // Este teste valida que o beforeEach limpa os dados corretamente.
      // Se os dados de outro teste vazarem, haverá mais de 0 feedbacks antes da criação.
      const beforeCreate = getAllFeedbacks()
      expect(beforeCreate).toHaveLength(0)

      createFeedback({ content: 'Feedback para teste de isolamento' })
      const afterCreate = getAllFeedbacks()
      expect(afterCreate).toHaveLength(1)
    })

    it('deve preservar a integridade dos dados com caracteres especiais', () => {
      const content = 'Feedback com acentuação: café, coração e emojis 🎉🚀✅'
      createFeedback({ content })

      const allFeedbacks = getAllFeedbacks()
      expect(allFeedbacks[0].content).toBe(content)
    })
  })
})
