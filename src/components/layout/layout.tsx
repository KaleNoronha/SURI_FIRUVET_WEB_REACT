import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f0f5f4]">
      <Sidebar />
      <MainView />
    </div>
  );
}

function MainView() {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <Outlet />
    </main>
  );
}
