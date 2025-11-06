let clickAudio = new Audio("./mp3/click.mp3");
let correctoAudio = new Audio("./mp3/correct.mp3");
let perderAudio = new Audio("./mp3/perder.mp3");
let ganarAudio = new Audio("./mp3/ganar.mp3");
let incorrectoAudio = new Audio("./mp3/incorrecto.mp3");

// Arreglo con las imágenes de los instrumentos
let instrumentos = [
  "accordion.png",
  "Bateria.png",
  "flute.png",
  "maracas.png",
  "piano.png",
  "teclado.png",
  "Trompeta.png",
  "xilófono.png",
  "Guitarra.png",
];

// Arreglo que guardará la opción correcta
let correcta = [0, 1, 2, 0, 0, 1, 2, 1, 2];

// Arreglo que guardará las opciones a mostrar en cada jugada
let opciones = [];
opciones.push(["ACORDEON", "XILOFONO", "BATERIA"]);
opciones.push(["FLAUTA", "BATERIA", "MARACAS"]);
opciones.push(["TROMPETA", "PIANO", "FLAUTA"]);
opciones.push(["MARACAS", "XILOFONO", "TECLADO"]);
opciones.push(["PIANO", "TECLADO", "ACORDION"]);
opciones.push(["PIANO", "TECLADO", "MARACAS"]);
opciones.push(["GUITARRA", "FLAUTA", "TROMPETA"]);
opciones.push(["GUITARRA", "XILOFONO", "BATERIA"]);
opciones.push(["MARACAS", "BANDOLA", "GUITARRA"]);

// Variables para el tracking del juego
let Movimientos = 0;
let Aciertos = 0;
let timer = 0;
let startTime = 0;
let juegoTerminado = false;
let timerInterval = null;

// Variable que guarda la posición actual
let posActual = 0;
// Variable que guarda la cantidad acertadas hasta el momento
let cantidadAcertadas = 0;

function comenzarJuego() {
  // Reseteamos las variables
  posActual = 0;
  cantidadAcertadas = 0;
  Movimientos = 0;
  Aciertos = 0;
  juegoTerminado = false;
  startTime = Date.now();

  // Iniciar temporizador
  iniciarTemporizador();

  // Actualizar estadísticas iniciales
  actualizarEstadisticas();

  // Activar las pantallas necesarias
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  cargarInstrumento();
}

function iniciarTemporizador() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!juegoTerminado) {
      timer = Math.floor((Date.now() - startTime) / 1000);
      document.getElementById("time-count").textContent = timer;

      // Cambiar color cuando el tiempo sea alto
      const timeElement = document.getElementById("time-count");
      const timeCard = timeElement.closest(".stat-card");
      if (timer > 60) {
        timeCard.classList.add("tiempo-urgente");
      } else {
        timeCard.classList.remove("tiempo-urgente");
      }
    }
  }, 1000);
}

function actualizarEstadisticas() {
  document.getElementById("movimientos-count").textContent = Movimientos;
  document.getElementById("aciertos-count").textContent = Aciertos;
}

// Función que carga el siguiente instrumento y sus opciones
function cargarInstrumento() {
  // Controlamos si se acabaron los instrumentos
  if (instrumentos.length <= posActual) {
    terminarJuego();
  } else {
    // Cargamos las opciones
    // Limpiamos las clases que se asignaron
    limpiarOpciones();

    document.getElementById("imgBandera").src =
      "img/" + instrumentos[posActual];
    document.getElementById("n0").innerHTML = opciones[posActual][0];
    document.getElementById("n1").innerHTML = opciones[posActual][1];
    document.getElementById("n2").innerHTML = opciones[posActual][2];
  }
}

function limpiarOpciones() {
  document.getElementById("n0").className = "nombre";
  document.getElementById("n1").className = "nombre";
  document.getElementById("n2").className = "nombre";

  document.getElementById("l0").className = "letra";
  document.getElementById("l1").className = "letra";
  document.getElementById("l2").className = "letra";
}

