## Mini Projeto Gestão Educacional

### Descrição
* O sistema é uma plataforma de gestão educacional que centraliza o cadastro de escolas, turmas, disciplinas, professores e alunos;
* Nele, cada escola mantém suas turmas organizadas por código, turno e sala;
* Professores são vinculados às disciplinas que lecionam e têm seu histórico de admissão registrado;
* Alunos podem se matricular em diversas turmas, acompanhado de ínicio e término de cada disciplina;
* Endereços e telefones são tratados de forma estruturada, garantindo consistência nos dados de contato;
* Dessa forma, o sistema oferece visão integrada de toda a operação acadêmica, desde o ingresso do aluno até o planejamento de grade e alocação de docentes.

### Entidade principais
* Aluno (PK: matrícula) com nome, telefones (0-N) e endereço composto (rua, número, complemento);
* Escola (PK: CNPJ) com nome, telefones (0-N) e endereço composto;
* Turma (PK: código) com turno e salaDisciplina (PK: código) com nome, carga horária e ementaProfessor (PK: matrícula) com CPF, nome e telefones(1-N);
* Disciplina (PK: código) com nome, carga horária e ementa;
* Professor (PK: matrícula) com CPF, nome e telefones (1-N);

### Relacionanemtos
* Estuda: Aluno => Escola (1 Aluno em 1 Escola; 1 Escola com N alunos);
* Possui: Escola => Turma (1 Escola com N Turmas; 1 Turma em 1 Escola);
* Matrícula (associativa): Aluno <=> Turma (N:M, sem atributos próprios);
* Turma_Disciplina (associativa): Turma <=> Disciplina (N:M, com data_inicio e data_termino);
* Disciplica_Professor (associativa): Disciplina <=> Professor (N:M, sem atributos próprios);
* Trabalha: Professor => Escola (1 Professor em 1 Escola; 1 Escola com N Professores, com data_admissão);

## Consultas Avançadas (Tipo/sub-linguagens do SQL)

