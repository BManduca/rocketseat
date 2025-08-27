# Banco de Dados

## O que é um Banco de Dados?
* Definição simples: coleção organizada e estruturada de informações
*   ```
    Um banco de dados é uma coleção lógica e coerente de dados com significado inerente, projetado, construído e populado com dados para um próposito específico.

    C.J Date, em "Introdução a Sistemas de Banco de Dados" 
    ```
* Exemplo prático: agenda de contatos do celular
  * Registro: cada contato
  * Campo: nome, telefone, e-mail
* Exemplo: planilha de gastros mensais (Excel)

* Conceitos-chave:
  * Dados: Informações brutas, como números ou palavras.
  * Informações: São dados organizados e estruturados, de forma que façam sentido e possam ser usados para tomar decisões
  * Registro e Campo: São linhas e colunas que formam a tabela de um banco de dados. São utilizados para estruturar as informações em um banco de dados.
  * Registro (linha): É o item específico 
  * Campo (coluna): Detalhe sobre o item

## Por que os Banco de Dados são importantes?
* Organização e rapidez na recuperação das informações
* Integridade e segurança dos dados
* Suporte a aplicações complexas
* Exemplo prático: funcionamento do Uber

## Tipos Básicos de Banco de Dados
* Bancos Relacionais (SQL)
  * Estrutura em tabelas (linhas/registros, colunas/campos)
  * Exemplos: PostgreSQL, MySQL, Microsoft SQL Server
  * Linguagem SQL (Structured Query Language)
    * Linguagem que permite que criar, ler, atualizar e deletar informações facilmente.

* Bancos não relacionais (NoSQL)
  * Estrutura flexível (documentos, chave-valor, grafos)
  * Exemplos: MongoDB, Firebase, Redis

* Analogia
  * Relacional: biblioteca organizada
  * Não-Relacional: Caixa com itens variados relacionados

* Onde os Bancos de Dados são usados no dia a dia?
  * Spotify: Gerenciamento de músicas e recomendações
  * Netflix: Histórico e sugestões personalizadas
  * Instagram: Armazenamento e interações com fotos e vídeos
  * Aplicativos bancários: Transações seguras e eficientes

## Introdução ao Mundo dos Banco de Dados
* Bancos Relacionais vs. Não-Relacionais

### O que é um Banco Relacional
* Tabelas como estrutura principal (linhas e colunas)
* SQL como linguagem padrão
* Exemplo de tabelas: usuarios e pedidos

### Banco Relacional
* Chave primária
* Relações entre tabelas (chave estrangeira)
* Vantagens:
  * Estrutura organizada
  * Alta integridade dos dados
  * Ideal para dados estruturados

---

<div>
  <h3>
    usuarios
  </h3>
</div>

| id | nome  | email   |
| :------- | :----: | ----------: |
| 1        | João   | joao@email.com |
| 2        | Maria  | maria@email.com |

---

<div>
  <h3>
    pedidos
  </h3>
</div>

| id | id_usuario | valor |
| :-------- | :----: | ----------: |
| 1 | 1 | 50,00 |
| 2 | 1 | 80,00 |
| 3 | 2 | 120,00 |

---

&nbsp;

### Introdução ao SQL e ao PostgreSQL

* **O que é SQL (Structured Query Language)**
  * Linguagem estruturada para consulta de dados em um SGDB (Sistema de gerenciamento de Bando de Dados)
  * Utilizada em bancos relacionais para criar, modificar e consultar dados


* Principais comandos SQL
  * CREATE TABLE: criar tabelas
  * INSERT INFO: inserir dados
  * SELECT: consulta dados
  * UPDATE: atualiza dados
  * DELETE: exclui dados

  ```
    CREATE TABLE -> CRIANDO TABELAS

    CREATE TABLE usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      EMAIL VARCHAR(100)
    );

  ```

  ```

    INSERT -> INSERIR DADOS

    INSERT INTO usuarios(nome, email)
    VALUES('Ana Silva', 'ana@email.com')

  ```

  ```

    SELECT -> SELECIONAR DADOS

    SELECT * FROM usuarios;
  ```

