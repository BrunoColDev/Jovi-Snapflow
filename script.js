
// ---------- Elementos da tela ----------
const body = document.body;
const visor = document.getElementById("visor");
const flash = document.getElementById("flash");
const aviso = document.getElementById("aviso");
const statusCamera = document.getElementById("status-camera");
const contadorCapturas = document.getElementById("contador-capturas");
const btnCapturar = document.getElementById("btn-capturar");
const btnIA = document.getElementById("btn-ia");
const iaEstado = document.getElementById("ia-estado");
const btnNotificacoes = document.getElementById("btn-notificacoes");
const botoesModo = document.querySelectorAll(".modo-btn");

// ---------- Estado da tela ----------
let modoAtual = "foto"; 
let iaAtiva = true;
let totalCapturas = 0;

let timerAviso;

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.remove("opacity-0");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => aviso.classList.add("opacity-0"), 2200);
}

// ---------- Alternar entre foto e vídeo ----------
botoesModo.forEach((botao) => {
  botao.addEventListener("click", () => {
    modoAtual = botao.dataset.modo;

    botoesModo.forEach((b) => {
      const ativo = b === botao;
      b.classList.toggle("is-active", ativo);
      b.setAttribute("aria-pressed", ativo);
    });

    body.classList.toggle("modo-video", modoAtual === "video");

    if (modoAtual === "video") {
      statusCamera.textContent = "Pronto para gravar";
      btnCapturar.setAttribute("aria-label", "Gravar vídeo");
    } else {
      statusCamera.textContent = "Câmera pronta";
      btnCapturar.setAttribute("aria-label", "Capturar foto");
    }
  });
});

// ---------- Botão de captura ----------
btnCapturar.addEventListener("click", () => {
  // Efeito de flash no visor
  flash.classList.remove("disparo");
  void flash.offsetWidth; // reinicia a animação
  flash.classList.add("disparo");

  totalCapturas++;
  contadorCapturas.textContent = totalCapturas;

  const tipo = modoAtual === "video" ? "Vídeo" : "Foto";
  mostrarAviso(
    iaAtiva
      ? `${tipo} salva e organizada pela IA`
      : `${tipo} salva na galeria`
  );
});

// ---------- Ligar / desligar a IA ----------
btnIA.addEventListener("click", () => {
  iaAtiva = !iaAtiva;

  iaEstado.textContent = iaAtiva ? "ON" : "OFF";
  iaEstado.classList.toggle("text-jovi-blue", iaAtiva);
  iaEstado.classList.toggle("text-jovi-muted", !iaAtiva);
  btnIA.classList.toggle("is-on", iaAtiva);
  btnIA.setAttribute("aria-pressed", iaAtiva);

  mostrarAviso(
    iaAtiva
      ? "Organização automática ativada"
      : "Organização automática desativada"
  );
});

// ---------- Notificações ----------
btnNotificacoes.addEventListener("click", () => {
  mostrarAviso("Nenhuma notificação nova");
});

// ---------- Itens que ainda serão desenvolvidos ----------
document.querySelectorAll("[data-em-breve]").forEach((item) => {
  item.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarAviso(`${item.dataset.emBreve} chega na próxima etapa`);
  });
});

// ---------- Foco no visor ao tocar (só um detalhe visual) ----------
visor.addEventListener("click", () => {
  statusCamera.textContent = "Foco ajustado";
  setTimeout(() => {
    statusCamera.textContent =
      modoAtual === "video" ? "Pronto para gravar" : "Câmera pronta";
  }, 1200);
});