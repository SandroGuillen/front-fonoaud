import { backendUrl } from "../config";

const pacienteService = {
  async getPacientes(idPaciente = undefined, filter = {}) {
    const url = idPaciente
      ? `${backendUrl}/pacientes/${idPaciente}`
      : `${backendUrl}/pacientes/all?${Object.entries(filter)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`;

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
