# Design

Plano visual da página, feito com a skill `frontend-design`. Os tokens vivem em `css/styles.css` (`:root`). Mudou um token, atualize aqui.

## Conceito: ketchup e mostarda

O design system vem do logo da Titos (`assets/logo-titos.png`), que tem quatro elementos:

1. fundo preto puro;
2. um arco duplo, vermelho por fora e âmbar por dentro. É a tampa do pão desenhada com ketchup e mostarda;
3. "TITOS" em branco, numa mono muito pesada, com serifas no I, como letra de comanda impressa;
4. "DELIVERY" em cor de areia, num sans condensado em caixa alta, logo abaixo.

A página usa esses quatro elementos. O arco é a assinatura e aparece em três lugares, sempre com função: sobre o título do topo (a mesma composição do logo, em tamanho de tela), no mapa de entrega (arco de dentro é a zona perto, arco de fora é a zona longe) e sobre a chamada final, fechando a página como ela abriu. A mono pesada é a voz da chapa: títulos, preços, números dos passos e totais da sacola, como uma comanda. O sans condensado em areia aparece em caixa alta uma vez só, no selo abaixo do título, no lugar onde o logo escreve "DELIVERY".

## Cor

| Token | Hex | Papel |
|---|---|---|
| `--preto` | `#000000` | fundo de tudo, como o logo |
| `--chapa` | `#141414` | superfície elevada: sacola, campos do formulário, item na sacola. Só para separar camadas, nunca no lugar do fundo |
| `--ketchup` | `#B70A0A` | o arco de fora: arcos, marca "Mais pedido", contador da sacola, zona longe do mapa |
| `--ketchup-claro` | `#E5352B` | marcas pequenas em vermelho sobre o preto (ponto de "fechado"), onde o `--ketchup` não chega a 3:1 |
| `--mostarda` | `#F5A634` | o arco de dentro: botões, preços, foco, aba ativa, números dos passos, zona perto do mapa |
| `--mostarda-clara` | `#FFBD5C` | hover do botão |
| `--areia` | `#C6A573` | o "DELIVERY": selo do topo, observações curtas (gramatura, "hoje") |
| `--branco` | `#FFFFFF` | títulos e texto |
| `--cinza` | `#A8A8A8` | texto secundário |
| `--linha` | `#2B2B2B` | divisórias e bordas |

Ketchup, mostarda e areia são a mediana dos pixels de cada cor no logo enviado.

Contraste (WCAG, sobre `--preto`): branco 21:1, mostarda 10.4:1, areia 9.0:1, cinza 8.9:1, ketchup-claro 4.9:1. Texto preto no botão mostarda 10.4:1. Texto branco sobre ketchup 6.9:1. O `--ketchup` puro (3.1:1 sobre preto) só aparece como arco, preenchimento com texto branco ou zona do mapa, nunca como texto.

## Tipografia

- **JetBrains Mono 800** é a fonte mais próxima do "TITOS" (mesmas serifas no I, O retangular de cantos redondos). Vai em caixa alta no H1 e nos H2, e com peso 700 nos preços, números dos passos e totais. Nunca em parágrafo nem em rótulo pequeno.
- **Roboto** (variável, largura 75 a 100, peso 400 a 700) no resto. Na largura 100%, é o texto corrido. Na largura 75%, faz o papel do "DELIVERY": o selo do topo em caixa alta e areia, e detalhes curtos em caixa de frase.
- Escala: corpo 17px / 1.6. Pequeno 15px. H3 19px. H2 28 a 44px, entrelinha 1.05. H1 40 a 92px, entrelinha 0.95, espaçamento -0.02em.
- O H1 e os H2 estão em caixa de frase no HTML e viram caixa alta por CSS (`text-transform`). Leitor de tela e busca leem o texto normal.
- Na mono, `1ch` é exatamente a largura de uma letra. O H1 tem `max-width: 15.5ch` para quebrar em "DA CHAPA DIRETO / PRA SUA PORTA" no desktop.

## Ícones

Família única, no estilo do Lucide (licença ISC): traço de 2px, pontas redondas, grade de 24px, desenhados num sprite `<symbol>` no topo do `index.html` e usados com `<use href="#i-...">`. A moto foi desenhada à mão no mesmo traço, porque o Lucide só tem bicicleta. O ícone do WhatsApp é o glifo oficial (Simple Icons, CC0), preenchido.

Onde entram: botões de WhatsApp, botão da sacola, + e − do cardápio, faixa de dados do topo (moto, pino, loja, cartão), endereço, marca "Mais pedido" (chama), fechar. Ícone nunca decora título e nunca aparece sozinho sem texto ou rótulo para leitor de tela.

## Layout

