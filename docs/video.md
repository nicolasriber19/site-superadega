# Vídeo de rolagem: Superadega (protótipo)

Plano, prompt e preparo do vídeo que vira uma sequência de quadros animada pela rolagem.
Base: `docs/plano.md` (lista de ativos; a pasta `public/frames/` estava reservada e vazia), `docs/imagens.md` (imagem-mestra e bloco de identidade) e `docs/identidade.md` (direção A2, "Premium claro").

## 1. A ideia

**Cena:** a compra do mês "se desembala" enquanto a pessoa rola a página.

| | Estado |
|---|---|
| **A, quadro inicial** | A capa: duas sacolas kraft cheias na bancada de madeira, pacotes de arroz e feijão, óleo, leite, pano de linho e caneca azul (`_originais/hero-higgsfield-capa2.png`, a imagem-mestra já aprovada) |
| **B, quadro final** | A mesma cozinha, a mesma luz e o mesmo ângulo, com os produtos **tirados das sacolas e arrumados em fila** na bancada, um ao lado do outro, e as sacolas vazias e dobradas atrás |

- **Por que essa cena:** é "estado A → estado B", que pede quadro inicial e quadro final. Os produtos são peças rígidas (pacotes, garrafa, caixa) que andam em linha reta, de dentro da sacola até a fila. E a cena mostra, sem texto, o que chega na compra do mês.
- **Onde entra no site:** uma seção "O que vem na sua compra", entre "Em números" e "O que você recebe".
  - Os quadros avançam conforme a seção atravessa a tela.
  - **Sem prender a página** (sem pin): é a regra do `docs/ux.md`.

## 2. Ficha do vídeo (como saiu, 24/10/2026)

| Item | Planejado | Como saiu |
|---|---|---|
| Modelo | Kling 3.0 pro | **Kling 3.0, 720p** (não o pro de 1080p) |
| Duração | 10 s | 10,04 s, 24 fps, 241 quadros, sem áudio, 3,8 MB |
| Resolução | 1920×1080 | **1284×716** (16:9) |
| Quadro inicial | `_originais/hero-higgsfield-capa2.png` | igual |
| Quadro final | gerado a partir da capa | `_originais/img/video-final.png` (2752×1536): sacolas fechadas de pé, arroz e feijão em fila na frente, óleo, leite, caneca e pano no lugar |
| Câmera e luz | parada, mesma luz | parada, sem corte; brilho médio de 133 a 139,5 (de 0 a 255) em todos os quadros: sem salto de luz |
| Original | `_originais/video/compra-desembala.mp4` | igual (fora do git) |

## 3. Custo real

| Peça | Planejado | Gasto | Por quê |
|---|---|---|---|
| Quadro final (Nano Banana Pro, 2K) | 2, ou 4 com nova tentativa | **8** | O botão Generate não mostrou andamento nos primeiros cliques, e a página "Usage" mostrou depois **4 gerações cobradas**. Parei de clicar, recarreguei e escolhi a melhor das 4. Foi um erro meu: 4 créditos acima do teto combinado para essa peça |
| Vídeo (Kling 3.0, 720p, 10 s) | 17,5, ou 35 | **15** | Uma geração só. Sem nova tentativa (seção 5) |
| **Total** | **19,5, ou 39** | **23** | dentro do teto de 39 |

**Regra que fica:** depois de clicar em Generate, conferir a página "Usage" antes de clicar de novo.

## 4. Prompts

### 4.1 Quadro final (imagem → imagem, referência: a capa)

O bloco de identidade é o mesmo de `docs/imagens.md`, sem mudar uma letra.

```
The exact same kitchen shown in the reference image: identical design, materials, colors, camera angle, lighting and background. Change only the following.
Subject: the groceries have been taken out of the two kraft paper bags and arranged in one neat straight row along the front of the wooden countertop, evenly spaced, labels facing the camera: unbranded packages of rice and beans, the plain bottle of golden cooking oil and the plain white milk carton; the two kraft paper bags stand empty and folded behind the row; the linen cloth and the blue enamel mug stay where they were.
Identity: a bright home kitchen with a light natural-wood countertop with visible grain, cream walls and pale square wall tiles, a soft beige linen cloth, brown kraft paper grocery bags, unbranded clear packages of rice and beans, a plain bottle of golden cooking oil, a plain white milk carton, a light blue enamel mug with a dark navy rim; soft natural morning light from a window on the left; warm, calm colors (cream, light wood, kraft brown, enamel blue); the customer appears only as adult hands and forearms in a loose light-beige linen shirt sleeve, never a face; any phone is a plain dark-gray smartphone with no brand marks
Framing: 16:9, the same camera position and lens as the reference, nothing cropped differently.
Light: soft natural morning light from the window on the left, the same exposure as the reference.
Background: the same kitchen, unchanged.
Finish: photorealistic, natural colors, ultra detailed.
Avoid: no people, no hands, no text, no letters, no numbers, no logos, no brand marks, no watermark, no new objects.
```

### 4.2 Vídeo (quadro inicial = capa, quadro final = 4.1)

