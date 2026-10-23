# Experiência do visitante (UX): Superadega (protótipo)

Versão 1, 22/10/2026. Base: `docs/brief.md`, `docs/requisitos.md`, `docs/plano.md` e `docs/identidade.md`.

- Este documento descreve a página e o motivo de cada escolha. As 7 propostas da versão 1 foram feitas em 22/10/2026 (seção 10).
- Novas propostas, quando surgirem, entram na seção 10 e só viram código numa etapa aprovada à parte.

## 0. Ponto de partida

| Campo | Valor |
|---|---|
| Público | Quem faz a compra do mês e quer receber em casa, inclusive quem lê pouco ou não lê (brief, RF-06) |
| Ação principal | Montar a lista e **enviar o pedido pelo WhatsApp da loja**, pagando com Pix antes da entrega. Na página, começa em "Fazer minha compra" e termina em "Enviar pedido no WhatsApp" |
| Seções | Topo, Capa, Quem somos, Como funciona, O que você recebe, Produtos, Finalizar pedido, Rodapé. Páginas à parte: Privacidade e Entrega (só o entregador usa) |
| Animação | 1) **Card:** ao tocar em Adicionar, + ou −, o card encolhe para 96% e volta em 0,25 s. 2) **Capa com profundidade:** enquanto a capa sai da tela, a foto desce mais devagar que a página (até 15% da altura dela) e sai de um zoom de 108% para 100%. 3) **Sacola que enche:** o ícone da sacola (botão "Lista" e barra "Ver lista") se enche conforme a lista cresce (cheia com 20 unidades, `UNIDADES_SACOLA_CHEIA` em `src/data/config.js`) e dá um pulinho a cada unidade a mais. 4) **Faixa com foto:** entre "Como funciona" e "O que você recebe", uma foto de ponta a ponta anda mais devagar que a página, como a paisagem vista de uma janela. Com "reduzir movimento", nada se move: o card só acende a borda, a capa e a faixa ficam paradas e a sacola mostra o nível sem pulinho |
| Critérios | Quem lê pouco monta e envia um pedido sozinho (RF-06). O produto só sai depois do Pix. Botões de 44 px ou mais (RNF-09) |
| Tom | Direto, acolhedor e econômico. Nunca "Corra, só hoje!" nem "O mais barato da cidade" |

**Regras desta página**
- O celular vem primeiro (375 px). Depois, o desktop (1280 px).
- Cada tela tem uma mensagem só.
- Nenhuma seção fica fixada (pin). As animações de rolagem são a da capa e a da faixa com foto: só CSS (`animation-timeline`), sem biblioteca. Navegador sem suporte mostra as fotos paradas. A pasta `public/frames/` continua vazia.
- Botão diz o que acontece. Nunca "Clique aqui".

## 1. Jornada em 5 momentos

| Momento | O que acontece | O que a página faz |
|---|---|---|
| 1. De onde chega | Um link mandado no WhatsApp ou nas redes, aberto no celular. Muitas vezes com pressa ou lendo pouco. | Abre leve (LCP de 1,4 s no celular) e com letra grande. |
| 2. Primeiro segundo | Lê "Sua compra do mês, entregue em casa" e vê o botão azul. | O título e "Fazer minha compra" aparecem sem rolar. |
| 3. Dúvida que surge | "Como eu pago? Quando chega? É confiável?" | "Como funciona" responde em 4 passos com número e desenho, e "Ouvir" lê em voz alta. |
| 4. Prova que convence | "O pedido só sai depois do pagamento", o preço de atacado no card, o total sempre à vista e a assinatura na entrega. | O aviso do Pix aparece duas vezes (passo 3 e Finalizar). O card mostra "Leve mais 3 e pague R$ 23,90". A barra mostra o total. |
| 5. Onde age | Toca em "+" nos produtos e, em "Finalizar", toca em **"Enviar pedido no WhatsApp"**. | O WhatsApp abre com o pedido escrito, e a tela diz "Quase pronto!". |

## 2. Ordem das seções e por quê

