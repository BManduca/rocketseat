# Projeto ToDo

Uma aplicação de lista de tarefas (To-Do List) simples e moderna, construída com React, TypeScript e Vite.

## ✨ Funcionalidades

-   Criação e gerenciamento de tarefas.
-   Persistência de dados utilizando o Local Storage do navegador.
-   Interface de usuário moderna com componentes reutilizáveis.

## 🚀 Tecnologias Utilizadas

-   **Framework**: [React](https://react.dev/)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
-   **Lint & Formatação**: [Biome](https://biomejs.dev/) (com o preset `ultracite`)
-   **Roteamento**: [React Router](https://reactrouter.com/)
-   **Hooks**: `use-local-storage` para persistência de dados.

## 📂 Estrutura do Projeto

O código-fonte está localizado no diretório `src/`, organizado da seguinte forma:

```
src/
├── assets/         # Arquivos estáticos como ícones e imagens
├── components/     # Componentes de UI genéricos e reutilizáveis (Button, Card, etc.)
├── core-components/ # Componentes específicos da aplicação (TaskItem, TasksList)
├── hooks/          # Hooks customizados do React (ex: useTask)
├── models/         # Tipos e interfaces do TypeScript (ex: Task)
├── pages/          # Componentes de nível de página
├── App.tsx         # Componente principal da aplicação
├── main.tsx        # Ponto de entrada principal da aplicação
└── index.css       # Estilos globais
```

## ▶️ Começando

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório**

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, caso a 5173 esteja em uso).

## 🛠️ Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev`: Executa a aplicação em modo de desenvolvimento.
-   `npm run build`: Compila a aplicação para produção.
-   `npm run lint`: Executa o linter (Biome) no código.
-   `npm run preview`: Serve a build de produção localmente para visualização.