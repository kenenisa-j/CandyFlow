import { useState, useEffect } from "react";

export default function Payroll({ attendance = [], currentMonth }) {
  // We use local state to track which specific IDs have been "paid"
  // in the current session (or you could sync this to localStorage)
  const [paidIds, setPaidIds] = useState(() => {
    const saved = localStorage.getItem("candy_paid_records");
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence for "Paid" status
  useEffect(() => {
    localStorage.setItem("candy_paid_records", JSON.stringify(paidIds));
  }, [paidIds]);

  const handlePay = (id) => {
    if (!paidIds.includes(id)) {
      setPaidIds([...paidIds, id]);
    }
  };

  // 1. Calculate Payroll based on Attendance
  // We assume a flat daily rate for this example (e.g., $50 per "Present" day)
  const dailyRate = 50;

  const payrollRecords = attendance.map((record) => ({
    ...record,
    amount: record.status === "present" ? dailyRate : 0,
    paymentStatus: paidIds.includes(record.id) ? "paid" : "pending",
  }));

  const pendingTotal = payrollRecords
    .filter((r) => r.paymentStatus === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="dashboard-container fade-in">
      {/* --- CYBER HEADER --- */}
      <header className="cyber-header">
        <div className="header-flex">
          <div className="title-area">
            <h1>
              <span className="accent-icon">💳</span> Payroll{" "}
              <span className="text-primary">Management</span>
            </h1>
            <p className="glitch-text">
              Financial Disbursement for {currentMonth}
            </p>
          </div>
          <div className="system-status">
            <span className="pulse-dot"></span> Ledger Encrypted
          </div>
        </div>
        <div className="header-scanner"></div>
      </header>

      {/* --- GLASS SUMMARY CARD --- */}
      <div className="payroll-summary-grid">
        <div
          className={`glass-stat-card ${pendingTotal > 0 ? "orange" : "green"}`}
        >
          <label>Pending Outflow ({currentMonth})</label>
          <div className="value">
            $
            {pendingTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="stat-glow"></div>
        </div>
      </div>

      {/* --- CYBER TABLE --- */}
      <div className="report-card">
        <div className="table-header-flex">
          <h3>📂 Employee Disbursement Ledger</h3>
          <span className="period-badge">{currentMonth}</span>
        </div>

        <div className="table-wrapper">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>Worker Name</th>
                <th>Work Date</th>
                <th>Calculated Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.length > 0 ? (
                payrollRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <span className="worker-identity">
                        {record.workerName}
                      </span>
                    </td>
                    <td>{record.date}</td>
                    <td className="font-bold text-blue">
                      ${record.amount.toFixed(2)}
                    </td>
                    <td>
                      <span className={`status-tag ${record.paymentStatus}`}>
                        {record.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {record.paymentStatus === "pending" ? (
                        <button
                          className="cyber-btn"
                          onClick={() => handlePay(record.id)}
                          disabled={record.amount === 0}
                        >
                          {record.amount === 0
                            ? "No Pay (Absent)"
                            : "Mark as Paid"}
                        </button>
                      ) : (
                        <span className="text-muted completed-tag">
                          ✓ Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-row-msg">
                    📡 No attendance records found to generate payroll for{" "}
                    {currentMonth}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
