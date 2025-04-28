const registerButton = document.getElementById("btn-register");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-confirm-password");
const cedulaInput = document.getElementById("input-cedula");
const nombreInput = document.getElementById("input-nombre");
const apellidoInput = document.getElementById("input-apellido");
const tipoDocumentoSelect = document.getElementById("tipoDocumento");
const sexoBiologicoSelect = document.getElementById("input-sexobiologico");
const fechaNacimientoInput = document.getElementById("input-fecha");
const municipioInput = document.getElementById("input-municipio");
const barrioInput = document.getElementById("input-barrio");
const direccionInput = document.getElementById("input-direccion");
const telefonoInput = document.getElementById("input-telefono");
const correoInput = document.getElementById("input-correo");
const acceptCheckbox = document.getElementById("input-accept");

registerButton.addEventListener("click", async () => {
  // Validaciones básicas
  if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (!acceptCheckbox.checked) {
    alert("Debes aceptar los términos y condiciones");
    return;
  }

  // Formatear fecha de nacimiento (DD/MM/YYYY)
  const fechaNacimiento = new Date(fechaNacimientoInput.value);
  const formattedFechaNacimiento = `${fechaNacimiento.getDate()}/${
    fechaNacimiento.getMonth() + 1
  }/${fechaNacimiento.getFullYear()}`;

  // Obtener valores del formulario
  const userData = {
    identificacion: cedulaInput.value,
    contrasena: passwordInput.value,
    nombre: nombreInput.value,
    apellido: apellidoInput.value,
    tipoDocumento: tipoDocumentoSelect.value,
    sexoBiologico: sexoBiologicoSelect.value,
    fechaNacimiento: formattedFechaNacimiento,
    munOrigen_FK: municipioInput.value,
    veredaBarrio: barrioInput.value,
    direccion: direccionInput.value,
    telefono: telefonoInput.value,
    correo: correoInput.value,
  };

  try {
    // 1. Registrar persona
    const persona = await request.post("/personas/registrar-persona", userData);

    if (!persona || !persona._id) {
      throw new Error(
        "No se recibió respuesta válida del servidor al registrar persona"
      );
    }

    // 2. Registrar usuario/auth
    const authData = {
      username: userData.identificacion,
      contrasena: userData.contrasena,
      rol: "paciente",
      idPersona_FK: persona._id,
    };

    const authResponse = await request.post("/auth/register", authData);

    console.log("Registro exitoso:", authResponse);

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 2000);
  } catch (error) {
    console.error("Error en el registro:", error);

    // Mensaje más amigable para el usuario
    let errorMessage = "Ocurrió un error durante el registro";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    alert(errorMessage);
  }
});
