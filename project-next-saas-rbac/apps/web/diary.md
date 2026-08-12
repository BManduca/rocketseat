# 2026-08-12 - Reimplementing Auth Pages

## Server Actions
- Formas de executar ações que vem através de interações do usuário com a aplicação, porém, do lado do servidor da nossa aplicação.
- O servidor aqui mencionado não é o nosso back-end(api) e sim o servidor do Node integrado ao próprio NextJS
- Vantagens:
  -Da mesma forma que utilizar o conceito de Server Components, diminui a quantidade de JavaScript enviado para o client da nossa aplicação, ou seja, para o browser, o uso de server actions tem o mesmo propósito. Quando executamos uma Server actions, que nada mais é que uma função, ela é executada como uma requisição HTTP.

## Hook UseActionState
- Um Hook do react que permite retornar informações de uma Action para exibição na página
-
