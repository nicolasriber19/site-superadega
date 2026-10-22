// Botão "Ouvir" (RF-10): lê o texto em voz alta com a voz do próprio aparelho.
// Não usa biblioteca nem internet: é a "voz do navegador" (Web Speech API).
//
// Os botões começam escondidos e só aparecem se o aparelho tiver voz em português.
// Cada botão lê o texto do elemento marcado com data-falavel mais próximo,
// ou o texto que estiver em data-texto no próprio botão.

import { caminho } from './caminho.js'

const temSuporte = 'speechSynthesis' in window

function vozEmPortugues() {
  const vozes = window.speechSynthesis.getVoices()
  return vozes.find((v) => v.lang === 'pt-BR') ?? vozes.find((v) => v.lang.startsWith('pt'))
}

function mostrarBotoes(mostrar) {
  document.querySelectorAll('[data-ouvir]').forEach((botao) => {
    botao.hidden = !mostrar
  })
}

let botaoFalando = null

function marcarFalando(botao) {
  if (botaoFalando) botaoFalando.classList.remove('botao-ouvir--falando')
  botaoFalando = botao
  if (botao) botao.classList.add('botao-ouvir--falando')
}

function falar(texto, botao) {
  const fala = new SpeechSynthesisUtterance(texto)
  fala.lang = 'pt-BR'
  fala.voice = vozEmPortugues() ?? null
  fala.rate = 0.9 // um pouco mais devagar, para entender melhor
  fala.onend = () => marcarFalando(null)
  fala.onerror = () => marcarFalando(null)

  window.speechSynthesis.cancel() // para o que estiver falando antes
  window.speechSynthesis.speak(fala)
  marcarFalando(botao)
}

function textoDoBotao(botao) {
  if (botao.dataset.texto) return botao.dataset.texto
  const alvo = botao.closest('[data-falavel]')
  if (!alvo) return ''

  // Lê título e frases separados por ponto, para a voz fazer pausas.
  const partes = [...alvo.querySelectorAll('h3, p')].map((el) => el.textContent.trim())
  const numero = alvo.querySelector('.passo__numero')
  if (numero) partes.unshift(`Passo ${numero.textContent.trim()}`)
  return partes.join('. ').replace(/\.\./g, '.')
}

export function ligarOuvir() {
  if (!temSuporte) return // sem voz no navegador: os botões ficam escondidos

  // As vozes às vezes chegam depois que a página abre.
  const conferirVoz = () => mostrarBotoes(Boolean(vozEmPortugues()))
  conferirVoz()
  window.speechSynthesis.addEventListener('voiceschanged', conferirVoz)

  document.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-ouvir]')
    if (!botao) return

    // Tocar de novo no mesmo botão enquanto fala: para.
    if (botao === botaoFalando) {
      window.speechSynthesis.cancel()
      marcarFalando(null)
      return
    }
    falar(textoDoBotao(botao), botao)
  })
}

const ICONES = caminho('icons/icones.svg')

// Botão pronto para colocar em qualquer lugar (usado nos cards de produto).
// "texto" é o que será lido em voz alta.
export function botaoOuvir(texto) {
  return `
    <button type="button" class="botao botao-ouvir" data-ouvir data-texto="${texto}" hidden>
      <svg class="icone" aria-hidden="true"><use href="${ICONES}#ouvir"></use></svg>
      Ouvir
    </button>
  `
}
