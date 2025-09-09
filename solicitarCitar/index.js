// Variables globales
let userData = {};
let selectedFono = {};

// =====================================================
// INICIALIZACIÓN
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  initializePage();
  setupEventListeners();
  loadUserData();
  loadSelectedFono();
  setupFormValidation();
});

// =====================================================
// FUNCIONES DE INICIALIZACIÓN
// =====================================================

function initializePage() {
  console.log("Inicializando página de agendar cita...");
  // Configuración inicial de la página
  setMinDateTime();
}

function setupEventListeners() {
  // Event listener para el formulario principal
  const citaForm = document.getElementById("citaForm");
  if (citaForm) {
    citaForm.addEventListener("submit", handleFormSubmit);
  }

  // Event listeners para campos específicos
  document
    .getElementById("documento")
    .addEventListener("blur", validateDocumento);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document
    .getElementById("telefono")
    .addEventListener("blur", validateTelefono);
  document
    .getElementById("fechaCita")
    .addEventListener("change", validateFechaCita);
  document
    .getElementById("motivo")
    .addEventListener("change", handleMotivoChange);

  // Event listener para el botón de agendar
  const btnAgendar = document.getElementById("btnAgendar");
  if (btnAgendar) {
    btnAgendar.addEventListener("click", function (e) {
      if (e.target.form && !e.target.form.checkValidity()) {
        e.preventDefault();
        showValidationErrors();
      }
    });
  }
}

function setupFormValidation() {
  // Configurar validaciones personalizadas
  const form = document.getElementById("citaForm");
  form.noValidate = true; // Desactivar validación HTML5 por defecto para usar custom
}

// =====================================================
// FUNCIONES DE CARGA DE DATOS
// =====================================================

function loadUserData() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      userData = user;
      populateUserFields();
    }
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
    showNotification("Error al cargar datos del usuario", "error");
  }
}

function loadSelectedFono() {
  try {
    const fono = JSON.parse(localStorage.getItem("selectedFono"));
    if (fono) {
      selectedFono = fono;
      console.log("Fonoaudiólogo seleccionado:", selectedFono);
    }
  } catch (error) {
    console.error("Error al cargar datos del fonoaudiólogo:", error);
  }
}

function populateUserFields() {
  // Llenar campos con datos del usuario si están disponibles
  if (userData.identificacion) {
    document.getElementById("documento").value = userData.identificacion;
  }
  if (userData.nombre && userData.apellido) {
    document.getElementById(
      "nombre"
    ).value = `${userData.nombre} ${userData.apellido}`;
  }
  if (userData.fechaNacimiento) {
    document.getElementById("fechaNacimiento").value = userData.fechaNacimiento;
  }
  if (userData.telefono) {
    document.getElementById("telefono").value = userData.telefono;
  }
  if (userData.correo) {
    document.getElementById("email").value = userData.correo;
  }
}

// =====================================================
// FUNCIONES DE VALIDACIÓN
// =====================================================

function validateDocumento() {
  const documento = document.getElementById("documento").value.trim();
  const isValid = documento.length >= 6 && /^\d+$/.test(documento);

  setFieldValidation(
    "documento",
    isValid,
    "El documento debe tener al menos 6 dígitos"
  );
  return isValid;
}

function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  setFieldValidation("email", isValid, "Por favor ingrese un email válido");
  return isValid;
}

function validateTelefono() {
  const telefono = document.getElementById("telefono").value.trim();
  const isValid = telefono.length >= 10 && /^\d+$/.test(telefono);

  setFieldValidation(
    "telefono",
    isValid,
    "El teléfono debe tener al menos 10 dígitos"
  );
  return isValid;
}

function validateFechaCita() {
  const fechaCita = new Date(document.getElementById("fechaCita").value);
  const now = new Date();
  const minDate = new Date(now.getTime() + 30 * 60000); // 30 minutos desde ahora

  const isValid = fechaCita >= minDate;
  setFieldValidation(
    "fechaCita",
    isValid,
    "La fecha debe ser al menos 30 minutos en el futuro"
  );
  return isValid;
}

