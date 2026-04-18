import { useState } from "react";

export default function Attendance({
  attendance = [],
  setAttendance,
  currentMonth,
}) {
  const [form, setForm] = useState({
    workerName: "",
    date: new Date().toISOString().slice(0, 10),
    status: "present",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Logic Check: Prevent logging the same worker twice for the same date
    const isDuplicate = attendance.find(
      (r) =>
        r.workerName.toLowerCase() === form.workerName.toLowerCase() &&
        r.date === form.date,
    );

    if (isDuplicate) {
      alert(`${form.workerName} is already logged for ${form.date}.`);
      return;
    }

    const newRecord = {
      id: Date.now(),
      ...form,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update global state via App.js
    setAttendance((prev) => [newRecord, ...prev]);

    alert(`Attendance Logged: ${form.workerName} marked as ${form.status}.`);

    // Reset form
    setForm({
      workerName: "",
      date: new Date().toISOString().slice(0, 10),
      status: "present",
    });
  };

  return (
    <div className="page-content fade-in">
      <header className="page-header">
        <div>
          <h1>👷 Staff Attendance</h1>
          <p className="subtitle">
            Logging records for:{" "}
            <span className="highlight-text">{currentMonth}</span>
          </p>
        </div>
        <div className="status-chips">
          <span className="chip purple-glow">
            {currentMonth} Logs: {attendance.length}
          </span>
        </div>
      </header>

      <section className="standard-form card attendance-border">
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Worker Name
            <input
              type="text"
              placeholder="e.g. Abebe Balcha"
              value={form.workerName}
              onChange={(e) => setForm({ ...form, workerName: e.target.value })}
              required
            />
          </label>

          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </label>

          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={`select-status ${form.status}`}
            >
              <option value="present">✅ Present</option>
              <option value="absent">❌ Absent</option>
              <option value="late">⏳ Late</option>
            </select>
          </label>

          <button type="submit" className="save-btn attendance-theme">
            Log Attendance Record
          </button>
        </form>
      </section>

      <div className="table-container card mt-2">
        <div className="table-header-flex">
          <h3>Attendance History</h3>
          <span className="period-badge">{currentMonth}</span>
        </div>
        <table className="erp-table">
          <thead>
            <tr>
              <th>Worker Name</th>
              <th>Date</th>
              <th>Check-in Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="worker-info">
                      <div className="avatar-sm">{r.workerName.charAt(0)}</div>
                      <strong>{r.workerName}</strong>
                    </div>
                  </td>
                  <td>{r.date}</td>
                  <td className="text-muted">{r.timestamp || "---"}</td>
                  <td>
                    <span className={`status-badge ${r.status}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-row-msg">
                  📡 No logs found for {currentMonth}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
