/**
 * Campos do pedido de orçamento (nome, equipamento, tipo de evento, data, local).
 * Usados no formulário da página Contato e no pop-up dos botões de orçamento.
 * O envio é tratado em assets/js/main.js ([data-quote-form]).
 */
const products = require('../data/products');
const events = require('../data/events');
const { esc } = require('./html');

const quoteFields = (id) => `
      <div class="field">
        <label for="${id}-nome">Nome completo</label>
        <input id="${id}-nome" name="nome" type="text" autocomplete="name" required maxlength="80" placeholder="Seu nome e sobrenome">
      </div>
      <div class="field">
        <label for="${id}-produto">Equipamento</label>
        <select id="${id}-produto" name="produto">
          <option value="" data-product="geral" data-name="Orçamento geral">Ainda não sei / mais de um</option>
          ${products
            .map((p) =>
              p.variations
                ? `<optgroup label="${esc(p.name)}"><option value="${esc(p.waName)}" data-product="${p.tracking}" data-name="${esc(p.name)}">${esc(p.name)} — qualquer modelo</option>${p.variations
                    .map((v) => `<option value="${esc(v.waName)}" data-product="${p.tracking}" data-variation="${v.tracking}" data-name="${esc(`${p.name} — ${v.name}`)}">${esc(v.name)}</option>`)
                    .join('')}</optgroup>`
                : `<option value="${esc(p.waName)}" data-product="${p.tracking}" data-name="${esc(p.name)}">${esc(p.name)}</option>`
            )
            .join('')}
        </select>
      </div>
      <div class="field">
        <label for="${id}-evento">Tipo de evento</label>
        <select id="${id}-evento" name="evento" required>
          <option value="">Selecione</option>
          ${events.types.map((t) => `<option>${esc(t.name)}</option>`).join('')}
        </select>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="${id}-data">Data do evento</label>
          <input id="${id}-data" name="data" type="date">
        </div>
        <div class="field">
          <label for="${id}-local">Local do evento</label>
          <input id="${id}-local" name="local" type="text" autocomplete="address-level2" placeholder="Espaço e cidade" required maxlength="120">
        </div>
      </div>`;

/** Pop-up de orçamento: abre ao clicar em qualquer botão de orçamento. */
const quoteModal = () => `
<dialog class="quote-modal" data-quote-modal aria-labelledby="quote-modal-title">
  <form class="quote-modal__form" data-quote-form data-placement="popup" method="dialog">
    <button class="quote-modal__close" type="button" data-quote-close aria-label="Fechar">×</button>
    <p class="eyebrow">Orçamento pelo WhatsApp</p>
    <h2 id="quote-modal-title" class="quote-modal__title">Conte sobre o seu evento</h2>
    <p class="quote-modal__lead">Preencha os dados e a mensagem já chega pronta no WhatsApp da Lumini.</p>
    ${quoteFields('m')}
    <button class="btn btn--gold btn--lg btn--block" type="submit">Enviar pelo WhatsApp</button>
  </form>
</dialog>`;

module.exports = { quoteFields, quoteModal };