| # | Seção | Mensagem única | Dúvida que responde | Por que está aqui |
|---|---|---|---|---|
| 1 | Topo | Ajuda e lista sempre à mão | "Onde peço ajuda? Quanto já escolhi?" | Socorro e contador desde o início |
| 2 | Capa | Sua compra do mês, entregue em casa | "O que é isto?" | Diz o que é e já oferece a ação |
| 3 | Quem somos | Supermercado de compra do mês, com preço de atacado | "Quem vende?" | Confiança antes de pedir dados |
| 4 | Como funciona | Escolha, envie, pague o Pix, receba e assine | "Como funciona? Quando pago?" | Tira o medo do pagamento antes dos produtos |
| — | Faixa com foto | Do mercado até a sua porta | — | Pausa visual entre o "como" e o "o quê"; não é uma seção, só uma frase sobre a foto |
| — | Em números | até 17% · 5 dias · 3 horários · 1 Pix | "Vale a pena?" | Números grandes, tirados dos dados do site (`src/sections/numeros.js`); nada escrito à mão |
| 5 | O que você recebe | Tudo na sua porta, no dia escolhido | "O que chega e como?" | Fecha as dúvidas e leva aos produtos |
| 6 | Produtos | Toque no + para pôr na lista | "O que tem e quanto custa?" | Aqui a pessoa age |
| 7 | Finalizar pedido | Escolha dia e hora e envie pelo WhatsApp | "Como eu termino?" | Fim natural da lista |
| 8 | Rodapé | Ficou com dúvida? Fale com a loja | "E se eu travar?" | Saída humana para quem não conseguiu |

- **Quem somos:** antes dizia 3 coisas (o que é, como funciona e o atacado). Agora diz só "o que é + atacado". O "como" fica na seção 4.
- **Por que os produtos vêm depois de 3 seções:** quem já confia não precisa rolar, porque "Fazer minha compra" (capa) e "Pular para os produtos" (teclado) vão direto ao catálogo.

## 3. Rascunhos de cada tela

Os sinais `[?]`, `[sacola]`, `[+]` e `[-]` representam os ícones SVG do site. O site não usa emoji. `▓` é a faixa escura de protótipo.

### 3.1 Celular (375 px)

