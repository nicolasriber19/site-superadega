// Seção "Em números" (#numeros): números grandes tirados dos dados do site.
// Nada é escrito à mão: se um preço, os dias ou os horários mudarem, os números mudam juntos.

import { produtos } from '../data/produtos.js'
import { DIAS_DE_ENTREGA, faixasDeHorario } from '../data/config.js'

// Maior desconto do atacado entre os produtos, em %, arredondado para baixo
// (assim o "até" nunca promete mais do que existe).
function maiorDesconto() {
  const descontos = produtos.map((p) => ((p.preco - p.precoAtacado) / p.preco) * 100)
  return Math.floor(Math.max(...descontos))
}

// "manhã, tarde ou noite"
function nomesDosHorarios() {
  const nomes = faixasDeHorario.map((f) => f.nome.toLowerCase())
  // (nomes[nomes.length - 1] em vez de nomes.at(-1): o .at() falha no Safari antes do iOS 15.4)
  return nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} ou ${nomes[nomes.length - 1]}` : nomes.join('')
}

function escrever(chave, texto) {
  const campo = document.querySelector(`[data-numero="${chave}"]`)
  if (campo) campo.textContent = texto
}

export function init() {
  if (produtos.length > 0) escrever('desconto', `até ${maiorDesconto()}%`)
  escrever('dias', `${DIAS_DE_ENTREGA} dias`)
  escrever('horarios', `${faixasDeHorario.length} horários`)
  escrever('nomes-horarios', nomesDosHorarios())
}
