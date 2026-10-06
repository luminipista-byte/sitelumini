/**
 * Utilitários de template — HTML gerado com template literals, sem dependências.
 */
const fs = require('fs');
const path = require('path');
const site = require('../data/site');

const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public');

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Fotos que ainda aguardam material real (listadas pelo build). */
const pending = new Map();

const exists = (rel) => fs.existsSync(path.join(PUBLIC_DIR, rel));

/** Junta trechos ignorando valores vazios. */
const join = (arr, sep = '') => arr.filter(Boolean).join(sep);

/** Link de WhatsApp com a mensagem de orçamento (funciona sem JavaScript). */
const waMessage = (waName) =>
  waName
    ? `Olá! Vim do site e gostaria de solicitar um orçamento ${waName} para meu evento.`
    : site.whatsapp.defaultMessage;

const waHref = (waName, message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message || waMessage(waName))}`;

/**
 * Botão/link de orçamento. Todo CTA de conversão passa por aqui — o
 * JavaScript intercepta pelos atributos data-wa: abre o pop-up de orçamento
 * (Lead só no envio). Com `direct` (parceria, número de contato) vai direto
 * ao WhatsApp e registra o Lead no clique. Sem JavaScript, o link funciona.
 */
const waButton = ({ label = 'Solicitar orçamento', product = 'geral', productName = 'Orçamento geral', variation = '', waName = '', message = '', placement = '', cls = 'btn btn--gold', direct = product === 'parceria' } = {}) =>
  `<a class="${cls}" href="${esc(waHref(waName, message))}" target="_blank" rel="noopener" data-wa data-product="${esc(product)}" data-product-name="${esc(productName)}"${variation ? ` data-variation="${esc(variation)}"` : ''}${placement ? ` data-placement="${esc(placement)}"` : ''}${direct ? ' data-direct' : ''}>${esc(label)}</a>`;

/**
 * Vídeo decorativo sobre a foto (opcional). A foto continua sendo o LCP e o
 * conteúdo sem JavaScript; o vídeo só é carregado por assets/js/main.js após o
 * load da página, e nunca com prefers-reduced-motion ou economia de dados.
 * `video`: nome-base em public/assets/video/ (gera <base>.mp4 e <base>.webm);
 * `videoMobile`: versão vertical opcional para telas estreitas em retrato.
 */
const videoLayer = (img, rel, poster) => {
  if (!img.video || !exists(`assets/video/${img.video}.mp4`)) return '';
  const mobile = img.videoMobile && exists(`assets/video/${img.videoMobile}.mp4`) ? ` data-video-mobile="${rel}assets/video/${img.videoMobile}"` : '';
  return `<video class="media__video" muted autoplay loop playsinline preload="none" poster="${rel}${poster}" aria-hidden="true" tabindex="-1" data-video="${rel}assets/video/${img.video}"${mobile}></video>`;
};

/**
 * Imagem responsiva com espaço reservado.
 * Procura public/assets/img/<src>-1600.webp e <src>-800.webp.
 * Se não houver arquivo, renderiza um bloco identificado para substituição.
 * `pos` (opcional): object-position para enquadrar o equipamento nos recortes.
 * Opção `video: true`: inclui o vídeo do item (só no topo das páginas).
 */
const picture = (img, { rel = '', ratio = '4/5', sizes = '(min-width: 900px) 50vw, 100vw', eager = false, cls = '', video = false } = {}) => {
  if (!img) return '';
  const base = `assets/img/${img.src}`;
  const big = `${base}-1600.webp`;
  const small = `${base}-800.webp`;
  const style = `style="aspect-ratio:${ratio}"`;
  if (exists(big) || exists(small)) {
    const srcset = join([exists(small) && `${rel}${small} 800w`, exists(big) && `${rel}${big} 1600w`], ', ');
    const src = exists(small) ? small : big;
    const [w, h] = ratio.split('/').map(Number);
    return `<figure class="media ${cls}" ${style}><img src="${rel}${src}" srcset="${srcset}" sizes="${sizes}" alt="${esc(img.alt)}" width="${w * 400}" height="${h * 400}"${img.pos ? ` style="object-position:${img.pos}"` : ''}${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">${video ? videoLayer(img, rel, src) : ''}</figure>`;
  }
  pending.set(big, img.alt);
  return `<figure class="media media--pending ${cls}" ${style} role="img" aria-label="${esc(img.alt)}"><figcaption class="media__note"><span>Foto real pendente</span>${esc(img.alt)}<code>${esc(big)}</code></figcaption></figure>`;
};

module.exports = { pending, esc, exists, join, waHref, waMessage, waButton, picture, PUBLIC_DIR };
