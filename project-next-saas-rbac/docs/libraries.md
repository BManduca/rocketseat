# Documentação de Bibliotecas do Projeto

Este documento apresenta uma visão geral das principais bibliotecas utilizadas no projeto, detalhando o que é cada uma, para que serve e exemplos reais de uso presentes no código.

---

## 1. Fastify (`fastify`)
- **O que é**: Um framework web de alta performance e baixo overhead para Node.js.
- **Para que serve**: Gerenciar o servidor HTTP backend, tratamento de rotas, middlewares e requisições.
- **Exemplo de uso**:
  Ver em [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/server.ts#L14-L44):
  ```typescript
  import { fastify } from 'fastify'

  const app = fastify()

  app.listen({ port: 3333 }).then(() => {
    console.log('🔥 HTTP server running!')
  })
  ```

---

## 2. Fastify Type Provider Zod (`fastify-type-provider-zod`)
- **O que é**: Um provedor de tipos que integra o Fastify com schemas de validação Zod.
- **Para que serve**: Garantir que as rotas da API tenham validação e serialização fortemente tipadas de query params, headers, body e respostas com inferência automática de tipos no TypeScript.
- **Exemplo de uso**:
  Ver em [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/server.ts#L4-L19) e [create-account.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/routes/auth/create-account.ts#L8-L18):
  ```typescript
  import type { ZodTypeProvider } from 'fastify-type-provider-zod'
  import { z } from 'zod'

  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => { /* ... */ }
  )
  ```

---

## 3. Fastify CORS (`@fastify/cors`)
- **O que é**: Plugin oficial do Fastify para controle de acesso Cross-Origin (CORS).
- **Para que serve**: Permitir que aplicações frontend (rodando em domínios ou portas diferentes) realizem requisições HTTP seguras para a API.
- **Exemplo de uso**:
  Ver em [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/server.ts#L1-L33):
  ```typescript
  import fastifyCors from '@fastify/cors'

  app.register(fastifyCors)
  ```

---

## 4. Fastify Swagger & Swagger UI (`@fastify/swagger` / `@fastify/swagger-ui`)
- **O que é**: Plugins do Fastify para geração e exibição da especificação OpenAPI (Swagger).
- **Para que serve**: Documentar automaticamente os endpoints da API e fornecer uma interface web interativa para testar as rotas.
- **Exemplo de uso**:
  Ver em [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/server.ts#L2-L31):
  ```typescript
  import fastifySwagger from '@fastify/swagger'
  import { jsonSchemaTransform } from 'fastify-type-provider-zod'

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Next.js SaaS',
        description: 'Full-stack SaaS app with multi-tenant & RBAC',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })
  ```

---

## 5. Prisma ORM (`prisma`, `@prisma/client`, `@prisma/adapter-pg`)
- **O que é**: Um Object-Relational Mapper (ORM) de nova geração para Node.js e TypeScript.
- **Para que serve**: Mapear modelos do banco de dados, realizar migrações de esquema e executar consultas fortemente tipadas no PostgreSQL. O pacote `@prisma/adapter-pg` permite que o Prisma utilize o driver nativo de conexão `pg`.
- **Exemplo de uso**:
  Ver em [prisma.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/lib/prisma.ts#L1-L11):
  ```typescript
  import { PrismaClient } from '@prisma/client'
  import { PrismaPg } from '@prisma/adapter-pg'
  import { Pool } from 'pg'

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)

  export const prisma = new PrismaClient({ adapter })
  ```

---

## 6. Node Postgres (`pg`)
- **O que é**: Cliente PostgreSQL nativo e de alto desempenho para Node.js.
- **Para que serve**: Gerenciar pools de conexões e executar queries diretamente ou servir de driver subjacente para adaptadores do Prisma.
- **Exemplo de uso**:
  Ver em [prisma.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/lib/prisma.ts#L3-L6):
  ```typescript
  import { Pool } from 'pg'

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  ```

---

## 7. CASL (`@casl/ability`)
- **O que é**: Biblioteca de autorização versátil orientada a atributos e papéis (RBAC / ABAC).
- **Para que serve**: Definir e validar quais ações um determinado usuário tem permissão para executar sobre determinados recursos (subjects) dentro do sistema multi-tenant.
- **Exemplo de uso**:
  Ver em [index.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/packages/auth/src/index.ts#L1-L58):
  ```typescript
  import { AbilityBuilder, createMongoAbility } from '@casl/ability'

  export function defineAbilityFor(user: User) {
    const builder = new AbilityBuilder(createAppAbility)
    permissions[user.role](user, builder)
    return builder.build({
      detectSubjectType(subject) { return subject.__typename },
    })
  }
  ```

---

## 8. Zod (`zod`)
- **O que é**: Biblioteca para definição de esquemas de dados e validação de tipos com inferência estática para TypeScript.
- **Para que serve**: Validar entradas de formulários/requisições HTTP, construir regras de autorização no pacote de `@saas/auth` e validar modelos e estruturas.
- **Exemplo de uso**:
  Ver em [index.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/packages/auth/src/index.ts#L21-L31):
  ```typescript
  import { z } from 'zod'

  const appAbilitiesSchema = z.union([
    projectSubject,
    userSubject,
    organizationSubject,
    inviteSubject,
    billingSubject,
    z.tuple([z.literal('manage'), z.literal('all')]),
  ])
  ```

---

## 9. BcryptJS (`bcryptjs`)
- **O que é**: Implementação em JavaScript puro do algoritmo de hashing de senhas Bcrypt.
- **Para que serve**: Criptografar senhas de usuários antes de salvar no banco de dados e comparar senhas fornecidas no login.
- **Exemplo de uso**:
  Ver em [create-account.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/src/http/routes/auth/create-account.ts#L2-L34):
  ```typescript
  import { hash } from 'bcryptjs'

  const passwordHash = await hash(password, 6)
  ```

---

## 10. Faker JS (`@faker-js/faker`)
- **O que é**: Biblioteca para geração de dados aleatórios e fictícios (nomes, e-mails, avatares, textos).
- **Para que serve**: Gerar dados de teste realistas para povoar o banco de dados no script de *seed*.
- **Exemplo de uso**:
  Ver em [seed.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/prisma/seed.ts#L32-L38):
  ```typescript
  import { faker } from '@faker-js/faker'

  const anotherUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })
  ```

---

## 11. Dotenv & Dotenv-CLI (`dotenv` / `dotenv-cli`)
- **O que é**: Módulo para carregamento de variáveis de ambiente de um arquivo `.env` para `process.env`.
- **Para que serve**: Injetar configurações sensíveis (como `DATABASE_URL` e portas) durante a execução de scripts e comandos da CLI como Prisma.
- **Exemplo de uso**:
  Ver em [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/package.json#L9):
  ```json
  "env:load": "dotenv -e .env --"
  ```

---

## 12. TSX (`tsx`)
- **O que é**: Executor TypeScript rápido alimentado pelo esbuild.
- **Para que serve**: Executar arquivos `.ts` diretamente via Node.js em modo de desenvolvimento com suporte a recarregamento automático (`watch`) sem necessidade de etapa de compilação manual.
- **Exemplo de uso**:
  Ver em [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/package.json#L5):
  ```json
  "dev": "tsx watch --env-file=.env src/http/server.ts"
  ```

---

## 13. Turborepo (`turbo`)
- **O que é**: Sistema de build de alto desempenho para monorepos JavaScript e TypeScript.
- **Para que serve**: Orquestrar e rodar scripts (build, dev, lint, check-types) em múltiplos pacotes e aplicações do monorepo de maneira paralela e otimizada.
- **Exemplo de uso**:
  Ver em [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/package.json#L4-L8):
  ```json
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "check-types": "turbo run check-types"
  }
  ```

---

## 14. tsup (`tsup`)
- **O que é**: Bundler de código TypeScript alimentado por esbuild.
- **Para que serve**: Compilar e empacotar a aplicação backend para código JavaScript pronto para produção (`dist/`).
- **Exemplo de uso**:
  Ver em [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/apps/api/package.json#L10):
  ```json
  "build": "tsup"
  ```

---

## 15. ESLint & Prettier (`@rocketseat/eslint-config`, `prettier`)
- **O que é**: Ferramentas de análise estática de código (linter) e formatação de código.
- **Para que serve**: Padronizar as regras de código no projeto, evitar erros sintáticos e formatar automaticamente o estilo de código entre todos os pacotes do monorepo.
- **Exemplo de uso**:
  Ver em [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/project-next-saas-rbac/config/eslint-config/package.json#L12-L21).
