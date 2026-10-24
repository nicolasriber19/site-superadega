# Ativos do site: Superadega (protótipo)

Origem, licença e data de cada imagem, quadro, áudio, ícone e fonte que o site usa.
Os originais pesados ficam em `_originais/`, fora do git (`.gitignore`). Nada vem de site de terceiros, e nada é carregado de CDN.

## 1. Imagens (`public/img/`)

| Arquivo no site | Medidas | Peso | Origem | Licença ou termo | Data | Prompt |
|---|---|---|---|---|---|---|
| `hero.webp` (+ `hero-600`, `hero-800`) | 1600×900 | 97 KB | Higgsfield, Nano Banana Pro. Original: `_originais/hero-higgsfield-capa2.png` | Termos do Higgsfield, plano pago (Plus) [a confirmar: cláusula de uso comercial] | 23/10/2026 | não registrado na época [recuperar no histórico do Higgsfield] |
| `entrega.webp` (+ 600, 800) | 1200×800 | 64 KB | Higgsfield. Original: `_originais/entrega-higgsfield-entrega1.png` | idem | 23/10/2026 | não registrado [idem] |
| `faixa.webp` (+ 800, 1200) | 1920×1080 | 134 KB | Higgsfield. Original: `_originais/faixa-higgsfield-1.png` | idem | 23/10/2026 | não registrado [idem] |
| `passo-1.webp` … `passo-4.webp` | 800×600 | 27 a 31 KB | Higgsfield, Nano Banana Pro, imagem → imagem com a capa. Originais: `_originais/img/passo-N.png` | idem | 23/10/2026 | `docs/imagens.md`, seção 4 |
| `compartilhar.jpg` | 1200×630 | 104 KB | Recorte da capa, sem IA | idem (vem da capa) | 23/10/2026 | — |
| `produtos/<id>.webp` (8) | 600×600 | 5 a 15 KB | Higgsfield, embalagens sem marca. Originais: `_originais/produtos/` | idem. **Aviso:** produto gerado por IA pode enganar quem compra (`docs/imagens.md`, seção 7) | 23/10/2026 | não registrado [idem] |
| `helena.webp` | 320×320 | 7,5 KB | Higgsfield, Nano Banana Pro, 1:1, 2K (texto → imagem, sem referência). Original: `_originais/img/helena.png` (2048×2048). Recorte central com ffmpeg | idem | 24/10/2026 | "Friendly flat editorial illustration, a warm shoulders-up portrait of a fictional Brazilian woman in her fifties named Helena…" (texto completo no histórico do Higgsfield; ilustração de pessoa fictícia, não é foto) |
| `placeholder.svg` | vetor | — | Desenhado no projeto | do projeto | 22/10/2026 | — |

## 2. Sequência de quadros (`public/frames/`)

| Arquivo | Medidas | Peso | Origem | Licença | Data | Prompt |
|---|---|---|---|---|---|---|
| `frame_0001.webp` … `frame_0120.webp` (120) | 1280×714 | 42 a 46 KB cada; **5,3 MB** no total | Tirados com ffmpeg dos 8 primeiros segundos de `_originais/video/compra-desembala.mp4` (Kling 3.0 no Higgsfield, quadro inicial = capa, quadro final = `_originais/img/video-final.png`) | Termos do Higgsfield [idem] | 24/10/2026 | `docs/video.md`, seção 4 |

- **No código:** `src/sections/compra.js` usa `TOTAL = 120`, igual ao número de arquivos (conferido: sem buracos).
- **"Reduzir movimento" e sem JavaScript:** `frame_0120.webp` como imagem comum, com texto alternativo.

## 3. Áudios (`public/audio/`)

| Arquivos | Origem | Licença | Data | Texto |
|---|---|---|---|---|
| `passos/passo-1…4.mp3`, `produtos/<id>.mp3` (8) | Higgsfield, voz "Helena" (ElevenLabs v4) | Termos do Higgsfield e da ElevenLabs [a confirmar: uso comercial da voz] | 23/10/2026 | O campo `texto` de cada um em `src/data/audios.js`, igual ao que a página mostra |

## 4. Ícones e favicon

| Arquivo | Origem | Licença | Data |
|---|---|---|---|
| `public/icons/icones.svg` (26 símbolos, 24×24, `currentColor`) | Desenhados no projeto | do projeto | 22 e 23/10/2026 |
| `public/favicon.svg` | Desenhado no projeto | do projeto | 22/10/2026 (ainda com o azul da identidade antiga) |

## 5. Fontes (`public/fonts/`)

| Família | Arquivo | Licença | Origem |
|---|---|---|---|
| Unbounded 800 | `unbounded/unbounded-latin-800-normal.woff2` | SIL OFL 1.1 (`OFL.txt` na pasta) | `@fontsource/unbounded` 5.3.0, via `npm pack` |
| Atkinson Hyperlegible Next 400 e 700 | `atkinson-hyperlegible-next/*.woff2` | SIL OFL 1.1 (`OFL.txt` na pasta) | `@fontsource/atkinson-hyperlegible-next` 5.3.0 |

Detalhes em `docs/identidade.md`, seção 6. Carregadas por `@font-face` em `src/styles/tokens.css`, com `font-display: swap`.

## 6. Regras de uso no código

- **HTML e CSS:** caminho absoluto (`/img/hero.webp`). O Vite acrescenta o `base` (`/site-superadega/`) no build.
- **JavaScript:** sempre `caminho('img/…')` de `src/lib/caminho.js`, que usa `import.meta.env.BASE_URL`.
- **Toda `<img>`:** `width` e `height` iguais às medidas reais do arquivo, e `alt` descritivo, ou `alt=""` quando é decorativa (faixa e passos, porque o texto ao lado já diz tudo).
- **Capa:** sem `loading="lazy"` e com `fetchpriority="high"`. As outras: `loading="lazy"` e `decoding="async"`.
- **Nomes:** minúsculas, sem acento e sem espaço. O GitHub Pages diferencia maiúsculas de minúsculas.
