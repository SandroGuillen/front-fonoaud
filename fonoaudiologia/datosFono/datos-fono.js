document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const avatarUpload = document.getElementById("avatarUpload");
  const profileAvatar = document.getElementById("profileAvatar");
  const nombresInput = document.getElementById("nombres");
  const apellidosInput = document.getElementById("apellidos");
  const nombreCompleto = document.getElementById("nombreCompleto");
  const btnAddEducacion = document.getElementById("btnAddEducacion");
  const educacionContainer = document.getElementById("educacionContainer");
  const btnAddExperiencia = document.getElementById("btnAddExperiencia");
  const experienciaContainer = document.getElementById("experienciaContainer");
  const documentosUpload = document.getElementById("documentosUpload");
  const documentosLista = document.getElementById("documentosLista");
  const formDatosPersonales = document.getElementById("formDatosPersonales");

  // Previsualización de imagen de perfil
  if (avatarUpload && profileAvatar) {
    avatarUpload.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          profileAvatar.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Actualizar nombre completo en tiempo real
  function actualizarNombre() {
    if (nombreCompleto) {
      const nombre = nombresInput ? nombresInput.value || "Nombre" : "Nombre";
      const apellido = apellidosInput
        ? apellidosInput.value || "Apellido"
        : "Apellido";
      nombreCompleto.textContent = `${nombre} ${apellido}`;
    }
  }

  if (nombresInput) nombresInput.addEventListener("input", actualizarNombre);
  if (apellidosInput)
    apellidosInput.addEventListener("input", actualizarNombre);

  // Plantilla para items de educación
  function getEducationItemTemplate() {
    return `
            <div class="education-item">
                <div class="item-actions">
                    <button class="btn btn-sm btn-outline-danger btn-remove-item" type="button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Título Obtenido</label>
                        <input type="text" class="form-control" name="titulo[]" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Institución Educativa</label>
                        <input type="text" class="form-control" name="institucion_educativa[]" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Fecha de Inicio</label>
                        <input type="date" class="form-control" name="fecha_inicio_estudio[]" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Fecha de Finalización</label>
                        <input type="date" class="form-control" name="fecha_fin_estudio[]">
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
            </div>
        `;
  }

  // Plantilla para items de experiencia
  function getExperienceItemTemplate() {
    return `
            <div class="experience-item">
                <div class="item-actions">
                    <button class="btn btn-sm btn-outline-danger btn-remove-item" type="button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Puesto/Cargo</label>
                        <input type="text" class="form-control" name="puesto[]" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Institución/Empresa</label>
                        <input type="text" class="form-control" name="institucion[]" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Fecha de Inicio</label>
                        <input type="date" class="form-control" name="fecha_inicio[]" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Fecha de Finalización</label>
                        <input type="date" class="form-control" name="fecha_fin[]">
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
            </div>
        `;
  }

  // Plantilla para documentos subidos
  function getDocumentItemTemplate(fileName) {
    const extension = fileName.split(".").pop().toLowerCase();
    let iconClass = "unknown-icon";
    let icon = "bi-file-earmark";

    if (extension === "pdf") {
      iconClass = "pdf-icon";
      icon = "bi-file-earmark-pdf";
    } else if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      iconClass = "img-icon";
      icon = "bi-file-earmark-image";
    }

    return `
            <div class="document-item">
                <div>
                    <i class="bi ${icon} ${iconClass} file-icon"></i>
                    <span>${fileName}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-2">
                        <i class="bi bi-download"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger btn-remove-document" type="button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
  }

  // Agregar nueva formación académica
  if (btnAddEducacion && educacionContainer) {
    btnAddEducacion.addEventListener("click", function () {
      const newItem = document.createElement("div");
      newItem.innerHTML = getEducationItemTemplate();
      educacionContainer.appendChild(newItem);
      setupDeleteButtons();
    });
  }

  // Agregar nueva experiencia laboral
  if (btnAddExperiencia && experienciaContainer) {
    btnAddExperiencia.addEventListener("click", function () {
      const newItem = document.createElement("div");
      newItem.innerHTML = getExperienceItemTemplate();
      experienciaContainer.appendChild(newItem);
      setupDeleteButtons();
    });
  }

  // Manejar subida de documentos
  if (documentosUpload && documentosLista) {
    documentosUpload.addEventListener("change", function (e) {
      Array.from(e.target.files).forEach((file) => {
        const newItem = document.createElement("div");
        newItem.innerHTML = getDocumentItemTemplate(file.name);
        documentosLista.appendChild(newItem);
      });
      setupDeleteButtons();
    });
  }

  // Configurar botones de eliminar
  function setupDeleteButtons() {
    // Eliminar items de educación/experiencia
    document.querySelectorAll(".btn-remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de eliminar este elemento?")) {
          this.closest(".education-item, .experience-item").remove();
        }
      });
    });

    // Eliminar documentos
    document.querySelectorAll(".btn-remove-document").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de eliminar este documento?")) {
          this.closest(".document-item").remove();
        }
      });
    });
  }

  // Guardar datos del formulario principal
  if (formDatosPersonales) {
    formDatosPersonales.addEventListener("submit", function (e) {
      e.preventDefault();

      // Recopilar datos del formulario
      const formData = {
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        especialidad: document.getElementById("especialidadInput").value,
        tipoDocumento: document.getElementById("tipoDocumento").value,
        numeroDocumento: document.getElementById("numeroDocumento").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        // Aquí puedes agregar más campos según sea necesario
      };

      // Aquí iría la lógica para enviar los datos al servidor
      console.log("Datos a guardar:", formData);
      alert("Datos personales guardados correctamente");

      // Ejemplo: Guardar en localStorage (solo para demostración)
      localStorage.setItem("perfilFonoaudiologo", JSON.stringify(formData));
    });
  }

  // Cargar datos guardados (si existen)
  function cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem("perfilFonoaudiologo");
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);

      // Rellenar formulario con datos guardados
      Object.keys(datos).forEach((key) => {
        const element = document.getElementById(key);
        if (element) element.value = datos[key];
      });

      // Actualizar nombre mostrado
      actualizarNombre();
    }
  }

  // Inicializar eventos y cargar datos
  setupDeleteButtons();
  cargarDatosGuardados();
});
