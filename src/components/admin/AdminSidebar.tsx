import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, PawPrint, Calendar, ScrollText, LogOut, ChevronLeft, X } from "lucide-react";
import { useAuth } from "@auth/index";
import LogoImg from "@assets/Logo.jpeg";

const navItems = [
  { to: "/admin",          label: "Dashboard",  icon: LayoutDashboard, end: true  as const },
  { to: "/admin/clientes", label: "Clientes",   icon: Users,           end: false as const },
  { to: "/admin/mascotas", label: "Mascotas",   icon: PawPrint,        end: false as const },
  { to: "/admin/citas",    label: "Citas",      icon: Calendar,        end: false as const },
  { to: "/admin/logs",     label: "Auditoría",  icon: ScrollText,      end: false as const },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col h-full min-h-screen bg-slate-900 text-white">
      {/* Logo + badge */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-teal-500 shrink-0">
          <img src={LogoImg} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-none truncate">Suri Firuvet</p>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-teal-500 rounded-full mt-1 inline-block">
            ADMIN
          </span>
        </div>
        {/* Cerrar en mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-700 transition-colors lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="size-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-700 space-y-1">
        <button
          onClick={() => { onClose?.(); navigate("/inicio"); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ChevronLeft className="size-4 shrink-0" />
          Volver al app
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="size-4 shrink-0" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
