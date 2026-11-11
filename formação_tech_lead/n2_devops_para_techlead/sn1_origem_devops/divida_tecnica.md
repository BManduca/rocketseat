# Dívida Técnica

## O que não mudou?

- A tecnologia mudou e irá continuar mudando.
- Apesar da adoção de novas práticas, novas tecnologias, muitas empresas ainda têm problemas de gestão que impactam diretamente na área de TI.
- A dívida técnica acompanha a evolução tecnológica e é algo que devemos nos preocupar.

## O que é a dívida técnica?

- A dívida técnica é uma métafora utilizada na engenharia de software para descrever o custo adicional que uma equipe enfrenta no futuro devido a escolhas de design ou desenvolvimento de baixa qualidade no presente.
- Exemplo:
  - Uma dívida técnica financeira aumenta com o acúmulo de juros.
  - Ao longo do tempo, a dívida técnica, se não for tratada, pode aumentar a complexidade e o custo de manutenção do software.
    - Supondo que você tenha uma dívida técnica simples, porém, a mesma não é resolvida, ai na nova release encontramos outra dívida técnica e depois vai sendo encontradas mais e mais, ao mesmo tempo todas vão sendo anotadas, quando chega uma necessidade do negócio que precisa fazer uma implementação nova ou uma funcionalidade nova, não será possível implementar essa funcionalidade nova, porque existem coisas que precisavam ser feitas antes e não foram feitas , sendo assim, vai ser necessário perder um certo tempo para resolver, para pagar a dívida técnica e ai depois colocar uma nova funcionalidade

## Causas Comuns da Dívida Técnica

- Pressão por Prazos: Decisões apressadas para cumprir prazos podem resultar em soluções subótimas.
  - Famoso "Vamos entregar assim, pois, precisamos entregar no prazo e depois a gente resolve"
  - Porém esse "Depois a gente resolve", ninguém anota, não fica registrado em nenhum lugar, ou seja, esta somente na cabeça do time e isso vai se acumulando.
- Falta de conhecimento ou experiência: Desenvolvedores podem não estar cientes das melhores práticas ou padrões.
  - Muitas vezes é necessário resolver um problema, busca entender qual é o problema, qual o tipo de tecnologia, qual o tipo de framework que resolve isso, mas não se aprofunda no framework, não entende no detalhe como aquele framework funciona.
- Requisitos Mal Definidos: Início do desenvolvimento sem uma compreensão clara dos requisitos.
  - Buscar entender de maneira transparente quais requisitos aquele software tem que ter, que aquele produtoque esta sendo desenvolvido tem que ter.
- Falta de Documentação: Correções ou implementações sem documentação adequada.
  - Se acontece um problema durante um deploy ou durante a implementação:
    - simplemente a aplicação não "sobe"
    - é identificado uma falha
    - essa falha pode ser corrigida ou ela é corrigida no momento do deploy
    - Porém nada disso foi documentado e como não foi documentado, no próximo deploy vai acontecer e assim sucessivamente, sem entender a causa raiz do problema.
- Componentes Fortemente Acoplados: Arquiteturas que dificultam a modificação ou integração de novos componentes.
  - É sempre importante também revisar a Arquitetura do nosso software, pensando já no futuro.

## Impacto da Dívida Técnica

- Manutenção Complexa: Aumento da dificuldade e do tempo necessário para manter o código.
  - Para cada nova funcionalidade, será necessário fazer a famosa 'gambiarra' e assim, sempre acaba perdendo tempo, em vez de desenvolver novas funcionalidades, você fica corrigindo problema.
  - Redução da Qualidade do Software: Mais bugs e falhas devido a solucões inadequadas.
    - Muitas vezes se opta por entregar, dar como entregue o software e esperar aparecer um bug para depois corrigir, mesmo sabendo que aquele bug já existe.
  - Dificuldade na Escalabilidade: Impedimentos para crescimento ou adaptação do sistema.
  - Moral da Equipe: Frustração entre os desenvolvedores devido a código de baixa qualidade ou díficil de trabalhar.
    - Dificuldade de ter o seu ambiente na sua máquina para desenvolver, para testar, precisa estar sempre subindo para ambiente de dev, ai outro desenvolvedor derruba a aplicação do outro que estava testando...

## Gerenciamento e Mitigação da Dívida Técnica

- Priorização: Avaliar quais dívidas têm maior impacto e devem ser tratadas primeiro.
- Refatoração Contínua: Incorporar melhorias incrementais no código durante o desenvolvimento regular.
  - Ao mesmo tempo que esta desenvolvendo uma funcionalidade no projeto, você observa o código como um todo e percebe que tem uma parte que funciona mas não ta do jeito que deveria, em vez de deixar para depois, você já resolve aquele problema, melhorando aquele trecho, sem quebrar a funcionalidade que já existe, é claro e quando for entregar, já temos presente uma melhoria e uma nova funcionalidade.
- Documentação Adequada: Assegurar que todas as mudanças sejam bem documentadas para futuras referências.
- Automação de Testes: Implementar testes automatizados para garantir que alterações não introduzem novos problemas.

## Exemplo Prático

- Planejamento Adequado: Investir tempo na definição clara dos requisitos ante de iniciar o desenvolvimento.
- Educação e Treinamento: Manter a equipe atualizada sobre as melhores práticas e novas tecnologias.
  - Um apelo muito forte para a parte de gestão, pois, muitos não gostam dessa parte de estudos, sendo assim, cabe avaliar se aquela pessoa é para estar no seu time ou não é ou até mesmo se ela esta sendo resistente a estudar por algum outro problema.
- Cultura de Qualidade: Promover a importância da qualidade do código e da arquitetura bem planejada.
- Revisões regulares: Agendar revisões periódicas para identificar e abordar dívidas técnicas.
