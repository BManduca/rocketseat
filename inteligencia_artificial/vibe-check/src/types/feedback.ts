export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

export interface CreateFeedbackInput {
  content: string
}

export interface Feedback {
  id: string
  content: string
  sentiment: Sentiment
  createdAt: string
}
