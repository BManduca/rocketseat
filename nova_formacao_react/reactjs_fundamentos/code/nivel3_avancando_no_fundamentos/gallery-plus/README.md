# Gallery+

O Gallery+ é uma aplicação web moderna para gerenciamento e visualização de fotos, construída com tecnologias de ponta para oferecer uma experiência de usuário fluida e responsiva.

## ✨ Funcionalidades

-   **Visualização de Imagens:** Navegue pelas suas fotos em uma interface limpa e organizada.
-   **Upload de Arquivos:** Adicione novas fotos à sua galeria com um sistema de upload simples.
-   **Estrutura Cliente-Servidor:** Arquitetura desacoplada com um frontend em React e um backend em Node.js.
-   **Componentização:** Interface construída com componentes reutilizáveis e estilizados.

## 🚀 Tecnologias Utilizadas

**Frontend:**
-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/) (com [tailwind-variants](https://www.tailwind-variants.org/))
-   [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) para formulários e validação.

**Backend:**
-   [Node.js](https://nodejs.org/)
-   [Fastify](https://www.fastify.io/)
-   [TypeScript](https://www.typescriptlang.org/)
-   `tsup` para bundling.

**Ferramentas de Desenvolvimento:**
-   [pnpm](https://pnpm.io/) como gerenciador de pacotes.
-   [Biome](https://biomejs.dev/) para formatação e linting.

## 🏁 Como Rodar o Projeto

### Pré-requisitos
-   [Node.js](https://nodejs.org/en) (versão 20.x ou superior)
-   [pnpm](https://pnpm.io/installation)

### Instalação

Clone o repositório e instale as dependências com o comando:
```bash
pnpm install
```

### Desenvolvimento

Para uma experiência de desenvolvimento completa, você precisará de dois terminais:

1.  **Inicie o servidor de backend:**
    ```bash
    pnpm dev-server
    ```
    O servidor irá observar as alterações nos arquivos e reiniciar automaticamente.

2.  **Inicie o servidor de frontend:**
    ```bash
    pnpm dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Build de Produção

Para construir a versão otimizada da aplicação para produção, execute:
```bash
pnpm build
```
Este comando irá gerar os arquivos de build tanto para o servidor quanto para o cliente.

Para rodar a aplicação em modo de produção após o build:
```bash
pnpm run-server
```