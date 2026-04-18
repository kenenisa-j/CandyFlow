import React from "react";

export default function Dashboard({
  sales = [],
  expenses = [],
  attendance = [],
  production = [],
  currentMonth,
}) {
  // 1. Precise Calculations based on filtered props
  // We use Number() to ensure calculations don't break if a value is missing
  const totalRevenue = sales.reduce(
    (sum, item) => sum + (Number(item.total) || 0),
    0,
  );

  const totalSpending = expenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0,
  );

  const netProfit = totalRevenue - totalSpending;

  const totalUnits = production.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  return (
    <div className="dashboard-container fade-in">
      {/* --- CYBER HEADER --- */}
      <header className="cyber-header">
        <div className="header-flex">
          <div className="title-area">
            <h1>
              <span className="accent-icon">📊</span> Intelligence{" "}
              <span className="text-primary">Center</span>
            </h1>
            <p className="glitch-text">
              Reporting Period:{" "}
              <span className="highlight">{currentMonth}</span>
            </p>
          </div>
          <div className="system-status">
            <span className="pulse-dot"></span> System Live
          </div>
        </div>
        <div className="header-scanner"></div>
      </header>

      {/* --- GLASSMETRIC STATS --- */}
      <div className="stats-glass-grid">
        <div className="glass-stat-card green">
          <label>Total Revenue</label>
          <div className="value">
            $
            {totalRevenue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="glass-stat-card red">
          <label>Monthly Spending</label>
          <div className="value">
            $
            {totalSpending.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="glass-stat-card purple">
          <label>Net Profit</label>
          <div className="value">
            ${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="stat-glow"></div>
        </div>

        <div className="glass-stat-card blue">
          <label>Units Built</label>
          <div className="value">{totalUnits.toLocaleString()}</div>
          <div className="stat-glow"></div>
        </div>
      </div>

      <div className="admin-reports-grid">
        {/* 💰 DETAILED SALES */}
        <div className="report-card">
          <h3>🛒 Monthly Sales ({currentMonth})</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.length > 0 ? (
                  [...sales].reverse().map((s, i) => (
                    <tr key={i}>
                      <td>{s.date}</td>
                      <td>{s.customerName}</td>
                      <td>{s.productName}</td>
                      <td className="text-green font-bold">
                        ${Number(s.total).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-msg">
                      No sales found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 💸 EXPENSE BREAKDOWN */}
        <div className="report-card">
          <h3>📉 Expense Breakdown ({currentMonth})</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length > 0 ? (
                  [...expenses].reverse().map((e, i) => (
                    <tr key={i}>
                      <td>{e.date}</td>
                      <td>{e.name}</td>
                      <td>{e.category}</td>
                      <td className="text-red font-bold">
                        -${Number(e.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-msg">
                      No expenses found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 👥 STAFF ATTENDANCE */}
        <div className="report-card">
          <h3>👥 Staff Activity ({currentMonth})</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length > 0 ? (
                  [...attendance]
                    .reverse()
                    .slice(0, 10)
                    .map((a, i) => (
                      <tr key={i}>
                        <td>{a.workerName}</td>
                        <td>{a.date || "N/A"}</td>
                        <td>
                          <span
                            className={`status-tag ${a.status.toLowerCase()}`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-msg">
                      No attendance logs.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🏭 PRODUCTION MONITOR */}
        <div className="report-card">
          <h3>🏭 Production Floor ({currentMonth})</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {production.length > 0 ? (
                  [...production].reverse().map((p, i) => (
                    <tr key={i}>
                      <td>{p.date}</td>
                      <td>{p.productName}</td>
                      <td className="text-blue font-bold">
                        {p.quantity} units
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-msg">
                      No production recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
