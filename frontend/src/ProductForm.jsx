import { useState } from "react";
import { apiRequest } from "./api";

export default function ProductForm({ onSuccess }) {
  const [p, setP] = useState({ name: "", description: "", price: "" });
  const [msg, setMsg] = useState("");

  async function create() {
    try {
      const res = await apiRequest("/products", "POST", { ...p, price: Number(p.price) });
      setMsg("Product added");
      setP({ name: "", description: "", price: "" });
      onSuccess?.();
      return res;
    } catch (e) {
      console.error("Create product failed", e);
      setMsg("Add failed: " + (e?.message || e));
    }
  }

  return (
    <div>
      <h3>Create Product</h3>
      <input placeholder="Name" value={p.name}
        onChange={e => setP({ ...p, name: e.target.value })} />
      <input placeholder="Description" value={p.description}
        onChange={e => setP({ ...p, description: e.target.value })} />
      <input type="number" placeholder="Price" value={p.price}
        onChange={e => setP({ ...p, price: e.target.value })} />
      <button onClick={create}>Add</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
