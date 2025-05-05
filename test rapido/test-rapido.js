const quizData = [
    {
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Entiendes lo que dice tu niño/a?",
    a: "Sí, lo entiendo perfectamente",
    b: "No, con frecuencia no entiendo lo que dice",
    correct: "b",
    analysis: {
        a: "Es positivo que comprendas el lenguaje de tu hijo/a, pero considera que otros factores también son importantes.",
        b: "La dificultad para entender al niño puede indicar problemas de articulación, vocabulario limitado o trastornos del lenguaje."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a permanece con la boca abierta o con la lengua fuera frecuentemente?",
    a: "Sí, casi todo el tiempo",
    b: "No, mantiene la boca cerrada normalmente",
    correct: "a",
    analysis: {
        a: "La posición habitual de boca abierta o lengua protruida puede indicar hipotonía muscular o hábitos miofuncionales incorrectos.",
        b: "Mantener la boca cerrada en reposo es lo esperado para un desarrollo orofacial adecuado."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a tiene dificultades para comprender lo que lee?",
    a: "Sí, frecuentemente no entiende lo que lee",
    b: "No, comprende adecuadamente según su edad",
    correct: "a",
    analysis: {
        a: "Las dificultades de comprensión lectora pueden relacionarse con trastornos del lenguaje o problemas de procesamiento.",
        b: "Una buena comprensión lectora es indicador de adecuado desarrollo del lenguaje."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a respira con la boca abierta, babea o ronca?",
    a: "Sí, presenta uno o varios de estos síntomas",
    b: "No, no he observado estos comportamientos",
    correct: "a",
    analysis: {
        a: "La respiración bucal y los ronquidos pueden indicar obstrucción de vías aéreas o alteraciones miofuncionales.",
        b: "La respiración nasal es lo esperado para un desarrollo orofacial saludable."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a omite o agrega sonidos a las palabras cuando habla?",
    a: "Sí, con frecuencia",
    b: "No, pronuncia las palabras correctamente",
    correct: "a",
    analysis: {
        a: "Las omisiones o adiciones de sonidos pueden indicar trastornos fonológicos o articulatorios.",
        b: "Una articulación adecuada es señal de buen desarrollo del lenguaje."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a mastica con la boca abierta o necesita tomar líquido para tragar el alimento?",
    a: "Sí, presenta estos comportamientos",
    b: "No, mastica y traga adecuadamente",
    correct: "a",
    analysis: {
        a: "Estos patrones pueden indicar alteraciones en la masticación o deglución que requieren evaluación.",
        b: "Una masticación y deglución adecuadas son esenciales para el desarrollo orofacial."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a no habla o habla muy poco después de los 2 años?",
    a: "Sí, su lenguaje es muy limitado para su edad",
    b: "No, su desarrollo del lenguaje parece normal",
    correct: "a",
    analysis: {
        a: "Un retraso significativo en la aparición del lenguaje requiere evaluación profesional.",
        b: "El desarrollo del lenguaje dentro de los parámetros esperados es positivo."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a se pasa los alimentos enteros por ende no los mastica?",
    a: "Sí, con frecuencia",
    b: "No, mastica adecuadamente los alimentos",
    correct: "a",
    analysis: {
        a: "Tragar alimentos enteros puede indicar problemas de masticación o sensoriales que requieren atención.",
        b: "Una masticación adecuada es importante para la digestión y desarrollo facial."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a tiene dificultad para leer o escribir correctamente?",
    a: "Sí, presenta dificultades significativas",
    b: "No, sus habilidades son adecuadas para su edad",
    correct: "a",
    analysis: {
        a: "Las dificultades en lectoescritura pueden relacionarse con trastornos específicos del aprendizaje.",
        b: "Un desarrollo adecuado de la lectoescritura es fundamental para el éxito académico."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a utiliza chupo u otro objeto que se lleve a la boca por tiempos prolongados?",
    a: "Sí, durante mucho tiempo al día",
    b: "No, o solo ocasionalmente",
    correct: "a",
    analysis: {
        a: "El uso prolongado de chupo o succión digital puede afectar el desarrollo del paladar y la posición dental.",
        b: "Limitar estos hábitos favorece un desarrollo orofacial adecuado."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a tiene dificultades para pronunciar o producir algunos sonidos?",
    a: "Sí, varios sonidos no los pronuncia bien",
    b: "No, su pronunciación es clara",
    correct: "a",
    analysis: {
        a: "Las dificultades articulatorias pueden afectar la inteligibilidad del habla y requieren intervención.",
        b: "Una articulación clara es importante para la comunicación efectiva."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a presenta dificultad al comer alimentos sólidos, blandos o líquidos?",
    a: "Sí, con uno o varios tipos de texturas",
    b: "No, come todo tipo de alimentos sin problemas",
    correct: "a",
    analysis: {
        a: "Las dificultades con ciertas texturas pueden indicar problemas sensoriales o motores orales.",
        b: "Aceptar variedad de texturas es importante para una nutrición adecuada."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a manifiesta mala audición ya sea muy poco o mucho volumen?",
    a: "Sí, frecuentemente",
    b: "No, su audición parece normal",
    correct: "a",
    analysis: {
        a: "Los problemas auditivos pueden afectar significativamente el desarrollo del lenguaje y requieren evaluación.",
        b: "Una audición adecuada es fundamental para el desarrollo del lenguaje."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su médico diagnosticó disfagia a su niño/a?",
    a: "Sí, tiene diagnóstico de disfagia",
    b: "No, no tiene este diagnóstico",
    correct: "a",
    analysis: {
        a: "La disfagia (dificultad para tragar) requiere intervención profesional para prevenir complicaciones.",
        b: "La ausencia de disfagia es positiva para el desarrollo alimentario."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a no demuestra intención de comunicarse con las demás personas?",
    a: "Sí, su comunicación es muy limitada",
    b: "No, busca comunicarse activamente",
    correct: "a",
    analysis: {
        a: "La falta de intención comunicativa puede indicar trastornos del desarrollo que requieren evaluación.",
        b: "La iniciativa para comunicarse es un buen indicador del desarrollo social y lingüístico."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a tiene dificultades en la succión del chupo o del seno?",
    a: "Sí, presentó dificultades",
    b: "No, succionaba adecuadamente",
    correct: "a",
    analysis: {
        a: "Los problemas de succión pueden ser tempranos indicadores de alteraciones miofuncionales.",
        b: "Una succión adecuada en etapas tempranas favorece el desarrollo orofacial."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a tartamudea frecuentemente?",
    a: "Sí, con regularidad",
    b: "No, su habla es fluida",
    correct: "a",
    analysis: {
        a: "La tartamudez puede afectar la comunicación y autoestima, requiriendo intervención temprana.",
        b: "Un habla fluida es indicador de buen desarrollo del lenguaje."
    }
},
{
    category: "😄 TERAPIA MIOFUNCIONAL",
    question: "¿Su niño/a derrama alimentos o líquidos por el borde de la boca?",
    a: "Sí, frecuentemente",
    b: "No, mantiene los alimentos/líquidos en la boca",
    correct: "a",
    analysis: {
        a: "El derrame constante puede indicar debilidad muscular o falta de sellado labial.",
        b: "Un buen control oral de alimentos y líquidos es importante para la alimentación."
    }
},
{
    category: "👄 TERAPIA DE LENGUAJE",
    question: "¿Su niño/a se encuentra disfónico o con alteración de la voz frecuentemente?",
    a: "Sí, a menudo tiene la voz alterada",
    b: "No, su voz suena normal",
    correct: "a",
    analysis: {
        a: "Las alteraciones vocales pueden indicar mal uso vocal o problemas estructurales que requieren evaluación.",
        b: "Una voz clara y sin esfuerzo es indicador de buen uso vocal."
    }
}
];

// Elementos del DOM
const quizIntro = document.getElementById('intro');
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const startBtn = document.getElementById('startQuiz');
const submitBtn = document.getElementById('submit');
const restartBtn = document.getElementById('restartQuiz');
const questionEl = document.getElementById('question');
const questionEl2 = document.getElementById('question2');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const answerEls = document.querySelectorAll('input[name="answer"]');
const progressBar = document.getElementById('quiz-progress');
const resultsContent = document.getElementById('results-content');

// Variables del quiz
let currentQuiz = 0;
let score = 0;
let userAnswers = [];

// Iniciar el quiz
startBtn.addEventListener('click', () => {
    quizIntro.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuiz();
});

// Cargar pregunta actual
function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    
    // Actualizar progreso
    const progress = ((currentQuiz) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Mostrar pregunta
    questionEl.innerText = currentQuizData.category;
    questionEl2.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
}

// Deseleccionar respuestas
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// Obtener respuesta seleccionada
function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Manejar siguiente pregunta
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if(answer) {
        // Guardar respuesta del usuario
        userAnswers.push({
            question: quizData[currentQuiz].question,
            answer: answer === 'a' ? quizData[currentQuiz].a : quizData[currentQuiz].b,
            analysis: quizData[currentQuiz].analysis[answer]
        });
        
        // Verificar si es correcta (para el score)
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }
        
        currentQuiz++;
        
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }
});

// Mostrar resultados - VERSIÓN SIMPLIFICADA
function showResults() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    // Calcular áreas de preocupación
    const languageConcerns = userAnswers.filter(answer => 
        answer.question.includes("TERAPIA DE LENGUAJE") && 
        answer.answer.includes("Sí")).length;
    
    const myofunctionalConcerns = userAnswers.filter(answer => 
        answer.question.includes("TERAPIA MIOFUNCIONAL") && 
        answer.answer.includes("Sí")).length;
    
    // Generar contenido de resultados simplificado
    let resultsHTML = `
        <div class="result-section">
            <h2 class="result-title"><i class="bi bi-clipboard2-pulse-fill"></i> Resultados del Test</h2>
            
            <div class="summary-card">
                <h3><i class="bi bi-graph-up"></i> Resumen General</h3>
                <p>De las ${quizData.length} preguntas respondidas, identificamos ${score} señales que podrían indicar la necesidad de una evaluación fonoaudiológica.</p>
                
                <div class="alert ${languageConcerns >= 5 || myofunctionalConcerns >= 5 ? 'alert-warning' : 
                                   languageConcerns >= 3 || myofunctionalConcerns >= 3 ? 'alert-primary' : 'alert-success'}">
                    ${languageConcerns >= 5 || myofunctionalConcerns >= 5 ? 
                        '<i class="bi bi-exclamation-triangle-fill"></i> <strong>Evaluación profesional recomendada</strong>' : 
                     languageConcerns >= 3 || myofunctionalConcerns >= 3 ? 
                        '<i class="bi bi-info-circle-fill"></i> <strong>Observación recomendada</strong>' : 
                        '<i class="bi bi-check-circle-fill"></i> <strong>Resultados positivos</strong>'}
                </div>
            </div>
            
            <div class="analysis-section">
                <h3><i class="bi bi-search-heart"></i> Análisis Fonoaudiológico Profesional</h3>
    `;
    
    // Análisis detallado por áreas
    resultsHTML += `
        <div class="area-analysis">
            <h4><i class="bi bi-chat-square-text"></i> Área de Lenguaje</h4>
            <p>Señales identificadas: ${languageConcerns} de 9 posibles</p>
    `;
    
    if(languageConcerns >= 5) {
        resultsHTML += `
            <div class="alert alert-warning">
                <p><strong>Análisis:</strong> Se detectaron múltiples indicadores de posibles dificultades en el desarrollo del lenguaje que requieren evaluación profesional.</p>
                <p>Las respuestas sugieren posibles:</p>
                <ul>
                    <li>Trastornos del desarrollo del lenguaje</li>
                    <li>Dificultades articulatorias o fonológicas</li>
                    <li>Problemas en la adquisición de la lectoescritura</li>
                </ul>
            </div>
        `;
    } else if(languageConcerns >= 3) {
        resultsHTML += `
            <div class="alert alert-primary">
                <p><strong>Análisis:</strong> Se observaron algunas señales que merecen atención y monitoreo.</p>
                <p>Recomendamos observar si:</p>
                <ul>
                    <li>Las dificultades persisten o aumentan con el tiempo</li>
                    <li>Aparecen nuevos indicadores de problemas</li>
                    <li>Hay regresión en habilidades ya adquiridas</li>
                </ul>
            </div>
        `;
    } else {
        resultsHTML += `
            <div class="alert alert-success">
                <p><strong>Análisis:</strong> Los indicadores en esta área son positivos, sugiriendo un desarrollo del lenguaje adecuado.</p>
                <p>Continúa estimulando el lenguaje a través de la lectura, conversaciones y juegos verbales.</p>
            </div>
        `;
    }
    
    resultsHTML += `
        </div>
        
        <div class="area-analysis">
            <h4><i class="bi bi-emoji-smile"></i> Área Miofuncional</h4>
            <p>Señales identificadas: ${myofunctionalConcerns} de 9 posibles</p>
    `;
    
    if(myofunctionalConcerns >= 5) {
        resultsHTML += `
            <div class="alert alert-warning">
                <p><strong>Análisis:</strong> Se detectaron múltiples indicadores de posibles alteraciones en las funciones orofaciales que requieren evaluación profesional.</p>
                <p>Las respuestas sugieren posibles:</p>
                <ul>
                    <li>Alteraciones en las funciones orofaciales (respiración, masticación, deglución)</li>
                    <li>Hábitos que pueden afectar el desarrollo facial</li>
                    <li>Problemas en la musculatura oral</li>
                </ul>
            </div>
        `;
    } else if(myofunctionalConcerns >= 3) {
        resultsHTML += `
            <div class="alert alert-primary">
                <p><strong>Análisis:</strong> Se observaron algunas señales que merecen atención en el desarrollo orofacial.</p>
                <p>Recomendamos:</p>
                <ul>
                    <li>Observar la posición de reposo de lengua y labios</li>
                    <li>Fomentar la respiración nasal</li>
                    <li>Ofrecer variedad de texturas en la alimentación</li>
                </ul>
            </div>
        `;
    } else {
        resultsHTML += `
            <div class="alert alert-success">
                <p><strong>Análisis:</strong> Los indicadores en esta área son positivos, sugiriendo un desarrollo orofacial adecuado.</p>
                <p>Mantén buenos hábitos alimenticios y de higiene oral.</p>
            </div>
        `;
    }
    
    resultsHTML += `
        </div>
        
        <div class="professional-recommendations">
            <h4><i class="bi bi-lightbulb-fill"></i> Recomendaciones Profesionales</h4>
            
            <div class="alert alert-info">
                <p><strong>${languageConcerns >= 5 || myofunctionalConcerns >= 5 ? 
                    'Se recomienda una evaluación fonoaudiológica completa para determinar la naturaleza de las dificultades identificadas y establecer un plan de intervención adecuado.' : 
                 languageConcerns >= 3 || myofunctionalConcerns >= 3 ? 
                    'Se sugiere monitoreo cercano y posible evaluación si las señales persisten o aumentan.' : 
                    'Continúa con actividades que estimulen el desarrollo del lenguaje y las funciones orofaciales.'}</strong></p>
                
                <h5>Acciones sugeridas:</h5>
                <ul>
    `;
    
    if(languageConcerns >= 3) {
        resultsHTML += `
                    <li><strong>Para el lenguaje:</strong>
                        <ul>
                            <li>Estimula el lenguaje con lectura diaria</li>
                            <li>Fomenta conversaciones sobre experiencias cotidianas</li>
                            <li>Juegos de rimas y sonidos para desarrollo fonológico</li>
                            ${languageConcerns >= 5 ? '<li>Consulta con un fonoaudiólogo especializado</li>' : ''}
                        </ul>
                    </li>
        `;
    }
    
    if(myofunctionalConcerns >= 3) {
        resultsHTML += `
                    <li><strong>Para hábitos orofaciales:</strong>
                        <ul>
                            <li>Corrige suavemente la posición de boca/lengua en reposo</li>
                            <li>Fomenta la respiración nasal</li>
                            <li>Ofrece alimentos de diferentes texturas</li>
                            ${myofunctionalConcerns >= 5 ? '<li>Consulta con un especialista en terapia miofuncional</li>' : ''}
                        </ul>
                    </li>
        `;
    }
    
    resultsHTML += `
                    <li><strong>General:</strong>
                        <ul>
                            <li>Documenta ejemplos específicos de conductas preocupantes</li>
                            <li>Observa si las dificultades persisten por más de 3-6 meses</li>
                            <li>Consulta ante cualquier regresión en habilidades</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="professional-note">
            <div class="alert alert-light">
                <p><i class="bi bi-chat-square-quote"></i> <strong>Nota profesional:</strong> Este test es una herramienta de screening y no reemplaza una evaluación fonoaudiológica completa. Si tienes dudas sobre el desarrollo de tu hijo/a, consulta con un profesional calificado.</p>
            </div>
        </div>
        
        
    `;
    
    resultsContent.innerHTML = resultsHTML;
    
    // Reasignar el evento al nuevo botón de reinicio
    document.getElementById('restartQuiz').addEventListener('click', () => {
        currentQuiz = 0;
        score = 0;
        userAnswers = [];
        resultsContainer.style.display = 'none';
        quizIntro.style.display = 'block';
    });
}