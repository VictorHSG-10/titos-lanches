// Interatividade da página. Tudo aqui é melhoria: sem JavaScript, o cardápio
// aparece inteiro e cada item tem um link "Pedir" que abre o WhatsApp.

// ===== 0. Dados da lanchonete =====
// Mesmos valores do docs/briefing.md. Mudou lá, mude aqui e no index.html.
const WHATSAPP = "5521999990000";
const FUSO = "America/Sao_Paulo";
const ULTIMO_PEDIDO_ANTES = 30; // minutos antes de fechar
// Abre e fecha em minutos desde a meia-noite. 0 é domingo. null é fechado.
const HORARIO = {
  0: [18 * 60, 23 * 60],
  1: null,
  2: [18 * 60, 23 * 60],
  3: [18 * 60, 23 * 60],
  4: [18 * 60, 23 * 60],
  5: [18 * 60, 24 * 60],
  6: [18 * 60, 24 * 60],
};
const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const reais = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/ /g, " ");

const icone = (nome) =>
  `<svg class="icone" aria-hidden="true"><use href="#i-${nome}"/></svg>`;

const aviso = document.querySelector("[data-aviso]");
function anunciar(texto) {
  aviso.textContent = "";
  // Pequeno atraso para o leitor de tela perceber a troca, mesmo com o mesmo texto
  setTimeout(() => { aviso.textContent = texto; }, 50);
}

function pulsar(elemento) {
  elemento.classList.remove("pulsa");
  void elemento.offsetWidth; // reinicia a animação
  elemento.classList.add("pulsa");
}

// ===== 1. Abas do cardápio =====
const abas = Array.from(document.querySelectorAll(".aba"));

function mostrarAba(abaEscolhida) {
  abas.forEach((aba) => {
    const ativa = aba === abaEscolhida;
    aba.setAttribute("aria-selected", String(ativa));
    aba.tabIndex = ativa ? 0 : -1; // só a aba ativa recebe o Tab do teclado
    document.getElementById(aba.getAttribute("aria-controls")).hidden = !ativa;
  });
}

abas.forEach((aba, i) => {
  aba.addEventListener("click", () => mostrarAba(aba));

  // Setas esquerda/direita trocam de aba (navegação por teclado)
  aba.addEventListener("keydown", (evento) => {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
    const passo = evento.key === "ArrowRight" ? 1 : -1;
    const proxima = abas[(i + passo + abas.length) % abas.length];
    mostrarAba(proxima);
    proxima.focus();
  });
});

mostrarAba(abas[0]);

// ===== 2. Sacola: estado =====
// O cardápio vem do HTML: cada .item tem data-id, data-nome e data-preco.
const cardapio = new Map();
document.querySelectorAll(".item").forEach((item) => {
  cardapio.set(item.dataset.id, {
    nome: item.dataset.nome,
    preco: Number(item.dataset.preco),
    elemento: item,
  });
});

const CHAVE = "titos-sacola";
let sacola = {}; // { id: quantidade }

try {
  const salva = JSON.parse(localStorage.getItem(CHAVE) || "{}");
  for (const [id, qtd] of Object.entries(salva.itens || {})) {
    if (cardapio.has(id) && qtd > 0) sacola[id] = Math.min(qtd, 99);
  }
} catch (erro) {
  sacola = {};
}

function guardar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ itens: sacola }));
  } catch (erro) {
    // Navegação privada ou armazenamento bloqueado: a sacola vale só nesta visita
  }
}

function quantidadeTotal() {
  return Object.values(sacola).reduce((soma, qtd) => soma + qtd, 0);
}

function subtotal() {
  return Object.entries(sacola).reduce((soma, [id, qtd]) => soma + cardapio.get(id).preco * qtd, 0);
}

