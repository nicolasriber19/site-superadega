# Roteiro do teste com 3 pessoas (passo 18)

Objetivo: ver se quem lê pouco consegue fazer um pedido sozinho.
Confere o RF-06 e o RNF-14 do `docs/requisitos.md`.

**Passou se:** pelo menos **2 das 3 pessoas** enviam o pedido **sem ajuda**, em até **5 minutos**. [proposta]

## 1. Antes do teste

- **Quem:** 3 pessoas que leem pouco ou não leem e que fazem compra do mês. De preferência, que nunca viram o site.
- **Quando:** de preferência depois que as fotos reais dos produtos entrarem. Com a imagem provisória, quem não lê não reconhece o produto pela foto. Se fizer antes, conte como um ensaio.
- **Aparelho:** um celular, o tipo de aparelho que a pessoa usa no dia a dia.
- **Abrir o site no celular** (o celular e o computador precisam estar no mesmo Wi-Fi):
  1. No computador, rode o comando abaixo:
     ```bash
     npm run dev -- --host
     ```
  2. O terminal mostra uma linha `Network: http://192.168.x.x:5173`. Digite esse endereço no celular.
  3. Se o Windows perguntar sobre o firewall, permita a "rede privada".
- **Dados de teste:** a pessoa usa um nome inventado e marca "Vou mandar o endereço por áudio". Ninguém digita endereço real.
- **WhatsApp:** o número ainda é de teste, então a mensagem não chega a ninguém. O pedido conta como enviado quando o WhatsApp abre com a mensagem pronta.
- **Leve:** este roteiro impresso, um relógio para marcar o tempo e uma caneta.
- **Entre uma pessoa e outra:** tire todos os produtos da lista (botão "−" até zerar) e recarregue a página.

## 2. O que dizer no começo

> "Estamos testando o site, não você. Se algo for difícil, a culpa é do site.
> Eu não vou poder ajudar durante o teste, porque quero ver onde o site atrapalha.
> Pode parar quando quiser. Posso anotar o que acontecer? Não vou anotar seu nome."

Só comece se a pessoa disser que sim.

## 3. Tarefas (fale em voz alta, uma de cada vez)

Comece o relógio na tarefa 1 e pare quando o WhatsApp abrir.

1. "Coloque na lista **arroz, leite e detergente**."
2. "Agora você quer **6 pacotes de arroz**."
3. "Escolha para a compra chegar **amanhã de manhã**."
4. "**Mande o pedido** para a loja."

## 4. Regras para quem observa

- Não aponte, não toque na tela e não leia nada para a pessoa.
- Se ela perguntar, responda: "Faça como achar melhor."
- Se ela travar por **2 minutos** na mesma tarefa, ajude e marque "com ajuda".
- Anote onde ela parou, o que tocou errado e o que disse.

## 5. Ficha de anotação (uma por pessoa)

Pessoa: ☐ 1  ☐ 2  ☐ 3        Celular: ____________

| Tarefa | Sozinha | Com ajuda | Não fez | Onde travou / o que disse |
|---|---|---|---|---|
| 1. Arroz, leite e detergente | ☐ | ☐ | ☐ | |
| 2. 6 pacotes de arroz | ☐ | ☐ | ☐ | |
| 3. Amanhã de manhã | ☐ | ☐ | ☐ | |
| 4. Mandar o pedido | ☐ | ☐ | ☐ | |

Tempo total: ______ min ______ s

Usou o botão "Ouvir"? ☐ Sim  ☐ Não

**Perguntas no final:**
1. "O que foi mais difícil?" ______________________
2. "Algum desenho ou botão foi confuso?" ______________________
3. "Você usaria para fazer sua compra do mês?" ☐ Sim ☐ Talvez ☐ Não

## 6. Resultado

| | Pessoa 1 | Pessoa 2 | Pessoa 3 |
|---|---|---|---|
| Enviou sem ajuda? | | | |
| Tempo até 5 min? | | | |

**Passou?** ☐ Sim (2 ou 3 enviaram sem ajuda, em até 5 min) ☐ Não

Depois, me mande as fichas, ou só os "onde travou". Eu proponho as correções.

---

Observação: o RNF-14 fala em "lista de 10 produtos em 5 minutos". O catálogo de exemplo só tem 8 produtos, então este teste usa 3 produtos mais a troca de quantidade. Quando a lista real entrar, dá para repetir com 10.
