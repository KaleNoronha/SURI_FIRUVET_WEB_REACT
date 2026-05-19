import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const crearCita = async (citaData) => {
    try {
        if (citaData.fecha && citaData.fecha.length === 16) {
            citaData.fecha = `${citaData.fecha}:00`;
        }

        const response = await axios.post(`${API_URL}/citas`, citaData);

        return response.data;
    } catch (error) {
        const mensajeError = error.response?.data?.error || 'Error al crear la cita';
        throw new Error(mensajeError);
    }
};