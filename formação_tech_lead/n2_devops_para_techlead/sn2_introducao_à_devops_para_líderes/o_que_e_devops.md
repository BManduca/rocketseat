# O que é DevOps?

- Vai muito além de tecnologia, vai muito além de cargo
- Nasceu com o principal objetivo:
  - Quebrar a barreira entre o time de Dev e o time de Operações.
    - Começa tudo com as famosas frases:
      - 'na minha máquina funciona'
      - 'não vou ser babá de dev'
    - Isso acontece no mercado, no dia a dia..
    - Mas isso impacta muito mais na organização
      - Porque cada uma das áreas, elas tem objetivos diferentes e com objetvos diferentes, realmente vai haver conflitos.

## Recapitulando os objetivos de cada área

### Time Dev

- Desenvolver a aplicação.
- Corrigir bugs.
- Executar testes.
- **Liberar novas versões o mais rápido possível.**

### Time Operações

- Fazer deploy da aplicação.
- Gerenciar e manter a infraestrutura.
- Manter as aplicações disponíveis e evitar o Downtime.

## O conflito

- Um lado(dev) quer fazer deploy rápido.
  - Porque ele precisa entregar.
  - Novas releases.
- Outro lado(ops) quer garantir a disponibilidade
  - Garantindo que a aplicação esteja funcionando.
  - Não adianta liberar uma nova funcionalidade e gerar uma indisponibilidade.

## Voltando ao que é DevOps...

- DevOps traz consigo princípios e ferramentas
  - Mas o que é o princípio?
    - É como se fosse uma descrição de como ou por que as coisas devem ser feitas e ter uma idéia:
      - de como isso deve ser feito
      - qual ferramenta vai ser utilizada
      - qual tecnologia vai ser utilizada
  - Formando uma filosofia que afeta todo o ciclo de vida de software.
  - Além do time de Dev e Operações envolve também:
    - Time de QA.
    - Time de Segurança.

    ```mermaid
    flowchart TB
        subgraph Validacoes["Atuação de Qualidade e Segurança"]
            direction LR
            T_QA["QA (Testes e Qualidade)"]
            T_SEC["Sec (Análise de Segurança)"]
        end

        subgraph Ambientes["Esteira de Ambientes"]
            direction LR
            DEV["Ambiente Dev"] --> QA_ENV["Ambiente QA"] --> STG["Ambiente Stage (Espelho de Prod)"] --> PROD["Ambiente Prod"]
        end

        Validacoes -.->|"QA + Sec aplicados"| DEV
        Validacoes -.->|"QA + Sec aplicados"| QA_ENV
    ```

## Trabalho colaborativo

- Todos trabalhando juntos para garantir o sucesso do projeto.
  - Principalmente para Empresa
  - Claro que cada um vai ter sua vitória individual, sua conquista e objetivo individual, mas tudo tem que ser com base no sucesso e no objetivo que a empresa pretende atingir.
  - É muito mais fácil aplicar algo de QA ou de SEC no início ao invés de quando já estiver em produção.
- Juntos podem:
  - Discutir o projeto de acordo com a especialidade de cada um.
  - Definir arquitetura.
    - Momento em que os times de Infra, time de SRE e o time de DevOps podem discutir qual a arquitetura que vai ser utilizada e principalmente indicar, talvez, alguns frameworks, algumas boas práticas para que o time de desenvolvimento possa trabalhar.
  - Identificar risco de segurança.
    - Consigo escanear meu código para saber, por exemplo, se esse código tem alguma vulnearabilidade, se alguma biblioteca está com vulnerabilidade, sendo assim, é importante trabalhar dessa forma.
  - Melhores práticas
    - Qual melhor prática para trabalhar com mensageria?
    - Qual melhor prática para trabalhar com cache?
    - Qual melhor prática para trabalhar com automação?
    - Cada um com a sua especialidade em si, vai conseguir contribuir para que a gente defina melhores práticas nesse cenário.
  - Riscos de implementação
    - Por exemplo, deploy em Dev funcionou, deploy em QA não.
      - O que aconteceu?
      - Qual foi a limitação?
      - Por que não tivemos sucesso?
      - Onde esbarrou?
      - Então com base nessas informações, a gente vai transformar, todo esse cenário em um ciclo de feedback e através desse ciclo é possível saber, porque em ambiente de QA estava de tal forma e por isso não funcionou.
