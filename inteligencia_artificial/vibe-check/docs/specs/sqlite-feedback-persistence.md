# Spec: Persistência de Feedbacks com SQLite

> **Status:** Draft
> **Criado em:** 2026-07-06
> **Autor:** VibeCheck Team
> **Versão:** 1.0

---

## 1. Contexto e Motivação

Atualmente, conforme definido no [SDD](../core/sdd.md), o VibeCheck utiliza um **In-Memory Array** como mecanismo de armazenamento. Isso significa que todos os feedbacks são perdidos sempre que o servidor é reiniciado.

O [PRD](../core/prd.md) define que o sistema deve "salvar" feedbacks e "retornar o objeto salvo", o que implica durabilidade dos dados. Para evoluir o MVP em direção a uma solução robusta, esta spec propõe a migração para o **SQLite** como banco de dados local, utilizando a biblioteca **`better-sqlite3`**.

### Por que SQLite?

| Critério               | SQLite                                      |
|------------------------|---------------------------------------------|
| Complexidade de Setup  | Zero — arquivo único, sem servidor externo   |
| Performance            | Excelente para cargas de leitura/escrita locais |
| Portabilidade          | Banco é um único arquivo `.db`              |
| Compatibilidade Node   | Driver nativo síncrono (`better-sqlite3`)   |
| Adequação ao MVP       | Ideal — sem overhead de infraestrutura      |

---

## 2. Objetivos

1. **Persistir** todos os feedbacks em um banco SQLite local (`database.db`)
2. **Manter** total compatibilidade com a API existente (zero breaking changes)
3. **Preservar** o contrato de anonimato definido no PRD (sem IP, User-ID ou e-mail)
4. **Garantir** isolamento completo nos testes (banco `:memory:`)
5. **Manter** a arquitetura de camadas do SDD: `Routes → Controller → Service`

---

## 3. Fora do Escopo

- Migrações de schema (não necessário para primeira versão)
- Paginação de resultados no `GET /feedbacks`
- Backup automatizado do banco
- Criptografia dos dados em repouso
- Alterações nos endpoints ou contratos de API

---

## 4. Schema do Banco de Dados

### 4.1 Tabela `feedbacks`

```sql
CREATE TABLE IF NOT EXISTS feedbacks (
  id         TEXT PRIMARY KEY,          -- UUID v4
  content    TEXT NOT NULL,             -- Texto do feedback (10-500 chars)
  sentiment  TEXT NOT NULL,             -- 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'
  created_at TEXT NOT NULL              -- ISO-8601 timestamp
);
```

> **Nota sobre naming convention:** A coluna usa `created_at` (snake_case) por convenção de banco de dados, sendo mapeada para `createdAt` (camelCase) na camada de aplicação TypeScript.

### 4.2 Mapeamento de Tipos

| Coluna       | Tipo SQL | Tipo TypeScript          | Validação                          |
|--------------|----------|--------------------------|------------------------------------|
| `id`         | TEXT     | `string` (UUID v4)       | Gerado automaticamente com `uuid`  |
| `content`    | TEXT     | `string`                 | 10 ≤ length ≤ 500 (regra PRD)     |
| `sentiment`  | TEXT     | `Sentiment` (enum)       | POSITIVE \| NEGATIVE \| NEUTRAL   |
| `created_at` | TEXT     | `string` (ISO-8601)      | Gerado automaticamente com `Date`  |

---

## 5. Arquitetura Proposta

### 5.1 Diagrama de Camadas

```
┌──────────────────────────────────────────────────┐
│                   HTTP Client                     │
└───────────────────────┬──────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────┐
│              Routes (feedback-routes.ts)           │
│         POST /feedbacks  ·  GET /feedbacks         │
└───────────────────────┬──────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────┐
│          Controller (feedback-controller.ts)       │
│     createFeedbackHandler · listFeedbacksHandler   │
└───────────────────────┬──────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────┐
│            Service (feedback-service.ts)            │
│  ┌─────────────────────────────────────────────┐  │
│  │  analyzeSentiment()                          │  │
│  │  createFeedback()   → INSERT                 │  │
│  │  getAllFeedbacks()   → SELECT                 │  │
│  │  clearFeedbacks()   → DELETE (apenas testes) │  │
│  │  closeDatabase()    → close (ciclo de vida)  │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────┬──────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────┐
│              SQLite (better-sqlite3)               │
│  ┌─ PRODUÇÃO: ./database.db (WAL mode)          │ │
│  └─ TESTES:   :memory:                           │ │
└──────────────────────────────────────────────────┘
```

