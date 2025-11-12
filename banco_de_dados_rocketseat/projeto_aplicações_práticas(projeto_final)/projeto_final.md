# Sistema de Biblioteca Universitária
![Mockup do sistema da biblioteca universitária](./assets/university_library_system_mockup.png)

## Funcionamento Geral do Sistema
1. Catalogação
   * Autores, editoras e gêneros são cadastrados
   * Livros são registrados associando-os ao autor, à editora e aos gêneros adequados.

2. Invetário físico
   * Cada livro recebe várias cópias
   * Cópias são alocadas a diferentes filiais da biblioteca
   * O campo 'status' em book_copies indica se a cópia está disponível, emprestada, reservada ou perdida

3. Empréstimos
   * Um membro solicita o emprestímo de uma cópia
   * Insere-se um registro em **loans** com data de empréstimo e prazo de devolução
   * Um trigger automático passa o 'status' da cópia para **'loaned'** após o insert em **loans**
   * Na devolução, a data 'return_date' é preenchida e o status da cópia volta para **'available'**

4. Reservas
   * Se todas as cópias de um livro estiverem emprestadas, o membro pode criar um **reservation**
   * Quando uma cópia é devolvida, um processo (por trigger ou procedimento) pode "cumprir" a reserva, alterando seu **'status'** para **"fulfilled"** e bloqueando a cópia até o membro retirá-la

5. Gestão de filiais
   * Bibliotecários associados a cada filial, que gerenciam operações locais (cadastro de novos membros, controle de estoque, relatórios)

6. Consultas e relatórios
   * É possível extrair dados como livros mais emprestados, membros com reservas ativas, histórico de empréstimos atrasados, etc., usando JOINs, CTEs e window functions.

7. Segurança e Backup
   * Perfis de acesso(roles) garantem que só usuários com permissão gravem ou apaguem dados críticos.
   * Rotina de Backup ('pg_dump') e restore ('pg_restore') protegem contra perda de dados.