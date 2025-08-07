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

## Formas de Rodar o React
* Usando tag script em HTML
  * Basicamente é criar todo o HTML e adicionar o React via tag script
  * Focado em projetos que necessitem de certa urgência, como uma landing page para ser comercializada, um projeto pessoal ou para faculdade ou até mesmo estudos

* Através de ferramentas de contrução (bundlers)
  * O bundler já cria todo o ecossistema do React com: 
    * Components
    * Transpilação de código
  * O Bundler consegue transformar vários arquivos que é criado com React em um ou mais arquivos que não seriam legíveis para seres humanos, mas legível para a máquina em si e simplesmente 'joga' na tela
  * Um dos principais bundlers:
    * ![Ícone Vite](./assets/vite_16x_16.png) Vite
      * Seu maior foco é ser utilizado como SPA (Single Page Application)
      * Extremamente rápida para compilar com o projeto
        * O vite tem um compilador feito em Rust
        * O compilador consegue moldar todo o código React para um código JavaScript, que será interpretado pelo navegador de maneira muito rápida
      * Utilizada amplamente no mundo todo
 
## JSX - JavaScript XML
* É uma sintaxe que permite escrever código HTML dentro do JavaScript
* Dentro do React, ele facilita a criação de interfaces via componentes, tornando o código mais intuitivo.
* Não precisa criar vários arquivos para ter um componente funcional.

## Fragments
* No JSX, a parte escrita do HTML sempre precisa retornar um único elemento pai.
  * Pode ser qualquer elemento HTML, como uma **div** ou qualquer outro
  * Pode ser uma tag vazia, que é conhecida como **Fragment**, ela permite agrupar sem criar elementos adicionais.
    * Se existir dois componentes ou mais em paralelo, vai precisar retornar encapsulando eles um elemento pai, ou seja, não pode retornar elementos soltos em paralelo, pois, o JSX não entende isso
    * É necessário que as tags HTML estejam agrupadas para fazer a renderização, o desenho correto na tela

  * Exemplos:
    1. Maneira incorreta
        ```
          return(
            <h1>Olá</h1>
            <p>Seja bem-vindo!</p>
          )
        ```

    2. Usando uma <div> (mas geraando um nó extra no DOM)
        ```
          return(
            <div>
              <h1>Elemento 1</h1>
              <p>Elemento 2</p>
            </div>
          )
        ```

    3. Usando uma tag vazia **<>** (sem gerar nada a mais no DOM)
        ```
          return(
            <>
              <h1>Elemento 1</h1>
              <p>Elemento 2</p>
            </> 
          )
        ```

    4. Um sinônimo da **<>** é o **<React.Fragment>**
        ```
          return(
            <React.Fragment>
              <h1>Elemento 1</h1>
              <p>Elemento 2</p>
            </React.Fragment>
          )
        ```

## O que é o Babel.js?
* Basicamente o Babel é um 'transpilador' de JavaScript, ou seja, tranforma o HTML puro em uma linguagem que o JavaScript entenda
* o babel 'pega' o código moderno (como ES6+) e converte para uma versão compatível com a maioria dos navegadores.

## Tipos de CSS e Como Estilizar o HTML
* Existem diversas formas de utilizar o CSS dentro do constexto React, como:
  * CSS interno (inline)
      ```
        export default function App() {
          return (
            <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
              Background Azul
            </div>
          )
        }
      ```

  * CSS externo
      ```
        // styles.css
        .container {
          background-color: lightblue;
          padding: 20px;
        }
      ```

      ```
        //app.js
        import "styles.css"

        function App() {
          return (
            <div classname="container">
              Background Azul
            </div>
          )
        }
      ```

  * CSS Modules
    * Parecido com CSS Externo, mas a diferença é que ele cria classes e essas classes são tranformadas em variáveis de JS
    * Podendo assim manipular dentro do seu component React
      ```
        //styles.module.css
        .container {
          background-color: lightblue;
          padding: 20px;
        }
      ```

      ```
        //app.js

        import styles from "./styles.module.css"

        export default function App() {
          return (
            <div className={styles.container}>
              Background Azul
            </div>
          )
        }
      ```

  * CSS-in-JS
    * Escreve o CSS inteiramente dentro do JS, não necessitando de arquivos CSS externos
      ```
        //app.js
        import styled from "styled-components";

        const Container = styled.div`
          background-color: lightblue;
          padding: 20px;
        `
        export default function App() {
          return <Container>Background Azul</Container>;
        }
        
      ```

  * Sass e outrs pré-processadores
      ```
        //styles.scss

        $bg-color: lightblue

        .container {
          background-color: $bg-color;
          padding: 20px;
        }
        
      ```

      ```
        //app.js

        import "./styles.scss"

        export default function App() {
          return (
            <div className="container">
              Background Azul
            </div>
          )
        }
      ```

  * TailwindCSS e outras bibliotecas
      ```
      //app.js

      export default function App() {
        return (
          <div className="bg-blue=300 p-5">
            Background Azul
          </div>
        )
      }
        
      ```

* Cada uma dessas formas tem seus pontos positivos e negativos, então, cabe a pessoa escolher a melhor para aplicar no contexto do projeto.

## Components
* **Teoria**
  * Um component React é como se fosse uma tag HTML personalizada, criada do seu jeito.
  * Bloco de UI: Ele é como uma peça de lego, só que feita de código que representa uma parte da interface de usuário
  * Tags customizadas: Um componente abre e fecha uma tag, e essas tags obrigatoriamente precisam começar com a primeira letra em caixa alta
  * Funcional: Ele precisa estar dentro de uma função onde o HTML a ser desenhado na página é retornado.
  * Reutilizável: Ele pode ser reutilizado em diferentes partes da aplicação.
  * Receba estilização: Ele recebe estilos CSS através das propriedades **style** ou **className** (que é a mesma coisa que class do HTML)
  * Multi-definições: Ele pode ser atômico onde não há muita lógica funcional, ou com mais inteligência integrado nele.

* **Estrutura**
  ```
    export function Button() {
      return (
        <button className="bg-green-500 border rounded-2xl border-zinc-500">Botão</button>
      )
    }
  ```

* **Propriedades**
  * uma propriedade é como se fosse um atributo do HTML porém totalmente customizado para você. Uma peça de lego pode ter várias cores, tamanhos e formas diferentes.
  * Personalização dinâmica: as propriedades (ou props) permitem modificar o comportamento e a aparência do componente de forma flexível.
  * Atributos customizados: Funcionam como atributos HTML, mas são passadas para componentes React como atributos desse componente, justamente com os atributos HTML
  * Passagem de dados: Um componente pode receber valores externos como texto, números, objetos, funções ou até mesmo outros componentes através das props.
  * Imutabilidade: As propriedades são somente leitura dentro do componente, ou seja, não podem ser modificadas diretamente.
  * Padrões opcionais: um componente pode definir valores padrão para as propriedades caso nenhuma seja fornecida.
  * Composição: Elas podem ser usadas para renderizar outros componentes dentro do componente pai, tornando-o mais flexível.
  * Propriedades especiais: **children** e **key** são duas propriedades do React e não podem ser utilizadas de maneira customizada.
    * children: é uma prop especial do React que representa o conteúdo passado entre as tags do componente.
    * key: é uma prop usada pelo React para identificar elementos de uma lista e otimizar a renderização.