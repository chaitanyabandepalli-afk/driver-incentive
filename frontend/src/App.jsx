import { useEffect, useState } from "react";
import "./App.css";
import DriverEntryForm from "./components/DriverEntryForm";
import DriverDashboard from "./components/DriverDashboard";
import ReportsAnalytics from "./components/ReportsAnalytics";
import LoginCard from "./components/LoginCard";

const API_BASE_URL = "https://driver-incentive-1.onrender.com/api";


function App() {
  const [activePage, setActivePage] = useState("home");
  const [driverRecords, setDriverRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wakingUp, setWakingUp] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    goToPage("home");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setCurrentUser(null);
      setEditingRecord(null);
    }
  };

  const fetchRecords = async (retries = 2) => {
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
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (retries > 0) {
        setWakingUp(true);
        // Wait 4 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 4000));
        return fetchRecords(retries - 1);
      }
      setWakingUp(false);
      setError("Could not connect to the backend database server. The server might be waking up from sleep. Please try clicking 'Retry Connection' in a moment.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    if (activePage === "form" && currentUser && currentUser.role === "user") {
      goToPage("home");
    }
  }, [activePage, currentUser]);

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
        body: JSON.stringify(newRecord),
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
      alert("Driver record saved successfully!");
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
        body: JSON.stringify(updatedRecord),
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
      alert("Driver record updated successfully!");
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
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }
      setDriverRecords((prevRecords) =>
        prevRecords.map((record) => (record.id === recordId ? data : record))
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const clearAllRecords = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all saved driver records?"
    );

    if (confirmClear) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/records/clear`, {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to clear records");
        }
        setDriverRecords([]);
        setEditingRecord(null);
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteDriverRecord = async (recordId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver record?"
    );

    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/records/${recordId}`, {
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
      });
      if (!response.ok) {
        throw new Error("Failed to load sample records");
      }
      await fetchRecords();
      goToPage("dashboard");
      alert("Sample data loaded successfully!");
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
        <LoginCard onLogin={handleLogin} />
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
          <h1>Manivtha Tours &amp; Travels</h1>
        </div>
        <div className="header-user-info">
          <span className={`role-badge ${currentUser.role}`}>
            {currentUser.role === "admin" ? "🔑 Admin" : "👥 User (Read-Only)"}
          </span>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      {error && (
        <div className="connection-error-banner">
          <span>⚠️ {error}</span>
          <button type="button" onClick={fetchRecords} className="retry-btn">Retry Connection</button>
        </div>
      )}

      {loading && (
        <div className="app-loading-overlay">
          <div className="spinner"></div>
          <p>{wakingUp ? "Waking up database server (takes about 50 seconds on cold start)..." : "Connecting to Supabase database..."}</p>
        </div>
      )}

      {activePage === "home" && (
        <main className="app-page home-view">
          {/* ── Hero Section ── */}
          <section className="home-hero">
            <div className="home-hero-content">
              <p className="tagline">Manivtha Tours &amp; Travels</p>

              <h1>Driver Incentive &amp; Performance Bonus Tracker</h1>

              <p className="hero-description">
                A digital system to track driver performance, calculate
                monthly incentives, monitor KPIs, and help management reward
                top-performing drivers fairly.
              </p>

              <div className="home-actions-grid">
                <button
                  type="button"
                  className="nav-card primary-nav-card"
                  onClick={() => goToPage("dashboard")}
                >
                  <span>📊</span>
                  <strong>Open Dashboard</strong>
                  <small>View driver records, filters, sorting, and status.</small>
                </button>

                <button
                  type="button"
                  className={`nav-card ${currentUser.role === "user" ? "nav-card-locked" : ""}`}
                  onClick={() => {
                    if (currentUser.role === "user") {
                      alert("Access Denied: Admin privileges are required to add driver records.");
                    } else {
                      goToPage("form");
                    }
                  }}
                >
                  <span>{currentUser.role === "user" ? "🔒" : "➕"}</span>
                  <strong>Add Driver Record</strong>
                  <small>
                    {currentUser.role === "user"
                      ? "Admin access required to create new records."
                      : "Enter performance data and calculate incentive."}
                  </small>
                </button>

                <button
                  type="button"
                  className="nav-card"
                  onClick={() => goToPage("reports")}
                >
                  <span>📈</span>
                  <strong>View Reports</strong>
                  <small>Check analytics, payouts, and monthly summaries.</small>
                </button>

                <button
                  type="button"
                  className={`nav-card sample-nav-card ${currentUser.role === "user" ? "nav-card-locked" : ""}`}
                  onClick={() => {
                    if (currentUser.role === "user") {
                      alert("Access Denied: Admin privileges are required to load sample data.");
                    } else {
                      loadSampleRecords();
                    }
                  }}
                >
                  <span>{currentUser.role === "user" ? "🔒" : "⚡"}</span>
                  <strong>Load Sample Data</strong>
                  <small>
                    {currentUser.role === "user"
                      ? "Admin access required to populate demo records."
                      : "Add demo records and open the dashboard."}
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
              ← Back to Home
            </button>

            <div className="page-title-box">
              <p>Page 2 of 4</p>
              <h2>{editingRecord ? "Edit Driver Record" : "Add Driver Record"}</h2>
            </div>
          </div>

          <DriverEntryForm
            onAddRecord={addDriverRecord}
            editingRecord={editingRecord}
            onUpdateRecord={updateDriverRecord}
            onCancelEdit={cancelEdit}
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
              ← Back to Home
            </button>

            <div className="page-title-box">
              <p>Page 3 of 4</p>
              <h2>Dashboard</h2>
            </div>
          </div>

          <DriverDashboard
            records={driverRecords}
            userRole={currentUser.role}
            onClearAllRecords={clearAllRecords}
            onDeleteRecord={deleteDriverRecord}
            onEditRecord={startEditRecord}
            onUpdateStatus={updateDriverStatus}
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
              ← Back to Home
            </button>

            <div className="page-title-box">
              <p>Page 4 of 4</p>
              <h2>Reports & Analytics</h2>
            </div>
          </div>

          <ReportsAnalytics records={driverRecords} />
        </main>
      )}

      <footer className="footer">
        <p>Driver Incentive & Performance Bonus Tracker</p>
        <span>Built for Manivtha Tours & Travels</span>
      </footer>
    </div>
  );
}

export default App;