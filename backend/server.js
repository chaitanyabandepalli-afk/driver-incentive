const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const { seedData } = require("./prisma/seed");

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to calculate performance metrics
function calculateIncentive(tripsCompleted, onTimeTrips, customerRating, complaints, baseSalary) {
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
}

// Validation helper
function validateRecordData(data) {
  const errors = [];

  const tripsCompleted = Number(data.tripsCompleted);
  const onTimeTrips = Number(data.onTimeTrips);
  const lateTrips = Number(data.lateTrips);
  const customerRating = Number(data.customerRating);
  const complaints = Number(data.complaints);
  const baseSalary = Number(data.baseSalary);

  if (!data.driverId || !data.driverId.trim()) {
    errors.push("Driver ID is required");
  }
  if (!data.driverName || !data.driverName.trim()) {
    errors.push("Driver name is required");
  }
  if (!data.month) {
    errors.push("Month is required");
  }
  if (isNaN(tripsCompleted) || tripsCompleted < 0) {
    errors.push("Trips completed must be 0 or more");
  }
  if (isNaN(onTimeTrips) || onTimeTrips < 0) {
    errors.push("On-time trips must be 0 or more");
  }
  if (isNaN(lateTrips) || lateTrips < 0) {
    errors.push("Late trips must be 0 or more");
  }
  if (onTimeTrips + lateTrips > tripsCompleted) {
    errors.push("On-time trips + late trips cannot exceed total trips completed");
  }
  if (isNaN(customerRating) || customerRating < 0 || customerRating > 5) {
    errors.push("Customer rating must be between 0 and 5");
  }
  if (isNaN(complaints) || complaints < 0) {
    errors.push("Complaints must be 0 or more");
  }
  if (isNaN(baseSalary) || baseSalary < 0) {
    errors.push("Base salary must be 0 or more");
  }

  return errors;
}

// Helpers for relational tables
async function logAudit(action, details, performedBy, recordId = null) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        details,
        performedBy: performedBy || "System",
        recordId
      }
    });
  } catch (error) {
    console.error("Audit logging failed:", error);
  }
}

async function handlePaymentRecord(recordId, finalPayout, driverId, month) {
  try {
    const existingPayment = await prisma.paymentRecord.findFirst({
      where: { recordId }
    });

    if (!existingPayment) {
      await prisma.paymentRecord.create({
        data: {
          recordId,
          amount: finalPayout,
          transactionId: `TXN-${driverId}-${month.toUpperCase()}-${Date.now().toString().slice(-4)}`
        }
      });
      await logAudit("PAYMENT_GENERATED", `Processed bonus payment of ₹${finalPayout} for driver ${driverId}.`, "System", recordId);
    }
  } catch (err) {
    console.error("Failed to create payment record:", err);
  }
}

// Endpoints

app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Driver Incentive Tracker API Server is running!" });
});

app.get("/api", (req, res) => {
  res.json({ status: "healthy", message: "Use /api/records to fetch data." });
});

// GET all audit logs
app.get("/api/audit-logs", async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { id: "desc" },
      take: 20
    });
    res.json(logs);
  } catch (error) {
    console.error("Fetch audit logs error:", error);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});

// GET all payment records
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await prisma.paymentRecord.findMany({
      include: {
        record: true
      },
      orderBy: { id: "desc" }
    });
    res.json(payments);
  } catch (error) {
    console.error("Fetch payments error:", error);
    res.status(500).json({ error: "Failed to fetch payment records" });
  }
});

