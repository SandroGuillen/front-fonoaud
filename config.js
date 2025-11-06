const loginElement = document.getElementById("login-link");

let user = JSON.parse(localStorage.getItem("user"));

const logoutButton = document.getElementById("logout-button");

if (user) {
  loginElement.innerHTML = user.nombre;
  logoutButton.style.display = "block";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location = "/Login/index.html";
  });
  if (user.rol == "paciente") {
    loginElement.addEventListener("click", () => {
      window.location = "/tarea-paciente/tareas-paciente.html";
    });
  } else if (user.rol == "fonoaudiologo") {
    loginElement.href = user.rol = "/formu-fono/fono.html";
  }
} else {
  loginElement.addEventListener("click", () => {
    window.location = "/Login/index.html";
  });
}
