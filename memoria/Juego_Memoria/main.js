document.addEventListener('DOMContentLoaded', function() {
    // Variables del juego
    let cardsRevealed = 0;
    let firstCard = null;
    let secondCard = null;
    let firstValue = null;
    let secondValue = null;
    let moves = 0;
    let matches = 0;
    let timerOn = false;
    let timeLeft = 40;
    let countdown = null;
    let gameActive = true;
    
    // Elementos del DOM
    const movesDisplay = document.getElementById('Movimientos');
    const matchesDisplay = document.getElementById('Aciertos');
    const timerDisplay = document.getElementById('Tiempo');
    const memoryGrid = document.querySelector('.memory-grid');
    const restartBtn = document.getElementById('restart-btn');
    
    // Sonidos
    const sounds = {
        click: new Audio('./mp3/click.mp3'),
        correct: new Audio('./mp3/correcto.mp3'),
        wrong: new Audio('./mp3/incorrecto.mp3'),
        lose: new Audio('./mp3/perder.mp3'),
        win: new Audio('./mp3/ganar.mp3')
    };
    
    // Números para el juego (8 pares)
    const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    
    // Inicializar el juego
    function initGame() {
        // Resetear variables
        cardsRevealed = 0;
        firstCard = null;
        secondCard = null;
        firstValue = null;
        secondValue = null;
        moves = 0;
        matches = 0;
        timeLeft = 40;
        timerOn = false;
        gameActive = true;
        
        // Limpiar intervalos previos
        if (countdown) {
            clearInterval(countdown);
        }
        
        // Actualizar displays
        updateDisplays();
        
        // Mezclar números
        const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
        
        // Limpiar el tablero
        memoryGrid.innerHTML = '';
        
        // Crear las tarjetas
        shuffledNumbers.forEach((number, index) => {
            const card = document.createElement('button');
            card.className = 'memory-card';
            card.dataset.value = number;
            card.dataset.index = index;
            
            // Contenedor para el contenido de la tarjeta (frente y reverso)
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">${number}</div>
                </div>
            `;
            
            card.addEventListener('click', () => revealCard(card));
            memoryGrid.appendChild(card);
        });
    }
    
    // Revelar una tarjeta
    function revealCard(card) {
        if (!gameActive || card === firstCard || card.classList.contains('revealed')) return;
        
        // Iniciar temporizador en el primer click
        if (!timerOn) {
            startTimer();
            timerOn = true;
        }
        
        // Mostrar la tarjeta
        card.classList.add('revealed');
        sounds.click.play();
        
        // Registrar la tarjeta clickeada
        if (cardsRevealed === 0) {
            firstCard = card;
            firstValue = card.dataset.value;
            cardsRevealed = 1;
        } else {
            secondCard = card;
            secondValue = card.dataset.value;
            cardsRevealed = 2;
            moves++;
            updateDisplays();
            checkMatch();
        }
    }
    
    // Verificar si hay coincidencia
    function checkMatch() {
        if (firstValue === secondValue) {
            // Coincidencia
            sounds.correct.play();
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matches++;
            updateDisplays();
            
            // Verificar si ganó
            if (matches === 8) {
                gameWon();
            }
            
            resetTurn();
        } else {
            // No coincidencia
            sounds.wrong.play();
            setTimeout(() => {
                firstCard.classList.remove('revealed');
                secondCard.classList.remove('revealed');
                resetTurn();
            }, 700);
        }
    }
    
    // Resetear turno
    function resetTurn() {
        cardsRevealed = 0;
        firstCard = null;
        secondCard = null;
        firstValue = null;
        secondValue = null;
    }
    
    // Iniciar temporizador
    function startTimer() {
        countdown = setInterval(() => {
            timeLeft--;
            updateDisplays();
            
            if (timeLeft <= 0) {
                gameOver();
            }
        }, 1000);
    }
    
    // Actualizar displays
    function updateDisplays() {
        movesDisplay.querySelector('.stat-value').textContent = moves;
        matchesDisplay.querySelector('.stat-value').textContent = matches;
        timerDisplay.querySelector('.stat-value').textContent = timeLeft;
    }
    
    // Juego ganado
    function gameWon() {
        gameActive = false;
        clearInterval(countdown);
        sounds.win.play();
        
        // Mostrar mensaje de victoria
        matchesDisplay.innerHTML = `Aciertos: <span class="stat-value">${matches} 🤗</span>`;
        timerDisplay.innerHTML = `Tiempo: <span class="stat-value">${40 - timeLeft}</span> segundos 😋`;
        movesDisplay.innerHTML = `Movimientos: <span class="stat-value">${moves}</span> 😎`;
    }
    
    // Juego perdido
    function gameOver() {
        gameActive = false;
        clearInterval(countdown);
        sounds.lose.play();
        
        // Mostrar todas las tarjetas
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.classList.add('revealed');
        });
    }
    
    // Evento para reiniciar el juego
    restartBtn.addEventListener('click', initGame);
    
    // Iniciar el juego al cargar la página
    initGame();
});