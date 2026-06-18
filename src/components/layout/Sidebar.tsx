import { NavLink, useNavigate } from "react-router-dom";
import { Home, Calendar, PawPrint, Building2, LogOut } from "lucide-react";
import { Button } from "@components/ui/Button";

const navItems = [
  { to: "/inicio", label: "INICIO", icon: Home },
  { to: "/citas", label: "CITAS", icon: Calendar },
  { to: "/mascotas", label: "MASCOTAS", icon: PawPrint },
  { to: "/clinicas", label: "CLINICAS", icon: Building2 },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Firebase signOut + limpiar localStorage
    localStorage.removeItem("cliente");
    navigate("/login");
  };

  return (
    <aside className="flex flex-col w-[20%] min-h-screen rounded-4xl bg-teal-600 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center p-6">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
          <PawPrint className="size-10 text-white" />
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-3xl text-lg font-bold transition-colors ${
                isActive
                  ? "bg-[#e8735a] text-white shadow-md"
                  : "text-white/90 hover:bg-white/10"
              }`
            }
          >
            <Icon className="size-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Cerrar sesión */}
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-white hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-5" />
          CERRAR SESIÓN
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
