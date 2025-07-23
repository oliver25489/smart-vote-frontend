import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddPosition() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/admin/elections/${id}/positions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("admin_token")
      },
      body: JSON.stringify({ name })
    }).then(() => navigate(`/admin/elections/${id}`));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Position</h2>
      <input name="name" placeholder="Position name" value={name} onChange={e => setName(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}