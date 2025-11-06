// Variables globales
const logOutButton = document.getElementById("login-link");

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/Login/index.html";
});

let documentos = [];

// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  loadUserData();
  loadExperiencia();
  loadFormacion();
  initializeEventListeners();
});

// Cargar datos del usuario desde localStorage
function loadUserData() {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      user = userData;
      populateUserData();
    }
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
  }
}

// Poblar los campos con los datos del usuario
function populateUserData() {
  // Datos básicos del perfil
  document.getElementById("nombreCompleto").textContent =
    `${user.nombre || ""} ${user.apellido || ""}`.trim() || "Nombre Apellido";
  document.getElementById("especialidad").textContent =
    user.especialidad || "Especialidad";

  // Campos del formulario
  document.getElementById("nombres").value = user.nombre || "";
  document.getElementById("apellidos").value = user.apellido || "";
  document.getElementById("especialidadInput").value = user.especialidad || "";
  document.getElementById("tipoDocumento").value =
    user.tipoDocumento?.toLowerCase() || "cc";
  document.getElementById("numeroDocumento").value = user.identificacion || "";
  document.getElementById("fechaNacimiento").value = user.fechaNacimiento || "";
  document.getElementById("email").value = user.correo || "";
  document.getElementById("telefono").value = user.telefono || "";
  document.getElementById("direccion").value = user.direccion || "";
}

// Inicializar event listeners
function initializeEventListeners() {
  // Formulario de datos personales
  document
    .getElementById("formDatosPersonales")
    .addEventListener("submit", handlePersonalDataSubmit);

  // Cambio de avatar
  document
    .getElementById("avatarUpload")
    .addEventListener("change", handleAvatarUpload);

  // Botones para agregar secciones
  document
    .getElementById("btnAddEducacion")
    .addEventListener("click", () => addEducationItem());
  document
    .getElementById("btnAddExperiencia")
    .addEventListener("click", () => addExperienceItem());

  // Subida de documentos
  document
    .getElementById("documentosUpload")
    .addEventListener("change", handleDocumentUpload);

  document
    .getElementById("guardar-todo")
    .addEventListener("click", () => saveAll());

  // Event delegation para botones de eliminar
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("btn-remove-item") ||
      e.target.parentElement.classList.contains("btn-remove-item")
    ) {
      removeItem(e.target.closest(".education-item, .experience-item"));
    }
  });

  // Manejar cambios en "actualmente cursando/trabajando"
  document.addEventListener("change", function (e) {
    if (
      e.target.name &&
      (e.target.name.includes("actualmente") ||
        e.target.name.includes("actualmente_estudiando"))
    ) {
      handleCurrentStatusChange(e.target);
    }
  });
}

// Manejar envío del formulario de datos personales
async function handlePersonalDataSubmit(e) {
  e.preventDefault();

  // Actualizar objeto user
  user.nombre = document.getElementById("nombres").value;
  user.apellido = document.getElementById("apellidos").value;
  user.especialidad = document.getElementById("especialidadInput").value;
  // user.tipoDocumento = document
  //   .getElementById("tipoDocumento")
  //   .value.toUpperCase();
  // user.identificacion = document.getElementById("numeroDocumento").value;
  user.fechaNacimiento = document.getElementById("fechaNacimiento").value;
  user.correo = document.getElementById("email").value;
  user.telefono = document.getElementById("telefono").value;
  user.direccion = document.getElementById("direccion").value;

  // Guardar en localStorage
  localStorage.setItem("user", JSON.stringify(user));

  try {
    const response = await request.put(`/fonoaudiologo`, user);
  } catch (error) {
    console.log(error);
  }

  // Actualizar vista
  populateUserData();

  // Mostrar mensaje de éxito
  showNotification("Datos guardados correctamente", "success");
}

// Manejar cambio de avatar
function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileAvatar").src = e.target.result;
        // Guardar la imagen en localStorage (opcional, ten en cuenta el límite de tamaño)
        user.avatar = e.target.result;
        localStorage.setItem("user", JSON.stringify(user));
        showNotification("Foto de perfil actualizada", "success");
      };
      reader.readAsDataURL(file);
    } else {
      showNotification(
        "Por favor selecciona un archivo de imagen válido",
        "error"
      );
    }
  }
}

// Agregar nuevo item de educación
function addEducationItem() {
  const container = document.getElementById("educacionContainer");
  const newItem = createEducationItem();
  container.appendChild(newItem);
}

