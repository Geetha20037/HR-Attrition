import { useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "attrition",
      title: "New attrition record",
      description: "An employee status was recently updated.",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "analytics",
      title: "Analytics report ready",
      description: "Your latest workforce report is available.",
      time: "20 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "risk",
      title: "Risk review required",
      description: "Review employees with elevated risk.",
      time: "1 hour ago",
      unread: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      navigate("/employees");
      return;
    }

    navigate(`/employees?search=${encodeURIComponent(value)}`);
  };

  const handleLogout = () => {
    setShowProfile(false);
    logout();
    navigate("/login");
  };

  const handleProfile = () => {
    setShowProfile(false);
    navigate("/settings");
  };

  const markNotificationAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    setShowNotifications(false);

    if (notification.type === "attrition") {
      navigate("/employees");
    }

    if (notification.type === "analytics") {
      navigate("/analytics");
    }

    if (notification.type === "risk") {
      navigate("/risk-prediction");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] h-16 border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex h-full items-center justify-between px-3 sm:px-5 lg:px-7">

        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400 lg:hidden"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {/* LOGO */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20">
              HR
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                HR Analytics
              </p>

              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Workforce Intelligence
              </p>
            </div>
          </button>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="mx-4 hidden max-w-lg flex-1 md:block"
        >
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search employees..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-900"
            />
          </div>
        </form>

        {/* RIGHT */}
        <div className="flex items-center gap-1.5">

          {/* MOBILE SEARCH */}
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400 md:hidden"
            aria-label="Search employees"
          >
            <Search size={19} />
          </button>

          {/* THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowProfile(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
              aria-label="Notifications"
            >
              <Bell size={19} />

              {unreadCount > 0 && (
                <span className="absolute right-2.5 top-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
              )}
            </button>

            {/* NOTIFICATION DROPDOWN */}
            {showNotifications && (
              <div className="absolute right-0 top-12 z-[110] w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">

                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Notifications
                    </h3>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {unreadCount > 0
                        ? `${unreadCount} unread notification${
                            unreadCount > 1 ? "s" : ""
                          }`
                        : "All caught up"}
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                {/* LIST */}
                <div className="max-h-[360px] overflow-y-auto">

                  {notifications.map((notification) => {
                    const isUnread = notification.unread;

                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          handleNotificationClick(notification)
                        }
                        className={`flex w-full gap-3 border-b border-slate-100 p-4 text-left transition dark:border-slate-800 ${
                          isUnread
                            ? "bg-indigo-50/50 hover:bg-indigo-50 dark:bg-indigo-500/5 dark:hover:bg-indigo-500/10"
                            : "bg-white opacity-70 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            notification.type === "attrition"
                              ? "bg-red-50 text-red-500 dark:bg-red-500/10"
                              : notification.type === "analytics"
                              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                              : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                          }`}
                        >
                          {notification.type === "attrition" && (
                            <Bell size={15} />
                          )}

                          {notification.type === "analytics" && (
                            <Settings size={15} />
                          )}

                          {notification.type === "risk" && (
                            <User size={15} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-xs ${
                                isUnread
                                  ? "font-bold text-slate-900 dark:text-white"
                                  : "font-semibold text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {notification.title}
                            </p>

                            {isUnread && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                            )}
                          </div>

                          <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                            {notification.description}
                          </p>

                          <p className="mt-1 text-[10px] text-slate-400">
                            {notification.time}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* FOOTER */}
                <div className="border-t border-slate-100 dark:border-slate-800">
                  {unreadCount > 0 ? (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="flex w-full items-center justify-center gap-2 py-3 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                    >
                      <Check size={14} />
                      Mark all as read
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 py-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <Check size={14} />
                      All notifications read
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* DIVIDER */}
          <div className="mx-1 hidden h-8 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

          {/* PROFILE */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfile((prev) => !prev);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                GP
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Geetha Priya
                </p>

                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  HR Administrator
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`hidden text-slate-400 transition-transform lg:block ${
                  showProfile ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* PROFILE DROPDOWN */}
            {showProfile && (
              <div className="absolute right-0 top-12 z-[110] w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Geetha Priya
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    HR Administrator
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleProfile}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <User size={17} />
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Settings size={17} />
                  Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
