import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // (Optional) Send to backend or mail service here
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <div style={{
        maxWidth: "500px", margin: "60px auto", backgroundColor: "rgba(154,234,243,0.85)",
        padding: "2px 30px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{textAlign:"center", fontSize:"32px", marginBottom:"30px", color:"#004aad"}}>Contact Us</h2>
        {!sent ? (
          <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} required />
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} required />
            <button type="submit" style={{
              backgroundColor:"#004aad", color:"#fff", border:"none", padding:"14px",
              fontSize:"16px", fontWeight:"bold", borderRadius:"8px", cursor:"pointer"
            }}>Send Message</button>
          </form>
        ) : (
          <div style={{textAlign:'center', color:'#004aad', fontWeight:'bold', fontSize:'20px', padding:'32px'}}>Thank you for contacting us!</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Contact;