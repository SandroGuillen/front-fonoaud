const fechaInforme = document.getElementById("fecha-informe");
const pacienteNombre = document.getElementById("paciente-nombre");
const documento = document.getElementById("paciente-documento");
const fechaPaciente = document.getElementById("paciente-nacimiento");
const genero = document.getElementById("paciente-genero");
const telefono = document.getElementById("paciente-telefono");
const direccion = document.getElementById("paciente-direccion");
const fechaValoracion = document.getElementById("fecha-valoracion");
const profesional = document.getElementById("profesional");
const motivoConsul = document.getElementById("motivo-consulta");
const observacionGeneral = document.getElementById("observacion-general");

// Antecedentes
const antecedentesPrenatales = document.getElementById(
  "antecedentes-prenatales"
);
const antecedentesPerinatales = document.getElementById(
  "antecedentes-perinatales"
);
const antecedentesPosnatales = document.getElementById(
  "antecedentes-posnatales"
);

// Desarrollo Motor
const desarrolloMotorSosten = document.getElementById(
  "desarrollo-motor-sosten"
);
const desarrolloMotorSedente = document.getElementById(
  "desarrollo-motor-sedente"
);
const desarrolloMotorGateo = document.getElementById("desarrollo-motor-gateo");
const desarrolloMotorMarcha = document.getElementById(
  "desarrollo-motor-marcha"
);

// Desarrollo Comunicativo
const desarrolloComunicativoGorjeo = document.getElementById(
  "desarrollo-comunicativo-gorjeo"
);
const desarrolloComunicativoBalbuceo = document.getElementById(
  "desarrollo-comunicativo-balbuceo"
);
const desarrolloComunicativoSilabas = document.getElementById(
  "desarrollo-comunicativo-silabas"
);
const desarrolloComunicativoPalabras = document.getElementById(
  "desarrollo-comunicativo-palabras"
);

// Desarrollo Alimentación
const desarrolloAlimentacionLactancia = document.getElementById(
  "desarrollo-alimentacion-lactancia"
);
const desarrolloAlimentacionComplementaria = document.getElementById(
  "desarrollo-alimentacion-complementaria"
);

// Audición
const audicionRespuesta = document.getElementById("audicion-respuesta");
const audicionIdentificacion = document.getElementById(
  "audicion-identificacion"
);
const audicionRespuestaVoz = document.getElementById("audicion-respuesta-voz");

// Lenguaje
const lenguajeFonologico = document.getElementById("lenguaje-fonologico");
const lenguajeSemantico = document.getElementById("lenguaje-semantico");
const lenguajePragmatico = document.getElementById("lenguaje-pragmatico");

// Habla
const hablaRespiracion = document.getElementById("habla-respiracion");
const hablaProducciones = document.getElementById("habla-producciones");

// Área Miofuncional
const miofuncionalEstructuras = document.getElementById(
  "miofuncional-estructuras"
);
const miofuncionalDeglucion = document.getElementById("miofuncional-deglucion");

// Comunicación y Lenguaje
const comunicacionLenguaje = document.getElementById("comunicacion-lenguaje");

// Proceso de Alimentación y Deglución
const procesoAlimentacionDeglucion = document.getElementById(
  "proceso-alimentacion-deglucion"
);

// Diagnóstico y Recomendaciones
const conclusionDiagnostica = document.getElementById("conclusion-diagnostica");
const objetivosGenerales = document.getElementById("objetivos-generales");
const objetivosEspecificos = document.getElementById("objetivos-especificos");
const recomendacionesTerapia = document.getElementById(
  "recomendaciones-terapia"
);
const fechaGeneracion = document.getElementById("fecha-generacion");

