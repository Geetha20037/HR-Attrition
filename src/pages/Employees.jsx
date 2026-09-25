
import { useMemo, useState } from "react";
import { Download, Plus, Users, UserCheck, UserMinus } from "lucide-react";
import { employees as employeeData } from "../data/employees";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeModal from "../components/employees/EmployeeModal";

const PAGE_SIZE = 6;

/* Normalize all possible attrition values */
const isEmployeeActive = (employee) => {
  const value = String(employee.attrition ?? "")
    .trim()
    .toLowerCase();

  return value === "no" || value === "active" || value === "false";
};

const isEmployeeLeft = (employee) => {
  const value = String(employee.attrition ?? "")
    .trim()
    .toLowerCase();

  return value === "yes" || value === "left" || value === "true";
};

export default function Employees() {
  const [employees, setEmployees] = useState(employeeData);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("default");

  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* Departments */
  const departments = useMemo(() => {
    return [...new Set(employees.map((employee) => employee.department))]
      .filter(Boolean)
      .sort();
  }, [employees]);

  /* Counts */
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(isEmployeeActive).length;

  const employeesWhoLeft = employees.filter(isEmployeeLeft).length;

  /* Filter employees */
  const filteredEmployees = useMemo(() => {
    let result = employees.filter((employee) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        String(employee.name ?? "")
          .toLowerCase()
          .includes(query) ||
        String(employee.id ?? "")
          .toLowerCase()
          .includes(query) ||
        String(employee.role ?? "")
          .toLowerCase()
          .includes(query) ||
        String(employee.email ?? "")
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "All Departments" ||
        employee.department === department;

      let matchesStatus = true;

      if (status === "No") {
        matchesStatus = isEmployeeActive(employee);
      }

      if (status === "Yes") {
        matchesStatus = isEmployeeLeft(employee);
      }

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });

    /* Sorting */
    if (sortBy === "name") {
      result.sort((a, b) =>
        String(a.name ?? "").localeCompare(
          String(b.name ?? "")
        )
      );
    }

    if (sortBy === "salaryHigh") {
      result.sort(
        (a, b) =>
          Number(b.salary || 0) -
          Number(a.salary || 0)
      );
    }

    if (sortBy === "salaryLow") {
      result.sort(
        (a, b) =>
          Number(a.salary || 0) -
          Number(b.salary || 0)
      );
    }

    if (sortBy === "experience") {
      result.sort(
        (a, b) =>
          Number(b.experience || 0) -
          Number(a.experience || 0)
      );
    }

    return result;
  }, [
    employees,
    search,
    department,
    status,
    sortBy,
  ]);

  /* Pagination */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / PAGE_SIZE)
  );

  const safePage = Math.min(page, totalPages);

  const visibleEmployees = filteredEmployees.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  /* Reset filters */
  const clearFilters = () => {
    setSearch("");
    setDepartment("All Departments");
    setStatus("All Status");
    setSortBy("default");
    setPage(1);
  };

  /* Search */
  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  /* Department */
  const updateDepartment = (value) => {
    setDepartment(value);
    setPage(1);
  };

  /* Status */
  const updateStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  /* Sorting */
  const updateSort = (value) => {
    setSortBy(value);
    setPage(1);
  };

  /* Active Employees */
  const showActiveEmployees = () => {
    setSearch("");
    setDepartment("All Departments");
    setSortBy("default");
    setStatus("No");
    setPage(1);
  };

  /* Employees Who Left */
  const showEmployeesWhoLeft = () => {
    setSearch("");
    setDepartment("All Departments");
    setSortBy("default");
    setStatus("Yes");
    setPage(1);
  };

  /* Show all */
  const showAllEmployees = () => {
    setSearch("");
    setDepartment("All Departments");
    setStatus("All Status");
    setSortBy("default");
    setPage(1);
  };

  /* Export CSV */
  const exportEmployees = () => {
    if (filteredEmployees.length === 0) {
      alert("There are no employees to export.");
      return;
    }

    const headers = [
      "Employee ID",
      "Name",
      "Email",
      "Department",
      "Job Role",
      "Salary",
      "Experience",
      "Attrition Status",
    ];

    const rows = filteredEmployees.map((employee) => [
      employee.id ?? "",
      employee.name ?? "",
      employee.email ?? "",
      employee.department ?? "",
      employee.role ?? "",
      employee.salary ?? "",
      employee.experience ?? "",
      isEmployeeActive(employee)
        ? "Active"
        : "Employees Who Left",
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "hr-employee-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* Add Employee */
  const addEmployee = (newEmployee) => {
    setEmployees((currentEmployees) => [
      newEmployee,
      ...currentEmployees,
    ]);

    setShowAddModal(false);
    setPage(1);
    setStatus("All Status");
    setSearch("");
    setDepartment("All Departments");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Users
              className="text-indigo-600"
              size={22}
            />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Employee Directory
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {filteredEmployees.length} employees matching your criteria
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportEmployees}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Download size={16} />

            <span className="hidden sm:inline">
              Export
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Status Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}
        <button
          type="button"
          onClick={showAllEmployees}
          className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${
            status === "All Status"
              ? "border-indigo-300 bg-indigo-50 shadow-md dark:border-indigo-500/40 dark:bg-indigo-500/10"
              : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Employees
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {totalEmployees}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Users size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            View all employees →
          </p>
        </button>

        {/* Active */}
        <button
          type="button"
          onClick={showActiveEmployees}
          className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${
            status === "No"
              ? "border-emerald-300 bg-emerald-50 shadow-md dark:border-emerald-500/40 dark:bg-emerald-500/10"
              : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Active Employees
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {activeEmployees}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <UserCheck size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Show active employees →
          </p>
        </button>

        {/* Employees Who Left */}
        <button
          type="button"
          onClick={showEmployeesWhoLeft}
          className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${
            status === "Yes"
              ? "border-rose-300 bg-rose-50 shadow-md dark:border-rose-500/40 dark:bg-rose-500/10"
              : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Employees Who Left
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {employeesWhoLeft}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <UserMinus size={20} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-rose-600 dark:text-rose-400">
            Show employees who left →
          </p>
        </button>
      </div>

      {/* Filters */}
      <EmployeeFilters
        search={search}
        setSearch={updateSearch}
        department={department}
        setDepartment={updateDepartment}
        status={status}
        setStatus={updateStatus}
        sortBy={sortBy}
        setSortBy={updateSort}
        departments={departments}
        onClear={clearFilters}
      />

      {/* Table */}
      <EmployeeTable
        employees={visibleEmployees}
        onView={setSelectedEmployee}
      />

      {/* Pagination */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{" "}
          {filteredEmployees.length === 0
            ? 0
            : (safePage - 1) * PAGE_SIZE + 1}{" "}
          to{" "}
          {Math.min(
            safePage * PAGE_SIZE,
            filteredEmployees.length
          )}{" "}
          of {filteredEmployees.length}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() =>
              setPage((current) =>
                Math.max(1, current - 1)
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((number) => (
            <button
              type="button"
              key={number}
              onClick={() => setPage(number)}
              className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                safePage === number
                  ? "bg-indigo-600 text-white shadow-md"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() =>
              setPage((current) =>
                Math.min(totalPages, current + 1)
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Next
          </button>
        </div>
      </div>

      {/* Employee Details */}
      <EmployeeModal
        employee={selectedEmployee}
        open={Boolean(selectedEmployee)}
        onClose={() => setSelectedEmployee(null)}
      />

      {/* Add Employee Modal */}
      {showAddModal && (
        <AddEmployeeModal
          departments={departments}
          onClose={() => setShowAddModal(false)}
          onAdd={addEmployee}
        />
      )}
    </div>
  );
}

/* =========================================================
   ADD EMPLOYEE MODAL
========================================================= */

function AddEmployeeModal({
  departments,
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: departments[0] || "",
    role: "",
    salary: "",
    experience: "",
    attrition: "No",
  });

  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.department ||
      !form.role.trim() ||
      !form.salary ||
      !form.experience
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const newEmployee = {
      id: `EMP-${String(Date.now()).slice(-5)}`,
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      role: form.role.trim(),
      salary: Number(form.salary),
      experience: Number(form.experience),

      /*
        IMPORTANT:
        "No" = Active
        "Yes" = Employees Who Left
      */
      attrition: form.attrition,

      age: 25,
      gender: "Not Specified",
      jobLevel: "Mid Level",
      jobSatisfaction: 3,
      satisfaction: 3,
      workLifeBalance: 3,
      overtime: "No",
      performanceRating: 3,
      performance: 3,
      yearsAtCompany: Number(form.experience),
      joinDate: new Date()
        .toISOString()
        .split("T")[0],
      phone: "Not available",
      location: "Not specified",
    };

    onAdd(newEmployee);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Add Employee
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Create a new employee record
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5"
        >
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Employee Name"
              required
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="Enter employee name"
            />

            <FormField
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
              placeholder="employee@example.com"
            />

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Department *
              </label>

              <select
                value={form.department}
                onChange={(event) =>
                  updateField(
                    "department",
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">
                  Select department
                </option>

                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              label="Job Role"
              required
              value={form.role}
              onChange={(value) =>
                updateField("role", value)
              }
              placeholder="e.g. Software Engineer"
            />

            <FormField
              label="Salary"
              required
              type="number"
              value={form.salary}
              onChange={(value) =>
                updateField("salary", value)
              }
              placeholder="Enter salary"
            />

            <FormField
              label="Experience"
              required
              type="number"
              value={form.experience}
              onChange={(value) =>
                updateField("experience", value)
              }
              placeholder="Years"
            />

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Employment Status
              </label>

              <select
                value={form.attrition}
                onChange={(event) =>
                  updateField(
                    "attrition",
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="No">
                  Active Employee
                </option>

                <option value="Yes">
                  Employee Who Left
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
        {required && " *"}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
      />
    </div>
  );
}
