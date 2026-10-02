const site = require('../data/site');
const products = require('../data/products');
const events = require('../data/events');
const { esc, picture, waButton } = require('../lib/html');
const { eyebrow, pageHead, finalCta, breadcrumbs, breadcrumbSchema, businessSchema } = require('../lib/components');

const list = (items, cls = 'checklist') => `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

const serviceSchema = (p, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: p.name,
  serviceType: `Locação de ${p.name} para eventos`,
  description: p.seo.description,
  url,
  provider: { '@id': `${site.url}/#empresa` },
  areaServed: site.serviceArea.map((name) => ({ '@type': 'Place', name })),
});

const faqSchema = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

const ctaFor = (p, v, placement, extra = {}) =>
  waButton({
    product: p.tracking,
    productName: v ? `${p.name} — ${v.name}` : p.name,
    variation: v ? v.tracking : '',
    waName: v ? v.waName : p.waName,
    placement,
    ...extra,
  });

const relatedEvents = (p, rel) => {
  const types = events.types.filter((t) => p.events.includes(t.slug));
  return types.map((t) => `<li><a href="${rel}eventos/#${t.slug}">${esc(t.name)}</a></li>`).join('');
};

const otherProducts = (p, rel) => `
<section class="section section--paper" aria-labelledby="outros-title">
  <div class="wrap">
    <div class="section-head">
      ${eyebrow('Produtos')}
      <h2 id="outros-title" class="section-head__title">Outros equipamentos Lumini</h2>
    </div>
    <ul class="other-products" role="list">
      ${products
        .filter((o) => o.slug !== p.slug)
        .map(
          (o) => `<li><a href="${rel}produtos/${o.slug}/">
            ${picture(o.image, { rel, ratio: '1/1', sizes: '(min-width: 900px) 20vw, 50vw', cls: 'other-products__media' })}
            <span class="other-products__name">${esc(o.name)}</span>
            <span class="other-products__text">${esc(o.tagline)}</span>
          </a></li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;

const productHero = (p, rel, crumbs, h1) => `
<section class="product-hero">
  <div class="wrap product-hero__grid">
    <div class="product-hero__body">
      ${breadcrumbs(crumbs, rel)}
      ${eyebrow('Locação em BH, Contagem, Betim e região')}
      <h1 class="product-hero__title">${h1}</h1>
      <p class="product-hero__tagline">${esc(p.tagline)}</p>
      <div class="actions">
        ${ctaFor(p, null, 'produto_hero', { cls: 'btn btn--gold btn--lg' })}
      </div>
    </div>
    <div class="product-hero__media">
      ${picture(p.image, { rel, ratio: '4/5', sizes: '(min-width: 900px) 45vw, 100vw', eager: true })}
    </div>
  </div>
</section>`;

const included = (p) => `
<div class="included">
  <h3 class="included__title">Incluso</h3>
  ${list(p.included)}
  <p class="included__note">${esc(p.travelNote)}</p>
</div>`;

