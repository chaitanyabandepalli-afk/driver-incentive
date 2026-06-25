const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sampleDrivers = [
  {
    driverId: "DRV001",
    name: "Ravi Kumar",
    licenseNumber: "DL-1420230000001",
    phone: "9876543210",
    email: "ravi.kumar@manivtha.com",
  },
  {
    driverId: "DRV002",
    name: "Suresh Reddy",
    licenseNumber: "DL-1420230000002",
    phone: "9876543211",
    email: "suresh.reddy@manivtha.com",
  },
  {
    driverId: "DRV003",
    name: "Mahesh Yadav",
    licenseNumber: "DL-1420230000003",
    phone: "9876543212",
    email: "mahesh.yadav@manivtha.com",
  },
  {
    driverId: "DRV004",
    name: "Arjun Singh",
    licenseNumber: "DL-1420230000004",
    phone: "9876543213",
    email: "arjun.singh@manivtha.com",
  },
  {
    driverId: "DRV005",
    name: "Naveen Rao",
    licenseNumber: "DL-1420230000005",
    phone: "9876543214",
    email: "naveen.rao@manivtha.com",
  },
  {
    driverId: "DRV006",
    name: "Kiran Kumar",
    licenseNumber: "DL-1420230000006",
    phone: "9876543215",
    email: "kiran.kumar@manivtha.com",
  },
];

const sampleRecords = [
  {
    driverId: "DRV001",
    driverName: "Ravi Kumar",
    month: "June",
    tripsCompleted: 42,
    onTimeTrips: 39,
    lateTrips: 3,
    punctualityPercentage: 92.9,
    customerRating: 4.7,
    complaints: 0,
    baseSalary: 22000,
    incentiveAmount: 5000,
    finalPayout: 27000,
    status: "Approved",
  },
  {
    driverId: "DRV002",
    driverName: "Suresh Reddy",
    month: "June",
    tripsCompleted: 32,
    onTimeTrips: 27,
    lateTrips: 5,
    punctualityPercentage: 84.4,
    customerRating: 4.2,
    complaints: 1,
    baseSalary: 21000,
    incentiveAmount: 3000,
    finalPayout: 24000,
    status: "Pending",
  },
  {
    driverId: "DRV003",
    driverName: "Mahesh Yadav",
    month: "May",
    tripsCompleted: 24,
    onTimeTrips: 18,
    lateTrips: 6,
    punctualityPercentage: 75.0,
    customerRating: 3.8,
    complaints: 2,
    baseSalary: 20000,
    incentiveAmount: 1000,
    finalPayout: 21000,
    status: "Paid",
  },
  {
    driverId: "DRV004",
    driverName: "Arjun Singh",
    month: "April",
    tripsCompleted: 18,
    onTimeTrips: 12,
    lateTrips: 6,
    punctualityPercentage: 66.7,
    customerRating: 3.4,
    complaints: 3,
    baseSalary: 20000,
    incentiveAmount: 0,
    finalPayout: 20000,
    status: "Rejected",
  },
  {
    driverId: "DRV005",
    driverName: "Naveen Rao",
    month: "July",
    tripsCompleted: 45,
    onTimeTrips: 43,
    lateTrips: 2,
    punctualityPercentage: 95.6,
    customerRating: 4.8,
    complaints: 0,
    baseSalary: 23000,
    incentiveAmount: 5000,
    finalPayout: 28000,
    status: "Approved",
  },
  {
    driverId: "DRV006",
    driverName: "Kiran Kumar",
    month: "July",
    tripsCompleted: 31,
    onTimeTrips: 26,
    lateTrips: 5,
    punctualityPercentage: 83.9,
    customerRating: 4.1,
    complaints: 1,
    baseSalary: 21500,
    incentiveAmount: 3000,
    finalPayout: 24500,
    status: "Pending",
  },
];

const sampleStaff = [
  {
    email: "chaitanyabandepalli@gmail.com",
    name: "Chaitanya Bandepalli",
    role: "Admin",
  },
  {
    email: "operator@manivtha.com",
    name: "Operator Staff",
    role: "Operator",
  },
];

const sampleCustomers = [
  { name: "Ramesh Sharma", phone: "9112233445", email: "ramesh@gmail.com" },
  { name: "Anitha Sen", phone: "9112233446", email: "anitha@gmail.com" },
];

async function seedData() {
  // Clear existing data (in order of child to parent relations)
  await prisma.auditLog.deleteMany();
  await prisma.paymentRecord.deleteMany();
  await prisma.driverRecord.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.customer.deleteMany();

  // 1. Seed Drivers
  for (const driver of sampleDrivers) {
    await prisma.driver.create({
      data: driver,
    });
  }

  // 2. Seed Staff
  for (const staff of sampleStaff) {
    await prisma.staff.create({
      data: staff,
    });
  }

  // 3. Seed Customers
  for (const customer of sampleCustomers) {
    await prisma.customer.create({
      data: customer,
    });
  }

  // 4. Seed Driver Records
  const createdRecords = [];
  for (const record of sampleRecords) {
    const created = await prisma.driverRecord.create({
      data: record,
    });
    createdRecords.push(created);
  }

  // 5. Seed Payments for "Paid" records
  for (const record of createdRecords) {
    if (record.status === "Paid") {
      await prisma.paymentRecord.create({
        data: {
          recordId: record.id,
          amount: record.finalPayout,
          transactionId: `TXN${record.driverId}${record.month.toUpperCase()}`,
        },
      });
    }
  }

  // 6. Log Initial Seed Audit Log
  await prisma.auditLog.create({
    data: {
      action: "DB_SEED",
      details: "Database successfully seeded with drivers, staff, customers, records, and payment history.",
      performedBy: "System",
    },
  });
}

if (require.main === module) {
  console.log("Start seeding...");
  seedData()
    .then(() => {
      console.log("Seeding finished.");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { seedData, sampleRecords };
