// ---------- Dados demonstrativos por período ----------
const dadosPerformance = {
  hoje: {
    capturas: 12,
    organizadasIA: 9,
    tempoProcessamento: "0,7s",
    espacoUtilizado: "1,2 GB",
    barraOrganizadas: 75,
    barraProcessamento: 88,
    barraTaxa: 92,
    atividades: [
      { tipo: "foto", texto: 'Foto organizada em "Paisagens"', tempo: "há 12 min" },
      { tipo: "video", texto: 'Vídeo organizado em "Pessoas"', tempo: "há 40 min" },
      { tipo: "favorito", texto: "Mídia adicionada aos favoritos", tempo: "há 1 h" }
    ]
  },
  semana: {
    capturas: 68,
    organizadasIA: 54,
    tempoProcessamento: "0,8s",
    espacoUtilizado: "6,4 GB",
    barraOrganizadas: 79,
    barraProcessamento: 85,
    barraTaxa: 90,
    atividades: [
      { tipo: "video", texto: 'Vídeo organizado em "Viagens"', tempo: "há 1 dia" },
      { tipo: "foto", texto: 'Foto organizada em "Pessoas"', tempo: "há 2 dias" },
      { tipo: "favorito", texto: "Mídia adicionada aos favoritos", tempo: "há 3 dias" }
    ]
  },
  mes: {
    capturas: 214,
    organizadasIA: 178,
    tempoProcessamento: "0,9s",
    espacoUtilizado: "18,7 GB",
    barraOrganizadas: 83,
    barraProcessamento: 81,
    barraTaxa: 88,
    atividades: [
      { tipo: "foto", texto: 'Foto organizada em "Paisagens"', tempo: "há 1 semana" },
      { tipo: "video", texto: 'Vídeo organizado em "Pessoas"', tempo: "há 2 semanas" },
      { tipo: "favorito", texto: "Mídia adicionada aos favoritos", tempo: "há 3 semanas" }
    ]
  }
};

// ---------- Ícones usados na lista de atividades ----------
const iconesAtividade = {
  foto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m3 18 6-8 4 5 2-2.5L21 18z" stroke-linejoin="round"/><circle cx="17" cy="7" r="2"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  favorito: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 4.5 14.3 9.4l5.2.6-3.8 3.6.9 5.3-4.6-2.6-4.6 2.6.9-5.3L4.5 10l5.2-.6z" stroke-linejoin="round"/></svg>'
};

// ---------- Elementos da tela ----------
const aviso = document.getElementById("aviso");
const btnNotificacoes = document.getElementById("btn-notificacoes");
const chipsPeriodo = document.querySelectorAll("[data-periodo]");
const listaAtividades = document.getElementById("lista-atividades");

let timerAviso;

function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.remove("opacity-0");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => aviso.classList.add("opacity-0"), 2200);
}

// ---------- Atualiza uma barra de progresso e o seu valor ----------
function atualizarBarra(nome, valor) {
  document.getElementById(`barra-${nome}`).style.width = `${valor}%`;
  document.getElementById(`valor-barra-${nome}`).textContent = `${valor}%`;
}

// ---------- Atualiza toda a tela com os dados do período ----------
function atualizarPainel(periodo) {
  const dados = dadosPerformance[periodo];

  document.getElementById("valor-capturas").textContent = dados.capturas;
  document.getElementById("valor-organizadas").textContent = dados.organizadasIA;
  document.getElementById("valor-tempo").textContent = dados.tempoProcessamento;
  document.getElementById("valor-espaco").textContent = dados.espacoUtilizado;

  atualizarBarra("organizadas", dados.barraOrganizadas);
  atualizarBarra("processamento", dados.barraProcessamento);
  atualizarBarra("taxa", dados.barraTaxa);

  listaAtividades.innerHTML = dados.atividades
    .map(
      (item) => `
        <li class="atividade-item">
          <span class="atividade-icone">${iconesAtividade[item.tipo]}</span>
          <span class="atividade-texto">${item.texto}</span>
          <span class="atividade-tempo">${item.tempo}</span>
        </li>
      `
    )
    .join("");
}

// ---------- Alternar período ----------
chipsPeriodo.forEach((chip) => {
  chip.addEventListener("click", () => {
    chipsPeriodo.forEach((c) => {
      const ativo = c === chip;
      c.classList.toggle("is-active", ativo);
      c.setAttribute("aria-pressed", ativo);
    });

    atualizarPainel(chip.dataset.periodo);
  });
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

// ---------- Estado inicial ----------
atualizarPainel("hoje");