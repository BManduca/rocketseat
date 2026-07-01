# Análise de Código e Boas Práticas - API VibeCheck

Esta análise avalia a estrutura atual da API **VibeCheck** desenvolvida com Fastify e TypeScript. O objetivo é identificar oportunidades de melhoria alinhadas com as melhores práticas de mercado, os recursos nativos do Fastify v5 e a segurança/robustez do código TypeScript.

---

## 1. Visão Geral da Arquitetura Atual

A aplicação está organizada em camadas simples e funcionais:
- **`server.ts`**: Inicializa o servidor Fastify e registra as rotas.
- **`routes/feedback-routes.ts`**: Registra os endpoints `/feedbacks` (GET e POST).
- **`controllers/feedback-controller.ts`**: Extrai os dados das requisições e envia para a camada de serviços, tratando erros locais via `try-catch`.
- **`services/feedback-service.ts`**: Contém as regras de negócio (validação de tamanho de caractere, análise de sentimento rudimentar) e persistência de dados em memória.
- **`types/feedback.ts`**: Define os tipos e enums estruturais.

Embora a API atenda aos requisitos funcionais básicos (MVP), há diversas oportunidades para elevar o nível do projeto em termos de **segurança, robustez de tipos, resiliência do servidor e eficiência**.

---

## 2. Oportunidades de Melhoria Identificadas

### 🔍 A. Validação de Entrada Descentralizada e Insegura
- **Problema**: O controller extrai `const { content } = request.body` sem validar se o corpo da requisição foi enviado ou se `content` é de fato uma string. Se o corpo vier vazio ou inválido, ocorrerá uma exceção em runtime no JavaScript antes mesmo de alcançar a validação no service.
- **Consequência**: Falta de segurança nas requisições HTTP e erros de runtime.
- **Recomendação**: Usar a validação de **JSON Schema** nativa do Fastify. O Fastify utiliza o compilador AJV sob o capô, sendo extremamente veloz e impedindo a execução de handlers de rotas com payloads inválidos.

### 🛡️ B. Tratamento Repetitivo de Erros nos Controllers
- **Problema**: O handler `createFeedbackHandler` usa blocos `try-catch` locais para capturar os erros disparados no service e retornar `400 Bad Request`. À medida que a API crescer, isso se tornará repetitivo e propenso a inconsistências de formatação de erros.
- **Consequência**: Código verboso e falta de padronização nas respostas de erro.
- **Recomendação**: Configurar um **Global Error Handler** no Fastify (`app.setErrorHandler`) para capturar e formatar erros de validação e de negócio em um único lugar.

### 🧪 C. Vazamento de Estado entre Testes Unitários
- **Problema**: A array `feedbacks` no `feedback-service.ts` é uma variável de escopo global no módulo (`const feedbacks: Feedback[] = []`). Não há um mecanismo exposto para limpar o banco de dados em memória entre os testes do Vitest.
- **Consequência**: Se o mesmo serviço de testes rodar em paralelo ou acumular dados, um teste pode influenciar o resultado de outro (falta de isolamento de estado).
- **Recomendação**: Exportar uma função auxiliar de limpeza (ex: `clearFeedbacks()`) usada em blocos `beforeEach` nos arquivos `.spec.ts`, ou isolar a persistência em uma classe instanciável.

### ⚡ D. Falta de Encerramento Gracioso (Graceful Shutdown)
- **Problema**: O servidor escuta a porta usando `app.listen(...)` simples. Em ambientes produtivos (ex: Docker, Kubernetes, Serverless), quando a aplicação recebe sinais de encerramento (`SIGTERM` ou `SIGINT`), ela é encerrada abruptamente.
- **Consequência**: Conexões ativas de clientes ou conexões de rede pendentes podem ser derrubadas violentamente, gerando erros para os usuários.
- **Recomendação**: Escutar sinais do sistema para encerrar o Fastify de forma limpa via `app.close()`.

### 📦 E. Configurações de TypeScript e Typings
- **Problema**: A dependência `@types/node` no `package.json` está fixada na versão `^26.0.1`. A versão 26 é inexistente (atualmente estamos na versão 20/22 ou superior, sendo que a versão do Node costuma seguir a numeração principal correspondente). Isso pode ser um erro de digitação ou pacote legado.
- **Problema**: No `tsconfig.json`, os testes unitários (`src/**/*.spec.ts`) estão explicitamente excluídos de `"exclude"`. Isso faz com que a IDE perca a inteligência de código (intellisense) e tipagem dentro dos arquivos de testes.
- **Recomendação**: Ajustar as versões de tipos e usar um `tsconfig.build.json` separado para o processo de build se for necessário excluir testes da compilação de produção.

---

## 3. Plano de Refatoração Proposto

Abaixo estão descritas as alterações sugeridas para cada arquivo da aplicação, melhorando-a significativamente.

### Passo 1: Ajustar dependências e tsconfig
Remover a exclusão dos testes no `tsconfig.json` para garantir que a IDE forneça inteligência de código completa nos arquivos `.spec.ts`.

#### Modificar tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*"]
}
```
*(Removido `"exclude": ["src/**/*.spec.ts"]` para que o Vitest e a IDE trabalhem com tipagem correta. No script de build, caso queira ignorar testes, pode-se usar uma configuração alternativa, ou apenas deixar o build ocorrer sabendo que arquivos de testes compilados não geram mal funcionamento)*

---

### Passo 2: Implementar Validação Nativa de Rotas no Fastify
Usando o validador nativo de JSON Schema no Fastify. Isso substitui validações rudimentares no controller.

#### Modificar src/routes/feedback-routes.ts
```typescript
import type { FastifyInstance } from 'fastify'

