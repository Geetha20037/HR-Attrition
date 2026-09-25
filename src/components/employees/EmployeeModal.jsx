
import {
  Mail,
  MapPin,
  Phone,
  UserRound,
  Briefcase,
  CalendarDays,
} from "lucide-react";
import Modal from "../common/Modal";

export default function EmployeeModal({ employee, open, onClose }) {
  if (!employee) return null;

  const isActive =
    employee.attrition === "No" ||
    employee.attrition === "Active";

  const performance =
    employee.performance ?? employee.performanceRating ?? 0;

  const satisfaction =
    employee.satisfaction ?? employee.jobSatisfaction ?? 0;

  const workLifeBalance = employee.workLifeBalance ?? 0;

  const initials =
    employee.name
      ?.split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NA";

  const salary = Number(employee.salary || 0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Employee Details"
      size="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center dark:bg-slate-800/60">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-bold text-white shadow-lg shadow-indigo-600/20">
            {initials}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-xl font-bold text-slate-900 dark:text-white">
              {employee.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {employee.role || "Not specified"} ·{" "}
              {employee.department || "Not specified"}
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
              }`}
            >
              {isActive ? "Active" : "Employees Who Left"}
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
            Contact Information
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem
              icon={UserRound}
              label="Employee ID"
              value={employee.id || "Not available"}
            />

            <InfoItem
              icon={Mail}
              label="Email"
              value={employee.email || "Not available"}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={employee.phone || "Not available"}
            />

            <InfoItem
              icon={MapPin}
              label="Location"
              value={employee.location || "Not available"}
            />
          </div>
        </div>

        {/* Employment Information */}
        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
            Employment Information
          </h4>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric
              icon={UserRound}
              label="Age"
              value={
                employee.age
                  ? `${employee.age} yrs`
                  : "N/A"
              }
            />

            <Metric
              icon={Briefcase}
              label="Experience"
              value={
                employee.experience !== undefined
                  ? `${employee.experience} yrs`
                  : "N/A"
              }
            />

            <Metric
              label="Salary"
              value={
                salary
                  ? `₹${salary.toLocaleString("en-IN")}`
                  : "N/A"
              }
            />

            <Metric
              label="Performance"
              value={`${performance}/5`}
            />
          </div>
        </div>

        {/* Workplace Indicators */}
        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
            Workplace Indicators
          </h4>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Metric
              label="Satisfaction"
              value={`${satisfaction}/5`}
            />

            <Metric
              label="Work-Life Balance"
              value={`${workLifeBalance}/5`}
            />

            <Metric
              label="Overtime"
              value={employee.overtime || "Not specified"}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
            Additional Details
          </h4>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Metric
              label="Job Level"
              value={employee.jobLevel || "Not specified"}
            />

            <Metric
              label="Gender"
              value={employee.gender || "Not specified"}
            />

            <Metric
              icon={CalendarDays}
              label="Join Date"
              value={employee.joinDate || "Not available"}
            />
          </div>
        </div>

        {/* Attrition Status */}
        <div
          className={`rounded-2xl border p-4 ${
            isActive
              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
              : "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/10"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                Attrition Status
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                {isActive
                  ? "Currently Active"
                  : "Employee Has Left"}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                isActive
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
              }`}
            >
              {isActive ? "✓" : "!"}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-indigo-200 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Icon size={14} />
        {label}
      </div>

      <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
        {Icon && <Icon size={12} />}
        <span>{label}</span>
      </div>

      <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}