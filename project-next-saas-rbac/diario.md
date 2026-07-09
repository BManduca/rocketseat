# Projeto SaaS com Next.js e RBAC - Node e React

## SaaS

- Software as a Service
- Produto ou software que é vendido para várias empresas, onde várias empresas poderão utilizar a aplicação
- Dentro dessa estrutura, temos duas arquiteturas(estratégias de distribuição da aplicação) mais comuns:
  - Single Tenant vs. Multi Tenant
    - single => Um software que é utilizado por uma empresa
      - (delphi/java) PDV - Cópias ZIP - TeamViewer - Instalação manual
      - Infraestrutura única para clientes

    - multi => um software que é usado por mais de uma empresa com a mesma infraestrutura
      - Geralmente tem um software rodando na nuvem (um servidor remoto)
      - Multi Tenant **NÃO QUER DIZER** multi subdomínios
      - Multi Tenant **NÃO QUER DIZER** um banco por empresas
      - **A GRANDE MAIORIA** dos SaaS que são Multi Tenant não usam **UM BANCO POR EMPRESA**
      - So será utilizado a estratégia de ter um banco por empresa, caso o usuário esteja criando uma aplicação que seja:
        1. Pública (governo)
        2. LGPD / Contrato individual (Itaú)
      - Estratégia de subdomínios: Páginas públicas

## Autorização

### RBAC - Role Based Authorization Control

    - Role: Admin, Billing, Developer, Member

### ABAC - Attribute Based Authorization Control

    - Admin pode editar um projeto
    - Membro pode editar o título de um projeto

## Linguagens, Frameworks e Tecnologias

- Backend: Node com Fastify
- Frontend: Next.js na versão 14, com recursos de server components, server actions e muito mais
- Será desevolvido um Monorepo, aonde estaremos utilizando:
  - Turborepo: Ferramenta que vai auxiliar na parte de cache e algumas operações no monorepo
