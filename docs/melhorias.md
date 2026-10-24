# Melhorias futuras: Superadega (protótipo)

Etapa 26 do workshop, em 24/10/2026. Backlog curto e priorizado, a partir das revisões de código (PR #1 e #2), de design (etapa 15) e de segurança (`docs/seguranca.md`).
Nada aqui foi feito ainda. Números de acesso ou de venda não existem: o site ainda é um protótipo.

**Legenda:** Esforço P (até 1 h), M (meio dia), G (vários dias). **[muda a arquitetura]** = precisa de servidor, banco, login, pagamento ou serviço pago. **[LGPD]** = coleta ou guarda dado pessoal.

| # | Melhoria | Por que ajuda o objetivo | Esforço | Impacto | Muda a arquitetura? | Critério de aceitação | Etapa |
|---|---|---|---|---|---|---|---|
| 1 | **Produtos e preços reais** da loja, com **fotos reais** | Hoje são 8 exemplos gerados por IA; quem compra espera receber o que viu (`docs/imagens.md`, seção 7) | M | alto | não | `src/data/produtos.js` só com produtos reais, `PRECOS_SAO_EXEMPLO = false`, aviso "de exemplo" removido, fotos reais em `public/img/produtos/` | 13 |
| 2 | **Regra na `main` exigindo o check "testes"** | Hoje o check só informa: um PR vermelho ainda pode ser mesclado e ir para o ar | P | alto | não | Settings › Rules: ruleset na `main` com PR obrigatório e o status check `testes`; um PR com teste quebrado mostra "Merge blocked" | 19, 23 |
| 3 | **"Lista" e "Enviar pedido" como botão secundário enquanto a lista está vazia** | Uma ação principal por tela: com a lista vazia, os dois botões cobre competem com "Fazer minha compra" e "Escolher produtos" (revisão de design, itens 4 e 8) | P | médio | não | Com 0 itens: "Lista" e "Enviar pedido" brancos com borda; com 1 item ou mais, voltam ao cobre. Teste do Playwright cobrindo os dois estados | 14 |
| 4 | **Conferir as licenças do Higgsfield e da voz** (uso comercial) | Antes de vender de verdade, garantir que pode usar as imagens, o vídeo e os áudios | P | alto | não | `docs/ativos.md` sem nenhum "[a confirmar]", com o link e a data dos termos | 13 |
| 5 | **Vídeo novo sem legumes "pulando"** | Os quadros 0068 a 0088 mostram legumes saindo em arco; um quadro final com os legumes na bancada resolve | M | baixo | não (cerca de 17 créditos do Higgsfield) | Nenhum objeto em arco ou sumindo; 120 quadros, menos de 15 MB | 09 |
| 6 | **Seção "O que vem na sua compra" maior no celular** | A 390 px o filme tem 358×200 px e repete a cena da capa [opinião da revisão de design] | P | baixo | não | `aspect-ratio: 4/3` abaixo de 600 px com o canvas recortando em modo "cover" (sem esticar) | 12 |
| 7 | **Frase da faixa com foto menor no celular** | A 390 px o cartão cobre metade da foto [opinião] | P | baixo | não | Abaixo de 600 px, `font-size: var(--titulo-3)`; a frase em até 2 linhas | 15 |
| 8 | **Favicon na cor nova** | O `favicon.svg` ainda usa o azul da identidade antiga (`#1e4d78`) | P | baixo | não | Favicon com o cobre e a tinta dos tokens | 15 |
| 9 | **Endurecer os workflows** | `persist-credentials: false` no checkout, Node fixo (hoje `lts/*`) e guardar o relatório do Playwright quando o CI falhar | P | médio | não | Os dois workflows com Node fixo; num CI vermelho, o relatório aparece como artefato | 21, 25 |
| 10 | **Contar pedidos enviados** sem cookies | Saber se o site cumpre o objetivo. Hoje a mensagem já começa com "Pedido pelo site", e a loja pode contar no WhatsApp | P | médio | não | Planilha simples da loja com a contagem semanal de mensagens "Pedido pelo site" | 26 |
| 11 | **Domínio próprio** | Endereço mais fácil de falar e de confiar do que `github.io` | P | médio | não (custo do domínio: conferir) | Site abre no domínio novo com HTTPS; `base` do Vite e as tags `og:` atualizadas | 25 |
| 12 | **Pagamento e pedido online** | Hoje o Pix é combinado no WhatsApp | G | alto | **[muda a arquitetura] [LGPD]**: precisa de servidor, senhas secretas e guardar dados do pedido | Fora desta versão; decidir antes com `docs/stack.md`, seção 5 | 05 |

## As 3 primeiras

1. **#2, regra na `main`:** 5 minutos de configuração e protege o site publicado de todo erro que os testes já pegam.
   - **Como medir:** abrir um PR com um teste quebrado de propósito; antes, o botão de merge fica liberado; depois, aparece "Merge blocked".
2. **#4, licenças:** sem custo, e evita problema quando o site vender de verdade.
   - **Como medir:** contar os "[a confirmar]" em `docs/ativos.md` (hoje 2; meta: 0).
3. **#1, produtos reais:** é o que transforma o protótipo em loja.
   - **Como medir:** o aviso "Produtos e preços de exemplo" some do site e o teste do WhatsApp continua verde.

**Próximo passo:** transformar as 3 em cartões no Notion (quadro "Trabalho | Superadega").
