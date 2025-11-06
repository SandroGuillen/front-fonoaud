let clickAudio = new Audio("./mp3/click.mp3");
let correctoAudio = new Audio("./mp3/correct.mp3");
let perderAudio = new Audio("./mp3/perder.mp3");
let ganarAudio = new Audio("./mp3/ganar.mp3");
let incorrectoAudio = new Audio("./mp3/incorrecto.mp3");

// arreglo de banderas en orden
let banderas = [
  "francia.png",
  "espana.png",
  "brasil.png",
  "colombia.png",
  "puerto-rico.png",
  "mexico.png",
  "argentina.png",
  "ecuador.png",
  "japon.png",
  "singapur.png",
];

// índice de la opción correcta para cada bandera
let correcta = [2, 2, 1, 1, 0, 1, 2, 0, 1, 0];

// opciones de países
let opciones = [];
opciones.push(["SUDAFRICA", "SINGAPUR", "FRANCIA"]);
opciones.push(["PERU", "ITALIA", "ESPAÑA"]);
opciones.push(["MEXICO", "BRASIL", "PERU"]);
opciones.push(["VENEZUELA", "COLOMBIA", "ARMENIA"]);
opciones.push(["PUERTO RICO", "FRANCIA", "ETIOPIA"]);
opciones.push(["BELGICA", "MEXICO", "CHINA"]);
opciones.push(["ITALIA", "SUDAFRICA", "ARGENTINA"]);
opciones.push(["ECUADOR", "ARMENIA", "COLOMBIA"]);
opciones.push(["COREA", "JAPON", "CHINA"]);
opciones.push(["SINGAPUR", "IRAN", "SUECIA"]);

let posActual = 0; // bandera actual
let cantidadAcertadas = 0; // aciertos

function comenzarJuego() {
  posActual = 0;
  cantidadAcertadas = 0;
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  cargarBandera();
}

function cargarBandera() {
  if (banderas.length <= posActual) {
    terminarJuego();
  } else {
    limpiarOpciones();
    document.getElementById("imgBandera").src = "img/" + banderas[posActual];
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
  if (opElegida == correcta[posActual]) {
    correctoAudio.play();
    document.getElementById("n" + opElegida).className =
      "nombre nombreAcertada";
    document.getElementById("l" + opElegida).className = "letra letraAcertada";
    cantidadAcertadas++;
  } else {
    document.getElementById("n" + opElegida).className =
      "nombre nombreNoAcertada";
    document.getElementById("l" + opElegida).className =
      "letra letraNoAcertada";
    perderAudio.play();
    document.getElementById("n" + correcta[posActual]).className =
      "nombre nombreAcertada";
    document.getElementById("l" + correcta[posActual]).className =
      "letra letraAcertada";
  }
  posActual++;
  setTimeout(cargarBandera, 1000);
}

function terminarJuego() {
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";

  document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
  document.getElementById("numIncorrectas").innerHTML =
    banderas.length - cantidadAcertadas;

  // 🔥 función onEndGame
  const user = JSON.parse(localStorage.getItem("user"));
  onEndGame({
    moves: banderas.length, // total jugadas
    score: cantidadAcertadas, // aciertos
    gameType: "educativas", // tipo de juego
    gameName: "quiz-banderas", // nombre
    seconds: 0, // si no hay cronómetro
    pacienteId: user?.identificacion || null, // id paciente
  });
}

function volverAlInicio() {
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
  document.getElementById("pantalla-juego").style.display = "none";
}
