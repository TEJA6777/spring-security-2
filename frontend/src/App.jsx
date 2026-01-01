import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { getToken, clearToken } from "./auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  function logout() {
    clearToken();
    setLoggedIn(false);
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h1>Primetrade – Product Management</h1>

      {!loggedIn ? (
        <>
          <Register />
          <Login onLogin={() => setLoggedIn(true)} />
        </>
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <Dashboard />
        </>
      )}
    </div>
  );
}
