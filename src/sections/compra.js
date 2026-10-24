// Seção "O que vem na sua compra" (#compra): a compra sai das sacolas conforme a rolagem.
// São 120 quadros WebP (public/frames/, tirados do vídeo; docs/video.md) desenhados num canvas.
//
// - A página não fica presa: o filme anda enquanto a seção atravessa a tela.
// - Os quadros só começam a carregar quando a seção chega perto (não pesam na abertura).
// - Tela pequena ou "economia de dados": carrega 1 quadro a cada 2 (60 no total).
// - "Reduzir movimento" ou navegador sem canvas: fica a imagem parada (o último quadro).

import { caminho } from '../lib/caminho.js'

const TOTAL = 120
const LARGURA_DO_QUADRO = 1280 // medida real dos arquivos: canvas maior que isso não ganha nitidez

function nomeDoQuadro(n) {
  return caminho(`frames/frame_${String(n).padStart(4, '0')}.webp`)
}

// Quais quadros carregar: todos, ou 1 a cada 2 no celular e com economia de dados
function quadrosParaCarregar() {
  const economia = navigator.connection?.saveData === true
  const passo = economia || window.innerWidth < 700 ? 2 : 1
  const lista = []
  for (let n = 1; n <= TOTAL; n += passo) lista.push(n)
  if (lista[lista.length - 1] !== TOTAL) lista.push(TOTAL) // o último sempre entra
  return lista
}

// Pelo centro da imagem: 0 quando ele está a 75% da altura da tela (a imagem já
// apareceu quase inteira embaixo) e 1 quando chega a 25% (perto do alto).
// Assim o filme corre enquanto a pessoa vê a imagem, e está na metade quando ela
// passa pelo meio da tela. (Antes começava quando a imagem só encostava na tela,
// e no computador já tinha acabado ao chegar ao meio.)
const CENTRO_NO_INICIO = 0.75
const CENTRO_NO_FIM = 0.25

function progressoDaRolagem(tela) {
  const caixa = tela.getBoundingClientRect()
  const centro = (caixa.top + caixa.height / 2) / window.innerHeight
  const p = (CENTRO_NO_INICIO - centro) / (CENTRO_NO_INICIO - CENTRO_NO_FIM)
  return Math.min(1, Math.max(0, p))
}

export function init() {
  const canvas = document.querySelector('[data-compra-canvas]')
  // Navegador antigo, sem canvas ou sem IntersectionObserver: fica a imagem parada
  if (!canvas?.getContext || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tela = canvas.parentElement
  const contexto = canvas.getContext('2d')
  if (!contexto) return

  // Enquanto os quadros carregam, a imagem de espera é o começo do filme (compras
  // nas sacolas), e não o fim: senão a pessoa já vê tudo fora das sacolas antes de rolar.
  // Sem JavaScript ou com "reduzir movimento", fica o último quadro do HTML.
  const espera = tela.querySelector('.compra__quadro')
  if (espera) {
    espera.src = nomeDoQuadro(1)
    espera.alt = 'Compra do mês na bancada da cozinha, saindo das sacolas de papel conforme a página rola'
  }
  const numeros = quadrosParaCarregar()
  const imagens = new Map() // número do quadro → imagem já carregada
  let ultimoDesenhado = 0
  let pedido = 0

  // Canvas do tamanho da tela, com nitidez de no máximo 2× (devicePixelRatio)
  // e nunca maior que o quadro. Só mexe se o tamanho mudou: no celular, a barra de
  // endereço que some e volta dispara "resize", e refazer o canvas o apagaria à toa.
  function ajustarTamanho() {
    const escala = Math.min(window.devicePixelRatio || 1, 2)
    const largura = Math.min(Math.round(tela.clientWidth * escala), LARGURA_DO_QUADRO)
    const altura = Math.round((largura * tela.clientHeight) / tela.clientWidth)
    if (largura === canvas.width && altura === canvas.height) return
    canvas.width = largura
    canvas.height = altura
    ultimoDesenhado = 0
  }

  // O quadro carregado mais perto do que a rolagem pede
  function quadroMaisProximo(alvo) {
    let melhor = 0
    for (const n of numeros) {
      if (!imagens.has(n)) continue
      if (!melhor || Math.abs(n - alvo) < Math.abs(melhor - alvo)) melhor = n
    }
    return melhor
  }

  function desenhar() {
    pedido = 0
    const alvo = 1 + Math.round(progressoDaRolagem(tela) * (TOTAL - 1))
    const n = quadroMaisProximo(alvo)
    if (!n || n === ultimoDesenhado) return
    contexto.drawImage(imagens.get(n), 0, 0, canvas.width, canvas.height)
    ultimoDesenhado = n
    canvas.dataset.quadro = n // o número do quadro na tela (os testes conferem que ele anda)
    if (canvas.hidden) {
      canvas.hidden = false // só aparece depois que há um quadro para mostrar
      // Só agora a frase pode prometer movimento (sem JS ou com "reduzir movimento", fica a do HTML)
      const frase = document.querySelector('[data-compra-frase]')
      if (frase) frase.textContent = 'Role a página e veja a compra do mês saindo das sacolas.'
    }
  }

  function pedirDesenho() {
    if (!pedido) pedido = requestAnimationFrame(desenhar)
  }

  // Carrega primeiro o começo do filme e depois o resto, em ordem
  function carregarQuadros() {
    numeros.forEach((n) => {
      const imagem = new Image()
      imagem.onload = () => {
        imagens.set(n, imagem)
        pedirDesenho()
      }
      imagem.src = nomeDoQuadro(n)
    })
  }

  // Começa a carregar quando a seção está a uma tela e meia de distância
  const observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas.some((e) => e.isIntersecting)) return
      observador.disconnect()
      ajustarTamanho()
      carregarQuadros()
      window.addEventListener('scroll', pedirDesenho, { passive: true })
      window.addEventListener('resize', () => {
        ajustarTamanho()
        pedirDesenho()
      })
    },
    { rootMargin: '150% 0px' },
  )
  observador.observe(tela)
}
