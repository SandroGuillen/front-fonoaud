// Script para la funcionalidad de la página de asignación de tareas
// Control del sidebar
const sidebar = document.getElementById("sidebarMenu");
const mainContent = document.getElementById("mainContent");
const sidebarToggle = document.getElementById("sidebarToggle");
const logOutButton = document.getElementById("login-link");

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/Login/index.html";
});

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

function getFormData() {
  // Obtener cada campo del formulario
  const pacienteId = document.getElementById("paciente").value;
  const gameType = document.getElementById("tipo-juego").value;
  const gameName = document.getElementById("juego").value;
  const limitDate = document.getElementById("fecha-vencimiento").value;
  const instructions = document.getElementById("instrucciones").value;
  const fonoaudilogoId = JSON.parse(
    localStorage.getItem("user")
  ).identificacion;
  // const dificultad = document.getElementById("dificultad").value;
  // const duracion = document.getElementById("duracion").value;

  // Devolver en un objeto
  return {
    gameType,
    gameName,
    limitDate,
    instructions,
    fonoaudilogoId,
    pacienteId: Number(pacienteId),
  };
}

async function cargarPacientes() {
  try {
    // Llamada a tu endpoint que devuelve pacientes
    const response = await request.get("/pacientes/all");
    if (!response.status == 200)
      throw new Error("Error al obtener los pacientes");
    const pacientes = await response.data;

    // Seleccionamos el select
    const selectPaciente = document.getElementById("paciente");

    // Limpiamos las opciones previas (dejamos solo la primera opción deshabilitada)
    selectPaciente.innerHTML = `
        <option value="" selected disabled>Seleccione un paciente</option>
      `;

    // Insertamos cada paciente como <option>
    pacientes.forEach((paciente) => {
      const option = document.createElement("option");
      option.value = paciente.identificacion;
      option.textContent = `${paciente.nombre} ${paciente.apellido} - ${paciente.identificacion}`;
      selectPaciente.appendChild(option);
    });
  } catch (error) {
    console.error("Error cargando pacientes:", error);
  }
}

function resetFormulario() {
  const form = document.getElementById("form-asignar-tarea");
  form.reset();

  // 🔹 Si quieres volver a dejar los selects en su opción por defecto:
  document.getElementById("paciente").selectedIndex = 0;
  document.getElementById("tipo-juego").selectedIndex = 0;
  document.getElementById("juego").innerHTML =
    '<option value="" selected disabled>Seleccione un juego</option>';
  document.getElementById("dificultad").selectedIndex = 0;

  // 🔹 Si quieres limpiar también el textarea explícitamente:
  document.getElementById("instrucciones").value = "";

  console.log("Formulario reiniciado");
}

document.addEventListener("DOMContentLoaded", function () {
  // Establecer la fecha actual
  cargarPacientes();

  const fechaHoy = document.getElementById("fecha-hoy");
  if (fechaHoy) {
    const hoy = new Date();
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    fechaHoy.textContent = hoy.toLocaleDateString("es-ES", opciones);
  }

  // Establecer fecha mínima para la fecha de vencimiento (hoy)
  const fechaVencimiento = document.getElementById("fecha-vencimiento");
  if (fechaVencimiento) {
    const hoy = new Date();
    const fechaMinima = hoy.toISOString().split("T")[0];
    fechaVencimiento.min = fechaMinima;

    // Establecer fecha por defecto (7 días a partir de hoy)
    const enUnaSemana = new Date(hoy);
    enUnaSemana.setDate(hoy.getDate() + 7);
    fechaVencimiento.value = enUnaSemana.toISOString().split("T")[0];
  }

  // Mapeo de juegos por tipo
  const juegosPorTipo = {
    concentracion: [
      { id: "Sigue-Secuencia", nombre: "Sigue la Secuencia" },
      { id: "tesoro-escondido", nombre: "Tesoro Escondido" },
      { id: "Juego_Memoria", nombre: "Memoria Números" },
      { id: "Juego_Memoria_Animales", nombre: "Memoria Animales" },
      { id: "Juego_Memoria_Instrumentos", nombre: "Memoria Instrumentos" },
      { id: "Juego_Memoria_Emociones", nombre: "Memoria Emociones" },
      { id: "Juego_Memoria_Alimentos", nombre: "Memoria Alimentos" },
      { id: "Juego_Memoria_Profesiones", nombre: "Memoria Profesiones" },
    ],
    educativas: [
      { id: "quiz-banderas", nombre: "Adivina la Bandera" },
      { id: "quiz-Instrumentos", nombre: "Adivina el Instrumento" },
      { id: "quiz-Animales", nombre: "Adivina el Animal" },
    ],
    matematica: [
      { id: "matematica-nivel-1", nombre: "Matemáticas Nivel 1" },
      { id: "matematica-nivel-2", nombre: "Matemáticas Nivel 2" },
      { id: "matematica-nivel-3", nombre: "Matemáticas Nivel 3" },
      { id: "puzzle-game", nombre: "Juego de Puzzle" },
    ],
    adivinanzas: [
      { id: "Adivina_el_Animal", nombre: "Adivina el Animal" },
      { id: "Adivina_la_Fruta", nombre: "Adivina el Instrumento" },
      { id: "Adivina_la_profesion", nombre: "Adivina la Profesión" },
    ],
  };

  // Actualizar opciones de juegos según el tipo seleccionado
  const tipoJuegoSelect = document.getElementById("tipo-juego");
  const juegoSelect = document.getElementById("juego");

  if (tipoJuegoSelect && juegoSelect) {
    tipoJuegoSelect.addEventListener("change", function () {
      const tipoSeleccionado = this.value;

      // Limpiar opciones actuales
      juegoSelect.innerHTML =
        '<option value="" selected disabled>Seleccione un juego</option>';

      // Agregar nuevas opciones según el tipo seleccionado
      if (tipoSeleccionado && juegosPorTipo[tipoSeleccionado]) {
        juegosPorTipo[tipoSeleccionado].forEach((juego) => {
          const option = document.createElement("option");
          option.value = juego.id;
          option.textContent = juego.nombre;
          juegoSelect.appendChild(option);
        });
      }
    });
  }

  // Manejar el envío del formulario
  const formAsignarTarea = document.getElementById("form-asignar-tarea");
  if (formAsignarTarea) {
    formAsignarTarea.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = getFormData();

      addScore(data);

      // Validar formulario
      if (this.checkValidity()) {
        // Aquí iría la lógica para enviar los datos al servidor
        resetFormulario();
        alert("Tarea asignada correctamente");

        // También se podría recargar la tabla de tareas asignadas
        // o agregar la nueva tarea dinámicamente
      } else {
        alert("Por favor, complete todos los campos requeridos");
      }
    });
  }

  // Manejar los botones de editar y eliminar en la tabla
  const botonesEditar = document.querySelectorAll(".btn-outline-primary");
  const botonesEliminar = document.querySelectorAll(".btn-outline-danger");

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function () {
      // Aquí iría la lógica para editar la tarea
      alert("Funcionalidad de edición en desarrollo");
    });
  });

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", function () {
      if (confirm("¿Está seguro de que desea eliminar esta tarea?")) {
        // Aquí iría la lógica para eliminar la tarea
        const fila = this.closest("tr");
        fila.remove();
        alert("Tarea eliminada correctamente");
      }
    });
  });
});
