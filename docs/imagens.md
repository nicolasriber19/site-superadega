# Imagens do site: Superadega (protótipo)

Plano das imagens e prompts para o Higgsfield. O objetivo é que a cozinha, a luz e os objetos pareçam os mesmos em todas as fotos.
Direção de arte em `docs/identidade.md` (seção "Imagens"). Lista de ativos em `docs/plano.md` (seção 4).

## 0. O que já existe

| Arquivo | Onde | Original | Situação |
|---|---|---|---|
| `img/hero.webp` (+ 600 e 800) | Capa | `_originais/hero-higgsfield-capa2.png` | Aprovada. **É a imagem-mestra** |
| `img/entrega.webp` (+ 600 e 800) | O que você recebe | `_originais/entrega-higgsfield-entrega1.png` | Aprovada |
| `img/faixa.webp` (+ 800 e 1200) | Faixa com foto | `_originais/faixa-higgsfield-1.png` | Aprovada |
| `img/produtos/<id>.webp` (8) | Cards de produto | `_originais/produtos/` | Aprovadas, com o aviso da seção 7 |

O que falta: as fotos dos 4 passos do "Como funciona" e a imagem de pré-visualização do link.

## 1. Imagem-mestra

- **Mestra:** a capa que já existe. Mostra sacolas kraft na bancada de madeira clara, luz da janela à esquerda, caneca azul esmaltada e pano de linho. Ela não é gerada de novo.
- **Referência:** as fotos dos passos são **imagem → imagem**, sempre com o original da capa como referência.
- **Nunca uma foto de passo como referência de outra:** cada cópia de cópia muda um pouco a cena, e no fim ela fica diferente da capa.

## 2. Bloco de identidade

Vai **igual**, palavra por palavra, em todos os prompts:

```
a bright home kitchen with a light natural-wood countertop with visible grain, cream walls and pale square wall tiles, a soft beige linen cloth, brown kraft paper grocery bags, unbranded clear packages of rice and beans, a plain bottle of golden cooking oil, a plain white milk carton, a light blue enamel mug with a dark navy rim; soft natural morning light from a window on the left; warm, calm colors (cream, light wood, kraft brown, enamel blue); the customer appears only as adult hands and forearms in a loose light-beige linen shirt sleeve, never a face; any phone is a plain dark-gray smartphone with no brand marks
```

## 3. Tabela

| Arquivo | Onde aparece | Proporção | Resolução no site | Tipo | Modelo | Custo (créditos) |
|---|---|---|---|---|---|---|
| `passo-1.webp` | Como funciona, passo 1 "Escolha", no topo do card | 4:3 | 800×600 | imagem → imagem (referência: capa) | Nano Banana Pro, 2K | 2 |
| `passo-2.webp` | Como funciona, passo 2 "Envie" | 4:3 | 800×600 | imagem → imagem (referência: capa) | Nano Banana Pro, 2K | 2 |
| `passo-3.webp` | Como funciona, passo 3 "Pague o Pix" | 4:3 | 800×600 | imagem → imagem (referência: capa) | Nano Banana Pro, 2K | 2 |
| `passo-4.webp` | Como funciona, passo 4 "Receba e assine" | 4:3 | 800×600 | imagem → imagem (referência: capa) | Nano Banana Pro, 2K | 2 |
| `compartilhar.jpg` | Pré-visualização do link (WhatsApp e redes) | 1,91:1 | 1200×630 | recorte da capa, sem IA | — | 0 |

- **4:3:** a foto fica no topo do card, e o texto do passo vem logo abaixo. É mais baixa que a quadrada, para a página não ficar longa demais no celular.
- **800×600:** o card mais largo tem cerca de 360 px, na tela de tablet. 800 px dá nitidez dobrada.
- **Espaço livre:** o texto não fica por cima da foto, mas o círculo azul com o número do passo fica no **canto superior direito**. Esse canto precisa ficar calmo.
- **Nano Banana Pro:** é o mesmo modelo da capa e lida bem com imagem de referência.
- **JPG no `compartilhar.jpg`:** o WhatsApp mostra JPG em qualquer aparelho.

## 4. Prompts

Todos os prompts das fotos derivadas começam com a mesma frase. Depois vêm, nesta ordem: assunto → bloco de identidade → enquadramento e ângulo → luz → fundo → acabamento → proibições.

### passo-1.webp: "Escolha"

