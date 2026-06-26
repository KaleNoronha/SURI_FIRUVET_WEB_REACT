import { useEffect, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@utils/cn";

export type ToastType = "success" | "error" | "warning";

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

// ─── Singleton store ─────────────────────────────────────────
type Listener = (toasts: ToastMessage[]) => void;
let _toasts: ToastMessage[] = [];
let _counter = 0;
const _listeners = new Set<Listener>();

function notify() {
  _listeners.forEach(l => l([..._toasts]));
}

export const toast = {
  success: (message: string) => addToast("success", message),
  error:   (message: string) => addToast("error",   message),
  warning: (message: string) => addToast("warning", message),
};

function addToast(type: ToastType, message: string) {
  const id = ++_counter;
  _toasts = [..._toasts, { id, type, message }];
  notify();
  // Auto-dismiss after 4s
  setTimeout(() => {
    _toasts = _toasts.filter(t => t.id !== id);
    notify();
  }, 4000);
}

// ─── Component ───────────────────────────────────────────────
const ICONS = {
  success: <CheckCircle className="size-5 text-green-500 shrink-0" />,
  error:   <XCircle    className="size-5 text-red-500   shrink-0" />,
  warning: <AlertTriangle className="size-5 text-yellow-500 shrink-0" />,
};

const COLORS: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50",
  error:   "border-red-200   bg-red-50",
  warning: "border-yellow-200 bg-yellow-50",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    _listeners.add(setToasts);
    return () => { _listeners.delete(setToasts); };
  }, []);

  const dismiss = useCallback((id: number) => {
    _toasts = _toasts.filter(t => t.id !== id);
    notify();
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(t => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-md text-sm",
            "animate-[fadeSlideUp_0.25s_ease]",
            COLORS[t.type]
          )}
        >
          {ICONS[t.type]}
          <p className="flex-1 text-slate-700">{t.message}</p>
          <button onClick={() => dismiss(t.id)} className="text-slate-400 hover:text-slate-600">
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
