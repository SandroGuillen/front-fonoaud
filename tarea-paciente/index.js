const logOutButton = document.getElementById("login-link");

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/Login/index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  cargarTareasPendientes();
  cargarTareasCompletadas();
});

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

async function getCompletedTasks() {
  const userId = JSON.parse(localStorage.getItem("user")).identificacion;
  const response = await request.get("/scores", {
    paciente_id: userId,
    status: "completed",
  });
  const tareas = response.data.scores;

  return tareas;
}

async function getPendingTasks() {
  const userId = JSON.parse(localStorage.getItem("user")).identificacion;
  const response = await request.get("/scores", {
    paciente_id: userId,
    status: "pending",
  });

  const tareas = response.data.scores;

  return tareas;
}

async function cargarTareasPendientes() {
  try {
    // 1️⃣ Obtener las tareas pendientes
    const tareas = await getPendingTasks();

    console.log(tareas);

    // 2️⃣ Seleccionar el contenedor
    const contenedor = document.getElementById("tareas-pendientes");

    // 3️⃣ Limpiar contenido previo
    contenedor.innerHTML = "";

    // 4️⃣ Recorrer tareas y construir HTML dinámico
    tareas.forEach((tarea) => {
      // Estructura esperada de tarea:
      // {
      //   gameName: "Memorama de Animales",
      //   gameType: "Memoria",
      //   limitDate: "2025-09-30",
      //   description: "...",
      //   duration: 10,
      //   difficulty: "Media"
      // }

      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4 mb-4";

      card.innerHTML = `
          <div class="card task-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="badge bg-primary">${tarea.gameType}</span>
                <small class="text-muted">Vence: ${formatearFecha(
                  tarea.limitDate
                )}</small>
              </div>
              <h5 class="card-title">${tarea.gameName}</h5>
              <p class="card-text">
                ${tarea.description || ""}
              </p>
              <div class="task-info">
                <small>
                  <i class="bi bi-clock me-1"></i>Duración: ${
                    tarea.duration
                  } min
                </small>
                <small class="ms-3">
                  <i class="bi bi-bar-chart me-1"></i>Dificultad:
                  ${capitalizar(tarea.difficulty)}
                </small>
              </div>
              <div class="mt-3">
                <a href="/juegos/${tarea.gameType}/${
        tarea.gameName
      }" class="btn btn-success btn-sm w-100">
                  <i class="bi bi-play-circle me-1"></i> Iniciar Juego
                </a>
              </div>
            </div>
          </div>
        `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando tareas pendientes:", error);
  }
}

async function cargarTareasCompletadas() {
  try {
    // 1️⃣ Obtener las tareas completadas
    const tareas = await getCompletedTasks();

    // 2️⃣ Seleccionar el contenedor
    const contenedor = document.getElementById("tareas-completadas");

    // 3️⃣ Limpiar contenido previo
    contenedor.innerHTML = "";

    // 4️⃣ Recorrer tareas y construir HTML dinámico
    tareas.forEach((tarea) => {
      // Estructura esperada de tarea:
      // {
      //   gameName: "Memorama de Colores",
      //   gameType: "Memoria",
      //   completedDate: "2025-09-15",
      //   description: "...",
      //   score: 85
      // }

      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4 mb-4";

      card.innerHTML = `
          <div class="card task-card completed">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="badge bg-primary">${tarea.gameType}</span>
                <span class="badge bg-success">Completada</span>
              </div>
              <h5 class="card-title">${tarea.gameName}</h5>
              <p class="card-text">
                ${tarea.description || ""}
              </p>
              <div class="task-info">
                <small>
                  <i class="bi bi-clock me-1"></i>Completado: ${formatearFecha(
                    tarea.completedDate
                  )}
                </small>
                <small class="ms-3">
                  <i class="bi bi-star me-1"></i>Puntaje: ${tarea.score || 0}
                </small>
              </div>
              <div class="mt-3">
                <button class="btn btn-outline-secondary btn-sm w-100" disabled>
                  <i class="bi bi-check-circle me-1"></i> Completada
                </button>
              </div>
            </div>
          </div>
        `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando tareas completadas:", error);
  }
}

// Función auxiliar para formatear la fecha YYYY-MM-DD a DD/MM/YYYY
function formatearFecha(fecha) {
  if (!fecha) return "";
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const año = d.getFullYear();
  return `${dia}/${mes}/${año}`;
}

// Capitalizar primera letra de una palabra
function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