const loadInfo = async () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const paramsObj = Object.fromEntries(params.entries());

  const { id } = paramsObj;
  const response = await request.get(`/valoraciones/${id}`);
  if (response.data) {
    console.log(response.data);
    const valoracion = response.data;

    // Fechas
    fechaInforme.innerHTML = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    fechaValoracion.innerHTML = new Date(valoracion.fecha).toLocaleDateString(
      "es-ES",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    fechaGeneracion.innerHTML = new Date().toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Datos del paciente (estos vendrían de otra consulta)
    pacienteNombre.innerHTML =
      valoracion.paciente.nombre + " " + valoracion.paciente.apellido; // Deberías obtener esto de otra API
    documento.innerHTML = valoracion.paciente.identificacion; // Deberías obtener esto de otra API
    fechaPaciente.innerHTML = valoracion.paciente.fechaNacimiento; // Deberías obtener esto de otra API
    genero.innerHTML = valoracion.paciente.sexoBiologico; // Deberías obtener esto de otra API
    telefono.innerHTML = valoracion.paciente.telefono; // Deberías obtener esto de otra API
    direccion.innerHTML = valoracion.paciente.direccion; // Deberías obtener esto de otra API

    // Datos de la valoración
    profesional.innerHTML = "Nombre del profesional"; // Deberías obtener esto de otra API
    motivoConsul.innerHTML = valoracion.motivoConsulta;
    observacionGeneral.innerHTML = valoracion.observacionGeneral;

    // Antecedentes
    antecedentesPrenatales.innerHTML = valoracion.antecedentes.prenatales;
    antecedentesPerinatales.innerHTML = valoracion.antecedentes.perinatales;
    antecedentesPosnatales.innerHTML = valoracion.antecedentes.posnatales;

    // Desarrollo Motor
    desarrolloMotorSosten.innerHTML = valoracion.desarrolloMotor.sostenCefalico;
    desarrolloMotorSedente.innerHTML =
      valoracion.desarrolloMotor.posicionSedente;
    desarrolloMotorGateo.innerHTML = valoracion.desarrolloMotor.gateo;
    desarrolloMotorMarcha.innerHTML = valoracion.desarrolloMotor.marcha;

    // Desarrollo Comunicativo
    desarrolloComunicativoGorjeo.innerHTML =
      valoracion.desarrolloComunicativo.gorjeo;
    desarrolloComunicativoBalbuceo.innerHTML =
      valoracion.desarrolloComunicativo.balbuceo;
    desarrolloComunicativoSilabas.innerHTML =
      valoracion.desarrolloComunicativo.silabas;
    desarrolloComunicativoPalabras.innerHTML =
      valoracion.desarrolloComunicativo.palabras;

    // Desarrollo Alimentación
    desarrolloAlimentacionLactancia.innerHTML =
      valoracion.desarrolloAlimentacion.lactancia;
    desarrolloAlimentacionComplementaria.innerHTML =
      valoracion.desarrolloAlimentacion.alimentacionComplementaria;

    // Audición
    audicionRespuesta.innerHTML = valoracion.audicion.respuestaEstimulacion;
    audicionIdentificacion.innerHTML =
      valoracion.audicion.identificacionSonidos;
    audicionRespuestaVoz.innerHTML = valoracion.audicion.respuestaVoz;

    // Lenguaje
    lenguajeFonologico.innerHTML = valoracion.lenguaje.fonologico;
    lenguajeSemantico.innerHTML = valoracion.lenguaje.semantico;
    lenguajePragmatico.innerHTML = valoracion.lenguaje.pragmatico;

    // Habla
    hablaRespiracion.innerHTML = valoracion.habla.respiracion;
    hablaProducciones.innerHTML = valoracion.habla.produccionesOrales;

    // Área Miofuncional
    miofuncionalEstructuras.innerHTML =
      valoracion.areaMiofuncional.estructurasEstomatognaticas;
    miofuncionalDeglucion.innerHTML = valoracion.areaMiofuncional.deglucion;

    // Comunicación y Lenguaje
    comunicacionLenguaje.innerHTML = valoracion.comunicacionLenguaje;

    // Proceso de Alimentación y Deglución
    procesoAlimentacionDeglucion.innerHTML =
      valoracion.precesoAlimentacionDeglucion;

    // Diagnóstico y Recomendaciones
    conclusionDiagnostica.innerHTML = valoracion.conclusionDiagnostica;

    objetivosGenerales.innerHTML = `<p><strong>Objetivos Generales:</strong> ${valoracion.planIntervencion.objetivosGenerales}</p>`;

    // Objetivos específicos
    objetivosEspecificos.innerHTML = "";
    if (
      valoracion.planIntervencion.objetivosEspecificos &&
      Array.isArray(valoracion.planIntervencion.objetivosEspecificos)
    ) {
      valoracion.planIntervencion.objetivosEspecificos.forEach((objetivo) => {
        const li = document.createElement("li");
        li.textContent = objetivo;
        objetivosEspecificos.appendChild(li);
      });
    }
    recomendacionesTerapia.innerHTML = `<p><strong>Recomendaciones:</strong> ${valoracion.recomendaciones.terapiaFonoaudiologica}</p>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadInfo();
});
