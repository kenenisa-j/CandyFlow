import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Initialize state from LocalStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("candy_factory_session");
    // Only parse if it exists, otherwise default to logged out state
    return savedUser
      ? JSON.parse(savedUser)
      : { isLoggedIn: false, role: null, email: "" };
  });

  const [loading, setLoading] = useState(true);

  // 2. Initial Mount Check
  useEffect(() => {
    // This allows the app to check localStorage before rendering routes
    const savedUser = localStorage.getItem("candy_factory_session");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 3. Login Logic
  const login = (email, password) => {
    let userData = null;

    // Simulation of backend authentication
    if (email === "owner@test.com" && password === "password123") {
      userData = { isLoggedIn: true, role: "superadmin", email };
    } else if (email === "staff@test.com" && password === "password123") {
      userData = { isLoggedIn: true, role: "admin", email };
    }

    if (userData) {
      setUser(userData);
      localStorage.setItem("candy_factory_session", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // 4. Logout Logic
  const logout = () => {
    setUser({ isLoggedIn: false, role: null, email: "" });
    localStorage.removeItem("candy_factory_session");
    // Optional: clear local business data on logout if security is a concern
    // localStorage.removeItem("candy_sales");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* Only render children once we know the auth status. 
         This prevents the "Flash of Login Page" before the dashboard loads.
      */}
      {!loading ? (
        children
      ) : (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Verifying session...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// Custom Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
