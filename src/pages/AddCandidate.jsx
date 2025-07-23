import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddCandidate() {
  const [name, setName] = useState("");
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/admin/elections/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("admin_token") }
    })
      .then(res => res.json())
      .then(data => setPositions(data.positions || []));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/admin/elections/${id}/candidates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("admin_token")
      },
      body: JSON.stringify({ name, position_id: positionId })
    }).then(() => navigate(`/admin/elections/${id}`));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Candidate</h2>
      <input name="name" placeholder="Candidate name" value={name} onChange={e => setName(e.target.value)} required />
      <select value={positionId} onChange={e => setPositionId(e.target.value)} required>
        <option value="">Select Position</option>
        {positions.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}