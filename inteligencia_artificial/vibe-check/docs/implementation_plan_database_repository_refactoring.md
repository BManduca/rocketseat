# Refatoração: Camada de Database & Repository

Separar o código monolítico do [feedback-service.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.ts) em camadas distintas seguindo o **Repository Pattern**, melhorando a separação de responsabilidades, testabilidade e manutenibilidade.

## Motivação

Atualmente, o `feedback-service.ts` acumula **3 responsabilidades**:

| Responsabilidade | Linhas | Problema |
|---|---|---|
| Conexão com o banco | L16-L23 | Acoplada ao módulo de negócio |
| DDL / Schema | L26-L33 | Misturada com lógica de serviço |
| Queries + Regras de negócio | L36-L104 | Viola SRP |

## Estrutura Proposta

```
src/
├── database/
│   ├── connection.ts          ← Singleton de conexão better-sqlite3
│   ├── migrations.ts          ← DDL (CREATE TABLE IF NOT EXISTS)
│   └── index.ts               ← Barrel export
│
├── repositories/
│   └── feedback.repository.ts ← Prepared statements (insert, selectAll, deleteAll)
│
├── services/
│   ├── feedback-service.ts    ← Apenas regras de negócio (validação + sentimento)
│   └── feedback-service.spec.ts ← Testes atualizados
│
├── controllers/               (sem alterações)
├── routes/                    (sem alterações)
└── types/                     (sem alterações)
```

## User Review Required

> [!IMPORTANT]
> **Tipo da interface `DatabaseRow`**: Atualmente essa interface está no `feedback-service.ts`. No plano, ela será movida para `repositories/feedback.repository.ts`, pois é um detalhe de implementação do acesso a dados. Concorda com essa localização?

> [!IMPORTANT]
> **Funções auxiliares de teste (`clearFeedbacks`, `closeDatabase`)**: No plano, `clearFeedbacks` será exposta pelo repository e `closeDatabase` será exposta pelo `connection.ts`. O service não exportará mais essas funções diretamente — os testes importarão dos módulos corretos. Isso muda as importações do spec, mas melhora a coesão.

## Open Questions

Nenhuma questão em aberto.

---

## Proposed Changes

### Componente 1: Database Layer

#### [NEW] [connection.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/database/connection.ts)

Responsabilidade: **singleton de conexão** com o `better-sqlite3`.

```typescript
import Database from 'better-sqlite3'

const isTestEnv = process.env.NODE_ENV === 'test'
const dbPath = isTestEnv ? ':memory:' : (process.env.DATABASE_PATH ?? 'data/database.db')

const db = new Database(dbPath)

// WAL mode melhora a performance de escrita concorrente
if (!isTestEnv) {
  db.pragma('journal_mode = WAL')
}

export { db }

export function closeDatabase(): void {
  db.close()
}
```

**Decisões de design:**
- O path do banco em produção muda para `data/database.db` (pasta dedicada) em vez de ficar na raiz do projeto. Isso mantém a raiz limpa.
- `closeDatabase()` vive aqui porque é uma operação de infraestrutura, não de negócio.

---

#### [NEW] [migrations.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/database/migrations.ts)

Responsabilidade: **DDL** — criação de tabelas.

```typescript
import { db } from './connection.js'

export function runMigrations(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      sentiment TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)
}
```

**Decisões de design:**
- Função explícita `runMigrations()` em vez de execução no top-level. Isso dá controle sobre **quando** as migrations rodam (no server.ts para produção, no `beforeAll` dos testes).
- Facilita futuras adições de tabelas ou alterações de schema.

---

#### [NEW] [index.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/database/index.ts)

Barrel export para simplificar importações.

```typescript
export { db, closeDatabase } from './connection.js'
export { runMigrations } from './migrations.js'
```

---

### Componente 2: Repository Layer

#### [NEW] [feedback.repository.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/repositories/feedback.repository.ts)

Responsabilidade: **CRUD puro** — prepared statements SQL.

