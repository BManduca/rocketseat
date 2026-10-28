# <span style="color: #2fcbffba">Code Review Eficaz </span><span style="color: #914dffff"> - </span><span style="color: #37ff8eba">cultura de feedback</span>

- Code Review é extremamente importante, todos do time acabam fazendo, mas especialmente para o Tech Lead acaba tendo um peso maior, que é justamente a sua responsabilidade criar uma formação dentro do time, estabelecer um padrão de qualidade e manter um ambiente positivo.

## Pontos importantes da aula:

1. Avaliando o Código
2. Code Review Eficiente
3. Responsabilidade do Tech Lead

## <span style="color: #68ffc5ee">Code Review </span><span style="color: #914dffff">Eficaz</span>

- Participando de um pressuposto, que todos os sistemas começam com uma idéia bem simples, com uma estrutura e essa estrutura geralmente pode até ser um espelho da estrutura de times, geralmente as empresas começam com poucas pessoas, aonde é fácil manter uma coesão, ter controle, um domínio sobre a totalidade do nosso código e a medida do que as coisas vão evoluindo, a gente vai adicionando mais totalidades, vamos adicionando mais ferramentas, mais arquivos e o sistema em si vai crescendo, porém, isso é o esperado do nosso sistema, ele precisa crescer, precisa evoluir, é um organismo que vai continuar crescendo de acordo com a necessidade da empresa.
- De acordo com o crescimento e complexidade da aplicação, pode acontecer em algum momento que algo de errado, seja um pequeno errinho, um bug que vai para produção, um PR que passou batido com uma falha de segurança e que acaba se tornando muito fácil, apartir do momento que temos nosso primeiro bug, nossa primeira falha, acaba se tornando mais propício que as coisas acabem desandando, principalmente se você esta em um time que se movimenta muito rápido, geralmente em empresas que tem metodologias ágeis, que tem que fazer deploy de código todo dia, então é muito fácil chegar em um momento que uma gambiarra vai levar a outra gambiarra e débitos técnicos não endereçados vão gerar mais débitos técnicos e como Tech Lead, a nossa função é entender o que ta acontecendo e conter essas coisas, porque inevitavelmente, nos sistemas vamos encontrar problemas, vamos encontrar bugs, vamos encontrar soluções ineficientes, mas o nosso papel é mitigar esses erros e ao mesmo tempo fazer com o que as pessoas cresçam, setar um padrão de qualidade e fazer com que as pessoas do nosso time, elas possam aprender/evoluir também junto com a gente.

## Áreas de importância de um Code Review

- 3 principais áreas que devemos nos importar/avaliar
  1. Qualidade:
     - Um dos fatores principais em ser Tech Lead é 'virar' essa pessoa, aonde os outros te veem como uma referência, um padrão de qualidade
     - É preciso ter um padrão de código muito lá em cima, um padrão de qualidade muito alto, para que as pessoas possam te ver como um objetivo a ser alcançado, para que elas possam se refletir em você e você setar o nível de qualidade do seu time
  2. Escalabilidade
     - Nossas soluções, nossos PRs, quando vamos fazer um code review a gente precisa ver se aquele código vai escalar ou se vamos criar problemas no futuro.
  3. Segurança
     - Um fator extremamente importante e que muitas vezes passa batido, mas precisamos nos preocupar com a segurança e não devemos deixar para pensar como algo a mais ou que não é responsabilidade de um Tech Lead.

- Pensando dessa forma, trazendo essa bagagem, a parte que podemos dizer que é a mais, especialmente para o Tech Lead, é a parte que precisamos passar isso para as outras pessoas, para que o nosso time veja esse padrão de qualidade e consiga replicar, consiga crescer e consiga ser um time extremamente eficiente.

## <span style="color: #68ffc5ee">Review </span><span style="color: #914dffff">Eficiente</span>

- ### No que devemos focar?
  - Legibilidade e Manutenibilidade
  - Performance
  - Segurança
  - Escalabilidade
  - Testabilidade
