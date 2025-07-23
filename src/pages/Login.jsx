import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Login() {
  const [form, setForm] = useState({ email:'',school_id:'', password:'' });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, school_id:form.school_id, password: form.password })
      });
      const result = await res.json();
      if (res.status === 200 && result.access_token) {
        localStorage.setItem("token", result.access_token);
        alert("Login successful!");
        window.location.href = "/vote";
      } else {
        alert(result.message || "Login failed.");
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
          backgroundColor:'#f2f2f2', padding:'20px 30px', borderRadius:'10px',
          boxShadow:'0 4px 12px rgba(2,3,40,0.12)', width:'400px', zIndex:1
        }}>
          <h1 style={{textAlign:'center',color:'#00307d'}}>Login</h1>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>StudentId:</label>
          <input type="number" name="school_id" pattern="\d{6}" maxLength="6" placeholder="Enter student ID" value={form.number} onChange={handleChange} required />
          <label>Password:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <button type="submit" disabled={loading} style={{
            backgroundColor:'#240cbb', color:'#fff', padding:'10px 20px', border:'none',
            borderRadius:'5px', cursor:'pointer', width:'100%', fontSize:'16px'
          }}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;