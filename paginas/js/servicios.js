const renderFono = (fono) => {
  const onClickPedirCita = async () => {
    console.log("funciona");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user");
    if (user) {
      window.location = "/index.html";
    } else {
      window.location = "/Login/index.html";
    }
  };

  return `
            <div
              class="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="doctor-card">
                <div class="doctor-img">
                  <img
                    src="${fono.image}"
                    class="img-fluid"
                    alt="Dr. Walter White"
                  />
                  <div class="doctor-social">
                    <a href="${fono.twitter}"><i class="bi bi-twitter"></i></a>
                    <a href="${fono.facebook}"><i class="bi bi-facebook"></i></a>
                    <a href="${fono.instagram}"><i class="bi bi-instagram"></i></a>
                    <a href="${fono.linkedin}"><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
                <div class="doctor-info">
                  <h4>${fono.nombre} ${fono.apellido}</h4>
                  <span>${fono.especialidad}</span>
                  <div onclick="onClickPedirCita" class="doctor-cta">
                    <a class="btn-appointment"
                      >Pedir cita</a
                    >
                  </div>
                </div>
              </div>
            </div>
`;
};

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-appointment")) {
    const onClickPedirCita = async () => {
      console.log("funciona");
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user:", user);
      if (user) {
        window.location = "/agendar-cita/agendarcita.html";
      } else {
        window.location = "/Login/index.html";
      }
    };
    onClickPedirCita();
  }
});

const loadFonos = async () => {
  const fonoaudologosContainer = document.getElementById("fonoaudiologos");
  fonoaudologosContainer.innerHTML = "";
  const fonos = await getFonos();
  for (const fono of fonos) {
    fonoaudologosContainer.innerHTML += renderFono(fono);
  }
};

const getFonos = async () => {
  const response = await request.get("/fonoaudiologo/all");
  return response.data;
};

document.addEventListener("DOMContentLoaded", () => {
  loadFonos();
});
