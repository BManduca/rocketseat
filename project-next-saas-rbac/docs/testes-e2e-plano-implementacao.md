# Configuração da Suíte de Testes Automatizados E2E no `@saas/api`

Este plano estabelece a infraestrutura e os primeiros testes E2E (End-to-End) automatizados para a API `@saas/api` utilizando **Vitest** e a capacidade nativa de testes em memória do **Fastify** (`app.inject()`).

## Decisões de Arquitetura

1. **Separação de `app.ts` e `server.ts`**:
   - `src/http/app.ts`: Constrói e exporta a instância do Fastify com todas as rotas, plugins e schemas.
   - `src/http/server.ts`: Importa `app` e executa o `app.listen({ port: env.SERVER_PORT })`.
   - *Vantagem*: Permite que a suíte de testes importe o `app` sem precisar subir o servidor de fato em uma porta de rede.

2. **Ferramenta de Teste (Vitest)**:
   - **Vitest**: Test runner extremamente rápido e com suporte nativo a TypeScript / Zod / ESM.
   - **Fastify `app.inject()`**: Envia requisições simuladas diretamente para a pilha de roteamento do Fastify de forma ultra veloz e isolada.

---

## Modificações Propostas

### 1. Separação da Instância do Fastify

#### [NEW] [app.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/app.ts)
- Isolar a criação e registro de plugins/rotas do Fastify em um export `export const app = fastify().withTypeProvider<ZodTypeProvider>()`.

#### [MODIFY] [server.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/server.ts)
- Importar `app` de `./app` e manter apenas a inicialização do listener `app.listen()`.

---

### 2. Configuração do Vitest na API

#### [MODIFY] [package.json (apps/api)](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/package.json)
- Adicionar `vitest` e `vite-tsconfig-paths` em `devDependencies`.
- Adicionar scripts de teste:
  - `"test": "vitest run"`
  - `"test:watch": "vitest"`

#### [NEW] [vitest.config.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/vitest.config.ts)
- Criar configuração do Vitest integrando com caminhos do TypeScript (`tsconfig-paths`).

---

### 3. Primeiros Testes E2E Automatizados

#### [NEW] [create-account.e2e-spec.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/routes/auth/create-account.e2e-spec.ts)
- Testar a criação de conta via `POST /users`:
  - Teste de sucesso (criação de novo usuário -> status 201).
  - Teste de falha (tentativa de criar usuário com e-mail duplicado -> status 400/409).

#### [NEW] [authenticate-with-password.e2e-spec.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/routes/auth/authenticate-with-password.e2e-spec.ts)
- Testar a autenticação de usuário via `POST /sessions`:
  - Recebimento do JWT token válido após login.

---

## Plano de Verificação

### Execução dos Testes Automatizados
- Executar no terminal:
  ```bash
  pnpm --filter @saas/api test
  ```
- Validar se a suíte E2E executa e passa 100% verde sem erros.
