# Walkthrough — Persistência com SQLite (VibeCheck)

## Resumo

Migração concluída do armazenamento temporário in-memory para persistência real com SQLite usando o driver síncrono `better-sqlite3`. Todos os **25 testes passaram** (18 existentes + 7 novos de persistência).

## Alterações Realizadas

### Dependências

| Arquivo | Alteração |
|---|---|
| [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/package.json) | Adicionado `better-sqlite3` (prod), `@types/better-sqlite3` (dev) e config `pnpm.onlyBuiltDependencies` |

### Configuração

| Arquivo | Alteração |
|---|---|
| [.gitignore](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/.gitignore) | Adicionados padrões `*.db` e `*.db-journal` |

### Código-fonte

| Arquivo | Alteração |
|---|---|
| [feedback-service.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.ts) | Substituído array in-memory por conexão SQLite, prepared statements para INSERT/SELECT/DELETE, mapeamento `created_at`→`createdAt`, WAL mode em produção, banco `:memory:` em testes |
| [feedback-service.spec.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.spec.ts) | Adicionados hooks `beforeEach`/`afterAll` para ciclo de vida do banco e 7 novos cenários de teste de persistência |

### Novos Cenários de Teste (7)

| # | Cenário | Status |
|---|---|---|
| 1 | Deve persistir o feedback criado no banco de dados | ✅ |
| 2 | Deve retornar uma lista vazia quando não há feedbacks | ✅ |
| 3 | Deve retornar múltiplos feedbacks persistidos | ✅ |
| 4 | Deve retornar feedbacks ordenados por data de criação (DESC) | ✅ |
| 5 | Deve mapear corretamente `created_at` → `createdAt` | ✅ |
| 6 | Deve isolar os dados entre testes (via `beforeEach`) | ✅ |
| 7 | Deve preservar integridade com caracteres especiais (acentos, emojis) | ✅ |

## Validação

```
✓ src/services/feedback-service.spec.ts (25 tests) 14ms
  ✓ validação de conteúdo (5)
  ✓ análise de sentimento (8)
  ✓ estrutura do feedback criado (5)
  ✓ persistência com SQLite (7)

Test Files  1 passed (1)
     Tests  25 passed (25)
  Duration  278ms
```

## Próximos Passos

Para completar a validação manual conforme a spec, execute:
1. `pnpm dev` → POST um feedback → `Ctrl+C` → `pnpm dev` → GET feedbacks → confirmar que o feedback persiste após reinício do servidor.
