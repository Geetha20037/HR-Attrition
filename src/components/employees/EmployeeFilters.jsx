import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const EmployeeFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  status,
  setStatus,
  sortBy,
  setSortBy,
  departments = [],
  onClear,
}) => {
  const hasFilters =
    search ||
    department !== "All Departments" ||
    status !== "All Status" ||
    sortBy !== "default";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <SlidersHorizontal size={17} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Employee Filters
            </h3>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Search and refine employee records
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {/* Search */}

        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search employees..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
          />
        </div>

        {/* Department */}

        <select
          value={department}
          onChange={(event) =>
            setDepartment(event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="All Departments">
            All Departments
          </option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="All Status">
            All Status
          </option>

          <option value="No">
            Active Employees
          </option>

          <option value="Yes">
            Employees Who Left
          </option>
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value)
          }
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="default">
            Sort: Default
          </option>

          <option value="name">
            Sort: Name
          </option>

          <option value="salaryHigh">
            Salary: High to Low
          </option>

          <option value="salaryLow">
            Salary: Low to High
          </option>

          <option value="experience">
            Experience: High to Low
          </option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeFilters;