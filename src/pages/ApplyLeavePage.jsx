import { useState } from "react";

function ApplyLeavePage() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [days, setDays] = useState(0);

  const calculateDays = (from, to) => {
    if (!from || !to) {
      setDays(0);
      return;
    }

    const start = new Date(from);
    const end = new Date(to);

    const difference = end - start;
    const totalDays =
      difference / (1000 * 60 * 60 * 24) + 1;

    setDays(totalDays > 0 ? totalDays : 0);
  };

  const handleFromDateChange = (e) => {
    const value = e.target.value;

    setFromDate(value);
    calculateDays(value, toDate);
  };

  const handleToDateChange = (e) => {
    const value = e.target.value;

    setToDate(value);
    calculateDays(fromDate, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      leaveType,
      fromDate,
      toDate,
      days,
      reason
    });

    alert("Leave applied successfully!");
  };

  return (
    <div>
      <h1>Apply Leave</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Leave Type: </label>

          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
        </div>

        <br />

        <div>
          <label>From Date: </label>

          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            required
          />
        </div>

        <br />

        <div>
          <label>To Date: </label>

          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Number of Days: </label>

          <input
            type="number"
            value={days}
            readOnly
          />
        </div>

        <br />

        <div>
          <label>Reason: </label>
          <br />

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason"
            required
          />
        </div>

        <br />

        <button type="submit">
          Apply Leave
        </button>

      </form>
    </div>
  );
}

export default ApplyLeavePage;  