## O que é o PostgreSQL?
* Banco de dados relacional open-source
* Seguro, gratuito e robusto

* Características principais:
  * Segurança e confiabilidade
  * Compatível com várias linguagens
  * Suporte a tipos de dados avançados (JSON, arrays, geográficos)
  * Comunidade ativa e global

## Por que aprender SQL com PostgreSQL?
* SQL é uma linguagem padrão (usável em outros bancos)
* Ferramenta gratuita e amigável
* Excelente para iniciantes e projetos avançados

* Vantagens:
  * Aprendizado aplicável em toda a carreira
  * Comunidade de apoio
  * Documentação clara

## Verificando a instalação do PostgreSQL
- Usando o pgAdmin
  * Abra o pgAdmin
  * Digite a senha criada
  * Verifique se o servidor está ativo (ícone verde)

## Instalando o Beekeeper Studio

- Passo a Passo
  * Acesse: beekeeperstudio.io
  * Baixe a versão para o seu sistema
  * instalar normalmente conforme orientado
  * Executar o Beekeeper studio

## Criando a Primeira Conexão no Beekeeper
- Configurações:
  - Connection Name: Postgres Local
  - Host: localhost
  - Port: 5432
  - Username: postgres
  - Password: (senha criada)
  - Database: postgres

## Criando o Primeiro Banco de Dados
- Passos
  * Execute o seguinte comando:
    ```
      CREATE DATABASE agenda;
    ```

  
## Criando a Primeira Tabela
- Passos
  * Execute o seguinte comando:
    ```
      CREATE TABLE (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100),
        telefone VARCHAR(20)
      );
    ```

  
## Manipulação Bàsica de Dados
- Criação de tabelas simples (CREATE TABLE)
  - ### Criando uma tabela no banco de dados
    * Boas práticas
      * Uma tabela bem criada segue boas práticas desde o início:
        * Estrutura clara e consistente
        * Tipos corretos para cada campo
        * Restrições bem aplicadas
        * Facilidade de manutenção e expansão


    * Passos
      * Execute o seguinte comando:
        ```
          CREATE TABLE clientes(
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            data_nascimento DATE,
            saldo NUMERIC(10,2),
            ativo BOOLEAN DEFAULT TRUE,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        ```

- Tipos de Dados no Postgres
  - Principais tipos
    - Integer (INT, INTEGER, SMALLINT, BIGINT)
      - Números inteiros com diferentes tamanhos

    - Decimal (NUMERIC, DECIMAL, REAL, DOUBLE PRECISION)
      - Números com ponto flutuante.
      - NUMERIC e DECIMAL são mais precisos.

## Tipos de Dados - Números

* Inteiros:

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------ | :-------- |
  | SMALLINT | idade SMALLINT | Para valores pequenos, até 32.767. Ex.: Idades |
  | INTEGER ou INT | quantidade INT | Valor padrão para inteiros. Ex.: quantidade de produtos |
  | BIGINT | POPULAÇÃO BIGINT | Pelos números muito grande. Ex.: População de países |


  * Exemplo (inteiros):
    ```
      CREATE TABLE exemplo_inteiros (
        id SERIAL PRIMARY KEY,
        idade SMALLINT,
        quantidade INT,
        populacao BIGINT
      );
    ```

* Float (ponto flutuante)

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------ | :-------- |
  | NUMERIC(1, 2) | salario NUMERIC(10, 2) | Para valores monetários (10 digítos, 2 casas decimais) |
  | DECIMAL(5, 3) | percentual DECIMAL(5, 3) | Ex.: Porcentagem com alta precisão |
  | REAL | temperatura REAL | Para medições menos críticas (32 bits) |
  | DOUBLE PRECISION | distancia DOUBLE PRECISION | Para medições de alta escala (64 bits) |

  * Exemplo (ponto flutuante)
    ```
      CREATE TABLE exemplo_decimais (
        id SERIAL PRIMARY KEY,
        salario NUMERIC(10, 2),
        percentual DECIMAL(5, 3),
        temperatura REAL,
        distancia DOUBLE PRECISION
      );
    ```

