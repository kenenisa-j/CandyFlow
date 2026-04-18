export default function Chart({ expenses, sales }) {
  // Group data by month
  const monthlyData = {};

  expenses.forEach((exp) => {
    const month = exp.date.slice(0, 7); // YYYY-MM
    monthlyData[month] = monthlyData[month] || { expenses: 0, sales: 0 };
    monthlyData[month].expenses += Number(exp.amount || 0);
  });

  sales.forEach((sale) => {
    const month = sale.date.slice(0, 7);
    monthlyData[month] = monthlyData[month] || { expenses: 0, sales: 0 };
    monthlyData[month].sales += Number(sale.total || 0);
  });

  // Sort months
  const months = Object.keys(monthlyData).sort();

  // Find max value for scaling
  const maxValue = Math.max(
    ...months.flatMap((month) => [
      monthlyData[month].expenses,
      monthlyData[month].sales,
    ])
  );

  // Format month display
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="chart">
      <h2>Monthly Expenses vs Sales</h2>
      <div className="chart-container">
        {months.map((month) => (
          <div key={month} className="month-group">
            <div className="month-label">{formatMonth(month)}</div>
            <div className="bars">
              <div className="bar-container">
                <span className="bar-label">Expenses</span>
                <div
                  className="bar expenses-bar"
                  style={{
                    width: maxValue > 0 ? `${(monthlyData[month].expenses / maxValue) * 100}%` : "0%",
                  }}
                ></div>
                <span className="bar-value">${monthlyData[month].expenses.toFixed(2)}</span>
              </div>
              <div className="bar-container">
                <span className="bar-label">Sales</span>
                <div
                  className="bar sales-bar"
                  style={{
                    width: maxValue > 0 ? `${(monthlyData[month].sales / maxValue) * 100}%` : "0%",
                  }}
                ></div>
                <span className="bar-value">${monthlyData[month].sales.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
