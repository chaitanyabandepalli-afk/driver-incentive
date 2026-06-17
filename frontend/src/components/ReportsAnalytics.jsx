function ReportsAnalytics({ records }) {
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
        <p className="section-tag">Reports</p>
        <h2>Reports & Analytics</h2>
        <p>
          Management can use this section to understand monthly incentive cost,
          driver payout performance, and approval status distribution.
        </p>
      </div>

      {records.length === 0 ? (
        <div className="empty-state">
          <h3>No data available for reports</h3>
          <p>
            Add driver records or load sample data to generate analytics and
            performance insights.
          </p>
        </div>
      ) : (
        <>
          <div className="reports-grid">
            <div className="reports-card">
              <span>Total Records</span>
              <strong>{totalRecords}</strong>
              <p>Driver performance entries stored</p>
            </div>

            <div className="reports-card">
              <span>Total Trips</span>
              <strong>{totalTrips}</strong>
              <p>Trips completed by all drivers</p>
            </div>

            <div className="reports-card">
              <span>Total Incentive</span>
              <strong>₹{totalIncentive}</strong>
              <p>Extra bonus amount calculated</p>
            </div>

            <div className="reports-card">
              <span>Total Payout</span>
              <strong>₹{totalPayout}</strong>
              <p>Base salary plus incentives</p>
            </div>

            <div className="reports-card">
              <span>Average Incentive</span>
              <strong>₹{averageIncentive}</strong>
              <p>Average bonus per driver record</p>
            </div>

            <div className="reports-card">
              <span>Best Month</span>
              <strong>{bestMonth ? bestMonth.month : "N/A"}</strong>
              <p>
                {bestMonth
                  ? `Highest incentive total: ₹${bestMonth.incentive}`
                  : "No month data available"}
              </p>
            </div>
          </div>

          <div className="analytics-layout">
            <div className="chart-card">
              <h3>Status Distribution</h3>
              <p>Shows how many records are pending, approved, paid, or rejected.</p>

              <div className="status-report-list">
                <div className="status-report-item">
                  <span>Pending</span>
                  <strong>{statusCounts.Pending}</strong>
                </div>

                <div className="status-report-item">
                  <span>Approved</span>
                  <strong>{statusCounts.Approved}</strong>
                </div>

                <div className="status-report-item">
                  <span>Paid</span>
                  <strong>{statusCounts.Paid}</strong>
                </div>

                <div className="status-report-item">
                  <span>Rejected</span>
                  <strong>{statusCounts.Rejected}</strong>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <h3>Monthly Incentive Summary</h3>
              <p>Simple bar view of incentive amount generated each month.</p>

              <div className="monthly-bars">
                {monthlySummary.map((item) => {
                  const width =
                    maxMonthlyIncentive > 0
                      ? `${(item.incentive / maxMonthlyIncentive) * 100}%`
                      : "0%";

                  return (
                    <div className="monthly-bar-row" key={item.month}>
                      <div className="monthly-bar-label">
                        <span>{item.month}</span>
                        <strong>₹{item.incentive}</strong>
                      </div>

                      <div className="monthly-bar-track">
                        <div
                          className="monthly-bar-fill"
                          style={{ width }}
                        ></div>
                      </div>

                      <small>{item.records} record(s)</small>
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