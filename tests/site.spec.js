// Testes do site (etapa 17). Rodar: npm test
// Cada teste abre o site já gerado (npm run build + preview) no Chrome,
// no celular (390 px) e no notebook (1440 px). Ver playwright.config.js.

import { test, expect } from '@playwright/test'

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
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('./')
    const animacao = await page.locator('.capa__linha--cima').evaluate((e) => getComputedStyle(e).animationName)
    expect(animacao).toBe('none')
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
    await page.reload()
    await expect(page.locator('#nome')).toHaveValue('Maria Teste')
  })

  test('os 12 áudios do "Ouvir" existem', async ({ page, request }) => {
    await page.goto('./')
    const arquivos = await page.evaluate(async () => {
      const { audiosGravados } = await import('./src/data/audios.js').catch(() => ({ audiosGravados: null }))
      return audiosGravados
    })
    // No build, os módulos viram um arquivo só: confere pelos nomes conhecidos
    const nomes = arquivos?.map((a) => a.arquivo) ?? [
      ...['passo-1', 'passo-2', 'passo-3', 'passo-4'].map((n) => `audio/passos/${n}.mp3`),
      ...['arroz', 'feijao', 'oleo', 'cafe', 'leite', 'detergente', 'sabao-po', 'papel-higienico'].map((n) => `audio/produtos/${n}.mp3`),
    ]
    expect(nomes).toHaveLength(12)
    for (const nome of nomes) {
      const resposta = await request.get(nome)
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
