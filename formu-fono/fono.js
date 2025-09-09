let tableBody = document.getElementById("cuerpo-tabla");
const logOutButton = document.getElementById("login-link");

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/Login/index.html";
});

function citaFila(cita) {
  return `
  <tr>

    <td>${cita.idPaciente_FK}</td>

    <td>${cita.paciente.nombre}</td>
    <td>${
      new Date().getFullYear() -
      new Date(cita.paciente.fechaNacimiento).getFullYear()
    }</td>
    <td>${cita.paciente.telefono}</td>
    <td>${new Date(cita.fechaCita).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}</td>
    <td>
      <button class="btn btn-sm btn-primary">Modificar</button>
      <button class="btn btn-sm btn-danger">Eliminar</button>
    </td>
  </tr>
  `;
}

async function obtenerCitas() {
  const user = JSON.parse(localStorage.getItem("user"));
  const query = {
    idFonoaudiologo_FK: user.identificacion,
  };
  const response = await request.get("/citas/all", query);
  console.log(response);
  if (response.status === 200) {
    response.data.data.forEach((cita) => {
      tableBody.innerHTML += citaFila(cita);
    });
  }
}

obtenerCitas();

document.addEventListener("DOMContentLoaded", function () {
  // Mostrar fecha actual
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
