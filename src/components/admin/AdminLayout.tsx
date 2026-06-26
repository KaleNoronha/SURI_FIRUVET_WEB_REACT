import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — drawer en mobile, fijo en desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200
          lg:relative lg:translate-x-0 lg:block
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex items-center gap-3 bg-slate-100/90 backdrop-blur-sm px-4 py-3 lg:hidden border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="size-5 text-slate-600" />
          </button>
          <span className="text-sm font-bold text-slate-700">Panel Admin</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-teal-500 text-white rounded-full">
            ADMIN
          </span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-1 min-h-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
