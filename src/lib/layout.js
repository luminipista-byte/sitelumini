/**
 * Layout base: <head>, header, footer, CTA fixo no mobile e scripts.
 */
const site = require('../data/site');
const products = require('../data/products');
const { esc, exists, waButton, waHref } = require('./html');
const { quoteModal } = require('./quote');

const NAV = [
  { href: '', label: 'Início', key: 'home' },
  { href: 'a-lumini/', label: 'A Lumini', key: 'sobre' },
  { href: 'produtos/', label: 'Produtos', key: 'produtos' },
  { href: 'parceiros/', label: 'Parceiros', key: 'parceiros' },
  { href: 'eventos/', label: 'Eventos', key: 'eventos' },
  { href: 'contato/', label: 'Contato', key: 'contato' },
];

/** Logo oficial, se o arquivo existir; senão, logotipo tipográfico de reserva. */
const brandMark = (rel, variant = 'light') => {
  const file = variant === 'light' ? site.logo.light : site.logo.dark;
  if (exists(file)) {
    return `<img src="${rel}${file}" alt="${esc(site.name)}" width="102" height="40">`;
  }
  // Reserva tipográfica — substituir pelo logo oficial em public/assets/img/marca/
  return `<span class="wordmark" aria-label="${esc(site.name)}"><span class="wordmark__name">Lumini</span><span class="wordmark__sub">Pista de LED</span></span>`;
};

const trackingHead = () => {
  const t = site.tracking;
  const parts = [];

  if (t.gtmContainerId) {
    parts.push(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${t.gtmContainerId}');</script>`);
  }

  // Google tag (Google Ads + GA4 futuro compartilham o mesmo gtag.js)
  const gtagIds = [t.googleAds.id, t.ga4MeasurementId].filter(Boolean);
  parts.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${gtagIds.map((id) => `gtag('config','${id}');`).join('')}</script>`);

  // Meta Pixel — PageView em todas as páginas
  parts.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${t.metaPixelId}');fbq('track','PageView');</script>`);

  return parts.join('\n');
};

const trackingBody = () => {
  const t = site.tracking;
  return [
    t.gtmContainerId && `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${t.gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
    `<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${t.metaPixelId}&ev=PageView&noscript=1"></noscript>`,
  ]
    .filter(Boolean)
    .join('\n');
};

const header = (rel, active, overlay) => `
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="site-header${overlay ? ' site-header--overlay' : ''}" data-header>
  <div class="wrap site-header__inner">
    <a class="brand" href="${rel || './'}" aria-label="${esc(site.name)} — página inicial">${brandMark(rel, 'light')}</a>
    <nav class="nav" id="menu" aria-label="Menu principal">
      <ul class="nav__list">
        ${NAV.map((n) => `<li><a href="${rel}${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
      </ul>
      <div class="nav__mobile-extra">
        ${waButton({ placement: 'menu', cls: 'btn btn--gold btn--block' })}
        <p class="nav__contact">WhatsApp ${esc(site.whatsapp.display)}<br>${esc(site.instagram.handle)}</p>
      </div>
    </nav>
    ${waButton({ label: 'Orçamento', placement: 'header', cls: 'btn btn--outline btn--sm site-header__cta' })}
    <button class="nav-toggle" type="button" aria-controls="menu" aria-expanded="false" data-nav-toggle>
      <span class="nav-toggle__bar"></span><span class="nav-toggle__bar"></span>
      <span class="visually-hidden">Abrir menu</span>
    </button>
  </div>
