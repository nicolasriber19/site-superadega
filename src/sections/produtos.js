// Seção "Produtos": desenha os cards (RF-02), os botões de + e − de cada card (RF-03)
// e os filtros por categoria e ofertas (RF-12 e RF-13).

import { produtos, categorias } from '../data/produtos.js'
import { quantidadeDe, mudarQuantidade, temAtacado } from '../lib/lista.js'
import { botaoOuvir } from '../lib/ouvir.js'
import { caminho } from '../lib/caminho.js'
import { emReais } from '../lib/dinheiro.js'

const IMAGEM_PROVISORIA = caminho('img/placeholder.svg')
const ICONES = caminho('icons/icones.svg')

function icone(nome) {
  return `<svg class="icone" aria-hidden="true"><use href="${ICONES}#${nome}"></use></svg>`
}

// Linha do preço de atacado: muda conforme a quantidade na lista.
function linhaAtacado(produto, quantidade) {
  const preco = `<strong>${emReais(produto.precoAtacado)}</strong>`

  if (temAtacado(produto, quantidade)) {
    return `${icone('confere')}<span>Preço de atacado: ${preco} cada</span>`
  }
  if (quantidade > 0) {
    const faltam = produto.minimoAtacado - quantidade
    return `${icone('etiqueta')}<span>Leve mais ${faltam} e pague ${preco} cada</span>`
  }
  return `${icone('etiqueta')}<span>A partir de ${produto.minimoAtacado}: ${preco} cada</span>`
}

// Sem nada na lista: um botão "Adicionar". Com algo: − quantidade +.
function controles(produto, quantidade) {
  if (quantidade === 0) {
    return `
      <button type="button" class="botao botao--primario card-produto__adicionar" data-acao="mais">
        ${icone('mais')} Adicionar
      </button>
    `
  }
  return `
    <div class="quantidade" role="group" aria-label="Quantidade de ${produto.nome}">
      <button type="button" class="botao quantidade__botao" data-acao="menos" aria-label="Tirar 1">
        ${icone('menos')}
      </button>
      <span class="quantidade__numero">${quantidade}</span>
      <button type="button" class="botao botao--primario quantidade__botao" data-acao="mais" aria-label="Pôr mais 1">
        ${icone('mais')}
      </button>
    </div>
  `
}

// "no pacote", "na garrafa"…: o artigo certo para a primeira palavra da embalagem.
const ARTIGO_DA_EMBALAGEM = { pacote: 'no', frasco: 'no', saco: 'no', fardo: 'no', garrafa: 'na', caixa: 'na', lata: 'na' }

function minuscula(texto) {
  return texto.charAt(0).toLowerCase() + texto.slice(1)
}

// O que o botão "Ouvir" do card fala (RF-10), no tom de um atendente conversando.
// Os números ficam como estão: lib/ouvir.js troca "R$ 25,90" e "5 kg" pelo jeito falado.
function textoFalado(produto) {
  const nome = minuscula(produto.nome)
  const embalagem = minuscula(produto.unidade)
  const artigo = ARTIGO_DA_EMBALAGEM[embalagem.split(' ')[0]] ?? 'em'
  const abertura = produto.oferta
    ? `Olha só, ${nome} em oferta! Vem ${artigo} ${embalagem} e sai por ${emReais(produto.preco)} cada.`
    : `${produto.nome}, ${artigo} ${embalagem}. Sai por ${emReais(produto.preco)} cada.`
  return (
    `${abertura} ` +
    `Se você levar ${produto.minimoAtacado} ou mais, cada um fica por ${emReais(produto.precoAtacado)}. ` +
    'Para pôr na sua lista, é só tocar no botão azul.'
  )
}

function cardProduto(produto) {
  // Sem foto real, a imagem provisória não descreve o produto:
  // o leitor de tela pula ela (alt vazio) e lê o nome logo abaixo.
  const temFoto = produto.imagem !== ''
  const src = temFoto ? caminho(produto.imagem) : IMAGEM_PROVISORIA
  const alt = temFoto ? produto.alt : ''
  const quantidade = quantidadeDe(produto.id) // pode vir da lista salva (RF-08)
  const naLista = quantidade > 0 ? ' card-produto--na-lista' : ''
  const atacadoAtivo = temAtacado(produto, quantidade) ? ' card-produto__atacado--ativo' : ''

  return `
    <li class="card-produto${naLista}" data-id="${produto.id}">
      ${produto.oferta ? `<p class="card-produto__selo">${icone('etiqueta')} Oferta</p>` : ''}
      <img class="card-produto__foto" src="${src}" alt="${alt}" width="600" height="600" loading="lazy" />
      <h3 class="card-produto__nome">${produto.nome}</h3>
      <p class="card-produto__unidade">${produto.unidade}</p>
      <p class="card-produto__preco">
        <span class="visualmente-oculto">Preço:</span>
        ${emReais(produto.preco)} <span class="card-produto__cada">cada</span>
      </p>
      <p class="card-produto__atacado${atacadoAtivo}" data-atacado>${linhaAtacado(produto, quantidade)}</p>
      ${botaoOuvir(textoFalado(produto))}
      <div class="card-produto__controles" data-controles>${controles(produto, quantidade)}</div>
    </li>
  `
}

