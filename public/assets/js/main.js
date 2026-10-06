/**
 * Lumini — interações da interface (menu, header, CTA fixo, formulário).
 * Sem dependências. O conteúdo funciona sem este arquivo.
 */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  /* Menu mobile */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Fechar menu' : 'Abrir menu';
    doc.classList.toggle('menu-open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function (m) {
      if (m.matches) setMenu(false);
    });
  }

  /* Header sólido após rolar; CTA fixo no mobile após a primeira dobra */
  var header = document.querySelector('[data-header]');
  var sticky = document.querySelector('[data-sticky-cta]');
  var finalCta = document.querySelector('.final-cta');
  var footer = document.querySelector('.site-footer');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (sticky) {
      var limit = (finalCta || footer);
      var nearEnd = limit && limit.getBoundingClientRect().top < window.innerHeight;
      sticky.classList.toggle('is-visible', y > window.innerHeight * 0.6 && !nearEnd);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* Revelação discreta ao rolar (desligada com prefers-reduced-motion) */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.section-head, .feature, .product-card, .steps__item, .variation__grid, .catalog__item, .chapter, .event-type, .gallery__item');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) {
      if (t.getBoundingClientRect().top > window.innerHeight) {
        t.classList.add('reveal');
        io.observe(t);
      }
    });
  }

  /*
   * Vídeos decorativos (sem som, em loop): tocam automaticamente no
   * computador e no celular. Começam a baixar quando chegam perto da tela e
   * pausam fora dela. MP4 (H.264) vem primeiro: é o formato que todo celular
   * reproduz bem — o WebM fica só como alternativa.
   */
  var videos = document.querySelectorAll('video[data-video]');
  if (videos.length) {
    var narrow = window.matchMedia('(max-width: 760px) and (orientation: portrait)').matches;
    var visible = new Set();
    var play = function (v) {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    };
    var loadVideo = function (v) {
      if (v.getAttribute('data-loaded')) return;
      v.setAttribute('data-loaded', '1');
      v.muted = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.preload = 'auto';
      var base = (narrow && v.getAttribute('data-video-mobile')) || v.getAttribute('data-video');
      [['mp4', 'video/mp4'], ['webm', 'video/webm']].forEach(function (f) {
        var s = document.createElement('source');
        s.src = base + '.' + f[0];
        s.type = f[1];
        v.appendChild(s);
      });
      v.addEventListener('playing', function () {
        v.classList.add('is-playing');
      });
      // tenta de novo assim que houver dados suficientes (celular)
      ['loadeddata', 'canplay'].forEach(function (ev) {
        v.addEventListener(ev, function () {
          if (visible.has(v) && v.paused) play(v);
        });
      });
      v.load();
    };
    var resumeVisible = function () {
      visible.forEach(function (v) {
        if (v.paused) play(v);
      });
    };
    // Modo de pouca bateria (iPhone) bloqueia o autoplay até o 1º toque
    ['touchstart', 'pointerdown', 'scroll'].forEach(function (ev) {
      window.addEventListener(ev, resumeVisible, { passive: true });
    });
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) resumeVisible();
    });
    var startVideos = function () {
      if (startVideos.done) return;
      startVideos.done = true;
      if (!('IntersectionObserver' in window)) {
        videos.forEach(function (v) { visible.add(v); loadVideo(v); play(v); });
        return;
      }
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target;
          if (en.isIntersecting) {
            visible.add(v);
            loadVideo(v);
            play(v);
          } else {
            visible.delete(v);
            if (v.getAttribute('data-loaded')) v.pause();
          }
        });
      }, { rootMargin: '300px 0px' });
      videos.forEach(function (v) { vio.observe(v); });
    };
    if (document.readyState === 'complete') startVideos();
    else {
      window.addEventListener('load', startVideos, { once: true });
      setTimeout(startVideos, 2500); // não espera indefinidamente pelo load no celular
    }
  }

  /*
   * Pedido de orçamento (formulário da página Contato e pop-up dos botões):
   * monta a mensagem com equipamento, tipo de evento, data e local e envia
   * pelo trackWhatsAppConversion (Meta Lead + Google Ads "Solicitar cotação").
   */
  function buildMessage(form) {
    var sel = form.elements.produto;
    var waName = sel.value;
    var nome = form.elements.nome ? form.elements.nome.value.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
    var intro = nome ? 'Olá! Meu nome é ' + nome + '. Vim do site e' : 'Olá! Vim do site e';
    var lines = [
      waName
        ? intro + ' gostaria de solicitar um orçamento ' + waName + ' para meu evento.'
        : intro + ' gostaria de solicitar um orçamento para meu evento.',
    ];
    var evento = form.elements.evento.value;
    var data = form.elements.data.value;
    var local = form.elements.local.value.trim();
    if (evento) lines.push('Tipo de evento: ' + evento);
    if (data) lines.push('Data: ' + data.split('-').reverse().join('/'));
    if (local) lines.push('Local: ' + local.slice(0, 120));
    return lines.join('\n');
  }

  document.querySelectorAll('[data-quote-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.reportValidity && !form.reportValidity()) return;
      var opt = form.elements.produto.options[form.elements.produto.selectedIndex];
      var placement = form.getAttribute('data-placement') || 'formulario';
      if (form.hasAttribute('data-origin')) placement += '_' + form.getAttribute('data-origin');
      var message = buildMessage(form);
      if (typeof window.trackWhatsAppConversion === 'function') {
        window.trackWhatsAppConversion({
          product: opt.getAttribute('data-product') || 'geral',
          productName: opt.getAttribute('data-name') || 'Orçamento geral',
          variation: opt.getAttribute('data-variation') || '',
          placement: placement,
          message: message,
        });
      } else {
        window.location.href = 'https://wa.me/' + (window.LUMINI || {}).whatsapp + '?text=' + encodeURIComponent(message);
      }
      var dlg = form.closest('dialog');
      if (dlg && dlg.open) dlg.close();
    });
  });

  /* Pop-up de orçamento */
  var modal = document.querySelector('[data-quote-modal]');
  if (modal && typeof modal.showModal === 'function') {
    var mform = modal.querySelector('form');
    var msel = mform.elements.produto;
    window.luminiOpenQuote = function (o) {
      o = o || {};
      // pré-seleciona o equipamento do botão clicado (e o modelo, se houver)
      var idx = 0;
      for (var i = 0; i < msel.options.length; i++) {
        var op = msel.options[i];
        if (op.getAttribute('data-product') !== (o.product || 'geral')) continue;
        if ((op.getAttribute('data-variation') || '') === (o.variation || '')) { idx = i; break; }
        if (!idx) idx = i;
      }
      msel.selectedIndex = idx;
      if (o.placement) mform.setAttribute('data-origin', o.placement);
      else mform.removeAttribute('data-origin');
      doc.classList.add('modal-open');
      modal.showModal();
      var first = mform.elements.nome;
      if (first && !('ontouchstart' in window)) first.focus();
      return true;
    };
    modal.addEventListener('close', function () {
      doc.classList.remove('modal-open');
    });
    modal.querySelector('[data-quote-close]').addEventListener('click', function () {
      modal.close();
    });
    // clique fora do formulário fecha
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.close();
    });
  }
})();
