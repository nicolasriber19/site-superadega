// Áudios gravados do botão "Ouvir" (RF-10), com voz de IA (Higgsfield, modelo ElevenLabs v4).
// Os arquivos ficam em public/audio/.
//
// Cada áudio guarda o "texto" exato que foi gravado: o mesmo que o site fala, já do
// jeito falado (ex.: "25 reais e 90 centavos"). Quando o texto muda — um preço novo,
// por exemplo —, o site percebe que o áudio não bate mais e usa a voz do aparelho.
// Assim o áudio nunca fala um preço errado. Para voltar a ter voz gravada, grave de
// novo com o texto novo e troque o "texto" aqui.

// Voz: Helena. Gravados em 23/10/2026.
export const audiosGravados = [
  {
    arquivo: 'audio/passos/passo-1.mp3',
    texto: 'Primeiro passo: escolha os produtos que você quer. É só tocar em Adicionar para pôr na lista. Quer levar mais de um? Toque no sinal de mais.',
  },
  {
    arquivo: 'audio/passos/passo-2.mp3',
    texto: 'Segundo passo: mande a sua lista para a loja pelo WhatsApp. O site já deixa a mensagem pronta para você.',
  },
  {
    arquivo: 'audio/passos/passo-3.mp3',
    texto: 'Terceiro passo: a loja manda a chave Pix. Você paga, e só depois disso o pedido sai para a entrega.',
  },
  {
    arquivo: 'audio/passos/passo-4.mp3',
    texto: 'Último passo: a compra chega na sua casa. Quem receber assina no celular do entregador, e pronto!',
  },
  {
    arquivo: 'audio/produtos/arroz.mp3',
    texto: 'Arroz branco, no pacote de 5 quilos. Sai por 25 reais e 90 centavos cada. Se você levar 6 ou mais, cada um fica por 23 reais e 90 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/feijao.mp3',
    texto: 'Feijão carioca, no pacote de 1 quilo. Sai por 8 reais e 50 centavos cada. Se você levar 6 ou mais, cada um fica por 7 reais e 60 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/oleo.mp3',
    texto: 'Óleo de soja, na garrafa de 900 mililitros. Sai por 7 reais e 90 centavos cada. Se você levar 12 ou mais, cada um fica por 6 reais e 90 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/cafe.mp3',
    texto: 'Café torrado e moído, no pacote de 500 gramas. Sai por 18 reais e 90 centavos cada. Se você levar 4 ou mais, cada um fica por 16 reais e 90 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/leite.mp3',
    texto: 'Leite integral, na caixa de 1 litro. Sai por 5 reais e 40 centavos cada. Se você levar 12 ou mais, cada um fica por 4 reais e 80 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/detergente.mp3',
    texto: 'Detergente, no frasco de 500 mililitros. Sai por 2 reais e 90 centavos cada. Se você levar 6 ou mais, cada um fica por 2 reais e 40 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/sabao-po.mp3',
    texto: 'Sabão em pó, na caixa de 1,6 quilos. Sai por 19 reais e 90 centavos cada. Se você levar 3 ou mais, cada um fica por 17 reais e 90 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
  {
    arquivo: 'audio/produtos/papel-higienico.mp3',
    texto: 'Papel higiênico, no pacote com 12 rolos. Sai por 21 reais e 90 centavos cada. Se você levar 3 ou mais, cada um fica por 19 reais e 50 centavos. Para pôr na sua lista, é só tocar em Adicionar.',
  },
]
