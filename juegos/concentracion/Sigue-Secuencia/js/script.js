const round = document.getElementById("round");
const simonButtons = document.getElementsByClassName("square");
const startButton = document.getElementById("startButton");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");

class Simon {
  constructor(simonButtons, startButton, round) {
    this.round = 0;
    this.userPosition = 0;
    this.totalRounds = 10;
    this.sequence = [];
    this.speed = 1000;
    this.blockedButtons = true;
    this.buttons = Array.from(simonButtons);
    this.display = {
      startButton,
      round,
    };
    this.errorSound = new Audio("./sounds/error.wav");
    this.buttonSounds = [
      new Audio("./sounds/1.mp3"),
      new Audio("./sounds/2.mp3"),
      new Audio("./sounds/3.mp3"),
      new Audio("./sounds/4.mp3"),
    ];
  }

  // Inicia el Simon
  init() {
    this.display.startButton.onclick = () => this.startGame();
  }

  // Comienza el juego
  startGame() {
    this.display.startButton.disabled = true;
    endScreen.style.display = "none"; // ocultamos pantalla final
    this.updateRound(0);
    this.userPosition = 0;
    this.sequence = this.createSequence();
    this.buttons.forEach((element, i) => {
      element.classList.remove("winner");
      element.onclick = () => this.buttonClick(i);
    });
    this.showSequence();
  }

  // Actualiza la ronda y el tablero
  updateRound(value) {
    this.round = value;
    this.display.round.textContent = `Ronda ${this.round}`;
  }

  // Crea el array aleatorio de botones
  createSequence() {
    return Array.from({ length: this.totalRounds }, () =>
      this.getRandomColor()
    );
  }

  getRandomColor() {
    return Math.floor(Math.random() * 4);
  }

  buttonClick(value) {
    !this.blockedButtons && this.validateChosenColor(value);
  }

  validateChosenColor(value) {
    if (this.sequence[this.userPosition] === value) {
      this.buttonSounds[value].play();
      if (this.round === this.userPosition) {
        this.updateRound(this.round + 1);
        this.speed /= 1.02;
        this.isGameOver();
      } else {
        this.userPosition++;
      }
    } else {
      this.gameLost();
    }
  }

  isGameOver() {
    if (this.round === this.totalRounds) {
      this.gameWon();
    } else {
      this.userPosition = 0;
      this.showSequence();
    }
  }

  showSequence() {
    this.blockedButtons = true;
    let sequenceIndex = 0;
    let timer = setInterval(() => {
      const button = this.buttons[this.sequence[sequenceIndex]];
      this.buttonSounds[this.sequence[sequenceIndex]].play();
      this.toggleButtonStyle(button);
      setTimeout(() => this.toggleButtonStyle(button), this.speed / 2);
      sequenceIndex++;
      if (sequenceIndex > this.round) {
        this.blockedButtons = false;
        clearInterval(timer);
      }
    }, this.speed);
  }

  toggleButtonStyle(button) {
    button.classList.toggle("active");
  }

  // Cuando pierde
  gameLost() {
    this.errorSound.play();
    this.display.startButton.disabled = false;
    this.blockedButtons = true;

    endMessage.textContent = `¡Perdiste en la ronda ${this.round}! 😢`;
    endScreen.style.display = "block";

    // Disparar función onEndGame
    this.sendEndGame(false);
  }

  // Cuando gana
  gameWon() {
    this.display.startButton.disabled = false;
    this.blockedButtons = true;
    this.buttons.forEach((element) => {
      element.classList.add("winner");
    });
    this.updateRound("Ganaste🏆");

    endMessage.textContent = "¡Ganaste el juego completo! 🎉";
    endScreen.style.display = "block";

    // Disparar función onEndGame
    this.sendEndGame(true);
  }

  // Enviar datos al backend
  sendEndGame(win) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      onEndGame({
        moves: this.round, // rondas jugadas
        score: win ? this.totalRounds : this.round,
        gameType: "concentracion",
        gameName: "Sigue-Secuencia",
        seconds: 0, // puedes agregar un timer si lo usas
        pacienteId: user?.identificacion || null,
      });
    } catch (err) {
      console.error("Error enviando resultados:", err);
    }
  }
}

const simon = new Simon(simonButtons, startButton, round);
simon.init();

function restartGame() {
  endScreen.style.display = "none";
  simon.startGame();
}
