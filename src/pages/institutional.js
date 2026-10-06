const site = require('../data/site');
const products = require('../data/products');
const partners = require('../data/partners');
const events = require('../data/events');
const { esc, picture, waButton } = require('../lib/html');
const { quoteFields } = require('../lib/quote');
const { eyebrow, stats, partnerGrid, finalCta, pageHead, breadcrumbSchema, businessSchema } = require('../lib/components');

/* ---------- A Lumini ---------- */
const about = (ctx) => {
  const rel = '../';
  const crumbs = [{ name: 'A Lumini', path: 'a-lumini/' }];
  const body = `
${pageHead({
  rel,
  crumbs,
  eyebrowText: `A Lumini · Desde ${site.foundingYear}`,
  title: 'Da fotografia à fabricação de pistas de LED.',
  lead: 'A história de um fotógrafo que aprendeu a fabricar, transportar, montar e operar os próprios equipamentos para eventos.',
})}

<section class="section section--tight">
  <div class="wrap chapter">
    <div class="chapter__media">
      ${picture({ src: 'sobre/claudiney-fundador', alt: 'Claudiney Campelo, fundador da Lumini Pista de LED' }, { rel, ratio: '4/5', sizes: '(min-width: 900px) 40vw, 100vw', eager: true })}
      <p class="caption">Claudiney Campelo, fundador da Lumini.</p>
    </div>
    <div class="chapter__body prose">
      <p class="index-label">Origem</p>
      <h2 class="chapter__title">Uma mudança de carreira.</h2>
      <p>A Lumini nasceu de uma mudança de rumo. Claudiney, fundador da empresa, trabalhava como fotógrafo quando começou a fabricar pistas de LED — um trabalho que unia duas coisas de que sempre gostou: criar produtos e resolver problemas com as próprias mãos.</p>
      <p>Na época, eram poucos os fabricantes de pistas para locação e venda em Minas Gerais. A Lumini ocupou esse espaço e cresceu até se tornar uma das principais fabricantes do segmento no estado.</p>
    </div>
  </div>
</section>

<section class="section section--paper">
  <div class="wrap structure">
    <div class="structure__body">
      <p class="index-label">Parcerias</p>
      <h2 class="chapter__title">Crescer junto com as casas de eventos.</h2>
      <div class="prose">
        <p>Desde o início, o modelo de negócio foi construído a partir de parcerias com casas de festas e eventos. Em vez de depender apenas da locação avulsa, a Lumini passou a instalar pistas fixas nos salões parceiros — que oferecem a pista aos seus clientes com a garantia de quem fabricou o equipamento.</p>
        <p>Hoje são mais de 50 casas parceiras com pistas fixas e mais de 300 pistas de LED vendidas. Somadas às locações, as pistas e os equipamentos Lumini já estiveram em mais de 1.500 eventos.</p>
      </div>
      <p class="section-foot"><a class="link-arrow" href="${rel}parceiros/">Conheça as Casas Parceiras</a></p>
    </div>
    <div class="structure__media">
      ${picture({ src: 'sobre/montagem-salao', video: 'sobre/montagem-salao', alt: 'Equipe Lumini descarregando e montando uma pista de LED em salão de eventos' }, { rel, ratio: '9/16', sizes: '(min-width: 900px) 30vw, 90vw', video: true })}
      <p class="caption">Montagem de uma pista de LED em salão parceiro.</p>
    </div>
  </div>
  <div class="wrap">${stats()}</div>
</section>

<section class="section">
  <div class="wrap structure structure--reverse">
    <div class="structure__media">
      ${picture({ src: 'sobre/equipamentos', video: 'sobre/equipamentos', alt: 'Pista Galaxy, Totem Pro, Cabine Vintage e Túnel de LED em funcionamento' }, { rel, ratio: '9/16', sizes: '(min-width: 900px) 30vw, 90vw', video: true })}
      <p class="caption">Pista Galaxy, Totem Pro, Túnel de LED e Cabine Vintage.</p>
    </div>
    <div class="structure__body">
      <p class="index-label">Novos equipamentos</p>
      <h2 class="chapter__title">A fabricação abriu caminho para outros produtos.</h2>
      <div class="prose">
        <p>O gosto por fabricar e encarar desafios levou ao desenvolvimento de novos equipamentos: Totem Pro, Túnel de LED, Cabine Vintage Fotográfica, Plataforma 360, Totem de LED, entre outros.</p>
        <p>Todos seguem o mesmo princípio das pistas: desenvolvimento próprio, pensado para resistência e praticidade na montagem. As pistas, por exemplo, são feitas em alumínio — mais leves para transportar e resistentes para o uso contínuo.</p>
      </div>
      <ul class="product-links" role="list">
        ${products.map((p) => `<li><a href="${rel}produtos/${p.slug}/">${esc(p.name)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section section--navy">
  <div class="wrap structure">
    <div class="structure__body">
      <p class="index-label">Estrutura</p>
      <h2 class="chapter__title">Fábrica, galpão, equipe e vans próprias.</h2>
      <div class="prose">
        <p>A Lumini não apenas entrega o equipamento. A empresa conta com fábrica e galpão, mão de obra especializada e vans próprias para o deslocamento — o que permite cuidar de toda a logística: levar o equipamento até o salão, montar, desmontar e, quando necessário, manter operadores durante o evento.</p>
        <p>A manutenção também é feita internamente. Quem fabrica conhece cada peça, e isso se traduz em equipamentos bem cuidados e em respostas rápidas quando algo precisa de ajuste.</p>
      </div>
      <ul class="principles" role="list">
        <li>Desenvolvimento e fabricação próprios</li>
        <li>Manutenção e montagem próprias</li>
        <li>Fábrica e galpão</li>
        <li>Mão de obra especializada</li>
        <li>Vans próprias e logística completa</li>
        <li>Pistas de LED em alumínio</li>
        <li>Qualidade e preço justo</li>
      </ul>
    </div>
    <div class="structure__media">
      ${picture({ src: 'sobre/fabrica-video', video: 'sobre/fabrica', alt: 'Montagem de uma pista de LED na fábrica da Lumini, van saindo do galpão e equipe instalando a pista no evento' }, { rel, ratio: '9/16', sizes: '(min-width: 900px) 30vw, 90vw', video: true })}
      <p class="caption">Da fábrica ao salão: fabricação, transporte e montagem pela equipe Lumini.</p>
    </div>
  </div>
  <div class="wrap logistics">
    <h3 class="logistics__title">Logística própria</h3>
    <ul class="logistics__grid" role="list">
      <li>${picture({ src: 'sobre/frota', video: 'sobre/frota', alt: 'Vans e veículos da frota própria da Lumini' }, { rel, ratio: '3/4', sizes: '(min-width: 760px) 30vw, 33vw', video: true })}<p class="caption">Frota própria</p></li>
      <li>${picture({ src: 'sobre/carregamento', video: 'sobre/carregamento', alt: 'Equipe Lumini carregando equipamentos na van' }, { rel, ratio: '3/4', sizes: '(min-width: 760px) 30vw, 33vw', video: true })}<p class="caption">Carregamento</p></li>
      <li>${picture({ src: 'sobre/montagem-local', video: 'sobre/montagem-local', alt: 'Equipe montando uma Pista Infinity no local do evento' }, { rel, ratio: '3/4', sizes: '(min-width: 760px) 30vw, 33vw', video: true })}<p class="caption">Montagem no local</p></li>
    </ul>
  </div>
</section>

${finalCta()}
`;
  return ctx.layout({
    path: 'a-lumini/',
    title: 'A Lumini — fabricante de pistas de LED em Contagem, MG',
    description:
      'A história da Lumini: de fotógrafo a uma das principais fabricantes de pistas de LED de Minas Gerais. Fabricação, manutenção, logística e montagem próprias desde 2020.',
    active: 'sobre',
    schema: [businessSchema(), breadcrumbSchema(crumbs)],
    body,
  });
};

/* ---------- Parceiros ---------- */
const partnersPage = (ctx) => {
  const rel = '../';
  const crumbs = [{ name: 'Casas Parceiras', path: 'parceiros/' }];
  const body = `
${pageHead({
  rel,
  crumbs,
  eyebrowText: 'Parceiros',
  title: 'Casas Parceiras',
  lead: 'Mais de 50 casas de festas e eventos contam com pistas de LED Lumini instaladas de forma fixa. Algumas delas:',
})}
<section class="section section--tight">
  <div class="wrap">
    ${partnerGrid(rel)}
  </div>
</section>
<section class="section section--paper">
  <div class="wrap partner-cta">
    <div>
      ${eyebrow('Para casas de eventos')}
      <h2 class="section-head__title">Sua casa com uma pista de LED fixa.</h2>
    </div>
    <div>
      <p>A parceria com casas de eventos é a base da Lumini. Se você administra uma casa de eventos e quer conversar sobre uma pista fixa, fale com a nossa equipe.</p>
      ${waButton({
        label: 'Conversar sobre parceria',
        product: 'parceria',
        productName: 'Parceria — casa de eventos',
        message: 'Olá! Vim do site e gostaria de conversar sobre parceria para minha casa de eventos.',
        placement: 'parceiros',
        cls: 'btn btn--dark',
      })}
    </div>
  </div>
  <div class="wrap compare-block" aria-labelledby="compare-title">
    <div class="section-head">
      <div>
        ${eyebrow('Para casas de eventos')}
        <h2 id="compare-title" class="section-head__title">Por que ter uma pista fixa em parceria, em vez de comprar?</h2>
      </div>
    </div>
    <table class="compare">
      <caption class="visually-hidden">Comparação entre comprar uma pista de LED e ter uma pista fixa em parceria com a Lumini</caption>
      <thead>
        <tr>
          <td></td>
          <th scope="col">Comprando a pista</th>
          <th scope="col" class="compare__lumini">Pista fixa em parceria com a Lumini</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">LED ou placa com defeito</th>
          <td data-label="Comprando a pista">Você precisa encontrar quem conserte — e nem sempre dá tempo antes do próximo evento.</td>
          <td data-label="Pista fixa Lumini">A Lumini troca a placa prontamente, com peças do próprio estoque.</td>
        </tr>
        <tr>
          <th scope="row">Pista danificada em um evento</th>
          <td data-label="Comprando a pista">O prejuízo e a correria ficam com a casa de eventos.</td>
          <td data-label="Pista fixa Lumini">Nossa equipe de logística resolve, e a casa de eventos segue pronta para o próximo evento.</td>
        </tr>
        <tr>
          <th scope="row">Manutenção</th>
          <td data-label="Comprando a pista">Por conta da casa de eventos.</td>
          <td data-label="Pista fixa Lumini">Feita pela equipe Lumini, que fabrica a pista.</td>
        </tr>
        <tr>
          <th scope="row">Aparência ao longo do tempo</th>
          <td data-label="Comprando a pista">A pista envelhece com o uso.</td>
          <td data-label="Pista fixa Lumini">Renovada durante a parceria — nunca fica com aspecto de velha.</td>
        </tr>
        <tr>
          <th scope="row">Rotina da casa de eventos</th>
          <td data-label="Comprando a pista">Mais uma preocupação antes de cada evento.</td>
          <td data-label="Pista fixa Lumini">Tranquilidade: a pista está sempre pronta para receber o evento.</td>
        </tr>
      </tbody>
    </table>
    <div class="compare-cta">
      <p class="compare-cta__text">Sua casa de eventos sempre pronta para receber o próximo evento. <strong>Uma parceria indispensável.</strong></p>
      ${waButton({
        label: 'Quero uma pista fixa na minha casa de eventos',
        product: 'parceria',
        productName: 'Parceria — casa de eventos',
        message: 'Olá! Vim do site e gostaria de conversar sobre uma pista de LED fixa em parceria para minha casa de eventos.',
        placement: 'parceiros_comparacao',
        cls: 'btn btn--dark btn--lg',
      })}
    </div>
  </div>
</section>
${finalCta()}
`;
  return ctx.layout({
    path: 'parceiros/',
    title: 'Casas Parceiras — casas de eventos com pista de LED Lumini',
    description: `Casas de eventos parceiras da Lumini em Belo Horizonte e região: ${partners
      .slice(0, 6)
      .map((p) => p.name)
      .join(', ')} e outras com pistas de LED fixas.`,
    active: 'parceiros',
    schema: [breadcrumbSchema(crumbs)],
    body,
  });
};

/* ---------- Eventos ---------- */
const eventsPage = (ctx) => {
  const rel = '../';
  const crumbs = [{ name: 'Eventos', path: 'eventos/' }];
  const body = `
${pageHead({
  rel,
  crumbs,
  eyebrowText: 'Eventos',
  title: 'Equipamentos para casamentos, formaturas, 15 anos e eventos corporativos',
  lead: 'Mais de 1.500 eventos realizados em Belo Horizonte, Contagem, Betim e região metropolitana.',
})}

<section class="section section--tight" aria-label="Galeria de eventos">
  <div class="wrap gallery">
    ${events.gallery
      .map((g) => `<div class="gallery__item">${picture(g, { rel, ratio: '3/4', sizes: '(min-width: 760px) 33vw, 50vw', video: Boolean(g.video) })}${g.caption ? `<p class="gallery__caption">${esc(g.caption)}</p>` : ''}</div>`)
      .join('')}
  </div>
  <div class="wrap"><p class="section-foot">Mais registros no Instagram <a href="${site.instagram.url}" target="_blank" rel="noopener">${esc(site.instagram.handle)}</a></p></div>
</section>

<section class="section section--paper" aria-labelledby="tipos-title">
  <div class="wrap">
    <div class="section-head">
      ${eyebrow('Tipos de evento')}
      <h2 id="tipos-title" class="section-head__title">O que combina com o seu evento</h2>
    </div>
    <div class="event-types">
      ${events.types
        .map((t) => {
          const items = products.filter((p) => p.events.includes(t.slug));
          return `
      <article class="event-type" id="${t.slug}">
        <h3 class="event-type__name">${esc(t.name)}</h3>
        <p class="event-type__text">${esc(t.text)}</p>
        <ul class="event-type__products" aria-label="Equipamentos indicados">
          ${items.map((p) => `<li><a href="${rel}produtos/${p.slug}/">${esc(p.name)}</a></li>`).join('')}
        </ul>
      </article>`;
        })
        .join('')}
    </div>
  </div>
</section>
${finalCta()}
`;
  return ctx.layout({
    path: 'eventos/',
    title: 'Eventos — pista de LED para casamento, formatura e 15 anos em BH',
    description:
      'Pistas de LED, totens, túnel e cabine fotográfica para casamentos, formaturas, 15 anos, aniversários e eventos corporativos em BH e região. Mais de 1.500 eventos realizados.',
    active: 'eventos',
    schema: [breadcrumbSchema(crumbs)],
    body,
  });
};

/* ---------- Contato ---------- */
const contact = (ctx) => {
  const rel = '../';
  const crumbs = [{ name: 'Contato', path: 'contato/' }];
  const body = `
${pageHead({
  rel,
  crumbs,
  eyebrowText: 'Contato',
  title: 'Fale com a Lumini',
  lead: 'O orçamento é feito pelo WhatsApp. Se preferir, preencha os dados abaixo e a mensagem já vai pronta.',
})}
<section class="section section--tight">
  <div class="wrap contact">
    <form class="quote-form" data-quote-form data-placement="formulario_contato">
      <h2 class="quote-form__title">Monte sua mensagem</h2>
${quoteFields('q')}
      <button class="btn btn--gold btn--lg btn--block" type="submit">Enviar pelo WhatsApp</button>
      <p class="quote-form__note">Nenhum dado é armazenado no site: o formulário apenas prepara a mensagem no WhatsApp.</p>
    </form>

    <aside class="contact__info">
      <div class="contact__block">
        <h2 class="contact__label">WhatsApp</h2>
        <p class="contact__big">${waButton({ label: site.whatsapp.display, placement: 'contato_numero', cls: 'contact__link', direct: true })}</p>
      </div>
      <div class="contact__block">
        <h2 class="contact__label">Instagram</h2>
        <p class="contact__big"><a class="contact__link" href="${site.instagram.url}" target="_blank" rel="noopener">${esc(site.instagram.handle)}</a></p>
      </div>
      <div class="contact__block">
        <h2 class="contact__label">Região de atendimento</h2>
        <p>Base em ${esc(site.address.city)} — ${esc(site.address.state)}. Atendemos Belo Horizonte, Contagem, Betim e região metropolitana. Outras regiões sob consulta.</p>
        <p class="muted">Deslocamento incluso em Belo Horizonte, Contagem e Betim nos produtos em que isso é indicado. Para outras regiões, consulte as condições pelo WhatsApp.</p>
      </div>
      <div class="contact__block">
        <h2 class="contact__label">Empresa</h2>
        <p>${esc(site.legalName)}<br>CNPJ ${esc(site.cnpj)}</p>
      </div>
    </aside>
  </div>
</section>
`;
  return ctx.layout({
    path: 'contato/',
    title: 'Contato e orçamento pelo WhatsApp',
    description:
      'Solicite orçamento de pista de LED, Totem Pro, Totem de LED, Túnel de LED ou Cabine Vintage pelo WhatsApp (31) 9 7193-8537. Atendimento em BH, Contagem, Betim e região.',
    active: 'contato',
    schema: [businessSchema(), breadcrumbSchema(crumbs)],
    body,
  });
};

/* ---------- 404 ---------- */
const notFound = (ctx) =>
  ctx.layout({
    path: '404.html',
    rootRelative: true,
    title: 'Página não encontrada',
    description: 'A página que você procura não foi encontrada.',
    noindex: true,
    body: `
<section class="page-head page-head--center">
  <div class="wrap">
    ${eyebrow('Erro 404')}
    <h1 class="page-head__title">Esta página não foi encontrada.</h1>
    <p class="page-head__lead">O endereço pode ter mudado. Volte para o início ou fale com a gente pelo WhatsApp.</p>
    <div class="actions actions--center">
      <a class="btn btn--dark" href="/">Ir para o início</a>
      ${waButton({ placement: '404', cls: 'btn btn--text' })}
    </div>
  </div>
</section>`,
  });

module.exports = (ctx) => [
  { path: 'a-lumini/', html: about(ctx) },
  { path: 'parceiros/', html: partnersPage(ctx) },
  { path: 'eventos/', html: eventsPage(ctx) },
  { path: 'contato/', html: contact(ctx) },
  { path: '404.html', html: notFound(ctx), sitemap: false },
];
