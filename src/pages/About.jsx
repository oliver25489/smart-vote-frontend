import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  return (
    <>
      <Navbar />
      <header className="hero" style={{
        background: "url('/sign.jpg') no-repeat center center/cover",
        height: "55vh", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "30px 40px", color: "rgb(247, 245, 245)", position: "relative"
      }}>
        <div className="overlay" style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1
        }}></div>
        <div className="hero-content" style={{position:'relative', zIndex:2}}>
          <h1>Smart Vote – Empowering Student Leadership with Digital Democracy</h1>
        </div>
      </header>
      <section className="section" style={{maxWidth:"1000px", margin:"60px auto", padding:"0 20px"}}>
        <div className="section-title" style={{textAlign:"center", fontSize:"36px", marginBottom:"40px", color:"#081f4e"}}>Who We Are</div>
        <div className="info-split" style={{display:"flex", justifyContent:"space-between", gap:"40px", flexWrap:"wrap"}}>
          <div className="box" style={{
            flex:1, background:"#b8deebcc", padding:"30px", borderRadius:"12px", boxShadow:"0 4px 10px rgba(0,0,0,0.08)"
          }}>
            <h3 style={{fontSize:"24px", marginBottom:"10px", color:"#04194d"}}>Mission</h3>
            <p>To empower students to engage in leadership through a secure, transparent, and modern voting platform.</p>
          </div>
          <div className="box" style={{
            flex:1, background:"#b8deebcc", padding:"30px", borderRadius:"12px", boxShadow:"0 4px 10px rgba(0,0,0,0.08)"
          }}>
            <h3 style={{fontSize:"24px", marginBottom:"10px", color:"#04194d"}}>Vision</h3>
            <p>To become the leading digital voting platform that nurtures trust, inclusion, and innovation in campus elections.</p>
          </div>
        </div>
        <div className="values" style={{
          marginTop:"40px", backgroundColor:"#c9e6f5", padding:"30px", borderRadius:"12px", textAlign:"center"
        }}>
          <h3 style={{fontSize:"24px", marginBottom:"20px"}}>Our Core Values</h3>
          <ul style={{listStyle:"none", padding:0, display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"15px"}}>
            <li style={{background:"#76d6ea", padding:"10px 20px", borderRadius:"8px", boxShadow:"0 2px 5px rgba(0,0,0,0.1)", fontSize:"16px"}}>Integrity</li>
            <li style={{background:"#76d6ea", padding:"10px 20px", borderRadius:"8px", boxShadow:"0 2px 5px rgba(0,0,0,0.1)", fontSize:"16px"}}>Inclusivity</li>
            <li style={{background:"#76d6ea", padding:"10px 20px", borderRadius:"8px", boxShadow:"0 2px 5px rgba(0,0,0,0.1)", fontSize:"16px"}}>Transparency</li>
            <li style={{background:"#76d6ea", padding:"10px 20px", borderRadius:"8px", boxShadow:"0 2px 5px rgba(0,0,0,0.1)", fontSize:"16px"}}>Innovation</li>
            <li style={{background:"#76d6ea", padding:"10px 20px", borderRadius:"8px", boxShadow:"0 2px 5px rgba(0,0,0,0.1)", fontSize:"16px"}}>Accountability</li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;