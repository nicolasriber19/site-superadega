// Testes do site (etapa 17). Rodar: npm test
// Cada teste abre o site já gerado (npm run build + preview) no Chrome,
// no celular (390 px) e no notebook (1440 px). Ver playwright.config.js.

import { test, expect } from '@playwright/test'
import { audiosGravados } from '../src/data/audios.js'

// Junta os erros do console e as respostas com erro (400 ou mais) de cada página.
function vigiar(page) {
  const problemas = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') problemas.push(`console: ${msg.text()}`)
  })
  page.on('pageerror', (erro) => problemas.push(`erro de JavaScript: ${erro.message}`))
  page.on('response', (resposta) => {
    if (resposta.status() >= 400) problemas.push(`${resposta.status()} em ${resposta.url()}`)
  })
  return problemas
}

test.describe('Página principal', () => {
  test('carrega com título, botão principal e sem erros', async ({ page }) => {
    const problemas = vigiar(page)
    await page.goto('./')
    await expect(page).toHaveTitle(/Superadega/)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('.capa').getByRole('link', { name: 'Fazer minha compra' })).toBeVisible()
    await expect(page.locator('.card-produto')).toHaveCount(8)
    // Rola até o fim para carregar as fotos com loading="lazy" e conferir que todas existem
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 30))
      }
    })
    await page.waitForLoadState('networkidle')
    expect(problemas).toEqual([])
  })

  test('"Fazer minha compra" aparece sem rolar', async ({ page }) => {
    await page.goto('./')
    const botao = page.locator('.capa').getByRole('link', { name: 'Fazer minha compra' })
    const caixa = await botao.boundingBox()
    const altura = page.viewportSize().height
    expect(caixa.y + caixa.height).toBeLessThanOrEqual(altura)
  })

  test('nada rola para o lado', async ({ page }) => {
    await page.goto('./')
    const sobra = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(sobra).toBeLessThanOrEqual(0)
  })

  test('com "reduzir movimento", a capa fica parada', async ({ page }) => {
    const linha = page.locator('.capa__linha--cima')
    const nomeDaAnimacao = () => linha.evaluate((e) => getComputedStyle(e).animationName)
    // Contraprova: sem o pedido, a animação existe (se ela sumir, o teste avisa)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('./')
    expect(await nomeDaAnimacao()).toBe('capa-linha-esquerda')
    // Com o pedido, fica parada
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('./')
    expect(await nomeDaAnimacao()).toBe('none')
  })

  test('pôr um produto na lista atualiza o contador e a sacola', async ({ page }) => {
    await page.goto('./')
    await page.locator('.card-produto').first().getByRole('button', { name: /Adicionar/ }).click()
    await expect(page.locator('[data-contador-lista]')).toHaveText('1')
    const nivel = await page.locator('[data-sacola]').first().evaluate((s) => s.style.getPropertyValue('--nivel'))
    expect(Number(nivel)).toBeGreaterThan(0)
  })

  test('enviar o pedido abre o WhatsApp com a mensagem pronta', async ({ page }) => {
    // Em vez de abrir o WhatsApp de verdade, guarda o link que o site tentou abrir
    await page.addInitScript(() => {
      window.open = (url) => {
        window.__linkAberto = url
        return { opener: null }
      }
    })
    await page.goto('./')
    await page.locator('.card-produto').first().getByRole('button', { name: /Adicionar/ }).click()
    const formulario = page.locator('[data-pedido]')
    await formulario.locator('input[name="dia"]').first().check({ force: true })
    await formulario.locator('input[name="faixa"]').first().check({ force: true })
    await page.locator('#nome').fill('Teste automático')
    await page.locator('#endereco').fill('Rua de Teste, 1')
    await formulario.getByRole('button', { name: /Enviar pedido/ }).click()
    const link = await page.evaluate(() => window.__linkAberto)
    expect(link).toContain('wa.me/')
    expect(decodeURIComponent(link)).toContain('Pedido pelo site')
    expect(decodeURIComponent(link)).toContain('Nome: Teste automático')
  })

  test('"Meus dados" guarda nome e endereço e preenche o pedido', async ({ page }) => {
    await page.goto('./')
    await page.getByRole('button', { name: 'Meus dados' }).click()
    const janela = page.getByRole('dialog', { name: 'Meus dados' })
    await expect(janela).toBeVisible()
    await janela.getByLabel('Seu nome').fill('Maria Teste')
    await janela.getByLabel(/Endereço/).fill('Rua das Flores, 10')
    await janela.getByRole('button', { name: 'Salvar' }).click()
    await expect(janela).toBeHidden()
    await expect(page.locator('#nome')).toHaveValue('Maria Teste')
    await expect(page.locator('#endereco')).toHaveValue('Rua das Flores, 10')
    await page.reload()
    await expect(page.locator('#nome')).toHaveValue('Maria Teste')
    await expect(page.locator('#endereco')).toHaveValue('Rua das Flores, 10')
  })

  test('os 12 áudios do "Ouvir" existem', async ({ request }) => {
    // A lista vem de src/data/audios.js: mudou lá, o teste acompanha
    const nomes = audiosGravados.map((a) => a.arquivo)
    expect(nomes).toHaveLength(12)
    for (const nome of nomes) {
      const resposta = await request.get(nome)
      expect(resposta.status(), nome).toBe(200)
    }
  })
})

