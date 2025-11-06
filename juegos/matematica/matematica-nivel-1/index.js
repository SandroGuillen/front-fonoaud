// Variables globales
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let respuesta_usuario = document.getElementById("respuesta_usuario");
let msj_correccion = document.getElementById("msj_correccion");
let operacion = document.getElementById("operacion");
let corregirBtn = document.getElementById("corregir");
let endGameBtn = document.getElementById("endGameBtn");

let operacion_actual;
let n1, n2;
let correctCount = 0;
let incorrectCount = 0;
let intentosRealizados = 0;
const MAX_INTENTOS = 10;
let juegoActivo = true;
let timerStart = Date.now(); // Tiempo de inicio del juego

// Inicialización del juego
document.addEventListener("DOMContentLoaded", function () {
  // Establecer suma como operación por defecto
  btnSumar();

  // Configurar evento para tecla Enter
  respuesta_usuario.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      corregir();
    }
  });

  // Configurar botón de finalización del juego
  if (endGameBtn) {
    endGameBtn.addEventListener("click", endGame);
  }
});

// Función para actualizar las estadísticas
function updateStats() {
  document.getElementById("correct-count").textContent = correctCount;
  document.getElementById("incorrect-count").textContent = incorrectCount;
  document.getElementById("intentos-actual").textContent = intentosRealizados;
}

// Función para activar botones
function activarBoton(idBoton) {
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.classList.remove("activado");
  });
  document.getElementById(idBoton).classList.add("activado");
}

// Operación: Suma
function btnSumar() {
  if (!juegoActivo) return;

  msj_correccion.innerHTML = "";
  activarBoton("suma");
  operacion_actual = "+";
  operacion.textContent = "+";
  nuevaSuma();
}

function nuevaSuma() {
  n1 = Math.floor(Math.random() * 9) + 1;
  n2 = Math.floor(Math.random() * 9) + 1;
  num1.textContent = n1;
  num2.textContent = n2;
  respuesta_usuario.value = "";
  respuesta_usuario.focus();
}

// Operación: Resta
function btnResta() {
  if (!juegoActivo) return;

  msj_correccion.innerHTML = "";
  activarBoton("resta");
  operacion_actual = "-";
  operacion.textContent = "-";
  nuevaResta();
}

function nuevaResta() {
  n1 = Math.floor(Math.random() * 5) + 5;
  n2 = Math.floor(Math.random() * 5);
  num1.textContent = n1;
  num2.textContent = n2;
  respuesta_usuario.value = "";
  respuesta_usuario.focus();
}

// Operación: Multiplicación
function btnProducto() {
  if (!juegoActivo) return;

  msj_correccion.innerHTML = "";
  activarBoton("producto");
  operacion_actual = "*";
  operacion.textContent = "×";
  nuevoProducto();
}

function nuevoProducto() {
  n1 = Math.floor(Math.random() * 9) + 1;
  n2 = Math.floor(Math.random() * 9) + 1;
  num1.textContent = n1;
  num2.textContent = n2;
  respuesta_usuario.value = "";
  respuesta_usuario.focus();
}

// Operación: División
function btnDivision() {
  if (!juegoActivo) return;

  msj_correccion.innerHTML = "";
  activarBoton("division");
  operacion_actual = "/";
  operacion.textContent = "÷";
  nuevaDivision();
}

function nuevaDivision() {
  let divisores = [];
  n1 = Math.floor(Math.random() * 9) + 1;

  // Encontrar divisores
  for (let i = 1; i <= n1; i++) {
    if (n1 % i === 0) {
      divisores.push(i);
    }
  }

  let pos = Math.floor(Math.random() * divisores.length);
  n2 = divisores[pos];
  num1.textContent = n1;
  num2.textContent = n2;
  respuesta_usuario.value = "";
  respuesta_usuario.focus();
}

// Función para corregir la respuesta
function corregir() {
  if (!respuesta_usuario.value || !juegoActivo) return;

  let solucion;
  let operacionStr = n1 + operacion_actual + n2;
  solucion = eval(operacionStr);

  let i = document.createElement("i");
  let isCorrect = parseInt(respuesta_usuario.value) === solucion;

  if (isCorrect) {
    i.className = "fas fa-check-circle";
    i.style.color = "var(--correct-color)";
    correctCount++;
  } else {
    i.className = "fas fa-times-circle";
    i.style.color = "var(--incorrect-color)";
    incorrectCount++;
  }

  intentosRealizados++; // Contar cada intento

  msj_correccion.innerHTML = "";
  msj_correccion.appendChild(i);
  updateStats();

  // Verificar si se alcanzó el límite de intentos
  if (intentosRealizados >= MAX_INTENTOS) {
    finalizarJuego();
    return;
  }

  // Generar nueva operación según el tipo actual
  switch (operacion_actual) {
    case "+":
      nuevaSuma();
      break;
    case "-":
      nuevaResta();
      break;
    case "*":
      nuevoProducto();
      break;
    case "/":
      nuevaDivision();
      break;
  }
}

// Función para finalizar el juego por límite de intentos
function finalizarJuego() {
  juegoActivo = false;
  respuesta_usuario.disabled = true;
  corregirBtn.disabled = true;

  // Deshabilitar botones de operación
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.disabled = true;
  });

  // Mostrar mensaje de fin de juego
  let mensajeFin = document.createElement("div");
  mensajeFin.className = "mensaje-fin";
  mensajeFin.innerHTML = `
    <h3>¡Juego Terminado!</h3>
    <p>Has completado ${MAX_INTENTOS} operaciones.</p>
    <p><strong>Resultado Final:</strong></p>
    <p>Correctas: ${correctCount} | Incorrectas: ${incorrectCount}</p>
    <button class="btn-reiniciar" onclick="reiniciarJuego()">Jugar de Nuevo</button>
  `;
  msj_correccion.appendChild(mensajeFin);

  // Guardar resultados automáticamente
  guardarResultados();
}

// Función para reiniciar el juego
function reiniciarJuego() {
  correctCount = 0;
  incorrectCount = 0;
  intentosRealizados = 0;
  juegoActivo = true;
  timerStart = Date.now();

  updateStats();

  // Limpiar mensajes y habilitar entrada
  msj_correccion.innerHTML = "";
  respuesta_usuario.disabled = false;
  corregirBtn.disabled = false;

  // Habilitar botones de operación
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.disabled = false;
  });

  // Volver a la operación por defecto
  btnSumar();
}

// Función para guardar resultados
function guardarResultados() {
  let user = JSON.parse(localStorage.getItem("user"));
  let TiempoFinal = Math.floor((Date.now() - timerStart) / 1000); // segundos transcurridos

  if (typeof onEndGame === "function") {
    onEndGame({
      moves: intentosRealizados,
      score: correctCount,
      gameType: "matematica niveles",
      gameName: "matematica level 1",
      seconds: TiempoFinal,
      pacienteId: user?.identificacion || null,
    });
  }
}

// Función para finalizar el juego manualmente
function endGame() {
  let user = JSON.parse(localStorage.getItem("user"));
  let TiempoFinal = Math.floor((Date.now() - timerStart) / 1000); // segundos transcurridos

  if (typeof onEndGame === "function") {
    onEndGame({
      moves: intentosRealizados,
      score: correctCount,
      gameType: "matematica",
      gameName: "matematica-nivel-1",
      seconds: TiempoFinal,
      pacienteId: user?.identificacion || null,
    });
  }

  alert("Juego finalizado. ¡Gracias por participar!");
  reiniciarJuego();
}
