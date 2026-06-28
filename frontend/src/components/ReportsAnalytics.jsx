function ReportsAnalytics({ records, t }) {
  const totalRecords = records.length;

  const totalTrips = records.reduce(
    (sum, record) => sum + Number(record.tripsCompleted || 0),
    0
  );

  const totalIncentive = records.reduce(
    (sum, record) => sum + Number(record.incentiveAmount || 0),
    0
  );

  const totalPayout = records.reduce(
    (sum, record) => sum + Number(record.finalPayout || 0),
    0
  );

  const averageIncentive =
    totalRecords > 0 ? Math.round(totalIncentive / totalRecords) : 0;

  const statusCounts = {
    Pending: records.filter((record) => record.status === "Pending").length,
    Approved: records.filter((record) => record.status === "Approved").length,
    Paid: records.filter((record) => record.status === "Paid").length,
    Rejected: records.filter((record) => record.status === "Rejected").length,
  };

  const monthlyData = records.reduce((acc, record) => {
    const month = record.month || "Unknown";

    if (!acc[month]) {
      acc[month] = {
        month,
        records: 0,
        incentive: 0,
        payout: 0,
      };
    }

    acc[month].records += 1;
    acc[month].incentive += Number(record.incentiveAmount || 0);
    acc[month].payout += Number(record.finalPayout || 0);

    return acc;
  }, {});

  const monthlySummary = Object.values(monthlyData);

  const bestMonth =
    monthlySummary.length > 0
      ? monthlySummary.reduce((best, current) =>
          current.incentive > best.incentive ? current : best
        )
      : null;

  const maxMonthlyIncentive =
    monthlySummary.length > 0
      ? Math.max(...monthlySummary.map((item) => item.incentive))
      : 0;

  return (
    <section className="reports-section">
      <div className="section-header">
        <p className="section-tag">{t("reports.sectionTag")}</p>
        <h2>{t("reports.title")}</h2>
        <p>{t("reports.subtitle")}</p>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <h3>{t("reports.noData")}</h3>
          <p>{t("reports.noDataDesc")}</p>
        </div>
      ) : (
        <>
          <div className="reports-grid">
            <div className="reports-card">
              <span>{t("reports.totalRecords")}</span>
              <strong>{totalRecords}</strong>
              <p>{t("reports.totalRecordsDesc")}</p>
            </div>

            <div className="reports-card">
              <span>{t("reports.totalTrips")}</span>
              <strong>{totalTrips}</strong>
              <p>{t("reports.totalTripsDesc")}</p>
            </div>

            <div className="reports-card">
              <span>{t("reports.totalIncentive")}</span>
              <strong>₹{totalIncentive}</strong>
              <p>{t("reports.totalIncentiveDesc")}</p>
            </div>

            <div className="reports-card">
              <span>{t("reports.totalPayout")}</span>
              <strong>₹{totalPayout}</strong>
              <p>{t("reports.totalPayoutDesc")}</p>
            </div>

            <div className="reports-card">
              <span>{t("reports.avgIncentive")}</span>
              <strong>₹{averageIncentive}</strong>
              <p>{t("reports.avgIncentiveDesc")}</p>
            </div>

            <div className="reports-card">
              <span>{t("reports.bestMonth")}</span>
              <strong>{bestMonth ? t(`month.${bestMonth.month}`) : "N/A"}</strong>
              <p>
                {bestMonth
                  ? `${t("reports.highestIncentive")}: ₹${bestMonth.incentive}`
                  : t("reports.noMonthData")}
              </p>
            </div>
          </div>

          <div className="analytics-layout">
            <div className="chart-card">
              <h3>{t("reports.statusDistribution")}</h3>
              <p>{t("reports.statusDesc")}</p>

              <div className="status-report-list">
                <div className="status-report-item">
                  <span>{t("status.Pending")}</span>
                  <strong>{statusCounts.Pending}</strong>
                </div>

                <div className="status-report-item">
                  <span>{t("status.Approved")}</span>
                  <strong>{statusCounts.Approved}</strong>
                </div>

                <div className="status-report-item">
                  <span>{t("status.Paid")}</span>
                  <strong>{statusCounts.Paid}</strong>
                </div>

                <div className="status-report-item">
                  <span>{t("status.Rejected")}</span>
                  <strong>{statusCounts.Rejected}</strong>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <h3>{t("reports.monthlySummary")}</h3>
              <p>{t("reports.monthlyDesc")}</p>

              <div className="monthly-bars">
                {monthlySummary.map((item) => {
                  const width =
                    maxMonthlyIncentive > 0
                      ? `${(item.incentive / maxMonthlyIncentive) * 100}%`
                      : "0%";

                  return (
                    <div className="monthly-bar-row" key={item.month}>
                      <div className="monthly-bar-label">
                        <span>{t(`month.${item.month}`)}</span>
                        <strong>₹{item.incentive}</strong>
                      </div>

                      <div className="monthly-bar-track">
                        <div
                          className="monthly-bar-fill"
                          style={{ width }}
                        ></div>
                      </div>

                      <small>{item.records} {t("reports.records")}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ReportsAnalytics;