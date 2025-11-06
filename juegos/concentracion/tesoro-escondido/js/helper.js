// --- CONFIGURACIÓN DEL MAPA ---
const WIDTH = 400;
const HEIGHT = 400;

// Genera número aleatorio
const getRandomNumber = (size) => Math.floor(Math.random() * size);

// Coordenadas del tesoro
let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGHT),
};

// Elementos del DOM
let $map = document.querySelector("#map");
let $distance = document.querySelector("#distance");
let clicks = 0;

// --- FUNCIONES DE DISTANCIA ---
const getDistance = (e, target) => {
  let diffX = e.offsetX - target.x;
  let diffY = e.offsetY - target.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
};

const getDistanceHint = (distance) => {
  if (distance < 30) return "🔥 ¡Demasiado caliente!";
  else if (distance < 40) return "🔥 Muy caliente";
  else if (distance < 60) return "☀️ Caliente";
  else if (distance < 100) return "🌤️ Tibio";
  else if (distance < 180) return "❄️ Frío";
  else if (distance < 360) return "🥶 Muy frío";
  else return "🧊 Congelado!";
};

// --- MANEJADOR DE CLICKS ---
$map.addEventListener("click", function (e) {
  clicks++;
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h2>${distanceHint}</h2>`;

  if (distance < 20) {
    alert(`🏝️ ¡Encontraste el tesoro en ${clicks} clicks! 🪙🔑`);

    // ---- FUNCIÓN DE FIN DE JUEGO ----
    const user = JSON.parse(localStorage.getItem("user"));
    const TiempoInicial = 300; // Ejemplo: 5 minutos
    const timer = 120; // Ejemplo: quedan 120s
    const Movimientos = clicks;
    const Aciertos = 1; // Ganó, entonces cuenta como acierto

    onEndGame({
      moves: Movimientos,
      score: Aciertos,
      gameType: "concentracion",
      gameName: "tesoro-escondido",
      seconds: TiempoInicial - timer,
      pacienteId: user ? user.identificacion : null,
    });

    location.reload();
  }
});
