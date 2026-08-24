require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Employee = require("./models/Employee");
const LeaveType = require("./models/LeaveType");
const LeaveRequest = require("./models/LeaveRequest");

const requestLogger = require("./middleware/requestLogger");
const authGuard = require("./middleware/authGuard");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;


// ==========================================
// Middleware
// ==========================================

app.use(cors());
app.use(express.json());
app.use(requestLogger);


// ==========================================
// MongoDB connection
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed");
    console.error(error.message);
  });


// ==========================================
// LOGIN
// POST /api/v1/auth/login
// ==========================================

app.post("/api/v1/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // NOTE:
    // For this exam, password is not stored in Employee schema.
    // We use email to find the employee.
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        employeeId: employee._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      success: true,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department
      },
      token
    });

  } catch (error) {
    next(error);
  }
});


// ==========================================
// GET LEAVE TYPES
// Public
// ==========================================

app.get("/api/v1/leave-types", async (req, res, next) => {
  try {
    const leaveTypes = await LeaveType.find();

    res.status(200).json({
      success: true,
      leaveTypes
    });

  } catch (error) {
    next(error);
  }
});


// ==========================================
// PROTECTED LEAVE ROUTES
// ==========================================

app.use("/api/v1/leaves", authGuard);


// ==========================================
// POST /api/v1/leaves
// Apply Leave
// ==========================================

app.post("/api/v1/leaves", async (req, res, next) => {
  try {
    const {
      leaveTypeId,
      fromDate,
      toDate,
      days,
      reason
    } = req.body;

    if (
      !leaveTypeId ||
      !fromDate ||
      !toDate ||
      !days
    ) {
      return res.status(400).json({
        success: false,
        message:
          "leaveTypeId, fromDate, toDate and days are required"
      });
    }

    // Find employee
    const employee = await Employee.findById(
      req.employee.id
    );

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Employee not found"
      });
    }

    // Check leave balance
    if (days > employee.leaveBalance) {
      return res.status(400).json({
        success: false,
        message:
          `Insufficient leave balance. Available balance: ${employee.leaveBalance}`
      });
    }

    // Check leave type
    const leaveType = await LeaveType.findById(
      leaveTypeId
    );

    if (!leaveType) {
      return res.status(400).json({
        success: false,
        message: "Invalid leave type"
      });
    }

    // Create LeaveRequest
    const leaveRequest = await LeaveRequest.create({
      employeeId: employee._id,
      leaveTypeId: leaveType._id,
      fromDate,
      toDate,
      days,
      reason
    });

    // Deduct balance
    await Employee.findByIdAndUpdate(
      employee._id,
      {
        $inc: {
          leaveBalance: -days
        }
      },
      {
        new: true
      }
    );

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      leave: leaveRequest
    });

  } catch (error) {
    next(error);
  }
});


// ==========================================
// GET /api/v1/leaves/my
// ==========================================

app.get("/api/v1/leaves/my", async (req, res, next) => {
  try {
    const leaves = await LeaveRequest.find({
      employeeId: req.employee.id
    })
      .populate(
        "leaveTypeId",
        "name maxDaysPerYear"
      )
      .sort({
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      leaves
    });

  } catch (error) {
    next(error);
  }
});


// ==========================================
// PATCH /api/v1/leaves/:id/status
// ==========================================

app.patch(
  "/api/v1/leaves/:id/status",
  async (req, res, next) => {
    try {
      const ALLOWED = [
        "approved",
        "rejected"
      ];

      if (!ALLOWED.includes(req.body.status)) {
        return res.status(400).json({
          success: false,
          message:
            "Status must be approved or rejected"
        });
      }

      const leave = await LeaveRequest.findById(
        req.params.id
      );

      if (!leave) {
        return res.status(400).json({
          success: false,
          message: "Leave request not found"
        });
      }

      leave.status = req.body.status;

      await leave.save();

      res.status(200).json({
        success: true,
        message: "Leave status updated",
        leave
      });

    } catch (error) {
      next(error);
    }
  }
);


// ==========================================
// GLOBAL ERROR HANDLER
// Must be LAST
// ==========================================

app.use(errorHandler);


// ==========================================
// Start server
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});