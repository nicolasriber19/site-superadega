// Seção "Capa" (#capa): título partido em volta da foto, botão "Fazer minha compra"
// e a ficha rápida (pagamento, entrega e atacado).

import { produtos } from '../data/produtos.js'

// "Atacado: a partir de N unidades": o menor mínimo entre os produtos.
// Assim a ficha acompanha qualquer troca em src/data/produtos.js.
function menorMinimoDeAtacado() {
  return Math.min(...produtos.map((produto) => produto.minimoAtacado))
}

export function init() {
  const campo = document.querySelector('[data-atacado-minimo]')
  if (campo && produtos.length > 0) campo.textContent = menorMinimoDeAtacado()
}
