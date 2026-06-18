import type { RouteObject } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { AuthPage, InicioPage } from "@pages/index";
import { Layout } from "@components/layout";

// Placeholder temporal hasta que crees los componentes reales
function Placeholder({ name }: { name: string }) {
    return (
        <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">{name}</p>
            <p className="text-sm">Componente pendiente</p>
        </div>
    );
}

export const routes: RouteObject[] = [
    // ─── REDIRECT: "/" siempre va a /login ─────────────────────
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },

    // ─── RUTAS PÚBLICAS ────────────────────────────────────────
    {
        path: "/login",
        element: <AuthPage />,
    },

    // ─── RUTAS PROTEGIDAS (DashboardLayout) ────────────────────
    {
        element: <Layout />,
        children: [
            {
                path: "/inicio",
                element: <InicioPage />,
            },
            {
                path: "/citas",
                element: <Placeholder name="CitasPage" />,
            },
            {
                path: "/mascotas",
                element: <Placeholder name="MascotasPage" />,
            },
            {
                path: "/clinicas",
                element: <Placeholder name="ClinicasPage" />,
            },
        ],
    },
];
