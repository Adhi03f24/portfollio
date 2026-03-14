import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../data/profile";
import "./Admin.css";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const correctPass = profile.settings?.adminPass || "adhi2024";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password === correctPass) {
      setAuthenticated(true);
    } else {
      setError("Access denied.");
    }
  };

  if (authenticated) {
    return (
      <div className="admin-page">
        <div className="admin-panel glass-panel">
          <h1>ADMIN — Systems Operational</h1>
          <p>You are logged in. Content management can be extended here.</p>
          <button type="button" className="admin-back" onClick={() => navigate("/")}>
            ← Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-login glass-panel">
        <span className="admin-sec-num">ADMIN</span>
        <h1>Secure access</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <span className="admin-label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter passphrase"
              className="admin-input"
              autoFocus
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-submit">ENTER</button>
        </form>
        <button type="button" className="admin-back" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
}
