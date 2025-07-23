import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminElections() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/admin/elections", {
      headers: { Authorization: "Bearer " + localStorage.getItem("admin_token") }
    })
      .then(res => res.json())
      .then(data => setElections(data.elections || []));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Election Management</h2>

      <button onClick={() => navigate("/admin/elections/new")} style={styles.createBtn}>
        + Create Election
      </button>

      <ul style={styles.list}>
        {elections.map(e => (
          <li key={e.id} style={styles.electionItem}>
            <div>
              <span style={styles.electionTitle}>{e.title}</span>
              <span style={{ ...styles.status, color: getStatusColor(e.status) }}>
                ({e.status})
              </span>
            </div>
            <button
              onClick={() => navigate(`/admin/elections/${e.id}`)}
              style={styles.detailsBtn}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f2f9fb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    color: "#215a6d"
  },
  createBtn: {
    display: "block",
    margin: "0 auto 30px auto",
    padding: "10px 24px",
    backgroundColor: "#21818c",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  },
  list: {
    listStyleType: "none",
    padding: 0
  },
  electionItem: {
    backgroundColor: "#fff",
    marginBottom: "15px",
    padding: "15px 20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  electionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333"
  },
  status: {
    marginLeft: "10px",
    fontWeight: "500"
  },
  detailsBtn: {
    backgroundColor: "#1408eb",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  }
};

function getStatusColor(status) {
  switch (status) {
    case "open":
      return "green";
    case "scheduled":
      return "orange";
    case "closed":
      return "red";
    default:
      return "#666";
  }
}