```
One continuous shot with a completely locked, static camera: no camera movement, no zoom, no cuts, no shake. The groceries come out of the two kraft paper bags one by one and slide in smooth straight lines into one neat row along the front of the wooden countertop, exactly as in the end frame. Every package is a rigid object: it keeps its exact shape, size and label while it moves, nothing bends, melts or morphs, no new objects appear and nothing disappears. The bags settle empty behind the row. The kitchen, the light from the window on the left and the exposure stay exactly the same from start to end. No people, no hands, no text, no logos, no particles, no flicker. Photorealistic, calm, steady pace.
```

- **Negative prompt**, se o Kling pedir:
  > morphing, deformation, melting, extra objects, duplicated items, camera movement, zoom, cut, shake, flicker, lighting change, text, logo, watermark, hands, people, particles

## 5. O que aconteceu na geração

1. **Quadro final:** 4 gerações (seção 3). Escolhida a que tinha os mesmos produtos da capa. Uma delas trazia um pacote dourado a mais e foi descartada.
2. **Vídeo:** 1 geração. Conferido quadro a quadro:
   - **sem corte, sem salto de luz, sem pacote deformado;**
   - **problema 1:** a partir de **8,25 s**, os legumes que estavam nas sacolas da capa **somem**, porque o quadro final não tem legumes;
   - **problema 2:** alguns legumes saem das sacolas **em arco**, pulando, e as sacolas se fecham sozinhas.
3. **Decisão:** cortar o vídeo em **8 s**, antes dos legumes sumirem, e **não** gastar a nova tentativa. Uma segunda geração com os mesmos quadros inicial e final teria o mesmo problema: o quadro final é que não tem legumes.
   - O último quadro usado (8 s) mostra os legumes na frente das sacolas fechadas. Fica coerente.
   - **Para você julgar:** os legumes em arco (quadros `0068` a `0088`). Se não gostar, a correção é gerar um quadro final novo **com os legumes** na bancada e um vídeo novo (cerca de 17 créditos).

## 6. Preparo para o site (feito)

**Comandos** (ffmpeg 9.0.2, instalado com `winget install Gyan.FFmpeg`, com sua aprovação):

1. Ler o original:
   ```
   ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames,duration -of default=nw=1 _originais/video/compra-desembala.mp4
   ```
   - `-v error`: só mostra erros, sem o texto de abertura;
   - `-select_streams v:0`: olha só a imagem (a primeira faixa de vídeo);
   - `-show_entries stream=…`: mostra só largura, altura, fps, número de quadros e duração;
   - `-of default=nw=1`: uma informação por linha, sem cabeçalho.
2. Tirar os quadros:
   ```
   ffmpeg -t 8 -i _originais/video/compra-desembala.mp4 -vf "fps=15,scale=1280:-2" -c:v libwebp -quality 75 -compression_level 6 -start_number 1 public/frames/frame_%04d.webp
   ```
   - `-t 8`: usa só os primeiros 8 segundos (antes dos legumes sumirem);
   - `-i …`: o vídeo original;
   - `fps=15`: 15 quadros por segundo × 8 s = **120 quadros**;
   - `scale=1280:-2`: 1280 px de largura; a altura acompanha (714 px) e fica par;
   - `-c:v libwebp`: grava cada quadro em WebP;
   - `-quality 75`: boa imagem com arquivo pequeno;
   - `-compression_level 6`: compressão mais caprichada (mais lenta, arquivo menor);
   - `-start_number 1`: começa em `frame_0001`, não em `frame_0000`;
   - `frame_%04d.webp`: número com 4 dígitos.
3. Medir, entre quadros vizinhos, quanto a imagem muda (filtro `scene` do ffmpeg) e o brilho médio de cada quadro (filtro `signalstats`). Serve para achar os quadros a conferir e para provar que não há salto de luz.

**"Reduzir movimento":** fica parado o **último quadro**, `frame_0120.webp`.

## 7. Resultado da validação

- **Contagem:** **120 quadros**, de `frame_0001` a `frame_0120`, **sem buracos** (conferido com script).
- **Tamanho:** **5,3 MB** no total, de 42 a 46 KB cada, 1280×714. Abaixo do limite de 15 MB.
- **Luz:** brilho médio de 133,0 a 139,5. Sem salto.
- **Quadros com mais movimento:** `0072` (o maior, 0,0175), `0073`, `0045`, `0088`, `0079`, `0084`, `0078` e `0068`. Todos ainda abaixo de 0,02: nenhum corte de cena.
- **Quadros para abrir e conferir:** `0001` (começo, igual à capa), `0045`, `0060` (meio), `0068`, `0072`, `0073`, `0088` e `0120` (fim e "reduzir movimento").

## 8. No site (etapa 12)

- **Seção** "O que vem na sua compra" (`#compra`), entre "Em números" e "O que você recebe".
- **Como anda:** `src/sections/compra.js` desenha os quadros num `<canvas>` conforme a seção atravessa a tela. **Sem pin:** a página nunca fica presa.
- **Peso:** os quadros só carregam quando a seção está a uma tela e meia de distância. No celular (menos de 700 px) e com "economia de dados", carrega 1 a cada 2 (60 quadros, cerca de 2,7 MB).
- **Nitidez:** o canvas usa no máximo 2× a densidade da tela (`devicePixelRatio`).
- **Sem JavaScript ou com "reduzir movimento":** fica a imagem `frame_0120.webp`, com texto alternativo. O canvas é só visual (`aria-hidden`).