function mudar(id, delta) {
  const atual = sacola[id] || 0;
  const nova = Math.max(0, Math.min(99, atual + delta));
  if (nova === 0) delete sacola[id];
  else sacola[id] = nova;
  guardar();
  atualizarTudo();

  const { nome } = cardapio.get(id);
  const total = quantidadeTotal();
  const resumo = total ? `${total} ${total === 1 ? "item" : "itens"}, ${reais(subtotal())}.` : "Sacola vazia.";
  const mudanca = nova > atual ? `${nome} na sacola.` : nova ? `${nome}: ${nova} na sacola.` : `${nome} saiu da sacola.`;
  anunciar(`${mudanca} ${resumo}`);
}

// ===== 3. Sacola: contadores (+ e −) =====
function criarContador(id) {
  const { nome } = cardapio.get(id);
  const contador = document.createElement("div");
  contador.className = "contador";
  contador.dataset.contador = id;
  contador.innerHTML = `
    <button type="button" data-menos aria-label="Diminuir ${nome}">${icone("menos")}</button>
    <span class="contador__qtd" aria-hidden="true"></span>
    <button type="button" data-mais aria-label="Colocar ${nome} na sacola">${icone("mais")}</button>`;
  contador.querySelector("[data-menos]").addEventListener("click", () => mudar(id, -1));
  contador.querySelector("[data-mais]").addEventListener("click", () => mudar(id, 1));
  return contador;
}

function atualizarContador(contador) {
  const id = contador.dataset.contador;
  const qtd = sacola[id] || 0;
  const { nome } = cardapio.get(id);
  contador.classList.toggle("contador--vazio", qtd === 0);
  contador.querySelector(".contador__qtd").textContent = qtd;
  contador.querySelector("[data-mais]").setAttribute(
    "aria-label",
    qtd === 0 ? `Colocar ${nome} na sacola` : `Aumentar ${nome}. Na sacola: ${qtd}`
  );
}

// Um contador em cada item do cardápio (no lugar do link "Pedir")
cardapio.forEach((produto, id) => {
  produto.elemento.querySelector(".item__acao").append(criarContador(id));
});

// ===== 4. Sacola: janela, formulário e mensagem =====
const janela = document.querySelector("[data-sacola]");
const lista = janela.querySelector("[data-sacola-itens]");
const form = janela.querySelector("[data-sacola-form]");
const botaoEnviar = janela.querySelector("[data-enviar]");
const avisoFechado = janela.querySelector("[data-aviso-fechado]");

function taxaEntrega() {
  if (form.receber.value === "retirada") return 0;
  const taxa = form.bairro.selectedOptions[0].dataset.taxa;
  return taxa === "" ? null : Number(taxa); // null: a combinar
}

function montarMensagem() {
  const linhas = ["Olá, Titos! Quero fazer um pedido:", ""];
  for (const [id, qtd] of Object.entries(sacola)) {
    const { nome, preco } = cardapio.get(id);
    linhas.push(`${qtd}x ${nome} (${reais(preco * qtd)})`);
  }

  const taxa = taxaEntrega();
  const entrega = form.receber.value === "entrega";
  linhas.push("", `Subtotal: ${reais(subtotal())}`);
  if (entrega) {
    linhas.push(`Entrega (${form.bairro.value}): ${taxa === null ? "a combinar" : reais(taxa)}`);
  }
  linhas.push(`Total: ${reais(subtotal() + (taxa || 0))}${taxa === null ? " + entrega" : ""}`, "");

  linhas.push(`Receber: ${entrega ? "entrega" : "retirada no balcão"}`);
  const campo = (rotulo, valor) => { if (valor.trim()) linhas.push(`${rotulo}: ${valor.trim()}`); };
  if (entrega) campo("Endereço", form.endereco.value);
  campo("Nome", form.nome.value);
  campo("Pagamento", form.pagamento.value);
  if (form.pagamento.value === "Dinheiro") campo("Troco para", form.troco.value);
  campo("Observação", form.observacao.value);

  return linhas.join("\n");
}

