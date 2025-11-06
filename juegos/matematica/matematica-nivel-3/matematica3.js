// Variables globales
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let respuesta_usuario = document.getElementById("respuesta_usuario");
let msj_correccion = document.getElementById("msj_correccion");
let operacion = document.getElementById("operacion");
let correctCountElement = document.getElementById("correct-count");
let incorrectCountElement = document.getElementById("incorrect-count");
let corregirBtn = document.getElementById("corregir");

let operacion_actual;
let n1, n2;
let correctCount = 0;
let incorrectCount = 0;
let intentosRealizados = 0;
const MAX_INTENTOS = 10;
let juegoActivo = true;

// Variables para el tracking del juego
let Movimientos = 0;
let Aciertos = 0;
let TiempoInicial = 0;
let timer = 0;
let startTime = Date.now();
let juegoTerminado = false;

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
  // Configurar evento para tecla Enter
  respuesta_usuario.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      corregir();
    }
  });

  // Iniciar con suma por defecto
  btnSumar();
  startTime = Date.now();
});

// Funciones de operaciones
function btnSumar() {
  if (!juegoActivo) return;

  limpiarMensaje();
  activarBoton("suma");
  operacion_actual = "+";
  operacion.textContent = "+";
  nuevaSuma();
}

function nuevaSuma() {
  n1 = Math.floor(Math.random() * 900) + 100; // Números entre 100 y 999
  n2 = Math.floor(Math.random() * 50) + 10; // Números entre 10 y 59
  actualizarNumeros();
}

function btnResta() {
  if (!juegoActivo) return;

  limpiarMensaje();
  activarBoton("resta");
  operacion_actual = "-";
  operacion.textContent = "-";
  nuevaResta();
}

function nuevaResta() {
  n1 = Math.floor(Math.random() * 900) + 100; // Números entre 100 y 999
  n2 = Math.floor(Math.random() * 90) + 10; // Números entre 10 y 99
  // Aseguramos que el primer número sea mayor que el segundo
  if (n1 < n2) {
    [n1, n2] = [n2, n1]; // Intercambiamos valores
  }
  actualizarNumeros();
}

function btnProducto() {
  if (!juegoActivo) return;

  limpiarMensaje();
  activarBoton("producto");
  operacion_actual = "*";
  operacion.textContent = "×";
  nuevoProducto();
}

function nuevoProducto() {
  n1 = Math.floor(Math.random() * 90) + 10; // Números entre 10 y 99
  n2 = Math.floor(Math.random() * 9) + 1; // Números entre 1 y 9
  actualizarNumeros();
}

function btnDivision() {
  if (!juegoActivo) return;

  limpiarMensaje();
  activarBoton("division");
  operacion_actual = "/";
  operacion.textContent = "÷";
  nuevaDivision();
}

function nuevaDivision() {
  let divisores = [];
  n1 = Math.floor(Math.random() * 900) + 100; // Números entre 100 y 999

  // Encontrar divisores mayores que 10
  for (let i = 10; i <= n1; i++) {
    if (n1 % i === 0) {
      divisores.push(i);
    }
  }

  // Si no hay divisores mayores que 10, usar cualquier divisor
  if (divisores.length === 0) {
    for (let i = 1; i <= n1; i++) {
      if (n1 % i === 0) {
        divisores.push(i);
      }
    }
  }

  let pos = Math.floor(Math.random() * divisores.length);
  n2 = divisores[pos];
  actualizarNumeros();
}

// Funciones auxiliares
function actualizarNumeros() {
  num1.textContent = n1;
  num2.textContent = n2;
  respuesta_usuario.value = "";
  respuesta_usuario.focus();
}

function limpiarMensaje() {
  msj_correccion.innerHTML = "";
}

function activarBoton(idBoton) {
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.classList.remove("activado");
  });
  document.getElementById(idBoton).classList.add("activado");
}