### Tipos/sub-linguagens do SQL
* A linguagem SQL(Structured Query Language) é composta por diferentes grupos de comandos, cada um destinado a um propósito específico no gerenciamento de um banco de dados relacional;
* Os principais "tipos"(ou sub-linguagens) da SQL: DDL, DML, DCL, TCL e DQL;
    * DDL - Data Definition Language (Linguagem de Definição de Dados)
      * DDL engloba os comandos responsáveis pela definição e estrutura do banco de dados. isso envolve criar, alterar e remover objetos como tabelas, índices, visões(views), esquemas(schemas), etc.
          * CREATE
              * Cria novos objetos (tabelas, índices, sequências, esquemas, views, funções, etc.)
                  ```
                  -- Criar tabela de usuários
                  CREATE TABLE usuarios (
                      id SERIAL PRIMARY KEY,
                      nome VARCHAR(100) NOT NULL,
                      email VARCHAR(150) UNIQUE NOT NULL,
                      data_cadastro TIMESTAMP NOT NULL DEFAULT NOW()
                  );
                  ```
        
          * ALTER
              * Altera a estrutura de um objeto existente.
              * Pode ser usado para:
                  * Adicionar/Remover/Modificar colunas.
                  * Ajustar restrições (constraints).
                  * Renomear objetos.
                      ```
                      -- Adicionar coluna "telefone" na tabela usuários
                      ALTER TABLE usuarios
                      ADD COLUMN telefone VARCHAR(20);

                      -- Modificar tipo da coluna "telefone" para CHAR(11)
                      ALTER TABLE usuarios
                      ALTER COLUMN telefone TYPE CHAR(11);

                      --Renomear a tabela "usuarios" para "clientes"
                      ALTER TABLE usuarios
                      RENAME TO clientes;
                      ```

          * DROP
              * Remove objetos do banco (tabelas, views, índices, esquemas, etc.)
              * Essa operação é irreversível (a menos que use backup ou "DROP...CASCADE" com cautela).
                    ```
                    -- Apagar a tabela clientes (e todos os dados nela)
                    DROP TABLE clientes;

                    -- Apagar a view "vw_vendas_mes" se ela existir
                    DROP VIEW IF EXISTS vw_vendas_mes;
                    ```

          * TRUNCATE
              * Remove todas as linhas de uma tabela, sem registrar individualmente cada linha para rollback.
              * É mais rápido que um DELETE sem WHERE.
              * Não remove a estrutura (colunas, restrições, índices), apenas zera os dados.
                ```
                -- Excluir rapidamente todos os registros da tabela "orders"
                TRUNCATE TABLE orders;
                ```

          * RENAME
              * RENAME TABLE usuarios TO clientes; --(em versões que suportam RENAME)
                ```
                RENAME TABLE usuarios TO clientes; --(em versões que suportam RENAME)
                ```

          * COMMENT
              * Adiciona ou altera comentários de descrição para objetos (tabelas, colunas, etc.), auxiliando na documentação interna do banco.
                ```
                COMMENT ON TABLE produtos IS 'Tabela que armazena informações dos produtos da loja';
                COMMENT ON COLUMN produto.price IS 'Preço de venda em reais (BRL)';
                ```



    * DML - Data Manipulation Language (Linguagem de Manipulação de Dados)
      * DML engloba os comandos que servem para inserir, atualizar, deletar e, em parte, selecionar os dados das tabelas. É o "corpo principal" das operações cotidianas de CRUD (CREATE, READ, UPDATE, DELETE);

      * INSERT
          * Insere novas linhas (tuplas) em uma tabela
            ```
            --Inserir um único registro
            INSERT INTO clientes (nome, email, data_cadastro)
            VALUES ('Ana Maria', 'ana.maria@example.com', '2024-05-30');

            -- Inserir múltiplos registros de uma vez
            INSERT INTO clientes (nome, email)
            VALUES
                ('Bruno Souza', 'bruno.souza@example.com'),
                ('Carla Lima', 'carla.lima@example.com');
            ```

      * UPDATE
          * Modifica valores de colunas para as linhas que satisfazem uma condição (WHERE).
          ```
          -- Alterar o email de um cliente específico
          UPDATE clientes
            SET email = 'ana.m.new@example.com'
          WHERE id = 1;

          -- Incrementar preço de todos os produtos em 10%
          UPDATE produtos
            SET price = price * 1.10;
          ```

      * DELETE
        * Remove linhas de uma tabela que satisfazem a condição (WHERE).
        * Sem cláusula WHERE, apaga todas as linhas(recomendado usar com cuidado ou em conjunto com transação).
            ```
            -- Remover cliente com determinado ID
            DELETE FROM clientes
            WHERE id = 42;

            -- Remover todos os pedidos CANCELADOS
            DELETE FROM orders
            WHERE status = 'CANCELLED';
            ```
      * UPSERT (INSERT ... ON CONFLICT)
        * Em PostgreSQL, o comando INSERT ... ON CONFLICT(...) DO UPDATE permite inserir ou, caso chave duplicada (conflict), atualizar o registro.
            ```
            INSERT INTO produtos (product_id, product_name, price)
            VALUES (10, 'Produto 10', 199.90)
            ON CONFLICT (product_id)
            DO UPDATE SET price = EXCLUDED.price;
            ```


    * DQL - Data Query Language (Linguagem de Consulta de Dados)
        * DQL refere-se ao comando SELECT e correlacionados (cláusulas WHERE, GROUP BY, HAVING, ORDER BY, JOIN, etc.). Serve para consultar/ler dados do banco, retornando conjuntos de resultados (result sets).
        * SELECT / FROM / WHERE / GROUP BY / HAVING / ORDER BY / LIMIT / OFFSET / JOINs (parte do DQL)
            ```
            SELECT coluna1, coluna2, ...
                FROM tabela
            [WHERE condicao]
            [GROUP BY colunas]
            [HAVING condicao_agrupamento]
            [ORDER_BY colunas [ASC|DESC]]
            [LIMIT n];
            ```

    * DCL - Data Control Language (Linguagem de Controle de Dados)
        * DCL envolve comandos relacionados ao controle de acesso e permissões no banco de dados. Serve para conceder (grant) ou revogar (revoke) privilégios de usuários/roles.
        * GRANT
          * Concede privilégios (permissões) sobre objetos (tabelas, views, sequences, etc.) ou até mesmo privilégios de sistema (ex.: criar banco, criar tabelas).
          * Pode atribuir permissões de leitura (SELECT), escrita (INSERT, UPDATE, DELETE), execução (EXECUTE em funções) e outras.
            ```
            -- Conceder permissão de SELECT E INSERT na tabela "produtos" ao role "vendedor"
            GRANT SELECT, INSERT ON produtos TO vendedor;

            -- Conceder pemissões de todas as ações (ALL PRIVILEGES) na base de dados "loja" ao role "admin_loja"
            GRANT ALL PRIVILEGES ON DATABASE loja TO admin_loja;

            -- Conceder permissão de USAGE em um schema
            GRANT USAGE ON SCHEMA relatório TO analista;
            ```
          
        * Revoke
          * Revoga privilégios anteriormente concedidos.
          * O uso de Revoke retira acesso a comandos específicos.
            ```
            -- Revogar permissão de DELETE  de "vendedor" sobre a tabela "produtos"
            REVOKE DELETE ON produtos FROM vendedor;

            -- Revogar todas as permissões de um role específico
            REVOKE ALL PRIVILEGES ON DATABASE loja from admin_loja;
            ```

    * TCL - Transaction Control Language (Linguagem de Controle de Transações)
        * TCL engloba os comandos que controlam o fluxo de transações no banco de dados, garantindo atomicidade, consistência, isolamento e durabilidade (ACID).
        * Permite confirmar (commit) ou desfazer (rollback) uma série de operações.

        * BEGIN (ou START TRANSACTION)
          * Inicia uma transação explícita.
          * A partir desse ponto, todas as operações DML (INSERT, UPDATE, DELETE) fazem parte de uma transação atômica.
            ```
            BEGIN;

            -- dentro da transação, várias operações:
            UPDATE contas SET saldo = saldo - 100.00 WHERE id = 1;
            UPDATE contas SET saldo = saldo + 100.00 WHERE id = 2;
            ```

        * COMMIT
          * Confirma definitivamente todas as alterações realizadas desde o último begin.
          * Após o COMMIT, as mudanças tornam-se permanentes e visíveis para outras transações.
            ```
            -- confirmar as alterações feitas
            COMMIT;
            ```

        * ROLLBACK
          * Desfaz todas as alterações realizadas desde o último BEGIN (ou desde o último ponto de salvamento).
          * Útil para garantir a integridade quando ocorre um erro ou condição inesperada.
            ```
            -- desfazer tudo que foi feito na transação
            ROLLBACK;
            ```

        * SAVEPOINT
          * Cria pontos intermediários dentro de uma transação que permitem rollback parcial até esse ponto, sem descartar tudo.
            ```
            BEGIN;

            -- OPERAÇÃO A
            INSERT INTO contas (cliente, saldo) VALUES ('Alice', 1000);

            SAVEPOINT sp1;

            -- OPERAÇÃO B (pode falhar)
            UPDATE contas SET saldo = saldo - 200 WHERE cliente = 'Bob';

            -- se OPERAÇÃO B falhar, podemos voltar apenas a sp1
            ROLBACK TO SAVEPOINT sp1;

            -- continuar a transação
            INSERT INTO contas (cliente, saldo) VALUES ('Carlos', 500);

            COMMIT;
            ```

        * SET TRANSACTION
          * Define propriedades de transação, como nível de isolamento (READ COMMITED, REPEATABLE READ, SERIALIZABLE).
            ```
            SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
            ```

    * Pontos importantes
      * Conhecer cada categoria de comandos SQL - DDL, DML, DQL, DCL e TCL - é fundamental para projetar, manipular, consultar, proteger e manter a integridade dos dados de forma robusta.

