import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function RiskResult({ result }) {
  if (!result) {
    return (
      <div className="flex h-full min-h-[430px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <ShieldAlert size={30} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
          Risk assessment ready
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          Enter employee information on the left and submit the form to
          generate a mock attrition risk prediction.
        </p>
      </div>
    );
  }

  const config = {
    Low: {
      icon: CheckCircle2,
      background:
        "bg-emerald-50 dark:bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    Medium: {
      icon: AlertTriangle,
      background:
        "bg-amber-50 dark:bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
    },
    High: {
      icon: ShieldAlert,
      background:
        "bg-rose-50 dark:bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-400",
    },
  };

  const style = config[result.level];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="text-center">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${style.background} ${style.text}`}
        >
          <Icon size={38} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Attrition Risk
        </p>

        <h2 className={`mt-2 text-3xl font-black ${style.text}`}>
          {result.level} Risk
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Mock prediction based on submitted employee attributes.
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Risk probability
          </span>

          <span className={`text-sm font-bold ${style.text}`}>
            {result.percentage}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.percentage}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full rounded-full ${
              result.level === "High"
                ? "bg-rose-500"
                : result.level === "Medium"
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
          />
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Assessment Summary
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {result.message}
        </p>
      </div>
    </motion.div>
  );
}