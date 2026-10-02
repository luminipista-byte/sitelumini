/**
 * Seções reutilizadas entre páginas.
 */
const site = require('../data/site');
const partners = require('../data/partners');
const reviews = require('../data/reviews');
const { esc, exists, waButton } = require('./html');

const eyebrow = (text) => `<p class="eyebrow">${esc(text)}</p>`;

const stats = (variant = '') => `
<dl class="stats ${variant}">
  ${site.stats
    .map(
      (s) => `<div class="stats__item"><dt class="stats__label">${esc(s.label)}</dt><dd class="stats__value"><span class="stats__prefix">${s.prefix}</span>${s.value}</dd></div>`
    )
    .join('')}
</dl>`;

const partnerGrid = (rel, { limit } = {}) => {
  const list = limit ? partners.slice(0, limit) : partners;
  return `<ul class="partners" role="list">
  ${list
    .map(
      (p) => `<li class="partners__item"><img src="${rel}assets/img/parceiros/${p.logo}" alt="Logo ${esc(p.name)}" width="180" height="180" loading="lazy" decoding="async"><span>${esc(p.name)}</span></li>`
    )
    .join('')}
</ul>`;
};

const finalCta = ({ product, productName, variation, waName } = {}) => `
<section class="final-cta" aria-labelledby="cta-final">
  <div class="wrap final-cta__inner">
    <div>
      ${eyebrow('Orçamento')}
      <h2 id="cta-final" class="final-cta__title">Seu evento merece uma experiência à altura.</h2>
    </div>
    <div class="final-cta__side">
      <p>Conte a data, o local e o tipo de evento. A equipe Lumini responde pelo WhatsApp com as opções e as condições para a sua região.</p>
      ${waButton({ label: 'Solicitar orçamento pelo WhatsApp', product: product || 'geral', productName: productName || 'Orçamento geral', variation, waName, placement: 'cta_final', cls: 'btn btn--gold btn--lg' })}
      <p class="final-cta__meta">${esc(site.whatsapp.display)} · Atendimento em BH, Contagem, Betim e região metropolitana</p>
    </div>
  </div>
</section>`;

const pageHead = ({ eyebrowText, title, lead, crumbs = [], rel }) => `
<section class="page-head">
  <div class="wrap">
    ${crumbs.length ? breadcrumbs(crumbs, rel) : ''}
    ${eyebrowText ? eyebrow(eyebrowText) : ''}
    <h1 class="page-head__title">${title}</h1>
    ${lead ? `<p class="page-head__lead">${lead}</p>` : ''}
  </div>
</section>`;

const breadcrumbs = (crumbs, rel) => `
<nav class="crumbs" aria-label="Você está em">
  <ol>
    <li><a href="${rel || './'}">Início</a></li>
    ${crumbs.map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${rel}${c.path}">${esc(c.name)}</a></li>`)).join('')}
  </ol>
</nav>`;

const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Início', path: '' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${site.url}/${c.path}`,
  })),
});

const businessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#empresa`,
  name: site.name,
  legalName: site.legalName,
  taxID: site.cnpj,
  url: `${site.url}/`,
  telephone: '+55 31 97193-8537',
  foundingDate: String(site.foundingYear),
  ...(exists(site.logo.social) && { image: `${site.url}/${site.logo.social}` }),
  ...(exists(site.logo.light) && { logo: `${site.url}/${site.logo.light}` }),
  description:
    'Fabricação, locação e operação de pistas de LED, Totem Pro, Totem de LED, Túnel de LED e Cabine Vintage Fotográfica para eventos em Belo Horizonte e região metropolitana.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: site.address.country,
  },
  areaServed: [
    { '@type': 'City', name: 'Belo Horizonte' },
    { '@type': 'City', name: 'Contagem' },
    { '@type': 'City', name: 'Betim' },
    { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Belo Horizonte' },
    { '@type': 'State', name: 'Minas Gerais' },
  ],
  sameAs: [site.instagram.url],
});

const reviewsSection = (rel) => `
<section class="section section--navy" aria-labelledby="reviews-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        ${eyebrow('Depoimentos')}
        <h2 id="reviews-title" class="section-head__title">O que dizem sobre a Lumini.</h2>
      </div>
      <p class="section-head__text">Avaliações de clientes no ${reviews.source}.</p>
    </div>
    <ul class="reviews" role="list">
      ${reviews.items
        .map(
          (r) => `<li class="review">
        <p class="review__stars" aria-label="${r.rating} de 5 estrelas">${'★'.repeat(r.rating)}</p>
        <blockquote class="review__text">${r.text.map((t) => `<p>${esc(t)}</p>`).join('')}</blockquote>
        <p class="review__author"><img src="${rel}assets/img/avaliacoes/${r.photo}" alt="" width="48" height="48" loading="lazy" decoding="async"><span><strong>${esc(r.name)}</strong>Avaliação no ${reviews.source}</span></p>
      </li>`
        )
        .join('')}
    </ul>
    <p class="section-foot"><a class="link-arrow" href="${reviews.url}" target="_blank" rel="noopener">Ver avaliações no Google</a></p>
  </div>
</section>`;

module.exports = { reviewsSection, eyebrow, stats, partnerGrid, finalCta, pageHead, breadcrumbs, breadcrumbSchema, businessSchema };