## Tipos de Dados - Textos
* Principais tipos
  * Textos (CHAR, VARCHAR, TEXT)
    * CHAR(n): texto com tamanho fixo
    * VARCHAR(n): texto com tamanho variável com limite
    * TEXT: Texto com tamanho ilimitado

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | CHAR(n) | sigla CHAR(3) | Tamanho fixo. Sempre ocupa exatamente n caracteres, preenchendo espaços se necessário. Ex.: siglas como "Br", "USA". |
  | VARCHAR(n) | nome VARCHAR(100) | Tamanho variável, até um limite n. Ex.: Nomes de pessoas |
  | TEXT | descricao TEXT | Sem limite prático de tamanho. Ex.: Descrições longas, artigos, postagens de blog. |

  ```
    CREATE TABLE exemplo_textos (
      id SERIAL PRIMARY KEY,
      sigla CHAR(3),
      nome VARCHAR(100),
      descricao TEXT
    );
  ```


## Tipos de Dados - Boolean
- Boolean
  * Armazena valores lógicos: TRUE, FALSE or NULL.
  * Ideal para status, flags de ativação, verificações binárias.

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | BOOLEAN | ativo BOOLEAN | Representa verdadeiro ou falso. Ex.: usuário ativo, visível, etc. |

  ```
    CREATE TABLE exemplo_boolean (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      ativo BOOLEN
    );
  ```

## Tipos de Dados - DATA e HORA
- DATA e HORA
  * Usados para registrar momentos no tempo, muito comuns para logs, eventos e cadastros.
  
  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | DATE | nascimento DATE | Apenas a data (ano, mês, dia) |
  | TIME | hora_abertura TIME | Apenas o horário (hora, minuto, segundo) |
  | TIMESTAMP | criado_em TIMESTAMP | Data e hora (sem fuso horário) |
  | TIMESTAMPTZ | evento_inicio TIMESTAMPTZ | Data e hora com fuso horário. Ideal para sistemas globais. |

  ```
    CREATE TABLE exemplo_data_hora (
      id SERIAL PRIMARY KEY,
      nascimento DATE,
      hora_abertura TIME,
      criado_em TIMESTAMP,
      evento_inicio TIMESTAMPTZ
    );
  ```


## Demais Tipos de Dados
* SERIAL: auto incremente (ex.: ID)
* UUID: identificador único universal
* ARRAY: Lista de valores
* JSON/JSONB: dados em formato JSON

## Tipo de Dados - SERIAL
* Gera automaticamente um valor sequencial para a coluna
* Muito usado para IDs únicos

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | SERIAL | id SERIAL PRIMARY KEY | Valor auto-incrementado automaticamente a cada novo registro |

  ```
    CREATE TABLE exemplo_serial (
      id SERIAL PRIMARY KEY,
      nome varchar(100)
    );
  ```


## Tipo de Dados - UUID
- Universally Unique Identifier
  * um identificador único de 128 bits
  * Útil para gerar IDs globais únicos, mesmo entre diferentes bancos

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | UUID | id UUID PRIMARY KEY | Identificador único global. Precisa ser gerado via função ou aplicação  |

  ```
    CREATE TABLE exemplo_uuid (
      id UUID PRIMARY KEY,
      nome varchar(100)
    );
  ```

## Tipo de Dados - ARRAY
  * Armazena listas de valores no mesmo campo (ex.: vários telefones, tags, notas).

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | INTEGER[] | notas INTEGER[] | Lista de inteiros |
  | TEXT[] | tags TEXT[] | Lista de textos |

  ```
    CREATE TABLE exemplo_array (
      id SERIAL PRIMARY KEY,
      notas INTEGER[],
      tags EXIT[]
    );
  ```

