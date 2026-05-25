import React, { useState, useEffect } from 'react';
import { obtenerCitasPorUid, obtenerMascotasPorUid, obtenerClinicas } from '../services/dashboardService';
import ModalRegistroMascota from './ModalRegistroMascota';
import ModalDetalleCita from './ModalDetalleCita';
import ModalRegistroCita from './ModalRegistroCita';

const NAV_ITEMS = [
  { key: 'citas',    label: 'Citas',    icon: '📅' },
  { key: 'mascotas', label: 'Mascotas', icon: '🐾' },
  { key: 'clinicas', label: 'Clínicas', icon: '🏥' },
];

export default function Dashboard({ cliente, onCerrarSesion }) {
  const [vista, setVista]       = useState('inicio');
  const [citas, setCitas]       = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [modalMascota, setModalMascota] = useState(false);
  const [modalCita, setModalCita]       = useState(false);
  const [citaDetalle, setCitaDetalle]   = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [c, m, cl] = await Promise.all([
          obtenerCitasPorUid(cliente.uid),
          obtenerMascotasPorUid(cliente.uid),
          obtenerClinicas(),
        ]);
        setCitas(c);
        setMascotas(m);
        setClinicas(cl);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [cliente.uid]);

  const stats = [
    { label: 'Citas',     valor: citas.length,    icon: '📅', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Mascotas',  valor: mascotas.length,  icon: '🐾', color: 'bg-green-50 border-green-200 text-green-700' },
    { label: 'Clínicas',  valor: clinicas.length,  icon: '🏥', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <img src="/favicon.svg" alt="Suri Firuvet" className="w-9 h-9" />
          <span className="text-lg font-bold text-gray-800">Suri Firuvet</span>
        </div>

        {/* Bienvenida */}
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs text-gray-400">Bienvenido,</p>
          <p className="text-sm font-semibold text-gray-700 truncate">
            {cliente.nombCli} {cliente.apeCli}
          </p>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button
            onClick={() => setVista('inicio')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${vista === 'inicio' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            🏠 Inicio
          </button>
          {NAV_ITEMS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setVista(key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${vista === key ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {icon} {label}
            </button>
          ))}
        </nav>

        {/* Cerrar sesión */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={onCerrarSesion}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        {loading ? (
          <div className="text-center text-blue-600 font-medium animate-pulse mt-20">
            Cargando datos...
          </div>
        ) : (
          <>
            {/* Vista: Inicio */}
            {vista === 'inicio' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {stats.map(({ label, valor, icon, color }) => (
                    <div key={label} className={`border rounded-xl p-6 flex items-center gap-4 ${color}`}>
                      <span className="text-3xl">{icon}</span>
                      <div>
                        <p className="text-3xl font-bold">{valor}</p>
                        <p className="text-sm font-medium">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vista: Citas */}
            {vista === 'citas' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Mis Citas</h1>
                  <button
                    onClick={() => setModalCita(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    + Registrar Cita
                  </button>
                </div>
                {citas.length === 0 ? (
                  <p className="text-gray-500">No tienes citas registradas.</p>
                ) : (
                  <div className="space-y-3">
                    {citas.map((c) => (
                      <div key={c.idCita} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800">{c.nombreTipoCita}</p>
                            <p className="text-sm text-gray-500">🐾 {c.nombreMascota} · 🏥 {c.nombreClinica}</p>
                            {c.comentario && <p className="text-sm text-gray-400 mt-1">{c.comentario}</p>}
                          </div>
                          <div className="flex flex-col items-end gap-2 ml-4">
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {new Date(c.fecha).toLocaleString('es-PE')}
                            </span>
                            <button
                              onClick={() => setCitaDetalle(c)}
                              className="text-xs px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                            >
                              Detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Vista: Mascotas */}
            {vista === 'mascotas' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Mis Mascotas</h1>
                  <button
                    onClick={() => setModalMascota(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    + Registrar Mascota
                  </button>
                </div>
                {mascotas.length === 0 ? (
                  <p className="text-gray-500">No tienes mascotas registradas.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mascotas.map((m) => (
                      <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-lg font-semibold text-gray-800">🐾 {m.nombMas}</p>
                        <p className="text-sm text-gray-500 mt-1">Tipo: {m.nombreTipo}</p>
                        {m.apodos && <p className="text-sm text-gray-400">Apodo: {m.apodos}</p>}
                        {m.alergias && <p className="text-sm text-red-400">Alergias: {m.alergias}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Vista: Clínicas */}
            {vista === 'clinicas' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Clínicas Disponibles</h1>
                {clinicas.length === 0 ? (
                  <p className="text-gray-500">No hay clínicas registradas.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clinicas.map((cl) => (
                      <div key={cl.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <p className="text-lg font-semibold text-gray-800">🏥 {cl.nombre}</p>
                        {cl.direccion && <p className="text-sm text-gray-500 mt-1">📍 {cl.direccion}</p>}
                        {cl.telefono && <p className="text-sm text-gray-500">📞 {cl.telefono}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {modalMascota && (
        <ModalRegistroMascota
          uid={cliente.uid}
          onClose={() => setModalMascota(false)}
          onRegistrado={(nueva) => setMascotas((prev) => [...prev, nueva])}
        />
      )}

      {citaDetalle && (
        <ModalDetalleCita
          cita={citaDetalle}
          onClose={() => setCitaDetalle(null)}
        />
      )}

      {modalCita && (
        <ModalRegistroCita
          uid={cliente.uid}
          mascotas={mascotas}
          clinicas={clinicas}
          onClose={() => setModalCita(false)}
          onRegistrado={(nueva) => setCitas((prev) => [...prev, nueva])}
        />
      )}
    </div>
  );
}
