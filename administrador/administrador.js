$(document).ready(function() {
    // Datos de ejemplo (en un proyecto real estos vendrían de una API)
    const fonoaudiologos = [
        {
            id: 1,
            tipoDocumento: "CC",
            documento: "123456789",
            nombres: "María",
            apellidos: "Gómez Pérez",
            fechaNacimiento: "1985-05-15",
            genero: "femenino",
            email: "maria.gomez@fonoaudiotest.com",
            telefono: "3101234567",
            especialidad: "lenguaje",
            direccion: "Calle 123 #45-67, Bogotá",
            estado: "activo",
            fechaRegistro: "2023-01-15"
        },
        {
            id: 2,
            tipoDocumento: "CC",
            documento: "987654321",
            nombres: "Carlos",
            apellidos: "Rodríguez López",
            fechaNacimiento: "1988-10-22",
            genero: "masculino",
            email: "carlos.rodriguez@fonoaudiotest.com",
            telefono: "3157654321",
            especialidad: "audicion",
            direccion: "Carrera 56 #12-34, Medellín",
            estado: "activo",
            fechaRegistro: "2023-02-20"
        },
        {
            id: 3,
            tipoDocumento: "CE",
            documento: "AB123456",
            nombres: "Ana",
            apellidos: "Martínez Sánchez",
            fechaNacimiento: "1990-03-30",
            genero: "femenino",
            email: "ana.martinez@fonoaudiotest.com",
            telefono: "3209876543",
            especialidad: "voz",
            direccion: "Avenida 7 #23-45, Cali",
            estado: "inactivo",
            fechaRegistro: "2023-03-10"
        }
    ];

    // Inicializar DataTable
    const table = $('#fonoaudiologosTable').DataTable({
        data: fonoaudiologos,
        columns: [
            { data: 'documento' },
            { data: null, render: function(data) {
                return `${data.nombres} ${data.apellidos}`;
            }},
            { data: 'especialidad' },
            { data: 'email' },
            { data: 'telefono' },
            { data: 'estado', render: function(data) {
                return `<span class="badge ${data === 'activo' ? 'bg-success' : 'bg-secondary'}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
            }},
            { data: null, render: function(data) {
                return `
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${data.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary password-btn" data-id="${data.id}">
                            <i class="bi bi-key"></i>
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

    // Buscar fonoaudiólogos
    $('#searchButton').click(function() {
        table.search($('#searchInput').val()).draw();
    });

    $('#searchInput').keyup(function(e) {
        if (e.keyCode === 13) {
            table.search($(this).val()).draw();
        }
    });

    // Filtrar por estado
    $('#filterStatus').change(function() {
        if ($(this).val() === '') {
            table.columns(5).search('').draw();
        } else {
            table.columns(5).search($(this).val()).draw();
        }
    });

    // Modal para agregar nuevo fonoaudiólogo
    $('#agregarFonoModal').on('show.bs.modal', function(e) {
        $('#modalTitle').text('Agregar Nuevo Fonoaudiólogo');
        $('#fonoForm')[0].reset();
        $('#fonoId').val('');
    });

    // Editar fonoaudiólogo
    $('#fonoaudiologosTable').on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        const fono = fonoaudiologos.find(f => f.id === id);
        
        if (fono) {
            $('#modalTitle').text('Editar Fonoaudiólogo');
            $('#fonoId').val(fono.id);
            $('#tipoDocumento').val(fono.tipoDocumento);
            $('#documento').val(fono.documento);
            $('#nombres').val(fono.nombres);
            $('#apellidos').val(fono.apellidos);
            $('#fechaNacimiento').val(fono.fechaNacimiento);
            $('#genero').val(fono.genero);
            $('#email').val(fono.email);
            $('#telefono').val(fono.telefono);
            $('#especialidad').val(fono.especialidad);
            $('#estado').val(fono.estado);
            $('#direccion').val(fono.direccion);
            $('#password').val('').prop('required', false);
            $('#confirmPassword').val('').prop('required', false);
            
            $('#agregarFonoModal').modal('show');
        }
    });

    // Cambiar contraseña
    $('#fonoaudiologosTable').on('click', '.password-btn', function() {
        const id = $(this).data('id');
        const fono = fonoaudiologos.find(f => f.id === id);
        
        if (fono) {
            $('#passwordFonoId').val(fono.id);
            $('#changePasswordModal').modal('show');
        }
    });

    // Eliminar fonoaudiólogo
    $('#fonoaudiologosTable').on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        const fono = fonoaudiologos.find(f => f.id === id);
        
        if (fono) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Deseas eliminar a ${fono.nombres} ${fono.apellidos}?`,
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
                        'El fonoaudiólogo ha sido eliminado.',
                        'success'
                    );
                    // Actualizar la tabla
                    table.row($(this).parents('tr')).remove().draw();
                }
            });
        }
    });

    // Guardar fonoaudiólogo
    $('#saveFonoBtn').click(function() {
        const form = $('#fonoForm')[0];
        
        if (form.checkValidity()) {
            if ($('#password').val() !== $('#confirmPassword').val()) {
                Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
                return;
            }
            
            // Aquí iría la llamada a la API para guardar
            Swal.fire(
                'Éxito!',
                'Los datos del fonoaudiólogo han sido guardados.',
                'success'
            );
            $('#agregarFonoModal').modal('hide');
        } else {
            form.reportValidity();
        }
    });

    // Guardar nueva contraseña
    $('#savePasswordBtn').click(function() {
        const form = $('#passwordForm')[0];
        
        if (form.checkValidity()) {
            if ($('#newPassword').val() !== $('#confirmNewPassword').val()) {
                Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
                return;
            }
            
            // Aquí iría la llamada a la API para cambiar contraseña
            Swal.fire(
                'Éxito!',
                'La contraseña ha sido actualizada.',
                'success'
            );
            $('#changePasswordModal').modal('hide');
        } else {
            form.reportValidity();
        }
    });

    // Ejemplo de función para llamar a la API
    function fetchFonoaudiologos() {
        // En un proyecto real:
        /*
        fetch('/api/fonoaudiologos')
            .then(response => response.json())
            .then(data => {
                table.clear().rows.add(data).draw();
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'No se pudieron cargar los fonoaudiólogos', 'error');
            });
        */
    }
});