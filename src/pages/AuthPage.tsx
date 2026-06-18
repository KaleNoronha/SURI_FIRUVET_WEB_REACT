import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm, RegisterForm } from "@components/auth";
import type { RegisterFormData } from "@appTypes";
import { LoadingOverlay } from "@components/common";


// TODO: Importar funciones de Firebase Auth cuando se configure
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@auth/firebase";

type AuthView = "login" | "register";

function AuthPage() {
  const [view, setView] = useState<AuthView>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      // TODO: Implementar con Firebase Auth
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const uid = userCredential.user.uid;
      // const cliente = await obtenerClientePorUid(uid);
      // localStorage.setItem("cliente", JSON.stringify(cliente));

      console.log("Login con:", email, password);
      navigate("/inicio");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al iniciar sesión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    setError("");
    try {
      // TODO: Implementar con Firebase Auth
      // const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      // const uid = userCredential.user.uid;
      // await registrarCliente({ ...data, uid });
      // localStorage.setItem("cliente", JSON.stringify({ ...data, uid }));

      console.log("Registro con:", data);
      navigate("/inicio");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al registrar";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implementar con Firebase Auth
    // await sendPasswordResetEmail(auth, email);
    console.log("Recuperar contraseña");
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#f0f5f4]">
      {loading && <LoadingOverlay fullScreen message="Procesando..." />}

      {/* Fondo decorativo — SVG blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#f0f5f4]" />

        {/* Blob TEAL — desde arriba-centro hacia arriba-derecha */}
        <svg className="absolute top-0 right-0 w-[70%] h-[75%]" viewBox="0 0 800 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2db5a3" d="M300,0 L800,0 L800,600 L500,600 Q250,580,200,400 Q150,250,250,150 Q350,50,300,0Z" />
        </svg>

        {/* Blob CORAL — coordenadas del editor, viewBox 0 0 1100 797 */}
        <svg className="absolute bottom-0 right-0  h-screen" viewBox="0 0 1100 797" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#e8735a" d="M 961 -1 L 1100 0 L 1100 797 L 602 796 Q 108 818 113 522 Q 156 343 324 340 Q 536 316 736 196 Z" />
        </svg>

        <svg className="absolute -bottom-20 -left-35 w-[45%] h-[90%]" viewBox="0 0 900 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2db5a3" d="M 865 748 L 842 780 L 468 781 L 190 779 Q 95 683 183 553 Q 304 430 507 456 Q 779 510 871 690 Z"/>
        </svg>

      <img src="src\assets\MASCOTAS_login.png" alt=""  className="absolute bottom-0 left-10 w-[25%] h-[40%]"/>

      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row">

        {/* Panel izquierdo — Texto hero (fondo claro) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col mt-25 p-16">
          <h1 className="text-7xl font-bold  leading-tight mb-4">
            <span className="text-[#e8735a]">HOLA,</span>
            <br />
            <span className="text-[#2db5a3]">BIENVENIDO</span>
          </h1>
          <p className="text-3xl  text-gray-500 mt-2">
            Cuidamos de ellos como tú lo haces.
          </p>
          <p className="text-xl text-gray-500 mt-1">
            Conéctate, comparte y descubre un espacio<br />hecho para ti y tu mascota.
          </p>
        </div>

        {/* Panel derecho — Formulario flota sobre los blobs */}
        <div className="flex-1 flex items-center justify-center p-6">
          {view === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              onSwitchToRegister={() => { setView("register"); setError(""); }}
              onForgotPassword={handleForgotPassword}
              error={error}
            />
          )}
          {view === "register" && (
            <RegisterForm
              onSubmit={handleRegister}
              onSwitchToLogin={() => { setView("login"); setError(""); }}
              error={error}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