```
TELA 1: Topo + Capa                         TELA 2: Quem somos
┌───────────────────────────────┐           ┌───────────────────────────────┐
│▓ Site de teste. Loja fictícia,▓│           │ Quem somos                    │
│▓ sem relação com a Super Adega▓│           │ Somos um supermercado de      │
│ superadega.                   │           │ alimentos para a compra do    │
│ [[?] Ajuda] [[sacola] Lista 0]│           │ mês. Levando mais unidades,   │
├───────────────────────────────┤           │ você paga preço de atacado.   │
│ Sua compra do mês,            │           └───────────────────────────────┘
│ entregue em casa              │
│ Escolha os produtos, pague    │           TELA 3: Como funciona (4 cards empilhados)
│ com Pix e receba no dia e na  │           ┌───────────────────────────────┐
│ hora que você escolher.       │           │ Como funciona                 │
│ ┌───────────────────────────┐ │           │ ┌───────────────────────── 1 ┐│
│ │ [sacola] Fazer minha      │ │ ← AÇÃO    │ │ [desenho]                  ││
│ │          compra           │ │           │ │ Escolha                    ││
│ └───────────────────────────┘ │           │ │ Toque nos produtos que você││
│ ┌───────────────────────────┐ │           │ │ quer e nas quantidades.    ││
│ │   foto da capa (16:9)     │ │           │ │ [Ouvir]                    ││
│ └───────────────────────────┘ │           │ └────────────────────────────┘│
└───────────────────────────────┘           │  … 2 Envie · 3 Pague o Pix ·  │
                                            │    4 Receba e assine          │
                                            └───────────────────────────────┘

TELA 4: O que você recebe                   TELA 5: Produtos
┌───────────────────────────────┐           ┌───────────────────────────────┐
│ O que você recebe             │           │ Produtos                      │
│ [casa]  A compra na sua porta │           │ [Produtos e preços de exemplo]│
│ [cal.]  No dia e horário      │           │ [Todos][Ofertas][Mercearia]   │
│         que você escolheu     │           │ [Bebidas][Limpeza][Higiene]   │
│ [etiq.] Preço de atacado      │           │ ┌─────────────┐┌─────────────┐│
│ [ok]    A loja confirma no    │           │ │[Oferta]     ││             ││
│         WhatsApp antes de sair│           │ │  [foto]     ││  [foto]     ││
│ ┌───────────────────────────┐ │           │ │Arroz branco ││Feijão carioc││
│ │   foto da entrega (3:2)   │ │           │ │Pacote 5 kg  ││Pacote 1 kg  ││
│ └───────────────────────────┘ │           │ │R$ 25,90 cada││R$ 8,50 cada ││
└───────────────────────────────┘           │ │A partir de 6││A partir de 6││
                                            │ │[Ouvir]      ││[Ouvir]      ││
                                            │ │[[+]Adicionar││[[+]Adicionar││
                                            │ └─────────────┘└─────────────┘│
                                            │ ┌───────────────────────────┐ │
                                            │ │[sacola] Ver lista: 3 itens│ │ ← barra fixa
                                            │ │         · R$ 77,70        │ │   (só com itens)
                                            │ └───────────────────────────┘ │
                                            └───────────────────────────────┘

TELA 6: Finalizar pedido                    TELA 7: Rodapé
┌───────────────────────────────┐           ┌───────────────────────────────┐
│ Finalizar pedido              │           │ Fale com a gente              │
│ Sua lista                     │           │ Dúvidas sobre produtos,       │
│ 3× Arroz branco      R$ 77,70 │           │ entrega ou pagamento? Chame a │
│ Total               R$ 77,70  │           │ loja no WhatsApp.             │
│ Dia da entrega                │           │ [[balão] Falar no WhatsApp]   │
│ [Amanhã][ Qui ][ Sex ]        │           │ [Privacidade]                 │
│ [ Sáb ][ Dom ]                │           │ [[sacola] Fazer minha compra] │ ← ação no fim
│ Horário                       │           │ [Voltar ao topo]              │
│ [Manhã][Tarde][Noite]         │           │ Superadega (nome provisório)  │
│ Seu nome [______________]     │           └───────────────────────────────┘
│ Endereço [______________]     │
│ [x] Vou mandar o endereço     │
│     por áudio no WhatsApp     │
│ ! Você paga com Pix antes da  │
│   entrega.                    │
│ ┌───────────────────────────┐ │
│ │[balão] Enviar pedido no   │ │ ← AÇÃO FINAL
│ │        WhatsApp           │ │
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

### 3.2 Desktop (1280 px; o conteúdo fica limitado a 1200 px e centralizado)

```
TELA 1: Topo + Capa
┌──────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓ Site de teste. Loja fictícia, sem relação com a Super Adega ▓▓▓▓▓▓│
│ superadega.   Como funciona · Produtos · Finalizar [? Ajuda][Lista 0]│
├─────────────────────────────────────┬────────────────────────────────────────┤
│ Sua compra do mês,                  │                                        │
│ entregue em casa                    │          foto da capa (16:9)           │
│ Escolha os produtos, pague com Pix  │                                        │
│ e receba no dia e na hora certa.    │                                        │
│ [[sacola] Fazer minha compra] ← AÇÃO│                                        │
└─────────────────────────────────────┴────────────────────────────────────────┘

TELA 2: Quem somos (texto de no máximo 60 caracteres por linha, à esquerda)

TELA 3: Como funciona (4 cards lado a lado)
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ [desenho]     1  │ [desenho]     2  │ [desenho]     3  │ [desenho]     4  │
│ Escolha          │ Envie            │ Pague o Pix      │ Receba e assine  │
│ Toque nos…       │ Mande a lista…   │ A loja manda…    │ A compra chega…  │
│ [Ouvir]          │ [Ouvir]          │ [Ouvir]          │ [Ouvir]          │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘

TELA 4: O que você recebe (lista à esquerda, foto 3:2 à direita)

TELA 5: Produtos (6 filtros numa linha; 5 cards por linha em 1280 px)
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Todos][Ofertas][Mercearia][Bebidas][Limpeza][Higiene]                       │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                                 │
│ │card  │ │card  │ │card  │ │card  │ │card  │   barra "Ver lista" centralizada│
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   no pé, até 480 px de largura  │
└──────────────────────────────────────────────────────────────────────────────┘

TELA 6: Finalizar (uma coluna de até 640 px: lista, dia, horário, dados, avisos, Enviar)

TELA 7: Rodapé (botões lado a lado: Falar no WhatsApp · Privacidade ·
        Fazer minha compra · Voltar ao topo)
```

## 4. Onde fica o botão principal

| Ponto da página | Celular | Desktop |
|---|---|---|
| 1ª tela (capa) | "Fazer minha compra", sem rolar (o botão termina a 496 px do topo numa tela de 667 px) | Ao lado da foto |
| Produtos | "Adicionar", depois [-] quantidade [+], em cada card | Igual |
| Com itens na lista | Barra fixa "Ver lista: n itens · R$ total" no pé da tela, que leva ao Finalizar | Igual, centralizada |
| Finalizar | "Enviar pedido no WhatsApp", largo, no fim do formulário | Igual |
| Fim da página (rodapé) | "Fazer minha compra" (lista vazia) ou "Ver minha lista" (com itens) | Igual |

**Critério "a ação principal aparece no fim da página":** cumprido pelo botão do rodapé, que diz "Fazer minha compra" com a lista vazia e "Ver minha lista" com itens, além do "Enviar pedido" do Finalizar.

## 5. Navegação

- **Celular:** sem menu escondido (sanduíche), para não esconder caminhos de quem lê pouco. Só dois botões fixos no topo: "Ajuda" (WhatsApp) e "Lista" (vai ao Finalizar).
- **Desktop:** a partir de 900 px, âncoras de texto no topo: "Como funciona · Produtos · Finalizar".
- **Âncoras:** "Fazer minha compra" vai para `#produtos`, "Lista" e a barra vão para `#finalizar`, e a marca vai para `#capa`.
- **Voltar ao topo:** link no rodapé, porque a página é longa no celular.
- **Pular a animação:**
  - nenhuma animação esconde conteúdo ou bloqueia o toque: a do card dura 0,25 s, o pulinho da sacola 0,3 s, e a capa e a faixa com foto só acompanham a rolagem (não prendem a página);
  - o caminho para pular o conteúdo inicial é o link **"Pular para os produtos"**, que aparece no 1º Tab;
  - com "reduzir movimento", o card não se move, a capa e a faixa ficam paradas, a sacola não pula e a rolagem suave desliga.

## 6. Estados

| Estado | O que a pessoa vê | Situação |
|---|---|---|
| Carregando a página | Texto na letra do aparelho até a Bricolage e a Atkinson chegarem (`font-display: swap`). A fonte do título é pré-carregada | Feito |
| Carregando imagens | Fotos com `loading="lazy"` e tamanho reservado, para a página não pular (CLS de 0,019) | Feito |
| Imagens da animação | Não existem. As animações são só CSS, usando a foto da capa e o ícone da sacola | — |
| Erro de imagem | Se a foto de um produto falhar, troca pelo `placeholder.svg` e o nome continua visível | Feito |
| Lista vazia | "Sua lista está vazia." e o botão "Escolher produtos" | Feito |
| Filtro sem produtos | "Nenhum produto aqui por enquanto. Toque em 'Todos'." | Feito |
| Faltou algo ao enviar | Caixa "Falta pouco:" com a lista do que falta e o campo com borda vermelha. O leitor de tela lê na hora | Feito |
| WhatsApp bloqueado | Abre na mesma aba. A lista continua salva no aparelho | Feito |
| Sem voz em português | Os botões "Ouvir" somem | Feito |
| Falando / pausado | O botão "Ouvir" vira "Pausar" (azul-escuro) e, pausado, "Continuar". No áudio gravado, continua do ponto exato; na voz do aparelho, recomeça da frase onde parou. No fim da fala volta a "Ouvir". Tocar em outro "Ouvir" para o anterior | Feito |
| Voz do "Ouvir" | Fala em tom de conversa ("Olha só, arroz branco em oferta!…"). Toca o áudio gravado com voz de IA (Helena, ElevenLabs v4 no Higgsfield; `public/audio/` e `src/data/audios.js`). Se o texto mudou desde a gravação (ex.: preço novo) ou o arquivo falhar, usa a melhor voz em português do aparelho, nunca um preço antigo | Feito |
| Sem JavaScript | "Para ver os produtos, ative o JavaScript do navegador ou chame a loja no WhatsApp." | Feito |
| Nome de produto longo | Quebra em mais linhas e **nunca** é cortado com "…". O card cresce, e o grid alinha a linha | Feito (conferir com a lista real) |
| Lista muito grande | A mensagem do WhatsApp pode ficar longa demais. Plano B: botão "Copiar pedido" | Feito: aparece depois de todo envio, com texto para copiar à mão se o navegador não deixar |
| Barra "Ver lista" no Finalizar | Ali a barra repete o que está na tela e pode cobrir o "Enviar pedido". Esconder a barra enquanto o Finalizar estiver visível | Feito |