// 1. GET all records with optional query search
app.get("/api/records", async (req, res) => {
  try {
    const { search, status, month } = req.query;

    let whereClause = {};

    if (search) {
      whereClause.OR = [
        { driverName: { contains: search, mode: 'insensitive' } },
        { driverId: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status && status !== "All") {
      whereClause.status = status;
    }

    if (month && month !== "All") {
      whereClause.month = month;
    }

    const records = await prisma.driverRecord.findMany({
      where: whereClause,
      orderBy: { id: "desc" }
    });

    res.json(records);
  } catch (error) {
    console.error("Fetch records error:", error);
    res.status(500).json({ error: "Failed to fetch driver records" });
  }
});

// 2. GET single record
app.get("/api/records/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    const record = await prisma.driverRecord.findUnique({
      where: { id }
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error("Fetch single record error:", error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
});

// 3. POST new record
app.post("/api/records", async (req, res) => {
  try {
    const validationErrors = validateRecordData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const {
      driverId,
      driverName,
      month,
      tripsCompleted,
      onTimeTrips,
      lateTrips,
      customerRating,
      complaints,
      baseSalary,
      status,
      performedBy
    } = req.body;

    const trimmedDriverId = driverId.trim();
    const trimmedMonth = month.trim();

    // Enforce business rule: Each driver should have only one incentive record per month
    const existingRecord = await prisma.driverRecord.findUnique({
      where: {
        driverId_month: {
          driverId: trimmedDriverId,
          month: trimmedMonth
        }
      }
    });

    if (existingRecord) {
      return res.status(400).json({
        errors: [`A performance record already exists for driver ${trimmedDriverId} in ${trimmedMonth}.`]
      });
    }

    // Ensure driver master record exists
    let driverExists = await prisma.driver.findUnique({
      where: { driverId: trimmedDriverId }
    });

    if (!driverExists) {
      driverExists = await prisma.driver.create({
        data: {
          driverId: trimmedDriverId,
          name: driverName.trim(),
          licenseNumber: `AUTO-${trimmedDriverId}-${Math.floor(1000 + Math.random() * 9000)}`,
          phone: "9999999999",
          email: `${trimmedDriverId.toLowerCase()}@manivtha.com`
        }
      });
      await logAudit("DRIVER_CREATED", `Automatically registered master profile for driver ${trimmedDriverId}.`, performedBy || "System");
    }

    const metrics = calculateIncentive(
      Number(tripsCompleted),
      Number(onTimeTrips),
      Number(customerRating),
      Number(complaints),
      Number(baseSalary)
    );

    const newRecord = await prisma.driverRecord.create({
      data: {
        driverId: trimmedDriverId,
        driverName: driverName.trim(),
        month: trimmedMonth,
        tripsCompleted: Number(tripsCompleted),
        onTimeTrips: Number(onTimeTrips),
        lateTrips: Number(lateTrips),
        punctualityPercentage: metrics.punctualityPercentage,
        customerRating: Number(customerRating),
        complaints: Number(complaints),
        baseSalary: Number(baseSalary),
        incentiveAmount: metrics.incentiveAmount,
        finalPayout: metrics.finalPayout,
        status: status || "Pending"
      }
    });

    if (newRecord.status === "Paid") {
      await handlePaymentRecord(newRecord.id, newRecord.finalPayout, trimmedDriverId, trimmedMonth);
    }

    await logAudit(
      "CREATE_RECORD",
      `Added performance record for driver ${trimmedDriverId} for ${trimmedMonth}. Final payout: ₹${metrics.finalPayout}.`,
      performedBy || "Admin",
      newRecord.id
    );

    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Create record error:", error);
    res.status(500).json({ error: "Failed to create driver record" });
  }
});

// 4. PUT update record
app.put("/api/records/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    const validationErrors = validateRecordData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const {
      driverId,
      driverName,
      month,
      tripsCompleted,
      onTimeTrips,
      lateTrips,
      customerRating,
      complaints,
      baseSalary,
      status,
      performedBy
    } = req.body;

    const trimmedDriverId = driverId.trim();
    const trimmedMonth = month.trim();

    // Verify existing record exists
    const recordExists = await prisma.driverRecord.findUnique({
      where: { id }
    });

    if (!recordExists) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Check if the update will violate the compound unique constraint
    const duplicateRecord = await prisma.driverRecord.findUnique({
      where: {
        driverId_month: {
          driverId: trimmedDriverId,
          month: trimmedMonth
        }
      }
    });

    if (duplicateRecord && duplicateRecord.id !== id) {
      return res.status(400).json({
        errors: [`Another record already exists for driver ${trimmedDriverId} in ${trimmedMonth}.`]
      });
    }

    // Ensure driver master record exists
    let driverExists = await prisma.driver.findUnique({
      where: { driverId: trimmedDriverId }
    });

    if (!driverExists) {
      driverExists = await prisma.driver.create({
        data: {
          driverId: trimmedDriverId,
          name: driverName.trim(),
          licenseNumber: `AUTO-${trimmedDriverId}-${Math.floor(1000 + Math.random() * 9000)}`,
          phone: "9999999999",
          email: `${trimmedDriverId.toLowerCase()}@manivtha.com`
        }
      });
      await logAudit("DRIVER_CREATED", `Automatically registered master profile for driver ${trimmedDriverId}.`, performedBy || "System");
    }

    const metrics = calculateIncentive(
      Number(tripsCompleted),
      Number(onTimeTrips),
      Number(customerRating),
      Number(complaints),
      Number(baseSalary)
    );

    const updatedRecord = await prisma.driverRecord.update({
      where: { id },
      data: {
        driverId: trimmedDriverId,
        driverName: driverName.trim(),
        month: trimmedMonth,
        tripsCompleted: Number(tripsCompleted),
        onTimeTrips: Number(onTimeTrips),
        lateTrips: Number(lateTrips),
        punctualityPercentage: metrics.punctualityPercentage,
        customerRating: Number(customerRating),
        complaints: Number(complaints),
        baseSalary: Number(baseSalary),
        incentiveAmount: metrics.incentiveAmount,
        finalPayout: metrics.finalPayout,
        status: status || "Pending"
      }
    });

    if (updatedRecord.status === "Paid") {
      await handlePaymentRecord(updatedRecord.id, updatedRecord.finalPayout, trimmedDriverId, trimmedMonth);
    }

    await logAudit(
      "UPDATE_RECORD",
      `Updated performance record for driver ${trimmedDriverId} for ${trimmedMonth}.`,
      performedBy || "Admin",
      updatedRecord.id
    );

    res.json(updatedRecord);
  } catch (error) {
    console.error("Update record error:", error);
    res.status(500).json({ error: "Failed to update driver record" });
  }
});