```typescript
import { db } from '../database/index.js'
import type { Feedback } from '../types/feedback.js'
import type { Sentiment } from '../types/feedback.js'

// Tipo interno para rows retornadas pelo banco (snake_case)
interface FeedbackRow {
  id: string
  content: string
  sentiment: string
  created_at: string
}

// Prepared statements (reutilizáveis, performáticos)
const insertStmt = db.prepare(
  'INSERT INTO feedbacks (id, content, sentiment, created_at) VALUES (?, ?, ?, ?)'
)
const selectAllStmt = db.prepare(
  'SELECT * FROM feedbacks ORDER BY created_at DESC'
)
const deleteAllStmt = db.prepare(
  'DELETE FROM feedbacks'
)

// ─── Operações ──────────────────────────────────────────────────

export function insertFeedback(feedback: Feedback): void {
  insertStmt.run(feedback.id, feedback.content, feedback.sentiment, feedback.createdAt)
}

export function findAllFeedbacks(): Feedback[] {
  const rows = selectAllStmt.all() as FeedbackRow[]
  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    sentiment: row.sentiment as Sentiment,
    createdAt: row.created_at, // snake_case → camelCase
  }))
}

export function deleteAllFeedbacks(): void {
  deleteAllStmt.run()
}
```

**Decisões de design:**
- A interface `FeedbackRow` (antigo `DatabaseRow`) fica aqui — é detalhe de implementação do acesso a dados.
- O mapeamento `created_at → createdAt` acontece **no repository**, que é a fronteira entre SQL e TypeScript.
- Nomes semânticos: `insertFeedback`, `findAllFeedbacks`, `deleteAllFeedbacks`.

---

### Componente 3: Service Layer (refatoração)

#### [MODIFY] [feedback-service.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.ts)

O service fica **limpo** — apenas regras de negócio.

```typescript
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
```

**O que mudou:**
- ❌ Removido: `Database`, `db`, `dbPath`, `isTestEnv`, `pragma`, DDL, prepared statements, `DatabaseRow`, `clearFeedbacks`, `closeDatabase`
- ✅ Mantido: `analyzeSentiment`, `createFeedback`, `getAllFeedbacks`
- O service agora **delega** a persistência ao repository

---

### Componente 4: Testes do Repository (novo)

#### [NEW] [feedback.repository.spec.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/repositories/feedback.repository.spec.ts)

Testes unitários focados **exclusivamente na camada de acesso a dados** — sem regras de negócio.

```typescript
import { describe, it, expect, beforeEach, afterAll } from 'vitest'

import { runMigrations, closeDatabase } from '../database/index.js'
import { Sentiment } from '../types/feedback.js'
import type { Feedback } from '../types/feedback.js'

import {
  insertFeedback,
  findAllFeedbacks,
  deleteAllFeedbacks,
} from './feedback.repository.js'

// ─── Setup ──────────────────────────────────────────────────────
runMigrations()

beforeEach(() => {
  deleteAllFeedbacks()
})

afterAll(() => {
  closeDatabase()
})

// Helper para criar um feedback válido
function makeFeedback(overrides?: Partial<Feedback>): Feedback {
  return {
    id: crypto.randomUUID(),
    content: 'Conteúdo de teste padrão para repositório',
    sentiment: Sentiment.NEUTRAL,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

// ─── 1. insertFeedback ──────────────────────────────────────────

describe('insertFeedback', () => {
  it('deve inserir um feedback e torná-lo recuperável', () => {
    const feedback = makeFeedback()
    insertFeedback(feedback)

    const all = findAllFeedbacks()
    expect(all).toHaveLength(1)
    expect(all[0].id).toBe(feedback.id)
  })

  it('deve inserir múltiplos feedbacks', () => {
    insertFeedback(makeFeedback())
    insertFeedback(makeFeedback())
    insertFeedback(makeFeedback())

    expect(findAllFeedbacks()).toHaveLength(3)
  })
})

// ─── 2. findAllFeedbacks ────────────────────────────────────────

describe('findAllFeedbacks', () => {
  it('deve retornar lista vazia quando não há registros', () => {
    expect(findAllFeedbacks()).toEqual([])
  })

  it('deve retornar feedbacks ordenados por data DESC', async () => {
    const first = makeFeedback({ createdAt: '2026-01-01T00:00:00.000Z' })
    const second = makeFeedback({ createdAt: '2026-06-01T00:00:00.000Z' })

    insertFeedback(first)
    insertFeedback(second)

    const all = findAllFeedbacks()
    expect(all[0].id).toBe(second.id)
    expect(all[1].id).toBe(first.id)
  })

  it('deve mapear created_at → createdAt corretamente', () => {
    const feedback = makeFeedback()
    insertFeedback(feedback)

    const result = findAllFeedbacks()[0]
    expect(result.createdAt).toBe(feedback.createdAt)
    expect((result as unknown as Record<string, unknown>)['created_at']).toBeUndefined()
  })

  it('deve preservar caracteres especiais e emojis', () => {
    const content = 'Acentuação: ã, é, ç e emojis: 🚀🎉✨'
    const feedback = makeFeedback({ content })
    insertFeedback(feedback)

    expect(findAllFeedbacks()[0].content).toBe(content)
  })
})

// ─── 3. deleteAllFeedbacks ──────────────────────────────────────

describe('deleteAllFeedbacks', () => {
  it('deve remover todos os registros', () => {
    insertFeedback(makeFeedback())
    insertFeedback(makeFeedback())
    expect(findAllFeedbacks()).toHaveLength(2)

    deleteAllFeedbacks()
    expect(findAllFeedbacks()).toEqual([])
  })

  it('não deve lançar erro quando a tabela já está vazia', () => {
    expect(() => deleteAllFeedbacks()).not.toThrow()
  })
})
```

