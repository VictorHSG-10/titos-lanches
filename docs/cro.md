# Revisão de conversão (CRO)

Feita com a skill `cro` sobre a versão com o logo da Titos, em 2026-10-10. Página de negócio local. Ação principal: pedir pelo WhatsApp, de preferência montando a sacola no cardápio. Tráfego esperado: bio do Instagram, status do WhatsApp, Google Maps. Quase tudo no celular, à noite.

## Diagnóstico

| Dimensão | Situação |
|---|---|
| Proposta de valor | Clara em 5 segundos: lanche, delivery, Centro de Maricá, pedido pelo WhatsApp, cerca de 40 minutos. Fraca em diferenciação até chegar o `[NEED: diferencial da casa]`. |
| Headline | Fala do resultado (lanche quente na porta). O selo "Delivery no Centro de Maricá" faz a parte local. |
| CTA | Principal "Montar meu pedido", visível sem rolar no celular (390x844) e no desktop. Secundário "Pedir pelo WhatsApp" para quem já sabe o que quer. Repetidos no fim da página, no topo fixo (sacola) e na barra fixa do celular. |
| Hierarquia visual | O arco e o título dominam a primeira dobra. A faixa de dados responde tempo, taxa, retirada e pagamento antes da rolagem. O cardápio vem logo depois. |
| Prova social | **Ausente.** Maior lacuna. A marca "Mais pedido" é o único sinal, e ainda é exemplo. |
| Objeções | Aberto agora (status ao vivo no topo e no horário), taxa por bairro, tempo, retirada, pagamento e troco, trocar ingrediente, pedido mínimo, último pedido. Falta "é bom?", que só fotos e avaliações respondem. |
| Atrito | Sacola com 6 campos, todos opcionais, e o botão de enviar sempre visível no rodapé da sacola. A mensagem já vai com itens, total, bairro, endereço e pagamento, o que corta a conversa no WhatsApp. Fora do horário, a sacola avisa quando a gente responde. |
| Velocidade | HTML, CSS e cerca de 400 linhas de JS sem dependências. Imagens: só o logo (88 KB). A única dependência externa são as fontes do Google. |

## Aplicado nesta revisão

- Número do WhatsApp por escrito em "Onde fica" e no rodapé. No computador, `wa.me` abre o WhatsApp Web, e quem não está logado cai num QR code. Com o número na tela, a pessoa manda pelo celular.
- Aviso na sacola quando a lanchonete está fechada ("Pode mandar o pedido, e a gente responde quando abrir, hoje às 18h"). Sem ele, quem pede às 15h acha que foi ignorado.
- O status no topo diz o horário do último pedido, que é a pergunta de quem chega perto de fechar.

## Alto impacto (precisa do dono da lanchonete)

1. **Fotos reais dos lanches.** Comida se vende pelo olho, e hoje a página não tem nenhuma foto. Prioridade: X-Tudo, batata com cheddar e bacon e milkshake. Uma foto quadrada por item no cardápio e uma grande do mais pedido no topo (ver `design.md`).
2. **Nota e avaliações.** Com a nota real do Google ou do iFood, colocar "4,x no Google, N avaliações" logo abaixo dos botões do topo, e 2 ou 3 trechos de avaliação antes do "Como pedir".
3. **Preço de balcão.** Se o preço no WhatsApp é menor que no iFood (o comum, por causa da comissão), dizer isso no topo: é o motivo mais forte para pedir direto. Só com o dado confirmado.
4. **Combos.** Um combo (lanche, batata e refrigerante) com preço fechado sobe o valor médio do pedido e simplifica a escolha. Entraria como primeira aba do cardápio.
5. **Medição.** Sem dados de clique não dá para saber o que funciona. Sugestão: Vercel Web Analytics ou Plausible (sem cookies, dispensa banner da LGPD) com eventos em "Enviar pedido pelo WhatsApp", "Pedir pelo WhatsApp" e no primeiro "+" de cada visita. No Instagram e no Google, usar o link com `?utm_source=instagram&utm_medium=bio` e `?utm_source=google&utm_medium=perfil`.

## Ideias de teste

Uma lanchonete de bairro recebe poucas centenas de visitas por semana, o que não basta para um A/B chegar a um resultado confiável. Melhor fazer uma mudança por vez, medir os envios de pedido por 3 a 4 semanas e comparar com o período anterior.

- Sugestão na sacola: se não tem porção nem bebida, mostrar "Quer uma batata ou um refri junto?" com o + direto. Mede valor médio do pedido.
- Topo com foto do lanche mais pedido dentro do arco contra o topo atual, só tipográfico.
- No celular, abrir a página já rolada até o cardápio quando o link vem do Instagram (`#cardapio` no link da bio).
- "Montar meu pedido" contra "Ver cardápio" no botão principal.

## Alternativas de CTA

- **Montar meu pedido** (atual). Diz o que a pessoa vai fazer e combina com a sacola.
- **Ver cardápio e pedir.** Mais literal para quem nunca viu uma sacola em site de lanchonete.
- **Escolher meu lanche.** Mais leve e mais perto da fome. Vale testar se a medição mostrar muita gente parando no topo.