test.describe('Cartaz de preço e cupom', () => {
  test('o card mostra o preço em cartaz e o leitor de tela ouve o preço uma vez só', async ({ page }) => {
    await page.goto('./')
    const cartaz = page.locator('.card-produto').first().locator('.cartaz')
    await expect(cartaz.locator('.cartaz__placa')).toBeVisible()
    // A placa e o "cada" são só visuais; quem fala é o texto escondido, com o preço inteiro
    // O que o leitor de tela recebe: uma linha só (sem a placa nem o "cada" repetidos)
    expect(await cartaz.ariaSnapshot()).toMatch(/^- paragraph: "Preço: R\$\s[\d.]+,\d{2} cada"$/)
    await expect(cartaz.locator('.cartaz__placa')).toHaveAttribute('aria-hidden', 'true')
    await expect(cartaz.locator('.cartaz__cada')).toHaveAttribute('aria-hidden', 'true')
  })

  test('o cartaz cabe dentro de todos os cards, até num celular de 360 px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('./')
    const foraDoCard = await page.locator('.card-produto').evaluateAll((cards) =>
      cards
        .filter((card) => {
          const estilo = getComputedStyle(card)
          const limite = card.getBoundingClientRect().right - parseFloat(estilo.paddingRight)
          return card.querySelector('.cartaz__placa').getBoundingClientRect().right > limite + 0.5
        })
        .map((card) => card.dataset.id),
    )
    expect(foraDoCard).toEqual([])
  })

  test('o cupom "imprime" só a linha nova e mostra data e rodapé', async ({ page }) => {
    await page.goto('./')
    const cupom = page.locator('.cupom')
    await expect(cupom.locator('[data-cupom-data]')).toHaveText(/^ · \d{2}\/\d{2}\/\d{4}$/)
    await expect(cupom.locator('.cupom__rodape')).toHaveCount(0) // lista vazia: sem rodapé
    const cards = page.locator('.card-produto')
    await cards.nth(0).getByRole('button', { name: /Adicionar/ }).click()
    await cards.nth(1).getByRole('button', { name: /Adicionar/ }).click()
    await expect(cupom.locator('.resumo__item')).toHaveCount(2)
    await expect(cupom.locator('.resumo__item--nova')).toHaveCount(1) // só a última entrou agora
    await expect(cupom.locator('.cupom__aviso')).toHaveText('Lista de compras, não é nota fiscal.')
    // Ao abrir de novo, a lista salva aparece sem "imprimir"
    await page.reload()
    await expect(cupom.locator('.resumo__item')).toHaveCount(2)
    await expect(cupom.locator('.resumo__item--nova')).toHaveCount(0)
  })
})

test.describe('O que vem na sua compra', () => {
  test('rolando, o canvas aparece e os quadros andam', async ({ page }) => {
    await page.goto('./')
    const canvas = page.locator('[data-compra-canvas]')
    const quadro = () => canvas.evaluate((c) => Number(c.dataset.quadro ?? 0))
    // Começo: a seção acabou de entrar por baixo da tela
    await page.locator('#compra').evaluate((s) => window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.9))
    await expect(canvas).toBeVisible()
    await expect(page.locator('[data-compra-frase]')).toContainText('Role a página')
    const antes = await quadro()
    // Mais para baixo: a imagem chega perto do alto da tela
    await page.locator('.compra__tela').evaluate((t) => window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2))
    await expect.poll(quadro).toBeGreaterThan(antes + 30)
  })

  test('com "reduzir movimento", fica a imagem parada e nenhum quadro baixa', async ({ page }) => {
    const quadrosPedidos = []
    page.on('request', (r) => {
      if (r.url().includes('/frames/') && !r.url().endsWith('frame_0120.webp')) quadrosPedidos.push(r.url())
    })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('./')
    await page.locator('#compra').scrollIntoViewIfNeeded()
    await page.mouse.wheel(0, 300)
    await page.waitForLoadState('networkidle') // dá tempo de o canvas aparecer, se fosse aparecer
    await expect(page.locator('.compra__quadro')).toBeVisible()
    await expect(page.locator('[data-compra-canvas]')).toBeHidden()
    await expect(page.locator('[data-compra-frase]')).not.toContainText('Role')
    expect(quadrosPedidos).toEqual([])
  })

  test('os 120 quadros existem, sem buracos', async ({ request }) => {
    for (let n = 1; n <= 120; n++) {
      const nome = `frames/frame_${String(n).padStart(4, '0')}.webp`
      const resposta = await request.head(nome)
      expect(resposta.status(), nome).toBe(200)
    }
  })
})

test.describe('Outras páginas', () => {
  for (const [pagina, titulo] of [
    ['privacidade.html', /Privacidade/],
    ['entrega.html', /Assinatura da entrega/],
  ]) {
    test(`${pagina} carrega sem erros`, async ({ page }) => {
      const problemas = vigiar(page)
      await page.goto(pagina)
      await expect(page).toHaveTitle(titulo)
      await page.waitForLoadState('networkidle')
      expect(problemas).toEqual([])
    })
  }
})
