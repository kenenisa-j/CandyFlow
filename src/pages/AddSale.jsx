import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddSale({ setSales, sales = [], currentMonth }) {
  const { user } = useAuth();
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("Chocolate Bar");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  // Precise calculation for the UI preview
  const currentTotal = Number(quantity || 0) * Number(price || 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulate database delay for a professional feel
    setTimeout(() => {
      const newSale = {
        id: Date.now(),
        customerName,
        productName,
        quantity: Number(quantity),
        price: Number(price),
        total: Number(currentTotal.toFixed(2)), // Sanitize to 2 decimal places as a Number
        date, // Uses the selected date for Monthly filtering
        addedBy: user.email,
      };

      // Push to the Master List in App.js
      setSales((prev) => [...prev, newSale]);

      alert(`Sale Recorded: $${currentTotal.toFixed(2)} for ${customerName}`);

      // Reset form
      setCustomerName("");
      setQuantity("");
      setPrice("");
      setLoading(false);
    }, 600);
  };

  return (
    <section className="page-content fade-in">
      <div className="header-flex">
        <div>
          <h1>💰 Revenue Entry</h1>
          <p className="subtitle">
            Recording sales for period:{" "}
            <span className="highlight-text">{currentMonth}</span>
          </p>
        </div>
        <div className="user-badge-mini">Admin: {user.email.split("@")[0]}</div>
      </div>

      <form onSubmit={handleSubmit} className="standard-form card sale-border">
        <div className="form-grid">
          <label>
            Customer / Entity
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="e.g., Addis Supermarket"
            />
          </label>

          <label>
            Product
            <select
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            >
              <option>Chocolate Bar</option>
              <option>Gummy Bears</option>
              <option>Lollipops</option>
              <option>Candy Mix Bag</option>
            </select>
          </label>

          <label>
            Quantity (Units)
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              placeholder="0"
            />
          </label>

          <label>
            Unit Price ($)
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="0.00"
            />
          </label>

          <label>
            Sale Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="total-panel">
          <div className="total-label">Grand Total</div>
          <div className="total-amount">
            $
            {currentTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>

        <button
          type="submit"
          className="save-btn sale-theme"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm & Complete Sale"}
        </button>
      </form>

      <div className="table-container card mt-2">
        <div className="table-header-flex">
          <h3>Recent Sales Activity</h3>
          <span className="period-badge">{currentMonth}</span>
        </div>
        <div className="table-wrapper">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                [...sales]
                  .reverse()
                  .slice(0, 5)
                  .map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.date}</td>
                      <td>{sale.customerName}</td>
                      <td>{sale.productName}</td>
                      <td>{sale.quantity}</td>
                      <td className="text-green font-bold">
                        +$
                        {Number(sale.total).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-row-msg">
                    No sales recorded in {currentMonth}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
