import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Risk Prediction",
      path: "/risk-prediction",
      icon: ShieldCheck,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handleNavigation = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed bottom-0 left-0 top-16 z-40 w-64 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800 lg:hidden">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Navigation
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            HR Management
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex h-[calc(100%-4rem)] flex-col">
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {/* Section */}
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Workspace
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-500/10 dark:text-indigo-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          size={19}
                          strokeWidth={isActive ? 2.3 : 1.9}
                        />

                        <span>{item.name}</span>
                      </div>

                      <ChevronRight
                        size={15}
                        className={`transition-transform duration-200 ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Quick Info */}
          <div className="mt-8 px-2">
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 dark:border-indigo-500/10 dark:from-indigo-500/10 dark:to-violet-500/10">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                <BarChart3 size={18} />
              </div>

              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Attrition Insights
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                Monitor workforce trends and identify employee retention
                opportunities.
              </p>

              <NavLink
                to="/analytics"
                onClick={handleNavigation}
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400"
              >
                View analytics
                <ChevronRight size={13} />
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Bottom Logout */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;