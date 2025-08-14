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

## Eventos
* Os eventos no React funcionam de forma semelhante aos eventos do JavaScript, mas com algumas diferenças na sintaxe.

### Principais diferenças entre eventos no React e no Vanilla JavaScript
* No React, os eventos são encapsulados em um sistema chamado **SyntheticEvent**, que melhora o desempenho e a compatibilidade entre navegadores.
  * No HTML, faríamos algo como:
    ``` <button onclick='handleClick()'> ``` 

  * Já nos componentes passamos uma função diretamente:
    ```<button onClick={handleClick}>```

<br />

* No React, a função de evento recebe automaticamente um objeto do evento, que pode ser utilizado como referência ao DOM.

<br />

* Comparação Vanilla JavaScript e React

  | Vanilla JavaScript                    | React     |
  | ------------------------------------- | --------- |
  | onclick/addEventListener('click')     | onCLick   |
  | onchange/addEventListener('change')   | onChange  |
  | onkeydown/addEventListener('keydown') | onKeyDown |
  | onsubmit/addEventListener('submit')   | onSubmit  |

## SyntheticEvent
* É um wrapper (encapsulador) sobre os eventos nativos do navedor no React.
* Ele serve para garantir que os eventos funcionem de forma consistente em diferentes navegadores e para melhorar a eficiência da performance.
* O react gerencia todos os eventos através de um **event delegation** (delegação de eventos) em um único listener no nível superior.
* Ele sabe quais eventos criar ou destruir conforme faz a renderização dos componentes em tela.

```
  👆 Isso melhora a performance porque evita a criação e múltiplos event listeners no DOM.
```


## React Hooks
* Foram introduzidos no React 16.8 para permitir o uso de estado e outras funcionalidades do React em componentes funcionais
* Antes dos Hooks, só componente de classe podiam ter estado e acessar o ciclo de vida do React, o que tornava o código mais complexo  e díficil de reutilizar.

  ![Logo Icon ReactJS](./assets/reactjs_logo_icon.png) ``` Os Hooks são como serviços reutilizáveis, porém obrigatoriamente criados com funções. Você pode utilizar eles para reaproveitamento e organização do código. ```

* O React conta com os seus **próprios hooks**, sendo os **principais**:
  * useState
  * useEffect
  * useContext

* **Complementares**:
  * useRef
  * useMemo
  * useCallback
  * useReducer
  * useTransition, entre outros...

* Por boas práticas, sempre devem começar com a palavra **use** seguido o próposito dele.
* Permitem usar estado, ciclos de vida, memorização e outras funções nos componentes
* Segue a regra de invocação, devendo ser chamados no topo do componente
  ```
    ⚠️ Os Hooks NÃO podem ser executados em loops, condições ou funções aninhadas.
  ```

* Tornam o código mais reutilizável e organizado com hooks customizados
* Eliminam a necessidade do uso do 'this', 'bind', etc. Facilitando a escrita e compreensão do código
* São a base para a abordagem moderna do React, sendo amplamente usados em projetos recentes.

<br />

<details>
  <summary>useState</summary>

  - É um **Hook** do React que permite gerenciar o estado dentro de um componente funcional.
  - Ele aramzena um valor e fornece uma função para atualizá-lo, garantindo que o React saiba quando re-renderizar o componente.
  - Você pode transportar valores das props para um estado e então eles serão mutáveis.
  - Não há limite de estados para um componente.

    <details>
      <summary>Sintaxe básica</summary>

      - O **useState** recebe um valor inicial em seu parâmetro
      - Ele retorna uma tupla , sendo o primeiro índice o valor do estado e o segundo a função para atualizar o estado.
        - **useState(0)**: Define o estado inicial como 0
        - **contador**: Armazena o valor atual do estado
        - **setContador**: Função usada para atualizar o estado

      - Quando **setContador(novoValor)** é chamado, o componente re-renderiza automaticamente

        ```
          function Counter() {
            const [counter, setCounter] = React.useState(0)

            return (
              <>
                <p>Contador: {counter}</p>
                <button onClick={() => setCounter(10)}>Atualizar</button>
              </p>
            )
          }
        ```
    </details>

    <details>
      <summary>prevValue</summary>

      - Em uma atualização é possível utilizar o valor anterior do estado
      - Se o novo valor depender do estado anterior, passe uma função que tem como primeiro parâmetro o **prevValue**
      
        ```
          function Counter() {
            const [counter, setCounter] = React.useState(0)

            return (
              <>
                <p>Contador: {counter}</p>
                <button onclick={() => setCounter(10)}>Atualizar</button>
                <button onClick={() => setCounter((prevValue = prevValue + 1))}>Incrementar</button>
              </button>
            )
          }
        ```
    </details>
