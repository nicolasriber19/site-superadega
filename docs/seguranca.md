# Revisão de segurança: Superadega (protótipo)

Etapa 18 do workshop. Revisão só de leitura, feita em 24/10/2026 na branch `feat/video-desembala` (com a `main` do PR #1 já mesclada).
O site é estático: não tem servidor, banco de dados, login nem pagamento. O pedido sai por um link do WhatsApp.

## Resultado: nenhum problema crítico

| # | O que conferi | Como | Resultado |
|---|---|---|---|
| 1 | Segredo no código (chave, token, senha) | `git grep` por `api_key`, `secret`, `token`, `senha`, `password` | Nada. Só `id-token: write` do deploy (permissão do GitHub Pages, não é segredo) e uma função chamada `token` que lê cores do CSS |
| 2 | `.env` no repositório | `git ls-files` e `.gitignore` | Nenhum `.env` no git; `.env` e `.env.*` estão no `.gitignore` |
| 3 | Dependências com falha conhecida | `npm audit` | 0 vulnerabilidades |
| 4 | Texto digitado entrando como HTML (`innerHTML`) | Li os 12 usos em `src/` | Só montam HTML com dados do próprio site (produtos, preços, mensagens fixas). O nome e o endereço da pessoa vão para `value` dos campos e para o texto do WhatsApp, nunca para `innerHTML` |
| 5 | Link que abre outra aba | `target="_blank"` e `window.open` | Nenhum `target="_blank"`. O `window.open` do WhatsApp corta a ligação com a página à mão (`janela.opener = null`, `src/sections/finalizar.js`) |
| 6 | Dados pessoais guardados (LGPD) | `localStorage` | A lista guarda só produtos e quantidades. "Meus dados" guarda nome e endereço **só se a pessoa tocar em Salvar**, só no aparelho, com botão "Apagar meus dados". Explicado em `privacidade.html` |
| 7 | Workflows do GitHub | `.github/workflows/` | Os testes usam `pull_request` (não `pull_request_target`) com `contents: read`; as actions estão fixadas por SHA |
| 8 | Arquivos de terceiros | CDN, hotlink | Nada carregado de fora: fontes, imagens e ícones estão dentro do projeto |

## Para depois (não são falhas hoje)

- **Regra na `main`:** o check "testes" ainda não impede o merge. Criar uma regra no repositório (Settings › Rules) exigindo o check.
- **Workflows:** `persist-credentials: false` no checkout e versão do Node fixa (hoje `lts/*`).
- **Quando houver servidor ou pagamento** (fora desta versão, `docs/stack.md`): rever tudo, porque aí entram senhas, dados de cartão e LGPD de verdade.
