# Briefing

Fonte da verdade sobre a Titos Lanches. A copy (`copy.md`) e a página (`index.html`) saem daqui. Quando um dado real chegar, atualize este arquivo primeiro.

## Página

- **Tipo:** landing page de negócio local, uma página só. Hoje é um modelo demonstrativo para apresentar a clientes, com dados de exemplo.
- **Ação principal:** pedir pelo WhatsApp. O caminho preferido é montar a sacola no cardápio e mandar o pedido pronto. Quem já sabe o que quer pode mandar mensagem direto.
- **Ação secundária:** retirar no balcão (endereço e Google Maps).
- **Tráfego esperado:** link na bio do Instagram, status do WhatsApp, Google Maps ("lanchonete perto de mim", "lanche delivery Maricá"), indicação. Quase todo mundo chega pelo celular, à noite, com fome.
- **O que o visitante já sabe:** que quer comer agora. Quer ver o cardápio com preço, saber se está aberto, quanto custa a entrega e quanto tempo demora.

## Público

Moradores do Centro de Maricá e dos bairros vizinhos, de 16 a 45 anos. Pedem lanche à noite durante a semana e em família no fim de semana. Comparam com o que aparece no iFood e com a lanchonete da esquina.

**Problema que resolvem:** matar a fome sem sair de casa e sem uma conversa longa no WhatsApp para descobrir cardápio, preço, taxa e tempo.

**Objeções comuns:**
- Está aberto agora?
- Entrega no meu bairro? Quanto é a taxa?
- Quanto tempo demora?
- Dá para tirar ou trocar ingrediente?
- Aceita Pix? Leva maquininha? Tem troco?
- Tem pedido mínimo?

## Proposta de valor

Lanche feito na chapa e entregue em cerca de 40 minutos no Centro de Maricá. Você monta o pedido no cardápio da página e ele chega pronto no WhatsApp, com itens, total e endereço. A gente só confirma e manda para a chapa.

**Diferencial:** pedir pelo WhatsApp direto com a lanchonete, com preço de balcão e sem app no meio. `[NEED: diferencial da casa]` Perguntar ao dono o que só a Titos tem: um molho da casa, o tamanho do hambúrguer, o tempo de casa, o dono que atende pessoalmente. Com isso, a headline pode ficar mais específica.

## Voz

Casual e direta, como quem atende no balcão. Usa "a gente", "você" e "pra" quando soa natural. Sem gíria forçada, sem exclamação (a mensagem pré-preenchida do WhatsApp é a exceção), sem jargão de marketing.

## Dados da lanchonete

O que está como **exemplo** precisa ser confirmado com o dono. No `index.html`, cada valor de exemplo está num elemento com `data-exemplo`. Rode `./scripts/checar-conteudo.py` para ver o que falta.

| Dado | Valor atual | Status |
|---|---|---|
| Nome | Titos Lanches | confirmado (nome do projeto) |
| Marca no logo | TITOS DELIVERY | confirmado (logo) |
| Modelo | delivery, com retirada no balcão | delivery confirmado (logo); retirada é exemplo |
| Endereço | Rua da Matriz, 45, Centro, Maricá, RJ | exemplo |
| Ponto de referência | De frente para a praça, com mesas na calçada | exemplo |
| WhatsApp | 5521999990000, (21) 99999-0000 | exemplo |
| Horário | Ter a qui 18h às 23h, sex e sáb 18h à meia-noite, dom 18h às 23h, seg fechado | exemplo |
| Último pedido | 30 minutos antes de fechar | exemplo |
| Tempo de entrega | cerca de 40 minutos | exemplo |
| Tempo para retirada | cerca de 20 minutos | exemplo |
| Taxa no Centro | R$ 5 | exemplo |
| Taxa em Flamengo, Mumbuca e Araçatiba | R$ 8 | exemplo |
| Outros bairros | a combinar no WhatsApp | exemplo |
| Pedido mínimo | não tem | exemplo |
| Pagamento | Pix, cartão de débito e crédito (maquininha na entrega), dinheiro com troco | exemplo |
| Instagram | (fora da página até ter o @ real) | pendente |
| Domínio | victorhsg-10.github.io/titos-lanches (prévia no GitHub Pages) | prévia |

### Cardápio (exemplo)

| Categoria | Item | Descrição | Preço |
|---|---|---|---|
| Lanches | X-Burguer | Pão brioche, hambúrguer de 120 g, queijo e maionese da casa | R$ 22 |
| Lanches | X-Salada | Hambúrguer de 120 g, queijo, alface, tomate e maionese da casa | R$ 24 |
| Lanches | X-Bacon | Hambúrguer de 120 g, queijo, bacon crocante e cebola na chapa | R$ 27 |
| Lanches | X-Tudo | Dois hambúrgueres, ovo, bacon, presunto, queijo, alface e tomate | R$ 32 |
| Lanches | Cachorro-quente | Duas salsichas, molho de tomate, milho, batata palha e queijo ralado | R$ 14 |
| Lanches | Misto quente | Pão de forma na chapa com presunto e queijo derretido | R$ 12 |
| Porções | Batata frita | 300 g, serve duas pessoas | R$ 20 |
| Porções | Batata com cheddar e bacon | 300 g coberta com cheddar cremoso e bacon | R$ 28 |
| Porções | Aipim frito | 400 g, crocante por fora e macio por dentro | R$ 22 |
| Porções | Calabresa acebolada | Calabresa fatiada na chapa com cebola. Acompanha pão | R$ 30 |
| Bebidas | Milkshake 400 ml | Chocolate, morango ou baunilha | R$ 16 |
| Bebidas | Suco natural 400 ml | Laranja, maracujá ou abacaxi com hortelã | R$ 9 |
| Bebidas | Refrigerante lata | 350 ml, vários sabores | R$ 6 |
| Bebidas | Água mineral | 500 ml, com ou sem gás | R$ 4 |

`[NEED: itens mais pedidos]` A página marca X-Tudo e Batata com cheddar e bacon como "Mais pedido". É exemplo. Com o cliente real, use os itens que mais saem de verdade, ou tire a marca.

## Prova social (pendente, não inventar)

Depoimentos, nota e número de avaliações só entram na página com dados reais. Inventar isso quebra a confiança e pode gerar problema legal (CDC, publicidade enganosa).

- `[NEED: nota e número de avaliações no Google ou no iFood]`
- `[NEED: 2 a 3 avaliações reais, com primeiro nome e autorização]`
- `[NEED: fotos reais]` dos lanches mais pedidos, da chapa e da fachada. Comida é vendida pelo olho, então fotos boas são a maior melhoria possível nesta página. Uma foto 1200x630 para compartilhamento (`og:image`). Hoje o `og:image` é o logo.

## Marca

- Logo recebido: JPEG 1080x1080, fundo preto. Arco duplo (vermelho por fora, âmbar por dentro), "TITOS" em branco numa mono pesada e "DELIVERY" em cor de areia, num sans condensado.
- `assets/logo-titos.png`: recorte com fundo transparente, 480px. Cores e fontes da página saem dele (ver `design.md`).
- `[NEED: logo em SVG]` e o nome das fontes originais, se quem fez o logo souber.
