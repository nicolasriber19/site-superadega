# Plano de implementação: Superadega (nome provisório)

## Contexto
O objetivo é que a pessoa compre pelo site e receba em casa. As decisões que você tomou agora:
- **Tecnologia:** Vite com HTML, CSS e JS puros. Nada de React, Tailwind ou GSAP.
- **Pagamento:** com Pix pelo WhatsApp, **antes** de o pedido sair. Isso muda o "paga na entrega" do `docs/requisitos.md` (RF-05 e RF-19).
- **Assinatura:** feita no celular do entregador. Guardar a assinatura num servidor exige backend. A **alternativa estática**: uma página do site desenha a assinatura, e o entregador manda a imagem pelo WhatsApp da loja. [LGPD: confirmar]
- **Pasta:** o projeto fica na própria pasta `SITE`, ao lado de `docs/`.

## 1. Mapa de seções (index.html)
| # | Seção | Objetivo | Conteúdo | Ativo visual |
|---|---|---|---|---|
| 1 | Topo | Achar a ajuda e a lista | Nome, botão "Ajuda", botão "Minha lista (n)" | Ícones SVG |
| 2 | Capa | Levar à compra | Frase curta e botão "Fazer minha compra" | hero.webp |
| 3 | Quem somos | Gerar confiança | 2 ou 3 frases da marca | — |
| 4 | Como funciona | Explicar sem precisar ler | 4 passos com número, ícone e botão "Ouvir": Escolha → Envie → Pague o Pix → Receba e assine | passo-1 a passo-4.webp |
| 5 | O que você recebe | Tirar o medo | Entrega em casa no dia e horário escolhidos, assinatura na entrega | entrega.webp |
| 6 | Produtos | Montar a lista | Categorias com ícone, filtro "Ofertas", cards com + e − | Fotos dos produtos |
| 7 | Finalizar | Enviar o pedido | Lista e total, dia e horário em botões, nome, endereço ou "mando por áudio", aviso de dados, botão "Enviar no WhatsApp" | Ícones |
| 8 | Rodapé | Dar confiança | Telefone, link "Privacidade" | — |

Páginas extras: `privacidade.html` (política) e `entrega.html` (assinatura, usada pelo entregador).

## 2. Árvore de arquivos
Reorganizada em 22/10/2026: uma seção = um arquivo em `src/sections/`, cada um com `init()`.
```
SITE/
├─ index.html            página principal: <header id="topo">, 6 <section id>, <footer id="rodape">
├─ privacidade.html      política de privacidade
├─ entrega.html          página de assinatura do entregador
├─ vite.config.js        base "/site-superadega/", appType "mpa", as 3 páginas
├─ .gitignore  .gitattributes
├─ package.json          comandos dev/build (só o vite)
├─ docs/                 brief, requisitos, plano, stack, roteiro-teste
├─ public/               servidos como estão (no HTML/CSS: "/img/…"; no JS: caminho())
│  ├─ img/               capa, passos, entrega, produtos/
│  ├─ icons/icones.svg   todos os ícones
│  ├─ frames/  fonts/    vazias por enquanto
│  ├─ favicon.svg
│  └─ robots.txt
└─ src/
   ├─ main.js            importa os estilos e chama init() de cada seção
   ├─ sections/          topo, capa, quem-somos, como-funciona, o-que-voce-recebe,
   │                     produtos (cards e filtros), finalizar (entrega, dados, WhatsApp), rodape
   ├─ lib/               lista.js (lista e atacado), ouvir.js, ajuda.js, caminho.js, dinheiro.js
   ├─ data/              produtos.js (produtos e preços), config.js (WhatsApp e horários)
   ├─ paginas/           privacidade.js, entrega.js (assinatura)
   └─ styles/
      ├─ tokens.css      variáveis: cores, letra, espaços
      ├─ base.css        reset leve, botões de 48 px, foco visível
      ├─ sections.css    layout das seções, de 375 a 1920 px
      └─ animacao.css    aperto do card e versão sem movimento
```

## 3. Estratégia da animação
- **Técnica:** CSS puro. Ao tocar, o JS põe uma classe no card, e o CSS faz o card encolher para 96% e voltar, em 0,25 s. A classe sai quando a animação termina.
- **Por que assim:** não precisa de biblioteca. E mexer só no tamanho (`transform`) é a forma mais leve de animar no celular.
- **No celular:** funciona no toque, igual ao clique, e também no Enter do teclado.
- **Com prefers-reduced-motion** (ajuste do aparelho para menos animação): o card não se move. Em vez disso, a borda muda de cor por um instante, e o número da quantidade é atualizado.

