# Identidade visual: Superadega (nome provisório)

Versão 1, 22/10/2026. Base: `docs/brief.md` (tom de voz: direto, acolhedor, econômico) e `docs/requisitos.md`.

**Status: decidido em 22/10/2026. Direção A, "Despensa de casa", aplicada ao site.**
- A escolha foi do dono do projeto, depois de ver as duas lado a lado.
- A direção B fica registrada abaixo como descartada. As fontes e os tokens dela saíram do projeto.
- **Página de conferência:** `npm run dev` → http://localhost:5173/site-superadega/estilo.html

## 1. Ponto de partida

| Campo | Valor |
|---|---|
| Marca | Superadega (nome provisório: coincide com uma rede real do DF; trocar antes de publicar) |
| Segmento | Supermercado de alimentos, compra do mês com entrega em casa e preço de atacado |
| Público | Quem faz a compra do mês e quer receber em casa, inclusive quem lê pouco ou não lê |
| Estilo | Direto, acolhedor e econômico; letra grande e botões grandes [suposição: confirmar] |
| Referência | Super Adega, só como referência de qualidade. Não copiar layout, logo nem cores |

**Clichê do segmento:** vermelho com amarelo, estouros de "OFERTA!", letra condensada em itálico, encarte lotado e o verde de hortifruti com folhinhas.
- As cores provisórias de hoje, verde com etiqueta amarela, ficam perto demais desse clichê.

**Clichês de "site feito por IA" evitados nas duas direções:**
- degradê roxo;
- vidro fosco;
- emoji como ícone (os ícones são SVG próprios);
- sombra exagerada (as duas direções não usam sombra).

## 2. Direção A: "Despensa de casa"

**Conceito:** a compra do mês chegando na cozinha de casa, arrumada e tranquila.
**Como foge do clichê:**
- creme e azul de louça esmaltada no lugar de vermelho e amarelo;
- sem estouros e sem itálico;
- o preço de atacado aparece numa etiqueta azul calma.

| Nome | Hex | Papel | Token |
|---|---|---|---|
| Arroz | `#F7F3EA` | fundo | `--cor-fundo` |
| Pote | `#FFFFFF` | superfície | `--cor-superficie` |
| Feijão | `#2B2118` | texto | `--cor-texto` |
| Café | `#5C5044` | texto secundário | `--cor-texto-secundario` |
| Louça azul | `#1E4D78` | destaque (botão, link, foco, etiqueta) | `--cor-destaque`; hover `#163A5C` em `--cor-destaque-escuro` |
| Juta | `#8C8071` | borda | `--cor-borda` |
| Tomate | `#A3312A` | erro | `--cor-erro` |

- **Fontes:**
  - Títulos: **Bricolage Grotesque** 800.
  - Texto: **Atkinson Hyperlegible Next** 400 e 700. Ela foi desenhada para máxima legibilidade, com letras que não se confundem, o que ajuda quem lê pouco.
- **Formas:**
  - cantos de 12 px no botão e 16 px no card;
  - card com borda de 1 px cor de juta, sem sombra.
- **Botão principal:** azul-louça, texto branco em Bricolage 800, ícone à esquerda e 56 px de altura. No hover, o azul escurece.
- **Card:** branco sobre o creme, nome em Bricolage, preço grande e etiqueta de atacado azul com texto branco.
- **Logotipo (HTML/CSS):** "superadega." em minúsculas, Bricolage 800, com o ponto em azul-louça.
- **Imagens:**
  - luz natural de janela lateral, de manhã;
  - fundo de madeira clara ou linho cru;
  - enquadramento 3/4 ou de cima, com mãos guardando as compras e sem rostos de banco de imagem;
  - materiais: madeira, linho, kraft e louça esmaltada azul;
  - produtos em fundo creme liso, com sombra curta.

## 3. Direção B: "Etiqueta de prateleira" (descartada)

> Não escolhida. Ela fica aqui como registro. Também tinha todos os contrastes aprovados, mas a A combina mais com o tom "acolhedor" do brief e usa uma fonte de texto feita para máxima legibilidade.

**Conceito:** a clareza de uma etiqueta bem impressa: o nome, o preço e nada mais.
**Como foge do clichê:**
- quase monocromática, com um só azul-cobalto;
- réguas finas e números grandes;
- sem vermelho, sem amarelo e sem encarte lotado.

| Nome | Hex | Papel | Token |
|---|---|---|---|
| Concreto | `#F1F3F2` | fundo | `--cor-fundo` |
| Papel | `#FFFFFF` | superfície | `--cor-superficie` |
| Grafite | `#12181D` | texto e etiqueta de atacado | `--cor-texto` / `--cor-etiqueta` |
| Chumbo | `#4A545D` | texto secundário | `--cor-texto-secundario` |
| Cobalto | `#2340C8` | destaque (botão, link, foco) | `--cor-destaque`; hover `#1A2F96` em `--cor-destaque-escuro` |
| Aço | `#66717A` | borda | `--cor-borda` |
| Alerta | `#B42318` | erro | `--cor-erro` |

- **Fontes:**
  - Títulos e preços: **Archivo** 800, semicondensada (`font-stretch: 87.5%`).
  - Texto: **Public Sans** 400 e 700.
- **Formas:**
  - cantos de 6 px no botão e 4 px no card;
  - régua de 2 px grafite no topo do card, sem sombra.
