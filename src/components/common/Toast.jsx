import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

export default function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="fixed right-4 top-4 z-[120] flex min-w-[300px] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        >
          {toast.type === "error" ? (
            <AlertCircle className="text-red-500" size={22} />
          ) : (
            <CheckCircle2 className="text-emerald-500" size={22} />
          )}

          <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            {toast.message}
          </p>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X size={17} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}