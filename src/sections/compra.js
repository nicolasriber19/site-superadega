// Seção "O que vem na sua compra" (#compra): a compra sai das sacolas conforme a rolagem.
// São 120 quadros WebP (public/frames/, tirados do vídeo; docs/video.md) desenhados num canvas.
//
// - A página não fica presa: o filme anda enquanto a seção atravessa a tela.
// - Os quadros só começam a carregar quando a seção chega perto (não pesam na abertura).
// - Tela pequena ou "economia de dados": carrega 1 quadro a cada 2 (60 no total).
// - "Reduzir movimento" ou navegador sem canvas: fica a imagem parada (o último quadro).

import { caminho } from '../lib/caminho.js'

const TOTAL = 120

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

// 0 quando o pé da seção entra na tela; 1 quando a imagem chega perto do alto da tela
function progressoDaRolagem(tela) {
  const caixa = tela.getBoundingClientRect()
  const altura = window.innerHeight
  const inicio = altura // a imagem começa a aparecer embaixo
  const fim = altura * 0.15 // e termina quando o topo dela passa de 15% da altura da tela
  const p = (inicio - caixa.top) / (inicio - fim)
  return Math.min(1, Math.max(0, p))
}

export function init() {
  const canvas = document.querySelector('[data-compra-canvas]')
  if (!canvas || !canvas.getContext) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tela = canvas.parentElement
  const contexto = canvas.getContext('2d')
  const numeros = quadrosParaCarregar()
  const imagens = new Map() // número do quadro → imagem já carregada
  let ultimoDesenhado = 0
  let pedido = 0

  // Canvas do tamanho da tela, com nitidez de no máximo 2× (devicePixelRatio)
  function ajustarTamanho() {
    const escala = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(tela.clientWidth * escala)
    canvas.height = Math.round(tela.clientHeight * escala)
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
      imagem.decoding = 'async'
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
