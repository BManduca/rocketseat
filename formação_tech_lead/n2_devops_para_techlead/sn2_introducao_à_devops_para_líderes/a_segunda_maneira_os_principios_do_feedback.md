# A Segunda Maneira - Os princípios do Feedback

## O que vismos até agora?

- **Primeira maneira**: Fluxo de trabalho rápdio da esquerda para direita.
- **Segunda maneira**: Feedback rápido e constante da direita para a esquerda em todos os estágios do fluxo de valor.

```mermaid
flowchart LR
    DEV[Desenvolvimento] --> OPS[Operações]
    OPS --> |Feedback| DEV
    DEV --> |Feedback| OPS
```

```mermaid
flowchart LR
    subgraph ProcessCI[Processo CI]
        BD[Build] --- LSN{RESULTADO}
        LSN --> R1[Sucesso]
        LSN --> R2[Falha]
        R2 --- |Feedback| MTV[Motivo?]
    end

```

## Objetivo da segunda maneira

- Criar um sistema de trabalho mais seguro e resiliente.
- Geralmente detectamos e corrigimos problemas em uma aplicação quando um incidente está acontecendo.
  - Isso não pode estar acontecendo em um ambiente aonde a gente procura ser escalável, aonde a gente quer entregar valor rápido para o cliente, aonde a gente quer ajudar nossa empresa a agregar mais valor.

## Transições de Monólitos para Microsserviços

- **Monólitos**: São sistemas grandes e únicos aonde qualquer alteração pode impactar toda a aplicação.

```mermaid
flowchart LR
    EU[End-User]
    subgraph APP[Monolito]
        direction TB
        USR[Usuários] ~~~ PRD[Produto] ~~~ AVAL[Avaliação]
    end

    EU --> |acessa via endpoint| APP
```

---

- **Microserviços**: Sistemas divididos em pequenas partes independentes, cada uma com sua responsabilidade.

```mermaid
flowchart LR
    EU[End-User]
    APGW[API Gateway]

    EU --> |recebe todo o trafégo do user|APGW

    subgraph Microsserviços
        USR[Usuários]
        PRD[Produto]
        AVAL[Avaliação]

        USR --> |cadastrar/comprar|PRD
        USR --> |pode fazer|AVAL
        AVAL --> |esta relacionada|PRD
    end

    APGW --> |exporta serviços para| Microsserviços
```

---

- A mudança ocorreu devido à necessidade de maior **flexibilidade**, **escalabilidade** e **experimentação** no desenvolvimento de software.

---

## Sistemas complexos

- Uma característica comum de um sistema complexo é que ele desafia a capacidade de uma pessoa ver e entender como todas as partes funcionam.
- Principalmente detectar onde e qual é o problema.

## 4 ações para trabalhar com sistemas complexos