## 4. Lista de ativos
| Arquivo | Formato | Tamanho (px) | Quem gera |
|---|---|---|---|
| img/hero.webp | WebP | 1600×900 | Você (Higgsfield) |
| img/passo-1…4.webp | WebP | 600×600 | Você (Higgsfield) |
| img/entrega.webp | WebP | 1200×800 | Você (Higgsfield) |
| img/produtos/<id>.webp | WebP, fundo branco | 600×600 | Você (foto real ou Higgsfield com aviso "imagem ilustrativa") |
| img/placeholder.svg | SVG | 600×600 | Eu (substituto até as imagens chegarem) |
| icons/*.svg | SVG | 24×24, exibidos com 32 px ou mais | Eu |
| favicon.svg | SVG | 32×32 | Eu |
| Fontes | Bricolage Grotesque 800 + Atkinson Hyperlegible Next 400/700 (`.woff2` em `public/fonts/`, OFL) | 3 arquivos, ~52 KB | Eu (docs/identidade.md) |
| Vídeo | Nenhum nesta versão | — | — |

## 5. Passos de implementação (de 10 a 20 minutos cada)
0. **Salvar o plano** em `docs/plano.md` e atualizar `docs/requisitos.md` (RF-05: Pix antes de sair; RF-24 novo: assinatura). *Testar:* abrir os dois arquivos e ler as mudanças.
1. **Copiar `docs/` para um backup**, rodar `npm create vite@latest .` (modelo *vanilla*, opção **"Ignore files and continue"**), depois `npm install` e `npm run dev`. *Testar:* a página padrão do Vite abre em `localhost:5173`, e `docs/` continua lá.
2. **Limpar o modelo** e criar a árvore de pastas. `index.html` fica com `lang="pt-BR"` e as 8 seções, só com títulos. *Testar:* os 8 títulos aparecem nesta ordem.
3. **Criar `base.css`:** cores com contraste, letra de 16 px ou mais, botões de 44 px ou mais, foco visível. *Testar:* verificador de contraste do DevTools (ferramenta do navegador) e a tecla Tab mostrando o foco.
4. **Montar topo e capa** com o botão "Fazer minha compra". *Testar:* em 375 px, o botão aparece sem rolar a tela.
5. **Montar Quem somos, Como funciona e O que você recebe**, com ícones, números e texto alternativo. *Testar:* ordem do RF-01. O leitor de tela lê as descrições.
6. **Criar `produtos.js`** com 8 produtos de exemplo e os cards (foto, nome, preço da unidade e de atacado). *Testar:* os 8 cards mostram os 4 dados.
7. **Fazer os botões + e −**, o total e a regra de atacado. *Testar:* os 3 cenários do RF-03.
8. **Fazer a animação do card** e a versão sem movimento. *Testar:* tocar no card. No DevTools, ligar "prefers-reduced-motion: reduce" e ver o card parado.
9. **Fazer categorias com ícone e filtro "Ofertas".** *Testar:* tocar numa categoria mostra só os produtos dela.
10. **Salvar a lista no aparelho.** *Testar:* recarregar a página e ver a lista lá.
11. **Montar Finalizar:** dia e horário em botões, nome, endereço ou "mando por áudio", aviso de dados. *Testar:* dá para escolher tudo sem digitar, menos o nome.
12. **Montar a mensagem do WhatsApp:** começa com "Pedido pelo site", e o site avisa "Você paga com Pix antes da entrega. A loja manda a chave no WhatsApp". *Testar:* com um número de teste, o WhatsApp abre com o texto completo.
13. **Botão "Ajuda" e página `privacidade.html`.** *Testar:* o "Ajuda" abre o WhatsApp com a frase pronta. O link do rodapé abre a política.
14. **Botão "Ouvir"**, com a voz do próprio navegador. *Testar:* tocar e ouvir em português. Sem voz em português, o botão some.
15. **Página `entrega.html`:** a pessoa assina com o dedo, e o entregador toca em "Enviar assinatura", que compartilha a imagem no WhatsApp. Onde não der para compartilhar, aparece "Baixar". *Testar:* num celular real, assinar e enviar para o número de teste.
16. **Revisar telas, teclado e navegadores.** *Testar:* larguras de 375, 768, 1280 e 1920 px. Fazer o fluxo só com teclado. Testar em Chrome, Edge, Firefox e Safari.
17. **Rodar `npm run build` e `npm run preview`.** *Testar:* Lighthouse (relatório de qualidade do Chrome) com LCP de até 2,5 s. Bloquear os endereços externos e ver o site funcionar. Conferir que não há cookies.
18. **Teste com 3 pessoas que leem pouco** (feito por você). *Testar:* pelo menos 2 enviam o pedido sem ajuda, em até 5 minutos.

## 6. Riscos e plano B
| Risco | Plano B |
|---|---|
| Escolher "Remove existing files" no passo 1 apaga `docs/` | O backup feito antes, no mesmo passo |
| A animação trava no celular | Trocar pela mudança de cor da borda, sem movimento |
| O celular não compartilha a imagem da assinatura | Botão "Baixar". Em último caso, canhoto de papel |
| A mensagem do WhatsApp fica longa demais | Testar com 30 itens. Botão "Copiar pedido" |
| As imagens do Higgsfield atrasam | `placeholder.svg` no lugar |
| A loja despacha sem conferir o Pix | Regra da loja: só sai com o comprovante. Fica escrito no "Como funciona" |
| O aparelho não tem voz em português | Esconder o botão "Ouvir" |

## 7. Fora desta versão
- Pagamento dentro do site, login e área do cliente. [precisa de backend]
- Guardar a assinatura num servidor. [precisa de backend]
- Estoque em tempo real, rastreio da entrega, mapa e analytics.
- Consulta de CEP (RF-11), até você enviar a lista de CEPs.
- Busca, repetir a última compra e kits.
- Bebida alcoólica.

## Critério de aceitação → passo
| Critério | Passo |
|---|---|
| Uso por quem não lê (RF-06): ícone e palavra, fotos, passos numerados, áudio, endereço por áudio | 5, 6, 9, 11, 14, 18 |
| Animação do card (RF-07) e prefers-reduced-motion (RNF-05) | 8 |
| Compra e recebe em casa (RF-04, RF-05) | 11, 12 |
| O pedido só sai depois do Pix | 12 (aviso), 5 (Como funciona) |
| Assinatura no celular | 15 |
| Landing com marca, como funciona e entrega (RF-01) | 4, 5 |
| Catálogo, lista e atacado (RF-02, RF-03) | 6, 7 |
| Lista salva (RF-08), categorias e ofertas (RF-12, RF-13), ajuda e privacidade (RF-14, RF-15) | 10, 9, 13 |
| De 375 a 1920 px (RNF-01), teclado (RNF-02), navegadores (RNF-07) | 16 |
| Contraste (RNF-03), botões de 44 px (RNF-09) | 3 |
| Texto alternativo (RNF-04) | 5, 6 |
| Desempenho (RNF-06), sem CDN (RNF-08), sem cookies (RNF-13) | 17 |
| Nenhuma dependência além do Vite | 1 e 17 (só o Vite no package.json) |

## Decisões que tomei sozinho
1. ~~Uso a fonte do aparelho~~ Trocado em 22/10/2026 pela identidade A: Bricolage + Atkinson, guardadas em `public/fonts/` (sem CDN). Ver `docs/identidade.md`.
2. A animação usa só CSS e uma classe colocada pelo JS. Sem GSAP.
3. São 3 páginas HTML, com um `vite.config.js` pequeno para o Vite incluir todas no build.
4. Eu desenho os ícones em SVG. Não uso o logo do WhatsApp, que é marca registrada: no lugar, um balão de conversa com a palavra "WhatsApp".
5. Os produtos ficam num arquivo JS: 8 de exemplo, marcados como "exemplo", até você mandar a lista.
6. Enquanto você não passar o número da loja, `config.js` usa um número de teste.
7. Nesta versão entram RF-08, 09, 10, 12, 13, 14 e 15. O RF-11 (CEP) fica fora.
8. No passo 0, atualizo o `requisitos.md` com o Pix antes da entrega e a assinatura.
9. As imagens são em WebP, um formato leve, nos tamanhos da tabela.

Posso começar pelo passo 1?