### 5.2 Estrutura de Pastas (após implementação)

```text
/src
    /controllers
        feedback-controller.ts     # Sem alterações
    /routes
        feedback-routes.ts         # Sem alterações
    /services
        feedback-service.ts        # MODIFICADO — SQLite em vez de array
        feedback-service.spec.ts   # MODIFICADO — novos testes de persistência
    /types
        feedback.ts                # Sem alterações
    server.ts                      # Sem alterações
```

---

## 6. Detalhamento da Implementação

### 6.1 Dependências

| Pacote              | Tipo | Versão   | Justificativa                                  |
|---------------------|------|----------|-------------------------------------------------|
| `better-sqlite3`    | prod | ^12.x    | Driver SQLite síncrono e performático para Node  |
| `@types/better-sqlite3` | dev | ^7.x | Tipagens TypeScript para o driver               |

> **Nota:** Ambas as dependências já estão presentes no `package.json` atual.

### 6.2 Arquivo `feedback-service.ts` — Detalhamento

#### 6.2.1 Conexão e Inicialização

```typescript
import Database from 'better-sqlite3'

// Banco em memória para testes, arquivo local para dev/prod
const isTestEnv = process.env.NODE_ENV === 'test'
const dbPath = isTestEnv ? ':memory:' : (process.env.DATABASE_PATH ?? 'database.db')
const db = new Database(dbPath)

// WAL mode melhora a performance de escrita concorrente
if (!isTestEnv) {
  db.pragma('journal_mode = WAL')
}
```

**Decisões de design:**
- `DATABASE_PATH` como variável de ambiente permite configurar o caminho em diferentes ambientes
- WAL (Write-Ahead Logging) habilitado apenas fora de testes para melhor performance de I/O
- Banco `:memory:` em testes garante isolamento e velocidade

#### 6.2.2 DDL (Data Definition Language)

```typescript
db.exec(`
  CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`)
```

O uso de `CREATE TABLE IF NOT EXISTS` garante idempotência — o schema é criado automaticamente na primeira execução e ignorado nas subsequentes.

#### 6.2.3 Prepared Statements

```typescript
const insertStmt = db.prepare(
  'INSERT INTO feedbacks (id, content, sentiment, created_at) VALUES (?, ?, ?, ?)'
)
const selectAllStmt = db.prepare(
  'SELECT * FROM feedbacks ORDER BY created_at DESC'
)
const deleteAllStmt = db.prepare(
  'DELETE FROM feedbacks'
)
```

**Justificativa:** Prepared statements são compilados uma vez e reutilizados, oferecendo:
- **Performance:** Evita re-parsing da query a cada chamada
- **Segurança:** Proteção nativa contra SQL injection via parametrização

#### 6.2.4 Operações CRUD

```typescript
// CREATE
export function createFeedback(input: CreateFeedbackInput): Feedback {
  // Validação mantida conforme PRD (10-500 caracteres)
  if (input.content.length < 10 || input.content.length > 500) {
    throw new Error('Feedback must be between 10 and 500 characters')
  }

  const feedback: Feedback = {
    id: uuidv4(),
    content: input.content,
    sentiment: analyzeSentiment(input.content),
    createdAt: new Date().toISOString(),
  }

  insertStmt.run(feedback.id, feedback.content, feedback.sentiment, feedback.createdAt)

  return feedback
}

// READ
export function getAllFeedbacks(): Feedback[] {
  const rows = selectAllStmt.all() as DatabaseRow[]
  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    sentiment: row.sentiment as Sentiment,
    createdAt: row.created_at,  // snake_case → camelCase
  }))
}
```

#### 6.2.5 Funções Auxiliares (Ciclo de Vida)

```typescript
// Limpa todos os registros — usado apenas em testes (beforeEach)
export function clearFeedbacks(): void {
  deleteAllStmt.run()
}

// Fecha a conexão com o banco — usado apenas em testes (afterAll)
export function closeDatabase(): void {
  db.close()
}
```

---

## 7. Impacto nas Camadas Existentes

| Camada     | Arquivo                    | Alteração Necessária |
|------------|----------------------------|----------------------|
| Types      | `feedback.ts`              | ❌ Nenhuma            |
| Routes     | `feedback-routes.ts`       | ❌ Nenhuma            |
| Controller | `feedback-controller.ts`   | ❌ Nenhuma            |
| Service    | `feedback-service.ts`      | ✅ Reescrita completa |
| Config     | `.gitignore`               | ✅ Adicionar `*.db` e `*.db-journal` |

