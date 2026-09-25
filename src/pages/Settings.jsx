import { useState } from "react";
import {
  Bell,
  Check,
  CheckCircle2,
  Lock,
  Moon,
  Shield,
  Sun,
  UserRound,
  Users,
  X,
  KeyRound,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState("");

  const [profile, setProfile] = useState({
    name: "Geetha Priya",
    email: "desinghgeethapriya@thestackly.com",
    role: "HR Administrator",
    department: "Human Resources",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setActiveModal(null);
    showToast("Profile updated successfully");
  };

  const updatePassword = (event) => {
    event.preventDefault();

    if (!passwords.current || !passwords.newPassword || !passwords.confirm) {
      showToast("Please complete all password fields");
      return;
    }

    if (passwords.newPassword.length < 6) {
      showToast("New password must contain at least 6 characters");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      showToast("New passwords do not match");
      return;
    }

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setActiveModal(null);
    showToast("Password updated successfully");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Shield size={21} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Dashboard Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage your profile, HR administration, security and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* PROFILE */}
      <SettingSection
        icon={UserRound}
        title="Profile"
        description="Manage your administrator profile information."
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
              GP
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                {profile.name}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {profile.role}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {profile.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("profile")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <UserRound size={16} />
            Edit Profile
          </button>
        </div>
      </SettingSection>

      {/* HR ADMIN */}
      <SettingSection
        icon={Users}
        title="HR Admin"
        description="View and manage your HR administrator access."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <InfoCard
            label="Role"
            value="HR Administrator"
          />

          <InfoCard
            label="Department"
            value="Human Resources"
          />

          <InfoCard
            label="Access"
            value="Full Dashboard"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveModal("admin");
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
        >
          <Shield size={16} />
          View Admin Access
        </button>
      </SettingSection>

      {/* APPEARANCE */}
      <SettingSection
        icon={theme === "dark" ? Moon : Sun}
        title="Appearance"
        description="Choose your preferred dashboard appearance."
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-indigo-500/30 dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="text-indigo-500" size={19} />
            ) : (
              <Sun className="text-amber-500" size={19} />
            )}

            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </p>

              <p className="text-xs text-slate-400">
                Switch dashboard appearance
              </p>
            </div>
          </div>

          <div className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
            Change
          </div>
        </button>
      </SettingSection>

      {/* NOTIFICATIONS */}
      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Control dashboard notification preferences."
      >
        <Toggle
          checked={notifications}
          onChange={() => {
            setNotifications((value) => !value);
            showToast(
              notifications
                ? "Notifications disabled"
                : "Notifications enabled"
            );
          }}
          label="HR activity notifications"
          description="Receive updates about important employee activities."
        />
      </SettingSection>

      {/* SECURITY */}
      <SettingSection
        icon={Shield}
        title="Security"
        description="Manage your account security and password."
      >
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setActiveModal("security")}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-indigo-500/30 dark:hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Shield size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Security Overview
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Review account security settings
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              Protected
            </span>
          </button>

          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Lock size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Password
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Change your account password
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal("password")}
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </SettingSection>

      {/* PROFILE MODAL */}
      {activeModal === "profile" && (
        <Modal
          title="Edit Profile"
          icon={UserRound}
          onClose={() => setActiveModal(null)}
        >
          <form onSubmit={saveProfile} className="space-y-4">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(value) =>
                setProfile({ ...profile, name: value })
              }
            />

            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(value) =>
                setProfile({ ...profile, email: value })
              }
            />

            <Input
              label="Role"
              value={profile.role}
              onChange={(value) =>
                setProfile({ ...profile, role: value })
              }
            />

            <Input
              label="Department"
              value={profile.department}
              onChange={(value) =>
                setProfile({ ...profile, department: value })
              }
            />

            <ModalActions
              onCancel={() => setActiveModal(null)}
              submitText="Save Profile"
              icon={Save}
            />
          </form>
        </Modal>
      )}

      {/* ADMIN MODAL */}
      {activeModal === "admin" && (
        <Modal
          title="HR Admin Access"
          icon={Users}
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-3">
            <AccessRow
              title="Employee Management"
              description="View, add and manage employees"
            />

            <AccessRow
              title="Attrition Analytics"
              description="Access workforce analytics and reports"
            />

            <AccessRow
              title="Risk Prediction"
              description="Access employee attrition risk analysis"
            />

            <AccessRow
              title="Dashboard Settings"
              description="Manage dashboard preferences"
            />

            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                showToast("Admin access verified");
              }}
              className="mt-3 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Confirm Access
            </button>
          </div>
        </Modal>
      )}

      {/* SECURITY MODAL */}
      {activeModal === "security" && (
        <Modal
          title="Security Overview"
          icon={Shield}
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-3">
            <SecurityRow
              title="Account Protection"
              value="Active"
            />

            <SecurityRow
              title="Password Protection"
              value="Enabled"
            />

            <SecurityRow
              title="Session Security"
              value="Protected"
            />

            <SecurityRow
              title="Two-Factor Authentication"
              value="Available"
            />

            <button
              type="button"
              onClick={() => {
                setActiveModal("password");
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <KeyRound size={16} />
              Manage Password
            </button>
          </div>
        </Modal>
      )}

      {/* PASSWORD MODAL */}
      {activeModal === "password" && (
        <Modal
          title="Update Password"
          icon={KeyRound}
          onClose={() => setActiveModal(null)}
        >
          <form onSubmit={updatePassword} className="space-y-4">
            <PasswordInput
              label="Current Password"
              value={passwords.current}
              visible={showCurrent}
              setVisible={setShowCurrent}
              onChange={(value) =>
                setPasswords({
                  ...passwords,
                  current: value,
                })
              }
            />

            <PasswordInput
              label="New Password"
              value={passwords.newPassword}
              visible={showNew}
              setVisible={setShowNew}
              onChange={(value) =>
                setPasswords({
                  ...passwords,
                  newPassword: value,
                })
              }
            />

            <PasswordInput
              label="Confirm New Password"
              value={passwords.confirm}
              visible={showConfirm}
              setVisible={setShowConfirm}
              onChange={(value) =>
                setPasswords({
                  ...passwords,
                  confirm: value,
                })
              }
            />

            <p className="rounded-xl bg-indigo-50 p-3 text-xs text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
              Password must contain at least 6 characters.
            </p>

            <ModalActions
              onCancel={() => setActiveModal(null)}
              submitText="Update Password"
              icon={KeyRound}
            />
          </form>
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[300] flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-2xl dark:border-emerald-500/20 dark:bg-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <CheckCircle2 size={18} />
          </div>

          <p className="text-sm font-semibold text-slate-800 dark:text-white">
            {toast}
          </p>
        </div>
      )}
    </div>
  );
}

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function AccessRow({ title, description }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <CheckCircle2
        size={19}
        className="shrink-0 text-emerald-500"
      />
    </div>
  );
}

function SecurityRow({ title, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <p className="text-sm font-semibold text-slate-800 dark:text-white">
        {title}
      </p>

      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        {value}
      </span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  visible,
  setVisible,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-600 dark:text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 pr-11 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

function Modal({
  title,
  icon: Icon,
  onClose,
  children,
}) {
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Icon size={19} />
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function ModalActions({
  onCancel,
  submitText,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <Icon size={16} />
        {submitText}
      </button>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <div
        className={`relative h-6 w-11 rounded-full transition ${
          checked
            ? "bg-indigo-600"
            : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        >
          {checked && (
            <Check
              size={11}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600"
            />
          )}
        </span>
      </div>
    </button>
  );
}
