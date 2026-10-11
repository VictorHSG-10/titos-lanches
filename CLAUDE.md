# Titos Lanches: landing page

Landing page da Titos Lanches (logo "TITOS DELIVERY"), lanchonete com delivery no Centro de Maricá. Hoje é um modelo demonstrativo com dados de exemplo. Ação principal: **pedir pelo WhatsApp**, de preferência montando a sacola no cardápio. Ação secundária: retirar no balcão (endereço e Google Maps). HTML, CSS e JS estáticos, sem build.

O projeto segue o padrão de `example/` (Seu Luiz Barbearia), que está no `.gitignore` e serve só de referência.

## Comandos

```bash
python3 -m http.server 8000          # servir em http://localhost:8000 (rodar na raiz do projeto)
./scripts/checar-conteudo.py         # lista conteúdo de exemplo; sai com 1 enquanto houver pendência
```

Screenshot para revisar o visual (Firefox é snap e só grava dentro do home, por isso `.screenshots/`, que está no `.gitignore`):

```bash
P=$PWD/.screenshots; mkdir -p "$P/perfil"
echo 'user_pref("ui.prefersReducedMotion", 1);' > "$P/perfil/user.js"
firefox --headless --no-remote --profile "$P/perfil" --window-size=390,844 --screenshot "$P/mobile.png" http://127.0.0.1:8000/
```

Use 390x844 (celular), 768x1024 (tablet) e 1440x900 (desktop). Para a página inteira, aumente a altura da janela (por exemplo 1440,5200). O headless não avança animações: sem o `prefersReducedMotion` no perfil, o arco do topo sai invisível. Ele também não clica. Para ver a sacola aberta, `.screenshots/teste-sacola.html` carrega a página num iframe, aperta os botões e mostra a mensagem gerada ao lado. Para testar sem JavaScript, use um perfil com `user_pref("javascript.enabled", false);`.

Node não está instalado nesta máquina. Não adicione framework, build ou `package.json` sem perguntar.

## Estrutura

- `index.html`: a página inteira, com JSON-LD (`FastFoodRestaurant`) no `<head>` e o sprite de ícones (`<symbol>`) no começo do `<body>`.
- `css/styles.css`: tokens em `:root` e estilos. Classes em português, no formato `bloco__elemento--modificador`.
- `js/pagina.js`: abas do cardápio, sacola (contadores, formulário, mensagem do WhatsApp, `localStorage`), status de aberto/fechado, barra fixa. As constantes `WHATSAPP`, `HORARIO` e `ULTIMO_PEDIDO_ANTES` no topo repetem dados do briefing.
- `assets/logo-titos.png`: logo com fundo transparente (480px), feito do JPEG enviado. `assets/favicon-64.png`, `assets/icone-180.png` (tela inicial) e `assets/og-titos.png` (compartilhamento, 1200x630).
- `scripts/checar-conteudo.py`: checagem de pendências antes de publicar.
- `docs/briefing.md`: fatos da lanchonete, cardápio, público, objeções e dados pendentes. **Fonte da verdade.**
- `docs/copy.md`: texto de cada seção, com o porquê e alternativas.
- `docs/design.md`: conceito, tokens, ícones, layout, princípios e notas de passadas anteriores.
- `docs/cro.md`: revisão de conversão e próximos passos.

## Fluxo de trabalho com as skills

As skills globais `copywriting`, `frontend-design` e `cro` (em `~/.claude/skills/`) são usadas nesta ordem, como manda o CLAUDE.md global:

1. **copywriting**: parte do `docs/briefing.md` e atualiza o `docs/copy.md`.
2. **frontend-design**: plano e revisão contra o padrão genérico no `docs/design.md`, depois o código.
3. **cro**: revisa a página pronta e atualiza o `docs/cro.md`.

Uma seção nova, uma headline nova ou uma mudança de layout passam pelas três. Uma troca de dado (preço, horário, taxa) não precisa, basta atualizar o briefing e o código. Código e docs mudam juntos: se o HTML diverge do `copy.md` ou do `design.md`, o doc está desatualizado.

## Conteúdo

