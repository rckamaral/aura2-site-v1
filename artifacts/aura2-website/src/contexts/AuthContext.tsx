import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, token: string, role?: string) => void;
  logout: () => void;
  token: string | null;
}

const STORAGE_KEY = "aura2_user";
const TOKEN_KEY = "aura2_token";

function decodeJwtRole(token: string): string {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || "player";
  } catch {
    return "player";
  }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      if (!saved) return null;
      const parsed = JSON.parse(saved) as User;
      if (!parsed.role && token) parsed.role = decodeJwtRole(token);
      return parsed;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  useEffect(() => {
    if (!token) return;
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          setUser(null);
          setToken(null);
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  function login(username: string, newToken: string, role?: string) {
    const resolvedRole = role || decodeJwtRole(newToken);
    setUser({ username, role: resolvedRole });
    setToken(newToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
