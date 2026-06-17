import { useEffect, useState } from "react";

const initialFormData = {
  driverId: "",
  driverName: "",
  month: "",
  tripsCompleted: "",
  onTimeTrips: "",
  lateTrips: "",
  customerRating: "",
  complaints: "",
  baseSalary: "",
  status: "Pending",
};

function DriverEntryForm({
  onAddRecord,
  editingRecord,
  onUpdateRecord,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        driverId: editingRecord.driverId || "",
        driverName: editingRecord.driverName || "",
        month: editingRecord.month || "",
        tripsCompleted: editingRecord.tripsCompleted || "",
        onTimeTrips: editingRecord.onTimeTrips || "",
        lateTrips: editingRecord.lateTrips || "",
        customerRating: editingRecord.customerRating || "",
        complaints: editingRecord.complaints || "",
        baseSalary: editingRecord.baseSalary || "",
        status: editingRecord.status || "Pending",
      });
    }
  }, [editingRecord]);

  const calculatePerformance = () => {
    const tripsCompleted = Number(formData.tripsCompleted || 0);
    const onTimeTrips = Number(formData.onTimeTrips || 0);
    const customerRating = Number(formData.customerRating || 0);
    const complaints = Number(formData.complaints || 0);
    const baseSalary = Number(formData.baseSalary || 0);

    const punctualityPercentage =
      tripsCompleted > 0
        ? Number(((onTimeTrips / tripsCompleted) * 100).toFixed(1))
        : 0;

    let incentiveAmount = 0;

    if (
      tripsCompleted >= 40 &&
      punctualityPercentage >= 90 &&
      customerRating >= 4.5 &&
      complaints === 0
    ) {
      incentiveAmount = 5000;
    } else if (
      tripsCompleted >= 30 &&
      punctualityPercentage >= 80 &&
      customerRating >= 4.0 &&
      complaints <= 1
    ) {
      incentiveAmount = 3000;
    } else if (
      tripsCompleted >= 20 &&
      punctualityPercentage >= 70 &&
      customerRating >= 3.5 &&
      complaints <= 2
    ) {
      incentiveAmount = 1000;
    }

    const finalPayout = baseSalary + incentiveAmount;

    return {
      punctualityPercentage,
      incentiveAmount,
      finalPayout,
    };
  };

  const preview = calculatePerformance();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const tripsCompleted = Number(formData.tripsCompleted);
    const onTimeTrips = Number(formData.onTimeTrips);
    const lateTrips = Number(formData.lateTrips);
    const customerRating = Number(formData.customerRating);
    const complaints = Number(formData.complaints);
    const baseSalary = Number(formData.baseSalary);

    if (!formData.driverId.trim()) {
      newErrors.driverId = "Driver ID is required";
    }

    if (!formData.driverName.trim()) {
      newErrors.driverName = "Driver name is required";
    }

    if (!formData.month) {
      newErrors.month = "Please select month";
    }

    if (formData.tripsCompleted === "" || tripsCompleted < 0) {
      newErrors.tripsCompleted = "Trips completed must be 0 or more";
    }

    if (formData.onTimeTrips === "" || onTimeTrips < 0) {
      newErrors.onTimeTrips = "On-time trips must be 0 or more";
    }

    if (formData.lateTrips === "" || lateTrips < 0) {
      newErrors.lateTrips = "Late trips must be 0 or more";
    }

    if (onTimeTrips + lateTrips > tripsCompleted) {
      newErrors.onTimeTrips =
        "On-time trips + late trips cannot be more than total trips";
      newErrors.lateTrips =
        "On-time trips + late trips cannot be more than total trips";
    }

    if (
      formData.customerRating === "" ||
      customerRating < 0 ||
      customerRating > 5
    ) {
      newErrors.customerRating = "Rating must be between 0 and 5";
    }

    if (formData.complaints === "" || complaints < 0) {
      newErrors.complaints = "Complaints must be 0 or more";
    }

    if (formData.baseSalary === "" || baseSalary < 0) {
      newErrors.baseSalary = "Base salary must be 0 or more";
    }

    return newErrors;
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});

    if (editingRecord) {
      onCancelEdit();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const calculatedValues = calculatePerformance();

    const recordData = {
      id: editingRecord ? editingRecord.id : Date.now(),
      driverId: formData.driverId.trim(),
      driverName: formData.driverName.trim(),
      month: formData.month,
      tripsCompleted: Number(formData.tripsCompleted),
      onTimeTrips: Number(formData.onTimeTrips),
      lateTrips: Number(formData.lateTrips),
      customerRating: Number(formData.customerRating),
      complaints: Number(formData.complaints),
      baseSalary: Number(formData.baseSalary),
      status: formData.status,
      ...calculatedValues,
    };

    try {
      if (editingRecord) {
        await onUpdateRecord(recordData);
      } else {
        await onAddRecord(recordData);
      }
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message }));
    }
  };

  return (
    <section className="form-section">
      <div className="section-header">
        <p className="section-tag">Performance Entry</p>
        <h2>{editingRecord ? "Edit Driver Record" : "Driver Entry Form"}</h2>
        <p>
          Enter monthly driver performance details. The system will automatically
          calculate punctuality percentage, incentive amount, and final payout.
        </p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {errors.submit && <div className="form-submit-error">{errors.submit}</div>}
          <div className="form-grid">
            <div className="form-group">
              <label>Driver ID</label>
              <input
                type="text"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                placeholder="Example: DRV001"
              />
              {errors.driverId && <small>{errors.driverId}</small>}
            </div>

            <div className="form-group">
              <label>Driver Name</label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="Enter driver name"
              />
              {errors.driverName && <small>{errors.driverName}</small>}
            </div>

            <div className="form-group">
              <label>Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
              >
                <option value="">Select month</option>
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
              {errors.month && <small>{errors.month}</small>}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Paid">Paid</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trips Completed</label>
              <input
                type="number"
                name="tripsCompleted"
                value={formData.tripsCompleted}
                onChange={handleChange}
                placeholder="Example: 40"
                min="0"
              />
              {errors.tripsCompleted && <small>{errors.tripsCompleted}</small>}
            </div>

            <div className="form-group">
              <label>On-time Trips</label>
              <input
                type="number"
                name="onTimeTrips"
                value={formData.onTimeTrips}
                onChange={handleChange}
                placeholder="Example: 36"
                min="0"
              />
              {errors.onTimeTrips && <small>{errors.onTimeTrips}</small>}
            </div>

            <div className="form-group">
              <label>Late Trips</label>
              <input
                type="number"
                name="lateTrips"
                value={formData.lateTrips}
                onChange={handleChange}
                placeholder="Example: 4"
                min="0"
              />
              {errors.lateTrips && <small>{errors.lateTrips}</small>}
            </div>

            <div className="form-group">
              <label>Customer Rating</label>
              <input
                type="number"
                name="customerRating"
                value={formData.customerRating}
                onChange={handleChange}
                placeholder="Example: 4.5"
                min="0"
                max="5"
                step="0.1"
              />
              {errors.customerRating && <small>{errors.customerRating}</small>}
            </div>

            <div className="form-group">
              <label>Complaints</label>
              <input
                type="number"
                name="complaints"
                value={formData.complaints}
                onChange={handleChange}
                placeholder="Example: 0"
                min="0"
              />
              {errors.complaints && <small>{errors.complaints}</small>}
            </div>

            <div className="form-group">
              <label>Base Salary</label>
              <input
                type="number"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleChange}
                placeholder="Example: 22000"
                min="0"
              />
              {errors.baseSalary && <small>{errors.baseSalary}</small>}
            </div>
          </div>

          <div className="incentive-preview">
            <div>
              <span>Punctuality</span>
              <strong>{preview.punctualityPercentage}%</strong>
            </div>

            <div>
              <span>Incentive</span>
              <strong>₹{preview.incentiveAmount}</strong>
            </div>

            <div>
              <span>Final Payout</span>
              <strong>₹{preview.finalPayout}</strong>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingRecord ? "Update Driver Record" : "Save Driver Record"}
            </button>

            <button type="button" className="reset-btn" onClick={handleReset}>
              {editingRecord ? "Cancel Edit" : "Reset Form"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DriverEntryForm;