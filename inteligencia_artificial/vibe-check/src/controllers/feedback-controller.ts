import type { FastifyReply, FastifyRequest } from 'fastify'

import type { CreateFeedbackInput } from '../types/feedback.js'
import { createFeedback, getAllFeedbacks } from '../services/feedback-service.js'

export async function createFeedbackHandler(
  request: FastifyRequest<{ Body: CreateFeedbackInput }>,
  reply: FastifyReply,
): Promise<void> {
  try {
    const { content } = request.body

    const feedback = createFeedback({ content })

    reply.status(201).send(feedback)
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message })
    }
  }
}

export async function listFeedbacksHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const feedbacks = getAllFeedbacks()

  reply.status(200).send(feedbacks)
}
