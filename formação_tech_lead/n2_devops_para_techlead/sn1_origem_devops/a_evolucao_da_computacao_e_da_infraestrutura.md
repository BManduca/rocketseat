# A Evolução da Computação e da Infraestrutura

## 1970-1980: Era dos Mainframes e Computação Centralizada

- Computação dominada por mainframes (IBM, DEC).
- Modelos cliente-servidor ainda não eram comuns.
  - Não tinha um cliente acessando serviços em um servidor, que ficava em determinado lugar.
  - Tudo era muito feito diretamente ali, muito físico e nada remoto.
- Sistemas operacionais proprietários e baixa conectividade entre sistemas.
- Desenvolvimento de software mais lento, ciclos longos e pouca automação.
- Benefícios:
  - Sistemas altamente confiáveis para operações críticas.
  - Segurança reforçada, pois os dados eram centralizados.
  - Estabilidade e previsibilidade nos processos de TI.

- Desafios:
  - O desenvolvimento de novos recursos levava cerca de anos e custava milhões de dólares.
    - Isso acarretava em n situaçõs, como por exemplo, em um período de cinco anos, aonde o resultado so seria alcançado ao final desse tempo, os usuários poderiam mudar o foco, poderiam começar a desejar algo diferente ou até mesmo pior, o processo depois de um ou dois anos contando do começo, era interrompido e o projeto era totalmente cancelado. Porque a necessidade mudou e era impossível esperar 5 anos, ninguém fica totalmente parado nesse período, até porque as coisas mudam e evoluem.
  - Alto custo operacional, dificultando a inovação.

## 1980-1990: Computadores Pessoais e Redes Locais

- Popularização do PC (IBM PC, Apple Macintosh)
- Introdução das primeiras redes locais (LANs)
- Surgimento dos primeiros bancos de dados relacionais (Oracle, SQL Server)
  - Armazenagem de dados ficou melhor e mais fácil
- Os Softwares começam a ser mais modulares, mas ainda com ciclos longos de densenvolvimento.
- Benefícios:
  - Acesso mais fácil à computação para empresas e usuários individuais.
  - Aumento da produtividade com interfaces gráficas mais intuitivas.
  - Início da descentralização dos sistemas
- Desafios:
  - Os Softwares ainda eram monolíticos, com processos de desenvolvimento demorados.
    - Foi algo muito marcante
    - Foi uma evolução gigantesca, porém, chegou em determinado momento em que a empresa precisava continuar evoluindo, se tornou um grande gargalo.
  - Infraestrutura totalmente dependente de hardware físico, dificultando a escalabilidade.

## 1990-2000: A Revolução da Internet e a Era Cliente-Servidor

- A internet (WWW) populariza o acesso à informação e aplicações online.
- Modelos cliente-servidor dominam o mercado, melhorando a conectividade.
  - Era possível ter um servidor em qualquer lugar, que tivesse conectividade e as pessoas acessarem remotamente.
- O Linux cresce como alternativa aos sistemas proprietários.
- Arquitetura monolítica ainda era predominante nos sistemas empresariais.
  - Dependendo da empresa ainda é até hoje.

- Benefícios:
  - A Internet amplia a comunicação e a colaboração global
    - Para questão de depesquisa e estudos ficou mais fácil.
    - As empresas se comunicarem com seus clientes e tudo mais.
  - Surgimento de padrões abertos facilita a interoperabilidade entre sistemas.
    - Fabricantes de equipamentos de redes utilizando os mesmos protocolos, surgimento do protocolo TCP IP e tudo mais.
- Desafios:
  - Mesmo com avanços, a implementação de novos recursos ainda levava semanas ou meses.
    - Mesmo que o código já estivesse pronto, o processo do time de infraestrutura ainda era um pouco mais rígido também, mais demorado e até por não ter muita confiança no que estava sendo entregue, podemos ver que o time de operações tinha um objetivo diferente do time de desenvolvimento, por isso, demorava todo esse tempo para entregar o software em produção.
  - Lançamentos de software ainda eram lentos e caros.

## 2000-2010: Virtualização e Ascensão da Nuvem

- Virtualização (VMware, Xen, KVM) impulsiona a eficiência dos servidores.
- Amazon Web Services (AWS) lança os primeiros serviços de computação em nuvem (EC2, S3).
  - EC2 -> Máquina virtual
  - S3 -> Armazenamento de objetos
