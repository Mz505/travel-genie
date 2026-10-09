import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Plane, ShieldCheck, User, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const { fullName, username, email, password, confirmPassword } = formData;

    // Validate inputs
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match. Please verify your password.");
      return;
    }

    // Prepare first name & last name if provided
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      setLoading(true);

      await register({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        first_name: firstName,
        last_name: lastName,
      });

      setSuccess("Account created successfully! Redirecting to your passenger portal...");
      setTimeout(() => {
        navigate(redirectUrl, { replace: true });
      }, 700);
    } catch (err) {
      console.error("Signup error:", err);

      let message = "Unable to create your account. Please check your information and try again.";

      if (err?.response?.data) {
        const data = err.response.data;
        if (typeof data === "string") {
          if (data.includes("<html") || data.includes("<!DOCTYPE") || data.includes("Server Error")) {
            message = "Backend server error (500). Please ensure database migrations and credentials are configured on Render.";
          } else {
            message = data;
          }
        } else if (data.detail) {
          message = data.detail;
        } else if (data.email) {
          message = Array.isArray(data.email) ? data.email[0] : data.email;
        } else if (data.username) {
          message = Array.isArray(data.username) ? data.username[0] : data.username;
        } else if (data.password) {
          message = Array.isArray(data.password) ? data.password.join(" ") : data.password;
        } else if (data.non_field_errors) {
          message = Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors;
        }
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] dark:bg-[#07111F] px-4 py-12 transition-colors">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-8 sm:p-10 shadow-2xl border border-gray-100 dark:border-white/10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-10 h-10 rounded-2xl bg-[#F58220] flex items-center justify-center text-white shadow-lg shadow-[#F58220]/25 group-hover:scale-105 transition">
              <Plane size={22} className="transform -rotate-45" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-[#0B1F3A] dark:text-white">
                KAM<span className="text-[#F58220]">AIR</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Passenger Portal
              </span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Create Passenger Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Access your bookings, e-tickets, and personalized AI travel assistance.
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400 flex items-start gap-3">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">{success}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Full Name (as on Passport)
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Mohammad Ahmadzai"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Username <span className="text-[#F58220]">*</span>
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. ahmad99"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Email Address <span className="text-[#F58220]">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Password <span className="text-[#F58220]">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-[#F58220] hover:bg-[#e07010] active:scale-[0.99] text-white py-3.5 px-4 font-bold text-sm shadow-lg shadow-[#F58220]/25 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security & Guarantee Note */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck size={16} className="text-[#168A55]" />
          <span>Encrypted passenger credentials & secure token authentication</span>
        </div>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have a Kam Air account?{" "}
          <Link
            to={redirectUrl !== "/dashboard" ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login"}
            className="font-bold text-[#F58220] hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