// Crear elemento de educación
function createEducationItem() {
  const div = document.createElement("div");
  div.className = "education-item";
  div.innerHTML = `
        <div class="item-actions">
            <button class="btn btn-sm btn-outline-danger btn-remove-item" type="button">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Título Obtenido</label>
                <input type="text" class="form-control" name="titulo[]" required />
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Institución Educativa</label>
                <input type="text" class="form-control" name="institucion_educativa[]" required />
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label class="form-label">Fecha de Inicio</label>
                <input type="date" class="form-control" name="fecha_inicio_estudio[]" required />
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Fecha de Finalización</label>
                <input type="date" class="form-control" name="fecha_fin_estudio[]" />
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">¿Actualmente cursando?</label>
                <select class="form-select" name="actualmente_estudiando[]">
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <label class="form-label">Descripción del Programa</label>
                <textarea class="form-control" rows="2" name="descripcion_estudio[]"></textarea>
            </div>
        </div>
    `;
  return div;
}

async function saveExperiencia(data) {
  try {
    const response = await request.post("/fonoaudilogo/experiencia", data);
  } catch (error) {
    console.log(error);
  }
}

function save() {}

// Agregar nuevo item de experiencia
function addExperienceItem() {
  const container = document.getElementById("experienciaContainer");
  const newItem = createExperienceItem();
  container.appendChild(newItem);
}

