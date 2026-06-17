const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

async function seedData() {
  // Clear existing records
  await prisma.driverRecord.deleteMany();

  for (const record of sampleRecords) {
    await prisma.driverRecord.create({
      data: record,
    });
  }
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
