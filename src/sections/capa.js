// Seção "Capa" (#capa): título partido em volta da foto, botão "Fazer minha compra"
// e a ficha rápida (pagamento, entrega e atacado).
// A segunda linha do título diz o mês de hoje ("SUA COMPRA / DE OUTUBRO"), trocando sozinha.
// Sem JavaScript fica "do mês", que vem no HTML.

import { produtos } from '../data/produtos.js'

// "Atacado: a partir de N unidades": o menor mínimo entre os produtos.
// Assim a ficha acompanha qualquer troca em src/data/produtos.js.
function menorMinimoDeAtacado() {
  return Math.min(...produtos.map((produto) => produto.minimoAtacado))
}

const nomeDoMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

// A linha não quebra (é uma palavra grande só): se o nome do mês for comprido
// ("de fevereiro") e não couber, a letra diminui só o necessário.
function caberNaLargura(linha) {
  linha.style.fontSize = ''
  const capa = getComputedStyle(linha.parentElement)
  const livre =
    (linha.parentElement.clientWidth - parseFloat(capa.paddingLeft) - parseFloat(capa.paddingRight)) * 0.96
  const texto = document.createRange()
  texto.selectNodeContents(linha)
  const largura = texto.getBoundingClientRect().width
  if (largura > livre) {
    const tamanho = parseFloat(getComputedStyle(linha).fontSize)
    linha.style.fontSize = `${Math.floor(tamanho * (livre / largura))}px`
  }
}

function tituloDoMes(hoje = new Date()) {
  const linha = document.querySelector('.capa__linha--baixo')
  if (!linha) return
  linha.textContent = `de ${nomeDoMes.format(hoje)}`
  const ajustar = () => caberNaLargura(linha)
  ajustar()
  document.fonts?.ready.then(ajustar) // a fonte do título pode chegar depois e ser mais larga
  window.addEventListener('resize', ajustar)
}

export function init() {
  const campo = document.querySelector('[data-atacado-minimo]')
  if (campo && produtos.length > 0) campo.textContent = menorMinimoDeAtacado()
  tituloDoMes()
}
