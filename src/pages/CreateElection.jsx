import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Convert datetime-local to backend format
function toBackendDate(localVal) {
  return localVal ? localVal.replace("T", " ") + ":00" : "";
}

function CreateElection() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('admin_token');

    if (!token) {
      alert('No admin token found. Please log in.');
      setLoading(false);
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      start_time: toBackendDate(form.start_time),
      end_time: toBackendDate(form.end_time)
    };

    try {
      const res = await fetch('http://localhost:5000/admin/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.status === 201) {
        alert('Election created successfully!');
         navigate("/admin/dashboard");
        setForm({ title: '', description: '', start_time: '', end_time: '' });
      } else {
        alert(result.message || result.msg || 'Failed to create election.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create election. Network error.');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="form-center-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Create Election</h1>

          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />

          <label>End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Election'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateElection;