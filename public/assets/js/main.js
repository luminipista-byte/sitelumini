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

  /* Formulário de contato → mensagem pronta no WhatsApp */
  var form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var sel = form.elements.produto;
      var opt = sel.options[sel.selectedIndex];
      var waName = sel.value;
      var lines = [
        waName
          ? 'Olá! Vim do site e gostaria de solicitar um orçamento ' + waName + ' para meu evento.'
          : 'Olá! Vim do site e gostaria de solicitar um orçamento para meu evento.',
      ];
      var evento = form.elements.evento.value;
      var data = form.elements.data.value;
      var cidade = form.elements.cidade.value.trim();
      if (evento) lines.push('Tipo de evento: ' + evento);
      if (data) lines.push('Data: ' + data.split('-').reverse().join('/'));
      if (cidade) lines.push('Cidade: ' + cidade.slice(0, 80));
      var message = lines.join('\n');
      if (typeof window.trackWhatsAppConversion === 'function') {
        window.trackWhatsAppConversion({
          product: opt.getAttribute('data-product') || 'geral',
          productName: opt.getAttribute('data-name') || 'Orçamento geral',
          variation: opt.getAttribute('data-variation') || '',
          placement: 'formulario_contato',
          message: message,
        });
      } else {
        window.location.href = 'https://wa.me/' + (window.LUMINI || {}).whatsapp + '?text=' + encodeURIComponent(message);
      }
    });
  }
})();
