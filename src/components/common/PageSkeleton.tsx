import { Skeleton } from "@components/ui";

interface PageSkeletonProps {
  /** Número de cards a simular */
  cards?: number;
  /** Mostrar header (título + subtítulo) */
  header?: boolean;
}

/**
 * Skeleton de página para el área main del dashboard.
 * Reemplaza el LoadingOverlay dentro de cada página.
 */
function PageSkeleton({ cards = 6, header = true }: PageSkeletonProps) {
  return (
    <div className="space-y-6 animate-pulse">
      {header && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 pt-1">
              <Skeleton className="h-8 flex-1 rounded-lg" />
              <Skeleton className="h-8 flex-1 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PageSkeleton };
