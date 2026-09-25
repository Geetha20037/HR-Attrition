import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { satisfactionData } from "../../data/analytics";

export default function SatisfactionChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-bold text-slate-900 dark:text-white">
        Job Satisfaction Analysis
      </h3>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Employee satisfaction distribution
      </p>

      <div className="mt-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={satisfactionData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="level"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />

            <Bar
              dataKey="employees"
              name="Employees"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}