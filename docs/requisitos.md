# Requisitos: Superadega (nome provisório)

Versão 1.1, 20/10/2026. Base: `docs/brief.md` e `docs/plano.md`. Termos técnicos no glossário, no fim.

Mudanças na 1.1: o pagamento passa a ser por Pix **antes** de o pedido sair (RF-05, RF-19). Entra a assinatura no celular na entrega (RF-24).

## 1. Escopo

**Dentro desta versão**
- Página inicial com a marca, como funciona e o que será entregue.
- Catálogo de alimentos com foto, preço da unidade e preço de atacado.
- Lista de compras montada no site.
- Escolha de dia e horário da entrega.
- Pedido enviado pelo WhatsApp da loja. Pagamento por Pix antes de o pedido sair.
- Assinatura de quem recebe, no celular do entregador.
- Uso possível para quem lê pouco ou não lê.

**Fora desta versão**
- Pagamento dentro do site, cadastro e login. [precisa de backend]
- Estoque em tempo real e rastreio da entrega.
- Aplicativo de celular.
- Bebida alcoólica, até você decidir.

## 2. Requisitos funcionais

| ID | Descrição | Prioridade | Critério de aceitação |
|---|---|---|---|
| RF-01 | A página inicial mostra a marca, como funciona e o que será entregue. Tem um botão "Fazer minha compra". | Precisa | **Dado** que abro a página inicial, **quando** rolo até o fim, **então** vejo nesta ordem: "Quem somos", "Como funciona" e "O que você recebe".<br>**Dado** um celular de 375 px, **quando** a página abre, **então** vejo o botão "Fazer minha compra" sem rolar. |
| RF-02 | O catálogo mostra cada produto com foto, nome, preço da unidade e preço de atacado. | Precisa | **Dado** o catálogo, **quando** olho qualquer produto, **então** vejo foto, nome, preço da unidade e preço de atacado com a quantidade mínima (ex.: "a partir de 6: R$ X cada"). Quantidade mínima: [a confirmar]. |
| RF-03 | A pessoa monta a lista com botões grandes de "+" e "−". | Precisa | **Dado** um produto, **quando** toco "+" 3 vezes, **então** a quantidade mostra 3 e o total sobe.<br>**Quando** toco "−" até chegar a 0, **então** o produto sai da lista.<br>**Quando** a quantidade chega ao mínimo de atacado, **então** o total passa a usar o preço de atacado. |
| RF-04 | A pessoa escolhe o dia e o horário da entrega com toques, sem digitar. | Precisa | **Dado** que vou finalizar, **quando** abro "Entrega", **então** vejo os dias e horários da grade fixa como botões e escolho um com um toque.<br>[precisa de backend] para mostrar só horários livres → alternativa: grade fixa, e a loja confirma no WhatsApp. Grade: [a confirmar]. |
| RF-05 | O pedido vai pelo WhatsApp da loja. O pagamento é por Pix, antes de o pedido sair. | Precisa | **Dado** uma lista com itens e uma entrega escolhida, **quando** toco "Enviar pedido", **então** o WhatsApp abre com a mensagem pronta: "Pedido pelo site", itens, quantidades, total, dia, horário, nome e endereço.<br>**Dado** a tela de envio, **então** vejo "Você paga com Pix antes da entrega. A loja manda a chave no WhatsApp" e um aviso curto sobre o uso dos dados.<br>Regra da loja: o pedido só sai depois que o Pix for confirmado.<br>Pede nome e endereço. Não pede telefone, porque ele já vem do WhatsApp. [LGPD: confirmar]<br>[precisa de backend] se o pagamento for no site → alternativa adotada: link de WhatsApp. |
| RF-06 | Quem lê pouco ou não lê consegue usar o site. | Precisa | **Dado** qualquer tela, **quando** olho os botões de ação, **então** todos têm ícone e palavra curta, e todo produto tem foto.<br>**Dado** um teste com 3 pessoas que leem pouco, **quando** peço "coloque 3 produtos na lista e envie", **então** pelo menos 2 conseguem sem ajuda. [proposta: teste pequeno, viável aqui; não é padrão de mercado] |
| RF-07 | O card do produto mexe levemente ao ser tocado. | Deveria | **Dado** um card, **quando** clico ou toco, **então** ele encolhe um pouco e volta ao normal em até 0,3 s. [proposta: curto para não atrasar o toque] Ver também RNF-05. |
| RF-08 | A lista fica salva no aparelho se a pessoa fechar o site. | Deveria | **Dado** uma lista montada, **quando** fecho e reabro o site no mesmo aparelho e navegador, **então** a lista continua lá. Só os itens ficam salvos, sem nome nem endereço. |
| RF-09 | A pessoa pode mandar o endereço por áudio, em vez de digitar. | Deveria | **Dado** a tela de envio, **quando** marco "Vou mandar o endereço por áudio", **então** consigo enviar sem digitar, e a mensagem avisa a loja. [LGPD: confirmar] |
| RF-10 | Um botão "Ouvir" lê os textos em voz alta. | Deveria | **Dado** um passo do "Como funciona" ou um produto, **quando** toco "Ouvir", **então** escuto o texto em português. |
| RF-11 | A pessoa consulta se a loja entrega no seu CEP. | Deveria | **Dado** um CEP da área atendida, **quando** toco "Ver", **então** leio "Entregamos aí". Com outro CEP, leio "Ainda não entregamos aí" e vejo um botão de WhatsApp. O CEP não sai do aparelho. CEPs: [a confirmar]. |
| RF-12 | O catálogo tem categorias com ícone. | Deveria | **Dado** o catálogo, **quando** toco no ícone de uma categoria, **então** vejo só os produtos dela. Categorias: [a confirmar]. |
| RF-13 | Uma seção mostra as ofertas de atacado. | Deveria | **Dado** a página inicial, **quando** toco "Ofertas", **então** vejo só produtos em oferta. |
| RF-14 | Um botão "Ajuda" abre o WhatsApp da loja em qualquer tela. | Deveria | **Dado** qualquer tela, **quando** toco "Ajuda", **então** o WhatsApp abre com "Olá, preciso de ajuda com meu pedido". |
| RF-15 | Página de política de privacidade. | Deveria | **Dado** o rodapé, **quando** toco "Privacidade", **então** leio quais dados o site usa, para quê e com quem compartilha (WhatsApp). [LGPD: confirmar] |
| RF-16 | Busca por nome do produto. | Poderia | **Dado** o catálogo, **quando** digito "arroz", **então** vejo só produtos com "arroz" no nome. |
| RF-17 | Repetir a última compra. | Poderia | **Dado** que já enviei um pedido neste aparelho, **quando** toco "Repetir última compra", **então** a lista volta com os mesmos itens. |
| RF-18 | Kits prontos da compra do mês. | Poderia | **Dado** a seção "Kits", **quando** escolho um kit, **então** os itens entram na lista e posso mudar as quantidades. Kits: [a confirmar]. |
| RF-19 | Pagamento dentro do site. | Fora | [precisa de backend] → alternativa adotada: Pix pedido pela loja no WhatsApp, antes de o pedido sair. |
| RF-20 | Cadastro, login e área do cliente. | Fora | [precisa de backend] → alternativa: lista salva no aparelho (RF-08) e histórico na conversa do WhatsApp. |
| RF-21 | Estoque em tempo real. | Fora | [precisa de backend] → alternativa: a loja avisa no WhatsApp o que faltou e sugere troca. |
| RF-22 | Rastreio da entrega. | Fora | Alternativa: a loja avisa no WhatsApp quando o pedido sair. |
| RF-23 | Venda de bebida alcoólica. | Fora | Fica fora até você decidir, porque exige aviso de maioridade. [a confirmar] |
| RF-24 | Quem recebe assina no celular do entregador. | Deveria | **Dado** a página de entrega aberta no celular do entregador, **quando** a pessoa assina com o dedo e o entregador toca "Enviar assinatura", **então** a imagem da assinatura é compartilhada no WhatsApp da loja. Onde não der para compartilhar, aparece "Baixar".<br>[precisa de backend] para guardar a assinatura no site → alternativa: imagem enviada no WhatsApp. Plano B: canhoto de papel. [LGPD: confirmar] |

## 3. Requisitos não funcionais

O limite de 6 itens em "Precisa" vale para os RF. Os RNF marcados "Precisa" são os mínimos que você exigiu e valem para o site todo.

| ID | Requisito | Prioridade | Como testar |
|---|---|---|---|
| RNF-01 | Funciona em telas de 375 px a 1920 px. | Precisa | **Dado** o site nas larguras 375, 768, 1280 e 1920 px, **quando** passo por todas as telas, **então** nada rola para o lado, e nenhum texto ou botão fica cortado ou sobreposto. |
| RNF-02 | Tudo funciona pelo teclado. | Precisa | **Dado** que uso só Tab, Enter e Espaço, **quando** monto e envio uma lista, **então** consigo fazer tudo e sempre vejo o foco. |
| RNF-03 | Contraste suficiente entre texto e fundo. | Precisa | **Dado** qualquer texto, **quando** meço com um verificador de contraste, **então** o texto normal tem pelo menos 4,5:1, e o texto grande 3:1. Fonte: [WCAG 2.1, nível AA](https://www.w3.org/TR/WCAG21/). |
| RNF-04 | Toda imagem que traz informação tem texto alternativo. | Precisa | **Dado** um leitor de tela, **quando** passo por produtos e passos, **então** ouço uma descrição em português (ex.: "Arroz branco, pacote de 5 kg"). Imagens só decorativas são puladas. |
| RNF-05 | Respeita o pedido de menos movimento (prefers-reduced-motion). | Precisa | **Dado** o aparelho com "reduzir movimento" ligado, **quando** toco num card, **então** nada se move, mas o toque continua funcionando. |
| RNF-06 | Desempenho percebido: a página aparece e responde rápido. | Precisa | **Dado** um celular simulado em 4G na ferramenta de teste do navegador, **quando** abro a página inicial, **então** o maior conteúdo aparece em até 2,5 s ([LCP "bom"](https://web.dev/articles/lcp)), e o toque num botão responde em até 0,2 s ([INP "bom"](https://web.dev/articles/inp)). |
| RNF-07 | Funciona em Chrome, Edge, Safari e Firefox. | Precisa | **Dado** a versão mais recente de cada um (Chrome e Firefox no Android e no computador, Edge no computador, Safari no iPhone e no Mac), **quando** monto e envio um pedido, **então** tudo funciona igual. [proposta: "mais recente" na data do teste] |
| RNF-08 | Funciona sem CDN. | Precisa | **Dado** que bloqueio na ferramenta do navegador todos os endereços externos, menos o WhatsApp, **quando** abro o site, **então** fontes, ícones, imagens e estilos carregam normalmente. |
| RNF-09 | Os botões são fáceis de tocar. | Precisa | **Dado** qualquer botão, **quando** meço, **então** a área de toque tem pelo menos 44 × 44 px. [proposta, com base no [critério 2.5.5 da WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)] |
| RNF-10 | A letra é legível. | Deveria | **Dado** qualquer texto corrido, **quando** meço, **então** a letra tem pelo menos 16 px. [proposta: é o tamanho padrão dos navegadores] |
| RNF-11 | A página é marcada como português do Brasil. | Deveria | **Dado** um leitor de tela, **quando** ele lê o site, **então** usa a pronúncia em português. |
| RNF-12 | A linguagem é simples. | Deveria | **Dado** qualquer botão, **então** o texto tem até 3 palavras.<br>**Dado** qualquer instrução, **então** a frase tem até 15 palavras. [proposta: limites para leitura rápida; não é padrão oficial] |
| RNF-13 | Sem cookies nem rastreadores nesta versão. | Deveria | **Dado** o site aberto, **quando** olho os dados salvos na ferramenta do navegador, **então** não há cookies, só a lista do RF-08. |
| RNF-14 | O pedido é rápido de fazer (objetivo "agilizar a vida"). | Deveria | **Dado** uma pessoa que nunca usou o site, **quando** ela monta e envia uma lista de 10 produtos, **então** termina em até 5 minutos. [proposta: ponto de partida, a ajustar depois do primeiro teste] |

## 4. Conteúdo necessário

| Conteúdo | Usado em | Quem fornece | Até quando |
|---|---|---|---|
| Texto "Quem somos" | RF-01 | Você | Antes do código [a confirmar] |
| Passos do "Como funciona" (3 ou 4) | RF-01 | Eu rascunho, você aprova | Etapa de plano |
| Texto "O que você recebe" (como chega, pagamento na entrega) | RF-01 | Você | Antes do código [a confirmar] |
| Lista de produtos: nome, unidade, preço, preço de atacado, quantidade mínima, categoria | RF-02, RF-03, RF-12 | Você | Antes do código [a confirmar] |
| Fotos dos produtos | RF-02, RF-06 | Você, com o Higgsfield (ver riscos) | Etapa de imagens [a confirmar] |
| Imagens da página inicial (capa e passos) | RF-01 | Higgsfield (capa e entrega feitas em 22/10/2026; passos usam ícones) | Feito |
| Ícones de botões e categorias | RF-06, RF-12 | Etapa de identidade visual, com arquivos no próprio site | Identidade visual |
| Logo e nome definitivo | Todo o site | Você | Antes de publicar |
| Textos alternativos das imagens | RNF-04 | Eu rascunho, você aprova | Junto com as imagens |
| Vídeo | — | Não previsto nesta versão [a confirmar] | — |
| Número de WhatsApp da loja | RF-05, RF-14 | Você | Antes do código |
| Grade de entrega, CEPs atendidos, pedido mínimo e taxa | RF-04, RF-11 | Você | Antes do código |
| Aviso e política de privacidade | RF-05, RF-15 | Você, de preferência com apoio jurídico [LGPD: confirmar] | Antes de publicar |

## 5. Dependências externas

| Dependência | Para quê | Risco | Plano B |
|---|---|---|---|
| WhatsApp | Pedido, ajuda e áudio (RF-05, RF-09, RF-14) | Quem não tem WhatsApp não consegue pedir. Se o link mudar, o envio para. Listas muito longas podem ser cortadas [a confirmar]. Os dados passam pela empresa dona do WhatsApp [LGPD: confirmar]. | Mostrar o telefone para ligar. Botão "Copiar pedido". Testar uma lista grande antes de publicar. |
| Higgsfield | Criar imagens (só na produção do conteúdo) | A imagem pode não parecer o produto real. Desenhar embalagens de marcas conhecidas pode dar problema de direitos. Uso comercial: permitido pelo plano, segundo o dono do projeto (22/10/2026). | IA na capa e nos passos. Nos produtos, foto real ou o aviso "imagem ilustrativa". Os arquivos ficam no próprio site. |
| Mapa | Não usado nesta versão | Mapas embutidos carregam arquivos de fora e podem criar cookies (quebra RNF-08 e RNF-13). | Imagem fixa com link "Abrir no mapa". |
| Formulário externo | Não usado (o pedido vai pelo WhatsApp) | Os dados ficariam com outra empresa [LGPD: confirmar]. | — |
| Analytics | Não usado nesta versão | Código de outra empresa e cookies. Exige aviso [LGPD: confirmar]. | Contar no WhatsApp as mensagens que começam com "Pedido pelo site". |
| Armazenamento do navegador ("Meus dados") | Nome e endereço para o pedido já vir preenchido (`src/lib/meus-dados.js`) | Ficam no aparelho da pessoa, sem servidor, e só se ela tocar em "Salvar". Quem usa o mesmo aparelho pode ver [LGPD: confirmar]. | Botão "Apagar meus dados" na mesma janela. Sem salvar, o site não guarda nada além da lista. |
| Voz do navegador (RF-10) | Botão "Ouvir" | A voz em português muda de aparelho para aparelho, e alguns podem não ter [a confirmar]. | Áudios gravados, guardados no site. |

## 6. Riscos e perguntas em aberto

**Riscos**
1. "Superadega" é o nome de uma rede real do mesmo segmento ([Jornal de Brasília](https://jornaldebrasilia.com.br/brasilia/super-adega-inaugura-unidade-no-gama/)). Trocar o nome antes de publicar.
2. Fotos feitas por IA podem não bater com o produto entregue. Isso reforça a barreira "medo de receber produto errado" do brief.
3. O preço no site fica parado até alguém atualizar o arquivo. Mitigação: mostrar "Preços válidos até __", e a loja confirma no WhatsApp.
4. O pedido depende de uma pessoa respondendo no WhatsApp. Pedidos podem atrasar ou se perder.
5. Quem não lê pode travar ao escrever o endereço. Mitigação: RF-09.
6. O brief mudou: agora o pagamento é por Pix antes da entrega, e a métrica vira "pedidos recebidos pelo WhatsApp por semana". Atualizar o brief numa etapa futura.
7. A loja confere o Pix à mão. Se despachar sem conferir, perde o pedido. Mitigação: o pedido só sai com o comprovante.

**Perguntas em aberto**
- Qual será o nome definitivo?
- Quais CEPs são atendidos? Quais dias e horários? Qual é o pedido mínimo e a taxa de entrega?
- Quais formas de pagamento na entrega a loja aceita (dinheiro, cartão, Pix)? [a confirmar]
- O preço de atacado vale a partir de quantas unidades? É igual para todo produto?
- Quantos produtos entram nesta versão? [a confirmar]
- Quem atende o WhatsApp, e em que horário?
- Quem escreve os textos da marca, e até quando?
- Quem participa do teste com pessoas que leem pouco (RF-06)?
- Quem revisa a política de privacidade? [LGPD: confirmar]

## Glossário

- **Backend:** servidor que guarda dados e faz tarefas como pagamento e login.
- **Site estático:** site feito só de arquivos prontos, sem servidor guardando dados.
- **CDN:** servidores de outra empresa que entregam arquivos. "Sem CDN" quer dizer que tudo vem do nosso site.
- **LGPD:** lei brasileira sobre o uso de dados pessoais.
- **px (pixel):** unidade de medida da tela. 375 px é a largura de um celular pequeno.
- **Contraste:** diferença de claridade entre o texto e o fundo, medida como 4,5:1.
- **Texto alternativo:** descrição de uma imagem, lida em voz alta pelo leitor de tela.
- **Leitor de tela:** programa que lê a tela em voz alta.
- **Foco:** contorno que mostra qual botão está selecionado quando se usa o teclado.
- **prefers-reduced-motion:** ajuste do aparelho em que a pessoa pede menos animação.
- **LCP:** tempo até o maior conteúdo da página aparecer.
- **INP:** tempo entre o toque e a resposta da tela.
- **Cookie:** pequeno arquivo que o site salva no aparelho para lembrar ou rastrear algo.
- **WCAG:** guia internacional de acessibilidade para sites.
