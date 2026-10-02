#!/usr/bin/env node
/**
 * Gerador do site estático Lumini.
 *
 *   node build.js
 *
 * Lê os dados de src/data, monta as páginas de src/pages e grava HTML,
 * sitemap.xml e robots.txt em public/. A pasta public/ é o site final:
 * basta enviar o conteúdo dela para a hospedagem (public_html na HostGator).
 * Não há dependências externas — só Node.js (v16+).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const site = require('./src/data/site');
const { layout } = require('./src/lib/layout');
const { PUBLIC_DIR, pending } = require('./src/lib/html');

// Versão dos assets para cache-busting: hash do CSS + JS
const hash = crypto.createHash('md5');
['assets/css/style.css', 'assets/js/tracking.js', 'assets/js/main.js'].forEach((f) => hash.update(fs.readFileSync(path.join(PUBLIC_DIR, f))));
const version = hash.digest('hex').slice(0, 8);

const ctx = { layout: (o) => layout({ ...o, version }) };

const pages = [
  { path: '', html: require('./src/pages/home')(ctx), priority: '1.0' },
  ...require('./src/pages/products')(ctx),
  ...require('./src/pages/institutional')(ctx),
];

const today = new Date().toISOString().slice(0, 10);
for (const page of pages) {
  const file = page.path.endsWith('.html') ? path.join(PUBLIC_DIR, page.path) : path.join(PUBLIC_DIR, page.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page.html);
  console.log('  ✓', path.relative(PUBLIC_DIR, file));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.sitemap !== false)
  .map((p) => `  <url><loc>${site.url}/${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority || (p.path.split('/').length > 2 ? '0.8' : '0.7')}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
// Lista de fotos aguardando material real
const pendingList = [...pending.entries()].sort(([a], [b]) => a.localeCompare(b));
fs.writeFileSync(
  path.join(__dirname, 'docs', 'fotos-pendentes.md'),
  `# Fotos pendentes\n\nGerado por \`node build.js\`. Cada item é um espaço reservado no site.\nPara preencher: \`tools/otimizar-imagem.sh <foto-original> <caminho-base>\` (ex.: \`assets/img/home/hero\`) e rode o build.\n\n${
    pendingList.length ? pendingList.map(([f, alt]) => `- \`public/${f}\` — ${alt}`).join('\n') : 'Nenhuma — todas as fotos foram adicionadas.'
  }\n`
);
if (pendingList.length) console.log(`\n${pendingList.length} fotos pendentes (ver docs/fotos-pendentes.md)`);
console.log(`\n${pages.length} páginas geradas em public/ (assets v${version})`);
