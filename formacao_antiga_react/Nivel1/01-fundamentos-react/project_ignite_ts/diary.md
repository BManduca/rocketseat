## Anotações

### Trocando extensões de maneira rápida
``` Get-ChildItem -Filter *.jsx | Rename-Item -NewName { $_.Name -replace '\.jsx$', '.tsx' } ```

* Por partes:
  1. Get-ChildItem -Filter *.jsx
    1. Esse comando lista os arquivos do diret´roio atual que terminam com .jsx.
    2. É equivalente ao **ls** ou **dir**, mas com filtro:
       1. **-Filter *.jsx** diz: só me mostre arquivos com extnesão **.jsx**.
    3. Resultado: uma lista de arquivos **.jsx**.

  2. **|** (pipe) 
     1. O pipe passa o resultado do comando anterior para o próximo.
     2. Neste caso, cada arquivo **.jsx** listado será enviado para o **Rename-Item**.

  3. Rename-Item -NewName { ... }
     1. Este comando renomeio cada arquivo.
     2. A opção -NewNamerecebe um bloco de script { ... } para gerar um novo nome.

  4. { $_.Name -replace '/\.jsx$', '.tsx' }
     1. Esse bloco é executado para cada arquivo individualmente.
     2. $_ representa o objeto atual do loop (nesse caso, o arquivo)
     3. $_.Name é o nome do arquivo, como **Componente.jsx**.
     4. **-replace '/\.jsx$', '.tsx'** é uma substituição de string usando regex:
        * **/\.jsx$** => corresponde a arquivos que terminam com **.jsx**.
        * **.tsx** => é a nova extensão
        * Resultado: **'Componente.jsx'** se torna **'Componente.tsx'**