**Cobertura: 8 testes** focados em:
- Inserção unitária e múltipla
- Consulta vazia, ordenação DESC, mapeamento snake→camel
- Integridade com caracteres especiais
- Deleção com e sem dados

---

### Componente 5: Testes do Service (atualização)

#### [MODIFY] [feedback-service.spec.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.spec.ts)

Atualizar imports para buscar funções auxiliares dos módulos corretos. Os testes de persistência SQLite que estavam aqui **permanecem** — eles validam a integração service→repository.

```diff
 import { describe, it, expect, beforeEach, afterAll } from 'vitest'
 
 import { Sentiment } from '../types/feedback.js'
+import { runMigrations, closeDatabase } from '../database/index.js'
+import { deleteAllFeedbacks } from '../repositories/feedback.repository.js'
 
 import {
   createFeedback,
   getAllFeedbacks,
   analyzeSentiment,
-  clearFeedbacks,
-  closeDatabase,
 } from './feedback-service.js'

+// ─── Setup ─────────────────────────────────────────────────────
+runMigrations()
+
 // ─── Lifecycle ──────────────────────────────────────────────────

 beforeEach(() => {
-  clearFeedbacks()
+  deleteAllFeedbacks()
 })

 afterAll(() => {
   closeDatabase()
 })
```

**Sem alterações** nos `describe` blocks — todos os 25 testes continuam idênticos.

---

### Componente 6: Server (atualização)

#### [MODIFY] [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/server.ts)

Adicionar chamada de migrations na inicialização:

```diff
 import Fastify from 'fastify'
 
+import { runMigrations } from './database/index.js'
 import { feedbackRoutes } from './routes/feedback-routes.js'
 
 const app = Fastify({ logger: true })
 
+// Inicializa o schema do banco de dados
+runMigrations()
+
 app.register(feedbackRoutes)
```

---

### Componente 7: Configuração

#### [MODIFY] [.gitignore](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/.gitignore)

Adicionar a pasta `data/` ao `.gitignore`:

```diff
 *.db
 *.db-journal
+data/
```

---

## Resumo de Arquivos

| Ação | Arquivo | Responsabilidade |
|---|---|---|
| 🆕 Criar | `src/database/connection.ts` | Singleton de conexão |
| 🆕 Criar | `src/database/migrations.ts` | DDL |
| 🆕 Criar | `src/database/index.ts` | Barrel export |
| 🆕 Criar | `src/repositories/feedback.repository.ts` | CRUD SQL |
| 🆕 Criar | `src/repositories/feedback.repository.spec.ts` | Testes unitários do repository (8 testes) |
| ✏️ Modificar | `src/services/feedback-service.ts` | Remover DB, manter lógica |
| ✏️ Modificar | `src/services/feedback-service.spec.ts` | Atualizar imports |
| ✏️ Modificar | `src/server.ts` | Chamar `runMigrations()` |
| ✏️ Modificar | `.gitignore` | Ignorar `data/` |

---

## Verification Plan

### Automated Tests

```bash
# 25 testes do service + 8 testes do repository = 33 testes passando
pnpm test
```

### Manual Verification

```bash
# Compilação TypeScript sem erros
pnpm build

# Iniciar o servidor e verificar se database.db é criado em data/
pnpm dev
# → Conferir que data/database.db foi criado

# Testar endpoints manualmente
curl -X POST http://localhost:3333/feedbacks \
  -H 'Content-Type: application/json' \
  -d '{"content": "Este é um feedback de teste ótimo!"}'

curl http://localhost:3333/feedbacks
# → Deve retornar o feedback persistido
```
