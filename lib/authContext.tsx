"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  role: { name: string };
};

type AuthContextType = {
  user: User | null;
  jwt: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  jwt: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedJwt = localStorage.getItem("jwt");
    if (storedUser && storedJwt) {
      setUser(JSON.parse(storedUser));
      setJwt(storedJwt);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setUser(null);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
