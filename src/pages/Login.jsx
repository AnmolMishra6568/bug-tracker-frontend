// Auth page with Login & Register tabs
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../features/authSlice.js";
import { Navigate } from "react-router-dom";

export default function Login(){
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const dispatch = useDispatch();
  const token = useSelector(s => s.auth.token);
  const error = useSelector(s => s.auth.error);
  if (token) return <Navigate to="/" replace />;

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (tab === "login") dispatch(login({ email: form.email, password: form.password }));
    else dispatch(register(form));
  };

  return (
    <div className="container" style={{maxWidth: 520}}>
      <div className="card p-3 mt-5">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, borderBottom: "2px solid #ccc" }}>
  <button
    onClick={() => setTab("login")}
    style={{
      padding: "10px 30px",
      border: "none",
      borderBottom: tab === "login" ? "3px solid #1D4ED8" : "3px solid transparent",
      background: "none",
      fontWeight: tab === "login" ? "600" : "500",
      color: tab === "login" ? "#1D4ED8" : "#555",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s",
    }}
  >
    Login
  </button>

  <button
    onClick={() => setTab("register")}
    style={{
      padding: "10px 30px",
      border: "none",
      borderBottom: tab === "register" ? "3px solid #1D4ED8" : "3px solid transparent",
      background: "none",
      fontWeight: tab === "register" ? "600" : "500",
      color: tab === "register" ? "#1D4ED8" : "#555",
      cursor: "pointer",
      outline: "none",
      transition: "all 0.3s",
    }}
  >
    Register
  </button>
</div>


        <form onSubmit={submit}>
          {tab === "register" && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" name="name" value={form.name} onChange={onChange} required />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary w-100" type="submit">
            {tab === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
