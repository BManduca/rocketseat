# Curso NextJs

## Diferença entre _app e _document

1. _app
    - É um component
    - É um wrapper (agrupador)
    - Envolve toda a aplicação
    - É executado tanto no client quanto no server
    - Basicamente ele serve para dizer/controlar como as páginas serão renderizadas, como serão gerenciados estados globais, layout globais...


2. _document
    - Serve para controlar a estrutura inicial do HTML que vem do servidor
    - Funciona(executa) somente do lado do servidor
    - Nem sempre esse arquivo é necessário(existe aplicações que não utiliza)


## Components Link e Image

1. Link
    - Vem de 'dentro' do next
    - Estende a tag anchor do HTML tradicional
    - Ao utilizarmos o Link é realizado um prefetch e quando o usuário dar um hover em algum link,
    já é feito um prefetch do link, sendo assim, quando o usuário clicar, a página já vai ter sido pré-carregada (download), sendo assim, o carregamento dela vai ser muito mais rápido e fluído...
    - Não realiza o refresh da página inteira

2. Image
    - Vem de 'dentro' do next
    - Estende a própria tag image do HTML
    - Geralmente os campos mais utilizados são: src, width, height e alt
    - Já aceita os padrões mais novos de extensão das imagens

## App router 

### React Server Componentes

- Os React Server Components vieram para resolver um problema:
    - A quantidade de JS que é enviada para o client

- Como resolver esse problema?
    - Reduzir a quantidade de JS enviado para os client.

- Os RSC iniciaram no final dos anos 2020

- **Definição**:
    - Componentes que rodam **exclusivamente** no servidor
    - Para evitar a confusão entre SSR e RSC:
        - Quando temos o SSR, é feito a geração da página
        - Essa página é pré renderizada no servidor
        - O HTML é enviado para o client e é enviado junto um JS, para assim fazer o processo de Hydration

- Hydration:
    - Processo de adicionar interatividade à componentes pré-renderizados no server
    - RSC não "hidratados"
        - Uma vez que ele é renderizado no servidor, não é re-renderizado mais.

- SSR 🆚 RSC
    - a grande diferença entre os dois: Granularidade
        - No SSR, como utilizamos até aqui no projeto como exemplo o GetServerSideProps no next, dentro da pasta pages, ou seja, com a PagesRouter, toda a página é pré-renderizada no servidor, então o html é enviado para o client junto com o bundle, para criar interatividade.
    - Server Side Rendering
        - Página inteira pré-renderizada no servidor.
    - React Server Components
        - Apenas o componente é renderizado no servidor.

- RSC Patterns
    - Composition
    - [DOCS Composition patterns](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns)

- Considerações
    - ✅ Prós
        - Reduz bundle size
        - Segurança
            - Informações sensíveis, apenas no server
        - Melhoria no SEO
        - Perfomance
            - Reduz o processamento no client
        - Não precisa de hydration


    - ❌ Contras
        - Sem React Hooks
        - Sem APIs do Browser
            - Nada de sessionStorage, localStorage, window, document...
        - Complexidade
            - Novo paradigma no Ecossistema React.js