// Redesenha só as partes do card que mudam com a quantidade.
function atualizarCard(card, produto) {
  const quantidade = quantidadeDe(produto.id)
  const atacado = card.querySelector('[data-atacado]')
  atacado.innerHTML = linhaAtacado(produto, quantidade)
  atacado.classList.toggle('card-produto__atacado--ativo', temAtacado(produto, quantidade))
  card.querySelector('[data-controles]').innerHTML = controles(produto, quantidade)
  card.classList.toggle('card-produto--na-lista', quantidade > 0)
}

// Animação do card (RF-07). Tirar e pôr a classe de novo faz a animação
// recomeçar mesmo em toques rápidos. O CSS está em styles/animacao.css.
function apertarCard(card) {
  card.classList.remove('card-produto--aperto')
  void card.offsetWidth // força o navegador a "esquecer" a animação anterior
  card.classList.add('card-produto--aperto')
}

function anunciar(texto) {
  const regiao = document.querySelector('[data-anuncio]')
  if (regiao) regiao.textContent = texto
}

function produtoPassaNoFiltro(produto, filtro) {
  if (filtro === 'todos') return true
  if (filtro === 'ofertas') return produto.oferta
  return produto.categoria === filtro
}

// Botões de filtro: cada um tem ícone + palavra (RF-06).
// aria-pressed diz ao leitor de tela qual filtro está ligado.
function montarFiltros(grupo, lista, avisoVazio) {
  grupo.innerHTML = categorias
    .map(
      (categoria) => `
        <button type="button" class="botao filtro" data-filtro="${categoria.id}"
          aria-pressed="${categoria.id === 'todos'}">
          <svg class="filtro__icone" aria-hidden="true"><use href="${ICONES}#${categoria.icone}"></use></svg>
          ${categoria.nome}
        </button>
      `,
    )
    .join('')

  grupo.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button[data-filtro]')
    if (!botao) return
    const filtro = botao.dataset.filtro

    grupo.querySelectorAll('[data-filtro]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === botao))
    })

    let visiveis = 0
    lista.querySelectorAll('.card-produto').forEach((card) => {
      const produto = produtos.find((p) => p.id === card.dataset.id)
      const mostra = produtoPassaNoFiltro(produto, filtro)
      card.hidden = !mostra
      if (mostra) visiveis++
    })

    avisoVazio.hidden = visiveis > 0
    const nome = categorias.find((c) => c.id === filtro).nome
    const quantos = visiveis === 1 ? '1 produto' : `${visiveis} produtos`
    anunciar(filtro === 'todos' ? `Mostrando todos: ${quantos}` : `${nome}: ${quantos}`)
  })
}

function montarCatalogo(lista) {
  lista.innerHTML = produtos.map(cardProduto).join('')

  // Foto que não carregou: troca pela imagem provisória e o nome continua visível
  // (docs/ux.md, seção 6). O evento "error" não sobe pela página, por isso o "true".
  lista.addEventListener(
    'error',
    (evento) => {
      const foto = evento.target
      if (!foto.matches('.card-produto__foto') || foto.dataset.provisoria) return
      foto.dataset.provisoria = 'sim' // evita repetir se a provisória também falhar
      foto.src = IMAGEM_PROVISORIA
      foto.alt = '' // a provisória não descreve o produto
    },
    true,
  )

  // Quando a animação termina, tira a classe para o card voltar ao normal.
  lista.addEventListener('animationend', (evento) => {
    evento.target.classList.remove('card-produto--aperto')
  })

  // Um único "ouvinte" para todos os botões da lista.
  lista.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button[data-acao]')
    if (!botao) return

    const card = botao.closest('.card-produto')
    const produto = produtos.find((p) => p.id === card.dataset.id)
    const acao = botao.dataset.acao

    mudarQuantidade(produto.id, acao === 'mais' ? 1 : -1)
    atualizarCard(card, produto)
    apertarCard(card)

    // O botão tocado foi redesenhado: devolve o foco para quem usa teclado (RNF-02).
    const mesmoBotao = card.querySelector(`[data-acao="${acao}"]`) ?? card.querySelector('[data-acao]')
    mesmoBotao.focus()

    const quantidade = quantidadeDe(produto.id)
    anunciar(quantidade === 0 ? `${produto.nome} saiu da lista` : `${produto.nome}: ${quantidade} na lista`)
  })
}

export function init() {
  const lista = document.querySelector('[data-catalogo]')
  montarCatalogo(lista)
  montarFiltros(document.querySelector('[data-filtros]'), lista, document.querySelector('[data-catalogo-vazio]'))
}
