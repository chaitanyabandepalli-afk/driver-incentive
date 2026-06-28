import { useEffect, useState } from "react";
import "./App.css";
import DriverEntryForm from "./components/DriverEntryForm";
import DriverDashboard from "./components/DriverDashboard";
import ReportsAnalytics from "./components/ReportsAnalytics";
import LoginCard from "./components/LoginCard";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ThemeToggle from "./components/ThemeToggle";
import { t as translate } from "./translations";

const API_BASE_URL = "https://driver-incentive-1.onrender.com/api";


function App() {
  const [activePage, setActivePage] = useState("home");
  const [driverRecords, setDriverRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wakingUp, setWakingUp] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Language & Theme state with localStorage persistence
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app-language") || "en";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app-theme") || "dark";
  });

  // Translation helper bound to current language
  const t = (key, params) => translate(language, key, params);

  // Apply theme on mount and change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  // Persist language preference
  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    goToPage("home");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(t("header.logoutConfirm"));
    if (confirmLogout) {
      setCurrentUser(null);
      setEditingRecord(null);
      setShowNotifications(false);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/audit-logs`);
      if (response.ok) {
        const data = await response.json();
        setAuditLogs(data);
      }
    } catch (err) {
      console.error("Failed to fetch audit logs:", err);
    }
  };

  const fetchRecords = async (retries = 15) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/records`);
      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }
      const data = await response.json();
      setDriverRecords(data);
      setWakingUp(false);
      setRetryAttempt(0);
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (retries > 0) {
        setWakingUp(true);
        setRetryAttempt(16 - retries);
        // Wait 5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return fetchRecords(retries - 1);
      }
      setWakingUp(false);
      setRetryAttempt(0);
      setError(t("error.connection"));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchAuditLogs();
  }, []);

  useEffect(() => {
    if (activePage === "form" && currentUser && currentUser.role === "user") {
      goToPage("home");
    }
  }, [activePage, currentUser]);

  useEffect(() => {
    const newAlerts = [];
    let alertId = 1;

    driverRecords.forEach((record) => {
      // 1. Check for low punctuality (below 85%)
      if (record.punctualityPercentage < 85) {
        newAlerts.push({
          id: alertId++,
          type: "warning",
          title: t("alert.lowPunctuality"),
          message: `${record.driverName} (${record.driverId}) - ${record.punctualityPercentage}% ${t("form.punctuality").toLowerCase()} - ${record.month}.`,
          time: t("alert.justNow")
        });
      }

      // 2. Check for high complaints
      if (record.complaints > 1) {
        newAlerts.push({
          id: alertId++,
          type: "danger",
          title: t("alert.complaints"),
          message: `${record.driverName} - ${record.complaints} ${t("form.complaints").toLowerCase()}. ${t("table.rating")}: ${record.customerRating}/5.`,
          time: t("alert.justNow")
        });
      }

      // 3. Check for Pending review
      if (record.status === "Pending") {
        newAlerts.push({
          id: alertId++,
          type: "info",
          title: t("alert.pendingReview"),
          message: `${record.driverName} (${record.month}) - ${t("dash.pending").toLowerCase()}.`,
          time: t("alert.reviewNeeded")
        });
      }
    });

    if (driverRecords.length > 0) {
      newAlerts.push({
        id: alertId++,
        type: "deadline",
        title: t("alert.submitLogs"),
        message: t("alert.deadline"),
        time: t("alert.systemReminder")
      });
    }

    setAlerts(newAlerts);
  }, [driverRecords, language]);

  const goToPage = (pageName) => {
    setActivePage(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addDriverRecord = async (newRecord) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newRecord, performedBy: currentUser?.email || "Admin" }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors ? data.errors.join("\n") : data.error || "Failed to save record"
        );
      }
      setDriverRecords((prevRecords) => [data, ...prevRecords]);
      setEditingRecord(null);
      goToPage("dashboard");
      alert(t("form.savedSuccess"));
      await fetchAuditLogs();
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDriverRecord = async (updatedRecord) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/records/${updatedRecord.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedRecord, performedBy: currentUser?.email || "Admin" }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors ? data.errors.join("\n") : data.error || "Failed to update record"
        );
      }
      setDriverRecords((prevRecords) =>
        prevRecords.map((record) => (record.id === updatedRecord.id ? data : record))
      );
      setEditingRecord(null);
      goToPage("dashboard");
      alert(t("form.updatedSuccess"));
      await fetchAuditLogs();
    } catch (err) {
      console.error(err);
      alert(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDriverStatus = async (recordId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/records/${recordId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, performedBy: currentUser?.email || "Admin" }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }
      setDriverRecords((prevRecords) =>
        prevRecords.map((record) => (record.id === recordId ? data : record))
      );
      await fetchAuditLogs();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const clearAllRecords = async () => {
    const confirmClear = window.confirm(t("dash.confirmClear"));

    if (confirmClear) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/records/clear`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ performedBy: currentUser?.email || "Admin" }),
        });
        if (!response.ok) {
          throw new Error("Failed to clear records");
        }
        setDriverRecords([]);
        setEditingRecord(null);
        await fetchAuditLogs();
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteDriverRecord = async (recordId) => {
    const confirmDelete = window.confirm(t("dash.confirmDelete"));

    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/records/${recordId}?performedBy=${encodeURIComponent(currentUser?.email || "Admin")}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete record");
        }
        setDriverRecords((prevRecords) =>
          prevRecords.filter((record) => record.id !== recordId)
        );

        if (editingRecord && editingRecord.id === recordId) {
          setEditingRecord(null);
        }
        await fetchAuditLogs();
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const startEditRecord = (record) => {
    setEditingRecord(record);
    goToPage("form");
  };

  const cancelEdit = () => {
    setEditingRecord(null);
    goToPage("dashboard");
  };

  const loadSampleRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/records/seed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ performedBy: "System" }),
      });
      if (!response.ok) {
        throw new Error("Failed to load sample records");
      }
      await fetchRecords();
      await fetchAuditLogs();
      goToPage("dashboard");
      alert(t("form.sampleSuccess"));
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };


  let videoSrc = "/background.mp4";
  if (!currentUser) {
    videoSrc = "/background.mp4";
  } else if (activePage === "dashboard") {
    videoSrc = "/dashboard-bg.mp4";
  } else if (activePage === "form") {
    videoSrc = "/form-bg.mp4";
  } else if (activePage === "reports") {
    videoSrc = "/reports-bg.mp4";
  } else {
    videoSrc = "/background.mp4";
  }

  if (!currentUser) {
    return (
      <>
        <div className="global-video-bg">
          <video key={videoSrc} autoPlay muted loop playsInline>
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="global-video-overlay"></div>
        </div>
        <LoginCard onLogin={handleLogin} t={t} language={language} onLanguageChange={setLanguage} theme={theme} onThemeChange={setTheme} />
      </>
    );
  }

  return (
    <div className="app">
      <div className="global-video-bg">
        <video key={videoSrc} autoPlay muted loop playsInline>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="global-video-overlay"></div>
      </div>

      {/* Global Header Bar */}
      <header className="global-header">
        <div className="header-brand">
          <span className="logo-icon">🚗</span>
          <h1>{t("header.brand")}</h1>
        </div>
        <div className="header-user-info">
          {/* Language Switcher */}
          <LanguageSwitcher language={language} onLanguageChange={setLanguage} />

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} onThemeChange={setTheme} />

          {/* Notification Bell Dropdown */}
          <div className="notification-bell-container">
            <button
              type="button"
              className="notification-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {alerts.length > 0 && <span className="notification-badge">{alerts.length}</span>}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-dropdown-header">
                  <h4>{t("notifications.title")}</h4>
                  <button type="button" onClick={() => setAlerts([])}>{t("notifications.clear")}</button>
                </div>
                <div className="notification-dropdown-body">
                  {alerts.length === 0 ? (
                    <div className="notification-empty">{t("notifications.empty")}</div>
                  ) : (
                    alerts.map((alert) => (
                      <div key={alert.id} className={`notification-item ${alert.type}`}>
                        <div className="notification-item-text">
                          <strong>{alert.title}</strong>
                          <p>{alert.message}</p>
                        </div>
                        <small>{alert.time}</small>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <span className={`role-badge ${currentUser.role}`}>
            {currentUser.role === "admin" ? t("header.admin") : t("header.user")}
          </span>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            {t("header.logout")}
          </button>
        </div>

      </header>

      {error && (
        <div className="connection-error-banner">
          <span>⚠️ {error}</span>
          <button type="button" onClick={fetchRecords} className="retry-btn">{t("error.retry")}</button>
        </div>
      )}

      {loading && (
        <div className="app-loading-overlay">
          <div className="spinner"></div>
          <p>
            {wakingUp
              ? `${t("loading.wakingUp")} (${t("loading.attempt")} ${retryAttempt}/15 - ${t("loading.coldStart")})`
              : t("loading.connecting")}
          </p>
        </div>
      )}

      {activePage === "home" && (
        <main className="app-page home-view">
          {/* ── Hero Section ── */}
          <section className="home-hero">
            <div className="home-hero-content">
              <p className="tagline">{t("home.tagline")}</p>

              <h1>{t("home.title")}</h1>

              <p className="hero-description">
                {t("home.description")}
              </p>

              <div className="home-actions-grid">
                <button
                  type="button"
                  className="nav-card primary-nav-card"
                  onClick={() => goToPage("dashboard")}
                >
                  <span>📊</span>
                  <strong>{t("home.openDashboard")}</strong>
                  <small>{t("home.dashboardDesc")}</small>
                </button>

                <button
                  type="button"
                  className={`nav-card ${currentUser.role === "user" ? "nav-card-locked" : ""}`}
                  onClick={() => {
                    if (currentUser.role === "user") {
                      alert(t("home.accessDenied"));
                    } else {
                      goToPage("form");
                    }
                  }}
                >
                  <span>{currentUser.role === "user" ? "🔒" : "➕"}</span>
                  <strong>{t("home.addRecord")}</strong>
                  <small>
                    {currentUser.role === "user"
                      ? t("home.addRecordLocked")
                      : t("home.addRecordDesc")}
                  </small>
                </button>

                <button
                  type="button"
                  className="nav-card"
                  onClick={() => goToPage("reports")}
                >
                  <span>📈</span>
                  <strong>{t("home.viewReports")}</strong>
                  <small>{t("home.reportsDesc")}</small>
                </button>

                <button
                  type="button"
                  className={`nav-card sample-nav-card ${currentUser.role === "user" ? "nav-card-locked" : ""}`}
                  onClick={() => {
                    if (currentUser.role === "user") {
                      alert(t("home.accessDeniedSample"));
                    } else {
                      loadSampleRecords();
                    }
                  }}
                >
                  <span>{currentUser.role === "user" ? "🔒" : "⚡"}</span>
                  <strong>{t("home.loadSample")}</strong>
                  <small>
                    {currentUser.role === "user"
                      ? t("home.loadSampleLocked")
                      : t("home.loadSampleDesc")}
                  </small>
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {activePage === "form" && (
        <main className="app-page inner-page">
          <div className="page-navbar">
            <button
              type="button"
              className="back-home-btn"
              onClick={() => {
                setEditingRecord(null);
                goToPage("home");
              }}
            >
              {t("nav.backHome")}
            </button>

            <div className="page-title-box">
              <p>{t("nav.page")} 2 {t("nav.of")} 4</p>
              <h2>{editingRecord ? t("form.editTitle") : t("form.title")}</h2>
            </div>
          </div>

          <DriverEntryForm
            onAddRecord={addDriverRecord}
            editingRecord={editingRecord}
            onUpdateRecord={updateDriverRecord}
            onCancelEdit={cancelEdit}
            t={t}
          />
        </main>
      )}

      {activePage === "dashboard" && (
        <main className="app-page inner-page">
          <div className="page-navbar">
            <button
              type="button"
              className="back-home-btn"
              onClick={() => goToPage("home")}
            >
              {t("nav.backHome")}
            </button>

            <div className="page-title-box">
              <p>{t("nav.page")} 3 {t("nav.of")} 4</p>
              <h2>{t("page.dashboard")}</h2>
            </div>
          </div>

          <DriverDashboard
            records={driverRecords}
            userRole={currentUser.role}
            auditLogs={auditLogs}
            onClearAllRecords={clearAllRecords}
            onDeleteRecord={deleteDriverRecord}
            onEditRecord={startEditRecord}
            onUpdateStatus={updateDriverStatus}
            t={t}
          />

        </main>
      )}

      {activePage === "reports" && (
        <main className="app-page inner-page">
          <div className="page-navbar">
            <button
              type="button"
              className="back-home-btn"
              onClick={() => goToPage("home")}
            >
              {t("nav.backHome")}
            </button>

            <div className="page-title-box">
              <p>{t("nav.page")} 4 {t("nav.of")} 4</p>
              <h2>{t("page.reportsAnalytics")}</h2>
            </div>
          </div>

          <ReportsAnalytics records={driverRecords} t={t} />
        </main>
      )}

      <footer className="footer">
        <p>{t("footer.title")}</p>
        <span>{t("footer.subtitle")}</span>
      </footer>
    </div>
  );
}

export default App;