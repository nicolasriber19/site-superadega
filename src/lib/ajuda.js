// Botões "Ajuda" (RF-14): abrem o WhatsApp da loja com uma frase pronta.
// Usado no topo, no rodapé e na página de privacidade.
// Sem JavaScript, o link continua levando ao rodapé.

import { TEXTO_AJUDA, linkDoWhatsApp } from '../data/config.js'

// "raiz": onde procurar os botões (a página toda, se não disser nada).
export function ligarBotoesDeAjuda(raiz = document) {
  raiz.querySelectorAll('[data-ajuda]').forEach((link) => {
    link.href = linkDoWhatsApp(TEXTO_AJUDA)
    link.target = '_blank'
    link.rel = 'noopener'
  })
}
