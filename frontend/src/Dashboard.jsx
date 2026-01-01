import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { getRole } from "./auth";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  function refresh() {
    setRefreshKey(k => k + 1);
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {}
      {getRole() === "ADMIN" && (
        <>
          <button onClick={refresh}>Get/Refresh Products</button>
          <ProductForm onSuccess={refresh} />
        </>
      )}
      <ProductList key={refreshKey} />
    </div>
  );
}

function UserProducts() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h3>User Products</h3>
      {!show ? (
        <button onClick={() => setShow(true)}>Get Products</button>
      ) : (
        <ProductList />
      )}
    </div>
  );
}
