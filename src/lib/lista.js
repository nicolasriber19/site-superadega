// Guarda a lista de compras: quantas unidades de cada produto (RF-03).
// Também calcula o preço de atacado e o total.
// As contas são feitas em centavos para não errar arredondamento.
//
// A lista fica salva no próprio aparelho (RF-08), na "memória do navegador"
// (localStorage). Só os produtos e as quantidades: nada de nome ou endereço.

import { produtos } from '../data/produtos.js'

const CHAVE = 'superadega:lista'

const quantidades = lerListaSalva() // id do produto → quantidade
const ouvintes = new Set()

function lerListaSalva() {
  const lista = new Map()
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? '{}')
    for (const [id, quantidade] of Object.entries(salvo)) {
      // Ignora produtos que saíram do catálogo e valores estranhos.
      const existe = produtos.some((p) => p.id === id)
      if (existe && Number.isInteger(quantidade) && quantidade > 0) {
        lista.set(id, quantidade)
      }
    }
  } catch {
    // Navegador sem memória disponível (ex.: aba anônima bloqueada): começa vazia.
  }
  return lista
}

function salvarLista() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(Object.fromEntries(quantidades)))
  } catch {
    // Sem memória disponível: a lista funciona, só não fica salva.
  }
}

export function quantidadeDe(id) {
  return quantidades.get(id) ?? 0
}

export function mudarQuantidade(id, passo) {
  const nova = Math.max(0, quantidadeDe(id) + passo)
  if (nova === 0) {
    quantidades.delete(id) // com 0, o produto sai da lista
  } else {
    quantidades.set(id, nova)
  }
  salvarLista()
  ouvintes.forEach((avisar) => avisar())
}

// Avisa quem precisa redesenhar algo quando a lista muda.
export function aoMudarLista(avisar) {
  ouvintes.add(avisar)
}

export function temAtacado(produto, quantidade) {
  return quantidade >= produto.minimoAtacado
}

export function precoUnitario(produto, quantidade) {
  return temAtacado(produto, quantidade) ? produto.precoAtacado : produto.preco
}

function centavos(reais) {
  return Math.round(reais * 100)
}

export function itensDaLista() {
  return produtos
    .filter((produto) => quantidades.has(produto.id))
    .map((produto) => {
      const quantidade = quantidadeDe(produto.id)
      const preco = precoUnitario(produto, quantidade)
      return {
        produto,
        quantidade,
        preco,
        atacado: temAtacado(produto, quantidade),
        subtotal: (centavos(preco) * quantidade) / 100,
      }
    })
}

export function totalDaLista() {
  const totalCentavos = itensDaLista().reduce((soma, item) => soma + centavos(item.subtotal), 0)
  return totalCentavos / 100
}

export function totalDeUnidades() {
  let soma = 0
  quantidades.forEach((quantidade) => (soma += quantidade))
  return soma
}
