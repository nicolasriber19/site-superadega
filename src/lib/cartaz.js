// Preço em "cartaz de oferta", como as plaquinhas do mercado: "R$" pequeno,
// os reais bem grandes e os centavos pequenos no alto ("25" e ",90").
// O leitor de tela ouve o preço inteiro ("Preço: R$ 25,90 cada"); as partes são só visuais.

import { emReais } from './dinheiro.js'

const formatoInteiro = new Intl.NumberFormat('pt-BR')

export function cartazDePreco(valor) {
  const centavosTotais = Math.round(valor * 100)
  const reais = formatoInteiro.format(Math.floor(centavosTotais / 100))
  const centavos = String(centavosTotais % 100).padStart(2, '0')

  // Preço de 3 dígitos ou mais ganha número menor, para caber no card do celular
  const longo = reais.replace(/\D/g, '').length >= 3 ? ' cartaz--longo' : ''

  return `
    <p class="cartaz${longo}">
      <span class="visualmente-oculto">Preço: ${emReais(valor)} cada</span>
      <span class="cartaz__placa" aria-hidden="true">
        <span class="cartaz__moeda">R$</span>
        <span class="cartaz__reais">${reais}</span>
        <span class="cartaz__centavos">,${centavos}</span>
      </span>
      <span class="cartaz__cada" aria-hidden="true">cada</span>
    </p>
  `
}
