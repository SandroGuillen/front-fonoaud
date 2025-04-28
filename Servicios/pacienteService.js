import { backendUrl } from "../config";

const pacienteService = {
  async getPacientes(idPaciente = undefined, filter = {}) {
    const url = idPaciente
      ? `${backendUrl}/pacientes/${idPaciente}`
      : `${backendUrl}/pacientes`;

    const response = await fetch(url, {
      body: JSON.stringify(filter),
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  },
};

export default pacienteService;
