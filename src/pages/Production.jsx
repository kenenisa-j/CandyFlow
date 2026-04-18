import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Production({
  production = [],
  setProduction,
  currentMonth,
}) {
  const { user } = useAuth(); // Track who is logging production
  const [form, setForm] = useState({
    productName: "Chocolate Bar",
    quantity: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBatch = {
      id: Date.now(),
      ...form,
      quantity: Number(form.quantity),
      addedBy: user.email, // Tracking for Superadmin visibility
    };

    // Update global state (App.js handles the filtering)
    setProduction((prev) => [newBatch, ...prev]);

    alert(`Success: ${form.quantity} units of ${form.productName} recorded.`);

    // Reset Form
    setForm({
      productName: "Chocolate Bar",
      quantity: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="page-content fade-in">
      <header className="header-flex">
        <div>
          <h1>🏭 Factory Production</h1>
          <p className="subtitle">
            Currently monitoring:{" "}
            <span className="highlight-text">{currentMonth}</span>
          </p>
        </div>
        <div className="system-status">
          <span className="pulse-dot"></span> Floor Active
        </div>
      </header>

      <section className="standard-form card production-border">
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Product Type
            <select
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            >
              <option>Chocolate Bar</option>
              <option>Gummy Bears</option>
              <option>Lollipops</option>
              <option>Candy Mix Bag</option>
            </select>
          </label>

          <label>
            Total Units Made
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="Enter amount"
              required
            />
          </label>

          <label>
            Production Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </label>

          <button type="submit" className="save-btn production-theme">
            Confirm & Log Batch
          </button>
        </form>
      </section>

      {/* --- FILTERED PRODUCTION LOG --- */}
      <div className="table-container card mt-2">
        <div className="table-header-flex">
          <h3>Daily Output Log</h3>
          <span className="period-badge">{currentMonth}</span>
        </div>
        <table className="erp-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Logged By</th>
            </tr>
          </thead>
          <tbody>
            {production.length > 0 ? (
              production.map((p) => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td>{p.productName}</td>
                  <td className="font-bold text-blue">
                    {p.quantity.toLocaleString()} units
                  </td>
                  <td className="text-muted small">
                    {p.addedBy?.split("@")[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-row-msg">
                  📡 No production runs found for {currentMonth}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