function comprobarRespuesta(opElegida) {
  if (juegoTerminado) return;

  clickAudio.play();

  // Incrementar movimientos
  Movimientos++;
  actualizarEstadisticas();

  if (opElegida == correcta[posActual]) {
    correctoAudio.play(); // Acertó
    // Agregamos las clases para colocar el color verde a la opción elegida
    document.getElementById("n" + opElegida).className =
      "nombre nombreAcertada";
    document.getElementById("l" + opElegida).className = "letra letraAcertada";

    cantidadAcertadas++;
    Aciertos++; // Incrementar aciertos
    actualizarEstadisticas();
  } else {
    // No acertó
    // Agregamos las clases para colocar en rojo la opción elegida
    document.getElementById("n" + opElegida).className =
      "nombre nombreNoAcertada";
    document.getElementById("l" + opElegida).className =
      "letra letraNoAcertada";
    incorrectoAudio.play();

    // Opción que era correcta
    document.getElementById("n" + correcta[posActual]).className =
      "nombre nombreAcertada";
    document.getElementById("l" + correcta[posActual]).className =
      "letra letraAcertada";
  }

  posActual++;
  // Esperamos 1 segundo y pasamos a mostrar el siguiente instrumento y sus opciones
  setTimeout(cargarInstrumento, 1000);
}

function terminarJuego() {
  if (juegoTerminado) return;
  juegoTerminado = true;

  // Detener temporizador
  clearInterval(timerInterval);

  // Calcular el tiempo transcurrido
  timer = Math.floor((Date.now() - startTime) / 1000);

  // Mostrar estadísticas finales
  document.getElementById("numCorrectas").textContent = cantidadAcertadas;
  document.getElementById("numIncorrectas").textContent =
    instrumentos.length - cantidadAcertadas;
  document.getElementById("final-movimientos").textContent = Movimientos;
  document.getElementById("final-tiempo").textContent = timer;

  // Llamar a la función onEndGame
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (typeof onEndGame === "function") {
    console.log("juego terminado");
    onEndGame({
      moves: Movimientos,
      score: Aciertos,
      gameType: "educativas",
      gameName: "quiz-Instrumentos",
      seconds: timer,
      pacienteId: user.identificacion || "unknown",
    });
  }

  // Reproducir sonido de victoria si hay más aciertos que errores
  if (cantidadAcertadas > instrumentos.length - cantidadAcertadas) {
    ganarAudio.play();
  }

  // Ocultamos las pantallas y mostramos la pantalla final
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
}

function volverAlInicio() {
  // Ocultamos las pantallas y activamos la inicial
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
  document.getElementById("pantalla-juego").style.display = "none";
}

function resetGame() {
  // Detener temporizador
  clearInterval(timerInterval);

  // Volver al inicio
  volverAlInicio();
}

// Función para manejar el cierre de la página/ventana
window.addEventListener("beforeunload", function () {
  if (!juegoTerminado && startTime > 0) {
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // if (typeof onEndGame === "function") {
    //   onEndGame({
    //     moves: Movimientos,
    //     score: Aciertos,
    //     gameType: "educativas",
    //     gameName: "quiz-Instrumentos",
    //     seconds: Math.floor((Date.now() - startTime) / 1000),
    //     pacienteId: user.identificacion || "unknown",
    //   });
    // }
  }
});

// Función para manejar cuando la página pierde el foco (opcional)
window.addEventListener("visibilitychange", function () {
  if (document.hidden && !juegoTerminado && startTime > 0) {
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // if (typeof onEndGame === "function") {
    //   onEndGame({
    //     moves: Movimientos,
    //     score: Aciertos,
    //     gameType: "educativas",
    //     gameName: "quiz-Instrumentos",
    //     seconds: Math.floor((Date.now() - startTime) / 1000),
    //     pacienteId: user.identificacion || "unknown",
    //   });
    // }
  }
});
