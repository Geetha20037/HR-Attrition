import { useEffect, useState } from "react";
import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Users,
} from "lucide-react";

const HRLoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(
    "Initializing workforce data..."
  );

  useEffect(() => {
    const phases = [
      {
        value: 20,
        text: "Initializing workforce data...",
      },
      {
        value: 42,
        text: "Analyzing employee records...",
      },
      {
        value: 64,
        text: "Calculating attrition patterns...",
      },
      {
        value: 82,
        text: "Preparing risk intelligence...",
      },
      {
        value: 100,
        text: "HR dashboard ready",
      },
    ];

    let current = 0;

    const interval = setInterval(() => {
      current += 1;

      setProgress(current);

      const activePhase =
        phases.find(
          (item) => current <= item.value
        ) || phases[phases.length - 1];

      setPhase(activePhase.text);

      if (current >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete?.();
        }, 700);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 shadow-2xl shadow-indigo-500/20">
            <BrainCircuit
              size={32}
              className="animate-pulse text-indigo-400"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            HR Intelligence
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Workforce Analytics Platform
          </p>
        </div>

        <div className="relative mx-auto mb-10 h-32 w-72">
          <div className="absolute left-1/2 top-1/2 h-px w-52 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

          <div className="absolute left-1/2 top-1/2 h-52 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-400/50 to-transparent" />

          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 shadow-xl shadow-indigo-500/20">
            <BarChart3
              size={26}
              className="text-indigo-400"
            />
          </div>

          <div className="absolute left-4 top-2 flex h-10 w-10 animate-bounce items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 [animation-duration:2s]">
            <Users
              size={18}
              className="text-emerald-400"
            />
          </div>

          <div className="absolute right-4 top-2 flex h-10 w-10 animate-bounce items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 [animation-delay:300ms] [animation-duration:2.2s]">
            <Users
              size={18}
              className="text-violet-400"
            />
          </div>

          <div className="absolute bottom-2 left-20 flex h-10 w-10 animate-bounce items-center justify-center rounded-xl border border-amber-400/20 bg-amber-500/10 [animation-delay:500ms] [animation-duration:2.1s]">
            <Users
              size={18}
              className="text-amber-400"
            />
          </div>

          <div className="absolute bottom-2 right-20 flex h-10 w-10 animate-bounce items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 [animation-delay:700ms] [animation-duration:2.3s]">
            <Users
              size={18}
              className="text-cyan-400"
            />
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">
                {phase}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Building your workforce insights
              </p>
            </div>

            <span className="text-2xl font-bold tabular-nums text-indigo-400">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-y-0 right-0 w-16 animate-pulse bg-white/30 blur-sm" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            {progress >= 100 ? (
              <>
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />
                Dashboard initialized successfully
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
                Secure workforce data processing
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRLoadingScreen;
