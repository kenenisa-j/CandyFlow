import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ currentMonth, setCurrentMonth }) {
  const { user, logout } = useAuth();
  const isSuperadmin = user.role === "superadmin";

  // List of months for the selector
  const months = [
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
  const currentYear = new Date().getFullYear();

  return (
    <aside className="sidebar">
      {/* BRANDING SECTION */}
      <div className="sidebar-brand">
        <div className="logo-icon">🍭</div>
        <h1 className="app-name">
          CandyFlow <span className="pro-badge">ERP</span>
        </h1>
      </div>

      {/* USER PROFILE CARD */}
      <div className="user-profile-mini">
        <div className="avatar">
          {user.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="user-details">
          <p className="user-email">{user.email}</p>
          <span className={`role-pill ${user.role}`}>
            {isSuperadmin ? "Super Admin" : "Staff Member"}
          </span>
        </div>
      </div>

      {/* --- MONTHLY INTELLIGENCE SELECTOR --- */}
      <div className="month-selector-wrapper">
        <p className="nav-label">Intelligence Period</p>
        <div className="cyber-select-container">
          <span className="select-icon">📅</span>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="sidebar-select"
          >
            {months.map((m) => (
              <option key={m} value={`${m} ${currentYear}`}>
                {m} {currentYear}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">Main Operations</p>

        <NavLink
          to="/add-expense"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="icon">💸</span> Add Expense
        </NavLink>

        <NavLink
          to="/add-sale"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="icon">💰</span> Add Sale
        </NavLink>

        <NavLink
          to="/production"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="icon">🏭</span> Production
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="icon">📋</span> Attendance
        </NavLink>

        {/* --- SUPERADMIN MANAGEMENT SECTION --- */}
        {isSuperadmin && (
          <div className="admin-section">
            <hr className="sidebar-divider" />
            <p className="nav-label">Management Control</p>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span className="icon">📊</span> Dashboard
            </NavLink>

            <NavLink
              to="/payroll"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span className="icon">💳</span> Payroll
            </NavLink>

            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <span className="icon">📦</span> Inventory
            </NavLink>
          </div>
        )}
      </nav>

      {/* LOGOUT AT THE BOTTOM */}
      <div className="sidebar-footer">
        <button type="button" onClick={logout} className="logout-button">
          <span className="icon">🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
