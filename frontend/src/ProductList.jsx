import { useState, useEffect } from "react";
import { apiRequest } from "./api";
import { getRole } from "./auth";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = getRole();

  async function load() {
    try {
      const res = await apiRequest("/products", "GET");
      setProducts(res || []);
      setError("");
    } catch (e) {
      console.error("Failed to load products", e);
      setProducts([]);
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm("Delete this product?")) return;
    try {
      await apiRequest(`/products/${id}`, "DELETE");
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  }

  async function edit(p) {
    const name = prompt("Name", p.name);
    if (name == null) return;
    const price = prompt("Price", String(p.price));
    if (price == null) return;
    const description = prompt("Description", p.description || "");
    try {
      const updated = { ...p, name, price: Number(price), description };
      const res = await apiRequest(`/products/${p.id}`, "PUT", updated);
      setProducts(products.map(x => x.id === p.id ? res : x));
    } catch (e) {
      console.error("Update failed", e);
      alert("Update failed");
    }
  }

  if (loading) return <p>Loading products…</p>;

  if (error) return (
    <div>
      <p style={{ color: "red" }}>Failed to load products: {error}</p>
      <button onClick={load}>Retry</button>
    </div>
  );

  return (
    <div>
      <h3>Products</h3>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {p.name} — ${p.price}
              {role === "ADMIN" && (
                <span style={{ marginLeft: 12 }}>
                  <button onClick={() => edit(p)}>Edit</button>
                  <button onClick={() => remove(p.id)} style={{ marginLeft: 6 }}>Delete</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