- [A Segunda Maneira - Os princípios do Feedback](#a-segunda-maneira---os-princípios-do-feedback)
  - [O que vismos até agora?](#o-que-vismos-até-agora)
  - [Objetivo da segunda maneira](#objetivo-da-segunda-maneira)
  - [Transições de Monólitos para Microsserviços](#transições-de-monólitos-para-microsserviços)
  - [Sistemas complexos](#sistemas-complexos)
  - [4 ações para trabalhar com sistemas complexos](#4-ações-para-trabalhar-com-sistemas-complexos)
  - [Ver quando os problemas ocorrem](#ver-quando-os-problemas-ocorrem)
  - [Aglomerar e resolver problemas para construir novo conhecimento](#aglomerar-e-resolver-problemas-para-construir-novo-conhecimento)
  - [Manter a qualidade mais próxima da fonte](#manter-a-qualidade-mais-próxima-da-fonte)
  - [Permitir a otimização para núcleos de trabalho mais adiante](#permitir-a-otimização-para-núcleos-de-trabalho-mais-adiante)

## Ver quando os problemas ocorrem

- No contexto de DevOps, observabilidade é a disciplina mais conhecida, porém não se resume a isso.
- Feedback deve ser em todos os estágios do ciclo de desenvolvimento.
  - Gerência de produtos.
  - Desenvolvimento.
  - QA.
  - InfoSec.
  - Operações.
- Devemos criar também a telemetria para que possamos ver como todos os componentes de nosso sistema estão operando.
  - Criar métricas para que a gente consiga observar como os componentes do nosso sistema estão operando.
- Resultado:
  - Detecção e recuperação rápida de problemas.
  - Obter uma base de conhecimento para evitar problemas no futuro.
    - Não adianta saber que um problema existe, armazenar ele na minha base, ter um débito técnico registrado e no fim não realizar nenhum tipo de autuação. È preciso autuar para corrigir isso.

## Aglomerar e resolver problemas para construir novo conhecimento

- Detectar não é o suficiente
- Devemos aglomerar (mobilizar pessoas necessárias) para resolver os problemas.
- Tem como objetivo resolver problemas antes que se espalhem, por exemplo, afetem mais usuários.
- Além disso transformar ações em débitos técnicos para que possam ser resolvidos definitivamente para que não aconteçam novamente ao futuro.

- ### A corda de Andon da Toyota
  - Em uma das fábricas da toyota, existiu/existe uma corda que todo funcionário é treinado para puxar quando algo dá errado.
  - O líder da equipe é acionado imediatamente para resolver o problema.
  - Caso não seja possível resolver em um tempo pré-determinado, toda a linha de produção para, a fim de mobilizar todas as pessoas necessárias para resolver o problema.
  - Em vez de contornar o problema ou agendar uma correção "para quando tiver tempo", o problema é resolvido imediatamente.
    - mas o que nos deparamos , é um bug e preciso corrigir o mesmo.
      - Do lado de operações, o que eu posso fazer para quando eu fizer um deploy em produção e ele so ser ativado efetivamente depois de um determinado período de tempo, para garantir que as requisições estejam sendo recebidas, estão sendo processadas, algo nesse sentido.

- ### A importância da aglomeração
  - A aglomeração é necessária pelos seguintes motivos:
    - Impede que o problema seja transferido para o próximo estágio.
      - Evitando um maior custo e esforço para resolução e aumento da dívida técnica.
    - Impede que um novo trabalho seja iniciado, trazendo consigo o mesmo ou novos erros.
    - Possibilita o aprendizado, evita a perda de informações importantes devido ao esquecimento ou mudança de circunstâncias.
      - A medida que o tempo passa fica impossível reproduzir o erro de quando o problema ocorreu.
        - Alguns fatores tecnológicos também impedem a gente de reproduzir o mesmo erro quando o problema ocorre.
        - Exemplo:
          - Fiz um deploy e depois o banco trocou, a api mudou, alguém já fez deploy por cima...
          - Sem contar que para reproduzir o erro, não pode ser em produção, então será necessário subir outro ambiente, esse ambiente não vai estar equalizado com o de produção e isso vai resultar na não geração do erro.

- ### A corda de Andon no fluxo de valor tecnológico
  - Devemos criar uma cultura que encoraja as pessoas a informar quando algo da errado.
  - Mesmo que a pessoas foi a que causou o problema.
  - Isso fornece um feedback rápido, permitindo isolar e diagnosticar rapidamente o problema evitando que se complique com o passar do tempo.
  - Essa cultura não deve procurar culpados, mas sim incentivar o feedback, construção de conhecimento e evitar que o problema se repita.

## Manter a qualidade mais próxima da fonte

- Em algumas empresas existem **inspeções e processos de aprovação** que não são executados por membros do time que executam o desenvolvimento das tarefas em si.
- Isso aumenta a probabilidade de falhas futuras.
- Quando a tomada de decisão acontece mais longe de onde o trabalho é executado, temos a redução da qualidade da decisão.
- Reduzimos também a força do feedback entre causa e efeito.
- Impedindo nossa capacidade de aprender com sucessos e falhas.
- O outro lado da moeda:
  - Os times devem ter maturidade para não burlar o sistema para alcançar objetivos locais.
  - Sempre deve ser priorizado o objetivo global, ou seja, o objetivo da empresa.

```mermaid
flowchart LR
  DEV[Amb Dev] --> |time dev faz deploy|QA[Amb QA]
  QA --> STG[Amb Staging]
  STG --> PRD[Amb Prod]
  QA -.-> |time dev solicita|AprovQA[Aprovador QA]
  AprovQA --> Aprov{Aprovar}
  Aprov --> |S|STG[Amb Staging]
```

- ### Controles de qualidade ineficientes
  - Outra equipe executa tarefas manuais e repetitivas que são propensas a erros. Essas tarefas deveriam ser automatizadas e executadas pelas equipes que precisam fazer o trabalho.
  - Aprovação de pessoas que estão distante do trabalho, que tomam decisões sem conhecimento adequado do trabalho ou de possíveis problemas.
  - Alto volume de documentação com detalhes que correm o risco de se tornarem obsoletos rapidamente.
  - Entregas de grandes lotes para equipes e comitês para aprovação e processamento.
    - Exemplo: QA fazer o teste de um grande número de novas funcionalidades.

- ### O que devemos fazer?
  - Precisamos que a equipe responsável pelo trabalho encontre e corrija problemas como parte do trabalho diário.
  - Assumir a responsabilidade pela qualidade e segurança das tomadas de decisão ao invês de contar com aprovações de executivos distante de onde o trabalho é executado.
    - Como podemos assumir essa responsabilidade, mas garantindo sempre a qualidade e a segurança das entregas?
  - Desenvolvedores devem ser capaz de executar seus testes sobre demanda, permitindo um teste rápido do código até que os problemas sejam corrigidos e o software possa ser implementado em produção.
    - Entregar uma infraestrutura para que o time de dev, possa executar um teste rápido do código, até que os problemas sejam corrigidos. Por exemplo, ele vai ficar desenvolvendo e testando, e com isso, além do teste rápido, a gente consegue permitir que os problemas sejam corrigidos rapidamente também, porque quanto maior o teste, maior a alteração, maior o nível de correção.
    - Self-service é muito importante.
    - O trabalho colaborativo entre as equipes é essencial para acelerar o feedback e o aprendizado.
    - Precisamos fornecer o feedback para todos o mais rápido possível.

## Permitir a otimização para núcleos de trabalho mais adiante

- Os dois tipos de clientes:
  - Cliente externo:
    - Paga pelo serviço que estamos entregando, o usuário final do produto.
  - Cliente interno:
    - Membros de outras áreas que utilizam o entregável do nosso trabalho diário.
- Um erro comum é pensar somente no cliente externo
- Devemos ter empatia pelos problemas que acontecem com os clientes internos.
  - Exemplo:
    - Um time está tentando fazer o deploy em prod, tem toda a documentação para ele preencher as informações do seu values, para ele executar a pipeline de deploy.
    - Acontece um problema, ele não entendeu ou ele preencheu alguma coisa errada e ninguém dá atenção para esse cara para ele conseguir fazer o deploy corretamente.
    - Então a gente tem que lembrar, de ter empatia pelos problemas que acontecem com nossos clientes internos.
    - Se mesmo com a documentação, ele não conseguir entender, **será que eu posso melhorar a documentação**?
    - Se mesmo com a documentação atualizar, ainda não ficou claro, será que não é hora de fazer uma **sessão de workshop** para explicar alguns conceitos?
      - Porque com os conceitos as pessoas vão ter um melhor conhecimento, um melhor entendimento.
  - Permitindo identificar e melhorar problemas no projeto que impedem o fluxo rápido do trabalho.
    - Arquitetura, desempenho, estabilidade, testes, configurações e segurança.
- Com isso conseguirmos criar qualidade direto na fonte, permitindo integrar proativamente melhoras em cada serviço que construímos.
  - Porque estamos conversando com pessoal que usa.
  - Estamos recebendo feedbacks deles.
  - Estamos passando feedbacks para eles (usuários).
  - Principalmente tendo a questão da empatia.

- ### A importância da segunda maneira
  - Feedback rápido é fundamental para ter qualidade, confiabilidade e segurança em todo o fluxo de valor tecnológico.
  - Até o momento, se paramos para analisar, não comentamos sobre ferramentas, falamos ao todo sobre princípios e se seguimos os princípios, fluxo rápido da esquerda para direita, feedback rápido, nós já conseguiremos entender onde cada ferramenta realmente entra e qual problema que cada ferramenta resolve.
