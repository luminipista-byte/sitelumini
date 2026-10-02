/**
 * Tipos de evento atendidos pela Lumini.
 * Os produtos indicados para cada tipo vêm do campo `events` em products.js.
 *
 * Galeria: adicione fotos reais em public/assets/img/eventos/ seguindo o
 * nome-base de cada item (`<src>-1600.webp` e `<src>-800.webp`).
 */
module.exports = {
  types: [
    {
      slug: 'casamentos',
      name: 'Casamentos',
      text: 'Da entrada dos convidados à pista de dança, equipamentos que acompanham a decoração e criam momentos para a festa lembrar.',
    },
    {
      slug: 'formaturas',
      name: 'Formaturas',
      text: 'Pistas, túneis e totens dimensionados para grandes públicos, com montagem e operação feitas pela equipe Lumini.',
    },
    {
      slug: 'quinze-anos',
      name: '15 anos',
      text: 'Uma entrada marcante, uma pista que vira cenário e fotos impressas na hora para os convidados levarem.',
    },
    {
      slug: 'aniversarios',
      name: 'Aniversários',
      text: 'Do encontro intimista à festa grande: o equipamento certo para o espaço e o estilo da comemoração.',
    },
    {
      slug: 'corporativos',
      name: 'Eventos corporativos',
      text: 'Conteúdo da marca em destaque, captação de leads e experiências interativas para confraternizações, feiras e lançamentos.',
    },
    {
      slug: 'festas',
      name: 'Festas',
      text: 'Festas temáticas, confraternizações e celebrações em geral, com equipamentos que transformam o ambiente.',
    },
    {
      slug: 'outros',
      name: 'Outros eventos',
      text: 'Feiras, exposições, ativações de marca, shows e inaugurações. Conte o formato do seu evento pelo WhatsApp.',
    },
  ],

  // Galeria uniforme (3:4), alternando vídeos curtos e fotos.
  // `video`: nome-base em public/assets/video/ (o poster é a própria imagem).
  gallery: [
    { src: 'eventos/ev-debutante', video: 'eventos/ev-debutante', alt: 'Debutante girando na Pista de LED em festa de 15 anos', caption: 'Pista de LED · 15 Anos' },
    { src: 'eventos/ev-totem-carro', alt: 'Totem Pro ao lado de automóvel em concessionária', caption: 'Totem Pro · Concessionária' },
    { src: 'eventos/ev-tunel-debutante', video: 'eventos/ev-tunel-debutante', alt: 'Debutante dançando e girando de vestido dentro do Túnel de LED', caption: 'Túnel de LED · 15 Anos' },
    { src: 'eventos/ev-valsa', alt: 'Valsa de debutante sobre a Pista de LED', caption: 'Pista de LED · Valsa' },
    { src: 'eventos/ev-cabine', video: 'eventos/ev-cabine', alt: 'Convidados retirando fotos impressas na Cabine Vintage durante a festa', caption: 'Cabine Vintage · Casamento' },
    { src: 'eventos/ev-totens', alt: 'Dois Totens Pro em festa de 15 anos ao ar livre', caption: 'Totem Pro · 15 Anos' },
    { src: 'eventos/ev-tunel-concessionaria', video: 'eventos/ev-tunel-concessionaria', alt: 'Túnel de LED na entrada de uma concessionária', caption: 'Túnel de LED · Concessionária' },
    { src: 'eventos/ev-debutante-pista', alt: 'Debutante com vestido brilhante sobre a Pista de LED', caption: 'Pista de LED · 15 Anos' },
    { src: 'eventos/ev-pista-infinity', video: 'eventos/ev-pista-infinity', alt: 'Pista de LED Infinity com efeitos coloridos em festa de 15 anos', caption: 'Pista Infinity · 15 Anos' },
    { src: 'eventos/ev-totem-led', alt: 'Totem de LED ao lado de jardim vertical em evento corporativo', caption: 'Totem de LED · Corporativo' },
    { src: 'eventos/ev-carro-pista', video: 'eventos/ev-carro-pista', alt: 'Automóvel exposto sobre a Pista de LED Infinity em concessionária', caption: 'Pista Infinity · Concessionária' },
    { src: 'eventos/ev-tunel-rooftop', video: 'eventos/ev-tunel-rooftop', alt: 'Túnel de LED azul no rooftop do Topo do Mundo', caption: 'Túnel de LED · Topo do Mundo' },
  ],
};
