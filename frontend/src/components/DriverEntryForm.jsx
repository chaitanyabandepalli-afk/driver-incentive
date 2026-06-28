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
  t,
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
      newErrors.driverId = t("val.driverIdRequired");
    }

    if (!formData.driverName.trim()) {
      newErrors.driverName = t("val.driverNameRequired");
    }

    if (!formData.month) {
      newErrors.month = t("val.selectMonth");
    }

    if (formData.tripsCompleted === "" || tripsCompleted < 0) {
      newErrors.tripsCompleted = t("val.tripsMin");
    }

    if (formData.onTimeTrips === "" || onTimeTrips < 0) {
      newErrors.onTimeTrips = t("val.onTimeMin");
    }

    if (formData.lateTrips === "" || lateTrips < 0) {
      newErrors.lateTrips = t("val.lateMin");
    }

    if (onTimeTrips + lateTrips > tripsCompleted) {
      newErrors.onTimeTrips = t("val.tripsExceed");
      newErrors.lateTrips = t("val.tripsExceed");
    }

    if (
      formData.customerRating === "" ||
      customerRating < 0 ||
      customerRating > 5
    ) {
      newErrors.customerRating = t("val.ratingRange");
    }

    if (formData.complaints === "" || complaints < 0) {
      newErrors.complaints = t("val.complaintsMin");
    }

    if (formData.baseSalary === "" || baseSalary < 0) {
      newErrors.baseSalary = t("val.salaryMin");
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
    <section className="form-section">
      <div className="section-header">
        <p className="section-tag">{t("form.sectionTag")}</p>
        <h2>{editingRecord ? t("form.editTitle") : t("form.sectionTitle")}</h2>
        <p>{t("form.sectionDesc")}</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {errors.submit && <div className="form-submit-error">{errors.submit}</div>}
          <div className="form-grid">
            <div className="form-group">
              <label>{t("form.driverId")}</label>
              <input
                type="text"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
                placeholder={t("form.driverIdPlaceholder")}
              />
              {errors.driverId && <small>{errors.driverId}</small>}
            </div>

            <div className="form-group">
              <label>{t("form.driverName")}</label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder={t("form.driverNamePlaceholder")}
              />
              {errors.driverName && <small>{errors.driverName}</small>}
            </div>

            <div className="form-group">
              <label>{t("form.month")}</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
              >
                <option value="">{t("form.selectMonth")}</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {t(`month.${m}`)}
                  </option>
                ))}
              </select>
              {errors.month && <small>{errors.month}</small>}
            </div>

            <div className="form-group">
              <label>{t("form.status")}</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">{t("status.Pending")}</option>
                <option value="Approved">{t("status.Approved")}</option>
                <option value="Paid">{t("status.Paid")}</option>
                <option value="Rejected">{t("status.Rejected")}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t("form.tripsCompleted")}</label>
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
              <label>{t("form.onTimeTrips")}</label>
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
              <label>{t("form.lateTrips")}</label>
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
              <label>{t("form.customerRating")}</label>
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
              <label>{t("form.complaints")}</label>
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
              <label>{t("form.baseSalary")}</label>
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
              <span>{t("form.punctuality")}</span>
              <strong>{preview.punctualityPercentage}%</strong>
            </div>

            <div>
              <span>{t("form.incentive")}</span>
              <strong>₹{preview.incentiveAmount}</strong>
            </div>

            <div>
              <span>{t("form.finalPayout")}</span>
              <strong>₹{preview.finalPayout}</strong>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn glow-btn">
              {editingRecord ? t("form.update") : t("form.save")}
            </button>

            <button type="button" className="reset-btn" onClick={handleReset}>
              {editingRecord ? t("form.cancelEdit") : t("form.reset")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DriverEntryForm;