import React from "react";

export default function Archive({
  sales = [],
  expenses = [],
  production = [],
}) {
  // 1. Extract all unique months from across all datasets
  const allDates = [
    ...sales.map((s) => s.date),
    ...expenses.map((e) => e.date),
    ...production.map((p) => p.date),
  ];

  // Creates a unique list of YYYY-MM strings
  const uniqueMonths = [...new Set(allDates.map((d) => d?.slice(0, 7)))]
    .filter(Boolean)
    .sort()
    .reverse();

  // 2. Calculation Helper
  const getMonthStats = (monthKey) => {
    const monthSales = sales.filter((s) => s.date?.startsWith(monthKey));
    const monthExpenses = expenses.filter((e) => e.date?.startsWith(monthKey));
    const monthProduction = production.filter((p) =>
      p.date?.startsWith(monthKey),
    );

    const totalRev = monthSales.reduce(
      (sum, s) => sum + (Number(s.total) || 0),
      0,
    );
    const totalExp = monthExpenses.reduce(
      (sum, e) => sum + (Number(e.amount) || 0),
      0,
    );
    const totalProd = monthProduction.reduce(
      (sum, p) => sum + (Number(p.quantity) || 0),
      0,
    );

    return {
      label: new Date(monthKey + "-02").toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      revenue: totalRev,
      expenses: totalExp,
      profit: totalRev - totalExp,
      units: totalProd,
    };
  };

  return (
    <div className="page-content fade-in">
      <header className="header-flex">
        <div>
          <h1>📂 Financial Archive</h1>
          <p className="subtitle">
            Historical performance and monthly summaries.
          </p>
        </div>
      </header>

      {/* --- QUICK SUMMARY CARDS --- */}
      <div className="archive-stats-grid">
        <div className="archive-card-mini">
          <label>Operating History</label>
          <div className="value">{uniqueMonths.length} Months</div>
        </div>
        <div className="archive-card-mini">
          <label>All-Time Revenue</label>
          <div className="value text-green">
            $
            {sales
              .reduce((sum, s) => sum + (Number(s.total) || 0), 0)
              .toLocaleString()}
          </div>
        </div>
      </div>

      {/* --- HISTORICAL TIMELINE TABLE --- */}
      <div className="table-container card mt-2 archive-border">
        <div className="table-header-flex">
          <h3>Historical Timeline</h3>
          <span className="badge-pill">Master Audit</span>
        </div>
        <table className="erp-table">
          <thead>
            <tr>
              <th>Month / Year</th>
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Net Profit</th>
              <th>Production</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {uniqueMonths.length > 0 ? (
              uniqueMonths.map((mKey) => {
                const stats = getMonthStats(mKey);
                return (
                  <tr key={mKey}>
                    <td className="font-bold">{stats.label}</td>
                    <td className="text-green">
                      ${stats.revenue.toLocaleString()}
                    </td>
                    <td className="text-red">
                      -${stats.expenses.toLocaleString()}
                    </td>
                    <td
                      className={`font-bold ${stats.profit >= 0 ? "text-purple" : "text-red"}`}
                    >
                      {stats.profit < 0 ? "-" : ""}$
                      {Math.abs(stats.profit).toLocaleString()}
                    </td>
                    <td>{stats.units.toLocaleString()} units</td>
                    <td>
                      <span
                        className={`status-tag ${stats.profit >= 0 ? "present" : "absent"}`}
                      >
                        {stats.profit >= 0 ? "PROFITABLE" : "LOSS"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="empty-row-msg">
                  📡 No archived data found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
