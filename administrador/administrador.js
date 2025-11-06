const obtenerFonos = async () => {
  const response = await request.get("/fonoaudiologo/all");
  return response.data;
};

const table = document.getElementById("fonoaudiologosTable");

async function renderRow(data) {
  table.innerHTML += `
    <tr>
        <td>${data.identificacion}</td>
        <td>${data.nombre} ${data.apellido}</td>
        <td>${data.especialidad}</td>
        <td>${data.correo}</td>
        <td>${data.telefono}</td>
        <td><span class="badge bg-success">Activo</span></td>
        <td>
            <button
            class="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#agregarFonoModal"
            >
            <i class="bi bi-pencil"></i>
            </button>
            <button
            class="btn btn-sm btn-info"
            data-bs-toggle="modal"
            data-bs-target="#changePasswordModal"
            >
            <i class="bi bi-key"></i>
            </button>
            <button class="btn btn-sm btn-danger">
            <i class="bi bi-trash"></i>
            </button>
        </td>
    </tr>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  // Datos de ejemplo (en un proyecto real estos vendrían de una API)
  console.log("funciona");
  fetchFonoaudiologos();

  // Inicializar DataTable

  // Buscar fonoaudiólogos
  $("#searchButton").click(function () {
    table.search($("#searchInput").val()).draw();
  });

  $("#searchInput").keyup(function (e) {
    if (e.keyCode === 13) {
      table.search($(this).val()).draw();
    }
  });

  // Filtrar por estado
  $("#filterStatus").change(function () {
    if ($(this).val() === "") {
      table.columns(5).search("").draw();
    } else {
      table.columns(5).search($(this).val()).draw();
    }
  });

  // Modal para agregar nuevo fonoaudiólogo
  $("#agregarFonoModal").on("show.bs.modal", function (e) {
    $("#modalTitle").text("Agregar Nuevo Fonoaudiólogo");
    $("#fonoForm")[0].reset();
    $("#fonoId").val("");
  });

  // Editar fonoaudiólogo
  $("#fonoaudiologosTable").on("click", ".edit-btn", function () {
    const id = $(this).data("id");
    const fono = fonoaudiologos.find((f) => f.id === id);

    if (fono) {
      $("#modalTitle").text("Editar Fonoaudiólogo");
      $("#fonoId").val(fono.id);
      $("#tipoDocumento").val(fono.tipoDocumento);
      $("#documento").val(fono.documento);
      $("#nombre").val(fono.nombre);
      $("#apellidos").val(fono.apellidos);
      $("#fechaNacimiento").val(fono.fechaNacimiento);
      $("#genero").val(fono.genero);
      $("#email").val(fono.email);
      $("#telefono").val(fono.telefono);
      $("#especialidad").val(fono.especialidad);
      $("#estado").val(fono.estado);
      $("#direccion").val(fono.direccion);
      $("#password").val("").prop("required", false);
      $("#confirmPassword").val("").prop("required", false);

      $("#agregarFonoModal").modal("show");
    }
  });

  // Cambiar contraseña
  $("#fonoaudiologosTable").on("click", ".password-btn", function () {
    const id = $(this).data("id");
    const fono = fonoaudiologos.find((f) => f.id === id);

    if (fono) {
      $("#passwordFonoId").val(fono.id);
      $("#changePasswordModal").modal("show");
    }
  });

  // Eliminar fonoaudiólogo
  $("#fonoaudiologosTable").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    const fono = fonoaudiologos.find((f) => f.id === id);

    if (fono) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar a ${fono.nombre} ${fono.apellidos}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí iría la llamada a la API para eliminar
          Swal.fire(
            "Eliminado!",
            "El fonoaudiólogo ha sido eliminado.",
            "success"
          );
          // Actualizar la tabla
          table.row($(this).parents("tr")).remove().draw();
        }
      });
    }
  });

  // Guardar fonoaudiólogo
  $("#saveFonoBtn").click(function () {
    const form = $("#fonoForm")[0];

    if (form.checkValidity()) {
      if ($("#password").val() !== $("#confirmPassword").val()) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
      }

      // Aquí iría la llamada a la API para guardar
      Swal.fire(
        "Éxito!",
        "Los datos del fonoaudiólogo han sido guardados.",
        "success"
      );
      $("#agregarFonoModal").modal("hide");
    } else {
      form.reportValidity();
    }
  });

  // Guardar nueva contraseña
  $("#savePasswordBtn").click(function () {
    const form = $("#passwordForm")[0];

    if (form.checkValidity()) {
      if ($("#newPassword").val() !== $("#confirmNewPassword").val()) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
      }

      // Aquí iría la llamada a la API para cambiar contraseña
      Swal.fire("Éxito!", "La contraseña ha sido actualizada.", "success");
      $("#changePasswordModal").modal("hide");
    } else {
      form.reportValidity();
    }
  });

  // Ejemplo de función para llamar a la API
  async function fetchFonoaudiologos() {
    // En un proyecto real:
    table.innerHTML = "";
    const fonoaudiologos = await obtenerFonos();
    for (const fono of fonoaudiologos) {
      renderRow(fono);
    }
    // fetch("/api/fonoaudiologos")
    //   .then((response) => response.json())
    //   .then((data) => {})
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     Swal.fire("Error", "No se pudieron cargar los fonoaudiólogos", "error");
    //   });
  }
});

const guardarFonoaudiologo = async (data) => {
  const response = await request.post("/fonoaudiologo", data);
  return response;
};

document.getElementById("saveFonoBtn").addEventListener("click", function () {
  // Obtener todos los valores del formulario
  const documento = document.getElementById("documento").value;
  const formData = {
    tipoDocumento: document.getElementById("tipoDocumento").value,
    identificacion: parseInt(documento),
    nombres: document.getElementById("nombres").value,
    apellido: document.getElementById("apellidos").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    sexoBiologico: document.getElementById("genero").value,
    correo: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    especialidad: document.getElementById("especialidad").value,
    estado: document.getElementById("estado").value,
    direccion: document.getElementById("direccion").value,
  };
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const user = {
    documento,
    password,
  };

  // Validar que las contraseñas coincidan
  if (formData.password !== formData.confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Simular envío del formulario (aquí iría tu petición AJAX real)
  console.log("Datos a enviar:", formData);

  // Simulación de petición fetch (puedes reemplazar con tu API real)
  guardarFonoaudiologo({ fonoaudiologo: formData, user });
});
