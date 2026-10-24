// Botão "Ouvir" (RF-10): fala o texto em voz alta, em tom de conversa.
//
// De onde vem a voz:
//   1. áudio gravado (voz de IA), se houver um para esse texto em src/data/audios.js;
//   2. senão, a "voz do navegador" (Web Speech API), sem biblioteca nem internet.
//
// Os botões começam escondidos. Cada um aparece se tiver áudio gravado ou se o
// aparelho tiver voz em português. Cada botão fala o texto em data-texto, ou o texto
// do elemento marcado com data-falavel mais próximo.
//
// O mesmo botão muda conforme a fala:
//   Ouvir → (falando) Pausar → (pausado) Continuar → … → Ouvir de novo no fim.

import { caminho } from './caminho.js'
import { audiosGravados } from '../data/audios.js'

const temSuporte = 'speechSynthesis' in window
const ICONES = caminho('icons/icones.svg')

// ---- Escolha da voz do aparelho ----
// Cada aparelho tem as suas vozes. Fica com a melhor em português do Brasil:
// primeiro as "naturais" (Edge e Windows 11), depois a do Google (Chrome e Android),
// depois as "aprimoradas" da Apple. Voz de Portugal só se não houver do Brasil.
const VOZES_BOAS = [/natural|neural/i, /google/i, /premium|enhanced|aprimorad/i, /online/i]

let vozEscolhida = null

function idioma(voz) {
  return voz.lang.replace('_', '-').toLowerCase() // o Android escreve "pt_BR"
}

function notaDaVoz(voz) {
  const posicao = VOZES_BOAS.findIndex((regra) => regra.test(voz.name))
  const qualidade = posicao === -1 ? VOZES_BOAS.length : posicao
  const doBrasil = idioma(voz) === 'pt-br' ? 0 : 100
  return doBrasil + qualidade // menor = melhor
}

function escolherVoz() {
  const emPortugues = window.speechSynthesis.getVoices().filter((v) => idioma(v).startsWith('pt'))
  emPortugues.sort((a, b) => notaDaVoz(a) - notaDaVoz(b))
  vozEscolhida = emPortugues[0] ?? null
}

// ---- Texto do jeito que se fala ----
// A voz lê "R$ 25,90" como "R cifrão 25 vírgula 90" e "5 kg" como "5 k g".
// Aqui o texto vira "25 reais e 90 centavos" e "5 quilos".

function plural(numero, singular, varios) {
  return numero === '1' ? `${numero} ${singular}` : `${numero} ${varios}`
}

function reaisFalados(_, inteiro, centavos) {
  const reais = String(Number(inteiro.replace(/\./g, '')))
  const cents = String(Number(centavos))
  const partes = []
  if (reais !== '0') partes.push(plural(reais, 'real', 'reais'))
  if (cents !== '0') partes.push(plural(cents, 'centavo', 'centavos'))
  return partes.join(' e ') || '0 reais'
}

export function paraFala(texto) {
  return texto
    .replace(/R\$\s*(\d{1,3}(?:\.\d{3})*),(\d{2})/g, reaisFalados)
    .replace(/(\d+(?:,\d+)?)\s*kg\b/g, (_, n) => plural(n, 'quilo', 'quilos'))
    .replace(/(\d+(?:,\d+)?)\s*ml\b/g, (_, n) => plural(n, 'mililitro', 'mililitros'))
    .replace(/(\d+(?:,\d+)?)\s*g\b/g, (_, n) => plural(n, 'grama', 'gramas'))
}

function textoDoBotao(botao) {
  if (botao.dataset.texto) return paraFala(botao.dataset.texto)
  const alvo = botao.closest('[data-falavel]')
  if (!alvo) return ''

  // Lê título e frases separados por ponto, para a voz fazer pausas.
  const partes = [...alvo.querySelectorAll('h3, p')].map((el) => el.textContent.trim())
  const numero = alvo.querySelector('.passo__numero')
  if (numero) partes.unshift(`Passo ${numero.textContent.trim()}`)
  return paraFala(partes.join('. ').replace(/\.\./g, '.'))
}

// Áudio gravado para este texto exato (ou nada, se o texto mudou desde a gravação).
function audioDe(texto) {
  return audiosGravados.find((audio) => audio.texto === texto)
}

// ---- O botão ----

function conteudoDoBotao(estado) {
  const { icone, rotulo } = {
    parado: { icone: 'ouvir', rotulo: 'Ouvir' },
    falando: { icone: 'pausar', rotulo: 'Pausar' },
    pausado: { icone: 'continuar', rotulo: 'Continuar' },
  }[estado]
  return `<svg class="icone" aria-hidden="true"><use href="${ICONES}#${icone}"></use></svg> ${rotulo}`
}

function desenharBotao(botao, estado) {
  botao.innerHTML = conteudoDoBotao(estado)
  botao.classList.toggle('botao-ouvir--falando', estado === 'falando')
}

