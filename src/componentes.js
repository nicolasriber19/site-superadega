// Catálogo de componentes (componentes.html, só no npm run dev).
// Desenha os cards com a mesma função do site, em estados que a lista real não mostra.

import './styles/tokens.css'
import './styles/base.css'
import './styles/sections.css'
import './styles/animacao.css'
import './styles/marca.css'

import { produtos } from './data/produtos.js'
import { cardProduto } from './sections/produtos.js'
import { ligarOuvir } from './lib/ouvir.js'

const base = produtos.find((p) => !p.oferta) ?? produtos[0]
const exemplos = [
  { ...base, id: 'exemplo-normal' },
  { ...base, id: 'exemplo-oferta', oferta: true },
  { ...base, id: 'exemplo-sem-foto', imagem: '' },
  {
    ...base,
    id: 'exemplo-nome-longo',
    nome: 'Arroz branco tipo 1 agulhinha, grão longo e fino, colheita selecionada',
    unidade: 'Pacote de 5 kg, embalagem econômica com alça',
  },
]

exemplos.push({ ...base, id: 'exemplo-caro', nome: 'Preço de 3 dígitos', preco: 129.9 })
document.querySelector('[data-catalogo-dev]').innerHTML = exemplos.map(cardProduto).join('')

// Cupom: a data de hoje e o botão que "imprime" uma linha nova
document.querySelector('[data-hoje]').textContent = new Date().toLocaleDateString('pt-BR')
document.querySelector('[data-imprimir]').addEventListener('click', () => {
  const linha = document.createElement('li')
  linha.className = 'resumo__item resumo__item--nova'
  linha.innerHTML = `
    <span class="resumo__quantidade">1×</span>
    <span class="resumo__nome">Óleo de soja <small>R$ 8,90 cada</small></span>
    <span class="resumo__subtotal">R$ 8,90</span>
  `
  document.querySelector('[data-cupom-linhas]').append(linha)
})
ligarOuvir()
