import React, { useState } from 'react';
import FormularioCita from './components/FormularioCita';
import { crearCita } from './services/citaService';

function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleCrearCitaSubmit = async (citaRequestData) => {
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const resultado = await crearCita(citaRequestData);
      
      setStatus({
        type: 'success',
        message: `¡Cita registrada con éxito! ID de Cita: ${resultado.idCita || 'Confirmada'}`
      });
    } catch (error) {
      // Atrapa el 'errorData.error' lanzado por Java (ej: "No se encontró cliente con ese uid.")
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Alertas de Éxito o Error */}
        {status.type === 'success' && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded shadow-sm">
            <p className="font-medium">{status.message}</p>
          </div>
        )}

        {status.type === 'error' && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
            <p className="font-medium">⚠️ Error: {status.message}</p>
          </div>
        )}

        {/* Indicador visual de carga */}
        {loading && (
          <div className="text-center text-blue-600 font-medium mb-4 animate-pulse">
            Comunicándose con el servidor de Suri-Firuvet...
          </div>
        )}

        {/* El componente de tu formulario */}
        <FormularioCita onSubmitCita={handleCrearCitaSubmit} />
        
      </div>
    </div>
  );
}

export default App;