document.addEventListener("DOMContentLoaded", function () {
  // Datos de ejemplo (simulando búsqueda en base de datos)
  const pacientes = [
    {
      id: 1,
      nombre: "María González Pérez",
      edad: "8 años",
      genero: "Femenino",
      telefono: "3101234567",
      nacimiento: "15/05/2015",
      estadoCivil: "Soltero",
      direccion: "Calle 123 #45-67",
      residencia: "Bogotá",
    },
    {
      id: 2,
      nombre: "Juan David Rodríguez",
      edad: "5 años",
      genero: "Masculino",
      telefono: "3209876543",
      nacimiento: "22/10/2018",
      estadoCivil: "Soltero",
      direccion: "Carrera 89 #12-34",
      residencia: "Medellín",
    },
  ];

  // Elementos del DOM
  const btnBuscar = document.getElementById("btnBuscar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const formValoracion = document.getElementById("formValoracion");
  const buscarPaciente = document.getElementById("buscarPaciente");

  // Función para cargar datos del paciente
  function cargarDatosPaciente(paciente) {
    document.getElementById("nombrePaciente").textContent = paciente.nombre;
    document.getElementById("edadPaciente").textContent = paciente.edad;
    document.getElementById("generoPaciente").textContent = paciente.genero;
    document.getElementById("telefonoPaciente").textContent = paciente.telefono;
    document.getElementById("nacimientoPaciente").textContent =
      paciente.nacimiento;
    document.getElementById("estadoCivilPaciente").textContent =
      paciente.estadoCivil;
    document.getElementById("direccionPaciente").textContent =
      paciente.direccion;
    document.getElementById("residenciaPaciente").textContent =
      paciente.residencia;
  }

  // Evento de búsqueda
  btnBuscar.addEventListener("click", function () {
    const termino = buscarPaciente.value.toLowerCase();

    if (termino.trim() === "") {
      alert("Por favor ingrese un término de búsqueda");
      return;
    }

    // Simular búsqueda en base de datos
    const pacienteEncontrado = pacientes.find(
      (paciente) =>
        paciente.nombre.toLowerCase().includes(termino) ||
        paciente.telefono.includes(termino)
    );

    if (pacienteEncontrado) {
      cargarDatosPaciente(pacienteEncontrado);
    } else {
      alert(
        "Paciente no encontrado. Verifique los datos e intente nuevamente."
      );
    }
  });

  // Evento para limpiar formulario
  btnLimpiar.addEventListener("click", function () {
    formValoracion.reset();
    document.querySelectorAll("#datosPaciente span").forEach((span) => {
      span.textContent = "-";
    });
    buscarPaciente.value = "";
  });

  // Evento para guardar valoración
  formValoracion.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validar que se haya seleccionado un paciente
    if (document.getElementById("nombrePaciente").textContent === "-") {
      alert("Por favor busque y seleccione un paciente primero");
      return;
    }

    // Obtener todos los datos del formulario
    const valoracion = {
      paciente: {
        nombre: document.getElementById("nombrePaciente").textContent,
        documento: buscarPaciente.value,
      },
      evaluacion: {
        comunicacion: document.getElementById("comunicacion").value,
        alimentacion: document.getElementById("alimentacion").value,
        diagnostico: document.getElementById("diagnostico").value,
        intervencion: document.getElementById("intervencion").value,
        recomendaciones: document.getElementById("recomendaciones").value,
      },
      profesional: {
        nombre: document.getElementById("nombreProfesional").value,
        identificacion: document.getElementById("idProfesional").value,
        especialidad: document.getElementById("especialidad").value,
        fecha: new Date().toLocaleDateString(),
      },
    };

    // Aquí iría la lógica para enviar a la base de datos
    console.log("Valoración a guardar:", valoracion);
    alert("Valoración guardada exitosamente");
    formValoracion.reset();
  });

  // Simular autollenado del profesional (en un sistema real esto vendría del login)
  document.getElementById("nombreProfesional").value = "Dra. Ana María López";
  document.getElementById("idProfesional").value = "123456789";
  document.getElementById("especialidad").value = "Fonoaudiología Infantil";
});