## 7. Acessibilidade

**Ordem do Tab (página principal):**
1. "Pular para os produtos"
2. superadega. (marca)
3. Ajuda
4. Lista
5. Fazer minha compra
6. Ouvir, em cada um dos 4 passos
7. 6 filtros
8. Ouvir e Adicionar (ou −/+), em cada card
9. Dia da entrega (um Tab, e as setas trocam o dia)
10. Horário (um Tab, e as setas trocam)
11. Seu nome
12. Endereço (pulado quando "por áudio" está marcado)
13. Vou mandar o endereço por áudio
14. Enviar pedido no WhatsApp
15. Falar no WhatsApp
16. Privacidade

**Regras:**
- **Foco visível:** contorno azul-louça de 3 px com afastamento de 3 px (7,94:1 sobre o creme). Nas opções de dia e horário, o contorno aparece no "botão" inteiro.
- **Contraste:** 13 pares da identidade, de 3,49:1 (borda) a 15,75:1. A faixa de protótipo tem 15,75:1. Tabela em `docs/identidade.md`.
- **prefers-reduced-motion:** o card não se move (só a borda acende), a capa e a faixa ficam paradas, a sacola mostra o nível sem pulinho e a rolagem suave desliga.
- **Leitor de tela:**
  - avisos falados ("Arroz branco: 3 na lista", "Ofertas: 4 produtos");
  - o ponto do logotipo fica oculto;
  - ícones com `aria-hidden`; o nível da sacola é só visual, e quem informa é o número ("Lista 3 itens").
- **Toque:** todos os alvos com 44 px ou mais (botões com 48 px, e 56 px no principal).

**Texto alternativo de cada imagem do plano:**

| Imagem | Onde | Texto alternativo |
|---|---|---|
| `img/hero.webp` | Capa | "Sacolas da compra do mês sobre a bancada da cozinha, com arroz, feijão e óleo" |
| `img/passo-1.webp` … `passo-4.webp` | Como funciona | `alt=""` (decorativa: o número, o título e a frase do passo já dizem tudo) |
| `img/faixa.webp` (e `-800`, `-1200`) | Faixa com foto | `alt=""` (decorativa: a mensagem está na frase "Do mercado até a sua porta.") |
| `img/entrega.webp` | O que você recebe | "Mãos guardando a compra do mês no armário da cozinha" |
| `img/produtos/<id>.webp` | Cards | O campo `alt` de `src/data/produtos.js` (ex.: "Pacote de arroz branco de 5 kg"). As 8 fotos de exemplo foram geradas no Higgsfield, com embalagem sem marca; originais em `_originais/produtos/` |
| `img/placeholder.svg` | Onde a foto ainda não existe | `alt=""` (não descreve o produto; o nome está logo abaixo) |
| `icons/icones.svg` (todos) | Botões, passos, filtros | `aria-hidden="true"` (a palavra ao lado já diz) |
| `favicon.svg` | Aba do navegador | Não se aplica |