```
The exact same kitchen shown in the reference image: identical design, materials, colors, camera angle, lighting and background. Change only the following.
Subject: two hands hold a plain dark-gray smartphone just above the wooden countertop, the right thumb touching the screen; the screen shows only soft, blurred rows of small product photos (a rice package, a bean package, an oil bottle) with no readable text.
Identity: a bright home kitchen with a light natural-wood countertop with visible grain, cream walls and pale square wall tiles, a soft beige linen cloth, brown kraft paper grocery bags, unbranded clear packages of rice and beans, a plain bottle of golden cooking oil, a plain white milk carton, a light blue enamel mug with a dark navy rim; soft natural morning light from a window on the left; warm, calm colors (cream, light wood, kraft brown, enamel blue); the customer appears only as adult hands and forearms in a loose light-beige linen shirt sleeve, never a face; any phone is a plain dark-gray smartphone with no brand marks
Framing: 4:3, close-up from a slightly elevated three-quarter angle, the phone left of center, the top-right corner of the frame calm and empty.
Light: soft natural morning light from the window on the left, gentle shadows falling to the right.
Background: the countertop with the kraft paper bags and the blue enamel mug, softly out of focus.
Finish: photorealistic, natural colors, ultra detailed, shallow depth of field.
Avoid: no text, no letters, no numbers, no logos, no app icons, no brand marks, no watermark, no faces.
```

### passo-2.webp: "Envie"

```
The exact same kitchen shown in the reference image: identical design, materials, colors, camera angle, lighting and background. Change only the following.
Subject: two hands hold a plain dark-gray smartphone above the wooden countertop, the right thumb about to tap a round send button; the screen shows a simple chat with three empty rounded message bubbles (two pale green on the right, one white on the left) and no text.
Identity: a bright home kitchen with a light natural-wood countertop with visible grain, cream walls and pale square wall tiles, a soft beige linen cloth, brown kraft paper grocery bags, unbranded clear packages of rice and beans, a plain bottle of golden cooking oil, a plain white milk carton, a light blue enamel mug with a dark navy rim; soft natural morning light from a window on the left; warm, calm colors (cream, light wood, kraft brown, enamel blue); the customer appears only as adult hands and forearms in a loose light-beige linen shirt sleeve, never a face; any phone is a plain dark-gray smartphone with no brand marks
Framing: 4:3, close-up from a slightly elevated three-quarter angle, the phone left of center, the top-right corner of the frame calm and empty.
Light: soft natural morning light from the window on the left, gentle shadows falling to the right.
Background: the countertop with the kraft paper bags and the blue enamel mug, softly out of focus.
Finish: photorealistic, natural colors, ultra detailed, shallow depth of field.
Avoid: no text, no letters, no numbers, no logos, no app icons, no brand marks, no watermark, no faces.
```

### passo-3.webp: "Pague o Pix"

```
The exact same kitchen shown in the reference image: identical design, materials, colors, camera angle, lighting and background. Change only the following.
Subject: two hands hold a plain dark-gray smartphone above the wooden countertop; the screen is white and shows only one large green circle with a white check mark; behind it, the kraft paper grocery bags stand packed and folded closed, waiting on the countertop.
Identity: a bright home kitchen with a light natural-wood countertop with visible grain, cream walls and pale square wall tiles, a soft beige linen cloth, brown kraft paper grocery bags, unbranded clear packages of rice and beans, a plain bottle of golden cooking oil, a plain white milk carton, a light blue enamel mug with a dark navy rim; soft natural morning light from a window on the left; warm, calm colors (cream, light wood, kraft brown, enamel blue); the customer appears only as adult hands and forearms in a loose light-beige linen shirt sleeve, never a face; any phone is a plain dark-gray smartphone with no brand marks
Framing: 4:3, close-up from a slightly elevated three-quarter angle, the phone left of center, the top-right corner of the frame calm and empty.
Light: soft natural morning light from the window on the left, gentle shadows falling to the right.
Background: the countertop with the kraft paper bags and the blue enamel mug, softly out of focus.
Finish: photorealistic, natural colors, ultra detailed, shallow depth of field.
Avoid: no text, no letters, no numbers, no logos, no app icons, no brand marks, no watermark, no faces.
```

### passo-4.webp: "Receba e assine"

```
The exact same kitchen shown in the reference image: identical design, materials, colors, camera angle, lighting and background. Change only the following.
Subject: the delivery person's hand, in a plain navy-blue work sleeve with no logo, holds out a plain dark-gray smartphone with a blank white screen; the customer's index finger draws a simple signature scribble on it; the kraft paper grocery bags have just been set down on the countertop.
Identity: a bright home kitchen with a light natural-wood countertop with visible grain, cream walls and pale square wall tiles, a soft beige linen cloth, brown kraft paper grocery bags, unbranded clear packages of rice and beans, a plain bottle of golden cooking oil, a plain white milk carton, a light blue enamel mug with a dark navy rim; soft natural morning light from a window on the left; warm, calm colors (cream, light wood, kraft brown, enamel blue); the customer appears only as adult hands and forearms in a loose light-beige linen shirt sleeve, never a face; any phone is a plain dark-gray smartphone with no brand marks
Framing: 4:3, close-up from a slightly elevated three-quarter angle, the phone left of center, the top-right corner of the frame calm and empty.
Light: soft natural morning light from the window on the left, gentle shadows falling to the right.
Background: the countertop with the kraft paper bags and the blue enamel mug, softly out of focus.
Finish: photorealistic, natural colors, ultra detailed, shallow depth of field.
Avoid: no text, no letters, no numbers, no logos, no app icons, no brand marks, no watermark, no faces.
```

