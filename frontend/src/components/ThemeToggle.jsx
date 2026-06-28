function ThemeToggle({ theme, onThemeChange }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle-btn ${isDark ? "dark" : "light"}`}
      onClick={() => onThemeChange(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      id="theme-toggle"
    >
      <span className="theme-icon-wrapper">
        <span className={`theme-icon sun ${!isDark ? "visible" : ""}`}>☀️</span>
        <span className={`theme-icon moon ${isDark ? "visible" : ""}`}>🌙</span>
      </span>
    </button>
  );
}

export default ThemeToggle;
