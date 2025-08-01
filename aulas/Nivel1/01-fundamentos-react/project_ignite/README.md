# ![Logo Feed](./src/assets/Ignite_logo_32_x_32.png) Ignite Feed

> Uma aplicação de feed social moderna construída com React e Vite

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Sobre o Projeto

O **Ignite Feed** é uma aplicação de feed social desenvolvida durante o curso **Fundamentos do React** da Rocketseat. O projeto demonstra conceitos fundamentais do React como componentes, props, JSX e CSS Modules, além de utilizar ferramentas modernas de desenvolvimento.

### ✨ Características

- 🎨 **Interface moderna** com design responsivo
- 🧩 **Componentes reutilizáveis** seguindo boas práticas
- 🎯 **CSS Modules** para estilização modular
- ⚡ **Vite** para desenvolvimento rápido
- 🔧 **Biome** para linting e formatação
- 🎨 **Tailwind CSS** para estilização utilitária

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd project_ignite
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:3001
```

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza o build de produção |

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho da aplicação
│   ├── Post.jsx        # Componente de post individual
│   ├── Post.module.css # Estilos do componente Post
│   ├── Avatar.jsx      # Componente de avatar reutilizável
│   ├── Avatar.module.css # Estilos do componente Avatar
│   ├── Comment.jsx     # Componente de comentário
│   ├── Comment.module.css # Estilos do componente Comment
│   ├── Sidebar.jsx     # Barra lateral com perfil
│   └── Sidebar.module.css # Estilos do componente Sidebar
├── assets/             # Recursos estáticos
│   ├── avatar.png      # Avatar do usuário
│   └── ignite-logo.svg # Logo do Ignite
└── App.jsx             # Componente principal
```

## 🧩 Componentes

### Header
- Exibe o logo do Ignite
- Utiliza CSS Modules para estilização
- Componente de apresentação

### Sidebar
- Mostra informações do perfil do usuário
- Inclui avatar, nome e cargo
- Link para editar perfil
- Imagem de capa do Unsplash

### Post
- Componente completo de post com header, conteúdo e interações
- Inclui informações do autor, data de publicação e conteúdo
- Formulário para adicionar comentários
- Lista de comentários existentes
- Suporte a hashtags e links

### Avatar
- Componente reutilizável para exibir avatares de usuários
- Suporte a borda opcional via prop `hasBorder`
- Utilizado em Post, Comment e Sidebar

### Comment
- Componente para exibir comentários individuais
- Inclui avatar, autor, timestamp e conteúdo
- Botão de like com contador
- Botão de deletar comentário
- Ícones do Phosphor Icons

## 🎨 Tecnologias Utilizadas

### Core
- **React 19.1.0** - Biblioteca principal para construção da interface
- **Vite 7.0.4** - Bundler e servidor de desenvolvimento moderno

### Estilização
- **CSS Modules** - Estilização modular e organizada
- **Tailwind CSS 4.1.11** - Framework CSS utilitário
- **Phosphor Icons** - Biblioteca de ícones modernos e consistentes

### Ferramentas de Desenvolvimento
- **Biome** - Linter e formatter moderno
- **Ultracite** - Configuração de linting otimizada

## 🔧 Configurações

### Vite
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
  },
})
```

### Biome
```json
{
  "extends": ["ultracite"],
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  }
}
```

## 📚 Aprendizados

Este projeto foi desenvolvido para aprender:

- **Fundamentos do React**: Componentes, props, JSX
- **CSS Modules**: Estilização modular e organizada
- **Vite**: Configuração e uso de bundler moderno
- **Biome**: Linting e formatação de código
- **Estrutura de Projetos**: Organização de arquivos e componentes

### 💡 Conceitos Importantes

> **Quando criar componentes no React:**
> 1. Quando algo se repete muito na tela (mesmo visual, comportamento e funcionamento)
> 2. Quando você consegue extrair funcionalidade de um componente maior, deixando-o mais limpo e fácil de manter

## 🚧 Estado Atual

### ✅ Implementado
- Estrutura básica da aplicação
- Componentes principais (Header, Sidebar, Post, Avatar, Comment)
- Layout responsivo com CSS Modules
- Configuração de ferramentas de desenvolvimento
- Posts completos com conteúdo realista
- Sistema de comentários funcional
- Componente Avatar reutilizável
- Ícones modernos com Phosphor Icons
- Formulário para adicionar comentários
- Interações de like e deletar comentários

### 🔄 Próximos Passos
- [x] Sistema de comentários
- [x] Funcionalidade de likes
- [x] Formulário para adicionar comentários
- [ ] Formulário para criar novos posts
- [ ] Autenticação de usuários
- [ ] Melhorar responsividade mobile
- [ ] Persistência de dados
- [ ] Funcionalidade de deletar comentários
- [ ] Sistema de notificações

## 📖 Recursos

- [Rocketseat Ignite](https://rocketseat.com.br/ignite) - Curso de fundamentos do React
- [Vite](https://vitejs.dev/) - Documentação oficial
- [Tailwind CSS](https://tailwindcss.com/) - Documentação oficial
- [Biome](https://biomejs.dev/) - Documentação oficial
- [Phosphor Icons](https://phosphoricons.com/) - Biblioteca de ícones

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais durante o curso da Rocketseat.

---

<div align="center">
  <p>Desenvolvido com ❤️ durante o curso <strong>Fundamentos do React</strong></p>
  <p><a href="https://rocketseat.com.br">Rocketseat</a></p>
</div>
