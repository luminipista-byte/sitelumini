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
   * Vídeos decorativos (hero): só começam a baixar depois do load da página e
   * nunca com prefers-reduced-motion ou economia de dados. Sem isso, fica a foto.
   */
  var videos = document.querySelectorAll('video[data-video]');
  var conn = navigator.connection || {};
  if (videos.length && !reduce && !conn.saveData) {
    var startVideos = function () {
      var narrow = window.matchMedia('(max-width: 760px) and (orientation: portrait)').matches;
      videos.forEach(function (v) {
        var base = (narrow && v.getAttribute('data-video-mobile')) || v.getAttribute('data-video');
        [['webm', 'video/webm'], ['mp4', 'video/mp4']].forEach(function (f) {
          var s = document.createElement('source');
          s.src = base + '.' + f[0];
          s.type = f[1];
          v.appendChild(s);
        });
        v.addEventListener('playing', function () {
          v.classList.add('is-playing');
        }, { once: true });
        v.load();
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
    };
    if (document.readyState === 'complete') startVideos();
    else window.addEventListener('load', startVideos, { once: true });
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
