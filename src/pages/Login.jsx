import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const success = login(email, password);

      if (success) {
        // Redirect based on role
        if (email === "owner@test.com") {
          navigate("/dashboard");
        } else {
          navigate("/add-expense");
        }
      } else {
        setError("Invalid credentials. Access Denied.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="login-page-wrapper">
      <div className="login-card fade-in">
        <div className="login-brand">
          <span className="brand-icon">🍭</span>
          <h1>
            CandyFlow <span className="text-primary">ERP</span>
          </h1>
          <p className="subtitle">Secure Terminal Access</p>
        </div>

        {error && (
          <div className="error-alert">
            <span className="alert-icon">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="cyber-form">
          <div className="input-group">
            <label>Authentication Email</label>
            <input
              type="email"
              placeholder="name@candyflow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="cyber-input"
            />
          </div>

          <div className="input-group">
            <label>Security Key</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="cyber-input"
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? (
              <span className="loading-flex">
                <span className="spinner"></span> Establishing Link...
              </span>
            ) : (
              "Initialize Session"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>System v2.4.0 | Encrypted Connection</p>
        </div>
      </div>
      <div className="bg-glow"></div>
    </section>
  );
}
