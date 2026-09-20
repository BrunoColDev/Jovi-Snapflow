const cards = Array.from(document.querySelectorAll(".midia-card"));
const chips = document.querySelectorAll(".chip-filtro");
const campoBusca = document.getElementById("campo-busca");
const contador = document.getElementById("contador-midias");
const semResultado = document.getElementById("sem-resultado");
const aviso = document.getElementById("aviso");

let filtroAtual = "todas";
let timerAviso;

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.remove("opacity-0");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => aviso.classList.add("opacity-0"), 2200);
}

function atualizarGaleria() {
  const busca = campoBusca.value.trim().toLowerCase();
  let visiveis = 0;

  cards.forEach((card) => {
    const nome = card.dataset.nome.toLowerCase();
    const categoria = card.dataset.categoria.toLowerCase();
    const favorito = card.dataset.favorito === "true";

    let passaFiltro;
    if (filtroAtual === "todas") {
      passaFiltro = true;
    } else if (filtroAtual === "favoritos") {
      passaFiltro = favorito;
    } else {
      passaFiltro = card.dataset.categoria === filtroAtual;
    }

    const passaBusca =
      busca === "" || nome.includes(busca) || categoria.includes(busca);

    const mostrar = passaFiltro && passaBusca;
    card.classList.toggle("hidden", !mostrar);
    if (mostrar) visiveis++;
  });

  contador.textContent = visiveis === 1 ? "1 mídia" : `${visiveis} mídias`;
  semResultado.classList.toggle("hidden", visiveis > 0);
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filtroAtual = chip.dataset.filtro;

    chips.forEach((c) => {
      const ativo = c === chip;
      c.classList.toggle("is-active", ativo);
      c.setAttribute("aria-pressed", ativo);
    });

    atualizarGaleria();
  });
});

campoBusca.addEventListener("input", atualizarGaleria);

cards.forEach((card) => {
  const botao = card.querySelector(".btn-favorito");

  botao.addEventListener("click", () => {
    const favorito = card.dataset.favorito !== "true";

    card.dataset.favorito = favorito;
    botao.classList.toggle("is-favorito", favorito);
    botao.setAttribute("aria-pressed", favorito);

    mostrarAviso(
      favorito
        ? `${card.dataset.nome} entrou nos favoritos`
        : `${card.dataset.nome} saiu dos favoritos`
    );

    if (filtroAtual === "favoritos") atualizarGaleria();
  });
});

document.querySelectorAll("[data-em-breve]").forEach((item) => {
  item.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarAviso(`${item.dataset.emBreve} chega na próxima etapa`);
  });
});

// Marca as estrelas das mídias que já começam favoritas
cards.forEach((card) => {
  if (card.dataset.favorito === "true") {
    card.querySelector(".btn-favorito").classList.add("is-favorito");
  }
});

cards.forEach((card) => {
  const botaoCompartilhar = card.querySelector(".btn-compartilhar");

  botaoCompartilhar.addEventListener("click", () => {
    const parametros = new URLSearchParams({
      midia: card.dataset.nome,
      tipo: card.dataset.tipo,
      categoria: card.dataset.categoria
    });

    window.location.href = `compartilhamento.html?${parametros.toString()}`;
  });
});

atualizarGaleria();