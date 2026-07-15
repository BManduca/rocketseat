import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

// importação de rotas
import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// serailização dos dados =>  transformação dos dados de entrada e saídados endpoints
app.setSerializerCompiler(serializerCompiler)
// validação dos dados'
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(createAccount)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🔥 HTTP server running!')
  })