```
Desktop                                         Mobile
┌──────────────────────────────────────────┐    ┌──────────────────┐
│ (logo)  Cardápio Entrega Horário (Sacola)│    │ (logo)  (Sacola) │
├──────────────────────────────────────────┤    ├──────────────────┤
│        ╭━━━━━━━━ ketchup ━━━━━━━━╮       │    │   ╭━━━━━━━━━━╮   │
│      ╭━━━━━━━━ mostarda ━━━━━━━━━━╮      │    │  ╭━━━━━━━━━━━━╮  │
│     ┃      (● Aberto agora)        ┃     │    │  DA CHAPA        │
│         DA CHAPA DIRETO                  │    │  DIRETO PRA      │
│          PRA SUA PORTA                   │    │  SUA PORTA       │
│     DELIVERY NO CENTRO DE MARICÁ         │    │  DELIVERY ...    │
│        sub (centralizado)                │    │  sub             │
│  (Montar meu pedido) (Pedir pelo WA)     │    │ (Montar pedido)  │
│ ──────────────────────────────────────── │    │ (Pedir pelo WA)  │
│ moto 40min | pino R$5 | loja | cartão    │    │ faixa 2x2        │
├──────────────────────────────────────────┤    ├──────────────────┤
│ CARDÁPIO  [Lanches][Porções][Bebidas]    │    │ CARDÁPIO + abas  │
│ item ........ R$ 22 (+) │ item ... (−1+) │    │ item ..... (+)   │
├──────────────────────────────────────────┤    │ passos 1 2 3     │
│ 1 - - - - - 2 - - - - - 3 (passos)       │    │ mapa + zonas     │
│ zonas + taxas       │  mapa em arcos     │    │ horário / onde   │
│ Horário (hoje)      │  Onde fica         │    │ perguntas        │
│ Perguntas                                │    │ arco + chamada   │
│ arco + BATEU A FOME? (centralizado)      │    │ rodapé           │
│ rodapé                                   │    │[Ver sacola 3 R$] │
└──────────────────────────────────────────┘    └──────────────────┘
                     Sacola: gaveta à direita (desktop) ou folha de baixo (celular)
```

O topo é centralizado porque repete o logo. A chamada final também, para fechar a página do mesmo jeito. O resto é alinhado à esquerda. Cabeçalho fixo no topo com o botão da sacola. Abaixo de 768px, uma barra fixa no rodapé da tela mostra "Pedir pelo WhatsApp" (sacola vazia) ou "Ver sacola" com quantidade e total.

## Princípios

1. **O arco é a assinatura.** Três aparições, cada uma com função. Nenhum outro elemento decorativo compete com ele.
2. **Ketchup por fora, mostarda por dentro.** Mostarda marca onde agir (botões, +, aba ativa, foco) e o que importa (preços). Ketchup marca destaque e alerta (mais pedido, contador, fechado). Texto corrido nunca é colorido.
3. **A mono é a comanda.** Títulos, preços e totais na mono pesada, como impresso na cozinha. O texto que se lê, em Roboto.
4. **Estrutura tem significado.** Números só nos passos. Sem cards no cardápio: itens em linhas com divisória, como num cardápio de parede. Sem rótulo em caixa alta acima de título.
5. **Movimento com motivo.** Um momento orquestrado: o arco do topo se desenha ao carregar (ketchup, depois mostarda). O resto responde ao usuário: o + vira contador, o contador da sacola pulsa, a sacola desliza, a pergunta abre. O ponto de "Aberto agora" pulsa devagar. Tudo para com `prefers-reduced-motion`.
6. **JavaScript como melhoria.** Sem JS, o cardápio aparece inteiro, cada item tem um link "Pedir" que abre o WhatsApp com o item escrito, o arco aparece pronto e a barra fixa mostra "Pedir pelo WhatsApp". Nada quebra.

## Revisão contra o padrão genérico

Primeiro plano, e o que mudou depois de comparar com o que sairia para qualquer lanchonete:

- **Fundo preto com acento forte** é o clichê nº 2 de página gerada. Aqui o preto vem do logo, e a página tem duas cores com papéis diferentes (ketchup e mostarda) mais a areia, todas tiradas do logo. O que torna a página da Titos é o arco e a mono da comanda.
- **Cortado: hambúrguer ilustrado no topo.** O primeiro plano tinha um hambúrguer em traço ao lado do título. Eram dois heróis disputando o olho, e o arco já é a tampa do pão.
- **Cortado: sacola em papel branco de comanda.** Seria um segundo elemento ousado. A sacola ficou escura, com linha picotada e totais na mono.
- **Mudado: topo centralizado.** O plano começou com título à esquerda e um quadro à direita, que é o layout padrão. Centralizar sob o arco repete o logo, que é a única referência visual que a casa tem hoje.
- **Mantido com cuidado: faixa de dados com ícones.** É um padrão comum, mas responde as três perguntas de quem chega com fome (tempo, taxa, pagamento). Vai numa linha só com divisórias, sem cards.
- Evitados: rótulo em caixa alta acima de título, numeração fora de sequência, mono em rótulo pequeno, seta em botão, meta com ponto no meio ("A · B · C"), gradiente, sombra cinza em card.

## Notas para próximas passadas

- Screenshots de revisão vão em `.screenshots/` (fora do git). Ver `CLAUDE.md`.
- O Firefox headless não avança animações. Para o screenshot mostrar o arco inteiro, o perfil de teste liga `ui.prefersReducedMotion` (ver `CLAUDE.md`).
- `[NEED: fotos reais]` Com fotos boas dos lanches, a maior mudança seria uma foto por item no cardápio (quadrada, à esquerda do nome) e uma foto grande do lanche mais pedido dentro do arco do topo.