import { createFeedbackHandler, listFeedbacksHandler } from '../controllers/feedback-controller.js'

export async function feedbackRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    '/feedbacks',
    {
      schema: {
        body: {
          type: 'object',
          required: ['content'],
          properties: {
            content: {
              type: 'string',
              minLength: 10,
              maxLength: 500,
            },
          },
        },
      },
    },
    createFeedbackHandler,
  )

  app.get('/feedbacks', listFeedbacksHandler)
}
```

---

### Passo 3: Simplificar o Controller e Remover o `try-catch` Duplicado
Com a validação na rota e um manipulador de erro global, o controller não precisa lidar com erros de entrada ou tratamento de `try-catch` boilerplate.

#### Modificar src/controllers/feedback-controller.ts
```typescript
import type { FastifyReply, FastifyRequest } from 'fastify'

import type { CreateFeedbackInput } from '../types/feedback.js'
import { createFeedback, getAllFeedbacks } from '../services/feedback-service.js'

export async function createFeedbackHandler(
  request: FastifyRequest<{ Body: CreateFeedbackInput }>,
  reply: FastifyReply,
): Promise<void> {
  const { content } = request.body

  const feedback = createFeedback({ content })

  return reply.status(201).send(feedback)
}

export async function listFeedbacksHandler(
  _request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const feedbacks = getAllFeedbacks()

  return reply.status(200).send(feedbacks)
}
```

---

### Passo 4: Tratar Erros no Server e Adicionar Graceful Shutdown
Vamos registrar o `setErrorHandler` e o graceful shutdown no `server.ts`.

#### Modificar src/server.ts
```typescript
import Fastify from 'fastify'

import { feedbackRoutes } from './routes/feedback-routes.js'

const app = Fastify({ logger: true })

// Handler global para formatar e padronizar erros
app.setErrorHandler((error, request, reply) => {
  // Trata erros de validação gerados pelo AJV (Fastify Route Schema)
  if (error.validation) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
      validation: error.validation,
    })
  }

  // Trata erros de regra de negócio disparados pela aplicação
  if (error instanceof Error) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
    })
  }

  // Qualquer outro erro não previsto
  request.log.error(error)
  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  })
})

app.register(feedbackRoutes)

const PORT = Number(process.env.PORT) || 3333

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🚀 VibeCheck server running on http://localhost:${PORT}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

// Implementação de Graceful Shutdown
const signals = ['SIGINT', 'SIGTERM'] as const
for (const signal of signals) {
  process.on(signal, async () => {
    app.log.info(`Received ${signal}, closing server gracefully...`)
    try {
      await app.close()
      app.log.info('Server closed.')
      process.exit(0)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

start()
```

---

### Passo 5: Corrigir Isolamento de Estado nos Testes Unitários
No `feedback-service.ts`, adicionaremos uma função para limpar a array de feedbacks em memória e a chamaremos no setup dos testes.

#### Modificar src/services/feedback-service.ts
```typescript
import { v4 as uuidv4 } from 'uuid'

import { Sentiment, type CreateFeedbackInput, type Feedback } from '../types/feedback.js'

// Persistência in-memory (MVP)
let feedbacks: Feedback[] = []

// Palavras-chave para análise de sentimento (case-insensitive)
const POSITIVE_KEYWORDS = ['ótimo', 'bom', 'excelente']
const NEGATIVE_KEYWORDS = ['ruim', 'lento', 'erro']

function analyzeSentiment(text: string): Sentiment {
  const lowerText = text.toLowerCase()

  if (POSITIVE_KEYWORDS.some((word) => lowerText.includes(word))) {
    return Sentiment.POSITIVE
  }

  if (NEGATIVE_KEYWORDS.some((word) => lowerText.includes(word))) {
    return Sentiment.NEGATIVE
  }

  return Sentiment.NEUTRAL
}

export function createFeedback(input: CreateFeedbackInput): Feedback {
  // Validação redundante a nível de domínio (Domain Validation / Defesa)
  if (input.content.length < 10 || input.content.length > 500) {
    throw new Error('Feedback must be between 10 and 500 characters')
  }

  const feedback: Feedback = {
    id: uuidv4(),
    content: input.content,
    sentiment: analyzeSentiment(input.content),
    createdAt: new Date().toISOString(),
  }

  feedbacks.push(feedback)

  return feedback
}

export function getAllFeedbacks(): Feedback[] {
  return feedbacks
}

// Método auxiliar essencial para isolar o estado em testes
export function clearFeedbacks(): void {
  feedbacks = []
}
```

#### Modificar src/services/feedback-service.spec.ts
```typescript
import { describe, it, expect, beforeEach } from 'vitest'

import { createFeedback, clearFeedbacks } from './feedback-service.js'
import { Sentiment } from '../types/feedback.js'

describe('feedback-service', () => {
  // Limpar os feedbacks antes de cada teste individual para isolar o estado
  beforeEach(() => {
    clearFeedbacks()
  })

  // ... restante dos testes existentes permanece igual ...
```

---

## 4. Próximos Passos Recomendados

Se as modificações acima forem aprovadas, os seguintes passos adicionais podem elevar ainda mais o nível do projeto:

1. **Instalar Validador do Zod Integrado (Opcional)**:
   Se preferir usar Zod em vez de JSON Schema no Fastify, instale `@fastify/type-provider-zod` e `zod`. Isso simplifica ainda mais a definição de tipos TypeScript.
2. **Instalar um Linter/Formatter (Biome ou ESLint/Prettier)**:
   Garante a consistência de formatação de código no repositório.
3. **Subir a versão de tipos do Node**:
   Atualizar `@types/node` no `package.json` de `^26.0.1` para a versão real utilizada no ambiente de execução (ex: `^20.0.0` ou `^22.0.0`).
