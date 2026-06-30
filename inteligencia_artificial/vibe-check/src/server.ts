import Fastify from 'fastify'

import { feedbackRoutes } from './routes/feedback-routes.js'

const app = Fastify({ logger: true })

app.register(feedbackRoutes)

const PORT = Number(process.env.PORT) || 3333

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 VibeCheck server running on http://localhost:${PORT}`)
})
