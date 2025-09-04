document.addEventListener("DOMContentLoaded", function () {
  const { jsPDF } = window.jspdf;
  function generarPDF() {
    const elemento = document.getElementById("contenido-a-pdf");
    
    // Configuración de html2canvas (captura el HTML como imagen)
    html2canvas(elemento, {
      scale: 2, // Mejor calidad
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4"); // Orientación: vertical ("p"), tamaño A4
      
      // Calcular dimensiones para centrar el contenido
      const imgWidth = 190; // Ancho máximo en mm (A4: 210mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Agregar imagen al PDF
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      
      // Guardar PDF
      pdf.save("documento.pdf");
    });
  }
  // Datos de ejemplo (simulando búsqueda en base de datos)
  const pacientes = [
    {
      id: 1,
      nombre: "María González Pérez",
      edad: "8 años",
      genero: "Femenino",
      telefono: "3101234567",
      nacimiento: "15/05/2015",
      estadoCivil: "Soltero",
      direccion: "Calle 123 #45-67",
      residencia: "Bogotá",
    },
    {
      id: 2,
      nombre: "Juan David Rodríguez",
      edad: "5 años",
      genero: "Masculino",
      telefono: "3209876543",
      nacimiento: "22/10/2018",
      estadoCivil: "Soltero",
      direccion: "Carrera 89 #12-34",
      residencia: "Medellín",
    },
  ];

  const btnBuscar = document.getElementById("btnBuscar");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const formValoracion = document.getElementById("formValoracion");
  const buscarPaciente = document.getElementById("buscarPaciente");
  const btnGuardar = document.getElementById("btnGuardar");
  
  async function guardarValoracion(valoracion) {
    console.log(valoracion)
    const response = await request.post("/valoraciones", valoracion);
    if (response.status === 201) {
      alert("Valoración guardada exitosamente");
      // generarPDF()
    } else {
      alert("Error al guardar la valoración");
    }
  }

  function generarPDFPersonalizado() {
    const originalHTML = document.body.innerHTML;
    const contenido = document.getElementById("contenido").outerHTML;

    // Personaliza el HTML para el PDF
    document.body.innerHTML = `
        <div style="padding: 20px; font-size: 14pt;">
            ${contenido}
        </div>
    `;

    // Imprimir y luego restaurar la página
    window.print();
    document.body.innerHTML = originalHTML;
}

  
  // Función para cargar datos del paciente
  function cargarDatosPaciente(paciente) {
    // Calcular edad
    const fechaNac = new Date(paciente.fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    if (hoy.getMonth() < fechaNac.getMonth() || 
        (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    // Asignar valores
    const elements = {
        nombrePaciente: `${paciente.nombre} ${paciente.apellido}`,
        edadPaciente: `${edad} años`,
        generoPaciente: paciente.sexoBiologico === 'F' ? 'Femenino' : 'Masculino',
        telefonoPaciente: paciente.telefono,
        nacimientoPaciente: paciente.fechaNacimiento,
        tipoDocumentoPaciente: paciente.tipoDocumento,
        identificacionPaciente: paciente.identificacion,
        direccionPaciente: paciente.direccion,
        correoPaciente: paciente.correo,
        residenciaPaciente: paciente.munOrigen_FK,
        barrioPaciente: paciente.veredaBarrio
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}
  
  // Evento de búsqueda
  btnBuscar.addEventListener("click", async function () {
    const termino = buscarPaciente.value.toLowerCase();
  
    if (termino.trim() === "") {
      alert("Por favor ingrese un término de búsqueda");
      return;
    }
  
    // Simular búsqueda en base de datos
    const pacienteEncontrado = await request.get("/pacientes", {
      identificacion: (termino),
    })
  
    if (pacienteEncontrado) {
      console.log(pacienteEncontrado.data.data)
      cargarDatosPaciente(pacienteEncontrado.data.data);
    } else {
      alert("Paciente no encontrado. Verifique los datos e intente nuevamente.");
    }
  });
  
  // Evento para limpiar formulario
  btnLimpiar.addEventListener("click", function () {
    formValoracion.reset();
    document.querySelectorAll("#datosPaciente span").forEach((span) => {
      span.textContent = "-";
    });
    buscarPaciente.value = "";
  });
  
  // Evento para guardar valoración
  formValoracion.addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Validar que se haya seleccionado un paciente
    if (document.getElementById("nombrePaciente").textContent === "-") {
      alert("Por favor busque y seleccione un paciente primero");
      return;
    }
  
    // Obtener todos los datos del formulario
    const valoracion = {
      idFono_FK: JSON.parse(localStorage.getItem("user"))._id,
      idPaciente_FK: buscarPaciente.value,
      fecha: new Date(),
      motivoConsulta: document.getElementById("motivoConsulta").value,
      observacionGeneral: document.getElementById("observacionGeneral").value,
      antecedentes: {
        prenatales: document.getElementById("prenatales").value,
        perinatales: document.getElementById("perinatales").value,
        posnatales: document.getElementById("posnatales").value
      },
      desarrolloMotor: {
        sostenCefalico: document.getElementById("sostenCefalico").value,
        posicionSedente: document.getElementById("posicionSedente").value,
        gateo: document.getElementById("gateo").value,
        marcha: document.getElementById("marcha").value
      },
      desarrolloComunicativo: {
        gorjeo: document.getElementById("gorjeo").value,
        balbuceo: document.getElementById("balbuceo").value,
        silabas: document.getElementById("silabas").value,
        palabras: document.getElementById("palabras").value
      },
      desarrolloAlimentacion: {
        lactancia: document.getElementById("lactancia").value,
        alimentacionComplementaria: document.getElementById("alimentacionComplementaria").value
      },
      audicion: {
        respuestaEstimulacion: document.getElementById("respuestaEstimulacion").value,
        identificacionSonidos: document.getElementById("identificacionSonidos").value,
        respuestaVoz: document.getElementById("respuestaVoz").value
      },
      lenguaje: {
        fonologico: document.getElementById("fonologico").value,
        semantico: document.getElementById("semantico").value,
        pragmatico: document.getElementById("pragmatico").value
      },
      habla: {
        respiracion: document.getElementById("respiracion").value,
        produccionesOrales: document.getElementById("produccionesOrales").value
      },
      areaMiofuncional: {
        estructurasEstomatognaticas: document.getElementById("estructurasEstomatognaticas").value,
        deglucion: document.getElementById("deglucion").value
      },
      comunicacionLenguaje: document.getElementById("comunicacionLenguaje").value,
      precesoAlimentacionDeglucion: document.getElementById("procesoAlimentacionDeglucion").value,
      conclusionDiagnostica: document.getElementById("conclusionDiagnostica").value,
      planIntervencion: {
        objetivosGenerales: document.getElementById("objetivosGenerales").value,
        objetivosEspecificos: document.getElementById("objetivosEspecificos").value.split(';')
      },
      recomendaciones: {
        terapiaFonoaudiologica: document.getElementById("terapiaFonoaudiologica").value
      }
    };
  
    console.log("Valoración a guardar:", valoracion);
    guardarValoracion(valoracion);
    formValoracion.reset();
  });


    const sidebar = document.getElementById('sidebarMenu');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Función para alternar el sidebar
    function toggleSidebar() {
      sidebar.classList.toggle('active');
      
      // Bloquear scroll del body cuando el sidebar está abierto
      if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    // Evento para el botón toggle
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSidebar();
    });
    
    // Cerrar sidebar al hacer clic fuera de él
    document.addEventListener('click', function(e) {
      if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
        toggleSidebar();
      }
    });
    
    // Prevenir que el clic dentro del sidebar lo cierre
    sidebar.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  // Simular autollenado del profesional (en un sistema real esto vendría del login)
  document.getElementById("nombreProfesional").value = "Dra. Ana María López";
  document.getElementById("idProfesional").value = "123456789";
  document.getElementById("especialidad").value = "Fonoaudiología Infantil";
})