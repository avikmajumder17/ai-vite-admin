export default function CoreCapabilities() {
  return (
    <div className="page">

      <div className="page-header">
        <h1>Core Capabilities</h1>
        <button>Save Changes</button>
      </div>

      <div className="page-card">

        <label>Section Heading</label>
        <input type="text" />

        <label>Section Sub Heading</label>
        <input type="text" />

        <hr />

        <h3>Capability 1</h3>

        <input placeholder="Icon" />

        <input placeholder="Title" />

        <textarea placeholder="Description"></textarea>

      </div>

    </div>
  );
}