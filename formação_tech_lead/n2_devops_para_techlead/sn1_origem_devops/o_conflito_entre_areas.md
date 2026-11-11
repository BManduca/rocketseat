# O conflito entre as áreas

# Introdução

- Muitos dos problemas de gestão, entrega(deploy) e confiança na área de TI vem de um conflito histórico.
- Você já deve ter escutado algo como:
  - Hoje eu vou ser babá de DEV.
  - Na minha máquina funciona.
  - A pipe não esta funcionando.
  - O sistema está lento.
  - Isso não é comigo.
  - O time de segurança que bloqueou.
  - E muitas outras
- Geralmente o time técnico é muito técnico
  - Time de Segurança e Desenvolvimento: Pensa que se o time de desenvolvimento for utilizar essa biblioteca, tá dizendo aqui no meu relatório que ela tem uma vulnerabilidade, então não pode usar e bloqueia o time de desenvolvimento de usar, porém, o time de desenvolvimento precisa daquilo para realizar aquela entrega, desta forma, se os dois trabalharem juntos, pode-se encontrar um meio do caminho.
  - Não é simplesmente falar "Bloqueia e se vira.." ou falar "Foi o time de segurança que bloqueou.."
  - É necessário pensar como um todo, como um time...
- Seja da área de desenvolvimento ou da área de operações.
- O que isso significa:
  - A gente tem que ter menos preocupação
- Hoje em dia temos muita preocupação com o como as coisas são feitas.
- Pouca preocupação com o porquê

## Responsabilidade das áreas

- Time de Desenvolvimento: Foca em responder rapidamente ao mercado, criando novas funcionalidades, produtos e serviços.
- Time de Operações: Foca em manter o serviço estável, confiável e seguro para os usuários finais.

  ```mermaid
  flowchart LR
    NG[Time de Negócio] -->|ideia 1| DV[Time de Dev]
    NG -->|ideia 2| DV
    NG -->|ideia 3...| DV
    DV -->|nova funcionalidade| MURO{"Muro (Análise e Julgamento)"}
    MURO -->|Reprovado| DV
    MURO -->|Aprovado para produção| OPS[Time de Ops]
    OPS -->|sobe funcionalidade| AMB[Ambiente de Produção]
    AMB -->|suposta quebra / instabilidade| QB[Quebra no Ambiente]
    QB -->|impacta diretamente| CL[Cliente]
    CL -->|não recebe a funcionalidade| NG
  ```

## Conflito entre as equipes

- Desenvolvedores precisam entregar código rapidamente e garantir que chegue à produção.
- O time de operações precisa manter a estabilidade e segurança do sistema.
- O desenvolvimento isolado pode resultar em deploys problemáticos, quebrando a aplicação em produção.

## Impacto no objetivo da empresa

- O conflito entre os times afeta a meta global da organização.
- Operações, para garantir estabilidade, pode bloquear novos deploys para evitar indisponibilidades.
- Isso prejudica a inovação e a capacidade de resposta rápida ao mercado.
  - Então Operações tem que deixar tudo passar? Não, é preciso identificar uma maneira de passar isso com segurança, de passar com qualidade.
-
