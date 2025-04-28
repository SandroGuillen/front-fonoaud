const quizData = [
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Entiendes lo que dice tu niño/a?",
        a: "SI",
        b: "NO",
        correct: "b",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a permanece con la boca abierta o con la lengua a fuera de la boca frecuentemente?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a tiene dificultades para comprender lo que lee?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a respira con la boca abierta, babea o ronca?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a omite o agrega sonidos a las palabras cuando habla?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a mastica con la boca abierta o necesita tomar liquido para tragar el alimento?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a no habla o habla muy poco despues de los 2 años?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a se pasa los alimentos enteros por ende no los mastica?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a tiene dificultad para leer o escribir correctamente?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a utiliza chupo u otro objeto que se lleve a la boca por tiempos prolongados?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a tiene dificultades para pronunciar o producir algunos sonidos?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a presenta dificultad al comer alimentos solidos, blandos o liquidos?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a manifiesta mala audicion ya sea muy poco o mucho volumen?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su medigo diasnostico disfagia a su niño/a?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a no demuestra intencion de comunicarse con las demas personas?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a tiene dificultades en la succión del chupo o dle seno?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a tartamudea frecuentemente?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "😄😛TERAPIA MIOFUNCIONAL😄😛",
        question2:"Su niño/a derrama alimentos o liquidos por el borde de la boca?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
    {
        question: "👄TERAPIA DE LENGUAJE👄",
        question2:"Su niño/a se encuentra disfonico o con alteracion de la voz frecuentemente?",
        a: "SI",
        b: "NO",
        correct: "a",
    },
];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const questionE2 = document.getElementById('question2')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
loadQuiz()

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    questionE2.innerText = currentQuizData.question2
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b

}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } 
       else {
           quiz.innerHTML = `
           <h2>Respondiste ${score}/${quizData.length}preguntas positivas</h2>
           <button onclick="location.redireccionar()">continuar</button>
           `
           // Función que realiza el redireccionamiento
    function redireccionar() {
        window.location.href = "./Login";
      }
  
      // Llamada a la función para redireccionar después de 5 segundos (5000 milisegundos)
      setTimeout(redireccionar, 50);
       }
    }
})