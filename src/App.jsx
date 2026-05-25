import React, { useState } from 'react';
import FormularioLogin from './components/FormularioLogin';
import FormularioRegistro from './components/FormularioRegistro';
import Dashboard from './components/Dashboard';
import { obtenerClientePorUid, registrarCliente } from './services/clienteService';

function App() {
  const [vista, setVista]       = useState('login');   // 'login' | 'registro' | 'dashboard'
  const [cliente, setCliente]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (uid) => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerClientePorUid(uid);
      setCliente(data);
      setVista('dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const data = await registrarCliente(formData);
      setCliente(data);
      setVista('dashboard');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarSesion = () => {
    setCliente(null);
    setError('');
    setVista('login');
  };

  if (vista === 'dashboard' && cliente) {
    return <Dashboard cliente={cliente} onCerrarSesion={handleCerrarSesion} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {error && (
        <div className="w-full max-w-md mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {loading && (
        <div className="text-blue-600 font-medium mb-4 animate-pulse">
          Comunicándose con el servidor...
        </div>
      )}

      {vista === 'login' && (
        <div className="w-full max-w-md">
          <FormularioLogin onSubmitLogin={handleLogin} />
          <p className="text-center text-sm text-gray-500 mt-4">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => { setVista('registro'); setError(''); }}
              className="text-blue-600 hover:underline font-medium"
            >
              Regístrate
            </button>
          </p>
        </div>
      )}

      {vista === 'registro' && (
        <div className="w-full max-w-md">
          <FormularioRegistro onSubmitRegistro={handleRegistro} />
          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => { setVista('login'); setError(''); }}
              className="text-blue-600 hover:underline font-medium"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      )}

    </div>
  );
}

export default App;
