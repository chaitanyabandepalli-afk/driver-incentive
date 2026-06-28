import { useState } from "react";

function DriverDashboard({
  records,
  userRole,
  auditLogs = [],
  onClearAllRecords,
  onDeleteRecord,
  onEditRecord,
  onUpdateStatus,
  t,
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
      alert(t("dash.noExport"));
      return;
    }

    const headers = [
      t("table.driverId"),
      t("table.driverName"),
      t("table.month"),
      t("table.trips"),
      t("table.punctuality"),
      t("table.rating"),
      t("form.complaints"),
      t("form.baseSalary"),
      t("table.incentive"),
      t("table.finalPayout"),
      t("table.status"),
    ];

    const rows = records.map((record) => [
      record.driverId,
      record.driverName,
      t(`month.${record.month}`),
      record.tripsCompleted,
      record.onTimeTrips,
      record.lateTrips,
      `${record.punctualityPercentage}%`,
      record.customerRating,
      record.complaints,
      record.baseSalary,
      record.incentiveAmount,
      record.finalPayout,
      t(`status.${record.status}`),
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <section className="dashboard-section">
        <div className="section-header">
          <p className="section-tag">{t("dash.sectionTag")}</p>
          <h2>{t("dash.title")}</h2>
          <p>{t("dash.subtitle")}</p>
        </div>

        <div className="dashboard-actions">
          <button type="button" className="export-btn glow-btn" onClick={exportToCSV}>
            {t("dash.exportCSV")}
          </button>

          {userRole !== "user" && (
            <button type="button" className="danger-btn glow-btn" onClick={onClearAllRecords}>
              {t("dash.clearRecords")}
            </button>
          )}
        </div>

        {topPerformer && (
          <div className="top-performer-card">
            <div>
              <p className="section-tag">{t("dash.topPerformer")}</p>
              <h3>{topPerformer.driverName}</h3>
              <p>
                {t("reports.highestIncentive")} of{" "}
                <strong>₹{topPerformer.incentiveAmount}</strong> for{" "}
                {t(`month.${topPerformer.month}`)}.
              </p>
            </div>

            <div className="top-score">
              <span>{topPerformer.punctualityPercentage}%</span>
              <small>{t("form.punctuality")}</small>
            </div>
          </div>
        )}

        <div className="summary-grid">
          <div className="summary-card">
            <span>{t("dash.totalRecords")}</span>
            <strong>{records.length}</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.totalTrips")}</span>
            <strong>{totalTrips}</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.totalIncentive")}</span>
            <strong>₹{totalIncentive}</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.approved")}</span>
            <strong>{approvedCount}</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.paid")}</span>
            <strong>{paidCount}</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.pending")}</span>
            <strong>{pendingCount}</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.avgPunctuality")}</span>
            <strong>{averagePunctuality}%</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.avgRating")}</span>
            <strong>{averageRating}/5</strong>
          </div>

          <div className="summary-card">
            <span>{t("dash.highestPayout")}</span>
            <strong>₹{highestPayout}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-toolbar">
            <input
              type="text"
              placeholder={t("dash.searchPlaceholder")}
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
              <option value="All">{t("dash.allStatus")}</option>
              <option value="Pending">{t("status.Pending")}</option>
              <option value="Approved">{t("status.Approved")}</option>
              <option value="Paid">{t("status.Paid")}</option>
              <option value="Rejected">{t("status.Rejected")}</option>
              <option value="Archived">{t("status.Archived")}</option>
            </select>

            <select
              value={monthFilter}
              onChange={(event) => {
                setMonthFilter(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">{t("dash.allMonths")}</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {t(`month.${m}`)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="latest">{t("dash.sortLatest")}</option>
              <option value="tripsHigh">{t("dash.sortTrips")}</option>
              <option value="punctualityHigh">{t("dash.sortPunctuality")}</option>
              <option value="ratingHigh">{t("dash.sortRating")}</option>
              <option value="incentiveHigh">{t("dash.sortIncentive")}</option>
              <option value="payoutHigh">{t("dash.sortPayout")}</option>
            </select>

            <button
              type="button"
              className="reset-filter-btn glow-btn"
              onClick={() => {
                setSearchText("");
                setStatusFilter("All");
                setMonthFilter("All");
                setSortBy("latest");
                setCurrentPage(1);
              }}
            >
              {t("dash.resetFilters")}
            </button>
          </div>

          {records.length === 0 ? (
            <div className="empty-state">
              <h3>{t("dash.noRecords")}</h3>
              <p>{t("dash.noRecordsDesc")}</p>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="empty-state">
              <h3>{t("dash.noMatch")}</h3>
              <p>{t("dash.noMatchDesc")}</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>{t("table.driverId")}</th>
                    <th>{t("table.driverName")}</th>
                    <th>{t("table.month")}</th>
                    <th>{t("table.trips")}</th>
                    <th>{t("table.punctuality")}</th>
                    <th>{t("table.rating")}</th>
                    <th>{t("table.incentive")}</th>
                    <th>{t("table.finalPayout")}</th>
                    <th>{t("table.status")}</th>
                    <th>{t("table.actions")}</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{record.driverId}</td>
                      <td>{record.driverName}</td>
                      <td>{t(`month.${record.month}`)}</td>
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
                          <option value="Pending">{t("status.Pending")}</option>
                          <option value="Approved">{t("status.Approved")}</option>
                          <option value="Paid">{t("status.Paid")}</option>
                          <option value="Rejected">{t("status.Rejected")}</option>
                          <option value="Archived">{t("status.Archived")}</option>
                        </select>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="row-view-btn glow-btn"
                            onClick={() => setSelectedRecord(record)}
                          >
                            {t("dash.view")}
                          </button>

                          {userRole !== "user" && (
                            <>
                              <button
                                type="button"
                                className="row-edit-btn glow-btn"
                                onClick={() => onEditRecord(record)}
                              >
                                {t("dash.edit")}
                              </button>

                              <button
                                type="button"
                                className="row-delete-btn glow-btn"
                                onClick={() => onDeleteRecord(record.id)}
                              >
                                {t("dash.delete")}
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
                    className="glow-btn"
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                  >
                    {t("dash.previous")}
                  </button>

                  <span>
                    {t("dash.pageOf", { current: currentPage, total: totalPages })}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    className="glow-btn"
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(prevPage + 1, totalPages)
                      )
                    }
                  >
                    {t("dash.next")}
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
                  <p className="section-tag">{t("details.tag")}</p>
                  <h2>{selectedRecord.driverName}</h2>
                  <p>{t("details.subtitle")}</p>
                </div>

                <div className="details-header-actions">
                  <button
                    type="button"
                    className="print-btn glow-btn"
                    onClick={() => window.print()}
                  >
                    {t("details.print")}
                  </button>

                  <button
                    type="button"
                    className="close-btn glow-btn"
                    onClick={() => setSelectedRecord(null)}
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-box">
                  <span>{t("form.driverId")}</span>
                  <strong>{selectedRecord.driverId}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.month")}</span>
                  <strong>{t(`month.${selectedRecord.month}`)}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.tripsCompleted")}</span>
                  <strong>{selectedRecord.tripsCompleted}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.onTimeTrips")}</span>
                  <strong>{selectedRecord.onTimeTrips}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.lateTrips")}</span>
                  <strong>{selectedRecord.lateTrips}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.punctuality")}</span>
                  <strong>{selectedRecord.punctualityPercentage}%</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.customerRating")}</span>
                  <strong>{selectedRecord.customerRating} / 5</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.complaints")}</span>
                  <strong>{selectedRecord.complaints}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.baseSalary")}</span>
                  <strong>₹{selectedRecord.baseSalary}</strong>
                </div>

                <div className="detail-box highlight-box">
                  <span>{t("form.incentive")}</span>
                  <strong>₹{selectedRecord.incentiveAmount}</strong>
                </div>

                <div className="detail-box highlight-box">
                  <span>{t("form.finalPayout")}</span>
                  <strong>₹{selectedRecord.finalPayout}</strong>
                </div>

                <div className="detail-box">
                  <span>{t("form.status")}</span>
                  <strong>{t(`status.${selectedRecord.status}`)}</strong>
                </div>
              </div>

              <div className="details-note">
                <h3>{t("details.summary")}</h3>
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
          <h3>{t("audit.title")}</h3>
          {(!auditLogs || auditLogs.length === 0) ? (
            <div className="empty-state">{t("audit.empty")}</div>
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
                    <span className="user-tag">{t("notifications.clear")}: {log.performedBy}</span>
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