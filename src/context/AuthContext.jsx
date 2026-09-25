import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("hr_auth") === "true";
  });

  const login = (email, password, remember = false) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter email and password.",
      };
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    setIsAuthenticated(true);

    if (remember) {
      localStorage.setItem("hr_auth", "true");
    } else {
      sessionStorage.setItem("hr_auth", "true");
    }

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    localStorage.removeItem("hr_auth");
    sessionStorage.removeItem("hr_auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}