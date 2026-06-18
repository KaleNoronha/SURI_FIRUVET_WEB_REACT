import { Loader2 } from "lucide-react";
import { cn } from "@utils/cn.js";

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label="Cargando"
      className={cn("animate-spin text-gray-500", sizeMap[size], className)}
      {...props}
    />
  );
}

export { Spinner };
export type { SpinnerProps };
