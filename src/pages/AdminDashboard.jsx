import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/admin/elections", {
      headers: { Authorization: "Bearer " + localStorage.getItem("admin_token") }
    })
      .then(res => res.json())
      .then(data => {
        setElections(data.elections || []);
        setLoading(false);
      });
  }, []);

  function handleCreateElection() {
    navigate("/admin/elections/new");
  }

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '30px',
      background: 'rgba(33,129,142,0.85)',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ marginBottom: '25px', fontSize: '28px' }}>Admin Dashboard</h1>

      <button
        onClick={handleCreateElection}
        style={{
          backgroundColor: '#004d66',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          cursor: 'pointer',
          marginBottom: '25px'
        }}
      >
        + Create New Election
      </button>

      <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Manage Elections</h2>
      {loading ? (
        <div style={{ color: '#eee' }}>Loading elections...</div>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {elections.map(e => (
            <li key={e.id} style={{
              background: '#ffffff',
              color: '#000000',
              padding: '18px',
              borderRadius: '8px',
              marginBottom: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{e.title}</div>
              <div style={{ margin: '6px 0', fontSize: '14px' }}>Status: <b>{e.status}</b></div>
              <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Link to={`/admin/elections/${e.id}`} style={linkStyle}>View Details</Link>
                <Link to={`/admin/elections/${e.id}/positions/new`} style={linkStyle}>Add Position</Link>
                <Link to={`/admin/elections/${e.id}/candidates/new`} style={linkStyle}>Add Candidate</Link>
                <Link to={`/admin/elections/${e.id}/results`} style={linkStyle}>View Results</Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: '40px 0', borderColor: '#ccc' }} />

      <h2>Registered Voters</h2>
      <Link to="/admin/voters" style={{
        display: 'inline-block',
        marginTop: '10px',
        backgroundColor: '#117a8b',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        View Registered Voters
      </Link>
    </div>
  );
}

const linkStyle = {
  backgroundColor: '#2196f3',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 'bold'
};
