// Configurações da loja. Troque aqui quando tiver os dados reais.
//
// ATENÇÃO: o número do WhatsApp e a grade de entrega são EXEMPLOS. [a confirmar]

// Número do WhatsApp da loja: código do país (55) + DDD + número, só algarismos.
// Este é um número de TESTE e não pertence a ninguém. Usado a partir do passo 12.
export const WHATSAPP_LOJA = '5500000000000'

// Link que abre a conversa com a loja já com um texto escrito.
export function linkDoWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(texto)}`
}

// Frase pronta do botão "Ajuda" (RF-14).
export const TEXTO_AJUDA = 'Olá, preciso de ajuda com meu pedido.'

// Com quantas unidades na lista o ícone da sacola fica cheio. [proposta: ajuste à vontade]
export const UNIDADES_SACOLA_CHEIA = 20

// Quantos dias aparecem para escolher, a partir de amanhã.
export const DIAS_DE_ENTREGA = 5

// Faixas de horário da entrega. "icone" é o nome do ícone em public/icons/icones.svg.
export const faixasDeHorario = [
  { id: 'manha', nome: 'Manhã', horas: '8h às 12h', icone: 'manha' },
  { id: 'tarde', nome: 'Tarde', horas: '13h às 17h', icone: 'tarde' },
  { id: 'noite', nome: 'Noite', horas: '18h às 21h', icone: 'noite' },
]
