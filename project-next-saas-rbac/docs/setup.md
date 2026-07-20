# Guia de Setup e Execução do Projeto

Este documento explica como configurar o ambiente de desenvolvimento local, subir os serviços necessários (banco de dados e API) e executar as migrações do Prisma para criação de tabelas.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js**: `>= 18`
- **pnpm**: Gerenciador de pacotes principal do projeto (`pnpm@9.x`)
- **Docker & Docker Compose**: Para execução do PostgreSQL local

---

## 🚀 Passo a Passo para Iniciar o Projeto

### 1. Instalar Dependências

Se for a primeira vez rodando o projeto ou após clonar a aplicação:

```bash
pnpm install
```

- **Quando executar:** Na primeira vez após clonar o repositório ou quando novas dependências forem adicionadas ao `package.json`.

---

### 2. Subir o Banco de Dados (PostgreSQL)

O banco de dados PostgreSQL roda via Docker Compose.

```bash
docker compose up -d
```

- **Quando executar:** Sempre que for iniciar a sessão de desenvolvimento e o container do banco de dados não estiver ativo.
- **Para verificar se está rodando:**
  ```bash
  docker ps
  ```

---

### 3. Executar as Migrações e Criar as Tabelas no Banco

Para criar a estrutura de tabelas no banco de dados recém-iniciado:

```bash
pnpm --filter @saas/api db:migrate
```

- **Quando executar:**
  1. **Toda vez que subir um container novo/limpo** do banco de dados PostgreSQL.
  2. **Sempre que alterar o arquivo de schema** do Prisma (`apps/api/prisma/schema.prisma`).
  3. **Ao receber o erro `P2021`** (`The table public.xxx does not exist in the current database`).

---

---

### 4. Popular o Banco de Dados com Dados Iniciais (Seed)

Para popular o banco com dados de teste (usuários, organizações e projetos fictícios):

```bash
pnpm db:seed
```

- **Quando executar:** Sempre que desejar popular o banco com dados iniciais ou redefinir a base de dados de desenvolvimento.
- **Observação Importante (`onDelete: Cascade`):** As relações do schema (`schema.prisma`) devem conter a diretiva `onDelete: Cascade` nos vínculos com `Organization` e `User` (como `Member`, `Project`, `Invite`, `Token` e `Account`) para que a exclusão em cascata funcione corretamente e evite violações de chave estrangeira durante o reset/seed do banco.

---

### 5. Iniciar os Servidores de Desenvolvimento

Para subir a API e os serviços em modo de desenvolvimento (monorepo via Turbo):

```bash
pnpm dev
```

- **Quando executar:** Sempre que for desenvolver e testar a aplicação localmente.
- A API estará disponível por padrão em `http://localhost:3333`.

---

## ⚡ Resumo Rápido dos Comandos

| Situação / Ação                                 | Comando                                             |
| ----------------------------------------------- | --------------------------------------------------- |
| Instalar dependências                           | `pnpm install`                                      |
| Iniciar o container do banco PostgreSQL         | `docker compose up -d`                              |
| Parar o container do banco                      | `docker compose down` (ou `docker compose stop`)    |
| Criar/aplicar tabelas no banco (Migrações)      | `pnpm db:migrate` (ou `pnpm --filter @saas/api db:migrate`) |
| Popular o banco com dados iniciais (Seed)       | `pnpm db:seed` (ou `pnpm --filter @saas/api db:seed`)       |
| Iniciar a API e o app em desenvolvimento        | `pnpm dev`                                          |
| Abrir interface visual do banco (Prisma Studio) | `pnpm --filter @saas/api db:studio`                 |
| Resetar o banco do zero (apagar dados e migrar) | `pnpm --filter @saas/api exec prisma migrate reset` |

---

## 🔍 Resolução de Problemas Comuns

### Erro `P2021`: `The table public.users does not exist`

Ocorre quando a API tenta realizar requisições no banco de dados mas as tabelas ainda não foram geradas.

- **Solução:** Execute o comando de migração:
  ```bash
  pnpm db:migrate
  ```

---

### Erro `DriverAdapterError` / `RESTRICT` ao rodar o `pnpm db:seed`

Ocorre ao tentar deletar uma organização ou usuário que possui registros vinculados em tabelas filhas (como `members` ou `projects`) sem a regra de exclusão em cascata.

- **Sintoma:**
  ```text
  DriverAdapterError: update or delete on table "organization" violates RESTRICT setting of foreign key constraint "members_organization_id_fkey" on table "members"
  ```
- **Solução:**
  1. Adicionar `onDelete: Cascade` às relações no `schema.prisma` (`Member`, `Project`, `Invite`, `Token`, `Account`).
  2. Gerar e aplicar a migração no banco:
     ```bash
     pnpm db:migrate
     ```
  3. No arquivo `seed.ts`, certificar-se de deletar registros em ordem (tabelas filhas antes das tabelas pai).
