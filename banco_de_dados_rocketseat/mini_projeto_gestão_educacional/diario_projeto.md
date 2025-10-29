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
* o UNION combina os resultados de duas ou mais consultas e remove os registros duplicados do resultado final;
* Os conjuntos devem ter o mesmo número de colunas;
* Os tipos de dados devem ser compatíveis (por posição);
* A ordenação final deve ser feita fora do UNION;

## INTERSECT - Interseção entre os conjuntos
- O INTERSECT retorna apenas os registros que estão presentes em ambas as consultas;
- Remove duplicatas do resultado;
- Pode ser usado para verificar a coincidência de dados;

## Window function (Conceito de função de Janela)
* São funções que calculam valores sobre um conjunto de linhas relacionadas, mantendo o detalhe de cada linha;
* Diferente de GROU BY, não colapsam os dados: os detalhes individuais permanecem, e os cálculos são feitos "por cima";

  ### Vantagens
  * Permitem calcular médias, totais, rankings e contagens sem perder o contexto da linha;
  * Muito úteis para rankings, comparações, cumulativos, percentuais, etc;
  * Utilizam a cláusula OVER(...) para definir a janela de cálculo;
  
  ```
    FUNCAO_DE_JANELA() OVER(
      [PARTITION BY coluna_de_divisão]
      [ORDER BY coluna_de_ordenação]
    )
  ```

  ### ROW_NUMBER

  * Atribui um número sequencial único para cada linha dentro de uma partição;
  * Sempre sequencial: 1, 2, 3, ...;
  * Ignora empates nos valores ordenados;

  ### RANK()
  * Atribui um número de ranking, com buracos em empates;
  * Se duas linhas estão empatadas em 1º, a proxíma será de 3º(pula o 2º);
  * Ideal para ranking com posições visuais reais;

  ### DENSE_RANK()
  * Semelhante ao RANK(), mas sem buracos nos empates;
  * Se duas linhas estão empatadas em 1º, a próxima será 2º(sem pular);
  * Ideal para ranking contínuo com pontuações iguais;


  ### Comparação Visual
  * Suponha os pedidos abaixo de um cliente:

    | order_id | total_amount | ROW_NUMBER() | RANK() | DENSE_RANK() |
    |:---:|:---:|:---:|:---:|:---:|
    | 1 | 1000.00 | 1 | 1 | 1 |
    | 2 | 1000.00 | 2 | 1 | 1 |
    | 3 | 800.00 | 3 | 3 | 2 |
    | 4 | 500.00 | 4 | 4 | 3 |
  
  ### Funções de Deslocamento (LAG E LEAD)
  * O que são?
    * Funções de janela que permite acessar valores de outras linhas relativas à linha atual, sem perder o detalher linha a linha.

  * Para que servem?
    * Comparações sequenciais
    * Análises de tendência (ex.: vendas por mês)
    * Identificação de variações, evolução ou regressão

    ### Sintaxe
    ```
      LAG(coluna, deslocamento, valor_padrão) OVER (
        PARTITION BY ...
        ORDER BY ...
      )

      LEAD(coluna, deslocamento, valor_padrão) OVER (
        PARTITION BY ...
        ORDER BY ...
      )
    ```

