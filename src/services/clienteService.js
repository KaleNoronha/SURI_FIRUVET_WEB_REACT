import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registrarCliente = async (clienteData) => {
  try {
    const payload = { ...clienteData };
    if (payload.fecNac) {
      const [y, m, d] = payload.fecNac.split('-');
      payload.fecNac = `${d}/${m}/${y}`;
    }
    const response = await axios.post(`${API_URL}/clientes`, payload);
    return response.data;
  } catch (error) {
    const mensajeError = error.response?.data?.error || "Error al registrar el cliente";
    throw new Error(mensajeError);
  }
};

export const obtenerClientePorUid = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/clientes/uid/${uid}`);
    return response.data;
  } catch (error) {
    const mensajeError = error.response?.data?.error || "No se encontró el cliente";
    throw new Error(mensajeError);
  }
};
