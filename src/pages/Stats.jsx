export default function Stats() {
  return (
    <div className="page">

      <div className="page-header">
        <h1>Stats / Counters</h1>
        <button>Save Changes</button>
      </div>

      <div className="page-card">

        <div className="stats-grid">

          <div className="stat-box">
            <h3>Counter 1</h3>

            <input placeholder="Value" />

            <input placeholder="Label" />
          </div>

          <div className="stat-box">
            <h3>Counter 2</h3>

            <input placeholder="Value" />

            <input placeholder="Label" />
          </div>

          <div className="stat-box">
            <h3>Counter 3</h3>

            <input placeholder="Value" />

            <input placeholder="Label" />
          </div>

          <div className="stat-box">
            <h3>Counter 4</h3>

            <input placeholder="Value" />

            <input placeholder="Label" />
          </div>

        </div>

      </div>

    </div>
  );
}