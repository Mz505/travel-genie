import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Shield,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Sliders,
  Palette,
  Bell,
  HelpCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../api/axios";
import GlassCard from "../../components/Common/GlassCard";
import ThemeSwitcher from "../../components/Common/ThemeSwitcher";

function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const username =
    user?.username ||
    user?.profile?.user?.username ||
    user?.email?.split("@")[0] ||
    "Explorer";

  const email = user?.email || user?.profile?.user?.email || "No email set";
  const isAdmin = Boolean(user?.is_staff || user?.is_superuser);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-white/70">
          Manage your account preferences, appearance, and security settings.
        </p>
      </div>

      {/* Account Overview */}
      <GlassCard className="p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
            <User size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Account Overview
            </h2>
            <p className="text-xs text-gray-500 dark:text-white/60">
              Basic details about your active session
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4 border border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 dark:text-white/50">Username</p>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white truncate">
              {username}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4 border border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 dark:text-white/50">Email</p>
            <p className="mt-1 font-semibold text-gray-900 dark:text-white truncate">
              {email}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-white/5 p-4 border border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 dark:text-white/50">Role</p>
            <div className="mt-1 flex items-center gap-1.5">
              {isAdmin ? (
                <>
                  <ShieldCheck size={16} className="text-cyan-500" />
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    Administrator
                  </span>
                </>
              ) : (
                <>
                  <Shield size={16} className="text-gray-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Explorer
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-4 py-2.5 text-sm font-semibold transition"
          >
            <User size={16} />
            Edit Profile Details
          </Link>

          {isAdmin && (
            <a
              href={`${API_BASE_URL}/admin/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2.5 text-sm font-semibold transition"
            >
              <ExternalLink size={16} />
              Open Django Admin
            </a>
          )}
        </div>
      </GlassCard>

      {/* Appearance */}
      <GlassCard className="p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
            <Palette size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Appearance
            </h2>
            <p className="text-xs text-gray-500 dark:text-white/60">
              Customize how TravelGenie looks on your device
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Color Theme
            </p>
            <p className="text-xs text-gray-500 dark:text-white/60 mt-0.5">
              Toggle between light and dark visual modes
            </p>
          </div>
          <ThemeSwitcher />
        </div>
      </GlassCard>

      {/* Preferences */}
      <GlassCard className="p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
            <Sliders size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Notifications & Updates
            </h2>
            <p className="text-xs text-gray-500 dark:text-white/60">
              Configure app alerts and updates
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Trip Reminders
              </p>
              <p className="text-xs text-gray-500 dark:text-white/60 mt-0.5">
                Receive notifications about upcoming scheduled itineraries
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`h-6 w-11 rounded-full transition-colors relative ${
                notifications ? "bg-cyan-500" : "bg-gray-300 dark:bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Recommendation Digest
              </p>
              <p className="text-xs text-gray-500 dark:text-white/60 mt-0.5">
                Get monthly travel deals and destination inspiration
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEmailUpdates(!emailUpdates)}
              className={`h-6 w-11 rounded-full transition-colors relative ${
                emailUpdates ? "bg-cyan-500" : "bg-gray-300 dark:bg-white/20"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  emailUpdates ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Account Actions / Logout */}
      <GlassCard className="p-6 sm:p-7 border-red-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <LogOut size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Log Out
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
                End your current session. You will be redirected to the login page.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02]"
          >
            <LogOut size={18} />
            Log Out Now
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

export default Settings;
