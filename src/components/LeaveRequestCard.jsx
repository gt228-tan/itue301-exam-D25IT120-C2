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
      <p>
        <strong>From Date:</strong> {fromDate}
      </p>

      <p>
        <strong>To Date:</strong> {toDate}
      </p>

      <p>
        <strong>Days:</strong> {days}
      </p>

      <p>
        <strong>Leave Type:</strong> {leaveType}
      </p>

      <p>
        <strong>Reason:</strong> {reason}
      </p>

      <p>
        <strong>Status:</strong>{" "}
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

      <hr />
    </div>
  );
}

export default LeaveRequestCard;