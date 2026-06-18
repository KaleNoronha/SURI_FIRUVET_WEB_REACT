import { cn } from "@utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  statusLabel?: string;
  statusColor?: "green" | "yellow" | "red";
  className?: string;
}

function StatCard({ title, value, icon, statusLabel, statusColor = "green", className }: StatCardProps) {
  const statusColors = {
    green: "bg-teal-600",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className={cn("flex flex-col justify-between bg-teal-50 border border-teal-100 rounded-xl p-5 min-w-[160px]", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold text-teal-700">{value}</p>
          <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
        </div>
        <div className="text-teal-600">{icon}</div>
      </div>
      {statusLabel && (
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full", statusColors[statusColor])} style={{ width: "70%" }} />
            </div>
            <span className="text-xs text-gray-500">{statusLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatCard;
