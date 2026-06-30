import type { FastifyInstance } from 'fastify'

import { createFeedbackHandler, listFeedbacksHandler } from '../controllers/feedback-controller.js'

export async function feedbackRoutes(app: FastifyInstance): Promise<void> {
  app.post('/feedbacks', createFeedbackHandler)
  app.get('/feedbacks', listFeedbacksHandler)
}
