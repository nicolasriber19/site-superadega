// "Meus dados": nome e endereço guardados só neste aparelho (localStorage),
// e só quando a pessoa toca em "Salvar". Servem para o pedido já vir preenchido.
// Nada vai para servidor nenhum. "Apagar meus dados" tira tudo.

const CHAVE = 'superadega:meus-dados'

// Avisa as outras partes do site (o Finalizar) que os dados mudaram.
export const EVENTO_DADOS = 'superadega:meus-dados'

// { nome, endereco } ou null, se não houver nada guardado
// (ou se o navegador não deixar usar o armazenamento, como na janela anônima de alguns celulares).
export function lerDados() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? 'null')
    if (!salvo || typeof salvo !== 'object') return null
    return { nome: String(salvo.nome ?? ''), endereco: String(salvo.endereco ?? '') }
  } catch {
    return null
  }
}

function avisar() {
  window.dispatchEvent(new CustomEvent(EVENTO_DADOS))
}

// Devolve true se deu para guardar.
export function salvarDados({ nome, endereco }) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ nome, endereco }))
    avisar()
    return true
  } catch {
    return false
  }
}

export function apagarDados() {
  try {
    localStorage.removeItem(CHAVE)
  } catch {
    // sem armazenamento: não havia nada guardado
  }
  avisar()
}
