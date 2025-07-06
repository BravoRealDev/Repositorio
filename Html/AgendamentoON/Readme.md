Relatório Técnico do Projeto: Saúde+ Agendamento

 

Autor: Diego Ugioni Pinto 

Disciplina: Programação Front-End 

Data: 06/07/2025 (data da postagem no studeo) 

 

1. Introdução 

 

Este relatório detalha o desenvolvimento do website "Saúde+", uma plataforma web interativa para agendamento de consultas médicas. O objetivo do projeto foi criar uma experiência de usuário fluida e funcional, aplicando conceitos fundamentais de desenvolvimento web front-end, incluindo HTML5 semântico, CSS3 para estilização responsiva e JavaScript para interatividade e manipulação de dados do lado do cliente. 

 

2. Arquitetura do Site e Tecnologias 

 

A arquitetura do projeto foi pensada para ser modular e de fácil manutenção, mesmo sendo uma aplicação puramente front-end. 

 

2.1. Estrutura de Páginas 

 

O site é composto por quatro páginas principais interligadas, cada uma com um propósito definido: 

 

    index.html (Página Inicial): Serve como portal de entrada, apresentando a proposta de valor do serviço e exibindo as especialidades médicas disponíveis. 

 

    agendar.html (Agendamento): Contém o formulário principal onde o usuário seleciona especialidade, médico, data e horário para marcar uma consulta. 

 

    consultas.html (Minhas Consultas): Página dedicada onde o usuário logado pode visualizar e gerenciar seus agendamentos. 

 

    contato.html (Contato): Fornece um formulário para que os usuários possam enviar dúvidas ou sugestões à equipe do Saúde+. 

 

2.2. Tecnologias Utilizadas 

 

    HTML5: Utilizado para a estruturação semântica do conteúdo, melhorando a acessibilidade e o SEO. Foram usadas tags como <header>, <nav>, <main>, <section>, <article>, e <footer>. 

 

    CSS3: Responsável por toda a estilização e pelo layout do site. Conceitos como Flexbox e Grid Layout foram usados para criar um design moderno e flexível. As media queries garantem a responsividade em diferentes dispositivos. 

 

    JavaScript (ES6+): O cérebro do projeto. É utilizado para todas as funcionalidades dinâmicas: 

 

        -Manipulação do DOM (criação de cards, atualização de listas). 

 

        -Validação de formulários (Login e Contato). 

 

        -Gerenciamento de estado da sessão do usuário com sessionStorage. 

 

        -Aplicação de efeitos interativos para melhorar a experiência do usuário. 

 

    Font Awesome: Biblioteca de ícones utilizada para adicionar elementos visuais como o "X" para fechar o modal. 

 

3. Design e Layout Responsivo 

 

O design foi projetado para ser limpo, profissional e intuitivo, utilizando uma paleta de cores baseada em tons de azul para transmitir confiança e seriedade, associadas à área da saúde. 

 

A responsividade foi um pilar central. Através do uso de media queries no CSS, o layout se adapta fluidamente a diferentes tamanhos de tela: 

 

    Desktop: Layout mais espaçado, com grids de múltiplas colunas. 

Imagem do teste em desktop: 

 

 

    Tablet: Os elementos começam a se reorganizar, e o menu pode se ajustar para um formato mais compacto. 

Imagem do teste em tablet: 

 

 

    Mobile: O layout se torna de coluna única para facilitar a leitura e o toque. O menu de navegação é empilhado verticalmente para melhor usabilidade em telas pequenas. 

Imagem do teste em mobile: 

 

 

 

4. Funcionalidades e Efeitos Interativos (JavaScript) 

 

O JavaScript foi crucial para transformar o site de uma página estática em uma aplicação web funcional. 

 

    Sistema de Login e Sessão: Utilizando sessionStorage, o estado de login do usuário persiste entre as diferentes páginas, permitindo que ele navegue pelo site sem perder sua autenticação. 

 

    Formulário de Agendamento Dinâmico: Os campos do formulário são interligados. A seleção de uma especialidade, por exemplo, carrega dinamicamente a lista de médicos correspondentes. 

 

    Validação de Formulário de Contato: O formulário em contato.html possui validação em tempo real via JavaScript. Ele verifica se os campos estão preenchidos e se o e-mail possui um formato válido antes de simular o envio, fornecendo feedback instantâneo ao usuário. 

 

    Efeito Interativo 1 - Hover nos Cards: Na página inicial, ao passar o mouse sobre os cards de especialidades, um efeito sutil de zoom e sombra é aplicado via CSS transition. Isso fornece um feedback visual agradável e destaca o elemento com o qual o usuário está interagindo. 

 

    Efeito Interativo 2 - Smooth Scroll: Foi implementado um script que intercepta cliques em links de âncora (que apontam para a mesma página, como o botão "Agendar agora"). Em vez do salto padrão do navegador, a página rola suavemente até o elemento de destino, tornando a navegação mais elegante. 

 

5. Aplicação de Conceitos de SEO Básico 

 

Para melhorar a visibilidade do site em mecanismos de busca, foram aplicadas as seguintes técnicas de SEO on-page: 

 

    Títulos de Página (<title>) Únicos: Cada uma das quatro páginas possui um título descritivo e único, o que ajuda o Google a entender o conteúdo específico de cada URL. 

 

    Meta Descriptions: Foi adicionada a tag <meta name="description"> em cada página, com um resumo atrativo do seu conteúdo, que pode ser exibido nos resultados de busca. 

 

    HTML Semântico: O uso correto de tags como <main>, <section>, <h1>, <h2>, etc., ajuda os robôs de busca a entenderem a hierarquia e a importância do conteúdo. 

 

    Atributos alt em Imagens: As imagens decorativas das especialidades foram implementadas com a tag <img> e o atributo alt, fornecendo um texto alternativo que descreve a imagem para mecanismos de busca e leitores de tela. 

 

6. Desafios Enfrentados 

 

    Gerenciamento de Estado Front-End: O maior desafio foi manter o estado da aplicação (login do usuário e lista de consultas) ao navegar entre páginas HTML separadas. A solução foi utilizar a sessionStorage do navegador, que se mostrou eficaz para armazenar dados de forma temporária durante a sessão do usuário. 

 

    Organização do Código JavaScript: Com o aumento das funcionalidades, manter um único arquivo script.js para todas as páginas exigiu uma organização cuidadosa, verificando a existência de elementos (if (elemento)) antes de executar códigos específicos de cada página para evitar erros de null reference. 

 

    Validação Cross-Browser: Garantir que todos os efeitos e funcionalidades JavaScript funcionassem de forma consistente nos principais navegadores foi um ponto de atenção durante os testes. 

 

7. Conclusão 

 

O projeto "Saúde+" cumpriu com sucesso todos os requisitos propostos. O resultado é um website funcional, responsivo e com uma experiência de usuário aprimorada por interações de JavaScript. O desenvolvimento permitiu a aplicação prática de conceitos essenciais de HTML, CSS e JavaScript, além de noções importantes de arquitetura web, gerenciamento de estado e SEO, consolidando o conhecimento adquirido na disciplina. 