require("dotenv").config();

const mongoose = require("mongoose");

const Employee = require("../models/Employee");
const LeaveType = require("../models/LeaveType");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Clear existing data
    await Employee.deleteMany({});
    await LeaveType.deleteMany({});

    // Create employees
    await Employee.create([
      {
        name: "Tanishq",
        email: "tanishq@gmail.com",
        department: "IT"
      },
      {
        name: "HR Manager",
        email: "hr@gmail.com",
        department: "HR"
      }
    ]);

    // Create leave types
    await LeaveType.create([
      {
        name: "Casual",
        maxDaysPerYear: 12
      },
      {
        name: "Sick",
        maxDaysPerYear: 10
      },
      {
        name: "Earned",
        maxDaysPerYear: 15
      },
      {
        name: "CompOff",
        maxDaysPerYear: 5
      }
    ]);

    console.log("Database seeded successfully");

    process.exit(0);

  } catch (error) {
    console.error(
      "Seeding failed:",
      error.message
    );

    process.exit(1);
  }
}

seedDatabase();