async function loadExperiencia() {
  try {
    const response = await request.get("/fonoaudiologo/experiencia", {
      identificacion: user.identificacion,
    });
    renderExperienciaList(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function loadFormacion() {
  try {
    const response = await request.get("/fonoaudiologo/formacion", {
      identificacion: user.identificacion,
    });
    renderEducacionList(response.data);
  } catch (error) {
    console.log(error);
  }
}

function renderEducacionList(educacionList = []) {
  const container = document.getElementById("educacionContainer");
  if (educacionList.length === 0) return;
  container.innerHTML = ""; // limpiar contenido previo

  educacionList.forEach((edu) => {
    const item = createEducationItem();

    item.querySelector('[name="titulo[]"]').value = edu.titulo || "";
    item.querySelector('[name="institucion_educativa[]"]').value =
      edu.institucion || "";
    item.querySelector('[name="fecha_inicio_estudio[]"]').value =
      edu.fechaInicio || "";
    item.querySelector('[name="fecha_fin_estudio[]"]').value =
      edu.fechaFin || "";
    item.querySelector('[name="actualmente_estudiando[]"]').value =
      edu.actualmente || "no";
    item.querySelector('[name="descripcion_estudio[]"]').value =
      edu.descripcion || "";

    // Si está "actualmente cursando", deshabilitar fecha de fin
    handleCurrentStatusChange(
      item.querySelector('[name="actualmente_estudiando[]"]')
    );

    container.appendChild(item);
  });
}

function renderExperienciaList(experienciaList = []) {
  const container = document.getElementById("experienciaContainer");
  if (experienciaList.length === 0) return;
  container.innerHTML = ""; // limpiar contenido previo

  experienciaList.forEach((exp) => {
    const item = createExperienceItem();

    item.querySelector('[name="puesto[]"]').value = exp.puesto || "";
    item.querySelector('[name="institucion[]"]').value = exp.institucion || "";
    item.querySelector('[name="fecha_inicio[]"]').value = exp.fechaInicio || "";
    item.querySelector('[name="fecha_fin[]"]').value = exp.fechaFin || "";
    item.querySelector('[name="actualmente[]"]').value =
      exp.actualmente || "no";
    item.querySelector('[name="descripcion[]"]').value = exp.descripcion || "";

    // Si está "actualmente trabajando", deshabilitar fecha de fin
    handleCurrentStatusChange(item.querySelector('[name="actualmente[]"]'));

    container.appendChild(item);
  });
}

// Crear elemento de experiencia
function createExperienceItem() {
  const div = document.createElement("div");
  div.className = "experience-item";
  div.innerHTML = `
        <div class="item-actions">
            <button class="btn btn-sm btn-outline-danger btn-remove-item" type="button">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Puesto/Cargo</label>
                <input type="text" class="form-control" name="puesto[]" required />
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label">Institución/Empresa</label>
                <input type="text" class="form-control" name="institucion[]" required />
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label class="form-label">Fecha de Inicio</label>
                <input type="date" class="form-control" name="fecha_inicio[]" required />
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Fecha de Finalización</label>
                <input type="date" class="form-control" name="fecha_fin[]" />
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">¿Actualmente trabajando aquí?</label>
                <select class="form-select" name="actualmente[]">
                    <option value="no">No</option>
                    <option value="si">Sí</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <label class="form-label">Descripción de Funciones</label>
                <textarea class="form-control" rows="3" name="descripcion[]"></textarea>
            </div>
        </div>
    `;
  return div;
}
// Remover item
function removeItem(item) {
  if (item) {
    item.remove();
    showNotification("Elemento eliminado", "info");
  }
}

// Manejar cambio en estado actual (cursando/trabajando)
function handleCurrentStatusChange(select) {
  const row = select.closest(".row");
  const fechaFinInput = row.querySelector(
    'input[type="date"][name*="fecha_fin"]'
  );

  if (select.value === "si") {
    fechaFinInput.disabled = true;
    fechaFinInput.value = "";
    fechaFinInput.required = false;
  } else {
    fechaFinInput.disabled = false;
    fechaFinInput.required = false;
  }
}

// Manejar subida de documentos
function handleDocumentUpload(e) {
  const files = Array.from(e.target.files);
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  files.forEach((file) => {
    if (file.size > maxSize) {
      showNotification(
        `El archivo ${file.name} excede el tamaño máximo de 5MB`,
        "error"
      );
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      showNotification(
        `El archivo ${file.name} no tiene un formato válido`,
        "error"
      );
      return;
    }

    // Simular subida del archivo
    addDocumentToList(file);
  });

  // Limpiar input
  e.target.value = "";
}

// Agregar documento a la lista
function addDocumentToList(file) {
  const lista = document.getElementById("documentosLista");
  const docId =
    "doc_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

  const docElement = document.createElement("div");
  docElement.className =
    "list-group-item d-flex justify-content-between align-items-center";
  docElement.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${getFileIcon(file.type)} me-2"></i>
            <div>
                <strong>${file.name}</strong>
                <br>
                <small class="text-muted">${formatFileSize(
                  file.size
                )} - Subido el ${new Date().toLocaleDateString()}</small>
            </div>
        </div>
        <div>
            <button class="btn btn-sm btn-outline-primary me-2" onclick="viewDocument('${docId}')">
                <i class="bi bi-eye"></i> Ver
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="removeDocument('${docId}')">
                <i class="bi bi-trash"></i> Eliminar
            </button>
        </div>
    `;
  docElement.id = docId;

  lista.appendChild(docElement);

  // Guardar referencia del documento
  documentos.push({
    id: docId,
    name: file.name,
    type: file.type,
    size: file.size,
    uploadDate: new Date().toISOString(),
  });

  showNotification(`Documento ${file.name} subido correctamente`, "success");
}

// Obtener icono según tipo de archivo
function getFileIcon(type) {
  if (type === "application/pdf") return "bi-file-pdf";
  if (type.startsWith("image/")) return "bi-file-image";
  return "bi-file-earmark";
}

// Formatear tamaño de archivo
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Ver documento
function viewDocument(docId) {
  showNotification("Funcionalidad de visualización en desarrollo", "info");
}

// Remover documento
function removeDocument(docId) {
  const docElement = document.getElementById(docId);
  if (docElement) {
    docElement.remove();
    documentos = documentos.filter((doc) => doc.id !== docId);
    showNotification("Documento eliminado", "info");
  }
}

// Mostrar notificaciones
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "error" ? "danger" : type
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(notification);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Funciones de utilidad para guardar/cargar datos completos del perfil
function saveProfileData() {
  const profileData = {
    personalData: user,
    education: getEducationData(),
    experience: getExperienceData(),
    documents: documentos,
  };

  localStorage.setItem("profileData", JSON.stringify(profileData));
  return profileData;
}

function getEducationData() {
  const items = document.querySelectorAll(".education-item");
  return Array.from(items)
    .map((item) => ({
      titulo: item.querySelector('[name="titulo[]"]').value,
      institucion: item.querySelector('[name="institucion_educativa[]"]').value,
      fechaInicio: item.querySelector('[name="fecha_inicio_estudio[]"]').value,
      fechaFin: item.querySelector('[name="fecha_fin_estudio[]"]').value,
      actualmente: item.querySelector('[name="actualmente_estudiando[]"]')
        .value,
      descripcion: item.querySelector('[name="descripcion_estudio[]"]').value,
    }))
    .filter((edu) => edu.titulo && edu.institucion); // Filtrar entradas vacías
}

function getExperienceData() {
  const items = document.querySelectorAll(".experience-item");
  return Array.from(items)
    .map((item) => ({
      puesto: item.querySelector('[name="puesto[]"]').value,
      institucion: item.querySelector('[name="institucion[]"]').value,
      fechaInicio: item.querySelector('[name="fecha_inicio[]"]').value,
      fechaFin: item.querySelector('[name="fecha_fin[]"]').value,
      actualmente: item.querySelector('[name="actualmente[]"]').value,
      descripcion: item.querySelector('[name="descripcion[]"]').value,
    }))
    .filter((exp) => exp.puesto && exp.institucion); // Filtrar entradas vacías
}

// Exportar datos del perfil (opcional)
function exportProfile() {
  const profileData = saveProfileData();
  const dataStr = JSON.stringify(profileData, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = `perfil_${user.nombre}_${user.apellido}_${
    new Date().toISOString().split("T")[0]
  }.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

async function saveAll() {
  const { personalData, education, experience, documents } = saveProfileData();

  if (experience.length > 0)
    await request.post("/fonoaudiologo/save-experiencia", {
      experiencia: experience,
      identificacion: user.identificacion,
    });

  if (education.length > 0)
    await request.post("/fonoaudiologo/save-formacion", {
      formacion: education,
      identificacion: user.identificacion,
    });
  showNotification("Todos los datos guardados correctamente", "success");
}