- Todo valor de exemplo no HTML está num elemento com `data-exemplo="o que é"`. Ao colocar o dado real, troque o texto e **remova o atributo**.
- Dado real entra primeiro no `docs/briefing.md`. Depois, onde ele se repete: `<title>`, meta description, `og:title`, JSON-LD, topo, faixa de dados, cardápio, passos, entrega, horário, perguntas, chamada final, rodapé, opções de bairro da sacola e as constantes do `js/pagina.js`. Busque pelo valor antigo para não esquecer nenhum.
- Horário mudou: atualize a tabela (`data-dias`, 0 é domingo), o `HORARIO` do `js/pagina.js`, o JSON-LD, o status sem JS ("De terça a domingo...") e a pergunta "Até que horas posso pedir?".
- O número de WhatsApp de exemplo (`5521999990000`) está nos links `wa.me` do HTML e na constante `WHATSAPP` do JS. As mensagens pré-preenchidas do HTML são URL-encoded: gere com `urllib.parse.quote` em vez de escrever à mão.
- Item novo no cardápio: um `<li class="item">` com `data-id` único, `data-nome` e `data-preco` (número em reais), mais o link `item__pedir` com a mensagem codificada. O JS cria o contador sozinho.
- Taxa ou bairro novo: `data-taxa` nas `<option>` da sacola, a lista `.zonas` e o mapa (`.mapa__taxa`). Bairro sem taxa fixa: `data-taxa=""`, que vira "a combinar".
- **Nunca invente** depoimento, nota, número de avaliações, item "mais pedido", anos de casa ou estatística. Sem o dado, marque `[NEED: ...]` no doc e pergunte.

## Copy

- Português do Brasil. Voz casual e direta, de quem atende no balcão: "a gente", "você", "pra" quando soa natural.
- Ações com o mesmo nome em todo lugar: **Montar meu pedido** (vai ao cardápio), **Pedir pelo WhatsApp** (mensagem genérica) e **Enviar pedido pelo WhatsApp** (botão da sacola).
- Sem travessão em texto curto, sem "não é X, é Y", sem lista de negações, sem pergunta retórica respondida pelo próprio texto, sem exclamação (a mensagem pré-preenchida do WhatsApp é a exceção). Títulos em caixa de frase no HTML.

## Design

- O design system vem do logo: fundo preto, arco duplo (ketchup por fora, mostarda por dentro), "TITOS" em mono pesada branca e "DELIVERY" em sans condensada cor de areia. Detalhes em `docs/design.md`. Cor ou fonte nova só se vier do logo.
- Use só as cores de `:root`. Fundo preto puro (`--preto`); `--chapa` só para superfícies elevadas (sacola, item na sacola, linha de hoje). Mostarda marca onde agir e preços. Ketchup marca destaque e alerta, e nunca é texto sobre preto (use `--ketchup-claro` em marcas pequenas). Texto corrido nunca é colorido.
- JetBrains Mono 800 em H1, H2, preços, números dos passos e totais, sempre em caixa alta via `text-transform` nos títulos. Roboto no resto. Roboto com `font-stretch: 75%` em caixa alta só no selo do topo.
- O arco aparece em três lugares: topo (animado ao carregar), mapa de entrega e chamada final. Não espalhe o arco como enfeite.
- Ícones do sprite, traço de 2px, só onde ajudam a ler rápido. Ícone novo segue o mesmo estilo (Lucide) e entra como `<symbol id="i-...">`.
- Evite: cards, rótulos em caixa alta acima de títulos, setas em botões, gradientes, sombras cinza, numeração em conteúdo que não é sequência, animação de entrada por seção.
- Piso de qualidade: funciona em 390px sem rolagem horizontal, foco visível, contraste AA (valores no `design.md`), `prefers-reduced-motion` respeitado. A página funciona com JS desligado (cardápio inteiro com links "Pedir").

## GitHub

- Repositório: https://github.com/VictorHSG-10/titos-lanches (público), branch `main`. Prévia no GitHub Pages: https://victorhsg-10.github.io/titos-lanches/ (o `canonical`, o `og:url` e o JSON-LD apontam para lá).
- O remote é HTTPS e o push usa o login do `gh` (`gh auth status`). A chave SSH da máquina tem senha e não é usada aqui.
- `example/` e `.screenshots/` ficam fora do repositório.

## Antes de publicar para um cliente real

1. `./scripts/checar-conteudo.py` passa sem pendências.
2. `og:image` com foto real 1200x630 e `canonical` com o domínio do cliente.
3. Link do Google Maps apontando para o perfil da empresa, não para uma busca de endereço.
4. Links do WhatsApp e a mensagem da sacola testados num celular de verdade.
5. Analytics com evento de clique no WhatsApp (ver `docs/cro.md`).
6. Tirar a linha "Modelo demonstrativo" do rodapé.

Publicar é uma ação externa: confirme com o usuário antes de fazer deploy.
