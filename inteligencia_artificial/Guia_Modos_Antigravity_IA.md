# Guia dos Modos do Antigravity IDE

## Visão geral

O Antigravity organiza sua experiência em torno de um **Agent**
inteligente, que pode trabalhar em diferentes estratégias de execução.
Em vez de oferecer vários botões como o Cursor (Ask, Plan, Debug etc.),
ele concentra essas capacidades no Agent.

  Funcionalidade   Antigravity
  ---------------- -------------------------------------------
  Ask              Conversa normal com o Agent
  Plan             Plan Mode
  Debug            Agent realizando investigação e correções
  Agent            Agent
  Multitask        Múltiplos agentes

------------------------------------------------------------------------

## 1. Ask

Utilize quando desejar apenas conversar sobre o código.

Exemplos:

-   Explique esta função.
-   Analise esta arquitetura.
-   O que este erro significa?

Ideal para tirar dúvidas sem modificar arquivos.

------------------------------------------------------------------------

## 2. Plan Mode

O Agent primeiro entende o problema e cria um plano antes de alterar o
projeto.

Fluxo:

1.  Analisa o projeto.
2.  Divide a tarefa em etapas.
3.  Apresenta o plano.
4.  Aguarda aprovação.
5.  Executa cada etapa.

Ideal para:

-   novas funcionalidades;
-   grandes refatorações;
-   mudanças em diversos arquivos;
-   arquitetura.

Exemplos:

> Use Plan Mode para adicionar autenticação OAuth.

> Faça um plano para migrar este projeto para Docker.

------------------------------------------------------------------------

## 3. Fast Mode

Prioriza velocidade.

O Agent implementa diretamente as alterações sem apresentar um
planejamento detalhado.

Ideal para:

-   pequenos bugs;
-   ajustes de CSS;
-   pequenas refatorações;
-   geração rápida de código.

------------------------------------------------------------------------

## 4. Debug

Não existe como botão separado.

Peça naturalmente:

-   Debug este erro.
-   Descubra por que os testes falham.
-   Analise este stacktrace.

O Agent pode executar testes, ler logs, editar arquivos e validar a
correção.

------------------------------------------------------------------------

## 5. Multitask

Permite utilizar múltiplos agentes trabalhando em paralelo.

Exemplo:

-   Agente 1: implementar autenticação.
-   Agente 2: escrever testes.
-   Agente 3: atualizar documentação.
-   Agente 4: revisar performance.

------------------------------------------------------------------------

# Comparação rápida

  Cursor              Antigravity
  ------------------- ----------------------
  Ask                 Conversa com o Agent
  Plan                Plan Mode
  Debug               Agent
  Agent               Agent
  Background Agents   Múltiplos agentes

## Recomendação

-   **Plan Mode:** funcionalidades grandes e alterações estruturais.
-   **Fast Mode:** mudanças pequenas e rápidas.
-   **Ask:** aprendizado, revisão e análise.
-   **Debug:** investigação e correção de problemas.
-   **Multitask:** dividir tarefas complexas entre vários agentes.
