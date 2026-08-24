import { useAuth } from "../context/AuthContext";
import LeaveRequestCard from "../components/LeaveRequestCard";

function MyLeavesPage() {
  const { employee } = useAuth();

  const leaveRequests = [
    {
      fromDate: "2026-08-10",
      toDate: "2026-08-12",
      days: 3,
      leaveType: "Casual Leave",
      reason: "Personal work",
      status: "Pending"
    },
    {
      fromDate: "2026-07-20",
      toDate: "2026-07-21",
      days: 2,
      leaveType: "Sick Leave",
      reason: "Not feeling well",
      status: "Approved"
    }
  ];

  return (
    <div>
      <h1>
        Welcome, {employee ? employee.name : "Employee"}
      </h1>

      <h2>My Leaves</h2>

      {leaveRequests.map((leave, index) => (
        <LeaveRequestCard
          key={index}
          fromDate={leave.fromDate}
          toDate={leave.toDate}
          days={leave.days}
          leaveType={leave.leaveType}
          reason={leave.reason}
          status={leave.status}
        />
      ))}
    </div>
  );
}

export default MyLeavesPage;