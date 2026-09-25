import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/common/Toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [toast, setToast] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    const result = login(email, password, remember);

    if (!result.success) {
      setToast({
        type: "error",
        message: result.message,
      });

      return;
    }

    setToast({
      type: "success",
      message: "Welcome back! Opening dashboard...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

      <div className="grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-violet-300/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <BrainCircuit size={24} />
              </div>

              <div>
                <p className="font-bold">PeoplePulse</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-indigo-200">
                  HR Intelligence
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Workforce Intelligence
            </p>

            <h1 className="mt-5 text-5xl font-black leading-[1.08]">
              Make smarter decisions with your people data.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-indigo-100">
              Monitor employee health, explore attrition patterns and
              identify workforce risks through a unified HR analytics
              workspace.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <Feature icon={Users} value="20+" label="Employees" />
              <Feature icon={ShieldCheck} value="75%" label="Retention" />
              <Feature icon={BrainCircuit} value="AI UI" label="Prediction" />
            </div>
          </div>

          <p className="relative text-xs text-indigo-200">
            © 2026 PeoplePulse HR Intelligence
          </p>
        </div>

        <div className="flex items-center justify-center p-5 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <BrainCircuit size={24} />
                </div>

                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    PeoplePulse
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400">
                    HR Intelligence
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Sign in to access your HR dashboard.
                </p>
              </div>

              {!forgot ? (
                <form onSubmit={submit} className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-300">
                      Email Address
                    </span>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@company.com"
                        required
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Password
                      </span>

                      <button
                        type="button"
                        onClick={() => setForgot(true)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 accent-indigo-600"
                    />

                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Remember me
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                  >
                    Sign In
                    <ArrowRight size={17} />
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    Demo login accepts any valid email and a password with
                    at least 6 characters.
                  </p>
                </form>
              ) : (
                <div>
                  <div className="rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-500/10">
                    <Mail
                      className="text-indigo-600 dark:text-indigo-400"
                      size={24}
                    />

                    <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                      Reset your password
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Enter your registered email address and we'll show
                      the password reset confirmation UI.
                    </p>
                  </div>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="mt-5 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />

                  <button
                    onClick={() => {
                      setForgot(false);
                      setToast({
                        type: "success",
                        message: "Password reset request submitted.",
                      });
                    }}
                    className="mt-4 h-12 w-full rounded-xl bg-indigo-600 text-sm font-bold text-white"
                  >
                    Send Reset Link
                  </button>

                  <button
                    onClick={() => setForgot(false)}
                    className="mt-3 w-full text-sm font-semibold text-slate-500"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <Icon size={19} />
      <p className="mt-3 text-xl font-black">{value}</p>
      <p className="mt-1 text-xs text-indigo-200">{label}</p>
    </div>
  );
}