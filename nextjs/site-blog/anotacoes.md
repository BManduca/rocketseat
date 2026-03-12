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
