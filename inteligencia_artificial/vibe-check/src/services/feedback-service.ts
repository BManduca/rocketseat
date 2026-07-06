import { v4 as uuidv4 } from 'uuid'

import type { CreateFeedbackInput, Feedback } from '../types/feedback.js'
import { Sentiment } from '../types/feedback.js'
import { insertFeedback, findAllFeedbacks } from '../repositories/feedback.repository.js'

// ─── Palavras-chave para análise de sentimento (case-insensitive) ──
const POSITIVE_KEYWORDS = ['ótimo', 'bom', 'excelente']
const NEGATIVE_KEYWORDS = ['ruim', 'lento', 'erro']

export function analyzeSentiment(text: string): Sentiment {
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

  insertFeedback(feedback)

  return feedback
}

export function getAllFeedbacks(): Feedback[] {
  return findAllFeedbacks()
}
