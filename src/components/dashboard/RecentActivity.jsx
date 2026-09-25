import {
  UserPlus,
  UserMinus,
  FileCheck2,
  CalendarDays,
} from "lucide-react";

const activities = [
  {
    icon: UserPlus,
    title: "New employee added",
    person: "Aarav Sharma joined Engineering",
    time: "12 min ago",
  },
  {
    icon: FileCheck2,
    title: "Performance review completed",
    person: "Priya Nair completed Q3 review",
    time: "42 min ago",
  },
  {
    icon: CalendarDays,
    title: "Leave request approved",
    person: "Ananya Reddy's leave was approved",
    time: "1 hour ago",
  },
  {
    icon: UserMinus,
    title: "Employee exit recorded",
    person: "Rahul Verma marked as exited",
    time: "3 hours ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="card-shadow rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Recent Activity
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Latest employee events
        </p>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={index} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {activity.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {activity.person}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}