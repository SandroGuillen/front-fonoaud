// Variables globales
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let respuesta_usuario = document.getElementById("respuesta_usuario");
let msj_correccion = document.getElementById("msj_correccion");
let operacion = document.getElementById("operacion");
let operacion_actual;
let n1, n2;
let correctCount = 0;
let incorrectCount = 0;

// Inicialización del juego
document.addEventListener('DOMContentLoaded', function() {
    // Establecer suma como operación por defecto
    btnSumar();
    
    // Configurar evento para tecla Enter
    respuesta_usuario.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            corregir();
        }
    });
});

// Función para actualizar las estadísticas
function updateStats() {
    document.getElementById("correct-count").textContent = correctCount;
    document.getElementById("incorrect-count").textContent = incorrectCount;
}

// Función para activar botones
function activarBoton(idBoton) {
    document.querySelectorAll('.operation-btn').forEach(btn => {
        btn.classList.remove('activado');
    });
    document.getElementById(idBoton).classList.add('activado');
}

// Operación: Suma
function btnSumar() {
    msj_correccion.innerHTML = "";
    activarBoton("suma");
    operacion_actual = "+";
    operacion.textContent = "+";
    nuevaSuma();
}

function nuevaSuma() {
    n1 = Math.floor(Math.random() * 9) + 1;
    n2 = Math.floor(Math.random() * 9) + 1;
    num1.textContent = n1;
    num2.textContent = n2;
    respuesta_usuario.focus();
}

// Operación: Resta
function btnResta() {
    msj_correccion.innerHTML = "";
    activarBoton("resta");
    operacion_actual = "-";
    operacion.textContent = "-";
    nuevaResta();
}

function nuevaResta() {
    n1 = Math.floor(Math.random() * 5) + 5;
    n2 = Math.floor(Math.random() * 5);
    num1.textContent = n1;
    num2.textContent = n2;
    respuesta_usuario.focus();
}

// Operación: Multiplicación
function btnProducto() {
    msj_correccion.innerHTML = "";
    activarBoton("producto");
    operacion_actual = "*";
    operacion.textContent = "×";
    nuevoProducto();
}

function nuevoProducto() {
    n1 = Math.floor(Math.random() * 9) + 1;
    n2 = Math.floor(Math.random() * 9) + 1;
    num1.textContent = n1;
    num2.textContent = n2;
    respuesta_usuario.focus();
}

// Operación: División
function btnDivision() {
    msj_correccion.innerHTML = "";
    activarBoton("division");
    operacion_actual = "/";
    operacion.textContent = "÷";
    nuevaDivision();
}

function nuevaDivision() {
    let divisores = [];
    n1 = Math.floor(Math.random() * 9) + 1;
    
    // Encontrar divisores
    for (let i = 1; i <= n1; i++) {
        if (n1 % i === 0) {
            divisores.push(i);
        }
    }
    
    let pos = Math.floor(Math.random() * divisores.length);
    n2 = divisores[pos];
    num1.textContent = n1;
    num2.textContent = n2;
    respuesta_usuario.focus();
}

// Función para corregir la respuesta
function corregir() {
    if (!respuesta_usuario.value) return;
    
    let solucion;
    let operacionStr = n1 + operacion_actual + n2;
    solucion = eval(operacionStr);
    
    let i = document.createElement("i");
    let isCorrect = parseInt(respuesta_usuario.value) === solucion;
    
    if (isCorrect) {
        i.className = "fas fa-check-circle";
        i.style.color = "var(--correct-color)";
        correctCount++;
    } else {
        i.className = "fas fa-times-circle";
        i.style.color = "var(--incorrect-color)";
        incorrectCount++;
    }
    
    msj_correccion.innerHTML = "";
    msj_correccion.appendChild(i);
    updateStats();
    
    // Generar nueva operación según el tipo actual
    switch(operacion_actual) {
        case "+": nuevaSuma(); break;
        case "-": nuevaResta(); break;
        case "*": nuevoProducto(); break;
        case "/": nuevaDivision(); break;
    }
    
    respuesta_usuario.value = "";
}