- **Botão principal:** cobalto, texto branco em Archivo 800, em maiúsculas, com 56 px de altura. No hover, o cobalto escurece.
- **Card:** branco com régua grafite no topo, preço em Archivo e etiqueta de atacado preta com texto branco.
- **Logotipo (HTML/CSS):** "SUPERADEGA" em Archivo 800 semicondensada, com uma régua cobalto de 4 px embaixo.
- **Imagens:**
  - luz de estúdio, difusa e uniforme;
  - fundo branco ou concreto liso;
  - enquadramento frontal e centralizado, com muito espaço vazio;
  - materiais: papelão ondulado, prateleira metálica, fita e etiqueta de papel;
  - capa com caixas de compra empilhadas na porta de casa.

## 4. Comum às duas

- **Espaços (escala de 4 e 8 px):** `--espaco-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-6` 24 · `-8` 32 · `-12` 48 · `-16` 64.
- **Tamanhos (nenhum abaixo de 16 px):** `--texto-p` 16 · `--texto-m` 18 (texto corrido) · `--texto-g` 22 · `--titulo-3` 24 · `--titulo-2` 32 · `--titulo-1` de 36 a 52 px.
- **Altura do botão principal:** `--altura-botao` 56 px, acima do mínimo de 44 px (RNF-09).

## 5. Contraste (WCAG 2.1 AA)

**Fórmula:** razão = (L1 + 0,05) / (L2 + 0,05), onde L é a luminância relativa de cada cor e L1 é a mais clara.
- Mínimo de **4,5:1** para texto normal.
- Mínimo de **3:1** para texto grande e para bordas e foco.
- Calculado em 22/10/2026 com um script lendo os valores do `tokens.css`.

| Par | A | B | Mínimo | Resultado |
|---|---|---|---|---|
| Texto sobre fundo | 14,22 | 16,05 | 4,5 | passa |
| Texto sobre superfície | 15,75 | 17,89 | 4,5 | passa |
| Secundário sobre fundo | 7,06 | 6,93 | 4,5 | passa |
| Secundário sobre superfície | 7,82 | 7,73 | 4,5 | passa |
| **Branco sobre destaque (texto do botão)** | **8,79** | **7,96** | 4,5 | passa |
| Branco sobre destaque escuro (hover) | 11,71 | 11,11 | 4,5 | passa |
| Link (destaque) sobre fundo | 7,94 | 7,14 | 4,5 | passa |
| Link sobre superfície | 8,79 | 7,96 | 4,5 | passa |
| Erro sobre fundo | 6,26 | 5,90 | 4,5 | passa |
| Erro sobre superfície | 6,93 | 6,57 | 4,5 | passa |
| Borda sobre fundo | 3,49 | 4,48 | 3 | passa |
| Borda sobre superfície | 3,86 | 4,99 | 3 | passa |
| Foco e borda do botão sobre fundo | 7,94 | 7,14 | 3 | passa |
| Branco sobre etiqueta de atacado | 8,79 | 17,89 | 4,5 | passa |

O botão principal das duas direções tem texto branco sobre azul. Laranja e amarelo foram evitados de propósito, porque texto branco sobre eles costuma reprovar.

## 6. Fontes: licença e origem

| Família | Licença | Origem | Arquivos no projeto |
|---|---|---|---|
| Bricolage Grotesque | SIL OFL 1.1 | `@fontsource/bricolage-grotesque` 5.3.0 (npm) | `public/fonts/bricolage-grotesque/` (800) + `OFL.txt` |
| Atkinson Hyperlegible Next | SIL OFL 1.1 | `@fontsource/atkinson-hyperlegible-next` 5.3.0 | `public/fonts/atkinson-hyperlegible-next/` (400, 700) + `OFL.txt` |
| Archivo (B, descartada) | SIL OFL 1.1 | `@fontsource-variable/archivo` 5.3.0 | removida do projeto |
| Public Sans (B, descartada) | SIL OFL 1.1 | `@fontsource/public-sans` 5.3.0 | removida do projeto |

- **Como foram baixadas:** com `npm pack`, numa pasta temporária. Só os `.woff2` do subconjunto **latin**, que vai de `U+0000` a `U+00FF` e tem todos os acentos do português, foram copiados.
- **Sem dependência nova:** o `package.json` continua só com o `vite`, como no `docs/stack.md`.
- **Carregamento:** os `@font-face` ficam em `src/styles/tokens.css`, com `font-display: swap`. Assim o texto aparece na hora, com a fonte do aparelho, e troca quando a fonte chega.
- **Peso:** 3 arquivos `.woff2`, cerca de 52 KB.

## 7. Como foi aplicada no site (22/10/2026)

1. **`tokens.css`:** ficou só com a direção A, no `:root`. Saíram o bloco da B e as fontes dela.
2. **Tokens antigos trocados pelos novos** em `base.css`, `sections.css` e `animacao.css`:
   - o branco virou `--cor-superficie`;
   - o verde-claro virou `--cor-fundo` (creme);
   - o verde virou `--cor-destaque` (azul-louça);
   - o amarelo virou `--cor-etiqueta` (azul com texto branco). **O amarelo saiu do site.**
3. **As 14 cores escritas fora do `tokens.css` viraram tokens:**
   - a sombra da barra "Ver lista" foi trocada por um anel branco, porque a direção A não usa sombra;
   - o quadro de assinatura (`entrega.js`) lê cores e fonte dos tokens com `getComputedStyle`.
4. **Fontes:** títulos, botões, preços e números grandes usam a Bricolage 800. O texto usa a Atkinson.
5. **Logotipo tipográfico:** "superadega." em `.marca`, no `index.html` e no `privacidade.html`. O `favicon.svg` e o `placeholder.svg` ganharam as cores novas.

**Regra daqui em diante:** nenhuma cor nem fonte fica escrita fora do `tokens.css`. A exceção são os arquivos de imagem SVG, que guardam as próprias cores.