## 8. Microtextos (tom: direto, acolhedor, econômico)

| Lugar | Texto |
|---|---|
| Faixa de protótipo | "Site de teste. Loja fictícia, sem relação com a rede Super Adega." |
| Capa: título | "Sua compra do mês, entregue em casa" |
| Capa: frase | "Escolha os produtos, pague com Pix e receba no dia e na hora que você escolher." |
| Capa: botão | "Fazer minha compra" |
| Quem somos | "Somos um supermercado de alimentos para a compra do mês. Levando mais unidades, você paga preço de atacado." |
| Como funciona | "Escolha" · "Envie" · "Pague o Pix" · "Receba e assine" |
| Passo 3 | "A loja manda a chave Pix. O pedido só sai depois do pagamento." |
| Card | "A partir de 6: R$ 23,90 cada" → "Leve mais 3 e pague R$ 23,90 cada" → "Preço de atacado: R$ 23,90 cada" |
| Botões do card | "Adicionar" · "Ouvir" (+/− com nome falado "Pôr mais 1" e "Tirar 1"). Enquanto fala, "Ouvir" vira "Pausar"; pausado, vira "Continuar" |
| Barra | "Ver lista: 3 itens · R$ 77,70" |
| Lista vazia | "Sua lista está vazia." + "Escolher produtos" |
| Pix | "Você paga com Pix antes da entrega. A loja manda a chave no WhatsApp. O pedido só sai depois do pagamento." |
| Erro ao enviar | "Falta pouco:" + "Escolha o dia da entrega." / "Escreva seu nome." … |
| Botão final | "Enviar pedido no WhatsApp" |
| Depois de enviar | "Quase pronto! No WhatsApp, toque em enviar. A loja responde com a chave Pix." |
| Rodapé | "Fale com a gente" · "Falar no WhatsApp" · "Privacidade" · "Fazer minha compra" (ou "Ver minha lista") · "Voltar ao topo" · "Copiar pedido" (depois do envio) |

**Nunca usar:**
- "Clique aqui";
- "Corra, só hoje!";
- "O mais barato da cidade";
- termos técnicos ("checkout", "SKU").

## 9. Três testes rápidos com uma pessoa real

Detalhes de preparação e a ficha de anotação estão em `docs/roteiro-teste.md`.

1. **5 segundos:** mostre a 1ª tela do celular por 5 segundos e tire. Pergunte: "O que este site vende? Como você paga?"
   - **Passa** se a pessoa disser "compra do mês" ou "supermercado" e "Pix".
2. **Tarefa:** "Coloque 6 pacotes de arroz e mande o pedido para a loja."
   - **Passa** se fizer sem ajuda, em até 5 minutos [proposta, como no RNF-14].
3. **Entendimento:** depois do envio, pergunte: "Quando a compra sai da loja?"
   - **Passa** se responder "depois que eu pagar o Pix".

## 10. Propostas e situação

Feitas em 22/10/2026:

| # | Proposta | Situação |
|---|---|---|
| 1 | Rodapé com "Fazer minha compra" (ou "Ver minha lista") e "Voltar ao topo" | Feito (`index.html`, `src/sections/rodape.js`) |
| 2 | Âncoras "Como funciona · Produtos · Finalizar" no topo, a partir de 900 px | Feito (`index.html`, `sections.css`) |
| 3 | Foto de produto quebrada vira `placeholder.svg` | Feito (`src/sections/produtos.js`) |
| 4 | Barra "Ver lista" some enquanto o Finalizar está na tela | Feito (`src/sections/finalizar.js`) |
| 5 | "Quem somos" com uma mensagem só | Feito (`index.html`) |
| 6 | Fotos e texto alternativo da capa e da entrega | Feito: fotos do Higgsfield em `public/img/` (capa em 600, 800 e 1600 px; entrega em 600, 800 e 1200 px, escolhidas pelo navegador com `srcset`). Originais em `_originais/` |
| 7 | "Copiar pedido" | Feito: aparece depois de todo envio. Se o navegador não deixar copiar, mostra o texto para copiar à mão |