## Tipos de dados - JSON e JSNOB
  * Armazena objetos em formato JSON.
  * JSON: Armazena como texto simples (mais leve)
  * JSONB: Armazena como binário otimizado (mais rápido para busca e filtragem)

  | Tipo | Exemplo de Uso | Descrição |
  | :--- | :------------- | :-------- |
  | JSON | dados JSON | Armazena dados estruturados como texto. Preserva a ordem |
  | JSONB | dados JSONB | Armazena como binário otimizado. Mais eficiente para consultas. |

  ```
    CREATE TABLE EXEMPLO_JSON (
      id SERIAL PRIMARY KEY,
      dados JSON(ou JSONB)
    )
  ```

## Inserindo Dados (INSERT)

* O comando INSERT é utilizado para adicionar dados em uma tabela existente
* Sintaxe:
  ```
    INSERT INTO nome_tabela(coluna1, coluna2,...)
    VALUES (valor1, valor2,...)
  ```

* Ao criar uma tabela, é essencial definir corretamente os tipos de dados de cada coluna
* Isso garante integridade, desempenho e economia de espaço
* Exemplo:
  ```
    INSERT INTO alunos(nome, idade, email)
    VALUES('João', 21, 'joao@email.com')
  ```

* Dica:
  * Você também pode inserir múltiplas linhas:
  ```
    INSERT INTO alunos(nome, idade, email)
                  VALUES
    ('Maria Santos', 22, 'maria@email.com'),
    ('Carlos Lima', 20, 'carlos@email.com');
  ```

  * Se a tabela possui uma coluna SERIAL, não é necessário informar o valor dela - o PostgresSQL gera automaticamente;

## Consulta de Dados (SELECT)
- O comando SELECT permite buscar informações armazenadas em uma tabela:
  ```
    SELECT coluna1, coluna2 FROM nome_tabela
  ```

* Exemplo:
  ```
    SELECT nome, idade FROM alunos;
  ```

  * para trazer todos os dados da tabela, em vez de colocar todos os campos um a uma, podemos fazer da seguinte forma:
    ```
      SELECT * FROM alunos;
    ```

* Dica:
  * Busque trazer somente os dados necessários em cada consulta, pois, cada solicitação gera um custo de hardware
  

## Modificando Dados (UPDATE)

* O comando UPDATE altera valores existentes em uma tabela:
  ```
    UPDATE nome_tabela
    SET coluna1 = novo_valor1, coluna2 = novo_valor2
    WHERE condição;
  ```

  * O WHERE aqui ele vem como um filtro para direcionar aonde será aplicado as atualizações por via do UPDATE, caso ele não esteja presente, será aplicado na tabela inteira.

  * Exemplo:
    ```
      UPDATE alunos
      SET idade = 23
      WHERE nome = 'Maria Santos';
    ```

    * Tabela clientes:
    
    ```
      UPDATE clientes
      SET NOME = 'Felipe'
      WHERE email = 'ana.oliveira@email.com'
    ```

## Removendo Dados (DELETE)

* O comando DELETE remove dados de uma tabela

  ```
    DELETE FROM nome_tabela WHERE condição;
  ```

* Exemplo:
  ```
    DELETE FROM alunos
    WHERE idade < 18;
  ```

* Dica:
  * Sem o WHERE, todos os registros serão apagados.

  ```
    DELETE FROM alunos; -- APAGA TUDO!
  ```

  * Tabela clientes:
    ```
      DELETE FROM clientes
      WHERE id = 2;
    ```

&nbsp;
---
&nbsp;

# Modelagem de Dados Essencial

&nbsp;
## Conceito de modelagem entidade-relacionamento

