const site = require('../data/site');
const products = require('../data/products');
const events = require('../data/events');
const { esc, picture, waButton } = require('../lib/html');
const { eyebrow, stats, partnerGrid, finalCta, businessSchema } = require('../lib/components');

module.exports = (ctx) => {
  const rel = '';
  const [pista, ...others] = products;

  const body = `
<section class="hero" aria-labelledby="hero-title">
  ${picture({ src: 'home/hero', alt: 'Pista de LED Galaxy iluminada em salão de eventos', video: 'home-hero', videoMobile: 'home-hero-mobile' }, { rel, ratio: '16/9', sizes: '100vw', eager: true, cls: 'hero__media', video: true })}
  <div class="wrap hero__content">
    ${eyebrow('Pistas de LED e tecnologia para eventos · Belo Horizonte e região')}
    <h1 id="hero-title" class="hero__title">Tecnologia e experiências que transformam eventos.</h1>
    <p class="hero__lead">A Lumini desenvolve e fornece soluções de iluminação, tecnologia e entretenimento para eventos, unindo equipamentos próprios, estrutura e operação completa.</p>
    <div class="actions">
      ${waButton({ placement: 'hero', cls: 'btn btn--gold btn--lg' })}
      <a class="btn btn--ghost btn--lg" href="produtos/">Conheça nossos produtos</a>
    </div>
  </div>
</section>

<section class="intro section section--navy" aria-labelledby="intro-title">
  <div class="wrap">
    <div class="intro__grid">
      <h2 id="intro-title" class="intro__statement">Fabricamos, transportamos, montamos e operamos. <span>Do galpão em Contagem ao salão do seu evento.</span></h2>
      <div class="intro__text">
        <p>Desde ${site.foundingYear}, a Lumini desenvolve os próprios equipamentos — começando pelas pistas de LED em alumínio que hoje estão em mais de 50 casas de eventos de Minas Gerais.</p>
        <p>Atendemos Belo Horizonte, Contagem, Betim e toda a região metropolitana, com equipe própria do transporte à desmontagem.</p>
        <a class="link-arrow" href="a-lumini/">Conheça a Lumini</a>
      </div>
    </div>
    ${stats('stats--on-dark')}
  </div>
</section>

<section class="section" aria-labelledby="produtos-title">
  <div class="wrap">
    <div class="section-head">
      ${eyebrow('Produtos')}
      <h2 id="produtos-title" class="section-head__title">Equipamentos desenvolvidos pela Lumini</h2>
      <p class="section-head__text">Cada equipamento foi pensado para ser resistente, prático de montar e marcante no ambiente.</p>
    </div>

    <article class="feature">
      <a class="feature__media" href="produtos/${pista.slug}/" tabindex="-1" aria-hidden="true">
        ${picture(pista.image, { rel, ratio: '4/3', sizes: '(min-width: 900px) 60vw, 100vw' })}
      </a>
      <div class="feature__body">
        <p class="index-label">01</p>
        <h3 class="feature__title"><a href="produtos/${pista.slug}/">${esc(pista.name)}</a></h3>
        <p class="feature__tagline">${esc(pista.tagline)}</p>
        <p>${esc(pista.summary)}</p>
        <ul class="chips" aria-label="Modelos">
          ${pista.variations.map((v) => `<li><a href="produtos/${pista.slug}/#${v.slug}">${esc(v.name.replace('Pista ', ''))}</a></li>`).join('')}
        </ul>
        <div class="actions">
          <a class="btn btn--dark" href="produtos/${pista.slug}/">Ver modelos</a>
          ${waButton({ label: 'Orçamento', product: pista.tracking, productName: pista.name, waName: pista.waName, placement: 'home_produtos', cls: 'btn btn--text' })}
        </div>
      </div>
    </article>

    <div class="product-list">
      ${others
        .map(
          (p, i) => `
      <article class="product-card">
        <a class="product-card__media" href="produtos/${p.slug}/" tabindex="-1" aria-hidden="true">
          ${picture(p.image, { rel, ratio: '4/5', sizes: '(min-width: 900px) 25vw, (min-width: 600px) 50vw, 100vw' })}
        </a>
        <p class="index-label">${String(i + 2).padStart(2, '0')}</p>
        <h3 class="product-card__title"><a href="produtos/${p.slug}/">${esc(p.name)}</a></h3>
        <p class="product-card__text">${esc(p.tagline)}</p>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--paper" aria-labelledby="operacao-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        ${eyebrow('Como trabalhamos')}
        <h2 id="operacao-title" class="section-head__title">Não entregamos só o equipamento.</h2>
      </div>
      <p class="section-head__text">A mesma equipe que fabrica cuida do transporte, da montagem e, quando o evento pede, da operação. Menos fornecedores para coordenar, mais tranquilidade no dia.</p>
    </div>
    <ol class="steps">
      <li class="steps__item"><span class="steps__n">01</span><h3>Fabricação própria</h3><p>Desenvolvimento, fabricação e manutenção feitos na fábrica e no galpão da Lumini.</p></li>
      <li class="steps__item"><span class="steps__n">02</span><h3>Transporte</h3><p>Vans próprias levam os equipamentos até o local. Deslocamento incluso em BH, Contagem e Betim.</p></li>
      <li class="steps__item"><span class="steps__n">03</span><h3>Montagem e desmontagem</h3><p>Mão de obra especializada monta antes do evento e desmonta ao final.</p></li>
      <li class="steps__item"><span class="steps__n">04</span><h3>Operação</h3><p>Totem Pro e Cabine Vintage contam com operador durante a utilização.</p></li>
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="historia-title">
  <div class="wrap story-teaser">
    <div class="story-teaser__media">
      ${picture({ src: 'sobre/claudiney-fundador', alt: 'Claudiney, fundador da Lumini' }, { rel, ratio: '4/5', sizes: '(min-width: 900px) 40vw, 100vw' })}
    </div>
    <div class="story-teaser__body">
      ${eyebrow('A Lumini')}
      <h2 id="historia-title" class="section-head__title">Começou com um fotógrafo que gostava de fabricar.</h2>
      <p>Claudiney trabalhava com fotografia quando começou a construir pistas de LED. Havia poucos fabricantes em Minas Gerais, e a Lumini cresceu até se tornar uma das principais do estado.</p>
      <p>A experiência com fabricação levou a novos equipamentos — Totem Pro, Túnel de LED, Cabine Vintage, Totem de LED — sempre com o mesmo cuidado: resistência, praticidade e preço justo.</p>
      <a class="link-arrow" href="a-lumini/">Leia a nossa história</a>
    </div>
  </div>
</section>

<section class="section section--paper" aria-labelledby="parceiros-title">
  <div class="wrap">
    <div class="section-head section-head--split">
      <div>
        ${eyebrow('Casas Parceiras')}
        <h2 id="parceiros-title" class="section-head__title">Presente nas principais casas de eventos.</h2>
      </div>
      <p class="section-head__text">Mais de 50 casas de festas e eventos trabalham com pistas de LED Lumini instaladas de forma fixa.</p>
    </div>
    ${partnerGrid(rel)}
    <p class="section-foot"><a class="link-arrow" href="parceiros/">Ver Casas Parceiras</a></p>
  </div>
</section>

<section class="section" aria-labelledby="eventos-title">
  <div class="wrap">
    <div class="section-head">
      ${eyebrow('Eventos')}
      <h2 id="eventos-title" class="section-head__title">Para cada tipo de celebração.</h2>
    </div>
    <ul class="event-index" role="list">
      ${events.types
        .map((t) => `<li><a href="eventos/#${t.slug}"><span class="event-index__name">${esc(t.name)}</span><span class="event-index__text">${esc(t.text)}</span></a></li>`)
        .join('')}
    </ul>
  </div>
</section>

${finalCta()}
`;

  return ctx.layout({
    path: '',
    fullTitle: 'Lumini Pista de LED | Pistas de LED e tecnologia para eventos em BH',
    description:
      'Fabricação e aluguel de pistas de LED, Totem Pro, Totem de LED, Túnel de LED e Cabine Vintage para eventos em Belo Horizonte, Contagem, Betim e região. Montagem própria.',
    active: 'home',
    overlay: true,
    bodyClass: 'page-home',
    schema: [
      businessSchema(),
      { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/`, inLanguage: 'pt-BR' },
    ],
    body,
  });
};
