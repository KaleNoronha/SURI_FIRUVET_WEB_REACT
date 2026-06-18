import { cn } from "@utils/cn";

interface QuickAccessCardProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function QuickAccessCard({ label, icon, onClick, className }: QuickAccessCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl bg-teal-50 border border-teal-100 hover:bg-teal-100 transition-colors cursor-pointer min-w-[120px]",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-teal-600 flex items-center justify-center text-white">
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-700 text-center uppercase">{label}</span>
    </button>
  );
}

export default QuickAccessCard;
