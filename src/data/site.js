/**
 * Configuração central do site Lumini.
 * Tudo que é dado da empresa, contato ou tracking fica aqui — os templates
 * e o JavaScript do site leem destes valores. Não duplique em outros lugares.
 */
module.exports = {
  name: 'Lumini Pista de LED',
  shortName: 'Lumini',
  legalName: 'LUMINI PISTA LOCACAO E SERVICOS LTDA',
  cnpj: '37.186.001/0001-82',
  foundingYear: 2020,

  // Domínio de produção (usado em canonical, Open Graph, sitemap e dados estruturados)
  url: 'https://luminipista.com.br',
  lang: 'pt-BR',
  locale: 'pt_BR',

  address: {
    city: 'Contagem',
    state: 'MG',
    stateName: 'Minas Gerais',
    country: 'BR',
  },
  serviceArea: ['Belo Horizonte', 'Contagem', 'Betim', 'Região Metropolitana de Belo Horizonte'],
  // Cidades com deslocamento incluso nos produtos em que isso está especificado
  includedTravel: ['Belo Horizonte', 'Contagem', 'Betim'],

  whatsapp: {
    number: '5531971938537', // formato internacional, só dígitos
    display: '(31) 9 7193-8537',
    defaultMessage: 'Olá! Vim do site e gostaria de solicitar um orçamento para meu evento.',
  },
  instagram: {
    handle: '@lumini_pista',
    url: 'https://www.instagram.com/lumini_pista/',
  },

  // Números oficiais informados pela Lumini. Não adicionar números sem confirmação.
  stats: [
    { value: '1.500', prefix: '+', label: 'eventos realizados' },
    { value: '300', prefix: '+', label: 'pistas de LED vendidas' },
    { value: '50', prefix: '+', label: 'casas parceiras com pista fixa' },
  ],

  // Logo oficial. Enquanto o arquivo não existir em public/, o site usa o
  // logotipo tipográfico de reserva (ver components.js > brandMark).
  logo: {
    light: 'assets/img/marca/logo-lumini.svg', // versão para fundo escuro
    dark: 'assets/img/marca/logo-lumini-escuro.svg', // versão para fundo claro
    social: 'assets/img/marca/og-lumini.jpg', // 1200x630 para compartilhamento
  },

  // ============================================
  // TRACKING — IDs OFICIAIS (tags públicas)
  // ============================================
  tracking: {
    metaPixelId: '2143955416549744',
    googleAds: {
      id: 'AW-11218835567',
      // Conversão "Solicitar cotação"
      conversionLabel: 'PY6MCN3Kj40dEO-wx-Up',
    },

    // ============================================
    // FUTUROS TRACKINGS — LUMINI
    // ============================================
    // Preencha somente com IDs reais. Com valor null nada é carregado.

    // Google Analytics 4
    // Inserir Measurement ID: G-XXXXXXXXXX
    ga4MeasurementId: null,

    // Google Tag Manager
    // Inserir Container ID: GTM-XXXXXXX
    gtmContainerId: null,

    // Google Search Console — verificação por meta tag (opcional;
    // a verificação por DNS ou arquivo HTML também funciona)
    // Inserir apenas o código do content="...": ex. 'abc123...'
    searchConsoleVerification: null,

    // Outros pixels / ferramentas
    // Adicionar aqui e registrar o disparo em assets/js/tracking.js (seção ADAPTADORES)
  },
};
