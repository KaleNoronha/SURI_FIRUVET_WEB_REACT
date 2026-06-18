import { cn } from "@utils/cn.js";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
    message: string;
    className?: string;
}

/**
 * Muestra un mensaje de error con icono y estilo visual de alerta.
 * Basado en el patrón de Alert de shadcn/ui adaptado al proyecto.
 */
function ErrorMessage({ message, className }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className={cn(
                "flex items-start gap-3 w-full rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700",
                className
            )}
        >
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
            <p className="font-medium">{message}</p>
        </div>
    );
}

export { ErrorMessage };
export type { ErrorMessageProps };
