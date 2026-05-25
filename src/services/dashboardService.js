import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const obtenerCitasPorUid = async (uid) => {
  const res = await axios.get(`${API_URL}/citas`, { params: { uid } });
  return res.data;
};

export const obtenerMascotasPorUid = async (uid) => {
  const res = await axios.get(`${API_URL}/mascotas`, { params: { uid } });
  return res.data;
};

export const obtenerClinicas = async () => {
  const res = await axios.get(`${API_URL}/clinicas`);
  return res.data;
};

export const obtenerTiposMascota = async () => {
  const res = await axios.get(`${API_URL}/tipos-mascota`);
  return res.data;
};

export const registrarMascota = async (mascotaData) => {
  try {
    const res = await axios.post(`${API_URL}/mascotas`, mascotaData);
    return res.data;
  } catch (error) {
    const mensajeError = error.response?.data?.error || 'Error al registrar la mascota';
    throw new Error(mensajeError);
  }
};

export const obtenerTiposCita = async () => {
  const res = await axios.get(`${API_URL}/tipos-cita`);
  return res.data;
};

export const registrarCita = async (citaData) => {
  try {
    if (citaData.fecha && citaData.fecha.length === 16) citaData.fecha = `${citaData.fecha}:00`;
    const res = await axios.post(`${API_URL}/citas`, citaData);
    return res.data;
  } catch (error) {
    const mensajeError = error.response?.data?.error || 'Error al registrar la cita';
    throw new Error(mensajeError);
  }
};
