import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";
import { employees } from "../data/employees";

export default function EmployeeProfile() {
  const { id } = useParams();

  const employee = employees.find((item) => item.id === id);

  if (!employee) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Employee not found
        </h2>

        <Link
          to="/employees"
          className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to Employees
        </Link>
      </div>
    );
  }

  const risk =
    employee.attrition === "Left"
      ? { label: "High Risk", color: "text-rose-600" }
      : employee.satisfaction <= 2
      ? { label: "Medium Risk", color: "text-amber-600" }
      : { label: "Low Risk", color: "text-emerald-600" };

  return (
    <div className="space-y-6">
      <Link
        to="/employees"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={17} />
        Back to employees
      </Link>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-2xl font-black text-indigo-600 shadow-xl">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="text-white">
              <p className="text-xs font-medium text-indigo-100">
                {employee.id}
              </p>

              <h1 className="mt-1 text-2xl font-black">
                {employee.name}
              </h1>

              <p className="mt-1 text-sm text-indigo-100">
                {employee.role} · {employee.department}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <Info icon={Mail} label="Email" value={employee.email} />
          <Info icon={Phone} label="Phone" value={employee.phone} />
          <Info icon={MapPin} label="Location" value={employee.location} />
          <Info
            icon={CalendarDays}
            label="Joining Date"
            value={employee.joiningDate}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <Title icon={BriefcaseBusiness} title="Job Details" />

          <div className="mt-5 space-y-4">
            <Row label="Department" value={employee.department} />
            <Row label="Role" value={employee.role} />
            <Row label="Experience" value={`${employee.experience} years`} />
            <Row
              label="Salary"
              value={`₹${employee.salary.toLocaleString()}`}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <Title icon={Star} title="Performance" />

          <div className="mt-5 space-y-4">
            <Row
              label="Performance Rating"
              value={`${employee.performance}/5`}
            />
            <Row
              label="Job Satisfaction"
              value={`${employee.satisfaction}/5`}
            />
            <Row
              label="Work-Life Balance"
              value={`${employee.workLifeBalance}/5`}
            />
            <Row label="Overtime" value={employee.overtime} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <Title icon={ShieldCheck} title="Attrition Risk" />

          <div className="mt-5">
            <p className={`text-2xl font-black ${risk.color}`}>
              {risk.label}
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full ${
                  risk.label === "High Risk"
                    ? "w-[82%] bg-rose-500"
                    : risk.label === "Medium Risk"
                    ? "w-[55%] bg-amber-500"
                    : "w-[22%] bg-emerald-500"
                }`}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Based on satisfaction, performance, work-life balance and
              employment indicators.
            </p>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <Title icon={TrendingUp} title="Recent Activity" />

        <div className="mt-5 space-y-4">
          <Activity
            title="Performance review completed"
            description="Quarterly performance review was updated."
            date="Today"
          />

          <Activity
            title="Employee information verified"
            description="Personal and job information was reviewed."
            date="3 days ago"
          />

          <Activity
            title="Attendance report generated"
            description="Monthly attendance information was added."
            date="1 week ago"
          />
        </div>
      </section>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
      <Icon size={17} className="text-indigo-500" />
      <p className="mt-2 text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
        {value}
      </p>
    </div>
  );
}

function Title({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} className="text-indigo-500" />
      <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {value}
      </span>
    </div>
  );
}

function Activity({ title, description, date }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-500" />

      <div className="flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <p className="text-sm font-semibold text-slate-800 dark:text-white">
            {title}
          </p>

          <span className="text-xs text-slate-400">{date}</span>
        </div>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}