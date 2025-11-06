let tableBody = document.getElementById("cuerpo-tabla");
const logOutButton = document.getElementById("login-link");

const inputDocumento = document.getElementById("filtro-documento");
const inputNombre = document.getElementById("filtro-nombre");
const selectTipo = document.getElementById("filtro-tipo");
const selectJuego = document.getElementById("filtro-juego");
const btnFiltrar = document.querySelector(".btn-primary");
const btnLimpiar = document.querySelector("button[type='reset']");

function normalizarTexto(texto) {
  if (!texto) return "";
  return texto
    .normalize("NFD") // Descompone acentos/diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
    .toLowerCase()
    .trim(); // Minúsculas y sin espacios sobrantes
}

// función para aplicar filtros
function aplicarFiltros(dataList) {
  const docFiltro = inputDocumento.value.trim().toLowerCase();
  const nombreFiltro = inputNombre.value.trim().toLowerCase();
  const tipoFiltro = selectTipo.value.trim().toLowerCase();
  const juegoFiltro = selectJuego.value.trim().toLowerCase();

  // filtrar la lista de datos
  const filtrados = dataList.filter((item) => {
    // Filtrar por Documento (identificacion)
    const cumpleDocumento = docFiltro
      ? item.identificacion.toString().includes(docFiltro)
      : true;

    // Filtrar por Nombre
    const cumpleNombre = nombreFiltro
      ? item.nombre.toLowerCase().includes(nombreFiltro)
      : true;

    // Filtrar por Tipo de Juego
    const cumpleTipo = tipoFiltro
      ? item.gameType.toLowerCase() === normalizarTexto(tipoFiltro)
      : true;

    // Filtrar por Nombre del Juego
    const cumpleJuego = juegoFiltro
      ? item.gameName.toLowerCase() === normalizarTexto(juegoFiltro)
      : true;

    return cumpleDocumento && cumpleNombre && cumpleTipo && cumpleJuego;
  });

  tableBody.innerHTML = "";
  filtrados.forEach((cita) => {
    tableBody.innerHTML += puntajeFila(cita);
  });
}
logOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/Login/index.html";
});

function puntajeFila(data) {
  const fecha = new Date(data.completedDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `
  <tr>
    <td>${data.identificacion}</td>
    <td>${data.nombre} ${data.apellido}</td>
    <td>${data.status == "completed" ? "Completado" : "Pendiente"}</td>
    <td>${data.gameType}</td>
    <td>${data.gameName}</td>
    <td><span class="badge bg-danger">${data.score || 0}</span></td>
    <td>${data.seconds || 0}</td>
    <td>${data.completedDate ? fecha : "Pendiente"}</td>
    <td>
        <button
        class="btn btn-sm btn-danger btn-action"
        title="Eliminar"
        >
        <i class="bi bi-trash"></i>
        </button>
    </td>
    </tr>
  `;
}

async function obtenerPuntajes() {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await request.get("/scores/all");
  // console.log(response);
  tableBody.innerHTML = "";
  if (response.status === 200) {
    response.data.forEach((cita) => {
      tableBody.innerHTML += puntajeFila(cita);
    });
  }

  return response.data;
}

document.addEventListener("DOMContentLoaded", async function () {
  // Mostrar fecha actual
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const puntajes = await obtenerPuntajes();

  btnFiltrar.addEventListener("click", () => aplicarFiltros(puntajes));
  btnLimpiar.addEventListener("click", () => {
    // limpia campos y muestra todos los datos
    inputDocumento.value = "";
    inputNombre.value = "";
    selectTipo.value = "";
    selectJuego.value = "";
    console.log("Todos los datos:");
    // Aquí renderizas todos los datos de nuevo si tienes una tabla/lista
  });

  document.getElementById("fecha-hoy").textContent =
    new Date().toLocaleDateString("es-ES", options);

  // Control del sidebar
  const sidebar = document.getElementById("sidebarMenu");
  const mainContent = document.getElementById("mainContent");
  const sidebarToggle = document.getElementById("sidebarToggle");

  sidebarToggle.addEventListener("click", function (e) {
    e.preventDefault();
    sidebar.classList.toggle("show");
    mainContent.classList.toggle("shifted");
  });

  // Cerrar sidebar al hacer clic fuera en móviles
  document.addEventListener("click", function (e) {
    if (window.innerWidth < 992) {
      if (
        !sidebar.contains(e.target) &&
        e.target !== sidebarToggle &&
        !sidebarToggle.contains(e.target)
      ) {
        sidebar.classList.remove("show");
        mainContent.classList.remove("shifted");
      }
    }
  });
});
