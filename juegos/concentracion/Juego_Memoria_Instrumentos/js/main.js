//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let Movimientos = 0;
let Aciertos = 0;
let Tiempo = false;
let timer = 40;
let TiempoInicial = timer;
let TiempoRegresivoId = null;

let clickAudio = new Audio("./mp3/click.mp3");
let correctoAudio = new Audio("./mp3/correcto.mp3");
let perderAudio = new Audio("./mp3/perder.mp3");
let ganarAudio = new Audio("./mp3/ganar.mp3");
let incorrectoAudio = new Audio("./mp3/incorrecto.mp3");

//Apuntado a documento HTML
let mostrarMovimientos = document.getElementById("Movimientos");
let mostrarAciertos = document.getElementById("Aciertos");
let mostrarTiempo = document.getElementById("Tiempo");

//Generacion de numeros Aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

//Funciones
function contarTiempo() {
  TiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: <span class="stat-value">${timer}</span> segundos`;

    // Cambiar color cuando quede poco tiempo
    if (timer <= 10) {
      mostrarTiempo.parentElement.classList.add("tiempo-urgente");
    }

    if (timer == 0) {
      clearInterval(TiempoRegresivoId);
      bloquearTarjetas();
      perderAudio.play();
      mostrarDerrota();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="Instrumento ${numeros[i]}">`;
    tarjetaBloqueada.disabled = true;
  }
}

//funcion principal
function destapar(id) {
  if (!Tiempo) {
    contarTiempo();
    Tiempo = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas == 1) {
    //mostrar primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="Instrumento ${primerResultado}">`;
    clickAudio.play();

    //Deshabilitar primer boton
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //mostrar Segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="Instrumento ${segundoResultado}">`;

    //Deshabilitar segundo boton
    tarjeta2.disabled = true;

    //Incrementar movimiento
    Movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: <span class="stat-value">${Movimientos}</span>`;

    if (primerResultado == segundoResultado) {
      //Encerar contador tarjetas destapadas
      tarjetasDestapadas = 0;
      correctoAudio.play();

      //Marcar como emparejadas
      setTimeout(() => {
        tarjeta1.classList.add("matched");
        tarjeta2.classList.add("matched");
      }, 500);

      //Aumentar aciertos
      Aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: <span class="stat-value">${Aciertos}</span>`;

      if (Aciertos == 8) {
        ganarAudio.play();
        clearInterval(TiempoRegresivoId);
        mostrarVictoria();

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (typeof onEndGame === "function") {
          onEndGame({
            moves: Movimientos,
            score: Aciertos,
            gameType: "concentracion",
            gameName: "Juego_Memoria_Instrumentos",
            seconds: TiempoInicial - timer,
            pacienteId: user.identificacion || "unknown",
          });
        }
      }
    } else {
      incorrectoAudio.play();
      //Mostrar momentaniamente valores y valoes a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = ``;
        tarjeta2.innerHTML = ``;
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 700);
    }
  }
}

// Función para mostrar mensaje de victoria
function mostrarVictoria() {
  const overlay = document.createElement("div");
  overlay.className = "victoria-overlay";
  overlay.innerHTML = `
        <div class="mensaje-victoria">
            <h2>¡Felicidades! 🎉</h2>
            <p>Has completado el juego de memoria de instrumentos</p>
            <p><strong>Aciertos:</strong> ${Aciertos} 🤗</p>
            <p><strong>Demoraste:</strong> ${
              TiempoInicial - timer
            } segundos 😋</p>
            <p><strong>Movimientos:</strong> ${Movimientos} 😎</p>
            <button class="btn btn-primary mt-3" onclick="cerrarMensajeVictoria()">
                <i class="fas fa-redo me-2"></i>Jugar de nuevo
            </button>
        </div>
    `;
  document.body.appendChild(overlay);
}

// Función para mostrar mensaje de derrota
function mostrarDerrota() {
  const overlay = document.createElement("div");
  overlay.className = "victoria-overlay";
  overlay.innerHTML = `
        <div class="mensaje-victoria">
            <h2>¡Tiempo agotado! ⏰</h2>
            <p>El tiempo se ha acabado, inténtalo de nuevo</p>
            <p><strong>Aciertos:</strong> ${Aciertos}</p>
            <p><strong>Movimientos:</strong> ${Movimientos}</p>
            <button class="btn btn-primary mt-3" onclick="cerrarMensajeVictoria()">
                <i class="fas fa-redo me-2"></i>Reintentar
            </button>
        </div>
    `;
  document.body.appendChild(overlay);
}

// Función para cerrar mensaje de victoria/derrota
function cerrarMensajeVictoria() {
  const overlay = document.querySelector(".victoria-overlay");
  if (overlay) {
    overlay.remove();
  }
  reiniciarJuego();
}

// Función para reiniciar el juego
function reiniciarJuego() {
  // Reiniciar variables
  tarjetasDestapadas = 0;
  tarjeta1 = null;
  tarjeta2 = null;
  primerResultado = null;
  segundoResultado = null;
  Movimientos = 0;
  Aciertos = 0;
  Tiempo = false;
  timer = 40;
  TiempoInicial = timer;

  // Detener temporizador
  if (TiempoRegresivoId) {
    clearInterval(TiempoRegresivoId);
    TiempoRegresivoId = null;
  }

  // Mezclar números nuevamente
  numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  numeros = numeros.sort(() => Math.random() - 0.5);

  // Resetear todas las tarjetas
  for (let i = 0; i <= 15; i++) {
    let tarjeta = document.getElementById(i);
    tarjeta.innerHTML = "";
    tarjeta.disabled = false;
    tarjeta.classList.remove("matched");
  }

  // Actualizar estadísticas
  mostrarAciertos.innerHTML = `Aciertos: <span class="stat-value">0</span>`;
  mostrarTiempo.innerHTML = `Tiempo: <span class="stat-value">40</span> segundos`;
  mostrarMovimientos.innerHTML = `Movimientos: <span class="stat-value">0</span>`;

  // Remover clase de tiempo urgente
  mostrarTiempo.parentElement.classList.remove("tiempo-urgente");
}

// Función onEndGame
function onEndGame(gameData) {
  console.log("Datos del juego completado:", gameData);
  // Aquí puedes enviar los datos a tu backend o almacenarlos
}

// Hacer funciones globales
window.cerrarMensajeVictoria = cerrarMensajeVictoria;
window.reiniciarJuego = reiniciarJuego;
