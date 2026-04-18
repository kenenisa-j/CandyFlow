import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddExpense({
  setExpenses,
  expenses = [],
  currentMonth,
}) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("Raw Materials");
  const [receipt, setReceipt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setReceipt(file ? file.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Precise numeric conversion to prevent dashboard calculation bugs
    const numericAmount = parseFloat(amount);

    setTimeout(() => {
      const newExpense = {
        id: Date.now(),
        name,
        amount: numericAmount,
        date,
        category,
        receipt,
        addedBy: user.email,
      };

      // Push to the master state in App.js
      setExpenses((prev) => [...prev, newExpense]);

      alert(`Expense Recorded: $${numericAmount.toFixed(2)} for ${name}`);

      // Clear form
      setName("");
      setAmount("");
      setReceipt("");
      setLoading(false);
    }, 600);
  };

  return (
    <section className="page-content fade-in">
      <div className="header-flex">
        <div>
          <h1>💸 Expense Tracking</h1>
          <p className="subtitle">
            Currently logging for:{" "}
            <span className="highlight-text">{currentMonth}</span>
          </p>
        </div>
        <div className="user-badge-mini">
          Operator: {user.email.split("@")[0]}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="standard-form card expense-border"
      >
        <div className="form-grid">
          <label>
            Expense Name / Item
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Sugar Supply (100kg)"
            />
          </label>

          <label>
            Classification
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Raw Materials</option>
              <option>Packaging</option>
              <option>Maintenance</option>
              <option>Electricity/Water</option>
              <option>Logistics</option>
              <option>Staff Welfare</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Amount Paid ($)
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
            />
          </label>

          <label>
            Billing Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label className="file-upload">
            Attach Receipt (Optional)
            <input type="file" onChange={handleFileChange} />
            <span className="file-status">{receipt || "No file chosen"}</span>
          </label>
        </div>

        <button
          type="submit"
          className="save-btn expense-theme"
          disabled={loading}
        >
          {loading ? "Processing..." : "Log Expense to System"}
        </button>
      </form>

      {/* --- RECENT HISTORY SECTION --- */}
      <div className="table-container card mt-2">
        <div className="table-header-flex">
          <h3>Transaction History</h3>
          <span className="period-badge">{currentMonth}</span>
        </div>
        <table className="erp-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              [...expenses]
                .reverse()
                .slice(0, 8)
                .map((exp) => (
                  <tr key={exp.id}>
                    <td>{exp.date}</td>
                    <td>
                      <strong>{exp.name}</strong>
                    </td>
                    <td>
                      <span className="badge-pill">{exp.category}</span>
                    </td>
                    <td className="text-red font-bold">
                      -$
                      {Number(exp.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-row-msg">
                  📡 No costs logged for {currentMonth}. System clear.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
