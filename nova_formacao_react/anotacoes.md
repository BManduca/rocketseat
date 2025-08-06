# Nova Formação React

## Tipos de Aplicações Web
* Existem hoje duas formas principais para criar aplicações utilizando o React como base de renderização
* Em ambas as maneiras todo o carregamento da página é dinâmico e não precisa recarregar completamente o HTML, vindo do servidor.

### SPA - Single Page Application
* É uma aplicação web que carrega uma única página HTML e atualiza dinamicamente
* O navegador carrega um HTML básico junto com todos os arquivos de JavaScript e CSS
* Pode ser hospedado em qualquer CDN (ex.: AWS S3)

### SSR- Server Side Rendering
* É uma aplicação web que carrega uma única página HTML e atualiza dinamicamente
* O navegador carrega um HTML básico junto com os arquivos de JavaScript e CSS
* É necessário um servidor NodeJS para hospedar a aplicação

## DOM vs VIrtual DOM
1. DOM (Document Object Model): É a estrutura de árvore que os navegadores criam para representar o HTML da página no lado do JavaScript.
2. Virtual DOM: É uma cópia leve do DOM real, mantida pelo React. Quando há mudanças no estado, o React atualiza primeiro o Virtual DOM, compara com a versão anterior (processo chamado "diffing"), e aplica apenas as mudanças necessárias no DOM real (processo chamado "reconciliation"), otimizando a performance.

## Árvore de Renderização
* Conhecida mundialmente como "Render Tree", ela é usada pelo navegador para desenhar os elementos na tela, após toda a parte de diffing e reconciliation já finalizada.
* Essa estrutura permite que dados sejam enviados de cima para baixo. De componentes (elementos) pai para componentes (elementos) filhos.
  
## "Componentização" e Reutilização
* O React permite que você crie interfaces em pedaços individuais chamados de "componentes"
  * Esses componentes podem ser reutilizados e compostos para formar interfaces mais complexas de maneia modular e organizada.
  * Cada componente encapsula sua própria lógica e UI, tornando o código mais manutenível e reutilizável.
  * Em sua maioria são funcionais (baseado em funções), pode ser que em projetos legados você veja classes.
* Um dos principais recursos que a biblioteca entrega é comunicação entre componentes por meio de:
  * Propriedades => dados passados de pai para filho
  * Contexto => Dados compartilhados de forma global na aplicação
 