## Otimização e Perfomance

  ### Índices: quando e como usar

  ### O que são?
  * Estrutura auxiliar que acelera buscas, ordenações e junções, montada a partir de uma ou mais colunas de uma tabela

  ### Benefícios
  * Reduz custo de varredura completa (seq scan) para buscas pontuais ou intervalos
  * Melhora performance de consultas WHERE, JOIN, ORDER BY E GROUP BY

  ### Custos
  * Uso de espaço em disco/memória
  * Sobrecarga em INSERT/UPDATE/DELETE (cada operação de escrita também atualiza índices)
  
  ### Sintaxe de criação
  * CREATE INDEX
    ```
      CREATE INDEX [CONCURRENTLY] nome_de_indice
        ON tabela [USING método] (coluna1 [ASC|DESC], coluna2, ...)
    ```

  * CREATE UNIQUE INDEX:
    ```
      CREATE UNIQUE INDEX nome_indice_unico
        ON tabela(coluna);
    ```

  ### Árvores B-Tree vs. Hash vs. GiST vs. GIN

    ### B-Tree (padrão)
    * Equilíbrio ótimo para busca de igualdade e intervalo (BETWEEN, >, <)
    
    ### Hash
    * Otimizado apenas para igualdade (=)
    * Não suporta buscas por intervalo

    ### GiST (Generalized Search Tree)
    * Permite índices sobre tipos geométricos, arrays, texto completo
    * Suporta operações "aproximadas" (p.ex. índice de similaridade)
    
    ### GIN (Generalized Inverted Index)
    * Ideal para colunas com múltiplos valores (arrays, JSONB)
    * Mantém um "inverted list" de valores => rápido para existência de elemento

  ### Como o PostgreSQL armazena e pesquisa em um índice
  * Armazenamento
    * Cada índice é uma tabela interna (pg_class) com páginas de dados organizadas em nós folha e não-folha (no B-Tree)

  * Pesquisa
    * PostgreSQL usa o planner para escolher entre seq scan e index scan
    * Em index scan, busca-se nas páginas raiz => páginas folhas => retorna tupplas correspondentes

  ### Escolha e criação de índices / Monitoramento e manutenção de índices

    ### Custo de leitura vs. custo de escrita
    * Leitura: índices diminuem I/O de leitura para buscas seletivas
    * Escrita: todo INSERT/UPDATE/DELETE que afete a coluna indexada gera manutenção extra no índice, impactando throughput
    * Trade-off: Quanto maior o número de índices, maior a penalidade em escritas

    ### Índices únicos vs. não-únicos
    * Não-único(default): CREATE INDEX idx_products_price ON products(price)
    * Único: garantia de unicidade em coluna(s):

      ```
        CREATE UNIQUE INDEX idx_customers_email
          ON customers(email);

        create unique index idx_department_name_unq
          in departments(department_name)
      ```

    * Não-único(preço, repetido em muitos produtos):
      ```
        CREATE INDEX idx_produtos_category
          ON products(category_id);
      ```



  ### Índices parciais e expressões indexadas
    * Parciais: Indexa apenas subset de linhas, reduzindo tamanho e custo de manutenção
      * So indexar pedidos pendentes, reduzindo tamanho:
    ```
      CREATE INDEX idx_orders_pending
        ON orders(order_date)
        WHERE status = 'PENDING'
    ```

    * Expressão: Indexa o resultado de uma expressão qualquer.
    ```
      -- Busca case-sensitive em email
      CREATE INDEX idx_customers_lower_email
        ON customers (LOWER(email));
    ```

    * Lower-case search em e-mail:
      ```
        CREATE INDEX idx_customers_lower_email
          ON customers (LOWER(email))

        EXPLAIN ANALYZE
        select *
        from customers
        where lower(email) LIKE '%@example.com'
      ```

  ### EXPLAIN E ANÁLISE DE PLANOS DE EXECUÇÃO
    * O que é?
      * A ferramenta EXPLAIN ANALYSE desempenha um papel crucial na otimização e eficiência das consultas SQL;
      * É um comando SQL usado para analisar o plano de execução de consultas SQL;

    * Quando usar?
      * Análise de Desempenho de Consultas
      * Otimização de Consultas
      * Indexação Eficaz
      * Depuração

    ### Sintaxe
    ```
      explain analyse select * from customers
      where customer_id = 101;
    ```

  ### Explain - Leituras Avançadas de Planos
  * Index Scan
    * Utilizado para quando se é trabalhado em cima de um índice
    * Muitas vezes quando trabalhamos com tabelas que tem poucos registros e não tem a necessidade de utilizar index no momento da execução do comando, o próprio Postgres entende que não é necessário, desta forma, é ativado o Seq Scan, que seria uma consulta normal, sem estar trabalhando com índice no momento e acaba não retornando o índice para nós 
    * Para forçar o resultado do explain analyse 'em cima' de um index scan, é preciso desabilitar temporariamente o seq scan:
    
      ```
        set enable_seqscan = off;

        explain analyse
        select * from products where price > 300;

        -- Depois reativa o seqscan
        set enable_seqscan = on;
      ```

  ### Otimizando com pré-agregação

  * Técnica para melhorar a performance de consultas que envolvem joins com grandes volumes de dados
  

  ### Particionamento de Tabelas e Dados no PostgreSQL

  * ### Particionamento de dados
  
    * Particionamento de dados é o recurso no qual o adminsitrador de banco de dados poderá ter o domínio dos locais onde seus dados são armazendos.
    * Resulta em gerenciamento melhor dos dados, em uma melhor performance, ter um melhor acompanhamento de como está ocorrendo a participação do file group e como que esses registros estão alocados.
    

    ### Partition By Range
    * Divide dados em faixar contínuas de valores (datas, númericos,...;)
    * Quando usar: séries temporais, logs, ordens por data.


    ### Demais tipos de particionamento de tabelas
    * Range
    * List
      * Baseado em conjuntos discretos de valores
      * Ideal para categorização
        * Coluna do tipo status, aonde a pessoa pode ser gerente, administrador, funcionário, fornecedor...
        * Coluna do tipo estado/região (Ex.:São Paulo, Rio de Janeiro, Curitiba, Florianópolis ou ainda Região Sul, Sudeste, Norte, Nordeste...)
    * Hash
      * Valor hash da chave, ou seja, quando não há um agrupamento lógico natural, usamos um hash (um valor de uma chave) para ser como base e fazer o agrupamento baseado nessa escolha
      * 
    * Default
      * Default é mais genérico, pega os valores que não se encaixam em valor algum.
      * Caso não tenha conseguido categorizar as tabelas, 'pega' faz o default adiciona todos os dados, para deixar uma participação separada assim, sem muita organização.

    ### Normalização vs. denormalização: Equilibrando Performance

      * Princípios de normalização

      ### Formas Normais
      * 1FN: cada coluna armazena valor atômico
      * 2FN: além da 1FN, todas as colunas não-chave dependem da chave completa (sem dependências parciais)
      * 3FN: afém da 2FN, não existem dependências transitivas entre colunas não-chave

      ### Benefícios da normalização
      * Integridade referencial garantida por chaves estrangeiras
      * Eliminação da redundância: evita dados duplicados e inconsistentes
      * Facilidade de manutenção: alterações em um único lugar

      ### Desvantagens em cenários análiticos
      * Múltiplos JOINs: consultores OLAP que agregam dados em grandes volumes sofrem com o custo de junções
      * Latência: Leitura de várias tabelas pode ser mais lenta que leitura de uma única tabela ampla
    
      ### Casos de uso de denormalizacao
      * Mostrar quando e como sacrificar parte da normalização para ganhar rapidez de leitura
      
      ### Colunas calculadas e agregados pré-computados
      * Coluna calculada (computed/generated column) no próprio registro:
      
        ```
          alter table pedidos
            add column valor_total numeric(12, 2)
          generated always as (
            (
              select sum(quantidade * preco_unit)
              from itens_pedido i where i.pedido = pedidos.pedido_id
            )
          ) STORED;
        ```
        * Acima estamos alterando a tabela pedidos, adicionando uma nova coluna esta será gerada através do comando generated, definindo assim a mesma como uma coluna computada, aonde os seus valores serão gerados apartir de um select e assim colocados na coluna.
        * Vantagem: Leitura direta, não é necessário realizar nenhum JOIN
        * Desvantagem: Custo extra na hora da escrita, no momento da escrita, ela sempre fará o select.
      
      ### Tabelas de resumo (summary tables)
      * Tabela dedicada que armazena agregados:
        ```
          create table resumo_vendas_mensal (
            ano         int,
            mes         int,
            valor_venda numeric(14, 2),
            primary key (ano, mes)
          );

          -- Popula a tabela inicialmente
          insert into resumo_vendas_mensal(ano, mes, valor_venda)
          select
            extract(year from p.data_pedido)::int as ano,
            extract(month from p.data_pedido)::int as mesm
            sum(i.quantidade * i.preco_unit)
          from pedidos p
          join itens_pedido i on i.pedido_id = p.pedido_id
          group by 1, 2
        ```

      ### Estratégias híbridas e boas práticas
      * Definir critérios para combinar normalização e denormalização sem perder controle de integridade.
      * Quando normalizar vs. quando denormalizar
      
        | Cenário | Normalização | Denormalização |
        | :---: | :---: | :---: |
        | Alto volume de transações (OLTP) | Prioritário | Evitar |
        | Consultas análiticas frequentes | Aceitável (JOINs) | Recomendo |
        | Atualização em tempo real | Melhor (menos redundância) | Cuidado com inconsistências |
        | Tolerância a leve latência nas escritas | Sim | Não |
  

      ### Ferramentas de sincronização

      * Triggers: para updates/inserts/deletes em tabelas fonte;
      * Jobs periódicos (cron, pg_cron, ferramentas de ETL): para refresh de materialized views ou rebuild de summary tables durante as janelas de baixa carga;
      * Streaming/CDC (Logical Replication, Debezium): manter réplicas análiticas quase em tempo real;