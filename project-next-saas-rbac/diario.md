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

## Permissões

- CASL
  - Isomorphic Authorization JavaScript Library
  - Noções básicas: O CASL opera em nível de habilidades, é isso que um usuário pode realmente fazer no aplicativo. Uma habilidade em si depende dos 4 parâmetros (os últimos 3 são opcionais):
    - Ação do usuáro(User action): Descreve o que o usuário pode realmente fazer no aplicativo. Ação do usuário é uma palavra (geralmente um verbo) que depende da lógica de negócios (por exemplo..Prolongar, ler...). Muitas vezes será uma lista de palavras CRUD => Criar, ler, atualizar e excluir.
    - Assunto(subjects): O assunto ou tipo de assunto no qual você quer verificar a ação do usuário. Normalmente, trata-se de uma entidade empresarial (ou de domínio)(Por exemplo: Assinatura, artigo, usuário). A relação entre sujeito e tipo de sujeito é a mesma que a relação entre uma instância de objeto e sua classe.
    - Campos(Fields): Pode ser usado para restringir a ação do usuário apenas aos campos do assunto correspondente (por exemplo, para permitir que o moderador atualize o campo de status de um artigo e não permite atualizar descrição ou título).
    - Condição(Conditions): Crotérios que restringem a ação do usuário apenas a sujeitos pareados. Isso é útil quando você precisa conceder permissão para assuntos específicos (por exemplo, para permitir que o usuário gerencie seu próprio artigo).
  - Geralmente utilizado para definir permissões em nível mais Macro
  - Quando for para uma linha mais voltada para regra de negócio, geralmente não é 'trazida' essa parte de verificação para dentro do CASL, pois, foge muito do conceito do CASL, que é uma biblioteca focada em 'permissões', e não em regras de negócio.
  - Por padrão o CASL, segue uma lógica de negar tudo, por isso, é necessário definir o que o usuário pode fazer.

  - Roles with predefined permissions: Basicamente salva no banco as informações de usuários e de roles(que é qual o cargo o usuário pertence), suas permissões são definidas 'no código' através de uma matriz de permissões (permissões por roles).
