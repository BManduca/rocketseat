# Curso Vue.js

## O que é Vue.js?
- É um framework JavaScript progressivo usado para criar interfaces de usuário(UI) e aplicações web front-end.
- Em termos simples:
  - Ela serve para construir telas interativas, como:
    - dashboards
    - formulários dinâmicos
    - SPAs (Single Page Applications)
    - Sistemas administrativos
    - Front-end de APIs (Flask, Django, Spring, etc.)

- Principais características do Vue.js
  🔹 Framework progressivo
    * Você pode:
      * Usar apenas um script Vue em uma página HTML simples
      ou
      * Construir uma aplicação completa SPA com roteamento, estado global, build moderno, etc.

  🔹 Baseada em componentes
    * A aplicação é dividida em componentes reutilizáveis:
        ```
            <template>
                <button @click="count++">
                    Cliquei {{ count }} vezes
                button>
            </template>

            <script>
                export default {
                    data() {
                        return {
                            count: 0
                        }
                    }
                }
            </script>
        ```

    * Cada componente tem:
      * template (HTML)
      * script (JS)
      * style (CSS)
    
  🔹 Reatividade automática
    * Quando um dado muda, a tela atualiza sozinha:
        ```
            data() {
                return {
                    nome: "Brunno"
                }
            }
        ```
        * Se o **nome** mudar, o DOM reflete isso automaticamente - sem **querySelector**.
        
  🔹 Fácil de aprender
    * Comparado a React e Angular:
      * Sintaxe mais simples
      * Curva de aprendizado menor
      * Documentação muito boa

  🔹 Ecossistema Vue
    * Vue Router => Rotas (SPAs)
    * Pinia (ou Vuex) => Estado global
    * Vite => build rápido
    * Nuxt.js => Vue com SSR (tipo Next.js)