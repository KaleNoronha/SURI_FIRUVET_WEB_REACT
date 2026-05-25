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
