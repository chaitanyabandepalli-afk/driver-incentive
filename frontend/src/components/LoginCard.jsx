import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const API_BASE_URL = "https://driver-incentive-1.onrender.com/api";

function LoginCard({ onLogin, t, language, onLanguageChange, theme, onThemeChange }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError(t("login.fillBoth"));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid username or password.");
      }

      const userData = await response.json();
      onLogin(userData); // { email, name, role }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Header-like floating controls on Login Screen */}
      <div className="login-controls">
        <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
      </div>

      <div className="login-card-wrapper">
        <div className="login-header">
          <p className="login-tag">{t("login.tag")}</p>
          <h2>{t("login.title")}</h2>
          <p>{t("login.subtitle")}</p>
        </div>

        {error && <div className="login-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{t("login.username")}</label>
            <input
              id="username"
              type="text"
              placeholder={t("login.usernamePlaceholder")}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="login-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("login.password")}</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login-input"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? t("login.submitting") : t("login.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
