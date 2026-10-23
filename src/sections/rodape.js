// Seção "Rodapé" (#rodape): ação principal no fim da página, "Falar no WhatsApp",
// "Privacidade" e "Voltar ao topo" (docs/ux.md, seções 4 e 5).

import { ligarBotoesDeAjuda } from '../lib/ajuda.js'
import { aoMudarLista, totalDeUnidades } from '../lib/lista.js'

// Lista vazia: "Fazer minha compra" leva aos produtos.
// Com itens: "Ver minha lista" leva ao Finalizar.
function atualizarAcaoPrincipal(link, texto) {
  const temItens = totalDeUnidades() > 0
  link.href = temItens ? '#finalizar' : '#produtos'
  texto.textContent = temItens ? 'Ver minha lista' : 'Fazer minha compra'
}

export function init() {
  const rodape = document.querySelector('#rodape')
  ligarBotoesDeAjuda(rodape)

  const link = rodape.querySelector('[data-rodape-compra]')
  const texto = rodape.querySelector('[data-rodape-compra-texto]')
  aoMudarLista(() => atualizarAcaoPrincipal(link, texto))
  atualizarAcaoPrincipal(link, texto)
}