- Crescimento da arquitetura SOA (Service-Oriented Architeture).
- Surgem metodologias ágeis (Agile Manifesto - 2001)e CI/CD (Continuous Ingtegration/Continuous Delivery).
- Infraestrutura começa a se tornar mais dinâmica, mas ainda dependente de processos manuais.
- Benefícios:
  - Virtualização permite melhor utilização dos recursos de hardware.
  - Computação em nuvem reduz custos e melhora a escalabilidade.
  - Adoção de metodologias ágeis reduziu o tempo de desenvolvimento para semanas ou meses.
- Desafios:
  - A implementação na produção ainda era lenta, por ser manual e, muitas vezes, o resultado final era insatisfatório.
  - Falta de automação completa na gestão de infraestrutura.

## 2010-2020: Microserviços, Containers e DevOps

- Popularização da arquitetura de microserviços para escalar aplicações.
- Surgimento do Docker(2013) e da orquestração de containers com Kubernetes(2014).
- Adoção massiva de CI/CD, IaC (Infraestrutura as Code) e DevOps.
- Automação de infraestrutura com Terraform, Ansible, Chef e Puppet.
  - ferramentas de gerenciamento de configuração.
- Observabilidade se torna essencial (Prometheus, Grafana, ELK Stack).
  - Muitas empresas começaram a olhar para essa parte que antes era somente conhecida como monitoramento e hoje, foi evoluindo ate se chamar observabilidade, se tornando essencial pela quantidade de microserviços que passamos a ter nos ambientes, a quantidade de informações que precisavamos monitorar e a complexidade de ter tudo isso centralizado com um único time.
- Benefícios:
  - DevOps transforma a forma como empresas criam e implementam recursos.
  - Startups conseguem criar empresas inteiras em semanas.
  - Infraestrutura como código permite o provisionamento automatizado e ágil.
  - Desenvolvimento e implementação contínua possibilitam lançamentos diários.
    - Partirtura de CI/CD possibilita lançamentos diários, porque a gente tem muita automação envolvida.
- Desafios:
  - Necessidade de cultura organizacional alinhada para adotar DevOps com sucesso.
  - Complexidade no gerenciamento de arquiteturas distribuídas.

## 2020 até Hoje: Cloud-Native, Inteligência Artificial e Edge Computing

- As arquiteturas Cloud-Native se tornam padrão (AWS, GCP, Azure).
  - Livro DevOps Nativos de nuvens com Kubernets
  - Kubernets se tornou um padrão para aplicações cloud-native
- Inteligência Artificial e Machine Learning Ops (MLOps) começam a ser incorporados ao DevOps.
  - IA já tem muitos produtos comerciais, voltado para kubernets por exemplo, para mapear suas aplicações e entender como:
    - elas utilizam o recurso
    - aonde você pode diminuir recurso
    - aonde você pode diminuir e reduzir custo
- Serverless Computing e Function as a Service (FaaS) reduzem a necessidade de gerenciar infraestrutura.
  - Rodar aplicações inteiras sem ter a necessidade de gerenciar um servidor e de subir uma infraestrutura.
  - Basta colocar um script com uma função com o objetivo bem claro/definido e ele já já sabe o que precisa fazer.
- Edge Computing ganha espaço para processamento distribuído (IoT, 5G)
  - Isso ajuda muito em grande áreas de mercado, como por exemplo a área agrícola, que não tem tanta essa facilidade como outras empresas tem de rodar toda a sua operação em um escritório, por exemplo.
- Plataformas No-Code/Low-Code aceleram o desenvolvimento.
- Plataformas GitOps e automação cada vez mais avançada.
- Benefícios:
  - Automação extrema e entre contínua permitem inovação rápida
  - Inteligência Artificial ajuda na análise de dados e decisões automatizadas.
  - Serverless e Edge Computing reduzem custos e melhoram a performance.
  - Organizações conseguem experimentar e validar ideias rapidamente, otimizando valor para clientes.
- Desafios:
  - Segurança e conformidade em ambientes distribuídose altamente automatizados.
    - Se eu tenho muita automação e tenho algo muito separado, a gente começa a se perguntar: "Aonde é que ta?", "Quem ta executando?", "Como ta executando?", então precisa ter uma trabalho muito forte de padronização para liberar acesso, liberar essas automações e liberar quem pode construir ou editar uma automação.
  - Necessidade de aprendizado contínuo devido à rápida evolução tecnólogica.
  -
