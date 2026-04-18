export default function BusinessChart({ expenses, sales }) {
  // Simple logic to compare totals
  const totalExp = expenses.reduce((s, i) => s + Number(i.amount), 0);
  const totalSale = sales.reduce((s, i) => s + Number(i.total), 0);

  const max = Math.max(totalExp, totalSale, 1);
  const expHeight = (totalExp / max) * 100;
  const saleHeight = (totalSale / max) * 100;

  return (
    <div className="chart-box">
      <div className="bar-container">
        <div className="bar expense" style={{ height: `${expHeight}%` }}>
          <span>${totalExp}</span>
        </div>
        <div className="bar sale" style={{ height: `${saleHeight}%` }}>
          <span>${totalSale}</span>
        </div>
      </div>
      <div className="bar-labels">
        <label>Total Expenses</label>
        <label>Total Sales</label>
      </div>
    </div>
  );
}
