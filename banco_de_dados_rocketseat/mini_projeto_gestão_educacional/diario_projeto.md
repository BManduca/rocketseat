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