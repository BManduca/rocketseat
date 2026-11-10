# Objetivos do Lean Manufacturing

- Eliminar desperdícios.
- Otimizar processos.
  - Feedback mais rápido.
  - Entender aonde estar o problema.
- Reduzir custos.
- Impulsionar a inovação.
- Diminuir o tempo de colocação de produtos no mercado.
  - Relação diretamente ligado ao que temos hoje na área de DevOps, que são as entregas em pequenos lotes, ou seja, entrega contínua.

# Benefícios do Lean Manufacturing

- Aumento da produtividade e eficiência
  - Processo otimizado, redução de custo, assim consigo ser mais produtivo e eficiente, assim gastando menos no final de tudo.
  - Manutenção da qualidade dos produtos e serviços.
    - Acompanhando bem de perto cada etapa do processo.
    - Todas as pessoas envolvidas, cada um sabe a sua responsabilidade, o seu papel e o foco esta no cliente ou produto final.

    ```mermaid
    flowchart LR
        P1["<b>Processo 1</b><br/>Deu tudo certo<br/>(Total: 0 problemas)"] -->|Sem erros| P2["<b>Processo 2</b><br/>+1 problema<br/>(Total: 1 problema)"]
        
        P2 --x|"Linha parada!<br/>(Não transfere o erro)"| P3
        P2 -.->|"Alerta acionado"| MOB["<b>Linha de Produção Parada</b><br/>Todos se mobilizam para<br/>corrigir o problema na etapa 2"]
        
        MOB -->|"Problema corrigido!<br/>Transfere 0 problemas"| P3["<b>Processo 3</b><br/>Segue o fluxo normal<br/>(Total: 0 problemas)"]
        P3 -->|Sem erros| P4["<b>Processo 4</b><br/>Deu tudo certo<br/>(Total: 0 problemas)"]

        style P1 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
        style P2 fill:#fff3cd,stroke:#ffc107,stroke-width:2px,color:#856404
        style MOB fill:#f8d7da,stroke:#dc3545,stroke-width:2px,stroke-dasharray: 5 5,color:#721c24
        style P3 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
        style P4 fill:#d4edda,stroke:#28a745,stroke-width:2px,color:#155724
    ```