// 5. PATCH status update
app.patch("/api/records/:id/status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, performedBy } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    const validStatuses = ["Pending", "Approved", "Paid", "Rejected", "Archived"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedRecord = await prisma.driverRecord.update({
      where: { id },
      data: { status }
    });

    if (status === "Paid") {
      await handlePaymentRecord(updatedRecord.id, updatedRecord.finalPayout, updatedRecord.driverId, updatedRecord.month);
    }

    await logAudit(
      "STATUS_CHANGE",
      `Changed status of record ID ${id} to ${status}.`,
      performedBy || "Admin",
      updatedRecord.id
    );

    res.json(updatedRecord);
  } catch (error) {
    console.error("Patch status error:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// 6. DELETE record
app.delete("/api/records/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { performedBy } = req.query;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    const record = await prisma.driverRecord.findUnique({
      where: { id }
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    await prisma.driverRecord.delete({
      where: { id }
    });

    await logAudit(
      "DELETE_RECORD",
      `Deleted performance record for driver ${record.driverId} (${record.driverName}) for ${record.month}.`,
      performedBy || "Admin"
    );

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Delete record error:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

// 7. POST clear all records
app.post("/api/records/clear", async (req, res) => {
  try {
    const { performedBy } = req.body;
    await prisma.driverRecord.deleteMany();
    await logAudit("CLEAR_RECORDS", "Cleared all driver performance records from the system.", performedBy || "Admin");
    res.json({ message: "All records cleared successfully" });
  } catch (error) {
    console.error("Clear all records error:", error);
    res.status(500).json({ error: "Failed to clear records" });
  }
});

// 8. POST seed database
app.post("/api/records/seed", async (req, res) => {
  try {
    const { performedBy } = req.body;
    await seedData();
    await logAudit("DB_SEED", "Database re-seeded successfully with mock data.", performedBy || "System");
    res.json({ message: "Database re-seeded successfully with mock data" });
  } catch (error) {
    console.error("Seed endpoint error:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

// Diagnostic endpoint to check database connectivity
app.get("/api/diag", async (req, res) => {
  try {
    const url = process.env.DATABASE_URL || "NOT SET";
    const maskedUrl = url.replace(/:([^:@]+)@/, ":[MASKED_PASSWORD]@");
    const count = await prisma.driverRecord.count();
    const driverCount = await prisma.driver.count();
    const paymentCount = await prisma.paymentRecord.count();
    const auditCount = await prisma.auditLog.count();
    res.json({
      status: "success",
      message: "Database connection is working!",
      count,
      driverCount,
      paymentCount,
      auditCount,
      databaseUrl: maskedUrl
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed!",
      error: error.message,
      stack: error.stack,
      databaseUrl: process.env.DATABASE_URL ? "URL is set" : "URL is NOT set"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

