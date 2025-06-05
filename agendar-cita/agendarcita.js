const button = document.getElementById("btnAgendar");
const buscarUsuario = document.getElementById("buscarUsuario");
const nombre = document.getElementById("nombre");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const motivoInput = document.getElementById("motivo");
const fechaCitaInput = document.getElementById("fechaCita");
const alergiasInput = document.getElementById("alergias");

button.addEventListener("click", async (e) => {
  e.preventDefault();

  const identificacion = buscarUsuario.value;
  const motivo = motivoInput.value;
  const fechaCita = fechaCitaInput.value;
  const alergias = alergiasInput.value;

  const data = {
    motivo,
    alergias,
    fechaCita,
    idPaciente_FK: parseInt(identificacion),
    idFonoaudilogo_FK: user.identificacion,
  };

  const response = await request.post("/citas", data);
  if (response.status == 200 || response.status == 201) {
    alert("Cita agendada correctamente");
  } else {
    alert("Error al agendar cita");
  }
});

buscarUsuario.addEventListener("blur", async (e) => {
  const response = await request.get(
    `/pacientes?identificacion=${e.target.value}`,
    {
      identificacion: e.target.value,
    }
  );
  console.log(response);
  nombre.value = response.data.nombre;
  fechaNacimiento.value = response.data.fechaNacimiento;
  telefono.value = response.data.telefono;
  email.value = response.data.correo;
});
