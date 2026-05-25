import React from 'react';

export default function ModalDetalleCita({ cita, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Detalle de Cita</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div className="space-y-3 text-sm">
          <Row label="ID Cita"       value={`#${cita.idCita}`} />
          <Row label="Tipo"          value={cita.nombreTipoCita} />
          <Row label="Fecha"         value={new Date(cita.fecha).toLocaleString('es-PE')} />
          <Row label="Mascota"       value={`${cita.nombreMascota} (ID: ${cita.idMascota})`} />
          <Row label="Clínica"       value={`${cita.nombreClinica} (ID: ${cita.idClinica})`} />
          <Row label="Cliente"       value={`${cita.nombreCliente} (ID: ${cita.idCliente})`} />
          {cita.comentario && <Row label="Comentario" value={cita.comentario} />}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-100">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-800 text-right">{value}</span>
    </div>
  );
}
