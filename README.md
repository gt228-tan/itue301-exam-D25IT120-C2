# Set C : Employee Leave Management System

Scenario: TechSolutions Pvt Ltd manages leave requests over WhatsApp, leading to lost requests and unapproved leaves. Build a portal where employees apply for leave, managers approve/reject, and HR generates reports.

Data Entities:
Employee: name, email, department, designation, leaveBalance (Number)
LeaveType: name (Casual | Sick | Earned | CompOff), maxDaysPerYear
LeaveRequest: employeeId (ref), leaveTypeId (ref), fromDate, toDate, days, reason, status (pending | approved | rejected | cancelled)
User Roles: EmployeeManagerHR

