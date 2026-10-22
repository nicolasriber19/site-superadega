// Seção "Rodapé" (#rodape): botão "Falar no WhatsApp" e link "Privacidade".

import { ligarBotoesDeAjuda } from '../lib/ajuda.js'

export function init() {
  ligarBotoesDeAjuda(document.querySelector('#rodape'))
}
