import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW

  // LOAD USER
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false); // ✅ DONE LOADING
  }, []);

  // ================= SIGNUP =================
  const signup = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === newUser.email);

    if (exists) return false;

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  // ================= LOGIN =================
  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin") {
      const adminUser = { email, role: "ADMIN" };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return adminUser;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return null;

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return foundUser;
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};