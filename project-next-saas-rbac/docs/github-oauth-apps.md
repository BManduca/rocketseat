# Guia de Autorização de OAuth Apps no GitHub

Esta documentação descreve como autorizar usuários em **OAuth Apps** do GitHub com base na documentação oficial do GitHub. O GitHub suporta o fluxo padrão de concessão de código de autorização OAuth 2.0 (*Web Application Flow*) e a concessão de autorização de dispositivo (*Device Authorization Grant*) para aplicações que não possuem navegador web (como CLIs).

> [!NOTE]
> **GitHub Apps vs OAuth Apps**
> O GitHub recomenda considerar a criação de uma **GitHub App** em vez de uma OAuth App. Ambas usam OAuth 2.0, porém as GitHub Apps oferecem permissões refinadas (*fine-grained*), controle granular por repositório e tokens de curta duração.

---

## 1. Fluxo de Aplicação Web (Web Application Flow)

Utilizado para autorizar usuários em aplicações web padrão que rodam no navegador. *(O tipo de concessão implícita / implicit grant não é suportado).*

### Etapas do Fluxo:
1. Redirecionar o usuário para solicitar a identidade do GitHub.
2. O GitHub redireciona o usuário de volta ao seu site com um código temporário.
3. Sua aplicação faz uma requisição para trocar o código pelo `access_token`.

---

### Passo 1: Solicitar a identidade do usuário no GitHub

Redirecione o navegador do usuário para o seguinte endpoint:

```http
GET https://github.com/login/oauth/authorize
```

#### Parâmetros de Query (*Query Parameters*):

| Parâmetro | Tipo | Obrigatório? | Descrição |
| :--- | :--- | :--- | :--- |
| `client_id` | `string` | **Obrigatório** | O Client ID recebido ao registrar a aplicação no GitHub. |
| `redirect_uri` | `string` | **Altamente Recomendado** | URL para onde o usuário será enviado após a autorização. |
| `login` | `string` | Opcional | Sugere uma conta específica para realizar login/autorização. |
| `scope` | `string` | Depende do contexto | Lista delimitada por espaços de [escopos (scopes)](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps). Se omitido, usa os escopos previamente autorizados pelo usuário. |
| `state` | `string` | **Altamente Recomendado** | String aleatória e imprevisível usada para proteger contra ataques CSRF (Cross-Site Request Forgery). |
| `code_challenge` | `string` | **Altamente Recomendado** | Hash SHA-256 de 43 caracteres (codificado em base64url) para proteção via **PKCE**. Obrigatório se `code_challenge_method` for enviado. |
| `code_challenge_method` | `string` | **Altamente Recomendado** | Método de desafio do PKCE. Deve ser exatamente `S256` (o método `plain` não é suportado). |
| `allow_signup` | `string` | Opcional | Se `true` (padrão), permite cadastros no GitHub durante o fluxo. Defina `false` se houver políticas proibindo novos cadastros. |
| `prompt` | `string` | Opcional | Defina `select_account` para forçar o seletor de contas a aparecer. |

---

### Passo 2: Redirecionamento de volta para o seu site

Após o aceite do usuário, o GitHub redireciona para o seu `redirect_uri` contendo os parâmetros `code` (válido por 10 minutos) e `state`.

> [!IMPORTANT]
> Sempre valide se o `state` recebido é exatamente igual ao `state` gerado no Passo 1. Se forem diferentes, **aborte o processo** (possível ataque de terceiros).

Em seguida, sua aplicação deve trocar o `code` pelo token de acesso fazendo um `POST`:

```http
POST https://github.com/login/oauth/access_token
```

#### Parâmetros do Corpo (Body Parameters):

| Parâmetro | Tipo | Obrigatório? | Descrição |
| :--- | :--- | :--- | :--- |
| `client_id` | `string` | **Obrigatório** | Client ID da sua OAuth App. |
| `client_secret` | `string` | **Obrigatório** | Client Secret da sua OAuth App. |
| `code` | `string` | **Obrigatório** | O código temporário recebido no Passo 1. |
| `redirect_uri` | `string` | **Altamente Recomendado** | A mesma URL usada no Passo 1. |
| `code_verifier` | `string` | **Altamente Recomendado** | O valor original não transformado (plain secret) usado para gerar o `code_challenge` no PKCE. |

#### Formato da Resposta:

Por padrão, a resposta é retornada em formato *URL-encoded*:

```shell
access_token=gho_16C7e42F292c6912E7710c838347Ae178B4a&scope=repo%2Cgist&token_type=bearer
```

Você pode solicitar a resposta em **JSON** adicionando o cabeçalho `Accept`:

```json
Accept: application/json

{
  "access_token": "gho_16C7e42F292c6912E7710c838347Ae178B4a",
  "scope": "repo,gist",
  "token_type": "bearer"
}
```

---

### Passo 3: Acessar a API usando o Token

Envie o token no cabeçalho `Authorization` de suas requisições HTTP:

```http
GET https://api.github.com/user
Authorization: Bearer OAUTH-TOKEN
```

**Exemplo cURL:**
```bash
curl -H "Authorization: Bearer OAUTH-TOKEN" https://api.github.com/user
```

> [!TIP]
> **Revalidação de Identidade:** Sempre que receber um novo `access_token`, utilize-o para revalidar a identidade do usuário enviando uma requisição para `/user`, garantindo que o usuário não trocou de conta durante a autorização.

---

## 2. Fluxo de Dispositivos (Device Flow)

Destinado a aplicações sem interface web ou terminal/CLI (ex: Git Credential Manager).

