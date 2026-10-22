# Stack: Superadega (nome provisório)

Decidido em 22/10/2026. Base: `docs/brief.md`, `docs/requisitos.md` e `docs/plano.md`.

## 1. Decisão

**Vite + HTML, CSS e JavaScript puros. Site estático, sem servidor.**

- **Uma só dependência:** o `vite`, a ferramenta que roda o site no computador e gera a versão final.
- **O pedido** é montado no site e vai pelo WhatsApp da loja (RF-05).
- **O pagamento** é feito por Pix **antes** de o pedido sair. A loja confere o Pix e só depois despacha. É assim que se cumpre o critério "o produto só sai mediante pagamento".
- **A assinatura** de quem recebe é feita na página `entrega.html`, no celular do entregador, e a imagem vai pelo WhatsApp da loja (RF-24).
- **A animação do card** é feita só com CSS (RF-07), sem biblioteca.

**Por que essa:** é a mais simples para quem vai manter o projeto sozinho e cumpre todos os requisitos. O site já está feito com ela: 81 KB no total, nota 100 no Lighthouse (celular), sem CDN e sem cookies.

## 2. Dependências

| Pacote | Versão (npm view, 22/10/2026) | Licença | Para quê (requisito) |
|---|---|---|---|
| `vite` | 8.3.5 | MIT | Rodar o site no computador e gerar a versão final em `dist/`. Guarda tudo dentro do projeto, sem CDN (RNF-08). |
| `create-vite` | 9.3.1 | MIT | Só cria o projeto, pelo `npm create vite`. Não fica instalado. |

Saída dos comandos de consulta:

```
$ node --version                    v24.19.0
$ npm --version                     11.17.0
$ npm view vite version license     8.3.5  MIT
$ npm view create-vite version license   9.3.1  MIT
```

O projeto foi atualizado do `vite` 8.3.4 para a 8.3.5 em 22/10/2026, com `npm install vite@8.3.5 --save-dev`. O `npm run build` passou, gerando as 3 páginas com os mesmos arquivos de antes, e o `npm run dev` abriu sem erros.

**Regra para o futuro:** cada biblioteca nova precisa de um motivo ligado a um requisito, e versão e licença conferidas com `npm view <pacote> version license`.

## 3. Alternativas descartadas

| Opção | Por que ficou de fora |
|---|---|
| **Vite + React** (`react` 19.3.1 MIT, `react-dom` 19.3.1 MIT, `@vitejs/plugin-react` 6.1.2 MIT) | 3 dependências a mais, sem nenhum requisito que precise delas. Exige aprender React, deixa o site mais pesado para o celular e obrigaria a reescrever o site atual. |
| **Vite + servidor Node** (`express` 5.3.0 MIT, `mercadopago` 3.6.1, licença **não confirmada**: o npm não informa) | Precisa de servidor pago, de senhas secretas e de cuidado com segurança e LGPD, além de taxas do Mercado Pago [valores a confirmar]. Para uma pessoa só, iniciante, o custo e o trabalho não se pagam agora. |
| **QR Pix dentro do site** (`qrcode` 1.5.4 MIT) | Não foi aprovado agora. É o meio-termo sem servidor: o site mostraria o QR com o valor, e a loja continuaria conferindo o pagamento. Pode voltar se "pagar dentro do site" virar prioridade. |

## 4. Comandos exatos de criação (testados numa pasta vazia)

Testados em 22/10/2026, numa pasta vazia: todos rodaram sem erro, com Node 24.19.0 e npm 11.17.0.

```bash
npm create vite@latest superadega -- --template vanilla --no-interactive
```
```bash
cd superadega
```
```bash
npm install
```
```bash
npm run dev
```

Resultado: `VITE v8.3.5 ready in 327 ms`, e a página respondeu em `http://localhost:5173/`.

**Para ver este projeto funcionando** (ele já existe, não precisa criar):

```bash
npm run dev
```

Depois, abra `http://localhost:5173` no navegador. Outros comandos:
- `npm run build`: gera a versão final em `dist/`.
- `npm run preview`: mostra essa versão final em `http://localhost:4173`.

## 5. O que exigiria servidor (backend) no futuro

| Desejo | Por que precisa de servidor | Alternativa sem servidor (a de hoje) |
|---|---|---|
| Confirmar o pagamento sozinho e liberar o pedido | Só um servidor recebe o aviso do banco ou do Mercado Pago de que o pagamento caiu | A loja confere o Pix e só então despacha |
| Pagar com cartão dentro do site | Os dados de pagamento precisam passar por um servidor e por um serviço de pagamento | Pix pedido no WhatsApp |
| Guardar pedidos e assinaturas num sistema | Precisa de banco de dados e de login | Fica tudo na conversa do WhatsApp da loja |
| Estoque e preços em tempo real | Precisa de banco de dados | A loja avisa o que faltou. Preços no arquivo `src/data/produtos.js` |
| Login e histórico do cliente | Precisa de banco de dados e senhas | A lista fica salva no aparelho (RF-08) |

**Quanto isso muda:**
- **Custo:** de possivelmente R$ 0 para uma hospedagem paga, mais as taxas por venda [valores a confirmar].
- **Complexidade:**
  - guardar senhas secretas;
  - proteger os dados (LGPD);
  - atualizar o servidor;
  - garantir que ele fique sempre ligado.

  Para quem mantém o projeto sozinho, é um salto grande.

## 6. Onde publicar (atenção)

- **GitHub Pages:** os termos dizem que ele não pode ser usado como hospedagem gratuita para "online business" ou "e-commerce" ([fonte](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)). Use só para testes e demonstrações.
- **Publicação real:** numa hospedagem de sites estáticos. Antes de escolher, confira nos termos se o plano permite uso comercial e qual é o preço [a confirmar].
- **Endereço:** desde 22/10/2026, o `vite.config.js` tem `base: '/site-superadega/'`, para o endereço de teste `https://<usuário>.github.io/site-superadega/` ([doc](https://vite.dev/guide/static-deploy)).
  - No HTML e no CSS, os arquivos de `public/` são escritos com `/` no começo (`/img/…`), e o Vite acrescenta o base sozinho.
  - No JavaScript, use `caminho()` de `src/lib/caminho.js`.
  - Links entre páginas são relativos (`privacidade.html`, `./`).
  - **Num domínio próprio** (ex.: `www.loja.com.br`), troque o `base` para `'/'`.
- **HTTPS:** o botão "Enviar assinatura" só compartilha a imagem em HTTPS (ou no `localhost`). Sem HTTPS, ele cai no plano B, "Baixar a imagem".

## 7. Quando rever esta decisão

Reveja a stack se acontecer qualquer um destes:

1. **Muitos pedidos:** conferir cada Pix à mão começa a atrasar entregas ou causar erros.
2. **Cartão no site:** a loja quer aceitar cartão dentro do site.
3. **Pedidos perdidos no WhatsApp:** a loja precisa ver todos os pedidos e assinaturas num só lugar.
4. **Preços desatualizados:** o catálogo muda todo dia e editar `src/data/produtos.js` fica pesado.
5. **Outra pessoa programando:** entra alguém que já domina outra ferramenta, como React.
6. **Uma biblioteca nova:** ela precisa ter um requisito que a justifique. Confira com `npm view` antes de instalar.
