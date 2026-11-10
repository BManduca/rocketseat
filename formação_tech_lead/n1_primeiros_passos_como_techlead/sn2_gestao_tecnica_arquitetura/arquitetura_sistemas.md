# Arquitetura do Sistema (Importância de Conhecer)

1. Conceitos fundamentais.
2. Por Que a Arquitetura do Sistema é Importante?
3. Ferramentas e Técnicas para Detalhar a Arquitetura.

## <span style="color: #79ffd9ff">O que é </span><span style="color: #9369d6ff">Arquitetura de Sistemas?</span>

- Como os serviços se comunicam.
- Como os dados são armazenados e acessados.
- Como a escalabilidade, segurança e performance são tratadas.

## <span style="color: #79ffd9ff">Ferramentas </span><span style="color: #9369d6ff">Técnicas</span>

- Mermaid: Utilize para criar diagramas de arquitetura.
- Utilize Confluence, Notion ou README.md para documentar e compartilhar a arquitetura com o time.
  - Com base nessas ferramentas pode se ter decisões importantes sobre arquitetura, quais os pontos fortes e fracos dessa aplicação, como que ela esta se comunicando, para que se possa traçar estratégias de como que se vai abordar as melhorias
- Monitoramento e Logs: Utilize ferramentas como Prometheus, Grafana e ELK Stack para monitorar a arquitetura em tempo real, identificando rapidamente gargalos e problemas.

### Exemplo Prático 🧑🏻‍💻🏗️

- Escalar um sistema de e-commerce que já está crescendo rapidamente.
  - Gargalos de perfomance quando o número de requisição aumenta.
  - Dificuldades de manutenção devido à faltade modularidade.
  - Problemas de integração quando novos módulos são adicionados.

  - #### O Que Não Fazer
    - O sistema pode enfrentar bloqueios e gargalos de desempenho com aumento de requisições.
    - A complexidade aumenta devido à dependência direta do pagamento ao banco de dados.
      - Foi criado um tight coupling entre o banco de dados de estoque e o banco de dados de pagamento, ou seja, um serviço agregado com outro, sem uma separação lógica, o que vai dificultar bastante de escalar.
    - A escalabilidade é comprometida pela falta de isolamento adequado dos módulos e comunicação não otimizada.
      - por esse ponto, se for necessário duplicar ou triplicar 100 vezes mais, não seria possível repetir essa arquitetura para chegar no ponto desejado, ou seja, no ponto em que o sistema vai, vamos dizer assim, não so imediatamente, mas em um ano ou posteriormente, demonstrar aonde ele poderia chegar.
  - #### O Que Fazer
    - A comunicação entre os microserviços será feita através de um API Gateway, centralizando e simplificando as requisições.
    - A segurança e autenticação do usuário são tratadas de forma centralizada.
    - O serviço de checkout se conecta ao serviço de pagamento de forma assíncrona, evitando bloqueios e aumentando a performance.
    - Resumindo, foi feito uma separação de comunicação de Microserviços, utilizando o API Gateway e então poderiamos ter vários desses serviços sendo substituídos, caso algum viesse a falhar, logo em seguida já iria subir outro.
    - Como essas camadas estão com isolamento melhor definido, fica muito mais fácil de escalar.
    - Então, desta forma, poderia ter uma segurança na parte até de autenticação, como todo mundo está conversando com Gateway, sabemos extamente como é que poderia fazer essa parte de autenticação.
    - Desta forma, foi criado menos dependência no código final.

### Progressão da aplicação | Monólito => Microserviços

- #### Início

  ```mermaid
  flowchart LR
    B1["Frontend"]
    B2["Backend: Sistema de Checkout"]
    B3["Cache"]
    B4["Database de Pagamento"]

    B1 --> B2
    B2 --> B3
    B3 --> B4
  ```

- #### Uma abordagem um pouco mais simples (sugestão)

  ```mermaid
  flowchart LR
    B1["Frontend"]
    B2["API Gateway"]
    B3["Service de Checkout"]
    B4["Payment Gateway"]
    B5["Database de Estoque"]
    B6["Cache"]
    B7["Database de Pagamento"]


    B1 --> B2
    B2 --> B3
    B3 --> B4
    B3 --> B5
    B3 --> B6
    B5 --> B7


  ```

  - aqui já temos uma melhoria, pois já temos o Frontend se conectando com API Gateway, ou seja, os serviços já estão mais separados
  - Agora já temos um "Serviço de Checkout, ou seja, uma tratativa/serviço de checkout, o que faz bastante sentido no e-commerce
  - Aqui podemos ver uma solução local, aonde o service de checkout ele se comunica com database de estoque, que também se comunica com database de pagamento e ao mesmo tempo o próprio serviço de checkout se comunica também com o payment gateway e o cache
  - Deu uma mellhorada do primeiro diagrama para esse, mas ainda não é exatamente o que estamos buscando.

- #### Uma abordagem mais interessante => Arquitetura de Microsserviços

  ```mermaid
  flowchart LR
    B1["Fronend"]
    B2["API Gateway"]
    B3["Service de Checkout"]
    B4["Service de Pagamento"]
    B5["Service de Estoque"]
    B6["Payment Gateway"]
    B7["Database de Estoque"]
    B8["Cache"]


    B1 --> B2
    B2 --> B3
    B3 --> B4
    B3 --> B5
    B4 --> B6
    B5 --> B7
    B5 --> B8

  ```

## Lições

- Conhecer a arquitetura do sistema é fundamental para garantir que você e sua equipe possam tomar decisões informadas sobre como escalar, manter e expandir o sistema no futuro.
