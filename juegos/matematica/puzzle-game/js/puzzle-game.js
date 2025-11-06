class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getTopBox() {
    if (this.y === 0) return null;
    return new Box(this.x, this.y - 1);
  }

  getRightBox() {
    if (this.x === 3) return null;
    return new Box(this.x + 1, this.y);
  }

  getBottomBox() {
    if (this.y === 3) return null;
    return new Box(this.x, this.y + 1);
  }

  getLeftBox() {
    if (this.x === 0) return null;
    return new Box(this.x - 1, this.y);
  }

  getNextdoorBoxes() {
    return [
      this.getTopBox(),
      this.getRightBox(),
      this.getBottomBox(),
      this.getLeftBox(),
    ].filter((box) => box !== null);
  }

  getRandomNextdoorBox() {
    const nextdoorBoxes = this.getNextdoorBoxes();
    return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
  }
}

const swapBoxes = (grid, box1, box2) => {
  const temp = grid[box1.y][box1.x];
  grid[box1.y][box1.x] = grid[box2.y][box2.x];
  grid[box2.y][box2.x] = temp;
};

const isSolved = (grid) => {
  const solvedGrid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] !== solvedGrid[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const getRandomGrid = () => {
  let grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];

  // Shuffle
  let blankBox = new Box(3, 3);
  for (let i = 0; i < 1000; i++) {
    const randomNextdoorBox = blankBox.getRandomNextdoorBox();
    swapBoxes(grid, blankBox, randomNextdoorBox);
    blankBox = randomNextdoorBox;
  }

  if (isSolved(grid)) return getRandomGrid();
  return grid;
};

class State {
  constructor(grid, move, time, status) {
    this.grid = grid;
    this.move = move;
    this.time = time;
    this.status = status;
  }

  static ready() {
    return new State(
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      0,
      0,
      "ready"
    );
  }

  static start() {
    return new State(getRandomGrid(), 0, 0, "playing");
  }
}

class Game {
  constructor(state) {
    this.state = state;
    this.tickId = null;
    this.tick = this.tick.bind(this);
    this.render();

    // Configurar botones de la interfaz
    document.getElementById("control-btn").addEventListener("click", () => {
      if (this.state.status === "ready" || this.state.status === "won") {
        this.startGame();
      } else if (this.state.status === "playing") {
        this.resetGame();
      }
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
      this.resetGame();
    });

    document.getElementById("play-again-btn").addEventListener("click", () => {
      this.playAgain();
    });
  }

  static ready() {
    return new Game(State.ready());
  }

  startGame() {
    clearInterval(this.tickId);
    this.tickId = setInterval(this.tick, 1000);
    this.setState(State.start());
  }

  resetGame() {
    clearInterval(this.tickId);
    this.setState(State.ready());
    document.querySelector(".victoria-overlay").style.display = "none";
  }

  playAgain() {
    document.querySelector(".victoria-overlay").style.display = "none";
    this.startGame();
  }

  tick() {
    this.setState({ time: this.state.time + 1 });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  handleClickBox(box) {
    if (this.state.status !== "playing") return;

    const nextdoorBoxes = box.getNextdoorBoxes();
    const blankBox = nextdoorBoxes.find(
      (nextdoorBox) => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0
    );

    if (blankBox) {
      const newGrid = [...this.state.grid.map((row) => [...row])];
      swapBoxes(newGrid, box, blankBox);

      if (isSolved(newGrid)) {
        clearInterval(this.tickId);
        this.setState({
          status: "won",
          grid: newGrid,
          move: this.state.move + 1,
        });

        // Mostrar mensaje de victoria
        document.getElementById("final-moves").textContent =
          this.state.move + 1;
        document.getElementById("final-time").textContent = this.state.time;
        document.querySelector(".victoria-overlay").style.display = "flex";

        // Enviar datos del juego
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (typeof onEndGame === "function") {
          onEndGame({
            moves: this.state.move + 1,
            score: Math.max(1000 - (this.state.move + 1) * 10, 0),
            gameType: "matematica",
            gameName: "puzzle-game",
            seconds: this.state.time,
            pacienteId: user.identificacion || "unknown",
          });
        }
      } else {
        this.setState({
          grid: newGrid,
          move: this.state.move + 1,
        });
      }
    }
  }

  render() {
    const { grid, move, time, status } = this.state;

    // Render grid
    const gridElement = document.getElementById("puzzle-grid");
    gridElement.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const button = document.createElement("button");

        if (status === "playing") {
          button.addEventListener("click", () =>
            this.handleClickBox(new Box(j, i))
          );
        }

        button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
        if (grid[i][j] === 0) {
          button.classList.add("empty");
        }
        gridElement.appendChild(button);
      }
    }

    // Render button
    const controlBtn = document.getElementById("control-btn");
    if (status === "ready") {
      controlBtn.innerHTML = '<i class="fas fa-play me-2"></i>Iniciar Juego';
      controlBtn.classList.remove("btn-outline-primary");
      controlBtn.classList.add("btn-primary");
    } else if (status === "playing") {
      controlBtn.innerHTML = '<i class="fas fa-redo me-2"></i>Reiniciar';
      controlBtn.classList.remove("btn-primary");
      controlBtn.classList.add("btn-outline-primary");
    } else if (status === "won") {
      controlBtn.innerHTML = '<i class="fas fa-play me-2"></i>Jugar de nuevo';
      controlBtn.classList.remove("btn-outline-primary");
      controlBtn.classList.add("btn-primary");
    }

    // Render move
    document.getElementById("move-count").textContent = move;

    // Render time
    document.getElementById("time-count").textContent = time;

    // Cambiar color cuando el tiempo sea alto
    const timeElement = document.getElementById("time-count");
    const timeCard = timeElement.closest(".stat-card");
    if (time > 60) {
      timeCard.classList.add("tiempo-urgente");
    } else {
      timeCard.classList.remove("tiempo-urgente");
    }
  }
}

// Función onEndGame
function onEndGame(gameData) {
  console.log("Datos del juego completado:", gameData);
  // Aquí puedes enviar los datos a tu backend o almacenarlos
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const game = Game.ready();
});
