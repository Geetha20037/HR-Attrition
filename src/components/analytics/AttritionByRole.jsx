import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { roleAttrition } from "../../data/analytics";

export default function AttritionByRole() {
  return (
    <ChartCard
      title="Attrition by Job Role"
      subtitle="Employees across major role categories"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={roleAttrition} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="role"
            width={85}
            tick={{ fontSize: 10 }}
          />
          <Tooltip />
          <Bar
            dataKey="active"
            name="Active"
            fill="#6366f1"
            radius={[0, 5, 5, 0]}
          />
          <Bar
            dataKey="left"
            name="Left"
            fill="#fb7185"
            radius={[0, 5, 5, 0]}
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