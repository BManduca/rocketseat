## OAuth Github Authorization URL

https://github.com/login/oauth/authorize?client_id=Ov23lifikBzgVx2Ls2JD&redirect_url=http://localhost:3000/api/auth/callback&scope=user:email

# Declaração runTimeEnv

- runtimeEnv é usado para informar ao Next.js quais variáveis de ambiente serão usadas no lado do cliente e quais serão usadas no lado do servidor.

- O Next ele tem um mecanismo, mais voltado para o front-end, que se caso ele não encontrar no meu código, explicitamente algo como **process.env.NOME_VARIAVEL**, ele ira eliminar a variável do .env, para que não efetuamos o pull de variáveis de ambiente que não estão sendo utilizadas.

---

## Configuração do Fastify Swagger com OpenAPI 3.0 (`fastify-type-provider-zod`)

### Erro Comum:
`Error: This package currently does not support component references for Swagger 2.0`

### Motivo:
A partir da versão 7 do `fastify-type-provider-zod` (utilizada no Fastify v5+), a biblioteca exige obrigatoriamente a especificação **OpenAPI 3.0** (`openapi: { ... }`). Se o `@fastify/swagger` for registrado utilizando a propriedade legada `swagger: { ... }` (Swagger 2.0, como feito em aulas/projetos mais antigos), a biblioteca lança um erro ao tentar gerar o JSON em `/docs/json`.

### Configuração Correta em `apps/api/src/http/server.ts`:

```typescript
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT obtained from authentication route.',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})
```

- **`openapi`**: Define o uso da especificação OpenAPI 3.0.
- **`components.securitySchemes`**: Substitui o antigo `securityDefinitions` do Swagger 2.0.
- **`description`**: Permite incluir a descrição detalhada do método de autenticação que aparece na interface do Swagger UI.
