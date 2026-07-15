# Prisma ORM

Documentação sobre a configuração e uso do Prisma no projeto.

## Inicialização

O Prisma foi inicializado no pacote `apps/api` com o comando:

```bash
pnpm prisma init
```

### Arquivos gerados

| Arquivo/Pasta | Descrição |
|---|---|
| `prisma/schema.prisma` | Arquivo principal de schema do Prisma, onde são definidos os models, enums e configurações do banco de dados. |
| `prisma.config.ts` | Arquivo de configuração do Prisma, incluindo a variável `DATABASE_URL`. |
| `.env` | Arquivo de variáveis de ambiente (contém a `DATABASE_URL`). |
| `.gitignore` | Atualizado para ignorar arquivos sensíveis do Prisma. |

---

## Configuração do Banco de Dados

### Conectar a um banco existente

1. Configure a `DATABASE_URL` no arquivo `prisma.config.ts`
2. Execute o comando abaixo para introspectar o banco:

```bash
pnpm prisma db pull
```

### Criar um novo banco

**Local** (roda o Postgres localmente no terminal):

```bash
npx prisma dev
```

**Cloud** (cria um banco Prisma Postgres gratuito):

```bash
npx create-db
```

---

## Fluxo de Trabalho

1. Defina seus models no arquivo `prisma/schema.prisma`
2. Execute o comando de migração para aplicar o schema:

```bash
pnpm prisma migrate dev
```

---

## Comandos Úteis

| Comando | Descrição |
|---|---|
| `pnpm prisma init` | Inicializa o Prisma no projeto |
| `pnpm prisma migrate dev` | Cria e aplica migrações em desenvolvimento |
| `pnpm prisma db pull` | Introspecta um banco existente e gera o schema |
| `pnpm prisma db push` | Sincroniza o schema com o banco sem criar migração |
| `pnpm prisma studio` | Abre a interface visual para explorar os dados |
| `pnpm prisma generate` | Gera o Prisma Client a partir do schema |
| `pnpm prisma format` | Formata o arquivo `schema.prisma` |

---

## Referências

- [Prisma - Getting Started](https://pris.ly/getting-started)
- [Prisma Docs](https://www.prisma.io/docs)
