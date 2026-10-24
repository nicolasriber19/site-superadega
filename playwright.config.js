// Testes automáticos com Playwright (etapa 17 do workshop).
// Rodam no site já gerado (npm run build + npm run preview), do jeito que vai para o ar,
// em duas telas: celular (390 × 844) e notebook (1440 × 900).
// Usam o Google Chrome instalado no computador (e o que já vem no GitHub Actions),
// então não precisam baixar outro navegador.

import { defineConfig } from '@playwright/test'

// Porta só dos testes: a 4173 é a do npm run preview, que pode estar aberto com um build velho
const PORTA = 4174
const BASE = `http://localhost:${PORTA}/site-superadega/` // o base do vite.config.js

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI), // no CI, um "test.only" esquecido faz falhar
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: BASE,
    channel: 'chrome',
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'celular', use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
    { name: 'notebook', use: { viewport: { width: 1440, height: 900 } } },
  ],

  webServer: {
    // No CI o workflow já gerou o dist/; no seu computador, gera antes de testar
    command: `${process.env.CI ? '' : 'npm run build && '}npm run preview -- --port ${PORTA} --strictPort`,
    url: BASE,
    reuseExistingServer: false, // sempre sobe um servidor novo, com o build que acabou de gerar
    timeout: 120_000,
  },
})
