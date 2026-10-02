/**
 * Produtos Lumini.
 *
 * Fonte: material oficial "Dados gerais da Lumini". Não acrescentar
 * especificações, preços ou condições que não estejam no material.
 *
 * Para adicionar um novo equipamento, copie um bloco, ajuste os campos e
 * rode `node build.js`. A página, o menu de produtos, o sitemap, a mensagem
 * de WhatsApp e o tracking são gerados automaticamente.
 *
 * Imagens: o campo `src` é o nome-base do arquivo dentro de
 * public/assets/img/. O build procura `<src>-1600.webp` e `<src>-800.webp`.
 * Enquanto não existirem, o site exibe um espaço reservado identificado.
 *
 * `events`: tipos de evento (ver data/events.js) em que o material oficial
 * indica o produto — usado para cruzar produtos e eventos.
 */

const TRAVEL_NOTE = 'Para outras regiões, consulte as condições pelo WhatsApp.';
const PISTA_SPECS = [
  '3,5 cm de altura',
  'Rampa de acesso',
  'Vidro temperado',
  'Capacidade de até 2 toneladas distribuídas sobre a pista',
  'Dimensões de 4×4 m até 6×6 m',
];

module.exports = [
  {
    slug: 'pista-de-led',
    name: 'Pista de LED',
    shortName: 'Pista de LED',
    tracking: 'pista_de_led',
    waName: 'de Pista de LED',
    navLabel: 'Pistas de LED',
    tagline: 'O centro das atenções começa pelo chão.',
    summary:
      'Quatro modelos fabricados pela Lumini, em alumínio e vidro temperado, para transformar a pista de dança no ponto alto da festa.',
    intro: [
      'As Pistas de LED Lumini transformam a pista de dança em uma experiência visual marcante. São quatro modelos, com efeitos e estilos diferentes, para combinar com a identidade de cada evento — de uma atmosfera clean e elegante a um espetáculo de luz.',
      'Todas são fabricadas pela própria Lumini com estrutura em alumínio, o que deixa a pista resistente e leve para transporte e montagem. A montagem é feita pela nossa equipe, nas dimensões que o espaço pede.',
    ],
    specs: PISTA_SPECS,
    included: ['Pista no modelo escolhido', 'Montagem e desmontagem', 'Deslocamento em Belo Horizonte, Contagem e Betim'],
    travelNote: TRAVEL_NOTE,
    events: ['casamentos', 'quinze-anos', 'formaturas', 'aniversarios', 'corporativos', 'festas'],
    image: { src: 'produtos/pista-de-led/capa', alt: 'Debutante com vestido brilhante no centro de uma Pista de LED Infinity' },
    seo: {
      title: 'Pista de LED em BH — aluguel para casamentos, 15 anos e formaturas',
      description:
        'Aluguel de pista de LED em Belo Horizonte, Contagem, Betim e região. Modelos Infinity, Galaxy, Paris Light Way e Paris Black, de 4×4 m a 6×6 m, com montagem própria.',
    },
    faq: [
      {
        q: 'Quais tamanhos de pista de LED estão disponíveis?',
        a: 'Todas as pistas Lumini podem ser montadas de 4×4 m até 6×6 m, de acordo com o espaço e a necessidade do evento.',
      },
      {
        q: 'A pista é segura para os convidados?',
        a: 'As pistas têm 3,5 cm de altura, rampa de acesso, vidro temperado e suportam até 2 toneladas distribuídas sobre a superfície.',
      },
      {
        q: 'A montagem está inclusa?',
        a: 'Sim. A Lumini faz o transporte, a montagem e a desmontagem. O deslocamento está incluso em Belo Horizonte, Contagem e Betim; para outras regiões, consulte as condições pelo WhatsApp.',
      },
      {
        q: 'Qual modelo escolher?',
        a: 'A Infinity tem efeito de profundidade e mais de 300 efeitos de cor; a Galaxy alterna entre branco quente, branco frio ou os dois; a Paris Light Way tem fundo branco e visual clean; a Paris Black tem fundo preto e vidros fumê. Pelo WhatsApp ajudamos a escolher conforme a decoração.',
      },
    ],
    variations: [
      {
        slug: 'infinity',
        name: 'Pista Infinity',
        tracking: 'infinity',
        waName: 'de Pista de LED modelo Infinity',
        tagline: 'Profundidade, luz e sofisticação em uma experiência surpreendente.',
        description: [
          'A Pista Infinity cria um efeito visual de profundidade infinita: a sensação é de que as luzes continuam para além da própria pista.',
          'São mais de 300 efeitos e combinações de cores, controlados por controle remoto, para acompanhar cada momento da festa — da entrada à última música.',
        ],
        features: [
          'Efeito de profundidade infinita',
          'Mais de 300 efeitos e combinações de cores',
          'Visual espelhado',
          'Controle remoto',
          'Design moderno',
          'Alta resistência',
        ],
        idealFor: 'Casamentos, 15 anos, formaturas, aniversários, eventos corporativos e celebrações que buscam impacto visual.',
        image: { src: 'produtos/pista-de-led/capa', alt: 'Pista de LED Infinity com efeito de profundidade infinita e debutante ao centro' },
        extras: [
          { src: 'produtos/pista-de-led/infinity-extra-1', alt: 'Pista Infinity com efeito de profundidade em cores e puffs iluminados', pos: '45% 60%' },
          { src: 'produtos/pista-de-led/infinity-extra-2', alt: 'Pista Infinity colorida em rooftop ao anoitecer', pos: '50% 75%' },
        ],
      },
      {
        slug: 'galaxy',
        name: 'Pista Galaxy',
        tracking: 'galaxy',
        waName: 'de Pista de LED modelo Galaxy',
        tagline: 'Três possibilidades. Uma única pista.',
        description: [
          'A Pista Galaxy foi desenvolvida para quem quer versatilidade sem abrir mão da elegância.',
          'São três possibilidades de iluminação — branco quente, branco frio ou a combinação dos dois — para escolher o efeito que mais combina com cada momento e com a decoração.',
        ],
        features: [
          'Branco quente',
          'Branco frio',
          'Combinação de branco quente e frio',
          'Visual elegante e sofisticado',
          'Alta resistência',
        ],
        idealFor: 'Casamentos, 15 anos, formaturas, aniversários, eventos corporativos e celebrações sofisticadas.',
        image: { src: 'produtos/pista-de-led/galaxy', alt: 'Pista de LED Galaxy em branco frio montada em salão de eventos', video: 'galaxy' },
        modes: [
          { label: 'Branco frio', src: 'produtos/pista-de-led/galaxy-frio', alt: 'Pista Galaxy em branco frio' },
          { label: 'Branco quente', src: 'produtos/pista-de-led/galaxy-quente', alt: 'Pista Galaxy em branco quente' },
          { label: 'Combinação', src: 'produtos/pista-de-led/galaxy-combinado', alt: 'Pista Galaxy com branco quente e frio combinados' },
        ],
      },
      {
        slug: 'paris-light-way',
        name: 'Pista Paris Light Way',
        tracking: 'paris_light_way',
        waName: 'de Pista de LED modelo Paris Light Way',
        tagline: 'Leveza, elegância e iluminação que valoriza cada detalhe.',
        description: [
          'A Paris Light Way combina fundo branco, iluminação em branco quente e vidros translúcidos para um visual clean e sofisticado.',
          'É uma pista que se integra à decoração sem perder o destaque — escolha natural para eventos que valorizam leveza e harmonia visual.',
        ],
        features: [
          'Fundo branco',
          'Iluminação em branco quente',
          'Vidros translúcidos',
          'Visual clean e sofisticado',
          'Combina com diferentes estilos de decoração',
          'Alta resistência',
        ],
        idealFor: 'Casamentos, 15 anos, formaturas, aniversários, eventos corporativos e celebrações em ambientes elegantes.',
        image: { src: 'produtos/pista-de-led/paris-light-way', alt: 'Pista de LED Paris Light Way com luz quente em salão com globos espelhados', pos: '50% 62%', video: 'paris-light-way' },
      },
      {
        slug: 'paris-black',
        name: 'Pista Paris Black',
        tracking: 'paris_black',
        waName: 'de Pista de LED modelo Paris Black',
        tagline: 'Elegância marcante para quem busca um visual moderno.',
        description: [
          'A Paris Black combina fundo preto, iluminação em branco quente e vidros fumê para uma estética contemporânea e cheia de personalidade.',
          'O contraste entre o preto e a luz torna a pista um elemento de destaque na decoração e cria uma atmosfera elegante no salão.',
        ],
        features: [
          'Fundo preto',
          'Iluminação em branco quente',
          'Vidros fumê',
          'Design moderno',
          'Visual marcante',
          'Alta resistência',
        ],
        idealFor: 'Casamentos, 15 anos, formaturas, aniversários, eventos corporativos e festas temáticas.',
        image: { src: 'produtos/pista-de-led/paris-black', alt: 'Pista de LED Paris Black com fundo preto e luz quente em salão de festas' },
        extras: [
          { src: 'produtos/pista-de-led/paris-black-extra-1', alt: 'Pista Paris Black montada em salão com painéis de LED', pos: '50% 78%' },
        ],
      },
    ],
  },

  {
    slug: 'totem-pro',
    tall: true, // equipamento vertical: topo da página mais alto para não cortar
    name: 'Totem Pro',
    shortName: 'Totem Pro',
    tracking: 'totem_pro',
    waName: 'de Totem Pro',
    tagline: 'Muito mais que um totem: uma experiência completa para o seu evento.',
    summary:
      'Tela vertical de 43", câmera integrada e impressora fotográfica: totem fotográfico, conteúdo, captação de leads e jogos em um só equipamento.',
    intro: [
      'O Totem Pro reúne tecnologia, interação e entretenimento em um único equipamento. Com tela vertical de 43 polegadas, câmera integrada e impressora fotográfica, ele assume a função que o evento pedir.',
      'Como totem fotográfico, registra os convidados e imprime as fotos na hora. Também reproduz fotos e vídeos, faz captação de leads, ações de marca e jogos interativos — o que o torna tão útil em um casamento quanto em uma ativação corporativa.',
    ],
    uses: ['Totem fotográfico com impressão na hora', 'Reprodução de fotos e vídeos', 'Captação de leads', 'Ações de marca', 'Jogos interativos'],
    features: ['Tela vertical de 43"', 'Câmera integrada', 'Impressora fotográfica', 'Design moderno e versátil'],
    specs: ['Tela vertical de 43 polegadas', 'Câmera integrada', 'Impressora fotográfica', 'Operador durante o uso como totem fotográfico ou interativo'],
    included: ['Totem Pro', 'Operador', 'Montagem e desmontagem', 'Deslocamento em Belo Horizonte, Contagem e Betim'],
    travelNote: TRAVEL_NOTE,
    idealFor: 'Casamentos, aniversários, formaturas, festas, eventos corporativos, feiras, exposições e ativações de marca.',
    events: ['casamentos', 'quinze-anos', 'formaturas', 'aniversarios', 'corporativos', 'festas', 'outros'],
    image: { src: 'produtos/totem-pro/capa', alt: 'Totem Pro com tela vertical de 43 polegadas e moldura iluminada em evento', pos: '50% 68%', video: 'totem-pro' },
    gallery: [
      { src: 'produtos/totem-pro/detalhe-1', alt: 'Totem Pro exibindo vídeo de drinks, com copo personalizado em primeiro plano', pos: '50% 30%', ratio: '3/4' },
      { src: 'produtos/totem-pro/detalhe-2', alt: 'Totem Pro iluminado em festa de 15 anos', ratio: '3/4' },
    ],
    seo: {
      title: 'Totem Pro — totem fotográfico com impressão em BH',
      description:
        'Totem fotográfico com tela de 43", câmera e impressão na hora. Também para vídeos, captação de leads, ações de marca e jogos. Operador incluso. BH, Contagem e Betim.',
    },
  },

  {
    slug: 'totem-de-led',
    tall: true, // equipamento vertical: topo da página mais alto para não cortar
    name: 'Totem de LED',
    shortName: 'Totem de LED',
    tracking: 'totem_de_led',
    waName: 'de Totem de LED',
    tagline: 'Conteúdo que ganha destaque e transforma o ambiente.',
    summary:
      'Tela vertical 1:3, no formato dos conteúdos de Reels e TikTok, com alto brilho e preparação dos vídeos e imagens inclusa.',
    intro: [
      'O Totem de LED transforma vídeos, imagens e conteúdos digitais em um ponto de atenção no ambiente. Compacto e vertical, ele valoriza a identidade visual do evento ou da marca sem ocupar espaço.',
      'A proporção 1:3 é a mesma dos conteúdos feitos para celular, como Reels e TikTok. Alto brilho, cores vibrantes e acabamento sem cabos aparentes completam o equipamento — e a preparação dos vídeos e imagens já está inclusa.',
    ],
    features: [
      'Tela vertical na proporção 1:3',
      'Ideal para conteúdos de Reels e TikTok',
      'Reprodução de vídeos e imagens',
      'Alto brilho e cores vibrantes',
      'Acabamento premium',
      'Design compacto',
      'Sem cabos aparentes',
      'Preparação dos vídeos e imagens inclusa',
    ],
    specs: ['Formato vertical 1:3', 'Reprodução de vídeos e imagens', 'Alto brilho', 'Sem cabos aparentes'],
    included: ['Totem de LED', 'Preparação dos vídeos e imagens', 'Montagem e desmontagem', 'Deslocamento em Belo Horizonte, Contagem e Betim'],
    travelNote: TRAVEL_NOTE,
    idealFor: 'Eventos corporativos, lançamentos, feiras, exposições, ativações de marca, festas e casamentos.',
    events: ['casamentos', 'quinze-anos', 'corporativos', 'festas', 'outros'],
    image: { src: 'produtos/totem-de-led/capa', alt: 'Totem de LED vertical exibindo conteúdo de marca em evento corporativo', pos: '50% 100%', video: 'totem-de-led' },
    gallery: [
      { src: 'produtos/totem-de-led/detalhe-1', alt: 'Três Totens de LED com conteúdo institucional em evento corporativo', pos: '50% 60%', ratio: '3/4' },
      { src: 'produtos/totem-de-led/detalhe-2', alt: 'Totem de LED exibindo comunicado em espaço corporativo', pos: '50% 52%', ratio: '3/4' },
    ],
    seo: {
      title: 'Totem de LED para eventos em BH — tela vertical 1:3',
      description:
        'Aluguel de totem de LED vertical para eventos em Belo Horizonte e região. Formato 1:3 para Reels e TikTok, alto brilho e preparação dos conteúdos inclusa.',
    },
  },

  {
    slug: 'tunel-de-led',
    tall: true, // equipamento vertical: topo da página mais alto para não cortar
    name: 'Túnel de LED',
    shortName: 'Túnel de LED',
    tracking: 'tunel_de_led',
    waName: 'de Túnel de LED',
    tagline: 'Uma entrada que transforma a chegada em uma experiência.',
    summary:
      'Estrutura modular de 5 a 16 traves, com curvas, mais de 250 efeitos e controle remoto para entradas e passagens.',
    intro: [
      'O Túnel de LED transforma entradas e passagens em um espetáculo de luz, cor e movimento. São mais de 250 efeitos de cores e iluminação para criar uma atmosfera diferente em cada momento do evento.',
      'A estrutura é modular: pode ser montada de 5 a 16 traves, inclusive com curvas, para se adaptar ao espaço. Os efeitos são trocados por controle remoto, e a estrutura de ferro com mangueiras de LED é resistente à água.',
    ],
    features: [
      'Mais de 250 efeitos de cores e iluminação',
      'Controle remoto',
      'Estrutura modular',
      'Montagem de 5 a 16 traves',
      'Possibilidade de curvas',
      'Diversas configurações',
    ],
    specs: [
      'Estrutura de ferro',
      'Mangueiras de LED',
      'Módulos de aproximadamente 2,10 m × 2,10 m',
      'Sistema de controle remoto',
      'Estrutura resistente à água',
    ],
    included: ['Túnel de LED', 'Montagem e desmontagem', 'Deslocamento em Belo Horizonte, Contagem e Betim'],
    travelNote: TRAVEL_NOTE,
    idealFor: 'Casamentos, festas, formaturas, eventos corporativos, shows, inaugurações e aniversários.',
    events: ['casamentos', 'quinze-anos', 'formaturas', 'aniversarios', 'corporativos', 'festas', 'outros'],
    image: { src: 'produtos/tunel-de-led/capa', alt: 'Túnel de LED iluminado na entrada de um evento', video: 'tunel-de-led' },
    gallery: [
      { src: 'produtos/tunel-de-led/detalhe-1', alt: 'Túnel de LED em rosa com arcos de flores na entrada de uma casa de eventos' },
      { src: 'produtos/tunel-de-led/detalhe-2', alt: 'Túnel de LED azul em curva com piso estrelado', video: 'tunel-de-led-detalhe' },
    ],
    seo: {
      title: 'Túnel de LED para entrada de eventos em BH',
      description:
        'Túnel de LED modular de 5 a 16 traves, com curvas, mais de 250 efeitos e controle remoto. Montagem inclusa em Belo Horizonte, Contagem e Betim.',
    },
  },

  {
    slug: 'cabine-vintage',
    tall: true, // equipamento vertical: topo da página mais alto para não cortar
    name: 'Cabine Vintage Fotográfica',
    shortName: 'Cabine Vintage',
    tracking: 'cabine_vintage',
    waName: 'da Cabine Vintage',
    tagline: 'A nostalgia das antigas fotografias em uma experiência inesquecível.',
    summary:
      'Estrutura em madeira de inspiração retrô e fotos impressas na hora em três formatos — tirinha, horizontal e polaroid — com arte personalizada.',
    intro: [
      'A Cabine Vintage resgata o charme das antigas máquinas fotográficas e transforma cada registro em uma lembrança para levar para casa.',
      'Com estrutura em madeira de inspiração retrô, tela, câmera, flash e impressora, a cabine imprime as fotos na hora, como nas tradicionais máquinas lambe-lambe. São três formatos, todos com a arte do seu evento: tirinha (3 poses e 2 cópias), horizontal (3 poses em uma foto) e polaroid (2 poses e 2 cópias).',
    ],
    features: [
      'Estrutura de madeira com design retrô',
      'Fotos impressas na hora',
      'Três formatos: tirinha, horizontal e polaroid',
      'Arte personalizada para o evento',
      'Operador incluso',
    ],
    specs: ['Estrutura em madeira', 'Tela, câmera, flash e impressora', 'Tirinha: 3 poses, 2 cópias', 'Horizontal: 3 poses, 1 foto', 'Polaroid: 2 poses, 2 cópias', 'Operador durante a utilização'],
    included: ['Cabine Vintage', 'Operador', 'Montagem e desmontagem', 'Deslocamento em Belo Horizonte, Contagem e Betim'],
    travelNote: TRAVEL_NOTE,
    idealFor: 'Casamentos, aniversários, formaturas, festas, eventos corporativos e confraternizações.',
    events: ['casamentos', 'quinze-anos', 'formaturas', 'aniversarios', 'corporativos', 'festas', 'outros'],
    image: { src: 'produtos/cabine-vintage/capa', alt: 'Cabine Vintage Fotográfica em madeira com flash, tripé e impressora', pos: '50% 62%', video: 'cabine-vintage' },
    gallery: [
      { src: 'produtos/cabine-vintage/detalhe-1', alt: 'Cabine Vintage com flash, tripé e impressora em jardim', pos: '50% 44%', ratio: '3/4' },
      { src: 'produtos/cabine-vintage/detalhe-2', alt: 'Cabine Vintage Fotográfica com acessórios em evento noturno', ratio: '3/4' },
    ],
    seo: {
      title: 'Cabine Fotográfica Vintage para eventos em BH',
      description:
        'Cabine fotográfica vintage em madeira com impressão na hora: tirinha, horizontal ou polaroid, com arte personalizada. Operador incluso. BH, Contagem e Betim.',
    },
  },
];
