import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm, RegisterForm } from "@components/auth";
import { Modal } from "@components/ui";
import type { RegisterFormData } from "@appTypes";
import { LoadingOverlay } from "@components/common";
import { useForgotPassword } from "@hooks/index";
import { useAuth } from "@auth/index";
import MascotasLoginImg from "@assets/MASCOTAS_login.png";

function firebaseErrorMsg(e: unknown): string {
  const msg = e instanceof Error ? e.message : "";
  if (msg.includes("email-already-in-use")) return "Este correo ya tiene una cuenta. Intenta iniciar sesión.";
  if (msg.includes("invalid-credential") || msg.includes("wrong-password")) return "Correo o contraseña incorrectos.";
  if (msg.includes("user-not-found")) return "No existe una cuenta con este correo.";
  if (msg.includes("weak-password")) return "La contraseña debe tener al menos 6 caracteres.";
  if (msg.includes("invalid-email")) return "El correo electrónico no es válido.";
  if (msg.includes("too-many-requests")) return "Demasiados intentos. Espera un momento e intenta de nuevo.";
  return msg || "Ocurrió un error inesperado.";
}

type AuthView = "login" | "register";

/* Durations & easings reutilizables */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function AuthPage() {
  const [view, setView]       = useState<AuthView>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [ready, setReady]     = useState(false);
  const forgot = useForgotPassword();

  const navigate = useNavigate();
  const { login, loginWithGoogle, register, user, cliente, isAdmin } = useAuth();

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (user && cliente) navigate(isAdmin ? "/admin" : "/inicio", { replace: true });
  }, [user, cliente, isAdmin]);

  // Early return DESPUÉS de todos los hooks
  if (user && !cliente) {
    return <LoadingOverlay fullScreen message="Iniciando sesión..." />;
  }

  const handleLogin = async (email: string, password: string) => {
    setLoading(true); setError("");
    try { await login(email, password); }
    catch (e) { setError(firebaseErrorMsg(e)); }
    finally { setLoading(false); }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true); setError("");
    try { await register(data); navigate("/inicio"); }
    catch (e) { setError(firebaseErrorMsg(e)); }
    finally { setLoading(false); }
  };

  const handleForgotPassword = () => forgot.open();

  const handleSendReset = () => forgot.send();

  const handleGoogleLogin = async () => {
    setLoading(true); setError("");
    try { await loginWithGoogle(); navigate("/inicio"); }
    catch (e) { setError(firebaseErrorMsg(e)); }
    finally { setLoading(false); }
  };

  /* ── Helpers de estilo para animaciones ── */
  const fadeUp = (delay = 0): React.CSSProperties => ({
    opacity:    ready ? 1 : 0,
    transform:  ready ? "translateY(0)"   : "translateY(24px)",
    transition: `opacity .8s ${EASE} ${delay}s, transform .8s ${EASE} ${delay}s`,
  });

  const fadeRight = (delay = 0): React.CSSProperties => ({
    opacity:    ready ? 1 : 0,
    transform:  ready ? "translateX(0)"  : "translateX(32px)",
    transition: `opacity .9s ${EASE} ${delay}s, transform .9s ${EASE} ${delay}s`,
  });

  const fadeLeft = (delay = 0): React.CSSProperties => ({
    opacity:    ready ? 1 : 0,
    transform:  ready ? "translateX(0)"  : "translateX(-32px)",
    transition: `opacity .9s ${EASE} ${delay}s, transform .9s ${EASE} ${delay}s`,
  });

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#f0f5f4]">
      {loading && <LoadingOverlay fullScreen message="Procesando..." />}

      {/* ─── Blobs de fondo ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Blob teal — arriba derecha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          className="absolute top-0 right-0 w-[70%] h-[75%]"
          preserveAspectRatio="xMaxYMin slice"
          style={fadeRight(0)}
        >
          <path fill="#2db5a3"
            d="M300,0 L800,0 L800,600 L500,600 Q250,580,200,400 Q150,250,250,150 Q350,50,300,0Z" />
        </svg>

        {/* Blob coral — cubre la mitad derecha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1100 797"
          className="absolute bottom-0 right-0 h-screen w-auto"
          preserveAspectRatio="xMaxYMax meet"
          style={fadeRight(0.1)}
        >
          <path fill="#e8735a"
            d="M 961 -1 L 1100 0 L 1100 797 L 602 796 Q 108 818 113 522 Q 156 343 324 340 Q 536 316 736 196 Z" />
        </svg>

        {/* Blob teal — abajo izquierda (detrás de los animales) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 900 800"
          className="absolute -bottom-10 -left-20 w-[45%] h-[80%]"
          preserveAspectRatio="xMinYMax meet"
          style={fadeLeft(0.15)}
        >
          <path fill="#2db5a3"
            d="M 865 748 L 842 780 L 468 781 L 190 779 Q 95 683 183 553 Q 304 430 507 456 Q 779 510 871 690 Z"/>
        </svg>

        {/* Mascotas — sobre el blob teal, alineadas al fondo */}
        <div
          className="absolute bottom-0 left-0 hidden sm:block"
          style={{
            ...fadeUp(0.25),
            width: "clamp(220px, 28vw, 380px)",
          }}
        >
          <img
            src={MascotasLoginImg}
            alt="Mascotas Suri Firuvet"
            className="w-full h-auto object-contain object-bottom"
          />
        </div>
      </div>

      {/* ─── Layout principal ─────────────────────────────────── */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">

        {/* Panel izquierdo — hero, texto en la parte superior */}
        <div
          className="hidden lg:flex lg:w-1/2 flex-col pt-[15%] px-16 xl:px-20"
          style={fadeLeft(0.1)}
        >
          <h1 className="text-7xl font-bold leading-tight mb-4">
            <span className="text-[#e8735a] block">HOLA,</span>
            <span className="text-[#2db5a3] block">BIENVENIDO</span>
          </h1>
          <p className="text-3xl text-gray-500 mt-2">
            Cuidamos de ellos como tú lo haces.
          </p>
          <p className="text-xl text-gray-500 mt-1 leading-relaxed">
            Conéctate, comparte y descubre un espacio<br />hecho para ti y tu mascota.
          </p>
        </div>

        {/* Panel derecho — formulario centrado */}
        <div
          className="flex-1 flex items-center justify-center p-5 sm:p-8"
          style={fadeUp(0.2)}
        >
          {view === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              onGoogleLogin={handleGoogleLogin}
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
      {/* ─── Modal recuperar contraseña ─────────────────────── */}
      <Modal
        isOpen={forgot.isOpen}
        onClose={forgot.close}
        title="Recuperar contraseña"
        size="sm"
      >
        {forgot.sent ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-teal-50">
              <svg className="size-7 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">¡Correo enviado!</p>
            <p className="text-sm text-gray-500">
              Revisa tu bandeja de entrada en <strong>{forgot.email}</strong> y sigue las instrucciones para restablecer tu contraseña.
            </p>
            <button
              onClick={forgot.close}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Correo electrónico</label>
              <input
                type="email"
                value={forgot.email}
                onChange={e => forgot.setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendReset()}
                placeholder="tu@correo.com"
                autoFocus
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {forgot.error && <p className="text-red-500 text-xs mt-1">{forgot.error}</p>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSendReset}
                disabled={forgot.loading || !forgot.email.trim()}
                className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {forgot.loading ? "Enviando..." : "Enviar enlace"}
              </button>
              <button
                onClick={forgot.close}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AuthPage;