</details>

## Renderização condicional
* A renderização condicional no React permite exibir ou ocultar elementos com base em uma condição. Isso é útil para alternar interfaces, mostrar mensagens dinâmicas e muito mais.
* ![JS logo](./assets/js_16_x_16.png) ``` Aqui temos o melhor do JavaScript dentro do React. Para fazer condicionais podemos utilizar qualquer tipo de if do JS ```


<details>
  <summary>Formas de fazer renderização condicional</summary>

  - Operador ternário(**?:**)-Usado quando há duas opções possíveis.
    ```
      const [counter, setCounter] = useState(0)

      return (
        <>
          <p>{counter > 10 ? 'Maior que 10' : 'Menor ou igual a 10'}</p>
          <button onCLick={() => setCounter((prevValue) => prevValue + 1)}>
            Incrementar
          </button>
        <>
      )
    ```

  - Curto-circuito(&&) - Usado quando só há um conteúdo a exibir caso a condição seja verdadeira
    ```
      const [counter, setCounter] = React.useState(0)

      return (
        <>
          {counter > 15 && <p>Maior que 15</p>}
          <button 
            onClick={() => setCounter((prevValue) => prevValue + 1)}
          >
            Incrementar
          </button>
        </p>
      )
    ```

  - Condicional tradicional(if) - Melhor para lógica mais complexa antes do retorno.
    ```
      const [counter, setCounter] = useState(0)

      if (counter > 20) {
        return (
          <p>Maior que 20</p>
        )
      }

      return (
        <button onClick={() => setCounter((prevValue) => prevValue + 1)}>
          Incrementar
        </button>
      )
    ```

    ``` 👆 Essa regra se aplica também para renderização de outros componentes ```

</details>


## Renderização de listas
* A renderização de listas no React é feita iterando sobre um array e gerando elementos dinamicamente
* O método mais comum para isso é o **.map()**, mas também podemos usar o **.filter()** e outras funções de listas do JavaScript para exibir apenas itens específicos
  
  ![Logo JS](./assets/js_16_x_16.png) ``` Novamente o melhor do JavaScript dentro do React. Para organizar listas podemos utilizar qualquer tipo de Array Prototype do JS ```

<details>
  <summary>Formas de fazer renderização de listas</summary>

  - Renderizando listas com **.map()** => O meio mais fácil e comum.
    ```
      function ListName() {
        const [names] = React.useState(['Ana', 'Aline', 'Brunno'])

        return (
          <ul>
            {names.map((name, index) => (
              <li key={`${index}-${name}`}>{name}</li>
            ))}
          </ul>
        )
      }
    ```
    ```
      🚨⚠️ Lembrada propriedade Key?
      É aqui que ela é utilizada para organizar os elementos da árvore de renderização

      Não utiliza apenas o 'index' como chave
    ```
  
  - Filtrando valores com **.filter()**
    
    Podemos fazer um mix dos eventos com o método **filter** para listar apenas os nome que batem com o campo de texto
      ```
        function ListNames() {

          const [names] = React.useState(['Ana', 'Brunno', 'Carlos', 'Daniel', 'Eduarda'])
          const [search, setSearch] = React.useState("")

          return (
            <div>
              <input
                type='text'
                placeholder='Buscar nome..'
                value={search}
                onChange = {(e) => setSearch(e.target.value)}
              />

              <ul>
                {names.filter(
                  names => names.toLowerCase().includes(search.toLowerCase())
                ).map(
                  (name, index) => (
                    <li key={`${index}-${name}`}>{name}</li>
                  )
                )}
              </ul>
            </div>
          )
        }
      ```

  ```
    🔥 Qualquer função de lista pode ser utilizada pra chegar no resultado que você desejar.
  ```
</details>