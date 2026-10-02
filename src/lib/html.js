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
 * JavaScript (assets/js/tracking.js) intercepta pelos atributos data-wa.
 */
const waButton = ({ label = 'Solicitar orçamento', product = 'geral', productName = 'Orçamento geral', variation = '', waName = '', message = '', placement = '', cls = 'btn btn--gold' } = {}) =>
  `<a class="${cls}" href="${esc(waHref(waName, message))}" target="_blank" rel="noopener" data-wa data-product="${esc(product)}" data-product-name="${esc(productName)}"${variation ? ` data-variation="${esc(variation)}"` : ''}${placement ? ` data-placement="${esc(placement)}"` : ''}>${esc(label)}</a>`;

/**
 * Imagem responsiva com espaço reservado.
 * Procura public/assets/img/<src>-1600.webp e <src>-800.webp.
 * Se não houver arquivo, renderiza um bloco identificado para substituição.
 */
const picture = (img, { rel = '', ratio = '4/5', sizes = '(min-width: 900px) 50vw, 100vw', eager = false, cls = '' } = {}) => {
  if (!img) return '';
  const base = `assets/img/${img.src}`;
  const big = `${base}-1600.webp`;
  const small = `${base}-800.webp`;
  const style = `style="aspect-ratio:${ratio}"`;
  if (exists(big) || exists(small)) {
    const srcset = join([exists(small) && `${rel}${small} 800w`, exists(big) && `${rel}${big} 1600w`], ', ');
    const src = exists(small) ? small : big;
    const [w, h] = ratio.split('/').map(Number);
    return `<figure class="media ${cls}" ${style}><img src="${rel}${src}" srcset="${srcset}" sizes="${sizes}" alt="${esc(img.alt)}" width="${w * 400}" height="${h * 400}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></figure>`;
  }
  pending.set(big, img.alt);
  return `<figure class="media media--pending ${cls}" ${style} role="img" aria-label="${esc(img.alt)}"><figcaption class="media__note"><span>Foto real pendente</span>${esc(img.alt)}<code>${esc(big)}</code></figcaption></figure>`;
};

module.exports = { pending, esc, exists, join, waHref, waMessage, waButton, picture, PUBLIC_DIR };
