import { cn } from "@utils/cn.js";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors outline-none placeholder:text-gray-400 disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
