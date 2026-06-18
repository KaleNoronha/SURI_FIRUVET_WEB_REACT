import { useNavigate } from "react-router-dom";
import { PawPrint, Stethoscope, Syringe, Pill, LayoutDashboard, MapPin, CalendarPlus, Search, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { PageHeader } from "@components/common/PageHeader";
import { StatCard, QuickAccessCard, HistorialItem } from "@components/inicio";

// ─── MOCK DATA ─────────────────────────────────────────────
const stats = [
  { title: "Pacientes\ndel día", value: 10, icon: <PawPrint className="size-6" />, statusLabel: "Disponibilidad", statusColor: "green" as const },
  { title: "Médicos\ndisponibles", value: 5, icon: <Stethoscope className="size-6" />, statusLabel: "Disponibilidad", statusColor: "green" as const },
  { title: "Control\nde vacunas", value: 3, icon: <Syringe className="size-6" />, statusLabel: "Proceso", statusColor: "yellow" as const },
  { title: "Farmacia", value: "", icon: <Pill className="size-6" />, statusLabel: "Disponibilidad", statusColor: "green" as const },
];

const historial = [
  { titulo: "Consulta general", hora: "10:00 AM", fecha: "20 Mayo 2026" },
  { titulo: "Control de vacunas", hora: "9:00 AM", fecha: "12 Abril 2026" },
  { titulo: "Desparasitación", hora: "3:00 PM", fecha: "5 Marzo 2026" },
];

function InicioPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header con búsqueda y avatar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">¡Hola, User!</h1>
          <p className="text-gray-500 mt-1">Nuevo día cuidando las vidas de los engreídos de casa.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center">
            <User className="size-5 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            statusLabel={stat.statusLabel}
            statusColor={stat.statusColor}
          />
        ))}
      </div>

      {/* Acceso rápido */}
      <div>
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-4 italic">Acceso rápido</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAccessCard
            label="Dashboard"
            icon={<LayoutDashboard className="size-6" />}
            onClick={() => navigate("/inicio")}
          />
          <QuickAccessCard
            label="Registrar Mascotas"
            icon={<PawPrint className="size-6" />}
            onClick={() => navigate("/mascotas")}
          />
          <QuickAccessCard
            label="Registrar Citas"
            icon={<CalendarPlus className="size-6" />}
            onClick={() => navigate("/citas")}
          />
          <QuickAccessCard
            label="Ubicación"
            icon={<MapPin className="size-6" />}
            onClick={() => navigate("/clinicas")}
          />
        </div>
      </div>

      {/* Historial de atención */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Historial de atención</CardTitle>
          <Button variant="link" className="text-teal-600 p-0 h-auto text-sm">
            Ver todas
          </Button>
        </CardHeader>
        <CardContent>
          {historial.map((item) => (
            <HistorialItem
              key={item.titulo + item.fecha}
              titulo={item.titulo}
              hora={item.hora}
              fecha={item.fecha}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default InicioPage;
