import "./DashboardCard.css";

export default function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">

      <h3>{value}</h3>

      <p>{title}</p>

    </div>
  );
}