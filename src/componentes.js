// Catálogo de componentes (componentes.html, só no npm run dev).
// Desenha os cards com a mesma função do site, em estados que a lista real não mostra.

import './styles/tokens.css'
import './styles/base.css'
import './styles/sections.css'
import './styles/animacao.css'

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

document.querySelector('[data-catalogo-dev]').innerHTML = exemplos.map(cardProduto).join('')
ligarOuvir()
