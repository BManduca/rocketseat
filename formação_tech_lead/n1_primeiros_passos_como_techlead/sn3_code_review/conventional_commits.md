# <span style="color: #68ffc5ee">Conventional </span><span style="color: #914dffff">Commits</span>
- É um padrão de mensagens de commit, que facilita o entendimento do código e a sua evolução.

## Ferramentas
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Idéia que partiu do time de AngularJS
  - Basicamente é seguir uma convenção de como devemos escrever commits
  - A idéia é de usar um padrão/convenção que vai nos dizer como devo estruturar um commit, na hora que eu estiver criando um projeto, o que eu posso passar de informação, quais são os tipos e o que que se deve ter atrelado a ele.

## Estrutura
```
  <type>[optional scope]: <description>

  [optional body]

  [optional footer(s)]
```

## Tipos de commit
- feat: nova funcionalidade
- fix: Patch ou correção de bug
- docs: documentação
- style: estilo
- refactor: refatoração
- test: teste
- chore: chore
- perf: performance
- build: build
- ci: ci
- revert: revert
- BREAKING CHANGE (ou `!` após o tipo/escopo): indica uma **mudança que quebra a compatibilidade retroativa** (*backward compatibility*).
  - **No desenvolvimento de software em geral:** ocorre quando uma alteração exige que consumidores daquele código (outros sistemas, front-ends, microsserviços ou desenvolvedores que usam uma biblioteca/API) também modifiquem suas implementações para que tudo continue funcionando.
  - **Exemplos práticos:** remoção ou renomeação de rotas/endpoints de uma API, alteração de parâmetros obrigatórios em uma função pública, mudança no formato de retorno de um JSON, ou alteração de esquema no banco de dados sem migração compatível.
  - **Impacto no Versionamento Semântico (SemVer):** gera um incremento na versão `MAJOR` (ex.: de `1.4.2` para `2.0.0`).
  - **Como usar no commit:** adicionando `!` antes dos dois-pontos (ex.: `feat(api)!: remove suporte à autenticação via token legado`) ou adicionando `BREAKING CHANGE: <descrição>` no rodapé (*footer*) do commit.

## Porque usar conventional commits?
- Como Tech Lead, coisas que são extremamente importantes, que caso, não exista um padrão, acaba ficando muito mais díficil de gerar changelogs, que dependendo da aplicação que esta sendo desenvolvida, como por exemplo, algo que não seja somente interno, principalmente se for uma aplicação opensource, algo que vá ao público, é extremamente importante não só para o Tech Lead, para o time em si, gerar os changelogs, para que se possa ter uma noção do que essa versão do código, ela incorpora.
- Versionamento semântico, buscando deixar claro o que cada alteração no código quer dizer, aonde podemos, 'bater o olho' e saber:
  - o que é um feat, que vai incrementar um minor
  - que um fix, dependendo da sua importância, pode incrementar um minor ou será um patch

