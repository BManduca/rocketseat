# A Revolução industrial

## Contexto histórico

- Tudo começou no chão de fábrica, nas indústrias.
  - Porque lá tinha uma linha de produção, aonde nós temos:
    - Pedido
    - Matéria-prima
    - Produto

      ```mermaid
      graph LR
          obj1([Pedido]) --> obj2((Matéria-prima)) --> obj3[Produto]

      ```

- Antes da adoção das práticas Lean, o tempo médio para a execução de um pedido em fábricas era de seis semanas.
- Quando esse pedido era finalizado, apenas 70% dos pedidos eram entregues no prazo.
- O modelo tradicional de produção gerava desperdício, processos ineficientes e altos custos.

  ```mermaid
  flowchart LR
      P1["<b>Processo 1</b><br/>Deu tudo certo<br/>(Total: 0 problemas)"] -->|Sem erros| P2["<b>Processo 2</b><br/>+1 problema<br/>(Total: 1 problema)"]
      P2 -->|Transfere 1 problema| P3["<b>Processo 3</b><br/>+1 problema<br/>(Total: 2 problemas)"]
      P3 -->|Transfere 2 problemas| P4["<b>Processo 4</b><br/>+1 problema<br/>(Total: 3 problemas - Mapeado aqui!)"]
      P4 -.->|"Volta todo o processo<br/>para corrigir desde a etapa 1"| P1

      style P1 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
      style P2 fill:#fff3cd,stroke:#ffc107,stroke-width:2px,color:#856404
      style P3 fill:#ffe5d0,stroke:#fd7e14,stroke-width:2px,color:#8a4100
      style P4 fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
  ```

## Implementação das Pŕaticas Lean

- Inspirado pelo Sistema Toyota de Produção, o Lean Manufacturing revolucionou a indústria.
- O tempo médio de produção foi reduzido para menos de três semanas.
- A taxa de pedidos entregues no prazo aumentou para 90-95%.

## Impacto no Mercado

- Empresas que não adotaram o Lean perderam a competitividade
- Muitas organizações faliram ou saíram do mercado devido à ineficiência.

## Consequências da Falta de Adaptação

- Empresas que não implementaram práticas eficientes perderam espaço no mercado.
- Exemplo: A General Motors enfrentou falência em 2009 antes de reformular seus processos.
- A Kodak, mesmo sendo pioneira na fotografia digital, manteve processos rígidos e ineficientes, perdendo relevância para concorrentes mais ágeis.
- A Nokia, que já dominou o mercado de celulares, não conseguiu adaptar sua estrutura de produção à nova realidade do setor, sendo superada por Apple e Samsung.

## Evolução das Práticas Lean

- Apartir dos anos 1980, o sucesso do Lean Manufacturing consolidou essa filosofia como um diferencial competitivo.
- Empresas ocidentais começaram a implementá-lo de forma transversal, buscando maior eficiência e produtividade.