### Subconsultas no WHERE
* Consulta interna que retorna um conjunto de valores utilizado como critério de filtro na cláusula WHERE
  ```
    SELECT ...
    FROM tabela_principal
    WHERE coluna_principal IN (
      SELECT coluna_secundaria
      FROM tabela_secundaria
      WHERE condicao
    );
  ```

### Uso de EXISTS e NOT EXISTS
* Testa a existência (ou não) de linhas retornadas por uma subconsulta correlacionada.
  ```
    SELECT ...
    FROM tabela_principal tp
    WHERE EXISTS (
      SELECT 1
      FROM tabela_secundaria ts
      WHERE ts.chave = tp.chave
    );
  ```

### Diferença entre IN e EXISTS
* IN: Compara a coluna com um conjunto de valores estáticos retornados por uma subconsulta não correlacionada (bom para listas pequenas)
* EXISTS: Percorre a consulta correlacionada linha a linha e retorna TRUE/FALSE na primeira ocorrência, geralmente eficiente em grandes volumes de dados.

### Quando usar cada um?
* EXISTS: É ideal quando queremos saber se há pelo menos um registro relacionado (sem precisar comparar valores exatos).
* IN: É mais intuitivo quando filtramos contra valores literais ou o conjunto retornado é pequeno e estático.


