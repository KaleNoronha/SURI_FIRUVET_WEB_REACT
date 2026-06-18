import { cn } from "@utils/cn.js";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

/**
 * Encabezado reutilizable para las páginas del dashboard.
 * Incluye título, descripción opcional y slot para acción (botón, etc).
 */
function PageHeader({ title, description, action, className }: PageHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between gap-4", className)}>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

export { PageHeader };
export type { PageHeaderProps };
