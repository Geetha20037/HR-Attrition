import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ageAttrition } from "../../data/analytics";

export default function AttritionByAge() {
  return (
    <ChartCard
      title="Attrition by Age Group"
      subtitle="Workforce distribution by age"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ageAttrition}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="age"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Bar
            dataKey="active"
            name="Active"
            fill="#10b981"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="left"
            name="Left"
            fill="#fb7185"
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