function actualizarEstadisticas() {
  correctCountElement.textContent = correctCount;
  incorrectCountElement.textContent = incorrectCount;
}

function finalizarJuego() {
  juegoActivo = false;
  juegoTerminado = true;
  respuesta_usuario.disabled = true;
  corregirBtn.disabled = true;

  // Deshabilitar botones de operación
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.disabled = true;
  });

  // Calcular el tiempo transcurrido
  timer = Math.floor((Date.now() - startTime) / 1000);

  // Llamar a la función onEndGame
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (typeof onEndGame === "function") {
    onEndGame({
      moves: Movimientos,
      score: Aciertos,
      gameType: "matematica",
      gameName: "matematica-nivel-3",
      seconds: timer,
      pacienteId: user.identificacion || "unknown",
    });
  }

  // Mostrar mensaje de fin de juego
  let mensajeFin = document.createElement("div");
  mensajeFin.className = "mensaje-fin";
  mensajeFin.innerHTML = `
    <h3>¡Juego Terminado!</h3>
    <p>Has completado ${MAX_INTENTOS} operaciones.</p>
    <p><strong>Resultado Final:</strong></p>
    <p>Correctas: ${correctCount} | Incorrectas: ${incorrectCount}</p>
    <p>Movimientos: ${Movimientos} | Tiempo: ${timer} segundos</p>
    <button class="btn-reiniciar" onclick="reiniciarJuego()">Jugar de Nuevo</button>
  `;
  msj_correccion.appendChild(mensajeFin);
}

function reiniciarJuego() {
  correctCount = 0;
  incorrectCount = 0;
  intentosRealizados = 0;
  juegoActivo = true;
  juegoTerminado = false;

  // Reiniciar variables de tracking
  Movimientos = 0;
  Aciertos = 0;
  startTime = Date.now();

  actualizarEstadisticas();

  // Limpiar mensajes y habilitar entrada
  limpiarMensaje();
  respuesta_usuario.disabled = false;
  corregirBtn.disabled = false;

  // Habilitar botones de operación
  document.querySelectorAll(".operation-btn").forEach((btn) => {
    btn.disabled = false;
  });

  // Volver a la operación por defecto
  btnSumar();
}

// Función principal de corrección
function corregir() {
  if (!respuesta_usuario.value || !juegoActivo) return;

  let solucion;
  let operacionStr = n1 + operacion_actual + n2;
  solucion = eval(operacionStr);

  let isCorrect = parseInt(respuesta_usuario.value) === solucion;
  let icono = document.createElement("i");
  icono.className = isCorrect ? "fas fa-check-circle" : "fas fa-times-circle";

  // Incrementar movimientos
  Movimientos++;

  if (isCorrect) {
    correctCount++;
    Aciertos++; // Incrementar aciertos
  } else {
    incorrectCount++;
  }

  // Incrementar contador de intentos
  intentosRealizados++;

  limpiarMensaje();
  msj_correccion.appendChild(icono);
  actualizarEstadisticas();

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

// Función para manejar el cierre de la página/ventana
window.addEventListener("beforeunload", function () {
  if (!juegoTerminado && startTime > 0) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (typeof onEndGame === "function") {
      onEndGame({
        moves: Movimientos,
        score: Aciertos,
        gameType: "matematicas",
        gameName: "operaciones-avanzadas",
        seconds: Math.floor((Date.now() - startTime) / 1000),
        pacienteId: user.identificacion || "unknown",
      });
    }
  }
});

// Función para manejar cuando la página pierde el foco (opcional)
window.addEventListener("visibilitychange", function () {
  if (document.hidden && !juegoTerminado && startTime > 0) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (typeof onEndGame === "function") {
      onEndGame({
        moves: Movimientos,
        score: Aciertos,
        gameType: "matematica",
        gameName: "matematica-nivel-3",
        seconds: Math.floor((Date.now() - startTime) / 1000),
        pacienteId: user.identificacion || "unknown",
      });
    }
  }
});
