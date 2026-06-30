# Software Design Document (SDD) - Projeto VibeCheck

## 1. Stack Tecnológica

- **Linguagem:** TypeScript (Node.js LTS).
- **Framework Web:** Fastify (pela perfomance e tipagem).
- **Banco de Dados:** In-Memory Array (apenas para este MVP, para focar na lógica).
- **Arquitetura:** Camadas simplificadas (Routes -> Controller -> Service).

## 2. Estrutura de Pastas

```text
/src
    /controllers (Lógica HTTP)
    /services (Regras de negócio e persistência)
    /types (Definições de interfaces TS)
    server.ts (Entry Point)
```

## 3. Contratos de API (Endpoints)

### Post /feedbacks

**Request Body:**

```json
{
    "content": "string" // Obrigatório
}

**Response Success (201 Created):**

JSON

#

`{
    "id": "uuid-v4",
    "content": "string",
    "sentiment": "POSITIVE | NEUTRAL | NEGATIVE",
    "createdAt": "ISO-8601 String"
}`

**Response Error (400 Bad Request):**

JSON

#

`{
    "error": "Feedback must be between 10 and 500 characters"
}`