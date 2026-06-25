### 💡 Processo para Criar este Diagrama em Markdown

Para criar ou editar esse tipo de diagrama diretamente em arquivos `.md`, o processo é muito simples utilizando a sintaxe **Mermaid**:

1. **Definição do bloco**: Usamos três crases seguidas da palavra `mermaid`:
   ```markdown
   ```mermaid
   ...
   ```
   ```

2. **Tipo de Gráfico**: Usamos `graph TD` (Top-Down, de cima para baixo) ou `graph LR` (Left-Right, da esquerda para direita).

3. **Subgrafos (Aninhamento)**:
   - Para representar que um conceito está dentro de outro (como no arquivo original `diagrama_ia.png` onde Deep Learning está contido em Machine Learning), usamos `subgraph Nome["Rótulo"]` e fechamos com `end`.
   - O **LLM** fica na intersecção entre **DL (Deep Learning)** e **NLP (Processamento de Linguagem Natural)**, por isso ele foi referenciado dentro de ambos os subgrafos no código do diagrama.

4. **Estilização (Cores do Diagrama Original)**:
   - Usamos a diretiva `style ID_DO_ELEMENTO fill:#cor_de_fundo,stroke:#cor_da_borda...` para personalizar as cores do gráfico para que fiquem idênticas ou muito próximas ao estilo escuro/neon da imagem original:
     - **AI (Azul)**: `#2ac3de`
     - **ML (Verde)**: `#9ece6a`
     - **DL (Branco/Cinza claro)**: `#c0caf5`
     - **NLP (Laranja/Amarelo)**: `#e0af68`
     - **LLM (Rosa/Vermelho)**: `#f7768e`