</header>`;

const footer = (rel) => `
<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <a class="brand" href="${rel || './'}">${brandMark(rel, 'light')}</a>
        <p>Fabricação, locação e operação de pistas de LED e equipamentos para eventos. Desde ${site.foundingYear}, em ${site.address.city} — ${site.address.state}.</p>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__title">Produtos</h2>
        <ul>${products.map((p) => `<li><a href="${rel}produtos/${p.slug}/">${esc(p.navLabel || p.name)}</a></li>`).join('')}</ul>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__title">Lumini</h2>
        <ul>${NAV.slice(1).map((n) => `<li><a href="${rel}${n.href}">${n.label}</a></li>`).join('')}</ul>
      </div>
      <div class="site-footer__col">
        <h2 class="site-footer__title">Contato</h2>
        <ul>
          <li><a href="${esc(waHref())}" target="_blank" rel="noopener" data-wa data-product="geral" data-product-name="Orçamento geral" data-placement="footer" data-direct>WhatsApp ${esc(site.whatsapp.display)}</a></li>
          <li><a href="${site.instagram.url}" target="_blank" rel="noopener">Instagram ${esc(site.instagram.handle)}</a></li>
          <li>${esc(site.address.city)} — ${esc(site.address.state)}</li>
          <li>Atendimento em BH, Contagem, Betim e região metropolitana</li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(site.legalName)} · CNPJ ${esc(site.cnpj)}</p>
    </div>
  </div>
</footer>`;

/**
 * @param {object} o
 * @param {string} o.path       caminho da página ('' para home, 'produtos/' etc.)
 * @param {string} o.title      título da página (sem o sufixo da marca, exceto home)
 * @param {string} o.description
 * @param {string} o.body       HTML do <main>
 * @param {string} o.active     item ativo do menu
 * @param {object[]} o.schema   dados estruturados (JSON-LD)
 * @param {object} o.sticky     CTA fixo no mobile { product, productName, variation, waName }
 * @param {boolean} o.overlay   header transparente sobre o hero
 * @param {string} o.ogImage    imagem de compartilhamento (relativa a public/)
 */
const layout = (o) => {
  const depth = o.path ? o.path.split('/').filter(Boolean).length : 0;
  const rel = o.rootRelative ? '/' : '../'.repeat(depth);
  const canonical = `${site.url}/${o.path}`;
  const fullTitle = o.fullTitle || `${o.title} | ${site.shortName}`;
  const ogImage = o.ogImage && exists(o.ogImage) ? o.ogImage : exists(site.logo.social) ? site.logo.social : null;
  const sticky = o.sticky || { product: 'geral', productName: 'Orçamento geral' };
  const t = site.tracking;

  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(o.description)}">
<link rel="canonical" href="${canonical}">
${o.noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#081322">
${t.searchConsoleVerification ? `<meta name="google-site-verification" content="${esc(t.searchConsoleVerification)}">` : '<!-- Google Search Console: preencher tracking.searchConsoleVerification em src/data/site.js (opcional) -->'}
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${canonical}">
${ogImage ? `<meta property="og:image" content="${site.url}/${ogImage}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">` : ''}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${rel}assets/img/marca/favicon-48.png" type="image/png" sizes="48x48">
<link rel="apple-touch-icon" href="${rel}assets/img/marca/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,300..700&family=Manrope:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${rel}assets/css/style.css?v=${o.version}">
${(o.schema || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
${trackingHead()}
</head>
<body class="${o.bodyClass || ''}">
${trackingBody()}
${header(rel, o.active, o.overlay)}
<main id="conteudo">
${o.body}
</main>
${footer(rel)}
${quoteModal()}
<div class="sticky-cta" data-sticky-cta>
  ${waButton({ label: 'Solicitar orçamento pelo WhatsApp', product: sticky.product, productName: sticky.productName, variation: sticky.variation, waName: sticky.waName, placement: 'sticky_mobile', cls: 'btn btn--gold btn--block' })}
</div>
<script>window.LUMINI=${JSON.stringify({
    whatsapp: site.whatsapp.number,
    metaPixelId: t.metaPixelId,
    googleAds: { id: t.googleAds.id, label: t.googleAds.conversionLabel, sendTo: `${t.googleAds.id}/${t.googleAds.conversionLabel}` },
    ga4: t.ga4MeasurementId,
    gtm: t.gtmContainerId,
  })};</script>
<script src="${rel}assets/js/tracking.js?v=${o.version}" defer></script>
<script src="${rel}assets/js/main.js?v=${o.version}" defer></script>
</body>
</html>
`;
};

module.exports = { layout, NAV, brandMark };
