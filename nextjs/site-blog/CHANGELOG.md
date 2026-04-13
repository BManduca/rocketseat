# Changelog

Este arquivo registra todas as alterações notáveis feitas neste projeto. O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-04-13

### Corrigido
- **Página de Post (`src/pages/blog/[slug].tsx`)**: 
    - Corrigido erro `ts(2769)` onde o post poderia ser `undefined`. Adicionada cláusula de guarda para garantir que o componente não tente renderizar sem dados.
    - Corrigido erro de tipagem no construtor `new Date()` ao passar `post.date`.
    - Corrigida a tipagem das propriedades do componente `Image` do Next.js, removendo fallbacks desnecessários após a validação do post.
    - Melhorada a semântica do `alt` na imagem do autor.

## [0.1.0] - 2026-04-13

### Adicionado
- Estrutura inicial do blog com Next.js e Contentlayer.
- Landing page com seções de Hero, Features, Customer Stories e Support.
- Sistema de busca e navegação.
- Integração com componentes UI (Breadcrumb, Avatar, Button).
- Configuração do Biome para linting e formatação.
- Suporte a Markdown para posts via Contentlayer.
