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

// As linhas não quebram (são palavras grandes): se o mês for comprido ("de novembro")
// e não couber, a letra diminui só o necessário. As duas linhas ficam com a mesma
// letra (a menor que couber), para o título continuar parecendo um bloco só.
function caberNaLargura(linhas) {
  linhas.forEach((linha) => (linha.style.fontSize = ''))
  const capa = linhas[0].parentElement
  const estilo = getComputedStyle(capa)
  const livre = (capa.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight)) * 0.96
  let menor = Infinity
  let apertou = false
  for (const linha of linhas) {
    const texto = document.createRange()
    texto.selectNodeContents(linha)
    const largura = texto.getBoundingClientRect().width
    const tamanho = parseFloat(getComputedStyle(linha).fontSize)
    if (largura > livre) apertou = true
    menor = Math.min(menor, largura > livre ? Math.floor(tamanho * (livre / largura)) : tamanho)
  }
  if (apertou) linhas.forEach((linha) => (linha.style.fontSize = `${menor}px`))
}

function tituloDoMes(hoje = new Date()) {
  const linhas = [...document.querySelectorAll('.capa__linha')]
  const baixo = document.querySelector('.capa__linha--baixo')
  if (!baixo || linhas.length === 0) return
  baixo.textContent = `de ${nomeDoMes.format(hoje)}`
  const ajustar = () => caberNaLargura(linhas)
  ajustar()
  document.fonts?.ready.then(ajustar) // a fonte do título pode chegar depois e ser mais larga
  // Só refaz quando a largura muda: no celular, a barra de endereço que some ao rolar
  // também dispara "resize", mas só muda a altura
  let largura = window.innerWidth
  window.addEventListener('resize', () => {
    if (window.innerWidth === largura) return
    largura = window.innerWidth
    ajustar()
  })
}

export function init() {
  const campo = document.querySelector('[data-atacado-minimo]')
  if (campo && produtos.length > 0) campo.textContent = menorMinimoDeAtacado()
  tituloDoMes()
}
