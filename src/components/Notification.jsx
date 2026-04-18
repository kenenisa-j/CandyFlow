export default function Notification({ lowStockItems, highExpenseItems }) {
  const hasNotifications = lowStockItems.length > 0 || highExpenseItems.length > 0;

  if (!hasNotifications) return null;

  return (
    <div className="notifications">
      {lowStockItems.map((item) => (
        <div key={`low-stock-${item.id}`} className="notification low-stock">
          <span className="notification-icon">⚠️</span>
          <span className="notification-text">
            Low stock: {item.name} ({item.quantity} {item.unit} remaining)
          </span>
        </div>
      ))}
      {highExpenseItems.map((item) => (
        <div key={`high-expense-${item.id}`} className="notification high-expense">
          <span className="notification-icon">💰</span>
          <span className="notification-text">
            High expense: {item.name} (${item.amount})
          </span>
        </div>
      ))}
    </div>
  );
}
