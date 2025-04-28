
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar fecha actual
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('fecha-hoy').textContent = new Date().toLocaleDateString('es-ES', options);
    
    // Control del sidebar
    const sidebar = document.getElementById('sidebarMenu');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      sidebar.classList.toggle('show');
      mainContent.classList.toggle('shifted');
    });
    
    // Cerrar sidebar al hacer clic fuera en móviles
    document.addEventListener('click', function(e) {
      if (window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('show');
          mainContent.classList.remove('shifted');
        }
      }
    });
  });