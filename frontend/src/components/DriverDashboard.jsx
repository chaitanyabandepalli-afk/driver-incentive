import { useState } from "react";

function DriverDashboard({
  records,
  userRole,
  auditLogs = [],
  onClearAllRecords,
  onDeleteRecord,
  onEditRecord,
  onUpdateStatus,
}) {

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const recordsPerPage = 5;

  const exportToCSV = () => {
    if (records.length === 0) {
      alert("No records available to export.");
      return;
    }

    const headers = [
      "Driver ID",
      "Driver Name",
      "Month",
      "Trips Completed",
      "On-time Trips",
      "Late Trips",
      "Punctuality Percentage",
      "Customer Rating",
      "Complaints",
      "Base Salary",
      "Incentive Amount",
      "Final Payout",
      "Status",
    ];

    const rows = records.map((record) => [
      record.driverId,
      record.driverName,
      record.month,
      record.tripsCompleted,
      record.onTimeTrips,
      record.lateTrips,
      `${record.punctualityPercentage}%`,
      record.customerRating,
      record.complaints,
      record.baseSalary,
      record.incentiveAmount,
      record.finalPayout,
      record.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "driver-incentive-records.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const filteredRecords = records.filter((record) => {
    const driverName = record.driverName || "";
    const driverId = record.driverId || "";

    const matchesSearch =
      driverName.toLowerCase().includes(searchText.toLowerCase()) ||
      driverId.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;

    const matchesMonth = monthFilter === "All" || record.month === monthFilter;

    return matchesSearch && matchesStatus && matchesMonth;
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortBy === "tripsHigh") {
      return Number(b.tripsCompleted || 0) - Number(a.tripsCompleted || 0);
    }

    if (sortBy === "punctualityHigh") {
      return (
        Number(b.punctualityPercentage || 0) -
        Number(a.punctualityPercentage || 0)
      );
    }

    if (sortBy === "ratingHigh") {
      return Number(b.customerRating || 0) - Number(a.customerRating || 0);
    }

    if (sortBy === "incentiveHigh") {
      return Number(b.incentiveAmount || 0) - Number(a.incentiveAmount || 0);
    }

    if (sortBy === "payoutHigh") {
      return Number(b.finalPayout || 0) - Number(a.finalPayout || 0);
    }

    return Number(b.id || 0) - Number(a.id || 0);
  });

  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const paginatedRecords = sortedRecords.slice(startIndex, endIndex);

  const totalTrips = records.reduce(
    (sum, record) => sum + Number(record.tripsCompleted || 0),
    0
  );

  const totalIncentive = records.reduce(
    (sum, record) => sum + Number(record.incentiveAmount || 0),
    0
  );

  const approvedCount = records.filter(
    (record) => record.status === "Approved"
  ).length;

  const paidCount = records.filter((record) => record.status === "Paid").length;

  const pendingCount = records.filter(
    (record) => record.status === "Pending"
  ).length;

  const topPerformer =
    records.length > 0
      ? records.reduce((bestDriver, currentDriver) =>
          Number(currentDriver.incentiveAmount || 0) >
          Number(bestDriver.incentiveAmount || 0)
            ? currentDriver
            : bestDriver
        )
      : null;

  const averagePunctuality =
    records.length > 0
      ? (
          records.reduce(
            (sum, record) => sum + Number(record.punctualityPercentage || 0),
            0
          ) / records.length
        ).toFixed(1)
      : 0;

  const averageRating =
    records.length > 0
      ? (
          records.reduce(
            (sum, record) => sum + Number(record.customerRating || 0),
            0
          ) / records.length
        ).toFixed(1)
      : 0;

  const highestPayout =
    records.length > 0
      ? Math.max(...records.map((record) => Number(record.finalPayout || 0)))
      : 0;



    return (
  <>
    <section className="dashboard-section">
      <div className="section-header">
        <p className="section-tag">Live Dashboard</p>
        <h2>Driver Incentive Dashboard</h2>
        <p>
          All submitted driver performance records will appear here with
          punctuality, incentive amount, final payout, and status.
        </p>
      </div>

      <div className="dashboard-actions">
        <button type="button" className="export-btn" onClick={exportToCSV}>
          Export CSV
        </button>

        {userRole !== "user" && (
          <button type="button" className="danger-btn" onClick={onClearAllRecords}>
            Clear Saved Records
          </button>
        )}
      </div>

      {topPerformer && (
        <div className="top-performer-card">
          <div>
            <p className="section-tag">Top Performer</p>
            <h3>{topPerformer.driverName}</h3>
            <p>
              Earned the highest incentive of{" "}
              <strong>₹{topPerformer.incentiveAmount}</strong> for{" "}
              {topPerformer.month}.
            </p>
          </div>

          <div className="top-score">
            <span>{topPerformer.punctualityPercentage}%</span>
            <small>Punctuality</small>
          </div>
        </div>
      )}

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total Records</span>
          <strong>{records.length}</strong>
        </div>

        <div className="summary-card">
          <span>Total Trips</span>
          <strong>{totalTrips}</strong>
        </div>

        <div className="summary-card">
          <span>Total Incentive</span>
          <strong>₹{totalIncentive}</strong>
        </div>

        <div className="summary-card">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

        <div className="summary-card">
          <span>Paid</span>
          <strong>{paidCount}</strong>
        </div>

        <div className="summary-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="summary-card">
          <span>Avg Punctuality</span>
          <strong>{averagePunctuality}%</strong>
        </div>

        <div className="summary-card">
          <span>Avg Rating</span>
          <strong>{averageRating}/5</strong>
        </div>

        <div className="summary-card">
          <span>Highest Payout</span>
          <strong>₹{highestPayout}</strong>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-toolbar">
          <input
            type="text"
            placeholder="Search by driver name or ID..."
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
            <option value="Archived">Archived</option>

          </select>

          <select
            value={monthFilter}
            onChange={(event) => {
              setMonthFilter(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="latest">Sort: Latest First</option>
            <option value="tripsHigh">Trips: High to Low</option>
            <option value="punctualityHigh">Punctuality: High to Low</option>
            <option value="ratingHigh">Rating: High to Low</option>
            <option value="incentiveHigh">Incentive: High to Low</option>
            <option value="payoutHigh">Payout: High to Low</option>
          </select>

          <button
            type="button"
            className="reset-filter-btn"
            onClick={() => {
              setSearchText("");
              setStatusFilter("All");
              setMonthFilter("All");
              setSortBy("latest");
              setCurrentPage(1);
            }}
          >
            Reset Filters
          </button>
        </div>

        {records.length === 0 ? (
          <div className="empty-state">
            <h3>No driver records yet</h3>
            <p>
              Fill the Driver Performance Entry Form and click Save Driver
              Record. The saved record will appear in this dashboard.
            </p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="empty-state">
            <h3>No matching records found</h3>
            <p>
              Try changing the search text or status filter to view more driver
              records.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Driver ID</th>
                  <th>Driver Name</th>
                  <th>Month</th>
                  <th>Trips</th>
                  <th>Punctuality</th>
                  <th>Rating</th>
                  <th>Incentive</th>
                  <th>Final Payout</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.driverId}</td>
                    <td>{record.driverName}</td>
                    <td>{record.month}</td>
                    <td>{record.tripsCompleted}</td>
                    <td>{record.punctualityPercentage}%</td>
                    <td>{record.customerRating}</td>
                    <td>₹{record.incentiveAmount}</td>
                    <td>₹{record.finalPayout}</td>
                    <td>
                      <select
                        className={`status-select ${(
                          record.status || "Pending"
                        ).toLowerCase()}`}
                        value={record.status || "Pending"}
                        disabled={userRole === "user"}
                        onChange={(event) =>
                          onUpdateStatus(record.id, event.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Paid">Paid</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Archived">Archived</option>

                      </select>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="row-view-btn"
                          onClick={() => setSelectedRecord(record)}
                        >
                          View
                        </button>

                        {userRole !== "user" && (
                          <>
                            <button
                              type="button"
                              className="row-edit-btn"
                              onClick={() => onEditRecord(record)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="row-delete-btn"
                              onClick={() => onDeleteRecord(record.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                >
                  Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(prevPage + 1, totalPages)
                    )
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedRecord && (
        <div className="details-overlay">
          <div className="details-modal">
            <div className="details-header">
              <div>
                <p className="section-tag">Driver Details</p>
                <h2>{selectedRecord.driverName}</h2>
                <p>Complete monthly performance and incentive details.</p>
              </div>

              <div className="details-header-actions">
                <button
                  type="button"
                  className="print-btn"
                  onClick={() => window.print()}
                >
                  Print Details
                </button>

                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setSelectedRecord(null)}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-box">
                <span>Driver ID</span>
                <strong>{selectedRecord.driverId}</strong>
              </div>

              <div className="detail-box">
                <span>Month</span>
                <strong>{selectedRecord.month}</strong>
              </div>

              <div className="detail-box">
                <span>Trips Completed</span>
                <strong>{selectedRecord.tripsCompleted}</strong>
              </div>

              <div className="detail-box">
                <span>On-time Trips</span>
                <strong>{selectedRecord.onTimeTrips}</strong>
              </div>

              <div className="detail-box">
                <span>Late Trips</span>
                <strong>{selectedRecord.lateTrips}</strong>
              </div>

              <div className="detail-box">
                <span>Punctuality</span>
                <strong>{selectedRecord.punctualityPercentage}%</strong>
              </div>

              <div className="detail-box">
                <span>Customer Rating</span>
                <strong>{selectedRecord.customerRating} / 5</strong>
              </div>

              <div className="detail-box">
                <span>Complaints</span>
                <strong>{selectedRecord.complaints}</strong>
              </div>

              <div className="detail-box">
                <span>Base Salary</span>
                <strong>₹{selectedRecord.baseSalary}</strong>
              </div>

              <div className="detail-box highlight-box">
                <span>Incentive Amount</span>
                <strong>₹{selectedRecord.incentiveAmount}</strong>
              </div>

              <div className="detail-box highlight-box">
                <span>Final Payout</span>
                <strong>₹{selectedRecord.finalPayout}</strong>
              </div>

              <div className="detail-box">
                <span>Status</span>
                <strong>{selectedRecord.status}</strong>
              </div>
            </div>

            <div className="details-note">
              <h3>Performance Summary</h3>
              <p>
                This driver completed {selectedRecord.tripsCompleted} trips with{" "}
                {selectedRecord.punctualityPercentage}% punctuality and received
                a customer rating of {selectedRecord.customerRating}. Based on
                the incentive rules, the driver earned ₹
                {selectedRecord.incentiveAmount} as incentive.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Timeline Feed */}
      <div className="activity-timeline-card">
        <h3>⏱️ Recent Operations Log (System Audits)</h3>
        {(!auditLogs || auditLogs.length === 0) ? (
          <div className="empty-state">No recent activity logs available.</div>
        ) : (
          <div className="timeline-feed">
            {auditLogs.map((log) => {
              const date = new Date(log.createdAt);
              const dateStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
              const actionClass = log.action.split('_')[0].toLowerCase();
              return (
                <div key={log.id} className={`timeline-event ${actionClass}`}>
                  <div className="timeline-event-header">
                    <strong>{log.action}</strong>
                    <span>{dateStr}</span>
                  </div>
                  <p>{log.details}</p>
                  <span className="user-tag">By: {log.performedBy}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
     </section>

  </>
  );
}


export default DriverDashboard;