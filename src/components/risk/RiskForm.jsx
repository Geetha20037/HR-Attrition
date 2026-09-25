import { useState } from "react";
import { BrainCircuit, RotateCcw } from "lucide-react";

const initialForm = {
  age: "",
  department: "Engineering",
  role: "Frontend Developer",
  salary: "",
  experience: "",
  satisfaction: "3",
  workLifeBalance: "3",
  overtime: "No",
  performance: "3",
};

export default function RiskForm({ onResult }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const age = Number(form.age);
    const salary = Number(form.salary);
    const experience = Number(form.experience);
    const satisfaction = Number(form.satisfaction);
    const balance = Number(form.workLifeBalance);
    const performance = Number(form.performance);

    let riskScore = 25;

    if (age < 25) riskScore += 10;
    if (salary < 55000) riskScore += 12;
    if (experience <= 2) riskScore += 10;
    if (satisfaction <= 2) riskScore += 12;
    if (balance <= 2) riskScore += 10;
    if (form.overtime === "Yes") riskScore += 10;
    if (performance <= 2) riskScore += 8;

    riskScore = Math.min(95, Math.max(8, riskScore));

    let level = "Low";

    if (riskScore >= 65) {
      level = "High";
    } else if (riskScore >= 42) {
      level = "Medium";
    }

    let message =
      "The employee currently shows relatively stable retention indicators.";

    if (level === "Medium") {
      message =
        "Some workforce indicators suggest increased attrition exposure. HR may consider a follow-up discussion.";
    }

    if (level === "High") {
      message =
        "Several submitted indicators suggest elevated attrition exposure. Consider reviewing workload, satisfaction and career development.";
    }

    onResult({
      level,
      percentage: riskScore,
      message,
    });
  };

  const reset = () => {
    setForm(initialForm);
    onResult(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <BrainCircuit size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Employee Risk Assessment
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter employee attributes
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
          type="number"
          placeholder="e.g. 28"
          required
        />

        <Field
          label="Salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          type="number"
          placeholder="e.g. 70000"
          required
        />

        <Field
          label="Experience"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          type="number"
          placeholder="Years"
          required
        />

        <SelectField
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          options={[
            "Engineering",
            "Design",
            "Sales",
            "Human Resources",
            "Finance",
            "Marketing",
          ]}
        />

        <SelectField
          label="Job Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          options={[
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "UI/UX Designer",
            "Sales Executive",
            "HR Executive",
            "Financial Analyst",
            "Marketing Specialist",
          ]}
        />

        <SelectField
          label="Job Satisfaction"
          name="satisfaction"
          value={form.satisfaction}
          onChange={handleChange}
          options={["1", "2", "3", "4", "5"]}
        />

        <SelectField
          label="Work-Life Balance"
          name="workLifeBalance"
          value={form.workLifeBalance}
          onChange={handleChange}
          options={["1", "2", "3", "4", "5"]}
        />

        <SelectField
          label="Performance Rating"
          name="performance"
          value={form.performance}
          onChange={handleChange}
          options={["1", "2", "3", "4", "5"]}
        />

        <SelectField
          label="Overtime"
          name="overtime"
          value={form.overtime}
          onChange={handleChange}
          options={["No", "Yes"]}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
        >
          <BrainCircuit size={17} />
          Predict Attrition Risk
        </button>

        <button
          type="button"
          onClick={reset}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
        This interface uses mock frontend prediction logic for demonstration
        purposes only.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type,
  placeholder,
  required,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}