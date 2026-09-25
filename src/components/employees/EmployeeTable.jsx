import { Eye, MoreHorizontal } from "lucide-react";
import EmptyState from "../common/EmptyState";

export default function EmployeeTable({
  employees,
  onView,
}) {
  if (!employees.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <EmptyState
          title="No employees found"
          description="Try adjusting your search or filter settings."
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              {[
                "Employee",
                "Department",
                "Job Role",
                "Salary",
                "Experience",
                "Status",
                "Action",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                        {employee.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {employee.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {employee.department}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {employee.role}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  ₹{employee.salary.toLocaleString()}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {employee.experience} yrs
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      employee.attrition === "Active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    }`}
                  >
                    {employee.attrition}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView(employee)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                      title="View employee"
                    >
                      <Eye size={17} />
                    </button>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}