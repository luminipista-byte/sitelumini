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

  gallery: [
    { src: 'eventos/evento-01', alt: 'Pista de LED Lumini em festa de casamento', type: 'casamentos', size: 'wide' },
    { src: 'eventos/evento-02', alt: 'Túnel de LED na entrada de uma formatura', type: 'formaturas', size: 'tall' },
    { src: 'eventos/evento-03', alt: 'Convidados na pista de LED em festa de 15 anos', type: 'quinze-anos' },
    { src: 'eventos/evento-04', alt: 'Totem de LED em evento corporativo', type: 'corporativos', size: 'tall' },
    { src: 'eventos/evento-05', alt: 'Cabine Vintage Fotográfica em festa', type: 'festas' },
    { src: 'eventos/evento-06', alt: 'Pista de LED Paris Light Way em casamento', type: 'casamentos', size: 'wide' },
    { src: 'eventos/evento-07', alt: 'Totem Pro em festa de aniversário', type: 'aniversarios' },
    { src: 'eventos/evento-08', alt: 'Pista de LED em salão de formatura', type: 'formaturas' },
  ],
};
