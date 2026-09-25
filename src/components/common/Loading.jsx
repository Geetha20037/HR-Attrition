import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30"
        >
          <BrainCircuit size={32} />
        </motion.div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          PeoplePulse
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Preparing HR analytics...
        </p>

        <div className="mx-auto mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="h-full w-1/2 rounded-full bg-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}