# Guia de Requisições HTTP (cURL) — VibeCheck

Este documento serve como um guia prático para testar manualmente a API VibeCheck utilizando o utilitário `curl` via terminal.

Por padrão, a API roda no endereço: `http://localhost:3333`

---

## 1. Criar Feedback (POST `/feedbacks`)

Para criar um novo feedback, envie uma requisição do tipo **POST** para `/feedbacks` contendo o campo `content` no corpo (JSON) da requisição.

### A. Feedback Positivo (`POSITIVE`)
Se o conteúdo possuir palavras-chave como *"ótimo"*, *"bom"* ou *"excelente"*, o sentimento é mapeado como positivo.

**Requisição:**
```bash
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "O serviço é ótimo, adorei a experiência!"}'
```

**Resposta Esperada (201 Created):**
```json
{
  "id": "9adae0b2-a9de-4c20-b059-fb53e8b475ce",
  "content": "O serviço é ótimo, adorei a experiência!",
  "sentiment": "POSITIVE",
  "createdAt": "2026-06-30T21:18:22.652Z"
}
```

---

### B. Feedback Negativo (`NEGATIVE`)
Se o conteúdo possuir palavras-chave como *"ruim"*, *"lento"* ou *"erro"*, o sentimento é mapeado como negativo.

**Requisição:**
```bash
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "O sistema está muito lento e com erro constante"}'
```

**Resposta Esperada (201 Created):**
```json
{
  "id": "fd9daf76-714f-4a9c-8d9f-7741c1f96385",
  "content": "O sistema está muito lento e com erro constante",
  "sentiment": "NEGATIVE",
  "createdAt": "2026-06-30T21:18:35.237Z"
}
```

---

### C. Feedback Neutro (`NEUTRAL`)
Se o conteúdo não possuir nenhuma das palavras-chave monitoradas.

**Requisição:**
```bash
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "Utilizei o serviço normalmente hoje"}'
```

**Resposta Esperada (201 Created):**
```json
{
  "id": "875fbd25-fc58-488f-a86a-39ae8591a011",
  "content": "Utilizei o serviço normalmente hoje",
  "sentiment": "NEUTRAL",
  "createdAt": "2026-06-30T21:18:39.960Z"
}
```

---

### D. Erro de Validação (< 10 caracteres)
Feedbacks menores que 10 caracteres retornam erro.

**Requisição:**
```bash
curl -X POST http://localhost:3333/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"content": "ok"}'
```

**Resposta Esperada (400 Bad Request):**
```json
{
  "error": "Feedback must be between 10 and 500 characters"
}
```

---

## 2. Listar Feedbacks (GET `/feedbacks`)

Retorna a lista completa com todos os feedbacks enviados na sessão atual (in-memory).

**Requisição:**
```bash
curl http://localhost:3333/feedbacks
```

**Resposta Esperada (200 OK):**
```json
[
  {
    "id": "9adae0b2-a9de-4c20-b059-fb53e8b475ce",
    "content": "O serviço é ótimo, adorei a experiência!",
    "sentiment": "POSITIVE",
    "createdAt": "2026-06-30T21:18:22.652Z"
  },
  {
    "id": "fd9daf76-714f-4a9c-8d9f-7741c1f96385",
    "content": "O sistema está muito lento e com erro constante",
    "sentiment": "NEGATIVE",
    "createdAt": "2026-06-30T21:18:35.237Z"
  }
]
```

---

## 💡 Dica: Visualização Formatada (Pretty Print)

Para visualizar as respostas JSON formatadas diretamente no seu terminal Linux, você pode redirecionar a saída para utilitários como o `jq` ou o assistente JSON do Python:

```bash
# Usando jq (caso instalado)
curl -s http://localhost:3333/feedbacks | jq

# Usando módulo nativo do Python 3
curl -s http://localhost:3333/feedbacks | python3 -m json.tool
```
