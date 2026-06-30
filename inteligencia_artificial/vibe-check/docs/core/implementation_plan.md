# Plano de Implementação — Projeto VibeCheck

API minimalista para coleta de feedbacks anônimos com análise de sentimento simulada, conforme definido no [PRD](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/docs/core/prd.md) e [SDD](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/docs/core/sdd.md).

---

## User Review Required

> [!IMPORTANT]
> **Gerenciador de pacotes:** Será usado `pnpm` conforme preferência do usuário.

> [!IMPORTANT]
> **Persistência In-Memory:** Conforme o SDD, os dados ficam em um array na memória (sem banco de dados). Isso significa que os feedbacks são perdidos ao reiniciar o servidor. Isso é intencional para o MVP?

> [!IMPORTANT]
> **Endpoint GET:** O PRD e SDD definem apenas `POST /feedbacks`. Deseja que eu também implemente `GET /feedbacks` para listar os feedbacks salvos? Seria útil para validação manual e debugging.

---

## Open Questions

> [!NOTE]
> **Typo no PRD:** Na linha 13 do PRD, há `ǸEGATIVE` (com acento no N). Vou corrigir para `NEGATIVE` na implementação. Confirme se está de acordo.

> [!NOTE]
> **Formato do SDD (seção de API):** O bloco JSON do response no SDD está com formatação markdown quebrada (falta fechar o code block do request body). Vou me basear na intenção do documento, não na formatação literal.

---

## Proposed Changes

O projeto será construído do zero dentro de `/home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/`.

### Fase 1 — Inicialização do Projeto

#### [NEW] [package.json](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/package.json)

Inicializar o projeto Node.js com `pnpm init` e instalar as dependências:

**Dependências de produção:**
| Pacote | Motivo |
|---|---|
| `fastify` | Framework web (definido no SDD) |
| `uuid` | Geração de UUID v4 para IDs dos feedbacks |

**Dependências de desenvolvimento:**
| Pacote | Motivo |
|---|---|
| `typescript` | Linguagem principal (definida no SDD) |
| `@types/node` | Tipos do Node.js |
| `@types/uuid` | Tipos do pacote uuid |
| `tsx` | Executar TypeScript diretamente (dev server) |

**Scripts no `package.json`:**
```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

#### [NEW] [tsconfig.json](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/tsconfig.json)

Configuração TypeScript com:
- `target: "ES2022"` e `module: "Node16"`
- `strict: true`
- `outDir: "./dist"`
- `rootDir: "./src"`

---

### Fase 2 — Camada de Tipos (`/src/types`)

#### [NEW] [feedback.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/types/feedback.ts)

Definições de interfaces TypeScript para o domínio:

```typescript
// Enum para os sentimentos possíveis
export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
}

// Input do usuário (apenas content)
export interface CreateFeedbackInput {
  content: string
}

// Objeto completo de feedback (persistido)
export interface Feedback {
  id: string
  content: string
  sentiment: Sentiment
  createdAt: string // ISO-8601
}
```

---

### Fase 3 — Camada de Serviço (`/src/services`)

#### [NEW] [feedback-service.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/services/feedback-service.ts)

Implementa as regras de negócio e persistência in-memory:

| Responsabilidade | Detalhes |
|---|---|
| **Armazenamento** | Array `Feedback[]` em memória |
| **Validação** | `content` entre 10 e 500 caracteres. Retorna erro descritivo caso contrário. |
| **Análise de sentimento** | Função `analyzeSentiment(text)` que verifica palavras-chave (case-insensitive): `"ótimo", "bom", "excelente"` → `POSITIVE`; `"ruim", "lento", "erro"` → `NEGATIVE`; padrão → `NEUTRAL` |
| **Criação** | `createFeedback(input)`: valida → analisa sentimento → gera UUID + timestamp → persiste → retorna |

---

### Fase 4 — Camada de Controller (`/src/controllers`)

#### [NEW] [feedback-controller.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/controllers/feedback-controller.ts)

Responsável pela lógica HTTP (req/res):

| Método | Detalhes |
|---|---|
| `createFeedback(request, reply)` | Extrai `content` do body → chama o service → retorna `201` com o feedback criado, ou `400` com a mensagem de erro de validação |

O controller não contém regras de negócio — apenas orquestra a chamada ao service e formata a resposta HTTP.

---

### Fase 5 — Rotas e Entry Point

#### [NEW] [routes/feedback-routes.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/routes/feedback-routes.ts)

Registra as rotas do Fastify como um plugin:

```typescript
// POST /feedbacks → feedbackController.createFeedback
```

> [!NOTE]
> O SDD lista a estrutura sem pasta `routes/`, mas a arquitetura "Routes → Controller → Service" implica separação. Vou criar a pasta `routes/` para manter a separação de responsabilidades limpa. As rotas poderiam ficar no `server.ts`, mas extraí-las melhora a organização.

#### [NEW] [server.ts](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/src/server.ts)

Entry point da aplicação:
- Instancia o Fastify com `logger: true`
- Registra o plugin de rotas
- Escuta na porta `3333` (ou via `PORT` do env)
- Log de inicialização

---

### Fase 6 — Arquivos Auxiliares

#### [NEW] [.gitignore](file:///home/brunnomdp/Projetos/Development/rocketseat/inteligencia_artificial/vibe-check/.gitignore)

Ignora `node_modules/`, `dist/`, e arquivos de lock desnecessários.

---

## Estrutura Final de Arquivos

```text
vibe-check/
├── docs/
│   ├── core/
│   │   ├── prd.md
│   │   └── sdd.md
│   └── specs/
├── src/
│   ├── controllers/
│   │   └── feedback-controller.ts
│   ├── routes/
│   │   └── feedback-routes.ts
│   ├── services/
│   │   └── feedback-service.ts
│   ├── types/
│   │   └── feedback.ts
│   └── server.ts
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Verification Plan

### Automated Tests

```bash
# 1. Verificar compilação TypeScript sem erros
pnpm build

# 2. Iniciar o servidor
pnpm dev
```

### Manual Verification

Testar os endpoints com `curl` após o servidor estar rodando:

```bash
# Caso de sucesso — feedback positivo
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "O serviço é ótimo, adorei a experiência!"}'

# Esperado: 201 com sentiment: "POSITIVE"

# Caso de sucesso — feedback negativo
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "O sistema está muito lento e com erro constante"}'

# Esperado: 201 com sentiment: "NEGATIVE"

# Caso de sucesso — feedback neutro
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "Utilizei o serviço normalmente hoje"}'

# Esperado: 201 com sentiment: "NEUTRAL"

# Caso de erro — feedback muito curto
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "ok"}'

# Esperado: 400 com mensagem de erro
```

### Checklist de Validação

- [ ] Servidor inicia sem erros
- [ ] `POST /feedbacks` com conteúdo válido retorna `201` com ID, sentiment e timestamp
- [ ] Feedback com < 10 caracteres retorna `400`
- [ ] Feedback com > 500 caracteres retorna `400`
- [ ] Palavras positivas geram `POSITIVE`
- [ ] Palavras negativas geram `NEGATIVE`
- [ ] Texto neutro gera `NEUTRAL`
- [ ] Nenhum dado pessoal (IP, User-ID) é armazenado
- [ ] TypeScript compila sem erros (`pnpm build`)
