import { cn } from "@utils/cn.js";
import { Button } from "@components/ui/Button.js";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "default";
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Diálogo de confirmación accesible.
 * Usa el patrón de Dialog de shadcn/ui simplificado sin radix (no tienes la dependencia).
 * Para producción se recomienda agregar radix-ui/dialog para manejo de focus trap.
 */
function ConfirmDialog({
    open,
    title = "¿Estás seguro?",
    description = "Esta acción no se puede deshacer.",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = "default",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 animate-in fade-in-0"
                onClick={onCancel}
                aria-hidden="true"
            />

            {/* Content */}
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-description"
                className="relative z-50 w-full max-w-md rounded-lg border bg-white p-6 shadow-lg animate-in zoom-in-95"
            >
                <div className="flex items-start gap-4">
                    {variant === "danger" && (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="size-5 text-red-600" />
                        </div>
                    )}
                    <div className="space-y-2">
                        <h2 id="confirm-title" className="text-lg font-semibold">
                            {title}
                        </h2>
                        <p id="confirm-description" className="text-sm text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={variant === "danger" ? "destructive" : "default"}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { ConfirmDialog };
export type { ConfirmDialogProps };
