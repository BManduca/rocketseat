# 🚀 Rocketseat - Repositório de Estudos

> Repositório dedicado aos meus desafios e projetos desenvolvidos durante meus estudos na [Rocketseat](https://rocketseat.com.br)

## 📚 Sobre o Repositório

Este repositório contém todos os projetos, desafios e exercícios desenvolvidos durante minha jornada de aprendizado na Rocketseat. Aqui você encontrará uma progressão estruturada dos conceitos fundamentais até técnicas avançadas de diferentes trilhas e cursos.

### 🎯 Objetivos

- Documentar minha evolução no aprendizado com os cursos da Rocketseat
- Criar um portfólio de projetos práticos
- Compartilhar conhecimento e experiências
- Manter um histórico organizado dos estudos

## 📁 Estrutura do Repositório

```
rocketseat/
├── banco_de_dados_rocketseat/   # Estudos de PostgreSQL e banco de dados
├── formacao_antiga_react/       # Projetos da primeira versão da trilha de React
│   └── Nivel1/
│       └── 01-fundamentos-react/
│           ├── project_ignite/  # Projeto Ignite Feed (JS)
│           └── project_ignite_ts/ # Projeto Ignite Feed (TypeScript)
├── nova_formacao_react/         # Nova trilha de React.js
│   └── reactjs_fundamentos/
│       └── code/
│           ├── desafios/        # Desafios práticos (ex: Hairday)
│           └── nivel1_fundamentos/ ...
├── nextjs/                      # Projetos e práticas utilizando Next.js
│   └── site-blog/               # Blog em Next.js
├── vue_rocketseat/              # Estudos e projetos utilizando Vue.js
│   └── primeiro-projeto-vue/    # Primeiro projeto com o framework Vue
└── README.md
```

## 🎓 Cursos e Trilhas de Aprendizado

### ⚛️ Nova Formação React
- **Status**: ✅ Concluído
- **Conteúdo**: Fundamentos do React.js, criação do primeiro projeto com tooling moderno, tópicos avançados e desafios práticos.
- **Destaques**: 
  - [Desafio Hairday](./nova_formacao_react/reactjs_fundamentos/code/desafios/hairday/)
  - [Fundamentos do React](./nova_formacao_react/reactjs_fundamentos/code/nivel1_fundamentos/)

### 🌐 Next.js
- **Status**: 🔄 Em andamento (44% concluído)
- **Conteúdo**: Criação de aplicações otimizadas com Server-side Rendering (SSR), Static Site Generation (SSG) e App Router.
- **Projetos**:
  - [Site Blog](./nextjs/site-blog/)

### 💾 Banco de Dados
- **Status**: ✅ Concluído
- **Conteúdo**: PostgreSQL aprofundado, consultas avançadas, subconsultas correlacionadas e não correlacionadas, junções (Inner Join) complexas, normalização e desnormalização, otimização e performance de queries.
- **Projetos**:
  - [Mini Projeto Gestão Educacional](./banco_de_dados_rocketseat/mini_projeto_gestão_educacional/)
  - [Projeto Aplicações Práticas (Projeto Final)](./banco_de_dados_rocketseat/projeto_aplicações_práticas(projeto_final)/)

### 🟢 Vue.js
- **Status**: 🔄 Em andamento (42% concluído)
- **Conteúdo**: Estudos sobre o framework progressivo Vue.js (Watchers, v-once, v-memo, reatividade, componentes, Pinia/Vuex, Vite).
- **Projetos**:
  - [Primeiro Projeto Vue](./vue_rocketseat/primeiro-projeto-vue/)
  - [Diário do Curso](./vue_rocketseat/diario_curso.md)

### ⚛️ Formação Antiga React (descontinuado - deu lugar ao curso da Nova Formação React)
- **Status**: 🚫 Descontinuado
- **Conteúdo**: Conceitos fundamentais e estruturação de projetos na versão clássica do Ignite de React.
- **Projetos**:
  - [Ignite Feed JS](./formacao_antiga_react/Nivel1/01-fundamentos-react/project_ignite/)
  - [Ignite Feed TS](./formacao_antiga_react/Nivel1/01-fundamentos-react/project_ignite_ts/)

## 🛠️ Tecnologias Utilizadas

### Core & Frameworks
- **React** & **Next.js** - Bibliotecas e frameworks para interfaces reativas e renderização no servidor.
- **Vue.js** - Framework JS progressivo focado em reatividade e componentização.
- **PostgreSQL** - Banco de dados relacional para armazenamento seguro e consultas de alta performance.
- **Vite** - Bundler e servidor de desenvolvimento ultra-rápido.
- **TypeScript** - Superconjunto de JavaScript que adiciona tipagem estática e segurança ao código.

### Styling & UI
- **CSS Modules** - Estilização modular local.
- **Tailwind CSS** - Framework CSS utilitário para estilização rápida e responsiva.
- **Phosphor Icons** - Biblioteca de ícones modernos e limpos.

### Tooling & Padrões
- **Biome** - Ferramenta moderna e rápida de linting e formatação.
- **pnpm** / **npm** - Gerenciadores de pacotes eficientes para as dependências das aplicações.

## 📈 Progresso de Aprendizado

### Legenda de Status

| Ícone | Descrição |
|-------|-----------|
| ✅ | Concluído |
| 🔄 | Em andamento |

### Tabela de Progresso Geral

| Trilha / Curso | Categoria | Status | Progresso / Observações |
| :--- | :--- | :---: | :--- |
| **Nova Formação React** | Front-end | ✅ Concluído | 100% |
| **Banco de Dados (PostgreSQL)** | Back-end | ✅ Concluído | 100% |
| **Formação Antiga React** | Front-end | ✅ Concluído | 100% |
| **Next.js** | Front-end / Full-stack | 🔄 Em andamento | 44% (Desenvolvimento de Blog e SSR) |
| **Vue.js** | Front-end | 🔄 Em andamento | Fundamentos de Reatividade e Componentes |

## 🚀 Como Executar os Projetos

### Pré-requisitos
- Node.js (versão 18 ou superior)
- **pnpm** (preferencial) ou npm/yarn
- PostgreSQL (necessário para os projetos e scripts da pasta `banco_de_dados_rocketseat`)

### Instalação e Execução

1. **Clone o repositório**
    ```bash
    git clone <url-do-repositorio>
    cd rocketseat
    ```

2. **Navegue até a pasta do projeto que deseja testar**
    - Exemplo com pnpm (Nova Formação React):
      ```bash
      cd nova_formacao_react/reactjs_fundamentos/code/desafios/hairday
      pnpm install
      pnpm dev
      ```

## 🎨 Padrões de Desenvolvimento

- **Componentização Reutilizável**: Estrutura limpa de componentes funcionais.
- **Tipagem Estática**: TypeScript para maior segurança durante o desenvolvimento.
- **Estilização Moderna**: Uso de Tailwind CSS e CSS Modules para interfaces de alta fidelidade.
- **Linting & Formatação**: Biome para consistência no estilo de código.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Sobre o Desenvolvedor

**Brunno Manduca** - Desenvolvedor focado em aprimorar conhecimentos em React, Next.js, Vue, Banco de Dados e práticas modernas de desenvolvimento de software.

### Contatos
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BManduca)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brunnomanduca)

---

<div align="center">
  <p>Desenvolvido com ❤️ durante os estudos na <strong>Rocketseat</strong></p>
  <p><a href="https://rocketseat.com.br">🚀 Rocketseat</a></p>
</div>