> [!NOTE]
> O **Device Flow** precisa ser explicitamente ativado nas configurações da sua OAuth App no GitHub antes de ser utilizado.

### Visão Geral do Fluxo:
1. A aplicação solicita códigos de verificação de dispositivo e de usuário ao GitHub.
2. A aplicação exibe o código de 8 caracteres para o usuário e solicita que ele acesse [`https://github.com/login/device`](https://github.com/login/device).
3. A aplicação faz *polling* (consultas periódicas) para verificar se o usuário autorizou o dispositivo.

---

### Passo 1: Solicitar códigos de verificação ao GitHub

```http
POST https://github.com/login/device/code
```

#### Parâmetros:
| Parâmetro | Tipo | Obrigatório? | Descrição |
| :--- | :--- | :--- | :--- |
| `client_id` | `string` | **Obrigatório** | Client ID da sua aplicação. |
| `scope` | `string` | Opcional | Escopos delimitados por espaço solicitados pela aplicação. |

#### Exemplo de Resposta (JSON com `Accept: application/json`):
```json
{
  "device_code": "3584d83530557fdd1f46af8289938c8ef79f9dc5",
  "user_code": "WDJB-MJHT",
  "verification_uri": "https://github.com/login/device",
  "expires_in": 900,
  "interval": 5
}
```

* `device_code`: Código interno de 40 caracteres para identificar o dispositivo.
* `user_code`: Código de 8 caracteres (ex: `WDJB-MJHT`) a ser exibido ao usuário.
* `verification_uri`: URL onde o usuário deve digitar o código (`https://github.com/login/device`).
* `expires_in`: Tempo de expiração dos códigos em segundos (padrão: 900s / 15min).
* `interval`: Intervalo mínimo em segundos entre as requisições de *polling*.

---

### Passo 2: Exibir o código para o usuário

Sua aplicação CLI / Headless deve exibir o `user_code` na tela e instruir o usuário a acessar `https://github.com/login/device` para digitá-lo.

---

### Passo 3: Polling da Aplicação para obter o Token

A aplicação deve realizar requisições periódicas via `POST` respeitando o `interval` retornado no Passo 1:

```http
POST https://github.com/login/oauth/access_token
```

#### Parâmetros:
| Parâmetro | Tipo | Obrigatório? | Descrição |
| :--- | :--- | :--- | :--- |
| `client_id` | `string` | **Obrigatório** | Client ID da aplicação. |
| `device_code` | `string` | **Obrigatório** | O `device_code` recebido no Passo 1. |
| `grant_type` | `string` | **Obrigatório** | Deve ser exatamente `urn:ietf:params:oauth:grant-type:device_code`. |

---

### Códigos de Erro no Device Flow

Durante o polling, o GitHub pode retornar respostas de erro tratáveis:

| Código de Erro | Descrição / Ação Necessária |
| :--- | :--- |
| `authorization_pending` | O usuário ainda não digitou o código. Continue o polling respeitando o `interval`. |
| `slow_down` | Sua aplicação fez polling muito rápido. Adicione +5 segundos ao `interval` atual antes de tentar novamente. |
| `expired_token` | O código de 15 minutos expirou. A aplicação deve recomeçar do Passo 1. |
| `access_denied` | O usuário recusou a autorização na web. Aborte o processo. |
| `incorrect_client_credentials` | Client ID inválido ou ausente. *(Client Secret não é usado no Device Flow)*. |
| `device_flow_disabled` | O Device Flow não está habilitado nas configurações da app no GitHub. |

---

## 3. Regras para URLs de Redirecionamento (`redirect_uri`)

Se o parâmetro `redirect_uri` não for fornecido, o GitHub redirecionará para a URL de callback configurada no cadastro da app.

Se fornecido, ele deve seguir estas regras rígidas de validação:
1. **Domínio e Porta:** Devem corresponder exatamente ao callback cadastrado.
2. **Caminho (Path):** Deve apontar para a mesma rota ou para um subdiretório do callback cadastrado.

### Exemplos (Assumindo CALLBACK: `http://example.com/path`):
* ✅ **VÁLIDO:** `http://example.com/path`
* ✅ **VÁLIDO:** `http://example.com/path/subdir/other`
* ✅ **VÁLIDO:** `http://oauth.example.com/path` *(Subdomínio equivalente)*
* ❌ **INVÁLIDO:** `http://example.com/bar` *(Fora do subdiretório)*
* ❌ **INVÁLIDO:** `http://example.com:8080/path` *(Porta diferente)*

### URLs de Loopback (para aplicações Desktop Nativas):
Para apps nativas desktop rodando localmente, portas dinâmicas são permitidas usando o IP de loopback `127.0.0.1`:
* Configurado no GitHub: `http://127.0.0.1/path`
* Permite chamada na aplicação: `http://127.0.0.1:1234/path`

> [!NOTE]
> O padrão OAuth RFC recomenda o uso do IP literal `127.0.0.1` ou `::1` em vez de `localhost`.

---

## 4. Gestão de Múltiplos Tokens

* Um usuário pode ter **até 10 tokens ativos** por combinação de `usuário / aplicação / escopo`.
* Existe um limite de taxa de criação de **10 tokens por hora**.
* Se exceder 10 tokens ativos para os mesmos escopos, o token mais antigo daquela combinação será automaticamente revogado.

---

## 5. Permitir que o Usuário Revogue/Revise Acessos

Você pode disponibilizar um link na sua aplicação para que o usuário revise ou revogue as permissões concedidas diretamente nas configurações do GitHub:

```http
https://github.com/settings/connections/applications/:client_id
```
