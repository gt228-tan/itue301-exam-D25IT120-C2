const express = require("express");
const cors = require("cors");

const {
  employees,
  leaveTypes,
  leaves
} = require("./data/data");

const requestLogger = require("./middleware/requestLogger");
const authGuard = require("./middleware/authGuard");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = 5000;

// Built-in middleware
app.use(cors());
app.use(express.json());

// Custom logger - applies globally
app.use(requestLogger);


// ============================================
// POST /api/v1/auth/login
// ============================================

app.post("/api/v1/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const employee = employees.find(
    (emp) =>
      emp.email === email &&
      emp.password === password
  );

  if (!employee) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  const token = `token-employee-${employee.id}`;

  res.status(200).json({
    success: true,
    message: "Login successful",
    employee: {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role
    },
    token
  });
});


// ============================================
// GET /api/v1/leave-types
// Public route
// ============================================

app.get("/api/v1/leave-types", (req, res) => {
  res.status(200).json({
    success: true,
    leaveTypes
  });
});


// ============================================
// Protected routes
// ============================================

app.use("/api/v1/leaves", authGuard);


// ============================================
// POST /api/v1/leaves
// Apply for leave
// ============================================

app.post("/api/v1/leaves", (req, res) => {
  const {
    leaveType,
    fromDate,
    toDate,
    reason
  } = req.body;

  if (
    !leaveType ||
    !fromDate ||
    !toDate ||
    !reason
  ) {
    return res.status(400).json({
      success: false,
      message:
        "leaveType, fromDate, toDate and reason are required"
    });
  }

  const start = new Date(fromDate);
  const end = new Date(toDate);

  if (end < start) {
    return res.status(400).json({
      success: false,
      message: "toDate cannot be before fromDate"
    });
  }

  const days =
    Math.floor(
      (end - start) / (1000 * 60 * 60 * 24)
    ) + 1;

  const newLeave = {
    id: leaves.length + 1,
    employeeId: req.employee.id,
    employeeName: req.employee.name,
    leaveType,
    fromDate,
    toDate,
    days,
    reason,
    status: "pending"
  };

  leaves.push(newLeave);

  res.status(201).json({
    success: true,
    message: "Leave applied successfully",
    leave: newLeave
  });
});


// ============================================
// GET /api/v1/leaves/my
// Employee's own leaves
// ============================================

app.get("/api/v1/leaves/my", (req, res) => {
  const myLeaves = leaves.filter(
    (leave) =>
      leave.employeeId === req.employee.id
  );

  res.status(200).json({
    success: true,
    leaves: myLeaves
  });
});


// ============================================
// PATCH /api/v1/leaves/:id/status
// HR approves/rejects leave
// ============================================

app.patch(
  "/api/v1/leaves/:id/status",
  (req, res) => {

    // Only HR can change status
    if (req.employee.role !== "hr") {
      return res.status(401).json({
        success: false,
        message: "Only HR can update leave status"
      });
    }

    const ALLOWED = [
      "approved",
      "rejected"
    ];

    if (
      !req.body.status ||
      !ALLOWED.includes(req.body.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be either approved or rejected"
      });
    }

    const leaveId = Number(req.params.id);

    const leave = leaves.find(
      (item) => item.id === leaveId
    );

    if (!leave) {
      return res.status(400).json({
        success: false,
        message: "Leave request not found"
      });
    }

    leave.status = req.body.status;

    res.status(200).json({
      success: true,
      message: "Leave status updated",
      leave
    });
  }
);



app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});