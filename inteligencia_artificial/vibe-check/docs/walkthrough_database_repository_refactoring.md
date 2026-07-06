# Walkthrough: Refatoração Database & Repository

## Resumo

Refatoração do código monolítico do `feedback-service.ts` em camadas distintas seguindo o **Repository Pattern**, separando conexão, migrations, acesso a dados e lógica de negócio.

## Estrutura Final

```
src/
├── database/
│   ├── connection.ts           ← Singleton better-sqlite3 + closeDatabase()
│   ├── migrations.ts           ← DDL com runMigrations()
│   └── index.ts                ← Barrel export
│
├── repositories/
│   ├── feedback.repository.ts      ← CRUD com prepared statements lazy
│   └── feedback.repository.spec.ts ← 8 testes unitários
│
├── services/
│   ├── feedback-service.ts         ← Apenas regras de negócio
│   └── feedback-service.spec.ts    ← 25 testes (imports atualizados)
│
├── controllers/                    (sem alterações)
├── routes/                         (sem alterações)
└── types/                          (sem alterações)
```

## Arquivos Criados

| Arquivo | Descrição |
|---|---|
| [connection.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/database/connection.ts) | Singleton de conexão, WAL mode, path `data/database.db` |
| [migrations.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/database/migrations.ts) | `runMigrations()` — DDL explícita |
| [index.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/database/index.ts) | Barrel export |
| [feedback.repository.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/repositories/feedback.repository.ts) | `insertFeedback`, `findAllFeedbacks`, `deleteAllFeedbacks` |
| [feedback.repository.spec.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/repositories/feedback.repository.spec.ts) | 8 testes unitários do repository |

## Arquivos Modificados

| Arquivo | Mudança |
|---|---|
| [feedback-service.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.ts) | Removida toda lógica de DB, delega ao repository |
| [feedback-service.spec.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.spec.ts) | Imports atualizados (database/ e repositories/) |
| [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/server.ts) | Adicionado `runMigrations()` na inicialização |
| [.gitignore](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/.gitignore) | Adicionado `data/` |

## Decisão Técnica: Lazy Prepared Statements

> [!IMPORTANT]
> Os prepared statements no repository precisaram ser **lazy-initialized** via `ensureStatements()`. O motivo: quando o módulo é importado, o código top-level executa imediatamente — mas a tabela `feedbacks` ainda não existe (pois `runMigrations()` ainda não foi chamada). A solução foi adiar a criação dos statements para a primeira chamada de operação.

## Verificação

### Testes
```
✓ src/repositories/feedback.repository.spec.ts (8 tests) 11ms
✓ src/services/feedback-service.spec.ts (25 tests) 22ms

Test Files  2 passed (2)
     Tests  33 passed (33)
  Duration  246ms
```

### Build
```
> tsc
(sem erros)
```
