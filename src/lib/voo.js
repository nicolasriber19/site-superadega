// Ao tocar em Adicionar (ou no +), um pontinho cobre "voa" do botão até a sacola que
// está na tela: a da barra "Ver lista" no pé da tela ou a do topo. A sacola pula quando
// ele chega. Assim a pessoa vê para onde o produto foi.
// Só enfeite: o leitor de tela já ouve "Arroz branco: 1 na lista". Com "reduzir
// movimento", ou se nenhuma sacola estiver na tela, não voa nada.

const DURACAO = 550

function naTela(elemento) {
  if (elemento.closest('[hidden]')) return false
  const caixa = elemento.getBoundingClientRect()
  return caixa.width > 0 && caixa.bottom > 0 && caixa.top < window.innerHeight
}

// origem: a caixa do botão tocado, medida antes de o card ser redesenhado
export function voarParaSacola(origem) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof Element.prototype.animate !== 'function') return
  const sacola = [...document.querySelectorAll('[data-sacola]')].find(naTela)
  if (!sacola) return

  const destino = sacola.getBoundingClientRect()
  const x = destino.left + destino.width / 2 - (origem.left + origem.width / 2)
  const y = destino.top + destino.height / 2 - (origem.top + origem.height / 2)

  const ponto = document.createElement('span')
  ponto.className = 'voo'
  ponto.setAttribute('aria-hidden', 'true')
  ponto.style.left = `${origem.left + origem.width / 2}px`
  ponto.style.top = `${origem.top + origem.height / 2}px`
  document.body.append(ponto)

  // A sacola espera o pontinho chegar para pular
  sacola.style.animationDelay = `${DURACAO - 100}ms`

  const voo = ponto.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)' },
      // no meio do caminho ele sobe um pouco: faz um arco, como algo jogado na sacola
      { transform: `translate(calc(-50% + ${x / 2}px), calc(-50% + ${y / 2 - 80}px)) scale(0.85)`, offset: 0.45 },
      { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.4)`, opacity: 0.7 },
    ],
    { duration: DURACAO, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  )
  const terminar = () => {
    ponto.remove()
    sacola.style.animationDelay = ''
  }
  voo.finished.then(terminar, terminar)
}
