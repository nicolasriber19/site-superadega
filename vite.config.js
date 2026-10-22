// Configuração do Vite.
// Doc: https://vite.dev/config/  e  https://vite.dev/guide/static-deploy (GitHub Pages)

import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  // O site fica em https://<usuário>.github.io/site-superadega/
  // No HTML e no CSS, "/img/x.webp" ganha esse começo sozinho no build.
  // No JavaScript, use caminho() de src/lib/caminho.js.
  base: '/site-superadega/',

  // "mpa": arquivo que não existe responde 404, em vez de devolver o index.html.
  // Assim uma imagem quebrada aparece como erro na aba Network.
  appType: 'mpa',

  build: {
    // As 3 páginas do site entram no build (npm run build)
    rolldownOptions: {
      input: {
        principal: resolve(import.meta.dirname, 'index.html'),
        privacidade: resolve(import.meta.dirname, 'privacidade.html'),
        entrega: resolve(import.meta.dirname, 'entrega.html'),
      },
    },
  },
})
