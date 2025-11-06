document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebarMenu");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mainContent = document.querySelector(".main-content");

  // Función para alternar el sidebar
  function toggleSidebar() {
    sidebar.classList.toggle("active");

    // Ajustar el contenido principal
    if (sidebar.classList.contains("active")) {
      mainContent.classList.add("shifted");
      document.body.style.overflow = "hidden";
    } else {
      mainContent.classList.remove("shifted");
      document.body.style.overflow = "";
    }
  }

  // Evento para el botón toggle
  sidebarToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleSidebar();
  });

  // Cerrar sidebar al hacer clic fuera de él
  document.addEventListener("click", function (e) {
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggle
    ) {
      toggleSidebar();
    }
  });

  // Prevenir que el clic dentro del sidebar lo cierre
  sidebar.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Mostrar fecha actual
  const fechaHoy = document.getElementById("fecha-hoy");
  const hoy = new Date();
  fechaHoy.textContent = hoy.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const obtenerHistoria = async (data) => {
  const response = await request.post("/valoraciones/search", data);
  return response.data;
};

function clearTable() {
  const tableBody = document.getElementById("cuerpo-tabla");
  tableBody.innerHTML = "";
}

function renderRow(valoracion) {
  return `
  <tr>
    <td>${valoracion.paciente.nombre} ${valoracion.paciente.apellido}</td>
    <td>${new Date(valoracion.fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}
    </td>
    <td>
        <a class="btn btn-sm btn-primary" href="/archivo-imprimir/archivo-imprimir.html?id=${
          valoracion._id
        }">
          Descargar
        </a>
    </td>
  </tr>
  `;
}

async function cargarHistoria(filter) {
  const tableBody = document.getElementById("cuerpo-tabla");
  clearTable();
  const { data } = await obtenerHistoria(filter);
  console.log(data);
  for (const valoracion of data) {
    const row = renderRow(valoracion);
    tableBody.innerHTML += row;
  }
}

const buscarInput = document.getElementById("buscar-input");
const buscarButton = document.getElementById("buscar-button");
buscarButton.addEventListener("click", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (buscarInput.value != "") {
    const idPaciente_FK = buscarInput.value;
    await cargarHistoria({ idFono_FK: user._id, idPaciente_FK });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  await cargarHistoria({ idFono_FK: user._id });
});
