const aviso = document.getElementById("aviso");
const btnNotificacoes = document.getElementById("btn-notificacoes");
const toggles = document.querySelectorAll(".toggle-switch");
const chipsQualidade = document.querySelectorAll("[data-qualidade]");
const btnSalvar = document.getElementById("btn-salvar-preferencias");

let timerAviso;

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.remove("opacity-0");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => aviso.classList.add("opacity-0"), 2200);
}

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const ativo = toggle.classList.toggle("is-ativo");
    toggle.setAttribute("aria-checked", ativo);
  });
});

chipsQualidade.forEach((chip) => {
  chip.addEventListener("click", () => {
    chipsQualidade.forEach((c) => {
      const ativo = c === chip;
      c.classList.toggle("is-active", ativo);
      c.setAttribute("aria-pressed", ativo);
    });
  });
});

btnSalvar.addEventListener("click", () => {
  if (btnSalvar.disabled) return;

  btnSalvar.disabled = true;
  btnSalvar.textContent = "Salvando...";

  setTimeout(() => {
    btnSalvar.disabled = false;
    btnSalvar.textContent = "Salvar preferências";
    mostrarAviso("Preferências salvas com sucesso!");
  }, 900);
});

btnNotificacoes.addEventListener("click", () => {
  mostrarAviso("Nenhuma notificação nova");
});