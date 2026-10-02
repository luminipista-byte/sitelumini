# Site institucional — Lumini Pista de LED

Site estático (HTML, CSS e JavaScript puro) de **luminipista.com.br**, pronto para
hospedagem tradicional (HostGator). Não precisa de Node.js, banco de dados nem
backend no servidor.

> A landing page de mídia paga (lumini-pista.vercel.app) é um projeto separado e
> não é afetada por este repositório.

## Publicar

Envie **o conteúdo da pasta `public/`** para `public_html/` na HostGator
(Gerenciador de Arquivos ou FTP), incluindo o arquivo oculto `.htaccess`.

O `.htaccess` força HTTPS, redireciona `www` para o domínio sem www, define a
página 404, a compressão e o cache.

## Estrutura

```
public/                  ← site final (é isto que vai para a hospedagem)
  index.html, a-lumini/, produtos/…, parceiros/, eventos/, contato/, 404.html
  sitemap.xml, robots.txt, .htaccess
  assets/css/style.css   ← estilos (tokens de cor e tipografia no topo)
  assets/js/tracking.js  ← tracking centralizado (Meta Lead + Google Ads)
  assets/js/main.js      ← menu, header, CTA fixo no mobile, formulário
  assets/img/            ← imagens (parceiros, produtos, eventos, marca)

src/                     ← fonte das páginas (usado só para gerar o HTML)
  data/site.js           ← dados da empresa, WhatsApp, números e IDs de tracking
  data/products.js       ← produtos e variações
  data/partners.js       ← Casas Parceiras
  data/events.js         ← tipos de evento e galeria
  lib/                   ← layout, componentes e utilitários de HTML
  pages/                 ← templates das páginas

build.js                 ← gera o HTML de public/ a partir de src/
tools/otimizar-imagem.sh ← converte fotos para WebP nos tamanhos do site
docs/fotos-pendentes.md  ← lista de fotos que ainda faltam (gerada pelo build)
```

## Editar conteúdo

Textos, produtos, parceiros e contatos ficam em `src/data/`. Depois de editar:

```bash
node build.js
```

O build regenera todas as páginas, o sitemap e a lista de fotos pendentes.
Só é necessário Node.js no computador de quem edita, não na hospedagem.

- **Novo produto:** copie um bloco em `src/data/products.js`. Página, menu do
  rodapé, sitemap, mensagem de WhatsApp e tracking são criados automaticamente.
- **Novo parceiro:** salve o logo quadrado em `public/assets/img/parceiros/` e
  adicione `{ name, logo }` em `src/data/partners.js`.

## Fotos

Cada imagem do site tem um espaço reservado com nome fixo. Enquanto o arquivo
não existe, aparece um bloco azul identificado como **"Foto real pendente"**,
com o caminho esperado. Para preencher:

```bash
tools/otimizar-imagem.sh foto-original.jpg assets/img/produtos/pista-de-led/infinity
node build.js
```

O script gera `-800.webp` e `-1600.webp`; o build passa a usar a foto com
`srcset` e lazy loading. A lista completa está em `docs/fotos-pendentes.md`.

Para enquadrar melhor um equipamento cortado, acrescente `pos` à imagem em
`src/data` (ex.: `pos: '50% 70%'`, aplicado como `object-position`).

**Logo oficial:** `assets/img/marca/logo-lumini.png` (negativo, para fundo
escuro — usado no header e no rodapé) e `logo-lumini-escuro.png` (original,
para fundo claro), configurados em `site.logo` (`src/data/site.js`). Favicon:
`favicon.ico` na raiz, `assets/img/marca/favicon-48.png` e
`apple-touch-icon.png`. Compartilhamento: `assets/img/marca/og-lumini.jpg`
(1200×630).

## Vídeos

Ficam em `public/assets/video/` (`<nome>.mp4` H.264 + `<nome>.webm` VP9, sem
áudio, trecho de ~10 s, até ~5 MB cada; nunca acima de 10 MB). São usados só
no topo da home e de páginas de produto, pelos campos `video` (e
`videoMobile`, versão vertical para celular) da imagem em `src/data` ou
`src/pages/home.js`. A foto continua sendo o conteúdo principal (LCP): o
`main.js` só começa a baixar o vídeo depois do carregamento da página e não
o carrega com "reduzir movimento" ou economia de dados ativos.

Gerar um trecho:

```bash
ffmpeg -ss 2 -t 10 -i original.mov -an -vf "scale=720:-2,fps=30,format=yuv420p" \
  -c:v libx264 -crf 25 -preset slow -movflags +faststart public/assets/video/nome.mp4
ffmpeg -ss 2 -t 10 -i original.mov -an -vf "scale=720:-2,fps=30,format=yuv420p" \
  -c:v libvpx-vp9 -b:v 0 -crf 37 public/assets/video/nome.webm
```

## Tracking

IDs em `src/data/site.js` → `tracking`.

| Ferramenta | ID | Evento |
| --- | --- | --- |
| Meta Pixel | `2143955416549744` | `PageView` em todas as páginas; **`Lead`** em todo CTA de WhatsApp |
| Google Ads | `AW-11218835567` | Conversão "Solicitar cotação" `AW-11218835567/PY6MCN3Kj40dEO-wx-Up` em todo CTA de WhatsApp |

Todos os botões de orçamento são gerados por `waButton()` (`src/lib/html.js`)
com atributos `data-wa`, `data-product`, `data-variation` e `data-placement`.
Um único listener em `assets/js/tracking.js` chama
`trackWhatsAppConversion()`, que:

1. dispara `fbq('track', 'Lead', { content_name, product, variation, placement, utm_* … })`;
2. dispara a conversão do Google Ads com `transaction_id` único;
3. ignora cliques repetidos no mesmo produto em 5 s (sem Lead duplicado);
4. abre o WhatsApp — no desktop em nova aba (imediato); no mobile após o
   callback do Google Ads (máx. 1 s), para o evento ser enviado antes de sair.

Sem JavaScript, os links continuam abrindo o WhatsApp normalmente.

**UTMs e IDs de clique** (`utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`) nunca são
removidos da URL; são guardados na sessão e enviados junto com o Lead.

### Futuros trackings

Em `src/data/site.js`, seção **FUTUROS TRACKINGS — LUMINI**:

- `ga4MeasurementId` (G-…) — passa a carregar o GA4 e enviar `generate_lead`;
- `gtmContainerId` (GTM-…) — instala o GTM e envia `whatsapp_lead` ao dataLayer;
- `searchConsoleVerification` — meta tag de verificação do Search Console.

Preencha somente com IDs reais e rode `node build.js`. Outros pixels: adicionar
em `sendFuture()` em `assets/js/tracking.js`.

## Depois de publicar

1. Google Search Console: adicionar a propriedade `luminipista.com.br`,
   verificar e enviar `https://luminipista.com.br/sitemap.xml`.
2. Google Business Profile: criar o perfil com base em Contagem e área de
   atendimento BH / região metropolitana (ajuda muito no SEO local).
3. Conferir os eventos no Gerenciador de Eventos da Meta e no Google Ads
   (Tag Assistant) com um clique de teste.
