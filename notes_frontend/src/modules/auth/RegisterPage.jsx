import React, { useState } from "react";
import { useAuth } from "./context";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register, authError, clearError } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    clearError();
    const success = await register(form);
    setLoading(false);
    if (success) navigate("/login");
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
          autoComplete="new-password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button className="accent" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Register"}
        </button>
        <div style={{ marginTop: 16 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
