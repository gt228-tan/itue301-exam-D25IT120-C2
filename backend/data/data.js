const employees = [
  {
    id: 1,
    name: "Tanishq",
    email: "tanishq@gmail.com",
    password: "123456",
    role: "employee"
  },
  {
    id: 2,
    name: "HR Manager",
    email: "hr@gmail.com",
    password: "123456",
    role: "hr"
  }
];

const leaveTypes = [
  {
    id: 1,
    name: "Casual Leave"
  },
  {
    id: 2,
    name: "Sick Leave"
  },
  {
    id: 3,
    name: "Earned Leave"
  }
];

const leaves = [];

module.exports = {
  employees,
  leaveTypes,
  leaves
};