function atualizarSacola() {
  const vazia = quantidadeTotal() === 0;
  janela.querySelector("[data-sacola-vazia]").hidden = !vazia;
  janela.querySelector("[data-sacola-cheia]").hidden = vazia;

  // Itens: reaproveita a linha de quem já está na lista para não perder o foco
  const ids = Object.keys(sacola);
  lista.querySelectorAll("[data-linha]").forEach((linha) => {
    if (!sacola[linha.dataset.linha]) linha.remove();
  });
  ids.forEach((id) => {
    let linha = lista.querySelector(`[data-linha="${id}"]`);
    if (!linha) {
      const { nome } = cardapio.get(id);
      linha = document.createElement("li");
      linha.className = "sacola__item";
      linha.dataset.linha = id;
      linha.innerHTML = `<span class="sacola__item-nome">${nome}</span><span class="sacola__item-preco"></span>`;
      linha.append(criarContador(id));
      lista.append(linha);
    }
    const { preco } = cardapio.get(id);
    linha.querySelector(".sacola__item-preco").textContent =
      `${sacola[id]} × ${reais(preco)} = ${reais(preco * sacola[id])}`;
    atualizarContador(linha.querySelector("[data-contador]"));
  });

  // Campos que dependem de outras escolhas
  const entrega = form.receber.value === "entrega";
  form.querySelector("[data-so-entrega]").hidden = !entrega;
  form.querySelector("[data-so-dinheiro]").hidden = form.pagamento.value !== "Dinheiro";

  // Totais
  const taxa = taxaEntrega();
  janela.querySelector("[data-subtotal]").textContent = reais(subtotal());
  janela.querySelector("[data-taxa-entrega]").textContent =
    !entrega ? "Sem taxa" : taxa === null ? "A combinar" : reais(taxa);
  janela.querySelector("[data-total]").textContent = reais(subtotal() + (taxa || 0));

  botaoEnviar.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(montarMensagem())}`;
}

form.addEventListener("input", atualizarSacola);
form.addEventListener("change", atualizarSacola);
form.addEventListener("submit", (evento) => evento.preventDefault());

let ultimoFoco = null;
function abrirSacola() {
  ultimoFoco = document.activeElement;
  atualizarSacola();
  janela.showModal();
}

document.querySelectorAll("[data-abrir-sacola]").forEach((botao) => botao.addEventListener("click", abrirSacola));

janela.querySelectorAll("[data-fechar-sacola]").forEach((botao) => {
  botao.addEventListener("click", () => janela.close());
});

// Clique fora da sacola (no fundo escurecido) fecha
janela.addEventListener("click", (evento) => {
  if (evento.target === janela) janela.close();
});

janela.addEventListener("close", () => {
  if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
});

janela.querySelector("[data-esvaziar]").addEventListener("click", () => {
  sacola = {};
  guardar();
  atualizarTudo();
  anunciar("Sacola vazia.");
});

// ===== 5. Topo e barra fixa =====
const botaoTopo = document.querySelector(".topo__sacola");
const contagemTopo = botaoTopo.querySelector("[data-contagem]");
const barra = document.querySelector("[data-barra]");
const barraWhats = barra.querySelector(".barra__whats");
const barraSacola = barra.querySelector(".barra__sacola");
let botoesVisiveis = 0;

function atualizarBarra() {
  const total = quantidadeTotal();
  barraWhats.hidden = total > 0;
  barraSacola.hidden = total === 0;
  barra.querySelector("[data-barra-qtd]").textContent = `${total} ${total === 1 ? "item" : "itens"}`;
  barra.querySelector("[data-barra-total]").textContent = reais(subtotal());
  // Sacola vazia: a barra some enquanto outro botão de pedir está na tela
  barra.classList.toggle("barra--escondida", total === 0 && botoesVisiveis > 0);
}

let totalAnterior = quantidadeTotal();
function atualizarTopo() {
  const total = quantidadeTotal();
  contagemTopo.hidden = total === 0;
  contagemTopo.textContent = total;
  botaoTopo.setAttribute(
    "aria-label",
    total ? `Abrir sacola, ${total} ${total === 1 ? "item" : "itens"}, ${reais(subtotal())}` : "Abrir sacola, vazia"
  );
  if (total !== totalAnterior) {
    pulsar(contagemTopo);
    pulsar(barraSacola);
  }
  totalAnterior = total;
}

if ("IntersectionObserver" in window) {
  const visiveis = new Set();
  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) visiveis.add(entrada.target);
      else visiveis.delete(entrada.target);
    }
    botoesVisiveis = visiveis.size;
    atualizarBarra();
  });
  document.querySelectorAll(".balcao__botao, .chamada__botao").forEach((botao) => observador.observe(botao));
}

function atualizarTudo() {
  cardapio.forEach(({ elemento }, id) => {
    elemento.classList.toggle("item--na-sacola", Boolean(sacola[id]));
  });
  document.querySelectorAll("[data-contador]").forEach(atualizarContador);
  atualizarTopo();
  atualizarBarra();
  if (janela.open) atualizarSacola();
}

atualizarTudo();

// ===== 6. Aberto agora? =====
// Usa a hora de Maricá, mesmo que o visitante esteja em outro fuso.
function agoraEmMarica() {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: FUSO, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date()).map((parte) => [parte.type, parte.value])
  );
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(partes.weekday);
  return { dia, minutos: Number(partes.hour) * 60 + Number(partes.minute) };
}

function hora(minutos) {
  const h = Math.floor(minutos / 60) % 24;
  const m = minutos % 60;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

function situacao() {
  const { dia, minutos } = agoraEmMarica();
  const hoje = HORARIO[dia];

  if (hoje && minutos >= hoje[0] && minutos < hoje[1] - ULTIMO_PEDIDO_ANTES) {
    return { aberto: true, texto: `Aberto agora. Último pedido às ${hora(hoje[1] - ULTIMO_PEDIDO_ANTES)}.`, dia };
  }
  if (hoje && minutos < hoje[0]) {
    return { aberto: false, texto: `Fechado agora. Abre hoje às ${hora(hoje[0])}.`, abre: `hoje às ${hora(hoje[0])}`, dia };
  }
  for (let i = 1; i <= 7; i++) {
    const proximo = (dia + i) % 7;
    if (HORARIO[proximo]) {
      const quando = i === 1 ? "amanhã" : DIAS[proximo];
      return {
        aberto: false,
        texto: `Fechado agora. Abre ${quando} às ${hora(HORARIO[proximo][0])}.`,
        abre: `${quando} às ${hora(HORARIO[proximo][0])}`,
        dia,
      };
    }
  }
  return null;
}

function atualizarStatus() {
  const agora = situacao();
  if (!agora) return;

  document.querySelectorAll("[data-status]").forEach((status) => {
    status.textContent = agora.texto;
    status.classList.toggle("status--aberto", agora.aberto);
    status.classList.toggle("status--fechado", !agora.aberto);
  });

  // Marca o dia de hoje na tabela de horário
  document.querySelectorAll(".horario [data-dias]").forEach((linha) => {
    const ehHoje = linha.dataset.dias.split(" ").map(Number).includes(agora.dia);
    linha.classList.toggle("horario--hoje", ehHoje);
    let marca = linha.querySelector(".horario__hoje");
    if (ehHoje && !marca) {
      marca = document.createElement("span");
      marca.className = "horario__hoje";
      marca.textContent = "hoje";
      linha.querySelector("dt").append(marca);
    } else if (!ehHoje && marca) {
      marca.remove();
    }
  });

  // Fora do horário, a sacola avisa quando a gente responde
  avisoFechado.hidden = agora.aberto;
  avisoFechado.textContent = agora.aberto
    ? ""
    : `Estamos fechados agora. Pode mandar o pedido, e a gente responde quando abrir, ${agora.abre}.`;
}

atualizarStatus();
setInterval(atualizarStatus, 60 * 1000);

// ===== 7. Ano no rodapé =====
document.querySelector("[data-ano]").textContent = new Date().getFullYear();
