import { cn } from "@utils/cn.js";
import { Spinner } from "@components/ui/Spinner.js";

interface LoadingOverlayProps {
    message?: string;
    className?: string;
    fullScreen?: boolean;
}

/**
 * Overlay de carga para operaciones asíncronas.
 * fullScreen=true cubre toda la pantalla, de lo contrario es relativo al contenedor.
 */
function LoadingOverlay({
    message = "Cargando...",
    className,
    fullScreen = false,
}: LoadingOverlayProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3",
                fullScreen
                    ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
                    : "absolute inset-0 bg-white/60",
                className
            )}
        >
            <Spinner size="lg" />
            {message && (
                <p className="text-sm font-medium text-gray-600 animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
}

export { LoadingOverlay };
export type { LoadingOverlayProps };
