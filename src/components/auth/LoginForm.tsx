import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button, Input, Label ,Spinner} from "@components/ui";
import { ErrorMessage } from "@components/common";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onForgotPassword?: () => void;
  loading?: boolean;
  error?: string;
}

function LoginForm({
  onSubmit,
  onSwitchToRegister,
  onForgotPassword,
  loading = false,
  error,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-center text-lg font-bold text-gray-800 mb-6 tracking-wide">
        INICIA SESIÓN EN TU CUENTA
      </h2>

      {error && <ErrorMessage message={error} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="login-email" className="sr-only">
            Correo electrónico
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              id="login-email"
              type="email"
              placeholder="CORREO ELECTRÓNICO"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="login-password" className="sr-only">
            Contraseña
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        {onForgotPassword && (
          <div className="text-right">
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={onForgotPassword}
              className="text-xs text-teal-600 p-0 h-auto"
            >
              ¿OLVIDASTE TU CONTRASEÑA?
            </Button>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 rounded-full"
        >
          {loading ? <Spinner size="sm" className="text-white" /> : "INICIAR SESIÓN"}
        </Button>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-400">O</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Switch to register */}
        <Button
          type="button"
          variant="outline"
          onClick={onSwitchToRegister}
          className="w-full py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full"
        >
          REGISTRARSE
        </Button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-4 ">
        Al continuar aceptas nuestros{" "}
        <a href="#" className="text-teal-600 font-medium underline">
          Términos y condiciones
        </a>
        <th/>
        <a className="mt-20">
        &copy; 2018-2026 Inscode 
        </a>
      </p>
    </div>
  );
}

export default LoginForm;
