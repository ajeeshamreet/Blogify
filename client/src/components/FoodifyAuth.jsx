import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { signup, login, getUser, logout } from "../api";

export default function FoodifyAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUser();
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const handleSignup = async (data) => {
    try {
      setError("");
      const res = await signup(data); 
      setUser(res.data.user);
      alert(`Logged in as ${res.data.user.username}`);
    } catch (err) {
      if (err.response?.status === 409) {
        try {
          const loginRes = await login({ identifier: data.email, password: data.password });
          setUser(loginRes.data.user);
          alert(`Logged in as ${loginRes.data.user.username}`);
        } catch {
          setError("User already exists but login failed.");
        }
      } else {
        setError(err.response?.data?.message || "Signup failed. Try again.");
      }
    }
  };

  const handleLogin = async (data) => {
    try {
      setError("");
      const res = await login(data);
      setUser(res.data.user);
      alert(`Logged in as ${res.data.user.username}`);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      alert("Logged out");
    } catch {
      setError("Logout failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Foodify</h1>
        <p className="subtitle">Smart Food Ordering & Delivery System</p>

        {!user ? (
          <AuthForm
            onSignup={handleSignup}
            onLogin={handleLogin}
            error={error}
          />
        ) : (
          <>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
              Logged in as: <b>{user.username}</b>
            </p>
            <button className="submit-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
