import { describe, it, expect, beforeEach } from 'vitest'

import { createFeedback } from './feedback-service.js'
import { Sentiment } from '../types/feedback.js'

describe('feedback-service', () => {
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
})
