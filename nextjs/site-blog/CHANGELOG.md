# Changelog

Este arquivo registra todas as alterações notáveis feitas neste projeto. O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-04-13

### Corrigido
- **Página de Post (`src/pages/blog/[slug].tsx`)**: 
    - Corrigido erro `ts(2769)` onde o post poderia ser `undefined`. Adicionada cláusula de guarda para garantir que o componente não tente renderizar sem dados.
    - Corrigido erro de tipagem no construtor `new Date()` ao passar `post.date`.
    - Corrigida a tipagem das propriedades do componente `Image` do Next.js, removendo fallbacks desnecessários após a validação do post.
    - Melhorada a semântica do `alt` na imagem do autor.

## [0.1.2] - 2026-04-20

### Alterado
- **Listagem do Blog (`src/pages/blog/index.tsx`)**:
    - Implementado `getStaticProps` para pré-renderizar os posts em ordem decrescente de data.
    - A página passou a receber os dados via props, removendo a dependência direta de dados dentro do template.
- **Detalhe do Post (`src/pages/blog/[slug].tsx`)**:
    - Implementados `getStaticPaths` e `getStaticProps` para geração estática dos posts.
    - Definidos os 5 posts mais recentes para pré-renderização inicial com `fallback: 'blocking'`.
    - Incluído retorno `notFound` para slugs inexistentes.
- **Templates (`src/templates/blog/blog-list.tsx` e `src/templates/blog/post-page.tsx`)**:
    - Refatorados para receber `posts` e `post` via props tipadas.
    - Removida a leitura direta de `allPosts` e de `router.query` no template de post.
    - Ajustada a URL de compartilhamento para usar `post.slug` diretamente.

### Removido
- Removidas páginas de demonstração de estratégia de renderização:
    - `src/pages/ssg.tsx`
    - `src/pages/ssr.tsx`
    - `src/pages/isr.tsx`

## [0.1.0] - 2026-04-13

### Adicionado
- Estrutura inicial do blog com Next.js e Contentlayer.
- Landing page com seções de Hero, Features, Customer Stories e Support.
- Sistema de busca e navegação.
- Integração com componentes UI (Breadcrumb, Avatar, Button).
- Configuração do Biome para linting e formatação.
- Suporte a Markdown para posts via Contentlayer.
