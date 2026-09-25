import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No results found",
  description = "Try changing your search or filters.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <SearchX size={26} />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}