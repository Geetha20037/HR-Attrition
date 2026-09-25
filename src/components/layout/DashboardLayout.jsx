import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Fixed Navbar */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Fixed Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Scrollable Area */}
      <main className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto overflow-x-hidden scroll-smooth lg:left-64">
        <div className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;