## Relacionamento e Junções (Sintaxe básica de INNER JOIN)
* A sintaxe padrão para conectar duas tabelas em que se deseja apenas as linhas que tenha correspondência em ambas é:
  ```
    SELECT a.*, b.*
    FROM tabela_a AS a
    INNER JOIN tabela_b AS b
      ON a.chave = b.chave;
  ```

### Uso de aliases (a, b)
* Aliases (apelidos) simplificam a escrita e a leitura quando as tabelas tem nomes longos:
  ```
    SELECT c.first_name, o.order_date,
      FROM customers AS c
      INNER JOIN orders AS o
        ON c.customer_id = o.customer_id;
  ```

## JOIN

### INNER JOIN
* É um tipo de junção em SQL que retorna apenas as linhas que possuem correspondência em ambas as tabelas envolvidas na consulta, ou seja, busca combinar registros de duas (ou mais) tabelas com base em uma condição de igualdade (geralmente entre chaves relacionadas)
* Se não houver correspondência, a linha não aparece no resultado.

### LEFT JOIN (Também chamado de LEFT OUTER JOIN)
* É um tipo de junção SQL que retorna todas as alinhas da tabela esquerda e as linhas correspondentes da tabela da direita(quando há correspondência)
* Se não houver correspondência, os valores da tabela da direita vêm como **NULL**
  ```
  SELECT ...
    FROM tabela_a AS a
    LEFT JOIN tabela_b AS b
      ON a.chave = b.chave;
  ```

### RIGHT JOIN (Também chamado de RIGHT OUTER JOIN)
* Retorna todas as alinhas da tabela da direita e apenas as linhas correspondentes da tabela da esquerda.
* Se não houver correspondênica, os valores da tabela da esquerda aparecem como **NULL**
  ```
  SELECT ...
    FROM tabela_a AS a
    RIGHT JOIN tabela_b AS b
      ON a.chave = b.chave;
  ```

### FULL JOIN (Também chamado de FULL OUTER JOIN)
* Combina o comportamento do **LEFT JOIN** e do **RIGHT JOIN**
* Retorna as correspondências entre eles quando existirem
* Preenche com **NULL** quando não há correspondência em uma das tabelas
  ```
  SELECT ...
    FROM tabela_a AS a
    FULL JOIN tabela_b as b
      ON a.chave = b.chave;
  ```

### Coalesce
* É uma função SQL usada para tratar valores NULL
* Ele retorna o primeiro valor não nulo em uma lista de argumentos

### Filtros Pós-Junção e Precedência
* É preciso ter cuidado ao usar algumas claúsulas, pois, isso pode acabar limitando o uso, por exemplo, de um LEFT JOIN, resultando em um join somente, como um INNER JOIN, saindo totalmente do próposito de toda a consulta criada.
  ```
  SELECT *
  FROM products AS p
  LEFT JOIN order_items AS oi
    ON p.product_id = oi.product_id
  WHERE oi.quantity > 10;
  ```

* Para corrigir essa questão podemos fazer da seguinte forma:
  ```
  SELECT *
  FROM products AS p
  LEFT JOIN order_items AS oi
    ON p.product_id = oi.product_id
  AND oi.quantity > 10;
  ```

## Subconsultas Correlacionadas vs. Não Correlacionadas

### Subconsulta Não Correlacionada
* Executa a subconsulta somente uma vez, retornando um conjunto de valores fixo para uso WHERE ou outra cláusula:
  ```
  SELECT product_id, product_name
    FROM products
  WHERE price > (
    SELECT AVG(price) FROM products
  );
  ```

### Subconsulta Correlacionada
* A subconsulta faz referência a colunas da consulta externa e é reexecutada para cada linha resultante:
  ```
  SELECT
    c.customer_id,
    c.first_name,
    c.last_name
    (
      SELECT COUNT(*)
        FROM orders o
        WHERE o.customer_id = c.customer_id
    ) AS total_pedidos
  FROM customers AS c;
  ```

### Diferenças de performance
* Subconsulta não correlacionada pode ser materializada uma vez; Geralmente é mais rápida.
* Subconsulta correlacionada costuma ser lenta em grandes volumes, pois executa N vezes (onde N = número de linhas da consulta externa).


## Consultas com múltiplas tabelas (juinções em Três ou Mais Tabelas com condição adicional)
### Exemplo envolvendo 4 tabelas
* Tabelas
  * clientes => armazena dados do cliente
  * pedidos => contém o cabeçalho do pedido (inclui cliente_id)
  * itens_pedido => contém cada produto dentro de um pedido (inclui pedido_id e produto_id)
  * produtos => lista de produtos disponíveis