Novas propostas entram aqui, com aprovação antes do código.

## 11. Lista de verificação no navegador

Use esta lista depois que a página estiver pronta. Abra `npm run dev` → http://localhost:5173/site-superadega/ ou o site publicado.

- [ ] **Celular (DevTools → ícone de celular → 375 × 667):** "Fazer minha compra" aparece sem rolar.
- [ ] **Fim da página:** há uma ação principal (rodapé, barra "Ver lista" ou "Enviar pedido").
- [ ] **Uma mensagem por seção:** cada uma dá para resumir numa frase.
- [ ] **Botões:** nenhum diz só "Clique aqui". Todos dizem o que acontece.
- [ ] **Imagens (DevTools → Elements):** cada `<img>` tem o `alt` da tabela da seção 7, ou `alt=""` quando é decorativa.
- [ ] **Teclado:** do topo da página, o 1º Tab mostra "Pular para os produtos", e o Tab segue a ordem da seção 7, sempre com o contorno azul visível.
- [ ] **Animação:** tocar em "+" faz o card mexer e voltar sem esconder nada.
- [ ] **Capa com profundidade (Chrome):** ao rolar, a foto da capa desce devagar e sai do zoom, sem abrir vão na moldura e sem cobrir "Quem somos".
- [ ] **Faixa com foto (Chrome):** ao rolar, a foto da porta anda mais devagar que a página, sem faixa vazia em cima ou embaixo, e a frase continua legível.
- [ ] **Fotos dos produtos:** os 8 cards mostram a foto do produto, e nenhuma cai no `placeholder.svg`.
- [ ] **Fotos dos passos:** os 4 cards do "Como funciona" mostram a foto no topo, com o número por cima, no canto direito.
- [ ] **Estilo premium (docs/identidade.md, seção 8):** a capa mostra "SUA COMPRA" / foto / "DO MÊS", e "Fazer minha compra" aparece sem rolar em 375 × 667. No computador, o cupom fica fixo à direita do formulário. Nada rola para o lado em 320, 375 e 1280 px.
- [ ] **Em números:** os 4 números batem com os dados (maior desconto de atacado, `DIAS_DE_ENTREGA` e faixas de horário).
- [ ] **Link compartilhado:** mandar o endereço do site no WhatsApp mostra a foto da capa e o título com "(site de teste)".
- [ ] **Sacola que enche:** com 0 itens a sacola está vazia, com 10 fica pela metade e com 20 ou mais fica cheia, no topo e na barra. Ela pula ao pôr um item e não pula ao tirar.
- [ ] **Menos movimento (DevTools → Ctrl+Shift+P → "Rendering" → prefers-reduced-motion: reduce):** o card não se move, só a borda acende. A capa fica parada, e a sacola mostra o nível sem pular.
- [ ] **Estados:** lista vazia, filtro vazio, envio com campos faltando e "Ouvir" sem voz mostram as mensagens da seção 6.
- [ ] **Ouvir, Pausar e Continuar:** no card, "Ouvir" toca a voz gravada da Helena com o preço por extenso ("25 reais e 90 centavos") e vira "Pausar"; "Pausar" para e vira "Continuar"; "Continuar" segue de onde parou.
- [ ] **Preço novo:** depois de mudar um preço em `src/data/produtos.js`, o "Ouvir" desse produto fala com a voz do aparelho e o preço novo (o áudio gravado só volta quando for regravado).
- [ ] **Barra "Ver lista":** não cobre o botão "Enviar pedido no WhatsApp".
- [ ] **Desktop (1280 px):** capa em 2 colunas, 4 passos numa linha e 5 cards por linha, sem rolagem para o lado.
- [ ] **Fontes (DevTools → Network → filtro Font):** 3 arquivos `.woff2` com status 200.
- [ ] **Console:** nenhum erro vermelho.
- [ ] **Testes reais:** os 3 testes da seção 9 foram feitos com pelo menos 1 pessoa.
