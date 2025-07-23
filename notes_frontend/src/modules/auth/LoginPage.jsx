import React, { useState } from "react";
import { useAuth } from "./context";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, authError, clearError } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    clearError();
    const success = await login(form);
    setLoading(false);
    if (success) navigate("/");
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {authError && <div className="auth-error">{authError}</div>}
        <input
          required
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={form.username}
          onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button className="accent" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{ marginTop: 16 }}>
          No account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
