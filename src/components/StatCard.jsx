export default function StatCard({ title, value, color = "purple" }) {
  return (
    <div className={`stat-card border-${color}`}>
      <p className="stat-title">{title}</p>
      <h3 className={`stat-value text-${color}`}>{value}</h3>
    </div>
  );
}
