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