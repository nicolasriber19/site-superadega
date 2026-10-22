// Página de conferência da identidade visual (estilo.html), só para o npm run dev.
// Carrega os estilos e diz na tela se cada fonte carregou.

import './styles/tokens.css'
import './styles/base.css'

// Cada fonte é conferida no peso e na largura em que é usada.
const fontes = [
  { nome: 'Bricolage Grotesque 800', teste: '800 1em "Bricolage Grotesque"' },
  { nome: 'Atkinson Hyperlegible Next 400', teste: '400 1em "Atkinson Hyperlegible Next"' },
  { nome: 'Atkinson Hyperlegible Next 700', teste: '700 1em "Atkinson Hyperlegible Next"' },
]

async function conferirFontes() {
  const status = document.querySelector('[data-status-fontes]')

  // load() pede o arquivo mesmo que ele ainda não tenha aparecido na tela.
  await Promise.all(fontes.map((f) => document.fonts.load(f.teste)))

  const linhas = fontes.map((f) => `${f.nome}: ${document.fonts.check(f.teste) ? 'sim' : 'não'}`)
  status.textContent = `Fontes carregadas: ${linhas.join(' · ')}`
}

conferirFontes()
