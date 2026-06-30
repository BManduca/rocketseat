# Product Requirements Document (PRD) - Projeto VibeCheck

## 1. Visão do Produto

O VibeCheck é uma API minimalista para coleta de feedbacks anônimos. O objetivo é permitir que usuários enviem opiniões rápidas sobre um serviço, que serão analisados automaticamente quanto ao sentimento.

## 2. Regras de Negócio (Constraints)

1. **Anônimo Total:** Não devemos armazenar IP, User-ID ou e-mail do usuário. Apenas o conteúdo da mensagem.
2. **Validação de Conteúdo:** O feedback deve ter no mínimo 10 caracteres e no máximo 500 caracteres.
3. **Análise de Sentimento (Simulado):** Todo feedback salvo deve ter um campo `sentiment` preenchido automaticamente.
    - Se o texto contiver palavras como "ótimo", "bom", "excelente" -> `POSITIVE`
    - Se o texto contiver "ruim", "lento", "erro" -> `ǸEGATIVE`
    - Caso contrário -> `NEUTRAL`


## 3. Fluxos Principais

- O cliente envia um JSON com a mensagem.
- O sistema válida, processa o sentimento e salva em memória.
- O sistema retorna o objeto salvo com o ID gerado e o timestamp.