// Seção "Finalizar pedido": lista e total, dia e horário da entrega, dados
// e o envio do pedido pelo WhatsApp da loja (RF-05).

import { aoMudarLista, itensDaLista, totalDaLista, totalDeUnidades } from '../lib/lista.js'
import { emReais } from '../lib/dinheiro.js'
import { caminho } from '../lib/caminho.js'
import { DIAS_DE_ENTREGA, faixasDeHorario, linkDoWhatsApp } from '../data/config.js'

const ICONES = caminho('icons/icones.svg')

function textoUnidades(n) {
  return n === 1 ? '1 item' : `${n} itens`
}

function desenharResumo(resumo) {
  const itens = itensDaLista()

  if (itens.length === 0) {
    resumo.innerHTML = `
      <p class="resumo__vazio">Sua lista está vazia.</p>
      <a class="botao botao--primario" href="#produtos">
        <svg class="icone" aria-hidden="true"><use href="${ICONES}#sacola"></use></svg>
        Escolher produtos
      </a>
    `
    return
  }

  const linhas = itens
    .map(
      (item) => `
        <li class="resumo__item">
          <span class="resumo__quantidade">${item.quantidade}×</span>
          <span class="resumo__nome">
            ${item.produto.nome}
            <small>${emReais(item.preco)} cada${item.atacado ? ' · <strong>atacado</strong>' : ''}</small>
          </span>
          <span class="resumo__subtotal">${emReais(item.subtotal)}</span>
        </li>
      `,
    )
    .join('')

  resumo.innerHTML = `
    <ul class="resumo__lista" role="list">${linhas}</ul>
    <p class="resumo__total">
      <span>Total</span>
      <strong data-total>${emReais(totalDaLista())}</strong>
    </p>
  `
}

// Contador do topo e barra fixa no pé da tela.
function desenharAtalhos(contador, barra) {
  const unidades = totalDeUnidades()
  contador.textContent = unidades

  barra.hidden = unidades === 0
  document.body.classList.toggle('tem-barra-lista', unidades > 0)
  barra.querySelector('[data-barra-texto]').textContent =
    `Ver lista: ${textoUnidades(unidades)} · ${emReais(totalDaLista())}`
}

function montarFinalizar({ resumo, contador, barra }) {
  const desenhar = () => {
    desenharResumo(resumo)
    desenharAtalhos(contador, barra)
  }
  aoMudarLista(desenhar)
  desenhar()
}

// ---- Dia e horário da entrega (RF-04) ----
// Cada opção é um "radio" (escolha única) com cara de botão grande:
// funciona com toque, com Tab + setas do teclado e com leitor de tela.

const diaDaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
const diaEMes = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' })

