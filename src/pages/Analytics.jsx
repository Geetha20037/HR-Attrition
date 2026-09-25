import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/common/StatCard";
import AttritionByDepartment from "../components/analytics/AttritionByDepartment";
import AttritionByAge from "../components/analytics/AttritionByAge";
import AttritionByRole from "../components/analytics/AttritionByRole";
import AttritionBySalary from "../components/analytics/AttritionBySalary";
import SatisfactionChart from "../components/analytics/SatisfactionChart";

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Overall Attrition"
          value="25%"
          change="Current workforce"
          icon={Activity}
        />

        <StatCard
          title="High Risk Employees"
          value="4"
          change="Needs attention"
          icon={AlertTriangle}
          iconClass="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
        />

        <StatCard
          title="Retention Rate"
          value="75%"
          change="Active workforce"
          icon={ShieldCheck}
          iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        />

        <StatCard
          title="Analyzed Employees"
          value="20"
          change="Current dataset"
          icon={Users}
          iconClass="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AttritionByDepartment />
        <AttritionByAge />
        <AttritionByRole />
        <AttritionBySalary />
      </div>

      <SatisfactionChart />
    </motion.div>
  );
}