function mostrarBotoes() {
  document.querySelectorAll('[data-ouvir]').forEach((botao) => {
    botao.hidden = !vozEscolhida && !audioDe(textoDoBotao(botao))
  })
  // A Helena só se apresenta se há algum "Ouvir" na tela para ela cumprir o que promete
  const algumOuvir = document.querySelector('[data-ouvir]:not([hidden])') !== null
  document.querySelectorAll('[data-helena]').forEach((cartao) => (cartao.hidden = !algumOuvir))
}

// ---- A fala ----
// Uma "sessão" é a fala de um botão, do toque em Ouvir até o fim.
//   - Áudio gravado: Pausar e Continuar usam o próprio áudio.
//   - Voz do aparelho: o texto é falado frase a frase. Assim a voz faz pausas naturais
//     e o "Pausar" funciona em todo aparelho: pausar = parar e lembrar a frase;
//     continuar = falar de novo a partir do começo dessa frase. (A pausa própria do
//     navegador falha no Chrome do Android.)

let atual = null // { botao, texto, frases, indice, pausado, audio }

// Cada frase vai até o ponto final, de exclamação ou de interrogação.
// (Não use "(?<=" aqui: o Safari antes do iOS 16.4 não entende e o site inteiro para.)
function frasesDe(texto) {
  return (texto.match(/[^.!?]+[.!?]*/g) ?? [])
    .map((frase) => frase.trim())
    .filter(Boolean)
}

function terminar(sessao) {
  if (atual !== sessao) return
  desenharBotao(sessao.botao, 'parado')
  atual = null
}

function falarAPartir(sessao, inicio) {
  if (!vozEscolhida) {
    terminar(sessao) // sem voz no aparelho e sem áudio: não há o que tocar
    return
  }
  window.speechSynthesis.cancel() // para o que estiver falando antes
  sessao.frases.slice(inicio).forEach((frase, i) => {
    const posicao = inicio + i
    const fala = new SpeechSynthesisUtterance(frase)
    fala.lang = 'pt-BR'
    fala.voice = vozEscolhida
    fala.rate = 0.9 // um pouco mais devagar, para entender melhor
    fala.onstart = () => {
      if (atual === sessao) sessao.indice = posicao
    }
    fala.onend = () => {
      if (!sessao.pausado && posicao === sessao.frases.length - 1) terminar(sessao)
    }
    // Também chega aqui quando a fala é interrompida de propósito (pausa ou outro botão)
    fala.onerror = () => {
      if (!sessao.pausado) terminar(sessao)
    }
    window.speechSynthesis.speak(fala)
  })
  sessao.pausado = false
  desenharBotao(sessao.botao, 'falando')
}

function tocarGravado(sessao, arquivo) {
  const audio = new Audio(caminho(arquivo))
  sessao.audio = audio
  audio.onended = () => terminar(sessao)

  // Se o arquivo não carregar, a voz do aparelho fala no lugar.
  const usarVozDoAparelho = () => {
    if (atual !== sessao || !sessao.audio) return
    sessao.audio = null
    falarAPartir(sessao, 0)
  }
  audio.onerror = usarVozDoAparelho
  audio.play().catch(usarVozDoAparelho)
  sessao.pausado = false
  desenharBotao(sessao.botao, 'falando')
}

function parar(sessao) {
  if (sessao.audio) sessao.audio.pause()
  else if (temSuporte) window.speechSynthesis.cancel()
}

function comecar(botao) {
  if (atual) {
    const anterior = atual
    atual = null
    parar(anterior)
    desenharBotao(anterior.botao, 'parado')
  }
  const texto = textoDoBotao(botao)
  const sessao = { botao, texto, frases: frasesDe(texto), indice: 0, pausado: false, audio: null }
  atual = sessao

  const gravado = audioDe(texto)
  if (gravado) tocarGravado(sessao, gravado.arquivo)
  else falarAPartir(sessao, 0)
}

function pausar(sessao) {
  sessao.pausado = true
  parar(sessao)
  desenharBotao(sessao.botao, 'pausado')
}

function continuar(sessao) {
  if (!sessao.audio) {
    falarAPartir(sessao, sessao.indice)
    return
  }
  sessao.pausado = false
  sessao.audio.play()
  desenharBotao(sessao.botao, 'falando')
}

export function ligarOuvir() {
  if (temSuporte) {
    // As vozes às vezes chegam depois que a página abre.
    const conferirVoz = () => {
      escolherVoz()
      mostrarBotoes()
    }
    conferirVoz()
    window.speechSynthesis.addEventListener('voiceschanged', conferirVoz)
  } else {
    mostrarBotoes() // sem voz no navegador: só aparecem os botões com áudio gravado
  }

  document.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-ouvir]')
    if (!botao) return

    if (atual && botao === atual.botao) {
      if (atual.pausado) continuar(atual)
      else pausar(atual)
      return
    }
    comecar(botao)
  })
}

// Botão pronto para colocar em qualquer lugar (usado nos cards de produto).
// "texto" é o que será falado.
export function botaoOuvir(texto) {
  return `
    <button type="button" class="botao botao-ouvir" data-ouvir data-texto="${texto}" hidden>
      ${conteudoDoBotao('parado')}
    </button>
  `
}
