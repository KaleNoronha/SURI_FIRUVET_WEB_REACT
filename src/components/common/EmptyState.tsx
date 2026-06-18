import { cn } from "@utils/cn.js";
import { InboxIcon } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

/**
 * Estado vacío para listas o secciones sin datos.
 * Basado en el componente Empty de shadcn/ui.
 */
function EmptyState({
    title = "Sin resultados",
    description = "No hay datos para mostrar.",
    icon,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 p-8 text-center",
                className
            )}
        >
            <div className="flex size-12 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                {icon ?? <InboxIcon className="size-6" />}
            </div>
            <div className="space-y-1">
                <p className="text-base font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}

export { EmptyState };
export type { EmptyStateProps };
