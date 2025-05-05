$(document).ready(function() {
    // Datos de ejemplo (en un proyecto real estos vendrían de una API)
    const pacientes = [
        {
            id: 1,
            tipoDocumento: "RC",
            documento: "123456789",
            nombres: "Sofía",
            apellidos: "Martínez López",
            fechaNacimiento: "2018-06-15",
            edad: 5,
            genero: "femenino",
            diagnostico: "Retraso en el desarrollo del lenguaje",
            acudiente: "María López",
            parentesco: "madre",
            telefono: "3101234567",
            email: "maria.lopez@example.com",
            fonoAsignado: "María Gómez Pérez",
            estado: "activo",
            fechaRegistro: "2023-01-10"
        },
        {
            id: 2,
            tipoDocumento: "TI",
            documento: "987654321",
            nombres: "Juan David",
            apellidos: "González Ramírez",
            fechaNacimiento: "2015-03-22",
            edad: 8,
            genero: "masculino",
            diagnostico: "Tartamudez",
            acudiente: "Carlos González",
            parentesco: "padre",
            telefono: "3157654321",
            email: "carlos.gonzalez@example.com",
            fonoAsignado: "Carlos Rodríguez López",
            estado: "activo",
            fechaRegistro: "2023-02-05"
        },
        {
            id: 3,
            tipoDocumento: "RC",
            documento: "456789123",
            nombres: "Valentina",
            apellidos: "Hernández García",
            fechaNacimiento: "2019-11-30",
            edad: 4,
            genero: "femenino",
            diagnostico: "Trastorno fonológico",
            acudiente: "Ana García",
            parentesco: "madre",
            telefono: "3209876543",
            email: "ana.garcia@example.com",
            fonoAsignado: "Ana Martínez Sánchez",
            estado: "inactivo",
            fechaRegistro: "2023-03-15"
        }
    ];

    // Función para calcular la edad
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        
        return edad;
    }

    // Inicializar DataTable
    const table = $('#pacientesTable').DataTable({
        data: pacientes,
        columns: [
            { data: 'documento' },
            { data: null, render: function(data) {
                return `${data.nombres} ${data.apellidos}`;
            }},
            { data: null, render: function(data) {
                const edad = calcularEdad(data.fechaNacimiento);
                return `${edad} años`;
            }},
            { data: 'acudiente' },
            { data: 'telefono' },
            { data: 'fonoAsignado' },
            { data: 'estado', render: function(data) {
                return `<span class="badge ${data === 'activo' ? 'bg-success' : 'bg-secondary'}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
            }},
            { data: null, render: function(data) {
                return `
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${data.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-info historial-btn" data-id="${data.id}">
                            <i class="bi bi-file-earmark-medical"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${data.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                `;
            }}
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
        },
        responsive: true
    });

    // Buscar pacientes
    $('#searchButton').click(function() {
        table.search($('#searchInput').val()).draw();
    });

    $('#searchInput').keyup(function(e) {
        if (e.keyCode === 13) {
            table.search($(this).val()).draw();
        }
    });

    // Filtrar por edad
    $('#filterEdad').change(function() {
        if ($(this).val() === '') {
            table.columns(2).search('').draw();
        } else {
            const rango = $(this).val().split('-');
            table.columns(2).search(`^${rango[0]}|^${rango[1]}`).draw();
        }
    });

    // Filtrar por estado
    $('#filterEstado').change(function() {
        if ($(this).val() === '') {
            table.columns(6).search('').draw();
        } else {
            table.columns(6).search($(this).val()).draw();
        }
    });

    // Modal para agregar nuevo paciente
    $('#agregarPacienteModal').on('show.bs.modal', function(e) {
        $('#modalTitle').text('Agregar Nuevo Paciente');
        $('#pacienteForm')[0].reset();
        $('#pacienteId').val('');
    });

    // Editar paciente
    $('#pacientesTable').on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        const paciente = pacientes.find(p => p.id === id);
        
        if (paciente) {
            $('#modalTitle').text('Editar Paciente');
            $('#pacienteId').val(paciente.id);
            $('#tipoDocumento').val(paciente.tipoDocumento);
            $('#documento').val(paciente.documento);
            $('#nombres').val(paciente.nombres);
            $('#apellidos').val(paciente.apellidos);
            $('#fechaNacimiento').val(paciente.fechaNacimiento);
            $('#genero').val(paciente.genero);
            $('#diagnostico').val(paciente.diagnostico);
            $('#acudienteNombre').val(paciente.acudiente);
            $('#acudienteParentesco').val(paciente.parentesco);
            $('#acudienteTelefono').val(paciente.telefono);
            $('#acudienteEmail').val(paciente.email);
            $('#fonoAsignado').val(paciente.fonoAsignado);
            $('#estado').val(paciente.estado);
            $('#observaciones').val(paciente.observaciones || '');
            
            $('#agregarPacienteModal').modal('show');
        }
    });

    // Ver historial clínico
    $('#pacientesTable').on('click', '.historial-btn', function() {
        const id = $(this).data('id');
        const paciente = pacientes.find(p => p.id === id);
        
        if (paciente) {
            $('#pacienteNombreHistorial').text(`${paciente.nombres} ${paciente.apellidos}`);
            $('#pacienteInfoHistorial').html(`
                <strong>Documento:</strong> ${paciente.tipoDocumento} ${paciente.documento}<br>
                <strong>Edad:</strong> ${calcularEdad(paciente.fechaNacimiento)} años<br>
                <strong>Acudiente:</strong> ${paciente.acudiente} (${paciente.parentesco})
            `);
            
            $('#historialModal').modal('show');
        }
    });

    // Eliminar paciente
    $('#pacientesTable').on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        const paciente = pacientes.find(p => p.id === id);
        
        if (paciente) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Deseas eliminar a ${paciente.nombres} ${paciente.apellidos}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Aquí iría la llamada a la API para eliminar
                    Swal.fire(
                        'Eliminado!',
                        'El paciente ha sido eliminado.',
                        'success'
                    );
                    // Actualizar la tabla
                    table.row($(this).parents('tr')).remove().draw();
                }
            });
        }
    });

    // Guardar paciente
    $('#savePacienteBtn').click(function() {
        const form = $('#pacienteForm')[0];
        
        if (form.checkValidity()) {
            // Aquí iría la llamada a la API para guardar
            Swal.fire(
                'Éxito!',
                'Los datos del paciente han sido guardados.',
                'success'
            );
            $('#agregarPacienteModal').modal('hide');
        } else {
            form.reportValidity();
        }
    });

    // Exportar datos
    $('#exportBtn').click(function() {
        // Aquí iría la lógica para exportar a Excel
        Swal.fire(
            'Exportar',
            'Los datos serán exportados a Excel',
            'info'
        );
    });

    // Ejemplo de función para llamar a la API
    function fetchPacientes() {
        // En un proyecto real:
        /*
        fetch('/api/pacientes')
            .then(response => response.json())
            .then(data => {
                table.clear().rows.add(data).draw();
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'No se pudieron cargar los pacientes', 'error');
            });
        */
    }
});