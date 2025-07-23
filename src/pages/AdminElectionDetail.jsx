import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminElectionDetail() {
  const [election, setElection] = useState(null);
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/admin/elections/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("admin_token") }
    })
      .then(res => res.json())
      .then(data => {
        setElection(data.election);
        setPositions(data.positions || []);
        setCandidates(data.candidates || []);
      });
  }, [id]);

  function makeElectionActive() {
    const now = new Date();
    const startTime = new Date(now.getTime() - 5 * 60 * 1000);
    const endTime = new Date(now.getTime() + 60 * 60 * 1000);

    fetch(`http://localhost:5000/admin/elections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("admin_token"),
      },
      body: JSON.stringify({
        start_time: startTime.toISOString().slice(0, 19).replace('T', ' '),
        end_time: endTime.toISOString().slice(0, 19).replace('T', ' ')
      })
    })
      .then(res => res.json())
      .then(data => {
        alert('Election updated to active');
        setElection(data.election);
      });
  }

  if (!election) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{election.title}</h2>
      <p style={styles.description}>{election.description}</p>
      <p style={styles.status}>Status: <strong>{election.status}</strong></p>

      <div style={styles.buttonGroup}>
        <button style={styles.btnPrimary} onClick={() => navigate(`/admin/elections/${id}/edit`)}>✏️ Edit</button>
        <button style={styles.btnDanger} onClick={() => alert("Delete logic here")}>🗑 Delete</button>
        <button style={styles.btnSuccess} onClick={makeElectionActive}>🚀 Make Active</button>
      </div>

      <h3 style={styles.subheading}>Positions</h3>
      <ul style={styles.list}>
        {positions.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
      <button style={styles.btnSecondary} onClick={() => navigate(`/admin/elections/${id}/positions/new`)}>➕ Add Position</button>

      <h3 style={styles.subheading}>Candidates</h3>
      <ul style={styles.list}>
        {candidates.map(c => (
          <li key={c.id}>
            {c.name} (Position: {positions.find(p => p.id === c.position_id)?.name || 'Unknown'})
          </li>
        ))}
      </ul>
      <button style={styles.btnSecondary} onClick={() => navigate(`/admin/elections/${id}/candidates/new`)}>➕ Add Candidate</button>

      <h3 style={styles.subheading}>Results / Stats</h3>
      <button style={styles.btnOutline} onClick={() => navigate(`/admin/elections/${id}/results`)}>📊 View Results</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#f8fbff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "26px",
    color: "#215a6d",
    marginBottom: "10px"
  },
  description: {
    fontSize: "16px",
    marginBottom: "10px"
  },
  status: {
    fontSize: "16px",
    marginBottom: "20px"
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "25px"
  },
  btnPrimary: {
    backgroundColor: "#1408eb",
    color: "#fff",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  btnDanger: {
    backgroundColor: "#e53935",
    color: "#fff",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  btnSuccess: {
    backgroundColor: "#43a047",
    color: "#fff",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  btnSecondary: {
    marginTop: "10px",
    backgroundColor: "#2196f3",
    color: "#fff",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  btnOutline: {
    backgroundColor: "#fff",
    color: "#215a6d",
    border: "2px solid #215a6d",
    padding: "8px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },
  subheading: {
    fontSize: "20px",
    marginTop: "30px",
    color: "#215a6d"
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "20px",
    marginBottom: "15px"
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px"
  }
};
