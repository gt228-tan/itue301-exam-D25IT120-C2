function ApplyLeavePage() {
  return (
    <div>
      <h1>Apply for Leave</h1>

      <label>From Date:</label>
      <input type="date" />

      <br /><br />

      <label>To Date:</label>
      <input type="date" />

      <br /><br />

      <label>Leave Type:</label>
      <select>
        <option>Casual Leave</option>
        <option>Sick Leave</option>
        <option>Earned Leave</option>
      </select>

      <br /><br />

      <label>Reason:</label>
      <br />
      <textarea placeholder="Enter reason"></textarea>

      <br /><br />

      <button>Apply Leave</button>
    </div>
  );
}

export default ApplyLeavePage;