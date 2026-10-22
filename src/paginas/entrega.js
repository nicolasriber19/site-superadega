// Página de entrega (RF-24): quem recebe assina com o dedo e o entregador
// envia a imagem para o WhatsApp da loja.
//
// Sem servidor: a imagem é montada no próprio celular e compartilhada pelo
// menu "Compartilhar" do aparelho (Web Share API). Onde isso não existe,
// aparece o botão "Baixar a imagem" (plano B). Nada fica guardado aqui.

import '../styles/tokens.css'
import '../styles/base.css'
import '../styles/sections.css'

const formulario = document.querySelector('[data-entrega]')
const quadro = document.querySelector('[data-quadro]')
const pincel = quadro.getContext('2d')
const caixaErros = document.querySelector('[data-erros-entrega]')
const status = document.querySelector('[data-status-entrega]')
const linkBaixar = document.querySelector('[data-baixar]')

// Cada traço é uma lista de pontos {x, y} em px da tela.
// Guardar os pontos permite redesenhar se a tela girar.
let tracos = []
let tracoAtual = null

const dataEHora = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

// Cores e fonte do quadro vêm dos tokens (src/styles/tokens.css): nada é escrito aqui.
const tokens = getComputedStyle(document.documentElement)
const token = (nome) => tokens.getPropertyValue(nome).trim()
const COR_PAPEL = token('--cor-superficie')
const COR_LINHA = token('--cor-borda')
const COR_TINTA = token('--cor-texto')
const FONTE = token('--fonte-texto')

// ---- Quadro de assinatura ----

function redesenhar() {
  const escala = window.devicePixelRatio || 1
  const largura = quadro.clientWidth
  const altura = quadro.clientHeight
  quadro.width = Math.round(largura * escala)
  quadro.height = Math.round(altura * escala)
  pincel.setTransform(escala, 0, 0, escala, 0, 0)

  // Fundo da cor do papel (a imagem final não fica transparente)
  pincel.fillStyle = COR_PAPEL
  pincel.fillRect(0, 0, largura, altura)

  // Linha de "assine aqui"
  pincel.strokeStyle = COR_LINHA
  pincel.lineWidth = 2
  pincel.beginPath()
  pincel.moveTo(16, altura - 40)
  pincel.lineTo(largura - 16, altura - 40)
  pincel.stroke()

  pincel.strokeStyle = COR_TINTA
  pincel.lineWidth = 3
  pincel.lineCap = 'round'
  pincel.lineJoin = 'round'
  tracos.forEach((traco) => {
    pincel.beginPath()
    traco.forEach((p, i) => (i === 0 ? pincel.moveTo(p.x, p.y) : pincel.lineTo(p.x, p.y)))
    if (traco.length === 1) pincel.lineTo(traco[0].x + 0.1, traco[0].y) // um toque vira um ponto
    pincel.stroke()
  })
}

function pontoDoEvento(evento) {
  const caixa = quadro.getBoundingClientRect()
  return { x: evento.clientX - caixa.left, y: evento.clientY - caixa.top }
}

quadro.addEventListener('pointerdown', (evento) => {
  quadro.setPointerCapture(evento.pointerId) // continua desenhando mesmo saindo do quadro
  tracoAtual = [pontoDoEvento(evento)]
  tracos.push(tracoAtual)
  redesenhar()
})

quadro.addEventListener('pointermove', (evento) => {
  if (!tracoAtual) return
  tracoAtual.push(pontoDoEvento(evento))
  redesenhar()
})

function terminarTraco() {
  if (!tracoAtual) return
  tracoAtual = null
  prepararImagem()
}
quadro.addEventListener('pointerup', terminarTraco)
quadro.addEventListener('pointercancel', terminarTraco)

document.querySelector('[data-limpar]').addEventListener('click', () => {
  tracos = []
  redesenhar()
  prepararImagem()
})

window.addEventListener('resize', redesenhar)
redesenhar()

// ---- Imagem final: assinatura + nomes + data ----

