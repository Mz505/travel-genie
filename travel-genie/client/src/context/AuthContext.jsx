import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load the user's profile using the saved JWT token
  const loadUser = async () => {
    const token = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    if (!token && !refreshToken) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      setAuthLoading(true);
      const res = await api.get("users/me/");
      if (res.data?.user) {
        setUser({
          ...res.data.user,
          profile: res.data.profile || {},
        });
      } else {
        const profileRes = await api.get("users/profile/");
        setUser({
          ...profileRes.data.user,
          profile: profileRes.data,
        });
      }
    } catch (error) {
      console.warn("Could not load user session:", error);
      setUser(null);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (credentials) => {
    // credentials: { username (or email), password }
    const response = await api.post("token/", credentials);
    const data = response.data;

    if (data.access) {
      localStorage.setItem("access", data.access);
    }
    if (data.refresh) {
      localStorage.setItem("refresh", data.refresh);
    }

    if (data.user) {
      const userData = {
        ...data.user,
        profile: data.profile || {},
      };
      setUser(userData);
      return userData;
    } else {
      // Fallback: fetch profile
      try {
        const profileRes = await api.get("users/profile/");
        const userData = {
          ...profileRes.data.user,
          profile: profileRes.data,
        };
        setUser(userData);
        return userData;
      } catch (err) {
        // Minimum user state if profile fetch lags
        const basicUser = { username: credentials.username };
        setUser(basicUser);
        return basicUser;
      }
    }
  };

  const register = async (userData) => {
    // userData: { username, email, password, first_name, last_name }
    const response = await api.post("users/register/", userData);
    const data = response.data;

    if (data.access) {
      localStorage.setItem("access", data.access);
    }
    if (data.refresh) {
      localStorage.setItem("refresh", data.refresh);
    }

    if (data.user) {
      const newUser = {
        ...data.user,
        profile: data.profile || {},
      };
      setUser(newUser);
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        login,
        logout,
        loadUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
