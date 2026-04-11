# 🚀 Guia Completo: Instalação e Configuração do AIChat no macOS

Este guia cobre a instalação, configuração e solução de problemas do aichat, uma CLI interativa para uso de IA (incluindo Gemini) diretamente no terminal.

---

# 📦 Pré-requisitos

- macOS
- Terminal (zsh)
- Node.js (opcional, apenas se usar npm)
- Homebrew (recomendado)

---

# 🛠️ Instalação

## ✅ Opção 1 (Recomendada) — Homebrew

Instale com:

```bash
brew install aichat
```

Verifique:

```bash
aichat --version
```

👉 Essa opção já configura o PATH automaticamente.

---

## ⚙️ Opção 2 — npm

Instale com:

```bash
npm install -g aichat
```

---

# ⚠️ Corrigir erro: command not found

Se ao rodar:

```bash
aichat
```

aparecer:

zsh: command not found: aichat

### 🔍 Passo 1 — Verificar instalação

```bash
npm list -g --depth=0 | grep aichat
```

---

### 🔍 Passo 2 — Descobrir prefixo do npm

```bash
npm config get prefix
```

---

### 🔧 Passo 3 — Ajustar PATH

Adicione no ~/.zshrc:

```bash
export PATH="$(npm config get prefix)/bin:$PATH"
```

Depois:

```bash
source ~/.zshrc
```

---

### ✅ Passo 4 — Testar novamente

```bash
aichat --version
```

---

# 🔑 Configuração do Gemini

## 1. Criar API Key

- Acesse o Google AI Studio
- Gere sua chave

---

## 2. Configurar no macOS

Adicione no ~/.zshrc:

```bash
export GEMINI_API_KEY="SUA_CHAVE_AQUI"
```

Aplicar:

```bash
source ~/.zshrc
```

---

# ▶️ Uso básico

## 💬 Modo interativo

```bash
aichat
```

---

## ⚡ Pergunta direta

```bash
aichat "Explique o que é Flask"
```

---

## 📂 Usar com arquivos

```bash
aichat -f app.py "Explique este código"
```

---

# 🧠 Usando Gemini como padrão

```bash
aichat --model gemini
```

---

# ⚡ Criar comando gemini

Adicione no ~/.zshrc:

```bash
alias gemini="aichat"
```

Recarregue:

```bash
source ~/.zshrc
```

---

# 💬 Comandos úteis

| Comando | Descrição |
|--------|----------|
| exit   | Sai do chat |
| clear  | Limpa o contexto |
| help   | Lista comandos |

---

# 🔄 Atualização

### Homebrew

```bash
brew upgrade aichat
```

### npm

```bash
npm update -g aichat
```

---

# ❌ Desinstalação

### Homebrew

```bash
brew uninstall aichat
```

### npm

```bash
npm uninstall -g aichat
```

---

# 🧩 Boas práticas

- Não versionar o .zshrc
- Não expor sua API Key
- Usar .env em projetos
- Preferir Homebrew para CLI

---

# 🚨 Troubleshooting

### aichat não encontrado

- Verificar instalação
- Ajustar PATH

---

### API não funciona

```bash
echo $GEMINI_API_KEY
```

---

### Permissão npm

```bash
sudo npm install -g aichat
```

---

# ✅ Conclusão

O aichat é uma ferramenta poderosa para usar IA no terminal, com suporte a múltiplos modelos e modo interativo.