> **Benefício da arquitetura em camadas:** A mudança de armazenamento é completamente encapsulada na camada de Service. Nenhuma outra camada precisa saber que o backend mudou de array para SQLite.

---

## 8. Estratégia de Testes

### 8.1 Abordagem

- **Banco em memória** (`NODE_ENV=test` → `:memory:`) para cada suíte de testes
- **`beforeEach`** → `clearFeedbacks()` para limpar dados entre testes
- **`afterAll`** → `closeDatabase()` para liberar recursos

### 8.2 Cenários de Teste Existentes (mantidos)

| Grupo                          | # Testes | Expectativa |
|--------------------------------|----------|-------------|
| Validação de conteúdo          | 5        | ✅ Passam sem alteração |
| Análise de sentimento          | 8        | ✅ Passam sem alteração |
| Estrutura do feedback criado   | 5        | ✅ Passam sem alteração |

### 8.3 Novos Cenários de Teste (persistência)

| # | Cenário                                                  | Critério de Aceite |
|---|----------------------------------------------------------|--------------------|
| 1 | Deve persistir o feedback criado no banco de dados       | `getAllFeedbacks()` retorna o item inserido |
| 2 | Deve retornar uma lista vazia quando não há feedbacks    | Array vazio `[]` retornado |
| 3 | Deve retornar múltiplos feedbacks persistidos            | N itens inseridos → N retornados |
| 4 | Deve retornar feedbacks ordenados por data (DESC)        | Primeiro item = mais recente |
| 5 | Deve mapear corretamente `created_at` → `createdAt`     | Campo `createdAt` presente e válido no retorno |
| 6 | Deve isolar dados entre testes (`beforeEach`)            | `clearFeedbacks()` zera o banco |
| 7 | Deve preservar integridade com caracteres especiais      | Acentos (ã, é) e emojis (🚀) persistidos corretamente |

---

## 9. Configuração de Ambiente

### 9.1 Variáveis de Ambiente

| Variável         | Default       | Descrição                             |
|------------------|---------------|---------------------------------------|
| `DATABASE_PATH`  | `database.db` | Caminho do arquivo do banco SQLite    |
| `NODE_ENV`       | —             | Quando `test`, usa banco `:memory:`   |
| `PORT`           | `3333`        | Porta do servidor (já existente)      |

### 9.2 `.gitignore`

```gitignore
# SQLite
*.db
*.db-journal
```

> **Nota:** Esses padrões já estão presentes no `.gitignore` atual.

---

## 10. Riscos e Mitigações

| Risco                                          | Probabilidade | Impacto | Mitigação                                               |
|------------------------------------------------|---------------|---------|----------------------------------------------------------|
| Corrupção do arquivo `.db` em crash inesperado | Baixa         | Alto    | WAL mode oferece recovery automático                     |
| Lock de escrita em acessos concorrentes        | Baixa         | Médio   | SQLite com WAL suporta reads concorrentes + 1 write      |
| Crescimento descontrolado do banco             | Média         | Baixo   | Futuro: implementar rotação/paginação (fora do escopo)   |
| Dependência nativa (`better-sqlite3`)          | Baixa         | Médio   | Binding C compilado na instalação via `pnpm install`     |

---

## 11. Observação sobre Estado Atual do Projeto

> [!WARNING]
> O arquivo-fonte `src/services/feedback-service.ts` **não existe** atualmente no projeto. Apenas a versão compilada em `dist/services/feedback-service.js` está disponível. O arquivo de testes `feedback-service.spec.ts` também está ausente. A implementação descrita nesta spec requer a **criação** desses arquivos.

---

## 12. Checklist de Validação

- [ ] `feedback-service.ts` criado em `src/services/` com SQLite
- [ ] Prepared statements para INSERT, SELECT e DELETE
- [ ] WAL mode habilitado em dev/prod
- [ ] Banco `:memory:` em testes
- [ ] `.gitignore` com `*.db` e `*.db-journal`
- [ ] 25+ testes passando (`pnpm test`)
- [ ] Teste de persistência entre reinícios do servidor (manual)
- [ ] API `POST /feedbacks` e `GET /feedbacks` funcionando sem alteração de contrato
- [ ] Nenhum dado pessoal (IP, User-ID, e-mail) armazenado
