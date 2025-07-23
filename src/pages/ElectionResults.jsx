import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ElectionResults() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [election, setElection] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    // Fetch election details
    fetch(`http://localhost:5000/admin/elections/${id}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setElection(data.election));

    // Fetch results
    fetch(`http://localhost:5000/admin/elections/${id}/results`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => setResults(data.results || []));
  }, [id]);

  return (
    <div style={{
      maxWidth: "900px",
      margin: "40px auto",
      backgroundColor: "#f4faff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{
        fontSize: "28px",
        marginBottom: "10px",
        color: "#003366"
      }}>
        {election ? election.title : "Election Results"}
      </h2>

      <p style={{ marginBottom: "25px", color: "#555" }}>
        {election?.description}
      </p>

      {results.length === 0 ? (
        <p style={{ color: "#555" }}>No results available yet.</p>
      ) : (
        results.map(pos => (
          <div key={pos.position} style={{ marginBottom: "30px" }}>
            <h3 style={{
              color: "#005199",
              marginBottom: "12px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "6px"
            }}>
              {pos.position}
            </h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {pos.candidates.map(c => (
                <li key={c.name} style={{
                  backgroundColor: "#fff",
                  marginBottom: "10px",
                  padding: "12px 18px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span style={{ fontWeight: "bold", color: "#333" }}>{c.name}</span>
                  <span style={{ color: "#005199" }}>{c.votes} votes</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