function validateAllFields() {
  const validations = [
    validateDocumento(),
    validateEmail(),
    validateTelefono(),
    validateFechaCita(),
    validateRequiredFields(),
  ];

  return validations.every((valid) => valid);
}

function validateRequiredFields() {
  const requiredFields = [
    "documento",
    "nombre",
    "fechaNacimiento",
    "telefono",
    "email",
    "motivo",
    "fechaCita",
  ];
  let allValid = true;

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    const isValid = field.value.trim() !== "";

    if (!isValid) {
      setFieldValidation(fieldId, false, "Este campo es requerido");
      allValid = false;
    } else {
      setFieldValidation(fieldId, true);
    }
  });

  return allValid;
}

function setFieldValidation(fieldId, isValid, message = "") {
  const field = document.getElementById(fieldId);
  const existingError = field.parentNode.querySelector(".error-message");

  // Remover mensaje de error existente
  if (existingError) {
    existingError.remove();
  }

  // Actualizar clases CSS
  field.classList.remove("valid", "invalid");
  field.classList.add(isValid ? "valid" : "invalid");

  // Agregar mensaje de error si no es válido
  if (!isValid && message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }
}

function showValidationErrors() {
  showNotification("Por favor corrija los errores en el formulario", "error");
}

// =====================================================
// FUNCIONES DE UTILIDAD
// =====================================================

function setMinDateTime() {
  const now = new Date();
  const minDateTime = new Date(now.getTime() + 30 * 60000); // 30 minutos desde ahora
  const minDateTimeString = minDateTime.toISOString().slice(0, 16);

  document.getElementById("fechaCita").min = minDateTimeString;
}

function getFormData() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const paramsObj = Object.fromEntries(params.entries());

  const { idFono } = paramsObj;
  const formData = {
    // Datos del paciente
    idPaciente_FK: parseInt(document.getElementById("documento").value.trim()),
    paciente: {
      nombre: document.getElementById("nombre").value.trim(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim(),
    },

    // Información de la cita
    motivo: document.getElementById("motivo").value,
    fechaCita: document.getElementById("fechaCita").value,
    alergias: document.getElementById("alergias").value.trim(),

    // Datos adicionales
    idFonoaudiologo_FK: parseInt(idFono),
    fechaCreacion: new Date().toISOString(),
    estado: "pendiente",
    userId: userData._id || null,
  };

  return formData;
}

function resetForm() {
  document.getElementById("citaForm").reset();
  // Limpiar mensajes de validación
  document.querySelectorAll(".error-message").forEach((msg) => msg.remove());
  document.querySelectorAll(".valid, .invalid").forEach((field) => {
    field.classList.remove("valid", "invalid");
  });

  // Volver a llenar datos del usuario
  setTimeout(populateUserFields, 100);
}

