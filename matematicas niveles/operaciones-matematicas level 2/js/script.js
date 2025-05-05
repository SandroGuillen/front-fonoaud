// Variables globales
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let respuesta_usuario = document.getElementById("respuesta_usuario");
let msj_correccion = document.getElementById("msj_correccion");
let operacion = document.getElementById("operacion");
let correctCountElement = document.getElementById("correct-count");
let incorrectCountElement = document.getElementById("incorrect-count");

let operacion_actual;
let n1, n2;
let correctCount = 0;
let incorrectCount = 0;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Configurar evento para tecla Enter
    respuesta_usuario.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            corregir();
        }
    });
    
    // Iniciar con suma por defecto
    btnSumar();
});

// Funciones de operaciones
function btnSumar() {
    limpiarMensaje();
    activarBoton("suma");
    operacion_actual = "+";
    operacion.textContent = "+";
    nuevaSuma();
}

function nuevaSuma() {
    n1 = Math.floor(Math.random() * 99) + 1;
    n2 = Math.floor(Math.random() * 9) + 1;
    actualizarNumeros();
}

function btnResta() {
    limpiarMensaje();
    activarBoton("resta");
    operacion_actual = "-";
    operacion.textContent = "-";
    nuevaResta();
}

function nuevaResta() {
    n1 = Math.floor(Math.random() * 50) + 10;
    n2 = Math.floor(Math.random() * 9) + 1;
    actualizarNumeros();
}

function btnProducto() {
    limpiarMensaje();
    activarBoton("producto");
    operacion_actual = "*";
    operacion.textContent = "×";
    nuevoProducto();
}

function nuevoProducto() {
    n1 = Math.floor(Math.random() * 99) + 1;
    n2 = Math.floor(Math.random() * 9) + 1;
    actualizarNumeros();
}

function btnDivision() {
    limpiarMensaje();
    activarBoton("division");
    operacion_actual = "/";
    operacion.textContent = "÷";
    nuevaDivision();
}

function nuevaDivision() {
    let divisores = [];
    n1 = Math.floor(Math.random() * 99) + 1;
    
    // Encontrar divisores
    for (let i = 1; i <= n1; i++) {
        if (n1 % i === 0) {
            divisores.push(i);
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
    document.querySelectorAll('.operation-btn').forEach(btn => {
        btn.classList.remove('activado');
    });
    document.getElementById(idBoton).classList.add('activado');
}

function actualizarEstadisticas() {
    correctCountElement.textContent = correctCount;
    incorrectCountElement.textContent = incorrectCount;
}

// Función principal de corrección
function corregir() {
    if (!respuesta_usuario.value) return;
    
    let solucion;
    let operacionStr = n1 + operacion_actual + n2;
    solucion = eval(operacionStr);
    
    let isCorrect = parseInt(respuesta_usuario.value) === solucion;
    let icono = document.createElement("i");
    icono.className = isCorrect ? "fas fa-check-circle" : "fas fa-times-circle";
    
    if (isCorrect) {
        correctCount++;
    } else {
        incorrectCount++;
    }
    
    limpiarMensaje();
    msj_correccion.appendChild(icono);
    actualizarEstadisticas();
    
    // Generar nueva operación según el tipo actual
    switch(operacion_actual) {
        case "+": nuevaSuma(); break;
        case "-": nuevaResta(); break;
        case "*": nuevoProducto(); break;
        case "/": nuevaDivision(); break;
    }
}