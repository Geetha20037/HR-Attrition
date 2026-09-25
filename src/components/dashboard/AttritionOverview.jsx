import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyAttrition } from "../../data/analytics";

export default function AttritionOverview() {
  return (
    <div className="card-shadow rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Attrition Overview
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Monthly attrition trend
          </p>
        </div>

        <div className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          12 Months
        </div>
      </div>

      <div className="h-[310px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyAttrition}>
            <defs>
              <linearGradient id="attritionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              unit="%"
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(15,23,42,.08)",
              }}
              formatter={(value) => [`${value}%`, "Attrition"]}
            />

            <Area
              type="monotone"
              dataKey="attrition"
              stroke="#4f46e5"
              strokeWidth={3}
              fill="url(#attritionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}