### Introdução à modelagem de dados
  * Compreender o que é modelagem de dados;
  * Entender sua importância no desenvolvimento de sistemas;
  * Diferenciar os níveis de modelagem(conceitual, lógica e física)
  * Introduzir o modelo Entidade-Relacionamento(ER)
  
### O que é Modelagem de Dados?
  * Processo de representar estruturas de dados de um sistema;
  * Criação de representação visuais (diagramas) para mapear entidades e relacionamentos;
  * Serve como ponte entre os requisitos do negócio e o banco de dados;
  * Fundamenta o projeto e a implementação de sistema de informação;

### Por que é importante?
  * Organiza a complexidade dos dados;
  * Ajuda a evitar redundância e inconsistência;
  * Facilita a comunicação entre equipe técnica e stakeholders;
  * Permite melhor manutenção e evolução do sistema;
  * Garante que os dados reflitam regras de negócio reais;

### Consequências de uma má modelagem
  * Dificuldadade de manutenção;
  * Dados duplicados ou contraditórios;
  * Relatórios incorretos;
  * Baixo desempenho nas consultas;
  * Dificuldade em escalar o sistema;


### Níveis de Modelagem de Dados

  * Modelo Conceitual
    * Foco no negócio, sem detalhes técnicos;
    * Utiliza digramas ER;

  * Modelo Lógico
    * Traduz o modelo conceitual em estruturas compatíveis com SGBDs;
    * Define tipos de dados, chaves primárias e estrangeiras;

  * Modelo Físico
    * Detalha como os dados serão armazenados no SGBD específico;
    * Inclui índices, tabelas físicas, partições, etc.

### Modelo Entidade-Relacionamento(ER)
  * Criado por Peter Chen(1976)
  * Representa entidades, atributos e relacionamentos;
  * Base para o modelo relacional de banco de dados;
  * Ferramenta visual para modelagem conceitual;

### Componentes do Modelo Entidade-Relacionamento(ER)

* Entidades
  * O que é uma Entidade?
    * Representa um objeto do mundo real sobre o qual queremos armazenar dados;
    * Exemplo: Aluno, Curso, Produto, Funcionário;
    * Representada por um retângulo nos diagramas ER;

  * Tipos de Entidades
    * Entidade Forte;
      * Possui atríbuto identificador próprio(chave primária);
      * Exemplo: Aluno, Curso;

    * Entidade Fraca
      * Depende de outra entidade para existir;
      * Não possui chave própria;
      * Representada por retãngulo duplo;
      * Exemplo: Dependente(de um Funcionário);

* Atributos
  * Propriedade ou característica da entidade;
  * Exemplo:
    * Aluno => nome, matrícula, data de nascimento
  * Representados por elipses ligadas à entidade

  * Tipos de atributos
    * Simples(Atômico): Não pode ser subdividido
      * Nome, Idade

    * Composto: Pode ser dividido
      * Endereço => rua, número, cidade

    * Derivado: Pode ser calculado
      * Idade (a partir da data denascimento)

    * Multivalorado: Pode conter mais de um valor
      * Telefones 

### Componentes do Modelo Er(Relacionamentos)

