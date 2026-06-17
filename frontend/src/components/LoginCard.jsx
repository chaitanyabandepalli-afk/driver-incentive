import { useState } from "react";

function LoginCard({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (
      (trimmedUser === "admin" && trimmedPass === "admin") ||
      (trimmedUser === "chaitanyabandepalli@gmail.com" && trimmedPass === "123456")
    ) {
      onLogin({ username: trimmedUser, role: "admin" });
    } else if (trimmedUser === "user" && trimmedPass === "user") {
      onLogin({ username: "user", role: "user" });
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleQuickLogin = (roleName) => {
    setError("");
    if (roleName === "admin") {
      onLogin({ username: "admin", role: "admin" });
    } else {
      onLogin({ username: "user", role: "user" });
    }
  };

  return (
    <div className="login-container">
      {/* Background Video wrapper to match styling */}
      <div className="login-video-bg">
        <video autoPlay muted loop playsInline>
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="login-video-overlay"></div>
      </div>

      <div className="login-card-wrapper">
        <div className="login-header">
          <p className="login-tag">Manivtha Tours &amp; Travels</p>
          <h2>Driver Tracker Login</h2>
          <p>Sign in to access driver incentives and performance metrics.</p>
        </div>

        {error && <div className="login-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username (e.g. admin)"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login-input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn">
            Sign In
          </button>
        </form>

        <div className="demo-credentials-box">
          <h3>Demo Accounts</h3>
          <p>Click below for quick access or use credentials:</p>
          <div className="quick-login-buttons">
            <button
              type="button"
              className="quick-login-btn admin-btn"
              onClick={() => handleQuickLogin("admin")}
            >
              🔑 Admin Access
              <small>Full read/write (admin / admin)</small>
            </button>

            <button
              type="button"
              className="quick-login-btn user-btn"
              onClick={() => handleQuickLogin("user")}
            >
              👥 User Access
              <small>Read-only (user / user)</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
