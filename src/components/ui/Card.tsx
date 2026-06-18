import { cn } from "@utils/cn.js";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex flex-col gap-6 rounded-xl border bg-white py-6 text-gray-900 shadow-sm",
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("grid auto-rows-min gap-2 px-6", className)}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("leading-none font-semibold text-lg", className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("text-sm text-gray-500", className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("px-6", className)} {...props} />
    );
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex items-center px-6", className)}
            {...props}
        />
    );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
