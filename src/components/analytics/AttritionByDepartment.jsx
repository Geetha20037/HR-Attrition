import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { departmentAttrition } from "../../data/analytics";

export default function AttritionByDepartment() {
  return (
    <ChartCard
      title="Department-wise Attrition"
      subtitle="Active vs exited employees"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={departmentAttrition}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="active"
            name="Active"
            fill="#4f46e5"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="left"
            name="Left"
            fill="#f43f5e"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
      <div className="mt-5 h-[300px]">{children}</div>
    </div>
  );
}