import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import LeaveRequestCard from "../components/LeaveRequestCard";

function MyLeavesPage() {
  const { employee, token } = useAuth();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/leaves/my",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Status:", response.status);

        if (response.status !== 200) {
          setError("Failed to load your leave history.");
          return;
        }

        const data = await response.json();

        console.log("API response:", data);

        setLeaves(data.leaves || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load your leave history.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchLeaves();
    } else {
      setLoading(false);
      setError("Failed to load your leave history.");
    }
  }, [token]);

  const filteredLeaves =
    statusFilter === "All"
      ? leaves
      : leaves.filter(
          (leave) =>
            leave.status.toLowerCase() ===
            statusFilter.toLowerCase()
        );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Failed to load your leave history.</h2>;
  }

  return (
    <div>
      <h1>
        Welcome, {employee ? employee.name : "Employee"}
      </h1>

      <h2>My Leave History</h2>

      <label>Filter by Status: </label>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <br />
      <br />

      {filteredLeaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        filteredLeaves.map((leave) => (
          <LeaveRequestCard
            key={leave.id}
            fromDate={leave.fromDate}
            toDate={leave.toDate}
            days={leave.days}
            leaveType={leave.leaveType}
            reason={leave.reason}
            status={leave.status}
          />
        ))
      )}
    </div>
  );
}

export default MyLeavesPage;