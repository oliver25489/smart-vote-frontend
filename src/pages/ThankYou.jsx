import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ThankYou() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  }, []);
  return (
    <>
      <Navbar />
      <div style={{
        background: "url('/thanks.png') no-repeat center center fixed",
        backgroundSize: "cover", minHeight: "80vh", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"
      }}>
        <div style={{
          backgroundColor: "rgb(166, 211, 228)", padding: "40px",
          borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
        }}>
          <h1 style={{color:"#08174f", marginBottom:"10px"}}>🎉🎉 Vote Submitted Successfully! 🎉🎉</h1>
          <p style={{fontSize:"18px", color:"#333"}}>You will be redirected to the homepage shortly...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ThankYou;