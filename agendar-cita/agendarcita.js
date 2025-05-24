const button = document.getElementById("btnAgendar");
const buscarUsuario = document.getElementById("buscarUsuario");
const nombre = document.getElementById("nombre");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const form = document.getElementById("citaForm");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const response = await request.post("/citas", data);
  if (response.status === 200) {
    alert("Cita agendada correctamente");
  } else {
    alert("Error al agendar cita");
  }
});

buscarUsuario.addEventListener("blur", async (e) => {
  const response = await request.get(`/pacientes/${e.target.value}`, {
    cedulaPaciente: e.target.value,
  });
  console.log(response);
  nombre.value = response.user.nombre;
  fechaNacimiento.value = response.user.fechaNacimiento;
  telefono.value = response.user.telefono;
  email.value = response.user.email;
});
