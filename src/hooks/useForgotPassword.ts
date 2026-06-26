import { useState } from "react";
import { useAuth } from "@auth/index";

export function useForgotPassword() {
  const { resetPassword } = useAuth();
  const [isOpen, setIsOpen]     = useState(false);
  const [email, setEmail]       = useState("");
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const open = () => { setEmail(""); setSent(false); setError(""); setIsOpen(true); };
  const close = () => setIsOpen(false);

  const send = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al enviar correo");
    } finally {
      setLoading(false);
    }
  };

  return { isOpen, email, setEmail, sent, loading, error, open, close, send };
}
