# Suíte de Testes Automatizados E2E Implementada

Foi configurada a infraestrutura completa de testes End-to-End (E2E) automatizados na API do projeto (`@saas/api`), utilizando **Vitest** e a funcionalidade nativa de testes em memória do **Fastify** (`app.inject()`).

---

## 🛠️ O que foi feito

### 1. Separação de Responsabilidades (`app.ts` vs `server.ts`)
- **[NEW] [app.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/app.ts)**: Isola a instância do Fastify com todas as rotas, plugins (cors, jwt, swagger) e error handler.
- **[MODIFY] [server.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/server.ts)**: Apenas importa o `app` e executa o `app.listen()`.
- *Resultado*: Permite testar a API em memória nos arquivos de teste sem ocupar portas de rede.

---

### 2. Configuração do Vitest
- **[NEW] [vitest.config.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/vitest.config.ts)**: Configurado com suporte a resolução de aliases TypeScript (`@/*`) via `vite-tsconfig-paths` e detecção de arquivos `.e2e-spec.ts`.
- **[MODIFY] [package.json (api)](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/package.json)**:
  - Adicionado script `"test": "pnpm env:load vitest run"` (carrega o `.env` automaticamente).
  - Adicionado script `"test:watch": "pnpm env:load vitest"`.
- **[MODIFY] [package.json (raiz)](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/package.json)**:
  - Adicionado script `"test": "pnpm --filter @saas/api test"`.

---

### 3. Testes E2E Criados
- **[NEW] [create-account.e2e-spec.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/routes/auth/create-account.e2e-spec.ts)**:
  - Teste 1: Criação de conta de usuário válida (Status `201`).
  - Teste 2: Bloqueio de criação com e-mail duplicado (Status `400`).
- **[NEW] [authenticate-with-password.e2e-spec.ts](file:///Users/brunnomanduca/Documents/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/routes/auth/authenticate-with-password.e2e-spec.ts)**:
  - Teste 1: Autenticação de usuário com e-mail e senha corretos e retorno do JWT token (Status `201`).
  - Teste 2: Bloqueio de login com senha incorreta (Status `400`).

---

## 🧪 Resultados da Validação

Execução do comando `pnpm test`:

```bash
 ✓ src/http/routes/auth/create-account.e2e-spec.ts (2 tests) 339ms
     ✓ should be able to create a new user account
     ✓ should not be able to create a user with an existing email
 ✓ src/http/routes/auth/authenticate-with-password.e2e-spec.ts (2 tests) 354ms
     ✓ should be able to authenticate with valid email and password
     ✓ should not be able to authenticate with invalid password

 Test Files  2 passed (2)
      Tests  4 passed (4)
   Duration  938ms
```

---

## 🚀 Como Executar os Testes

Para rodar todos os testes E2E automatizados:
```bash
pnpm test
```

Para rodar os testes em modo *watch* (reexecuta ao salvar arquivos):
```bash
pnpm --filter @saas/api test:watch
```
