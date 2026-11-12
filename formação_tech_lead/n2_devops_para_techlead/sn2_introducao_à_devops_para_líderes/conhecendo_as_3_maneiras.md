# Conhecendo as 3 maneiras do DevOps

## O que são as 3 maneiras do DevOps?

- São princípios e lições aprendidas da manufatura e empresas com modelo de gestão e alta confiança.
- DevOps tem usa derivação desses princípios e demonstra como é sua aplicação no FLuxo de Valor Tenológico.
  - Basicamente foi coletado tudo que fez a diferença nessas empresas, o que realmente mudou o jogo para elas, o que fez com que elas mantessem competitivas no mercado, aumentasse a qualidade de seus produtos, aumentassem a satisfação dos clientes com relação aos produtos e serviços.
- Em DevOps o Fluxo de Valor Tecnológico é:
  - Etapas necessárias para converter uma ideia comercial em um serviço tecnológico que entrega valor ao cliente.
  - O valor é gerado quando os serviços estão funcionando em produção.
    - Não adianta, ter terminado a funcionalidade, colocado um commit tudo certo, porém, se não chegou em produção e estiver tudo validado, esse serviço não esta entregue.
  - Durante o desenvolvimento nenhum valor é gerado.
- Necessário um equilíbrio entre entrega rápida e disponibilidade e desempenho dos serviços.

## As 3 maneiras

- FLuxo:
  - Possibilita fluxo rápido da esquerda para a direita.
    - Do time de Desenvolvimento para o Time de operações.
  - Do desenvolvimento para Operações e para o cliente.
- Feedback
  - Possibilia feedback rápido e constante em todos os estágios do fluxo, ajuda a evitar que os problemas se tornem recorrentes.
    - Vamos supor que foi necessário fazer o deploy, executar uma pipe em uma nova aplicação e identificou um problema.
    - Você corrigiu o problema e guardou para si.
    - Se outra pessoa fosse usar essa pipe e encontrasse esse problema, não teria feedback para corrigir e aprender sobre ele. Ai já era.
    - Nesse cenário, ao identificar um problema, atuo na correção e principalmente já vou gerando um feedback.
    - Ao trazer para área de QA, o time de dev desenvolveu, mandou para o ambiente de QA, o ambiente de QA começou a testar e foi identificado um bug. Então essa informação já é retornada e ai, o que acontece? Esse bug não vai passar para stage, não vai passar para prod, porque conseguimos ter essa parte do feedback.
    - Isso ajuda bastante a resolver problemas e principalmente, eles não se tornarem recorrentes.
- Aprendizado Contínuo:
  - Possibilita a criação de aprendizado a partir dos sucessos e falhas.
    - Deploy X deu problema tal
    - beleza. Qual foi o problema?
    - Como que a gente corrige?
    - E assim vamos fazendo todo esse mapeamento para ter um aprendizado contínuo.
  - Permite multiplicar os efeitos de novos conhecimentos transformados descobertas locais em melhorias globais para toda a organização.
