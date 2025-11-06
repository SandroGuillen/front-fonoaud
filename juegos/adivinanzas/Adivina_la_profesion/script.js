//Arreglo que contiene las palabras para jugar
let arrayPalabras = [
  "BOMBERO",
  "POLICIA",
  "CARTERO",
  "CARACOL",
  "CARPINTERO",
  "COCINERO",
  "PANADERO",
  "AGRICULTOR",
  "ZAPATERO",
  "MAESTRO",
];
//Arreglo que contiene las ayudas de cada palabra
let ayudas = [
  "Con una manguera, casco y escalera, apago el fuego de la hoguera.",
  "Es el héroe de la comunidad y la cuida noche y día para conservar la seguridad.",
  "Caminar es su destino y, yendo de casa en casa, de su valija de cuero saca paquetes y cartas.",
  "Con madera de pino, haya o de nogal construyo los muebles para tu hogar.",
  "Pico de cuerno, ala de ave, la rodilla para atrás, y anda adelante.",
  "Preparo ricos manjares, mi lugar es la cocina de restaurantes y hoteles.",
  "Amasa la harina con todo esmero, siempre puesto gorro y delantal, horneando los panes de dulce y deliciosa sal",
  "Preparo el terreno y la semilla siembro; siempre esperando que el sol y la lluvia lleguen a tiempo.",
  "Tengo los zapatos rotos por la suela y el tacón, ¿quién me los arreglará con la aguja y el punzón?",
  "Un valiente ser que tiene la vocación de enseñar a la niñez.",
];
//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual;

let arrayPalabraActual = [];

//Cantidad de de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

// Variables para el tracking del juego
let Movimientos = 0;
let Aciertos = 0;
let TiempoInicial = 0;
let timer = 0;
let startTime = Date.now();
let juegoTerminado = false;

//Funcion que carga la  palabra nueva para jugar
function cargarNuevaPalabra() {
  //Aumento en uno cantidad e palabras jugadas y controlo si llego a su limite
  cantPalabrasJugadas++;
  if (cantPalabrasJugadas > 6) {
    //volvemos a cargar el arreglo
    arrayPalabras = [
      "BOMBERO",
      "POLICIA",
      "CARTERO",
      "CARACOL",
      "CARPINTERO",
      "COCINERO",
      "PANADERO",
      "AGRICULTOR",
      "ZAPATERO",
      "MAESTRO",
    ];
    ayudas = [
      "Con una manguera, casco y escalera, apago el fuego de la hoguera.",
      "Es el héroe de la comunidad y la cuida noche y día para conservar la seguridad.",
      "Caminar es su destino y, yendo de casa en casa, de su valija de cuero saca paquetes y cartas.",
      "Con madera de pino, haya o de nogal construyo los muebles para tu hogar.",
      "Pico de cuerno, ala de ave, la rodilla para atrás, y anda adelante.",
      "Preparo ricos manjares, mi lugar es la cocina de restaurantes y hoteles.",
      "Amasa la harina con todo esmero, siempre puesto gorro y delantal, horneando los panes de dulce y deliciosa sal",
      "Preparo el terreno y la semilla siembro; siempre esperando que el sol y la lluvia lleguen a tiempo.",
      "Tengo los zapatos rotos por la suela y el tacón, ¿quién me los arreglará con la aguja y el punzón?",
      "Un valiente ser que tiene la vocación de enseñar a la niñez.",
    ];
  }

  //Selecciono una posicion random
  posActual = Math.floor(Math.random() * arrayPalabras.length);

  //Tomamos la palabra nueva
  let palabra = arrayPalabras[posActual];
  totalQueDebeAcertar = palabra.length;
  cantidadAcertadas = 0;

  //Guardamos la palabra que esta en formato string en un arreglo
  arrayPalabraActual = palabra.split("");

  //limpiamos los contenedores que quedaron cargadas con la palabra anterior
  document.getElementById("palabra").innerHTML = "";
  document.getElementById("letrasIngresadas").innerHTML = "";

  //Cargamos la cantidad de divs (letras) que tiene la palabra
  for (i = 0; i < palabra.length; i++) {
    var divLetra = document.createElement("div");
    divLetra.className = "letra";
    document.getElementById("palabra").appendChild(divLetra);
  }

  //Selecciono todos los divs de la palabra
  divsPalabraActual = document.getElementsByClassName("letra");

  //setemos los intentos
  intentosRestantes = 5;
  document.getElementById("intentos").innerHTML = intentosRestantes;

  //Cargamos la ayuda de la pregunta
  document.getElementById("ayuda").innerHTML = ayudas[posActual];

  //elimino el elemento ya seleccionado del arreglo.
  //splice(posActual,1): A partir de la posicon posActual elimino 1 elemento
  arrayPalabras.splice(posActual, 1);
  ayudas.splice(posActual, 1);
}

