import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components & Pages
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import AddSale from "./pages/AddSale.jsx";
import Attendance from "./pages/Attendance.jsx";
import Payroll from "./pages/Payroll.jsx";
import Inventory from "./pages/Inventory.jsx";
import Production from "./pages/Production.jsx";
import Archive from "./pages/Archive.jsx"; // Newly Added
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function AppContent() {
  const auth = useAuth();

  // --- 1. Monthly Intelligence State ---
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  });

  // --- 2. Centralized Data State ---
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("candy_expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem("candy_sales");
    return saved ? JSON.parse(saved) : [];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("candy_attendance");
    return saved ? JSON.parse(saved) : [];
  });

  const [production, setProduction] = useState(() => {
    const saved = localStorage.getItem("candy_production");
    return saved ? JSON.parse(saved) : [];
  });

  const [inventory, setInventory] = useState([
    { id: 1, name: "Sugar", quantity: 50, unit: "kg" },
    { id: 2, name: "Cocoa", quantity: 15, unit: "kg" },
    { id: 3, name: "Packaging", quantity: 5, unit: "boxes" },
  ]);

  // --- 3. Advanced Filtering Logic ---
  // Shared helper to check if a record matches the current selected month
  const isCurrentMonth = (dateString) => {
    const date = new Date(dateString);
    const monthName = date.toLocaleString("default", { month: "long" });
    return `${monthName} ${date.getFullYear()}` === currentMonth;
  };

  const monthlyExpenses = useMemo(
    () => expenses.filter((e) => isCurrentMonth(e.date)),
    [expenses, currentMonth],
  );
  const monthlySales = useMemo(
    () => sales.filter((s) => isCurrentMonth(s.date)),
    [sales, currentMonth],
  );
  const monthlyProduction = useMemo(
    () => production.filter((p) => isCurrentMonth(p.date)),
    [production, currentMonth],
  );
  const monthlyAttendance = useMemo(
    () => attendance.filter((a) => isCurrentMonth(a.date)),
    [attendance, currentMonth],
  );

  // --- 4. Persistence Layer ---
  useEffect(() => {
    localStorage.setItem("candy_expenses", JSON.stringify(expenses));
    localStorage.setItem("candy_sales", JSON.stringify(sales));
    localStorage.setItem("candy_attendance", JSON.stringify(attendance));
    localStorage.setItem("candy_production", JSON.stringify(production));
  }, [expenses, sales, attendance, production]);

  if (!auth || auth.loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Syncing Factory Data...</p>
      </div>
    );
  }

  const { user, logout } = auth;

  if (!user || !user.isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        role={user.role}
        onLogout={logout}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <main className="main-viewport">
        <Routes>
          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Dashboard
                  expenses={monthlyExpenses}
                  sales={monthlySales}
                  inventory={inventory}
                  attendance={monthlyAttendance}
                  production={monthlyProduction}
                  currentMonth={currentMonth}
                />
              </ProtectedRoute>
            }
          />

          {/* ARCHIVE HUB (New) */}
          <Route
            path="/archive"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Archive
                  sales={sales}
                  expenses={expenses}
                  production={production}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payroll"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Payroll
                  attendance={monthlyAttendance}
                  currentMonth={currentMonth}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <Inventory inventory={inventory} setInventory={setInventory} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-expense"
            element={
              <AddExpense
                setExpenses={setExpenses}
                expenses={monthlyExpenses}
                currentMonth={currentMonth}
              />
            }
          />

          <Route
            path="/add-sale"
            element={
              <AddSale
                setSales={setSales}
                sales={monthlySales}
                currentMonth={currentMonth}
              />
            }
          />

          <Route
            path="/production"
            element={
              <Production
                production={monthlyProduction}
                setProduction={setProduction}
                currentMonth={currentMonth}
              />
            }
          />

          <Route
            path="/attendance"
            element={
              <Attendance
                attendance={monthlyAttendance}
                setAttendance={setAttendance}
                currentMonth={currentMonth}
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to={user.role === "superadmin" ? "/dashboard" : "/add-expense"}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
