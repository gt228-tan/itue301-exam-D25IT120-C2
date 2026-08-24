const colors = {
  pending: "#FFC107",
  approved: "#28A745",
  rejected: "#DC3545"
};

function LeaveRequestCard({
  fromDate,
  toDate,
  days,
  leaveType,
  reason,
  status
}) {
  return (
    <div>
      <p>From Date: {fromDate}</p>
      <p>To Date: {toDate}</p>
      <p>Days: {days}</p>
      <p>Leave Type: {leaveType}</p>
      <p>Reason: {reason}</p>

      <p>
        Status:{" "}
        <span
          style={{
            backgroundColor: colors[status.toLowerCase()],
            color: "white",
            padding: "5px 10px",
            borderRadius: "15px"
          }}
        >
          {status}
        </span>
      </p>
    </div>
  );
}

export default LeaveRequestCard;