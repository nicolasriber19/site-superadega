// Seção "Topo" (#topo): marca e botões "Ajuda" e "Lista".
// O número da lista é atualizado por finalizar.js.

import { ligarBotoesDeAjuda } from '../lib/ajuda.js'

export function init() {
  ligarBotoesDeAjuda(document.querySelector('#topo'))
}