let arquivoPronto = null

function montarImagem() {
  const recebedor = formulario.elements.recebedor.value.trim()
  const cliente = formulario.elements.cliente.value.trim()
  const quando = dataEHora.format(new Date())

  const linhas = [`Recebido por: ${recebedor || '-'}`, `Pedido de: ${cliente || '-'}`, `Data: ${quando}`]
  const escala = quadro.width / quadro.clientWidth
  const alturaTexto = Math.round((linhas.length * 28 + 24) * escala)

  const imagem = document.createElement('canvas')
  imagem.width = quadro.width
  imagem.height = quadro.height + alturaTexto
  const ctx = imagem.getContext('2d')
  ctx.fillStyle = COR_PAPEL
  ctx.fillRect(0, 0, imagem.width, imagem.height)
  ctx.drawImage(quadro, 0, 0)

  ctx.fillStyle = COR_TINTA
  ctx.font = `${Math.round(18 * escala)}px ${FONTE}`
  linhas.forEach((linha, i) => {
    ctx.fillText(linha, 16 * escala, quadro.height + (i + 1) * 28 * escala)
  })
  return { imagem, recebedor, cliente, quando }
}

// "2026-10-20-23-34", na hora do aparelho (para o nome do arquivo).
function carimboLocal(data) {
  const dois = (n) => String(n).padStart(2, '0')
  return `${data.getFullYear()}-${dois(data.getMonth() + 1)}-${dois(data.getDate())}-${dois(data.getHours())}-${dois(data.getMinutes())}`
}

// Monta o arquivo logo depois de cada traço, para o "Enviar" ser instantâneo:
// alguns celulares só deixam compartilhar se for na hora exata do toque.
function prepararImagem() {
  arquivoPronto = null
  const { imagem } = montarImagem()
  imagem.toBlob((blob) => {
    const nome = `assinatura-${carimboLocal(new Date())}.png`
    arquivoPronto = new File([blob], nome, { type: 'image/png' })
  }, 'image/png')
}
formulario.addEventListener('input', prepararImagem)

// ---- Enviar ----

function mostrarErros(lista) {
  caixaErros.hidden = lista.length === 0
  if (lista.length === 0) return
  caixaErros.innerHTML = `<p>Falta pouco:</p><ul>${lista.map((t) => `<li>${t}</li>`).join('')}</ul>`
  caixaErros.focus()
}

function mostrarStatus(texto) {
  status.textContent = texto
  status.hidden = false
}

function oferecerDownload(arquivo) {
  linkBaixar.href = URL.createObjectURL(arquivo)
  linkBaixar.download = arquivo.name
  linkBaixar.hidden = false
  mostrarStatus('Este aparelho não consegue enviar direto. Toque em "Baixar a imagem" e mande pelo WhatsApp da loja.')
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault()

  const falta = []
  if (!formulario.elements.recebedor.value.trim()) falta.push('Escreva o nome de quem recebeu.')
  if (tracos.length === 0) falta.push('Peça para a pessoa assinar no quadro.')
  mostrarErros(falta)
  if (falta.length > 0) return

  if (!arquivoPronto) prepararImagem()
  const arquivo = arquivoPronto
  if (!arquivo) {
    mostrarStatus('Preparando a imagem… toque em "Enviar assinatura" de novo.')
    return
  }

  const { recebedor, cliente, quando } = montarImagem()
  const texto = `Assinatura da entrega. Recebido por: ${recebedor}. Pedido de: ${cliente || '-'}. Data: ${quando}.`

  if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
    try {
      await navigator.share({ files: [arquivo], text: texto })
      mostrarStatus('Pronto! Confira se a imagem chegou no WhatsApp da loja.')
    } catch (erro) {
      if (erro.name === 'AbortError') {
        mostrarStatus('Envio cancelado. Toque em "Enviar assinatura" para tentar de novo.')
      } else {
        oferecerDownload(arquivo)
      }
    }
  } else {
    oferecerDownload(arquivo)
  }
})