### Exemplo complexo envolvendo 4 tabelas
* Estratégia de junções encadeadas
  * Primeiro, conectar clientes a pedidos via cliente_id
  * Depois, conectar pedido a itens_pedido via pedido_id
  * Finalmente, conectar itens_pedido a produtos via produto_id
  * Aplicar filtro em umda das tabelas intermediárias
  * Se quisermos apenas pedidos com status = 'ENTREGUE' podemos colocar a condição na cláusula WHERE (após a junção), pois estamos usando INNER JOIN em todas:
  ```where pd.status = 'DELIVERED'```

## Subqueries
* É uma consulta SQL inserida dentro de outra consulta principal(query externa), geralmente utilizada para fornecer um valor ou conjunto de valores que serão usados como critério de filtragem, comparação ou agregação.

### Quando usar subqueries?
  * Filtrar dados com base em critérios dinâmicos
  * Realizar comparações com valores calculados
  * Executar agregações intermediárias
  * Reutilizar lógica de consulta
  * Reduzir a complexidade da lógica com CTEs ou JOINs alternativos

  <br>

  | Tipo | Descrição | Retorno | Exemplo de uso |
  |------|-----------|---------|----------------|
  | Scalar | Retorna um único valor (linha e coluna) | 1 linha x 1 coluna | Comparações (=, <, >, etc.) |
  | Column | Retorna uma coluna com vários valores | N linhas x 1 coluna | IN, NOT IN |
  | Row | Retorna uma linha com várias colunas | 1 linha x N colunas | Comparações com tuplas |
  | Table | Retorna múltiplas linhas e colunas (tabela virtual) | N linhas x N colunas | Utilizada em EXISTS, IN, JOIN |


## Conceitos básicos de CTEs

  ### Introdução as CTEs
  * CTE (Common Table Expressions) é uma subconsulta nomeada temporária que pode ser referenciada dentro da query principal.
  ```
    WITH nome_cte AS (
      SELECT ...
    )
    SELECT * FROM nome_cte;
  ```

  ### Vantagens
  * Legibilidade: facilita a leitura de consultas longas;
  * Reuso: Reutiliza resultados intermediários se duplicar lógica;
  * Modularização: Divide uma consulta complexa em blocos;
  * Recursividade: Permite percorrer hierarquias (em WITH RECURSIVE)

  ### Quando usar
  * Consultas com múltiplos passos
  * Agregações intermediárias reutilziadas
  * Consutlas recursivas (ex.: estrutura de gerência, encadeamento de categorias, etc.)

## CTE Não-Recursiva vs. Recursiva
| Tipo de CTE | Descrição |
|-------------|-----------|
| Não-Recursiva | Executada apenas uma vez, como uma subconsulta nomeada |
| Recursiva | Executada repetidamente, chamando a si mesma até uma condição de parada |

* Não-recursiva é útil para modularizar as etapas da consulta, especialmente em análises mais agregadas, com várias tabelas e junções
* Recursiva é mais indicada quando temos relações hierarquicas ou sequenciais, como árvores de categorias, uma estrutura organizacional ou um cálculo de somas progressivas

## Operações de Conjunto em SQL

  ### O que são?
  * As operações de conjunto em SQL servem para combinar os resultados de duas ou mais consultas com a mesma estrutura de colunas.

  ### Resumo de Operações
  | Operador | Descrição |
  |----------|-----------|
  | UNION | Une os resultados de duas consultas eliminando duplicatas |
  | UNION ALL | Une os resultados de duas consultas mantendo as duplicatas |
  | INTERSECT | Retorna apenas os registros comuns entre as consultas |
  | EXCEPT | Retorna registros na primeira consulta que não aparecem na segunda |

  ![Operações](../assets/operacoes.png)

  <br>

  | Operador | Combina dados? | Remove duplicatas? | Traz intersecção? | Traz diferença? |
  |----------|----------------|--------------------|-------------------|-----------------|
  | UNION | Sim | Sim | Não | Não |
  | UNION ALL | Sim | Não | Não | Não |
  | INTERSECT | Não | Sim | Sim | Não |
  | EXCEPT | Não | Sim | Não | Sim |

## UNION - Une eliminando as duplicatas
* o UNION combina os resultados de duas ou mais consultas e remove os registros duplicados do resultado final.
* Os conjuntos devem ter o mesmo número de colunas.
* Os tipos de dados devem ser compatíveis (por posição)
* A ordenação final deve ser feita fora do UNION