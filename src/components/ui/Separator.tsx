import { cn } from "@utils/cn.js";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
}

function Separator({
    className,
    orientation = "horizontal",
    ...props
}: SeparatorProps) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cn(
                "shrink-0 bg-gray-200",
                orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
                className
            )}
            {...props}
        />
    );
}

export { Separator };
export type { SeparatorProps };