* O que é um Relacionamento?
  * Um relacionamento liga duas ou mais entidades;
  * Representa uma associação lógica entre os dados;
  * Exemplo:
    * Aluno se matricula em Curso;
  * Representado por um losango nos diagramas ER;
    ![Demonstração de um esquema ER](./assets/relacionamento_pessoa_endereco_ER.png)

  * Grau do Relacionamento
    * Grau => Quantidade de entidades envolvidas;
      * Binário: 2 entidades => mais comum;
      * Ternário: 3 entidades;
      * N-ário: Mais de 3 entidades;
      * Representação gráfica muda conforme o grau;

    * Relacionamento Binário (2 entidades)
      * Mais comum em sistemas reais;
      * Exemplo:
        * Funcionário trabalha em Departamento;
      * Pode ter cardinalidade:
        * 1:1, 1:N ou N:N

    * Relacionamento Ternário (3 entidades)
      * Envolve 3 entidades ao mesmo tempo;
      * Exemplo:
        * Médico atende Paciente com uso de Equipamento;
      * Não pode ser modelado com três relacionamentos binários;
      * Deve ser representado com um único losango conectado a 3 entidades

    * Relacionamento Recursivo
      * Entidade se relaciona com ela mesma;
      * Exemplo:
        * Funcionário gerencia outro Funcionário;
      * Exige papéis (ex.: 'gerente' e 'subordinado') no diagrama;
      * Representado com um seta que volta para a própria entidade;

  * Atributos de Relacionamentos
    * Alguns relacionamentos possuem informações próprias;
    * Exemplo:
      * Aluno => Matrícula => Curso
      
        ![Atributo de relacionamentos presente em digramas ER](./assets/atributo_relacionamento_digrama_ER.png)

    * Atributo do relacionamento: data da matrícula, nota;
    * Representado por elipses ligadas ao losango;

  * Cardinalidade de Relacionamentos
    * Define quantos registros de uma entidade se associam à outra;
    * Tipos:
      * 1:1 => Um para um
        * Exemplo: O sistema não permite que uma pessoa tenha mais de um endereço associado a ela;
      * 1:N => Um para muitos
        * Exemplo: O sistema permite que uma pessoa tenha nenhum, um ou vários endereços associados a ela;
      * N:N => Muitos para muitos
        * Geralmente para esses casos busca se criar uma nova entidade, em vez de ter um relacionamento, e este vai relacionar as duas entidades
          * Tomando exemplo abaixo:
          
            ![Cardinalidade N:N](./assets/relacionamento_n_x_n_diagrama_ER.png)

            * Várias pessoas podem estar matriculadas em vários cursos ou vários cursos podem ter várias pessoas matriculadas neles

## Chaves Primárias e estrangeiras

* Chaves Primárias
  * Compreender o papel da chave primária no banco de dados;
  * Identificar boas práticas na definição de chaves;
  * Diferencias chave natural e chave substituta;
  * Aplicar conceitos em exemplos práticos;

* O que é uma Chave Primária?
  * Um atributo (ou conjunto de atributos) que identifica unicamente cada tupla (linha) em uma tabela;
  * Não pode conter valores nulos;
  * Deve ser única em todos os registros;
  * Exemplo:
    * CPF, matrícula, ID_cliente

* Por que é importante?
  * Garante a integridadedos dados;
  * Permite buscas eficientes e atualizações seguras;
  * Base para relacionamentos entre tabelas (referência em chaves estrangeiras)
  * É usada para indexação automática em muitos SGBDs

* Critérios para uma Boa Chave Primária
  * Unicidade: Não se repete
  * Imutabilidade: Não deve mudar com o tempo;
  * Não nula: obrigatório para cada registro;
  * Estabilidade: Valor confiável ao longo do tempo;
  * Simplicidade: Idealmente curto e fácil de indexar;
  * Naturalidade ou substituição consciente

* Diagrama ER completo (curso_pessoa_endereco)
    ![DIAGRAMA ER COMPLETO](./assets/diagrama_completo_curso_pessoa_endereco.png)

### Chave Natural vs Chave Substituta

* Chave Natural
  * Já existe nos dados reais;
  * Exemplo: CPF, email, matrícula escolar;;
  * Vantagens: significativa, fácil de entender;
  * Desvantagens: Pode mudar, nem sempre é única universalmente;

* Chave Substituta
    * Criada artificialmente pelo sistema (ex.: ID);
    * Exemplo:
      * id_aluno = 1,2,3...
    * Vantagens: Estabilidade, simplicidade, controle;
    * Desvantagens: Não tem significado para o usuário;

* Quando usar cada uma?
  * Chave Natural
    * Se for estável, curta e garantir unicidade;
  * Chave Substituta
    * Quando os dados naturais forem longos, instáveis ou sensíveis
    * Boa prática em sistemas complexos e integrados;