// "2026-10-22", usando a data do aparelho (sem fuso de outro lugar).
function dataComoTexto(data) {
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${data.getFullYear()}-${mes}-${dia}`
}

// Os próximos dias, a partir de amanhã.
export function proximosDias(hoje = new Date()) {
  return Array.from({ length: DIAS_DE_ENTREGA }, (_, i) => {
    const data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + i + 1)
    const semana = diaDaSemana.format(data).replace('.', '')
    return {
      valor: dataComoTexto(data),
      rotulo: i === 0 ? 'Amanhã' : semana.charAt(0).toUpperCase() + semana.slice(1),
      data: diaEMes.format(data),
    }
  })
}

function opcaoDia(dia) {
  return `
    <label class="escolha">
      <input class="visualmente-oculto" type="radio" name="dia" value="${dia.valor}" required />
      <span class="escolha__pequeno">${dia.rotulo}</span>
      <span class="escolha__grande">${dia.data}</span>
    </label>
  `
}

function opcaoFaixa(faixa) {
  return `
    <label class="escolha">
      <input class="visualmente-oculto" type="radio" name="faixa" value="${faixa.id}" required />
      <svg class="escolha__icone" aria-hidden="true"><use href="${ICONES}#${faixa.icone}"></use></svg>
      <span class="escolha__grande">${faixa.nome}</span>
      <span class="escolha__pequeno">${faixa.horas}</span>
    </label>
  `
}

function montarEntrega(formulario) {
  const dias = proximosDias()
  formulario.querySelector('[data-dias]').innerHTML = dias.map(opcaoDia).join('')
  formulario.querySelector('[data-faixas]').innerHTML = faixasDeHorario.map(opcaoFaixa).join('')

  // "Vou mandar o endereço por áudio" (RF-09): desliga o campo de endereço.
  const audio = formulario.querySelector('[data-endereco-audio]')
  const endereco = formulario.elements.endereco
  audio.addEventListener('change', () => {
    endereco.disabled = audio.checked
    endereco.removeAttribute('aria-invalid')
  })

  // Tira a marca vermelha do campo assim que a pessoa corrige.
  formulario.addEventListener('input', (evento) => evento.target.removeAttribute('aria-invalid'))

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()
    enviarPedido(formulario, dias)
  })
}

// ---- Envio pelo WhatsApp (RF-05) ----

function lerPedido(formulario, dias) {
  const campos = formulario.elements
  const dia = dias.find((d) => d.valor === campos.dia.value)
  const faixa = faixasDeHorario.find((f) => f.id === campos.faixa.value)
  return {
    itens: itensDaLista(),
    dia,
    faixa,
    nome: campos.nome.value.trim(),
    endereco: campos.endereco.value.trim(),
    enderecoPorAudio: campos.enderecoPorAudio.checked,
  }
}

// Lista do que falta. "campo" é o campo que fica marcado em vermelho.
function oQueFalta(pedido, formulario) {
  const campos = formulario.elements
  const falta = []
  if (pedido.itens.length === 0) falta.push({ texto: 'Escolha pelo menos 1 produto.', campo: null })
  if (!pedido.dia) falta.push({ texto: 'Escolha o dia da entrega.', campo: campos.dia[0] })
  if (!pedido.faixa) falta.push({ texto: 'Escolha o horário.', campo: campos.faixa[0] })
  if (!pedido.nome) falta.push({ texto: 'Escreva seu nome.', campo: campos.nome })
  if (!pedido.endereco && !pedido.enderecoPorAudio) {
    falta.push({ texto: 'Escreva o endereço ou marque "Vou mandar o endereço por áudio".', campo: campos.endereco })
  }
  return falta
}

function mostrarErros(formulario, falta) {
  const caixa = formulario.querySelector('[data-erros]')
  if (falta.length === 0) {
    caixa.hidden = true
    return
  }
  falta.forEach(({ campo }) => {
    if (campo && campo.type !== 'radio') campo.setAttribute('aria-invalid', 'true')
  })
  caixa.innerHTML = `
    <p>Falta pouco:</p>
    <ul>${falta.map(({ texto }) => `<li>${texto}</li>`).join('')}</ul>
  `
  caixa.hidden = false
  caixa.focus() // o leitor de tela lê a lista logo em seguida
}

// Texto que vai pronto para o WhatsApp. Começa com "Pedido pelo site"
// para a loja contar os pedidos sem precisar de analytics.
export function mensagemDoPedido(pedido) {
  const linhas = pedido.itens.map((item) => {
    const atacado = item.atacado ? ' (atacado)' : ''
    return `• ${item.quantidade}x ${item.produto.nome} - ${item.produto.unidade} - ${emReais(item.preco)} cada = ${emReais(item.subtotal)}${atacado}`
  })

  const endereco = pedido.enderecoPorAudio
    ? 'Endereço: vou mandar por áudio.'
    : `Endereço: ${pedido.endereco}`

  return [
    'Pedido pelo site',
    '',
    ...linhas,
    '',
    `Total: ${emReais(totalDaLista())}`,
    '',
    `Entrega: ${pedido.dia.rotulo} ${pedido.dia.data}, ${pedido.faixa.nome} (${pedido.faixa.horas})`,
    `Nome: ${pedido.nome}`,
    endereco,
    '',
    'Pagamento: Pix antes da entrega. Aguardo a chave Pix.',
  ].join('\n')
}

function enviarPedido(formulario, dias) {
  const pedido = lerPedido(formulario, dias)
  const falta = oQueFalta(pedido, formulario)
  mostrarErros(formulario, falta)
  if (falta.length > 0) return

  const link = linkDoWhatsApp(mensagemDoPedido(pedido))
  // Abre o WhatsApp numa aba nova. Se o navegador bloquear, abre nesta mesma aba
  // (a lista continua salva no aparelho).
  // ('noopener' faria window.open devolver sempre null, então a ligação é cortada à mão.)
  const janela = window.open(link, '_blank')
  if (janela) {
    janela.opener = null
  } else {
    window.location.href = link
  }

  formulario.querySelector('[data-pronto]').hidden = false
}

export function init() {
  montarFinalizar({
    resumo: document.querySelector('[data-resumo]'),
    contador: document.querySelector('[data-contador-lista]'),
    barra: document.querySelector('[data-barra-lista]'),
  })
  montarEntrega(document.querySelector('[data-pedido]'))
}
