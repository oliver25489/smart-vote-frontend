import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Register() {
  const [form, setForm] = useState({ name:'', email:'', school_id:'', password:'', confirmPassword:'' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password.length < 6) return alert("Password must be at least 6 characters long.");
    if (form.school_id.length < 6) return alert("Student id is 6 digits");
    if (form.password !== form.confirmPassword) return alert("Passwords do not match.");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, school_id:form.school_id, password: form.password })
      });
      const result = await res.json();
      if (res.status === 201) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch {
      alert("Network error.");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh',paddingTop:'50px'}}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor:'#0375f713', padding:'20px 30px', borderRadius:'10px',
          boxShadow:'0 4px 12px rgba(2,3,40,0.35)', width:'400px', zIndex:1
        }}>
          <h1 style={{textAlign:'center',color:'#00307d'}}>Create Account</h1>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>StudentId:</label>
          <input type="number" name="school_id" pattern="\d{6}" maxLength="6" placeholder="Enter student ID" value={form.number} onChange={handleChange} required />
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          <button type="submit" disabled={loading} style={{
            backgroundColor:'#240cbb', color:'#fff', padding:'10px 20px', border:'none',
            borderRadius:'5px', cursor:'pointer', width:'100%', fontSize:'16px'
          }}>{loading ? "Creating..." : "Create Account"}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;