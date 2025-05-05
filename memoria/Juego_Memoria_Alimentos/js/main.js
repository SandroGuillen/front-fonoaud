// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let SegundoResultado = null;
let Movimientos = 0;
let Aciertos = 0;
let Tiempo = false;
let timer = 60;
let TiempoInicial = timer;
let TiempoRegrecivoId = null;

// Sonidos
let clickAudio = new Audio('./mp3/click.mp3');
let correctoAudio = new Audio('./mp3/correcto.mp3');
let perderAudio = new Audio('./mp3/perder.mp3');
let ganarAudio = new Audio('./mp3/ganar.mp3');
let incorrectoAudio = new Audio('./mp3/incorrecto.mp3');

// Elementos del DOM
let mostrarMovimientos = document.getElementById('Movimientos');
let mostrarAciertos = document.getElementById('Aciertos');
let mostrarTiempo = document.getElementById('Tiempo');
let memoryGrid = document.querySelector('.memory-grid');

// Generación de números Aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => Math.random() - 0.5);

// Crear las tarjetas al cargar la página
function crearTarjetas() {
    memoryGrid.innerHTML = '';
    numeros.forEach((num, index) => {
        const tarjeta = document.createElement('button');
        tarjeta.id = index;
        tarjeta.className = 'memory-card';
        tarjeta.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="./img/${num}.png" alt="Alimento ${num}">
                </div>
            </div>
        `;
        tarjeta.addEventListener('click', () => destapar(index));
        memoryGrid.appendChild(tarjeta);
    });
}

// Funciones
function contarTiempo() {
    TiempoRegrecivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo:${timer} segundos`;
        if (timer == 0) {
            clearInterval(TiempoRegrecivoId);
            bloquearTjetas();
            perderAudio.play();
        }
    }, 1000);
}

function bloquearTjetas() {
    document.querySelectorAll('.memory-card').forEach(tarjeta => {
        tarjeta.classList.add('revealed');
        tarjeta.disabled = true;
    });
}

// Función principal
function destapar(id) {
    if (Tiempo == false) {
        contarTiempo();
        Tiempo = true;
    }

    const tarjetaActual = document.getElementById(id);
    
    // Si la tarjeta ya está destapada o emparejada, no hacer nada
    if (tarjetaActual.classList.contains('revealed') || tarjetaActual.classList.contains('matched')) {
        return;
    }

    tarjetasDestapadas++;
    tarjetaActual.classList.add('revealed');
    clickAudio.play();

    if (tarjetasDestapadas == 1) {
        tarjeta1 = tarjetaActual;
        primerResultado = numeros[id];
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = tarjetaActual;
        SegundoResultado = numeros[id];
        Movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos:${Movimientos}`;

        if (primerResultado == SegundoResultado) {
            tarjetasDestapadas = 0;
            correctoAudio.play();
            Aciertos++;
            mostrarAciertos.innerHTML = `Aciertos:${Aciertos}`;
            
            // Marcar como emparejadas
            tarjeta1.classList.add('matched');
            tarjeta2.classList.add('matched');

            if (Aciertos == 8) {
                ganarAudio.play();
                clearInterval(TiempoRegrecivoId);
                mostrarAciertos.innerHTML = `Aciertos:${Aciertos}🤗`;
                mostrarTiempo.innerHTML = `Demoraste ${TiempoInicial - timer} segundos 😋`;
                mostrarMovimientos.innerHTML = `Movimientos:${Movimientos}😎`;
            }
        } else {
            incorrectoAudio.play();
            setTimeout(() => {
                tarjeta1.classList.remove('revealed');
                tarjeta2.classList.remove('revealed');
                tarjetasDestapadas = 0;
            }, 700);
        }
    }
}

// Iniciar el juego al cargar
crearTarjetas();