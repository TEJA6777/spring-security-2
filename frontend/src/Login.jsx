import { useState } from "react";
import { apiRequest } from "./api";
import { setToken, setRole } from "./auth";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  async function login() {
    try {
      const res = await apiRequest("/auth/login", "POST", form);
      setToken(res.token);
      // backend returns role in the login response (JwtResponse.role)
      if (res.role) setRole(res.role);
      setMsg("Login successful");
      onLogin?.();
    } catch (e) {
      setMsg("Login failed");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {msg && <p>{msg}</p>}
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={login}>Login</button>
    </div>
  );
}
