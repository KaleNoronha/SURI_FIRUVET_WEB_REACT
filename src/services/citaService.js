const API_URL = "http://localhost:8080/api";

export const crearCita = async (citaData) => {
    try {
        if (citaData.fecha && citaData.fecha.length === 16) {
            citaData.fecha = `${citaData.fecha}:00`;
        }

        const response = await fetch(`${API_URL}/citas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(citaData)
        });
        
        if (!response.ok) {
            let errorMessage = 'Error al crear la cita';
            try {
                const errorData = await response.json();
                throw new Error(errorData.error || errorMessage);
            } catch (error) {
                errorMessage += `Error del servidor: ${response.status} ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error en crearCita:", error);
        throw error;
    }
};