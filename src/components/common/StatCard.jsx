import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconClass = "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card-shadow rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>

          {change && (
            <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {change}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}