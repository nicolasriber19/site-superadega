// Lista de produtos do site. É aqui que você troca nomes, preços e fotos.
//
// ATENÇÃO: estes 8 produtos e preços são EXEMPLOS para testar o site.
// Troque pela lista real da loja antes de publicar.
//
// Campos de cada produto:
//   id             nome curto, sem espaço nem acento (usado no código e no nome da foto)
//   nome           nome que aparece no card
//   unidade        tamanho da embalagem
//   categoria      mercearia, bebidas, limpeza ou higiene
//   preco          preço de uma unidade, em reais
//   precoAtacado   preço de cada unidade quando a pessoa leva a quantidade mínima
//   minimoAtacado  a partir de quantas unidades vale o preço de atacado
//   oferta         true para aparecer no filtro "Ofertas"
//   imagem         foto dentro de public/, ex.: 'img/produtos/arroz.webp' (deixe '' enquanto não tiver foto)
//   alt            descrição da foto para o leitor de tela

export const PRECOS_SAO_EXEMPLO = true

// Botões de filtro que aparecem acima dos produtos (RF-12 e RF-13).
// "id" precisa ser igual ao campo "categoria" dos produtos.
// "todos" e "ofertas" são especiais: mostram tudo e só o que está em oferta.
export const categorias = [
  { id: 'todos', nome: 'Todos', icone: 'todos' },
  { id: 'ofertas', nome: 'Ofertas', icone: 'etiqueta' },
  { id: 'mercearia', nome: 'Mercearia', icone: 'mercearia' },
  { id: 'bebidas', nome: 'Bebidas', icone: 'bebidas' },
  { id: 'limpeza', nome: 'Limpeza', icone: 'limpeza' },
  { id: 'higiene', nome: 'Higiene', icone: 'higiene' },
]

export const produtos = [
  {
    id: 'arroz',
    nome: 'Arroz branco',
    unidade: 'Pacote de 5 kg',
    categoria: 'mercearia',
    preco: 25.9,
    precoAtacado: 23.9,
    minimoAtacado: 6,
    oferta: true,
    imagem: 'img/produtos/arroz.webp',
    alt: 'Pacote de arroz branco de 5 kg',
  },
  {
    id: 'feijao',
    nome: 'Feijão carioca',
    unidade: 'Pacote de 1 kg',
    categoria: 'mercearia',
    preco: 8.5,
    precoAtacado: 7.6,
    minimoAtacado: 6,
    oferta: false,
    imagem: 'img/produtos/feijao.webp',
    alt: 'Pacote de feijão carioca de 1 kg',
  },
  {
    id: 'oleo',
    nome: 'Óleo de soja',
    unidade: 'Garrafa de 900 ml',
    categoria: 'mercearia',
    preco: 7.9,
    precoAtacado: 6.9,
    minimoAtacado: 12,
    oferta: true,
    imagem: 'img/produtos/oleo.webp',
    alt: 'Garrafa de óleo de soja de 900 ml',
  },
  {
    id: 'cafe',
    nome: 'Café torrado e moído',
    unidade: 'Pacote de 500 g',
    categoria: 'mercearia',
    preco: 18.9,
    precoAtacado: 16.9,
    minimoAtacado: 4,
    oferta: false,
    imagem: 'img/produtos/cafe.webp',
    alt: 'Pacote de café torrado e moído de 500 g',
  },
  {
    id: 'leite',
    nome: 'Leite integral',
    unidade: 'Caixa de 1 litro',
    categoria: 'bebidas',
    preco: 5.4,
    precoAtacado: 4.8,
    minimoAtacado: 12,
    oferta: true,
    imagem: 'img/produtos/leite.webp',
    alt: 'Caixa de leite integral de 1 litro',
  },
  {
    id: 'detergente',
    nome: 'Detergente',
    unidade: 'Frasco de 500 ml',
    categoria: 'limpeza',
    preco: 2.9,
    precoAtacado: 2.4,
    minimoAtacado: 6,
    oferta: false,
    imagem: 'img/produtos/detergente.webp',
    alt: 'Frasco de detergente de 500 ml',
  },
  {
    id: 'sabao-po',
    nome: 'Sabão em pó',
    unidade: 'Caixa de 1,6 kg',
    categoria: 'limpeza',
    preco: 19.9,
    precoAtacado: 17.9,
    minimoAtacado: 3,
    oferta: false,
    imagem: 'img/produtos/sabao-po.webp',
    alt: 'Caixa de sabão em pó de 1,6 kg',
  },
  {
    id: 'papel-higienico',
    nome: 'Papel higiênico',
    unidade: 'Pacote com 12 rolos',
    categoria: 'higiene',
    preco: 21.9,
    precoAtacado: 19.5,
    minimoAtacado: 3,
    oferta: true,
    imagem: 'img/produtos/papel-higienico.webp',
    alt: 'Pacote com 12 rolos de papel higiênico',
  },
]
