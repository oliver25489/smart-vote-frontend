import React, { useEffect, useState } from "react";

export default function AdminVoters() {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/voters", {
      headers: { Authorization: "Bearer " + localStorage.getItem("admin_token") }
    })
      .then(res => res.json())
      .then(data => setVoters(data.voters || []));
  }, []);

  return (
    <div style={{
      maxWidth: "900px",
      margin: "40px auto",
      backgroundColor: "#f0f7ff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{
        fontSize: "28px",
        marginBottom: "20px",
        color: "#003366",
        borderBottom: "2px solid #004080",
        paddingBottom: "10px"
      }}>
        Registered Voters
      </h2>

      {voters.length === 0 ? (
        <p style={{ color: "#555" }}>No voters registered yet.</p>
      ) : (
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0
        }}>
          {voters.map(v => (
            <li key={v.id} style={{
              background: "#ffffff",
              padding: "15px 20px",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: "bold", color: "#222" }}>{v.name}</span>
              <span style={{ color: "#555" }}>{v.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
