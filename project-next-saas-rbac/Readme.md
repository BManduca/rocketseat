# Next.js SaaS + RBAC

Boilerplate completo para aplicação SaaS *multi-tenant* desenvolvida em arquitetura Monorepo, incluindo autenticação flexível, gerenciamento de organizações, controle de acesso baseado em papéis e permissões (RBAC / ABAC) com CASL, e suporte a múltiplos projetos.

---

## 🛠️ Tecnologias & Arquitetura

O projeto é estruturado em um **Monorepo** gerenciado pelo **Turborepo** e **pnpm Workspaces**:

### Apps & Pacotes

- **`apps/api`**: Backend construído com **Fastify**, **TypeScript**, **Prisma ORM** (PostgreSQL), **Zod** (validação e rotas tipadas com `fastify-type-provider-zod`), **Fastify JWT**, **Swagger/OpenAPI** (`/docs`) e testes E2E com **Vitest**.
- **`packages/auth`**: Biblioteca isomórfica de autorização **RBAC/ABAC** utilizando **CASL** (`@casl/ability`). Define as regras de permissões, papéis (Roles) e sujeitos (Subjects).
- **`packages/env`**: Pacote centralizado para validação de variáveis de ambiente do servidor e cliente utilizando `@t3-oss/env-nextjs` e Zod.
- **`config/`**: Configurações compartilhadas de ESLint, Prettier e TypeScript.

---

## 📌 Funcionalidades

### 🔐 Autenticação (Auth)
- [x] Autenticação com e-mail & senha (`POST /sessions/password`)
- [x] Autenticação via conta do GitHub OAuth (`POST /sessions/github`)
- [x] Criação de nova conta de usuário (`POST /users`)
- [x] Obtenção do perfil do usuário autenticado (`GET /profile`)
- [x] Solicitação de recuperação de senha por e-mail (`POST /password/recover`)
- [x] Redefinição de senha com token (`POST /password/reset`)

### 🏢 Organizações (Organizations)
- [x] Criar uma nova organização (`POST /organizations`)
- [x] Listar organizações às quais o usuário pertence (`GET /organizations`)
- [x] Obter detalhes de uma organização pelo slug (`GET /organizations/:slug`)
- [x] Obter vínculo/papel (*membership*) do usuário na organização (`GET /organizations/:slug/membership`)
- [x] Atualizar dados de uma organização (`PUT /organizations/:slug`)
- [x] Encerramento / exclusão de organização (`DELETE /organizations/:slug`)
- [x] Transferir propriedade da organização (*transfer ownership*) (`PATCH /organizations/:slug/owner`)

### 📁 Projetos (Projects)
- [x] Listar projetos pertencentes a uma organização (`GET /organizations/:slug/projects`)
- [x] Obter detalhes de um projeto específico (`GET /organizations/:slug/projects/:projectId`)
- [x] Criar um novo projeto (`POST /organizations/:slug/projects`)
- [x] Atualizar dados de um projeto (`PUT /organizations/:slug/projects/:projectId`)
- [x] Deletar um projeto (`DELETE /organizations/:slug/projects/:projectId`)

### 📩 Convites (Invites)
- [ ] Convidar um novo membro por e-mail e papel (`ADMIN`, `MEMBER`, `BILLING`)
- [ ] Aceitar um convite para entrar na organização
- [ ] Revogar um convite pendente

### 👥 Membros (Members)
- [ ] Listar membros de uma organização
- [ ] Atualizar papel de um membro da organização
- [ ] Remover um membro da organização

### 💳 Cobrança (Billing)
- [ ] Consultar detalhes de faturamento/cobrança da organização ($20 por projeto / $10 por membro, exceto papel de billing)

---

## 🛡️ Controle de Acesso (RBAC & Permissões)

### Papéis (Roles)
- **Owner**: Proprietário da organização (possui todas as permissões, incluindo a transferência de propriedade).
- **ADMIN**: Administrador da organização.
- **MEMBER**: Membro regular (desenvolvedor/colaborador).
- **BILLING**: Responsável financeiro da organização.

### Matriz de Permissões

| Ação | Administrador (ADMIN) | Membro (MEMBER) | Cobrança (BILLING) |
| :--- | :---: | :---: | :---: |
| Atualizar Organização | ⚠️ *(Apenas se for Dono)* | ❌ | ❌ |
| Encerrar/Deletar Organização | ✅ | ❌ | ❌ |
| Transferir Propriedade | ⚠️ *(Apenas se for Dono)* | ❌ | ❌ |
| Convidar Membro | ✅ | ❌ | ❌ |
| Revogar Convite | ✅ | ❌ | ❌ |
| Listar Membros | ✅ | ✅ | ✅ |
| Atualizar Papel de Membro | ✅ | ❌ | ❌ |
| Deletar Membro | ✅ | ⚠️ *(Apenas o próprio usuário sair)* | ❌ |
| Listar Projetos | ✅ | ✅ | ✅ |
| Criar Novo Projeto | ✅ | ✅ | ❌ |
| Atualizar Projeto | ✅ | ⚠️ *(Apenas se for Autor)* | ❌ |
| Deletar Projeto | ✅ | ⚠️ *(Apenas se for Autor)* | ❌ |
| Visualizar Cobrança | ✅ | ❌ | ✅ |
| Exportar Dados de Cobrança | ✅ | ❌ | ✅ |

> **Legenda**:  
> ✅ = Permitido | ❌ = Não permitido | ⚠️ = Permitido com condições (ABAC)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js**: `^18.0.0` ou superior
- **pnpm**: `^9.0.0`
- **Docker** & **Docker Compose** (para rodar o banco de dados PostgreSQL)

### 1. Clonar o repositório e instalar dependências
```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente
Crie os arquivos `.env` baseando-se nos exemplos `.env.example`:
```bash
cp .env.example .env
```

### 3. Subir o Banco de Dados com Docker
```bash
docker compose up -d
```

### 4. Executar Migrações e Seed do Banco
```bash
pnpm db:migrate
pnpm db:seed
```

### 5. Executar a Aplicação em Desenvolvimento
```bash
pnpm dev
```

A API estará rodando por padrão em `http://localhost:3333`.

---

## 📑 Documentação da API (Swagger)

Com a API rodando, você pode acessar a documentação interativa OpenAPI / Swagger UI no seguinte endereço:

👉 **[http://localhost:3333/docs](http://localhost:3333/docs)**

---

## 🧪 Testes E2E

Para rodar a suíte de testes ponta a ponta (E2E) no backend:

```bash
pnpm test
```

---

## 📚 Documentações Adicionais

Confira o diretório [`docs/`](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/docs) para guias e detalhes adicionais:
- [Setup e Guias Iniciais](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/docs/setup.md)
- [Integração OAuth com GitHub](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/docs/github-oauth-apps.md)
- [Configuração do Prisma Studio](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/docs/prisma-studio.md)
- [Plano de Implementação de Testes E2E](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/docs/testes-e2e-plano-implementacao.md)
