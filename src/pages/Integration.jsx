export default function Integration() {
  return (
    <div className="page">

      <div className="page-header">
        <h1>Integration Steps</h1>
        <button>Save Changes</button>
      </div>

      <div className="page-card">

        <label>Heading</label>
        <input />

        <label>Description</label>
        <textarea rows="4"></textarea>

        <hr />

        <h3>Step 1</h3>

        <input placeholder="Title" />

        <textarea placeholder="Description"></textarea>

      </div>

    </div>
  );
}