/* ---------- Pista de LED (produto com variações) ---------- */
const pistaPage = (ctx, p) => {
  const path = `produtos/${p.slug}/`;
  const rel = '../../';
  const crumbs = [{ name: 'Produtos', path: 'produtos/' }, { name: p.name, path }];

  const body = `
${productHero(p, rel, crumbs, 'Pistas de LED <span>para eventos</span>')}

<section class="section" aria-labelledby="sobre-pista">
  <div class="wrap prose-split">
    <div>
      ${eyebrow('As pistas')}
      <h2 id="sobre-pista" class="section-head__title">Quatro modelos, o mesmo padrão de fabricação.</h2>
    </div>
    <div class="prose">${p.intro.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
  </div>
  <div class="wrap">
    <nav class="model-nav" aria-label="Modelos de pista">
      <p class="model-nav__label">Quatro modelos</p>
      <ol>${p.variations.map((v, i) => `<li><a href="#${v.slug}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(v.name.replace('Pista ', ''))}</a></li>`).join('')}</ol>
    </nav>
  </div>
</section>

${p.variations
  .map(
    (v, i) => `
<section class="variation${i % 2 ? ' variation--reverse' : ''}" id="${v.slug}" aria-labelledby="v-${v.slug}">
  <div class="wrap variation__grid">
    <div class="variation__media">
      ${picture(v.image, { rel, ratio: '4/5', sizes: '(min-width: 900px) 50vw, 100vw' })}
    </div>
    <div class="variation__body">
      <p class="index-label">${String(i + 1).padStart(2, '0')} / ${String(p.variations.length).padStart(2, '0')}</p>
      <h2 id="v-${v.slug}" class="variation__title">${esc(v.name)}</h2>
      <p class="variation__tagline">${esc(v.tagline)}</p>
      ${v.description.map((d) => `<p>${esc(d)}</p>`).join('')}
      ${list(v.features, 'checklist checklist--cols')}
      <p class="variation__ideal"><strong>Ideal para</strong> ${esc(v.idealFor)}</p>
      ${ctaFor(p, v, 'pista_variacao', { label: `Orçamento da ${v.name}`, cls: 'btn btn--dark' })}
    </div>
  </div>
</section>`
  )
  .join('')}

<section class="section section--navy" aria-labelledby="specs-title">
  <div class="wrap specs">
    <div>
      ${eyebrow('Em todos os modelos')}
      <h2 id="specs-title" class="section-head__title">Estrutura em alumínio, vidro temperado e montagem própria.</h2>
    </div>
    <div class="specs__body">
      <dl class="spec-table">
        <div><dt>Altura</dt><dd>3,5 cm</dd></div>
        <div><dt>Acesso</dt><dd>Rampa</dd></div>
        <div><dt>Superfície</dt><dd>Vidro temperado</dd></div>
        <div><dt>Capacidade</dt><dd>Até 2 toneladas distribuídas sobre a pista</dd></div>
        <div><dt>Dimensões</dt><dd>De 4×4 m até 6×6 m</dd></div>
        <div><dt>Estrutura</dt><dd>Alumínio</dd></div>
      </dl>
      ${included(p)}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="faq-title">
  <div class="wrap prose-split">
    <div>
      ${eyebrow('Dúvidas frequentes')}
      <h2 id="faq-title" class="section-head__title">Pista de LED para casamentos, 15 anos e formaturas em BH</h2>
      <p class="muted">Indicadas para</p>
      <ul class="tag-list">${relatedEvents(p, rel)}</ul>
    </div>
    <div class="faq">
      ${p.faq.map((f) => `<details class="faq__item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}
    </div>
  </div>
</section>

${otherProducts(p, rel)}
${finalCta({ product: p.tracking, productName: p.name, waName: p.waName })}
`;

  return ctx.layout({
    path,
    title: p.seo.title,
    description: p.seo.description,
    active: 'produtos',
    schema: [businessSchema(), serviceSchema(p, `${site.url}/${path}`), faqSchema(p.faq), breadcrumbSchema(crumbs)],
    sticky: { product: p.tracking, productName: p.name, waName: p.waName },
    ogImage: `assets/img/${p.image.src}-1600.webp`,
    body,
  });
};

/* ---------- Demais produtos ---------- */
const productPage = (ctx, p) => {
  const path = `produtos/${p.slug}/`;
  const rel = '../../';
  const crumbs = [{ name: 'Produtos', path: 'produtos/' }, { name: p.name, path }];

  const body = `
${productHero(p, rel, crumbs, esc(p.name))}

<section class="section" aria-labelledby="sobre-produto">
  <div class="wrap prose-split">
    <div>
      ${eyebrow('O equipamento')}
      <h2 id="sobre-produto" class="section-head__title">${esc(p.summary)}</h2>
    </div>
    <div class="prose">
      ${p.intro.map((t) => `<p>${esc(t)}</p>`).join('')}
      ${p.uses ? `<h3 class="prose__subtitle">Formas de uso</h3>${list(p.uses)}` : ''}
    </div>
  </div>
</section>

${
  p.gallery && p.gallery.length
    ? `<section class="product-gallery" aria-label="Fotos ${esc(p.name)}">
  <div class="wrap product-gallery__grid">
    ${p.gallery.map((g, i) => picture(g, { rel, ratio: i === 0 ? '4/3' : '3/4', sizes: '(min-width: 900px) 50vw, 100vw' })).join('')}
  </div>
</section>`
    : ''
}

<section class="section section--navy" aria-labelledby="specs-title">
  <div class="wrap specs">
    <div>
      ${eyebrow('Detalhes')}
      <h2 id="specs-title" class="section-head__title">Diferenciais e informações técnicas</h2>
      <p class="specs__ideal"><strong>Ideal para</strong> ${esc(p.idealFor)}</p>
    </div>
    <div class="specs__body">
      <div class="specs__cols">
        <div><h3 class="included__title">Diferenciais</h3>${list(p.features)}</div>
        <div><h3 class="included__title">Informações técnicas</h3>${list(p.specs)}</div>
      </div>
      ${included(p)}
      ${ctaFor(p, null, 'produto_specs', { cls: 'btn btn--gold' })}
    </div>
  </div>
</section>

${otherProducts(p, rel)}
${finalCta({ product: p.tracking, productName: p.name, waName: p.waName })}
`;

  return ctx.layout({
    path,
    title: p.seo.title,
    description: p.seo.description,
    active: 'produtos',
    schema: [businessSchema(), serviceSchema(p, `${site.url}/${path}`), breadcrumbSchema(crumbs)],
    sticky: { product: p.tracking, productName: p.name, waName: p.waName },
    ogImage: `assets/img/${p.image.src}-1600.webp`,
    body,
  });
};

/* ---------- Índice /produtos/ ---------- */
const indexPage = (ctx) => {
  const rel = '../';
  const crumbs = [{ name: 'Produtos', path: 'produtos/' }];
  const body = `
${pageHead({
  rel,
  crumbs,
  eyebrowText: 'Produtos',
  title: 'Equipamentos para eventos',
  lead: 'Pistas de LED, totens, túnel e cabine fotográfica desenvolvidos pela Lumini — com transporte, montagem e, quando necessário, operação durante o evento.',
})}
<section class="section section--tight">
  <div class="wrap catalog">
    ${products
      .map(
        (p, i) => `
    <article class="catalog__item${i === 0 ? ' catalog__item--lead' : ''}">
      <a class="catalog__media" href="${p.slug}/" tabindex="-1" aria-hidden="true">
        ${picture(p.image, { rel, ratio: i === 0 ? '16/10' : '4/3', sizes: i === 0 ? '100vw' : '(min-width: 900px) 50vw, 100vw' })}
      </a>
      <div class="catalog__body">
        <p class="index-label">${String(i + 1).padStart(2, '0')}</p>
        <h2 class="catalog__title"><a href="${p.slug}/">${esc(p.name)}</a></h2>
        <p class="catalog__tagline">${esc(p.tagline)}</p>
        <p>${esc(p.summary)}</p>
        ${p.variations ? `<p class="catalog__models">Modelos: ${p.variations.map((v) => `<a href="${p.slug}/#${v.slug}">${esc(v.name.replace('Pista ', ''))}</a>`).join(' · ')}</p>` : ''}
        <div class="actions">
          <a class="btn btn--dark" href="${p.slug}/">Ver detalhes</a>
          ${ctaFor(p, null, 'catalogo', { label: 'Orçamento', cls: 'btn btn--text' })}
        </div>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>
${finalCta()}
`;
  return ctx.layout({
    path: 'produtos/',
    title: 'Produtos — pista de LED, totens, túnel e cabine para eventos',
    description:
      'Conheça os equipamentos Lumini: Pista de LED (Infinity, Galaxy, Paris Light Way e Paris Black), Totem Pro, Totem de LED, Túnel de LED e Cabine Vintage Fotográfica.',
    active: 'produtos',
    schema: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${site.url}/produtos/${p.slug}/` })),
      },
    ],
    body,
  });
};

module.exports = (ctx) => [
  { path: 'produtos/', html: indexPage(ctx) },
  ...products.map((p) => ({ path: `produtos/${p.slug}/`, html: p.variations ? pistaPage(ctx, p) : productPage(ctx, p) })),
];
