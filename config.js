const loginElement = document.getElementById("login-link");

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  loginElement.innerHTML = user.nombre;
}
console.log(user);
