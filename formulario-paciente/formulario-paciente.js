// formulario-paciente.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("patientForm");
  const patientData = JSON.parse(localStorage.getItem("user")) || {};
  console.log("Datos del paciente cargados:", patientData);

  // Cargar datos existentes si están disponibles
  cargarDatosPaciente(patientData);

  // Manejar envío del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    guardarCambios();
  });

  // Validación en tiempo real
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", validarCampo);
    input.addEventListener("input", limpiarValidacion);
  });
});

function cargarDatosPaciente(datos) {
  // Mapear campos del formulario con los datos del paciente
  const campos = {
    nombre: datos.nombre || "",
    apellido: datos.apellido || "",
    identificacion: datos.identificacion || "",
    fechaNacimiento: datos.fechaNacimiento || "",
    genero: datos.sexoBiologico || "",
    telefono: datos.telefono || "",
    email: datos.correo || "",
    direccion: datos.direccion || "",
    ciudad: datos.munOrigen_FK.toUpperCase() || "",
    pais: datos.pais || "",
    historialMedico: datos.historialMedico || "",
    observaciones: datos.observaciones || "",
  };

  // Llenar campos del formulario
  Object.keys(campos).forEach((campo) => {
    const elemento = document.getElementById(campo);
    if (elemento) {
      elemento.value = campos[campo];
    }
  });
}

function validarCampo(e) {
  const campo = e.target;
  const valor = campo.value.trim();

  // Remover clases previas
  campo.classList.remove("valid", "invalid");

  // Validar según el tipo de campo
  let esValido = true;

  switch (campo.type) {
    case "email":
      esValido = validarEmail(valor);
      break;
    case "tel":
      esValido = validarTelefono(valor);
      break;
    case "date":
      esValido = validarFecha(valor);
      break;
    default:
      if (campo.required) {
        esValido = valor !== "";
      }
  }

  if (campo.required && valor === "") {
    esValido = false;
  }

  // Aplicar clases de validación
  if (esValido) {
    campo.classList.add("valid");
  } else {
    campo.classList.add("invalid");
  }

  return esValido;
}

function limpiarValidacion(e) {
  const campo = e.target;
  campo.classList.remove("valid", "invalid");
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefono(telefono) {
  const regex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
  return regex.test(telefono);
}

function validarFecha(fecha) {
  if (!fecha) return false;
  const fechaObj = new Date(fecha);
  const hoy = new Date();
  return fechaObj <= hoy;
}

async function guardarCambios() {
  const form = document.getElementById("patientForm");
  const inputs = form.querySelectorAll("input, select, textarea");
  let formularioValido = true;

  // Validar todos los campos
  inputs.forEach((input) => {
    if (!validarCampo({ target: input })) {
      formularioValido = false;
    }
  });

  if (!formularioValido) {
    mostrarMensaje("Por favor, corrige los errores en el formulario.", "error");
    return;
  }

  // Recopilar datos del formulario
  const datosActualizados = {
    ultimaActualizacion: new Date().toISOString(),
    correo: document.getElementById("email").value,
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    apellido: document.getElementById("apellido").value,
    direccion: document.getElementById("direccion").value,
    munOrigen_FK: document.getElementById("ciudad").value,
    sexoBiologico: document.getElementById("genero").value,
    observaciones: document.getElementById("observaciones").value,
    historialMedico: document.getElementById("historialMedico").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    identificacion: parseInt(document.getElementById("identificacion").value),
  };

  // Guardar en localStorage (simulando base de datos)
  localStorage.setItem("user", JSON.stringify(datosActualizados));
  await savePatientData(datosActualizados);
  // Mostrar mensaje de éxito
  // alert("¡Tus datos se han actualizado correctamente!");
  // Redirigir después de 2 segundos
  // setTimeout(() => {
  //   window.location.href = "/index.html";
  // }, 2000);
}

async function savePatientData(data) {
  try {
    const response = await request.put("/pacientes", {
      data,
    });
    mostrarMensaje("¡Tus datos se han actualizado correctamente!", "success");
    window.scrollTo(0, 0);
  } catch (error) {
    console.error("Error al guardar los datos del paciente:", error);
  }
}

function mostrarMensaje(mensaje, tipo) {
  // Remover mensajes previos
  const mensajesPrevios = document.querySelectorAll(".alert-message");
  mensajesPrevios.forEach((msg) => msg.remove());

  // Crear nuevo mensaje
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert-message ${
    tipo === "success" ? "success-message" : "error-message"
  }`;
  alertDiv.innerHTML = `
        <i class="fas ${
          tipo === "success" ? "fa-check-circle" : "fa-exclamation-circle"
        }"></i>
        ${mensaje}
    `;

  // Insertar antes del formulario
  const form = document.getElementById("patientForm");
  form.parentNode.insertBefore(alertDiv, form);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

function cancelarEdicion() {
  if (
    confirm(
      "¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán."
    )
  ) {
    window.location.href = "/index.html";
  }
}

// Estilos adicionales para mensajes de alerta
const style = document.createElement("style");
style.textContent = `
    .error-message {
        background: linear-gradient(135deg, var(--incorrect-color), #d32f2f);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideDown 0.5s ease;
    }
`;
document.head.appendChild(style);
