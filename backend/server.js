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

// Endpoints

app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Driver Incentive Tracker API Server is running!" });
});

app.get("/api", (req, res) => {
  res.json({ status: "healthy", message: "Use /api/records to fetch data." });
});

// 1. GET all records with optional query search
app.get("/api/records", async (req, res) => {
  try {
    const { search, status, month } = req.query;

    let whereClause = {};

    if (search) {
      whereClause.OR = [
        { driverName: { contains: search } },
        { driverId: { contains: search } }
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
      status
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
      status
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
    const { status } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    const validStatuses = ["Pending", "Approved", "Paid", "Rejected"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedRecord = await prisma.driverRecord.update({
      where: { id },
      data: { status }
    });

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
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid record ID" });
    }

    await prisma.driverRecord.delete({
      where: { id }
    });

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Delete record error:", error);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

// 7. POST clear all records
app.post("/api/records/clear", async (req, res) => {
  try {
    await prisma.driverRecord.deleteMany();
    res.json({ message: "All records cleared successfully" });
  } catch (error) {
    console.error("Clear all records error:", error);
    res.status(500).json({ error: "Failed to clear records" });
  }
});

// 8. POST seed database
app.post("/api/records/seed", async (req, res) => {
  try {
    await seedData();
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
    res.json({
      status: "success",
      message: "Database connection is working!",
      count,
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
