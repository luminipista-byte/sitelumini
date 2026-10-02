/**
 * Lumini — tracking centralizado de conversões
 * ------------------------------------------------------------------
 * Todo CTA de orçamento/WhatsApp passa por trackWhatsAppConversion().
 * Os IDs vêm de window.LUMINI (gerado a partir de src/data/site.js).
 *
 * Conversão única:
 *   Meta        → fbq('track', 'Lead', {...})
 *   Google Ads  → conversão "Solicitar cotação" (AW-11218835567/PY6MCN3Kj40dEO-wx-Up)
 *
 * Marcação nos botões (gerada pelo build, não editar à mão):
 *   <a href="https://wa.me/..." data-wa data-product="pista_de_led"
 *      data-product-name="Pista de LED" data-variation="infinity"
 *      data-placement="hero">
 *
 * Sem JavaScript o link continua abrindo o WhatsApp normalmente.
 */
(function () {
  'use strict';

  var C = window.LUMINI || {};
  var DEDUPE_MS = 5000; // mesmo produto clicado de novo dentro deste intervalo não gera novo Lead
  var NAV_TIMEOUT_MS = 1000; // espera máxima pelo Google Ads antes de sair da página (mobile)
  var ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid'];
  var ATTR_STORE = 'lumini_attribution';

  /* ---------------- Atribuição: UTMs e IDs de clique ----------------
   * Os parâmetros nunca são removidos da URL. Guardamos os da entrada na
   * sessão para enviá-los junto com o Lead mesmo após navegar entre páginas.
   * O gclid também é tratado automaticamente pelo gtag (conversion linker). */
  function storage() {
    try {
      return window.sessionStorage;
    } catch (e) {
      return null;
    }
  }

  function captureAttribution() {
    var found = {};
    var has = false;
    try {
      var params = new URLSearchParams(window.location.search);
      ATTR_KEYS.forEach(function (k) {
        var v = params.get(k);
        if (v) {
          found[k] = v.slice(0, 200);
          has = true;
        }
      });
    } catch (e) {}
    var s = storage();
    if (has) {
      found.landing_page = window.location.pathname;
      try {
        s && s.setItem(ATTR_STORE, JSON.stringify(found));
      } catch (e) {}
      return found;
    }
    try {
      return (s && JSON.parse(s.getItem(ATTR_STORE))) || {};
    } catch (e) {
      return {};
    }
  }

  var attribution = captureAttribution();

  /* ---------------- Utilitários ---------------- */
  function isMobile() {
    var ua = navigator.userAgent || '';
    return /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));
  }

  function eventId() {
    return 'lead_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function waUrl(message) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(message || '');
  }

  function assign(target, source) {
    for (var k in source) if (Object.prototype.hasOwnProperty.call(source, k) && source[k]) target[k] = source[k];
    return target;
  }

  /* ---------------- Disparos ---------------- */
  function sendMeta(d) {
    if (typeof window.fbq !== 'function') return;
    // Evento de conversão Meta: sempre "Lead"
    window.fbq(
      'track',
      'Lead',
      assign(
        {
          content_name: d.productName,
          content_category: 'orcamento_whatsapp',
          product: d.product,
          variation: d.variation,
          placement: d.placement,
          page_path: window.location.pathname,
        },
        d.attribution
      ),
      { eventID: d.eventId }
    );
  }

  function sendGoogleAds(d, done) {
    if (typeof window.gtag !== 'function' || !C.googleAds) return done();
    // Conversão Google Ads "Solicitar cotação"
    window.gtag('event', 'conversion', {
      send_to: C.googleAds.sendTo,
      event_callback: done,
      event_timeout: NAV_TIMEOUT_MS,
      transaction_id: d.eventId,
    });
  }

  // ============================================
  // FUTUROS TRACKINGS — LUMINI (adaptadores)
  // ============================================
  // Só disparam quando o ID correspondente for preenchido em src/data/site.js.
  function sendFuture(d) {
    // Google Analytics 4 — Measurement ID em site.js > tracking.ga4MeasurementId
    if (C.ga4 && typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        send_to: C.ga4,
        product: d.product,
        variation: d.variation,
        placement: d.placement,
        method: 'whatsapp',
      });
    }

    // Google Tag Manager — Container ID em site.js > tracking.gtmContainerId
    // No GTM, crie um acionador de "Evento personalizado" = whatsapp_lead.
    if (C.gtm) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(
        assign({ event: 'whatsapp_lead', lead_id: d.eventId, product: d.product, product_name: d.productName, variation: d.variation, placement: d.placement }, d.attribution)
      );
    }

    // Outros pixels / ferramentas
    // Adicionar aqui, usando os mesmos dados (d.product, d.variation, d.eventId...).
  }

  /* ---------------- Função central ---------------- */
  var lastLead = { key: '', at: 0 };

  /**
   * Dispara Meta Lead + Google Ads "Solicitar cotação" e abre o WhatsApp.
   * @param {object} opts
   * @param {string} opts.product      identificador do produto (ex.: 'pista_de_led')
   * @param {string} [opts.productName] nome legível (ex.: 'Pista de LED')
   * @param {string} [opts.variation]  variação (ex.: 'infinity')
   * @param {string} [opts.placement]  onde o botão está (ex.: 'hero')
   * @param {string} [opts.url]        link do WhatsApp; se ausente, monta com opts.message
   * @param {string} [opts.message]    mensagem do WhatsApp
   * @param {boolean} [opts.trackOnly] só registra (o navegador cuida da abertura)
   */
  function trackWhatsAppConversion(opts) {
    opts = opts || {};
    var url = opts.url || waUrl(opts.message);
    var d = {
      product: opts.product || 'geral',
      productName: opts.productName || opts.product || 'Orçamento geral',
      variation: opts.variation || '',
      placement: opts.placement || '',
      eventId: eventId(),
      attribution: attribution,
    };

    // Evita Leads duplicados (duplo toque, cliques repetidos no mesmo produto)
    var key = d.product + '|' + d.variation;
    var now = Date.now();
    var duplicate = key === lastLead.key && now - lastLead.at < DEDUPE_MS;
    lastLead = { key: key, at: now };

    var mobile = isMobile();
    var opened = !!opts.trackOnly;
    var navigated = false;

    // Desktop: abre a aba do WhatsApp ainda dentro do clique (sem bloqueio de pop-up);
    // a página do site continua aberta e termina de enviar os eventos.
    if (!mobile && !opened) {
      var w = window.open(url, '_blank');
      if (w) {
        try {
          w.opener = null;
        } catch (e) {}
        opened = true;
      }
    }

    function go() {
      if (opened || navigated) return;
      navigated = true;
      window.location.href = url;
    }

    if (duplicate) {
      go();
      return false;
    }

    try {
      sendMeta(d);
    } catch (e) {}
    try {
      sendFuture(d);
    } catch (e) {}

    // Mobile: espera a confirmação do Google Ads (ou o tempo limite) antes de sair
    try {
      sendGoogleAds(d, go);
    } catch (e) {
      go();
    }
    setTimeout(go, NAV_TIMEOUT_MS + 200);
    return true;
  }

  window.trackWhatsAppConversion = trackWhatsAppConversion;
  window.luminiWaUrl = waUrl;

  /* ---------------- Delegação de cliques nos CTAs ---------------- */
  function onCtaClick(e) {
    if (e.type === 'auxclick' && e.button !== 1) return;
    var a = e.target.closest && e.target.closest('a[data-wa]');
    if (!a) return;
    // Ctrl/Cmd/Shift-clique ou botão do meio: deixa o navegador agir, mas registra o Lead
    var modified = e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1;
    if (!modified) e.preventDefault();
    var payload = {
      product: a.getAttribute('data-product'),
      productName: a.getAttribute('data-product-name'),
      variation: a.getAttribute('data-variation') || '',
      placement: a.getAttribute('data-placement') || '',
      url: a.href,
    };
    payload.trackOnly = modified;
    trackWhatsAppConversion(payload);
  }
  document.addEventListener('click', onCtaClick);
  document.addEventListener('auxclick', onCtaClick); // botão do meio
})();
