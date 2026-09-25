import {
  Activity,
  DollarSign,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import DepartmentStats from "../components/dashboard/DepartmentStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import AttritionOverview from "../components/dashboard/AttritionOverview";

export default function Dashboard() {
  const cards = [
    {
      title: "Total Employees",
      value: "20",
      change: "+8.4% from last month",
      icon: Users,
      iconClass:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    },
    {
      title: "Active Employees",
      value: "15",
      change: "+4.2% workforce growth",
      icon: UserCheck,
      iconClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      title: "Employees Left",
      value: "5",
      change: "-2.1% from previous quarter",
      icon: TrendingDown,
      iconClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    },
    {
      title: "Attrition Rate",
      value: "25%",
      change: "2.4% improvement",
      icon: Activity,
      iconClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
      title: "Average Salary",
      value: "₹72.4K",
      change: "+5.8% annual increase",
      icon: DollarSign,
      iconClass:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
      title: "Retention Rate",
      value: "75%",
      change: "+3.2% from last year",
      icon: TrendingUp,
      iconClass:
        "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Good morning, HR Admin 👋
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening across your workforce today.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <AttritionOverview />
        <DepartmentStats />
      </section>

      <section>
        <RecentActivity />
      </section>
    </motion.div>
  );
}