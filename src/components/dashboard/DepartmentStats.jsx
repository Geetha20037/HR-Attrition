import { Building2 } from "lucide-react";

const departments = [
  { name: "Engineering", employees: 5, percentage: 25 },
  { name: "Design", employees: 4, percentage: 20 },
  { name: "Sales", employees: 4, percentage: 20 },
  { name: "Human Resources", employees: 4, percentage: 20 },
  { name: "Finance", employees: 3, percentage: 15 },
];

export default function DepartmentStats() {
  return (
    <div className="card-shadow rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Department Statistics
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Workforce distribution
          </p>
        </div>

        <Building2 size={20} className="text-indigo-500" />
      </div>

      <div className="space-y-5">
        {departments.map((department) => (
          <div key={department.name}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {department.name}
              </span>

              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {department.employees} employees
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${department.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}