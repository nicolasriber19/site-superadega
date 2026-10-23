// Seção "Topo" (#topo): marca e botões "Meus dados", "Ajuda" e "Lista".
// O número da lista é atualizado por finalizar.js.

import { ligarBotoesDeAjuda } from '../lib/ajuda.js'
import { lerDados, salvarDados, apagarDados } from '../lib/meus-dados.js'

// Aviso falado para o leitor de tela (a região aria-live do index.html)
function anunciar(texto) {
  const regiao = document.querySelector('[data-anuncio]')
  if (regiao) regiao.textContent = texto
}

// "Meus dados": a pessoa preenche nome e endereço uma vez, e o pedido já vem preenchido.
function ligarMeusDados() {
  const botao = document.querySelector('[data-abrir-meus-dados]')
  const dialogo = document.querySelector('[data-meus-dados]')
  if (!botao || !dialogo) return
  const formulario = dialogo.querySelector('form')
  const campos = formulario.elements
  const status = dialogo.querySelector('[data-meus-dados-status]')

  botao.addEventListener('click', () => {
    const dados = lerDados()
    campos.nome.value = dados?.nome ?? ''
    campos.endereco.value = dados?.endereco ?? ''
    status.textContent = ''

    // Navegador antigo sem janela (<dialog>): leva aos campos do pedido, que fazem o mesmo papel
    if (typeof dialogo.showModal !== 'function') {
      document.querySelector('#nome')?.focus()
      return
    }
    dialogo.showModal()
  })

  // "Salvar": o formulário tem method="dialog", então a janela fecha sozinha depois
  formulario.addEventListener('submit', (evento) => {
    if (evento.submitter?.value !== 'salvar') return
    const nome = campos.nome.value.trim()
    const endereco = campos.endereco.value.trim()
    if (!nome && !endereco) {
      apagarDados()
      anunciar('Nada para guardar. Seus dados não estão neste aparelho.')
      return
    }
    if (salvarDados({ nome, endereco })) {
      anunciar('Pronto: seus dados foram guardados só neste aparelho.')
    } else {
      evento.preventDefault() // deixa a janela aberta para mostrar o problema
      status.textContent = 'Este navegador não deixou guardar. Preencha seus dados no pedido, lá embaixo.'
    }
  })

  dialogo.querySelector('[data-apagar-meus-dados]').addEventListener('click', () => {
    apagarDados()
    campos.nome.value = ''
    campos.endereco.value = ''
    status.textContent = 'Seus dados foram apagados deste aparelho.'
  })
}

export function init() {
  ligarBotoesDeAjuda(document.querySelector('#topo'))
  ligarMeusDados()
}
