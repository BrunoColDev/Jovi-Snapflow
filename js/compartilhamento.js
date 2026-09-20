const parametros = new URLSearchParams(window.location.search);
const nomeMidia = parametros.get("midia") || "Mídia sem nome";
const tipoMidia = parametros.get("tipo") || "Foto";
const categoriaMidia = parametros.get("categoria") || "Geral";

document.getElementById("preview-nome").textContent = nomeMidia;
document.getElementById("preview-categoria").textContent = categoriaMidia;
document.getElementById("preview-badge-tipo").textContent = tipoMidia;
document.title = `Compartilhar — ${nomeMidia}`;

const previewIcone = document.getElementById("preview-icone");
if (tipoMidia === "Vídeo") {
  previewIcone.innerHTML =
    '<path d="M4 17c3-1 4-7 8-7s5 4 8 3" stroke-linecap="round"/><path d="M6 20h12" stroke-linecap="round"/>';
} else {
  previewIcone.innerHTML =
    '<path d="m3 18 6-8 4 5 2-2.5L21 18z" stroke-linejoin="round"/><circle cx="17" cy="7" r="2"/>';
}

const opcoes = document.querySelectorAll(".opcao-compartilhar");
const botaoCompartilhar = document.getElementById("btn-compartilhar-agora");
const status = document.getElementById("status-compartilhamento");

let opcaoSelecionada = null;

opcoes.forEach((opcao) => {
  opcao.addEventListener("click", () => {
    opcaoSelecionada = opcao.dataset.opcao;

    opcoes.forEach((o) => {
      const ativo = o === opcao;
      o.classList.toggle("is-selecionada", ativo);
      o.setAttribute("aria-pressed", ativo);
    });

    botaoCompartilhar.disabled = false;
    status.classList.remove("status-sucesso");
    status.textContent = `Pronto para compartilhar via ${opcaoSelecionada}`;
  });
});

botaoCompartilhar.addEventListener("click", () => {
  if (!opcaoSelecionada || botaoCompartilhar.disabled) return;

  botaoCompartilhar.disabled = true;
  botaoCompartilhar.classList.add("is-carregando");
  botaoCompartilhar.textContent = "Enviando...";
  status.classList.remove("status-sucesso");
  status.textContent = "Preparando o compartilhamento...";

  setTimeout(() => {
    botaoCompartilhar.classList.remove("is-carregando");
    botaoCompartilhar.textContent = "Compartilhado!";
    status.classList.add("status-sucesso");
    status.textContent = `Mídia compartilhada com sucesso via ${opcaoSelecionada}!`;
  }, 1200);
});

document.querySelectorAll("[data-em-breve]").forEach((item) => {
  item.addEventListener("click", (evento) => {
    evento.preventDefault();
    status.textContent = `${item.dataset.emBreve} chega na próxima etapa`;
  });
});