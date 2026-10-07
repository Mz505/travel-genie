import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Plane, ShieldCheck, User, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please enter your username/email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      navigate(redirectUrl, { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      let message = "Invalid username/email or password. Please try again.";
      if (err?.response?.data?.detail) {
        message = err.response.data.detail;
      } else if (err?.response?.data?.non_field_errors) {
        message = err.response.data.non_field_errors[0];
      } else if (err?.message && err.message !== "Request failed with status code 401") {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] dark:bg-[#07111F] px-4 py-12 transition-colors">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-8 sm:p-10 shadow-2xl border border-gray-100 dark:border-white/10">
        
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
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Sign in to manage your flights, view bookings, and access AI travel tools.
          </p>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username or Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username or email"
                autoComplete="username"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-10 pr-10 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-[#F58220] hover:bg-[#e07010] active:scale-[0.99] text-white py-3.5 px-4 font-bold text-sm shadow-lg shadow-[#F58220]/25 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck size={16} className="text-[#168A55]" />
          <span>Protected by 256-bit SSL session encryption</span>
        </div>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have a Kam Air account yet?{" "}
          <Link
            to={redirectUrl !== "/dashboard" ? `/signup?redirect=${encodeURIComponent(redirectUrl)}` : "/signup"}
            className="font-bold text-[#F58220] hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
