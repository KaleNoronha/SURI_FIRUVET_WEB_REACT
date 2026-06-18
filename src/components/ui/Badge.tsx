import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils/cn.js";

const badgeVariants = cva(
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors",
    {
        variants: {
            variant: {
                default: "bg-blue-600 text-white",
                secondary: "bg-gray-100 text-gray-900",
                destructive: "bg-red-600 text-white",
                outline: "border-gray-300 text-gray-700",
                success: "bg-green-600 text-white",
                warning: "bg-yellow-500 text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
export type { BadgeProps };