### compartilhar.jpg

Sem prompt. É um recorte central da capa original em 1200×630, feito com `npx --yes sharp-cli@6.1.0` (`resize 1200 630 --fit cover`, JPG qualidade 82).

## 5. Custo e ordem de geração

**Custo:**
- 4 fotos × 2 créditos = **8 créditos**.
- Com 1 nova tentativa por foto: **16 créditos** no máximo, cerca de US$ 0,53 a 0,94. O orçamento é de 30.
- O `compartilhar.jpg` não gasta crédito.

**Ordem:**
1. `compartilhar.jpg` (recorte, sem crédito).
2. `passo-1`: **é o teste de consistência.** Só sigo depois que ele for aprovado.
3. `passo-2`, `passo-3` e `passo-4`, um por vez.

**Regras:**
- Cada geração só acontece com aprovação no chat, e o custo é conferido no botão Generate antes.
- Não há conector do Higgsfield: uso o Claude in Chrome.
- Os originais aprovados ficam em `_originais/img/passo-N.png`, fora do git.

### Resultado (23/10/2026)

| Imagem | Situação | Tentativas | Créditos | Original |
|---|---|---|---|---|
| `compartilhar.jpg` | Feita (1200×630, 105 KB) | — | 0 | recorte de `_originais/hero-higgsfield-capa2.png` |
| `passo-1` | Aprovada. A caneca azul ficou fora do quadro | 1 | 2 | `_originais/img/passo-1.png` (2400×1792) |
| `passo-2` | Aprovada | 1 | 2 | `_originais/img/passo-2.png` (2400×1792) |
| `passo-3` | Aprovada. Sacolas fechadas, como pedido | 1 | 2 | `_originais/img/passo-3.png` (2400×1792) |
| `passo-4` | Aprovada. A assinatura é um rabisco cursivo ilegível, e o ângulo é mais aberto (duas pessoas, sem rosto) | 1 | 2 | `_originais/img/passo-4.png` (2400×1792) |
| **Total** | | | **8 de 30** | |

- **Referência:** os 4 passos usaram a capa como referência. Ela foi escolhida em "Generations" no próprio Higgsfield, sem enviar arquivo.
- **Prompt longo:** digitar letra por letra trava a página do Higgsfield. O que funciona é colar o texto inteiro de uma vez.
- **No site:**
  - os passos estão em `public/img/passo-1…4.webp` (800×600, de 28 a 32 KB cada), no topo dos cards do "Como funciona", com `alt=""`;
  - o `compartilhar.jpg` está nas tags `og:` do `index.html`, com endereço completo. Se o site mudar de endereço, é preciso trocar também ali.

## 6. Como aprovar a consistência

Compare cada foto de passo com a capa:

- **Madeira da bancada:** o mesmo tom claro e o mesmo veio.
- **Luz:** vem da janela da esquerda, quente de manhã, com sombras caindo para a direita.
- **Kraft:** a mesma cor de papel pardo e as mesmas alças de papel.
- **Caneca:** azul-clara esmaltada, com borda escura.
- **Pano:** linho bege.
- **Pessoa:** só mãos e antebraços, com manga de linho bege. Rosto, nunca.
- **Celular:** cinza-escuro, liso, sem marca. O mesmo nos 4 passos.
- **Ângulo:** de cima, em três quartos, parecido nos 4 passos.
- **Texto:** nenhum, nem letras inventadas na tela do celular.
- **Canto superior direito:** livre para o número do passo.

**Se algo sair errado:**
- **O passo 1 sai fora do padrão** (outra cozinha, outra luz, texto na tela):
  - não gero os outros;
  - ajusto o prompt e refaço **com a capa como referência** (é a nova tentativa prevista).
- **A capa não serve como referência** (o modelo muda a cena toda mesmo com ela):
  - paro;
  - proponho gerar primeiro uma mestra nova, só da cozinha em 4:3, e aprovar essa mestra antes de qualquer passo.

## 7. Aviso: produtos gerados por IA

- As 8 fotos de produto são geradas por IA e mostram embalagens genéricas, sem marca.
- Quando o site vender de verdade, quem compra pode esperar receber exatamente aquela embalagem. **Imagem gerada pode enganar.**
- **Recomendação:** antes de publicar com produtos reais, trocar por **fotos reais** do que a loja vende. Até lá:
  - manter o aviso "Produtos e preços de exemplo, só para teste.";
  - ou marcar cada foto como "imagem ilustrativa".
- A capa, a entrega, a faixa e os passos mostram cenas, não um produto à venda, e podem continuar geradas.
