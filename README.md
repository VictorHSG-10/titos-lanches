# Titos Lanches: landing page

Página da Titos Lanches para pedir lanche pelo WhatsApp. A pessoa monta a sacola no cardápio e o pedido chega pronto na conversa, com itens, total, bairro, endereço e forma de pagamento. HTML, CSS e JavaScript puros, sem build e sem dependências.

Hoje é um **modelo demonstrativo** com dados de exemplo, feito para apresentar a clientes.

Prévia: https://victorhsg-10.github.io/titos-lanches/

## Rodar

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000.

## O que a página faz

- **Sacola:** o + de cada item coloca na sacola. A sacola calcula subtotal, taxa do bairro e total, e o botão "Enviar pedido pelo WhatsApp" abre a conversa com o pedido escrito. Fica salva no navegador se a pessoa recarregar a página.
- **Aberto agora:** o topo e a seção de horário mostram se está aberto, até que horas dá para pedir ou quando abre, sempre na hora de Maricá. O dia de hoje fica marcado na tabela.
- **Mapa de entrega:** as zonas de taxa desenhadas com os dois arcos do logo.
- **Sem JavaScript:** o cardápio aparece inteiro e cada item tem um link "Pedir" que abre o WhatsApp com o item.

## Antes de publicar para um cliente

A página está com dados de exemplo (endereço, horário, cardápio, taxas, WhatsApp). Para ver o que falta trocar:

```bash
./scripts/checar-conteudo.py
```

A lista completa de dados e o que ainda falta pedir ao dono estão em [docs/briefing.md](docs/briefing.md). O passo a passo de onde cada dado se repete está no [CLAUDE.md](CLAUDE.md).

## Publicar

Qualquer hospedagem de site estático serve (GitHub Pages, Vercel, Netlify). Publique a pasta inteira. Não há etapa de build.

No GitHub Pages, um `git push` para a branch `main` atualiza o site em 1 a 2 minutos (aba **Actions**). Depois, abra o site e aperte **Ctrl + Shift + R** para o navegador buscar a versão nova.

## Documentação

- [docs/briefing.md](docs/briefing.md): fatos da lanchonete, cardápio, público e pendências
- [docs/copy.md](docs/copy.md): texto da página e o motivo de cada escolha
- [docs/design.md](docs/design.md): cores, tipografia, ícones e layout, todos tirados do logo
- [docs/cro.md](docs/cro.md): revisão de conversão e próximos passos
