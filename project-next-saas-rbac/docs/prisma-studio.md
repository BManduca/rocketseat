# Prisma Studio & Resolução do Erro "No tables found"

Este documento detalha o que fazer quando o Prisma Studio exibe a mensagem **"No tables found"** e como restaurar/inicializar a estrutura e os dados do banco de dados PostgreSQL.

---

## 🔍 O que significa "No tables found"?

Ao executar o Prisma Studio e visualizar **"No tables found"**, significa que o Prisma se conectou ao banco de dados, mas **as tabelas da aplicação ainda não existem no PostgreSQL**.

Isso costuma ocorrer quando:
- O banco de dados PostgreSQL (container Docker) foi recriado ou limpo.
- As migrações do Prisma ainda não foram executadas no banco de dados.
- O Prisma Studio foi executado diretamente sem carregar o arquivo `.env` contendo a `DATABASE_URL` correta.

---

## ❓ Preciso rodar o `seed` novamente?

**Não apenas o seed.** Rodar apenas o comando de `seed` (`pnpm db:seed`) sem antes aplicar as migrações resultará em um erro de tabela inexistente (ex: `Relation "users" does not exist`), pois o script de seed tenta inserir registros em tabelas que ainda não foram criadas.

O fluxo correto exige **primeiro criar a estrutura de tabelas (migrações)** e **em seguida popular os dados (seed)**.

---

## 🚀 Fluxo de Resolução Passo a Passo

### 1. Garantir que o container do banco está ativo
Certifique-se de que o PostgreSQL está rodando via Docker:

```bash
docker compose up -d
```

### 2. Executar as Migrações (Cria as Tabelas no Banco)
Execute as migrações do Prisma para criar todas as tabelas no PostgreSQL:

- **Da raiz do monorepo:**
  ```bash
  pnpm db:migrate
  ```
- **Ou dentro do pacote `apps/api`:**
  ```bash
  pnpm db:migrate
  ```

### 3. Executar o Seed (Popula as Tabelas)
Com a estrutura das tabelas criada, execute o seed para inserir os dados de teste:

- **Da raiz do monorepo:**
  ```bash
  pnpm db:seed
  ```

### 4. Abrir o Prisma Studio
Execute o comando configurado que carrega as variáveis do arquivo `.env`:

- **Da raiz do monorepo:**
  ```bash
  pnpm --filter @saas/api db:studio
  ```
- **Ou dentro de `apps/api`:**
  ```bash
  pnpm db:studio
  ```

---

## ⚡ Resumo dos Comandos

| Etapa | Comando | Descrição |
|---|---|---|
| **1. Banco** | `docker compose up -d` | Sobe o container PostgreSQL |
| **2. Migrações** | `pnpm db:migrate` | Cria todas as tabelas no banco |
| **3. Seed** | `pnpm db:seed` | Popula o banco com dados de teste |
| **4. Studio** | `pnpm --filter @saas/api db:studio` | Abre a interface do Prisma Studio |
