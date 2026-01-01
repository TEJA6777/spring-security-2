import { useState } from "react";
import { apiRequest } from "./api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [msg, setMsg] = useState("");

  async function register() {
    try {
      await apiRequest("/auth/register", "POST", form);
      setMsg("Registered successfully");
    } catch {
      setMsg("Registration failed");
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {msg && <p>{msg}</p>}
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={register}>Register</button>
    </div>
  );
}
