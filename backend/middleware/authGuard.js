const { employees } = require("../data/data");

function authGuard(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing"
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format"
    });
  }

  const token = authHeader.split(" ")[1];

  const employeeId = token.replace("token-employee-", "");

  const employee = employees.find(
    (emp) => emp.id === Number(employeeId)
  );

  if (!employee) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }

  req.employee = employee;

  next();
}

module.exports = authGuard;