# Formas de Nós no Mermaid

## Círculo

Use parênteses duplos:

``` mermaid
flowchart LR
    A((Círculo))
```

## Formas principais

| Forma | Sintaxe | Exemplo |
| :--- | :--- | :--- |
| Retângulo | `[Texto]` | `A[Processo]` |
| Cantos arredondados | `(Texto)` | `A(Processo)` |
| Círculo | `((Texto))` | `A((Início))` |
| Losango | `{Texto}` | `A{Decisão}` |
| Hexágono | `{{Texto}}` | `A{{Preparação}}` |
| Paralelogramo | `[/Texto/]` | `A[/Entrada/]` |
| Paralelogramo invertido | `[\Texto\]` | `A[\Saída\]` |
| Banco de dados | `[(Texto)]` | `A[(Banco)]` |
| Sub-rotina | `[[Texto]]` | `A[[Função]]` |
| Estádio (Pill) | `([Texto])` | `A([Início/Fim])` |

## Exemplo completo

``` mermaid
flowchart LR
    A((Início))
    B[Processo]
    C{Decisão}
    D[(Banco)]
    E[[Sub-rotina]]
    F([Fim])

    A --> B
    B --> C
    C -->|Sim| D
    C -->|Não| E
    D --> F
    E --> F
```

## Resumo rápido

| Sintaxe | Forma |
| :--- | :--- |
| `[]` | Retângulo |
| `()` | Cantos arredondados |
| `(( ))` | Círculo |
| `{}` | Losango |
| `[( )]` | Banco de dados |
| `[[ ]]` | Sub-rotina |
| `([ ])` | Estádio (Pill) |
