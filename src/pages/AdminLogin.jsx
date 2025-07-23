import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (res.status === 200 && result.access_token) {
        localStorage.setItem('admin_token', result.access_token);
        alert('Admin login successful!');
        window.location.href = '/admin/dashboard'; // You can change this route to your admin dashboard
      } else {
        alert(result.message || 'Admin login failed.');
      }
    } catch {
      alert('Network error.');
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="form-center-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Admin Login</h1>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;