// Función para finalizar el juego
function finalizarJuego() {
  if (juegoTerminado) return;
  juegoTerminado = true;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Calcular el tiempo transcurrido
  timer = Math.floor((Date.now() - startTime) / 1000);

  if (typeof onEndGame === "function") {
    const data = {
      moves: Movimientos,
      score: Aciertos,
      gameType: "adivinanzas",
      gameName: "Adivina_la_profesion",
      seconds: timer,
      pacienteId: user.identificacion || "unknown",
    };
    console.log("juego terminado", data);
    onEndGame(data);
  }
}

//Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

//Detecto la tecla que el usuario presion
document.addEventListener("keydown", (event) => {
  if (juegoTerminado) return;

  //Controlo si la tecla presionada es una letra
  if (isLetter(event.key)) {
    // Incrementar movimientos
    Movimientos++;

    //Tomo las letras ya ingresadas hasta el momento
    let letrasIngresadas =
      document.getElementById("letrasIngresadas").innerHTML;
    letrasIngresadas = letrasIngresadas.split("");
    //controlo si la letra presionada ya ha sido ingresada

    if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
      //variable bandera para saber si la letra ingresada esta en la palabra a descrubir
      let acerto = false;

      //Recorro el arreglo que ocntiene la palabra para verificar si la palabra ingresada esta
      for (i = 0; i < arrayPalabraActual.length; i++) {
        if (arrayPalabraActual[i] == event.key.toUpperCase()) {
          //acertó
          divsPalabraActual[i].innerHTML = event.key.toUpperCase();
          acerto = true;
          //Aumento en uno la cantidad de letras acertadas
          cantidadAcertadas = cantidadAcertadas + 1;
          // Incrementar aciertos
          Aciertos++;
        }
      }

      //Controlo si acerto al menos una letra
      if (acerto == true) {
        //controlamos si ya acerto todas
        if (totalQueDebeAcertar == cantidadAcertadas) {
          //asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
          for (i = 0; i < arrayPalabraActual.length; i++) {
            divsPalabraActual[i].className = "letra pintar";
          }

          // Si se completó la palabra, cargar nueva palabra después de un breve delay
          setTimeout(() => {
            if (arrayPalabras.length > 0) {
              cargarNuevaPalabra();
            } else {
              // Si no hay más palabras, finalizar juego
              finalizarJuego();
            }
          }, 1500);
        }
      } else {
        //No acerto, decremento los intentos restantes
        intentosRestantes = intentosRestantes - 1;
        document.getElementById("intentos").innerHTML = intentosRestantes;

        //controlamos si ya acabo todas la oportunidades
        if (intentosRestantes <= 0) {
          for (i = 0; i < arrayPalabraActual.length; i++) {
            divsPalabraActual[i].className = "letra pintarError";
          }

          // Finalizar juego cuando se acaban los intentos
          setTimeout(() => {
            finalizarJuego();
          }, 1500);
        }
      }

      //agrega la letra ingresada a las letras ya ingresadas que se visualizan
      document.getElementById("letrasIngresadas").innerHTML +=
        event.key.toLocaleUpperCase() + " - ";
    }
  }
});

//Funcion que me determina si un caracter es una letra
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

// Función para manejar el cierre de la página/ventana
window.addEventListener("beforeunload", function () {
  finalizarJuego();
});

// Función para manejar cuando la página pierde el foco (opcional)
window.addEventListener("visibilitychange", function () {
  if (document.hidden && !juegoTerminado) {
    finalizarJuego();
  }
});