## Isso tudo será feito na mão?
- Não, para isso podemos utilizar o [commitlint](https://commitlint.js.org/)
- Idéia criada justamente para nos ajudar a aderir a essas conversões do conventional commits, não só isso, mas tornar mais fácil essa integração com nosso setup, que a gente consiga compartilhar configurações entre projetos e que a gente consiga colocar em nosso CI, para estar rodando essas configurações
- A idéia base é utilizar essa feature do Commitlint para automatizar o processo e com isso teremos um flow muito mais dinâmico.

### Como funciona na prática? (Commitlint + Husky)
- O **Commitlint** funciona como um *linter* (verificador de regras), mas em vez de analisar o código-fonte (como o ESLint), ele analisa a **mensagem do commit** para garantir que ela siga o padrão definido (como o `@commitlint/config-conventional`).
- Porém, o Commitlint sozinho apenas valida textos quando executado. Para que essa validação aconteça **automaticamente toda vez que um desenvolvedor rodar `git commit`**, utilizamos o **[Husky](https://typicode.github.io/husky/)**.
- O **Husky** é uma ferramenta que facilita a configuração e o compartilhamento de **Git Hooks** (gatilhos nativos do Git) no repositório. Com ele, interceptamos o hook `commit-msg` (disparado no exato momento em que a mensagem do commit é enviada) e acionamos o Commitlint:
  - **Mensagem válida:** o commit é concluído normalmente.
  - **Mensagem fora do padrão:** o Commitlint retorna erro, o Husky aborta o commit imediatamente e informa no terminal exatamente qual regra foi quebrada.

---

### Passo a passo: Local Setup ([Getting Started](https://commitlint.js.org/guides/getting-started.html) & [Local Setup](https://commitlint.js.org/guides/local-setup.html))

#### 1. Instalar o Commitlint e a configuração do Conventional Commits
Conforme a documentação oficial de [Getting Started](https://commitlint.js.org/guides/getting-started.html), instale a CLI do Commitlint e o pacote de regras padrão como dependências de desenvolvimento:

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional
```

#### 2. Criar o arquivo de configuração do Commitlint
Na raiz do projeto, crie o arquivo `commitlint.config.js` exportando a configuração padrão:

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

> **Dica:** Caso seu projeto utilize CommonJS (`require`/`module.exports`), o conteúdo do `commitlint.config.cjs` deve ser:
> ```js
> module.exports = {
>   extends: ['@commitlint/config-conventional'],
> };
> ```

#### 3. Instalar e inicializar o Husky (Git Hooks)
Conforme o guia de [Local Setup](https://commitlint.js.org/guides/local-setup.html), instale o **Husky** como dependência de desenvolvimento e inicialize sua estrutura no projeto:

```bash
yarn add --dev husky

# husky@v9
yarn husky init
# husky@v8 ou anterior
yarn husky install
```

- O comando `yarn husky init` (no Husky v9) faz duas coisas automaticamente:
  1. Cria a pasta `.husky/` na raiz do projeto.
  2. Adiciona o script `"prepare": "husky"` no `package.json`, garantindo que todo desenvolvedor do time tenha os hooks ativados automaticamente ao instalar as dependências.

#### 4. Configurar o hook `commit-msg`
Adicione a verificação do Commitlint ao hook `.husky/commit-msg` (`$1` representa o arquivo temporário onde o Git armazena a mensagem do commit atual):

```bash
echo "yarn commitlint --edit \$1" > .husky/commit-msg
```

*(Como alternativa documentada no guia oficial, você também pode criar um script no `package.json`)*:
```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "yarn commitlint \${1}" > .husky/commit-msg
```

> **Atenção (Yarn Berry / v2+):** A documentação oficial ressalta que o `@commitlint/cli` atualmente não suporta o modo *Plug'n'Play (PnP)* do Yarn v2+ (sendo necessário usar `nodeLinker: node-modules` no `.yarnrc.yml`).

#### 5. Testar a instalação (Teste simples via CLI)
Para fazer um primeiro teste simples validando o último commit realizado no repositório:

```bash
yarn commitlint --from HEAD~1 --to HEAD --verbose
```

---

### Testando o fluxo completo no dia a dia

1. **Tentando fazer um commit fora do padrão:**
   ```bash
   git commit -m "arrumei o botao de login"
   ```
   **Saída no terminal (Commit bloqueado ❌):**
   ```text
   ⧗   input: arrumei o botao de login
   ✖   subject may not be empty [subject-empty]
   ✖   type may not be empty [type-empty]

   ✖   found 2 problems, 0 warnings
   ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

   husky - commit-msg script failed (code 1)
   ```

2. **Fazendo um commit seguindo o Conventional Commits:**
   ```bash
   git commit -m "fix(auth): corrige alinhamento do botão de login"
   ```
   **Saída no terminal (Commit aprovado ✅):**
   ```text
   [main 8f3a1b2] fix(auth): corrige alinhamento do botão de login
    1 file changed, 2 insertions(+), 1 deletion(-)
   ```

---

## Automatizando a criação de commits com [cz-git](https://cz-git.qbb.sh/)

Enquanto o **Commitlint + Husky** atuam na **validação** (bloqueando commits fora do padrão), o **[cz-git](https://cz-git.qbb.sh/)** atua na **criação assistida e automatizada** da mensagem de commit por meio de um prompt interativo no terminal.

### Por que utilizar o `cz-git` em conjunto com o Commitlint?
- **Zero esforço de memorização:** O desenvolvedor não precisa lembrar de cabeça todos os tipos (`feat`, `fix`, `perf`, `chore`), escopos do projeto ou a sintaxe exata de `BREAKING CHANGE`. O CLI guia passo a passo com listas interativas e busca em tempo real (*fuzzy search*).
- **Integração nativa com o Commitlint:** Diferente de outros adaptadores mais antigos, o `cz-git` lê diretamente as regras e escopos do seu arquivo `commitlint.config.js` — ou seja, **uma única fonte de verdade** tanto para validar quanto para gerar o commit.
- **Suporte a IA, Emojis e Templates:** Permite configurar prefixos de issues (ex.: Jira/GitHub Issues), emojis no padrão Gitmoji e até geração de descrição via OpenAI.

---

### Passo a passo: Getting Started ([Usage](https://cz-git.qbb.sh/guide/))

A documentação oficial oferece duas abordagens principais para utilizar a ferramenta no projeto:

#### Opção A: Usando a CLI standalone `czg` (Mais rápida e sem dependências extras)
O `czg` é a CLI oficial do `cz-git` que funciona de forma independente, sem precisar instalar o pacote `commitizen`.

1. **Testar imediatamente (sem instalar) ou instalar no projeto:**
   ```bash
   # Uso imediato sem instalação:
   npx czg

   # Ou instalando como dependência de desenvolvimento no projeto:
   pnpm add -D czg
   # (ou: yarn add -D czg)
   ```

2. **Adicionar o script no `package.json`:**
   ```json
   {
     "scripts": {
       "commit": "czg"
     }
   }
   ```

#### Opção B: Usando `cz-git` como adaptador do Commitizen (Abordagem clássica)
Ideal caso o time já utilize o ecossistema do [Commitizen (`cz-cli`)](https://github.com/commitizen/cz-cli).

1. **Instalar o Commitizen e o adaptador `cz-git`:**
   ```bash
   pnpm add -D commitizen cz-git
   # (ou: yarn add -D commitizen cz-git)
   ```

2. **Configurar o adaptador e o script no `package.json`:**
   ```json
   {
     "scripts": {
       "commit": "cz"
     },
     "config": {
       "commitizen": {
         "path": "node_modules/cz-git"
       }
     }
   }
   ```

---

### Integrando a configuração com o `commitlint.config.js`

Como já criamos o `commitlint.config.js` na etapa anterior, podemos reaproveitá-lo para customizar o prompt interativo do `cz-git` (com autocompletar no editor usando JSDoc `@type {import('cz-git').UserConfig}`):

```js
/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Regras adicionais do commitlint (opcional)
  },
  prompt: {
    useEmoji: false,
    scopes: ['auth', 'api', 'ui', 'deps'], // Escopos sugeridos no menu interativo
    messages: {
      type: 'Selecione o tipo de alteração que você está commitando:',
      scope: 'Selecione o ESCOPO desta alteração (opcional):',
      customScope: 'Informe o ESCOPO customizado desta alteração:',
      subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
      body: 'Forneça uma descrição DETALHADA da mudança (opcional). Use "|" para quebrar linha:\n',
      breaking: 'Liste quaisquer BREAKING CHANGES (opcional). Use "|" para quebrar linha:\n',
      confirmCommit: 'Tem certeza de que deseja prosseguir com o commit acima?',
    },
  },
};
```

---

### Como funciona o uso no dia a dia?

Em vez de digitar `git commit -m "..."` manualmente, o fluxo do desenvolvedor passa a ser:

1. **Adicionar os arquivos ao stage normalmente:**
   ```bash
   git add .
   ```

2. **Rodar o assistente interativo de commit:**
   ```bash
   pnpm commit
   # (ou: yarn commit / npx czg)
   ```

3. **Responder ao passo a passo interativo no terminal:**
   ```text
   ? Selecione o tipo de alteração que você está commitando: (Use arrow keys or type to search)
   ❯ feat:     A new feature
     fix:      A bug fix
     docs:     Documentation only changes
     style:    Changes that do not affect the meaning of the code
     refactor: A code change that neither fixes a bug nor adds a feature
     perf:     A code change that improves performance
     test:     Adding missing tests or correcting existing tests

   ? Selecione o ESCOPO desta alteração (opcional): auth
   ? Escreva uma descrição CURTA e IMPERATIVA da mudança:
    corrige alinhamento do botão de login

   ###--------------------------------------------------------###
   fix(auth): corrige alinhamento do botão de login
   ###--------------------------------------------------------###

   ? Tem certeza de que deseja prosseguir com o commit acima? Yes
   ```

4. **Validação automática final:**
   Assim que o desenvolvedor confirma no `cz-git`, o Git dispara o hook `.husky/commit-msg`, o **Commitlint** valida a mensagem gerada (que já sai 100% dentro do padrão) e o commit é registrado sem atritos! ✅
