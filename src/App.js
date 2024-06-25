import React, { useState } from "react";
const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      console.log("Login successful:", data);
      setLoading(false);
      setError("");
      alert("Login successful!");
    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Login</h2>
        <p>Use your Google Account</p>
      </div>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
      <div className="login-footer">
        <p>Don't have an account?</p>
        <p className="signup-link">Sign up</p>
      </div>
    </div>
  );
};

export default App;