function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "error" ? "danger" : type
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 80px; right: 20px; z-index: 9999; min-width: 300px; max-width: 500px;";
  notification.innerHTML = `
        <i class="bi bi-${getIconForType(type)}"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;

  document.body.appendChild(notification);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function getIconForType(type) {
  switch (type) {
    case "success":
      return "check-circle";
    case "error":
      return "exclamation-triangle";
    case "warning":
      return "exclamation-triangle";
    case "info":
    default:
      return "info-circle";
  }
}

// =====================================================
// EVENT HANDLERS
// =====================================================

function handleFormSubmit(e) {
  e.preventDefault();

  console.log("Enviando formulario de cita...");

  // Validar formulario
  //   if (!validateAllFields()) {
  //     showValidationErrors();
  //     return;
  //   }

  // Obtener datos del formulario
  const citaData = getFormData();
  console.log("Datos de la cita:", citaData);

  // Deshabilitar botón para evitar doble envío
  const btnAgendar = document.getElementById("btnAgendar");
  btnAgendar.disabled = true;
  btnAgendar.textContent = "Agendando...";

  // Llamar función de agendar cita
  agendarCita(citaData);
}

function handleMotivoChange(e) {
  const motivo = e.target.value;
  console.log("Motivo seleccionado:", motivo);

  // Aquí puedes agregar lógica específica según el motivo
  if (motivo === "otro") {
    // Podrías mostrar un campo adicional para especificar
    showOtroMotivoField();
  } else {
    hideOtroMotivoField();
  }
}

function showOtroMotivoField() {
  // Función para mostrar campo "Otro motivo" si es necesario
  // IMPLEMENTAR según necesidades
  console.log("Mostrar campo otro motivo");
}

function hideOtroMotivoField() {
  // Función para ocultar campo "Otro motivo"
  // IMPLEMENTAR según necesidades
  console.log("Ocultar campo otro motivo");
}

// =====================================================
// FUNCIONES PRINCIPALES (PARA IMPLEMENTAR)
// =====================================================

async function agendarCita(citaData) {
  try {
    console.log("Agendando cita con datos:", citaData);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const paramsObj = Object.fromEntries(params.entries());

    const { idFono } = paramsObj;

    // IMPLEMENTAR: Llamada al API para agendar cita
    // const response = await fetch('/api/citas', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(citaData)
    // });

    const response = await request.post("/citas", citaData);

    // Simulación de respuesta exitosa
    handleAgendarSuccess(citaData);
  } catch (error) {
    console.error("Error al agendar cita:", error);
    handleAgendarError(error);
  }
}

function handleAgendarSuccess(citaData) {
  console.log("Cita agendada exitosamente");

  // Mostrar mensaje de éxito
  showNotification("¡Cita agendada exitosamente!", "success");

  // Resetear formulario
  resetForm();

  // Rehabilitar botón
  const btnAgendar = document.getElementById("btnAgendar");
  btnAgendar.disabled = false;
  btnAgendar.textContent = "Agendar Cita";

  // IMPLEMENTAR: Redireccionar o mostrar confirmación
  // setTimeout(() => {
  //     window.location.href = '/confirmacion-cita.html';
  // }, 3000);
}

function handleAgendarError(error) {
  console.error("Error al agendar cita:", error);

  // Mostrar mensaje de error
  showNotification(
    "Error al agendar la cita. Por favor intente nuevamente.",
    "error"
  );

  // Rehabilitar botón
  const btnAgendar = document.getElementById("btnAgendar");
  btnAgendar.disabled = false;
  btnAgendar.textContent = "Agendar Cita";
}

// =====================================================
// FUNCIONES ADICIONALES (OPCIONALES PARA IMPLEMENTAR)
// =====================================================

function verificarDisponibilidad(fecha, fonoId) {
  // IMPLEMENTAR: Verificar disponibilidad del fonoaudiólogo en la fecha seleccionada
  console.log("Verificando disponibilidad para:", fecha, fonoId);
}

function enviarConfirmacionEmail(citaData) {
  // IMPLEMENTAR: Enviar email de confirmación
  console.log("Enviando email de confirmación");
}

function guardarCitaLocal(citaData) {
  // IMPLEMENTAR: Guardar cita en localStorage como backup
  try {
    const citas = JSON.parse(localStorage.getItem("citas") || "[]");
    citas.push(citaData);
    localStorage.setItem("citas", JSON.stringify(citas));
  } catch (error) {
    console.error("Error al guardar cita localmente:", error);
  }
}

// =====================================================
// EXPORTAR FUNCIONES PARA USO GLOBAL (OPCIONAL)
// =====================================================

window.CitaManager = {
  agendarCita,
  validateAllFields,
  getFormData,
  resetForm,
  showNotification,
};
