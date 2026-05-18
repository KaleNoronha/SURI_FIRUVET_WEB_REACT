import React, { useState } from 'react';

export default function FormularioCita({ onSubmitCita }) {

  const [formData, setFormData] = useState({
    idTipoCita: '',
    fecha: '',
    comentario: '',
    idMascota: '',
    idCliente: '',
    uid: '',
    idClinica: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestPayload = {
      ...formData,
      idTipoCita: Number(formData.idTipoCita),
      idMascota: Number(formData.idMascota),
      idCliente: Number(formData.idCliente),
      idClinica: Number(formData.idClinica),
    };

    onSubmitCita(requestPayload);
  };

  return (
    // bg-white: fondo blanco | shadow-md: sombra suave | rounded-lg: bordes redondeados | p-6: padding interno
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Registrar Nueva Cita</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Fila doble: Tipo Cita y Clínica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Tipo de Cita</label>
            <input
              type="number"
              name="idTipoCita"
              value={formData.idTipoCita}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej. 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Clínica</label>
            <input
              type="number"
              name="idClinica"
              value={formData.idClinica}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej. 3"
            />
          </div>
        </div>

        {/* Fila doble: Cliente y UID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Cliente</label>
            <input
              type="number"
              name="idCliente"
              value={formData.idCliente}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej. 42"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UID del Cliente</label>
            <input
              type="text"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="usr_A1b2C3d4..."
            />
          </div>
        </div>

        {/* Fila doble: Mascota y Fecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Mascota</label>
            <input
              type="number"
              name="idMascota"
              value={formData.idMascota}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej. 7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
            <input
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Campo Completo: Comentario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comentario / Notas médicas</label>
          <textarea
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describa el motivo de la cita..."
          ></textarea>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition duration-200 shadow-md"
        >
          Crear Cita Médica
        </button>

      </form>
    </div>
  );
}