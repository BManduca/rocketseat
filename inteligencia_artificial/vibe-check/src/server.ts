import Fastify from 'fastify'

import { runMigrations } from './database/index.js'
import { feedbackRoutes } from './routes/feedback-routes.js'

const app = Fastify({ logger: true })

// Inicializa o schema do banco de dados
runMigrations()

app.register(feedbackRoutes)

const PORT = Number(process.env.PORT) || 3333

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 VibeCheck server running on http://localhost:${PORT}`)
})
