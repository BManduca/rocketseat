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


### Programação imperativa vs. Programação declarativa
1. Programação imperativa
   * Uma forma de escrevemos nosso código
   * 'Dizemos' ao nosso software o que deve ser feito
   * É colocado exatamente passo-a-passo o que deve ser
   * Tipo de programação mais comum

2. Programação declarativa
   * Declaramos qual o resultado que é esperado, em vez de declarar todo o processo (passo-a-passo)
   * Declara quais as condições para ter o resultado final


### Key no React
- Porque única?

* Há 3 momentos em que um componente é renderizado novamente no React
  1. Quando o estado é alterado.
  2. Quando a propriedade é alterado
  3. Quando um componente pai renderiza novamente
     * Exemplo: Quando um estado sofre alteração, tofo o código do componente sofre um novo fluxo de renderização. O Componente Post, é componente pai de todos os Componentes de comentário, os componentes de comentário também serão recalculados em tela, mesmo não alterando nada.
     * Por uma questão aonde blogues possam ter mais de 500 posts, ficaria um processo consideravelmente lento na percepção de usuário e é por isso que existem as Keys.

  * Exemplo:
  
    | 1 | 2 | 3 | 4 |
    ---------
    | 1 | 2 | 3 | 4 | 5 |
    ---------

    * ao comparar as keys, como no modelos acima, ele ira ver que o único ID que não existia e é preciso mostrar em tela é o 5, porque o resto já estava presente 


### Comunicação entre componentes
* Para comunicar dois componentes, pode ser realizado através das suas propriedades.

### Imutabilidade
* É o princípio de não modificar diretamente os dados (estados ou props), mas sim criar uma nova versão atualizada deles
* Porque imutabilidade é importante no React?
  * React detecta mudanças de estado de referências (shallow comparison). Se você modifica um objeto diretamente, React não pode perceber a mudança e. com isso, não renderizar novamente o componente.

### Eventos(React)
* Todos os eventos no React como onClick, onSubmit, onBlur, onHover, onInvalid.. Eles esperam uma função como propriedade.

### Closures
*  Sempre que for atualizar uma informação e essa informação depende do valor que ela tinha anteriormente, o mais indicado é fazer atualização usando o padrão de funções
    ```
    function handleLikeComment() {
      setLikeComment((state) => {
        return state + 1
      })
    }
    ```

---

## JavaScript
* Nasceu como um superset(superconjunto) em cima da linguagem JavaScript para que seja possível adicionar tipagem estática em cima de uma linguagem JavaScript que tem linguagem dinâmica
* 

---

*Este diário foi criado para documentar todo o processo de desenvolvimento e servir como referência para futuras melhorias e aprendizados.* 