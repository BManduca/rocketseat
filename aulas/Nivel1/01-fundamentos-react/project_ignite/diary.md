# 📝 Diário do Projeto - Ignite Feed

## 📋 Visão Geral do Projeto

Este é um projeto desenvolvido durante o curso **Fundamentos do React** da Rocketseat, especificamente no módulo **Nível 1 - Aula 01**. O projeto consiste em uma aplicação de feed social chamada "Ignite Feed", construída com React e Vite.

## 🚀 Como o Projeto Foi Criado

### 1. Criação Inicial
O projeto foi criado usando o Vite como bundler e template React:

```bash
npm create vite@latest project_ignite -- --template react
cd project_ignite
```

### 2. Instalação das Dependências
Após a criação, as dependências foram instaladas:

```bash
npm install
```

---

## 📦 Dependências do Projeto

### Dependências Principais
- **React**: ^19.1.0 - Biblioteca principal para construção da interface
- **React DOM**: ^19.1.0 - Renderização do React no navegador
- **Tailwind CSS**: ^4.1.11 - Framework CSS utilitário
- **@tailwindcss/vite**: ^4.1.11 - Plugin do Tailwind para Vite

### Dependências de Desenvolvimento
- **Vite**: ^7.0.4 - Bundler e servidor de desenvolvimento
- **@vitejs/plugin-react**: ^4.6.0 - Plugin React para Vite
- **@biomejs/biome**: ^2.1.3 - Linter e formatter de código
- **ultracite**: 5.1.2 - Configuração de linting
- **@types/react**: ^19.1.8 - Tipos TypeScript para React
- **@types/react-dom**: ^19.1.6 - Tipos TypeScript para React DOM

---

## 🛠️ Configurações do Projeto

### Vite (vite.config.js)
```javascript
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
  },
})
```

### Biome (biome.jsonc)
```json
{
  "$schema": "https://biomejs.dev/schemas/2.1.3/schema.json",
  "extends": ["ultracite"],
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "semicolons": "asNeeded"
    }
  }
}
```

---

## 📁 Estrutura do Projeto

```
project_ignite/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Post.jsx
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.module.css
│   ├── assets/
│   │   ├── avatar.png
│   │   └── ignite-logo.svg
│   ├── App.jsx
│   ├── App.module.css
│   ├── global.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── biome.jsonc
└── index.html
```

---

## 🎨 Estilização

### CSS Modules
- Cada componente tem seu próprio arquivo CSS Module
- Evita conflitos de nomes de classes
- Permite estilização específica por componente

---

### Tailwind CSS
- Configurado via plugin do Vite
- Framework CSS utilitário para desenvolvimento rápido
- Configuração moderna com Tailwind v4

## 🚀 Scripts Disponíveis

```json
{
  "dev": "vite",           // Inicia servidor de desenvolvimento
  "build": "vite build",   // Gera build de produção
  "preview": "vite preview" // Visualiza build de produção
}
```

---

## 🔧 Ferramentas de Desenvolvimento

### Linting e Formatação
- **Biome**: Linter e formatter moderno
- **Ultracite**: Configuração de linting otimizada
- **Regras específicas**: Ignora algumas regras para elementos img quando necessário

### Desenvolvimento
- **Vite**: Servidor de desenvolvimento rápido
- **HMR**: Hot Module Replacement para desenvolvimento eficiente
- **Porta**: Configurada para rodar na porta 3001

---

## 🎯 Objetivos de Aprendizado

Este projeto foi desenvolvido para aprender:
- **Fundamentos do React**: Componentes, props, JSX
- **CSS Modules**: Estilização modular e organizada
- **Vite**: Configuração e uso de bundler moderno
- **Biome**: Linting e formatação de código
- **Tailwind CSS**: Framework CSS utilitário
- **Estrutura de Projetos**: Organização de arquivos e componentes

---

## 📚 Recursos Utilizados

- **Rocketseat Ignite**: Curso de fundamentos do React
- **Vite**: Documentação oficial para configuração
- **Tailwind CSS**: Documentação para estilização
- **Biome**: Documentação para linting e formatação
- **Unsplash**: Imagens gratuitas para o projeto

---

## 📝 Anotações

- No React existem dois momentos importantes aonde são criados componentes
  1. Quando algo repete muito na tela (com mesmo visual, mesmo comportamento, mesmo funcionamento..)
  2. Quando você consegue tirar 'algo' de um componente maior sem que aquele componente maior pare de funcionar, deixando assim o componente maior mais limpo, uma funcionalidade mais clara de receber manutenção.

---

*Este diário foi criado para documentar todo o processo de desenvolvimento e servir como referência para futuras melhorias e aprendizados.* 