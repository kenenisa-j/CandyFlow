export default function Card({ title, children }) {
  const getIcon = (title) => {
    if (title.includes("Expenses")) return "💰";
    if (title.includes("Sales")) return "💵";
    if (title.includes("Production")) return "🏭";
    if (title.includes("Attendance")) return "👥";
    return "📊";
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">{getIcon(title)}</span>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
    </div>
  );
}
