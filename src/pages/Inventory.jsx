import { useState } from "react";

export default function Inventory({ inventory, setInventory }) {
  return (
    <section className="inventory-container fade-in">
      <div className="inventory-header">
        <div className="header-title">
          <span className="icon">📦</span>
          <div>
            <h1>Material Intelligence</h1>
            <p className="subtitle">
              Real-time raw material tracking & stock levels
            </p>
          </div>
        </div>
      </div>

      <div className="inventory-card">
        <table className="cyber-table">
          <thead>
            <tr>
              <th>Material Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Unit</th>
              <th>System Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const isLow = item.quantity < 10;
              return (
                <tr key={item.id} className={isLow ? "low-stock-row" : ""}>
                  <td className="font-bold">{item.name}</td>
                  <td>
                    <span className="type-badge">{item.type}</span>
                  </td>
                  <td className={isLow ? "text-danger" : "text-success"}>
                    {item.quantity}
                  </td>
                  <td className="text-muted">{item.unit}</td>
                  <td>
                    {isLow ? (
                      <span className="status-badge critical">Low Stock</span>
                    ) : (
                      <span className="status-badge stable">Stable</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
