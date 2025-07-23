import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <div className="hero" style={{
        position:'relative', height:'90vh', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'flex-start', color:'white', textAlign:'left', padding:'60px 40px'
      }}>
        <video autoPlay muted loop style={{
          position:'absolute', top:0, left:0, minWidth:'100%', minHeight:'100%', objectFit:'cover', zIndex:-1
        }}>
          <source src="/Home.mp4" type="video/mp4" />
        </video>
        <div className="hero-text" style={{
          maxWidth:'60%', backgroundColor:'rgba(32, 74, 106, 0.6)', borderRadius:'40px', padding:'40px', zIndex:1
        }}>
          <h1>SMART VOTE SYSTEM</h1>
          <p>
            Shape the future with your voice. Our innovative platform empowers citizens to participate in democracy like never before.
            Join a community committed to progress and make your vote count towards a brighter tomorrow.
            Every opinion matters, and together, we can build a better world.
          </p>
          <button className="vote-btn" onClick={() => window.location.href='/login'} style={{
            backgroundColor:'#aee6e6', color:'#0606b0', padding:'12px 24px', fontSize:'18px', border:'none', borderRadius:'30px', cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,0.15)'
          }}>Vote now</button>
        </div>
      </div>
      <div className="slogan" style={{
        textAlign:"center", backgroundColor:"#6093e4", fontSize:"23px", fontWeight:"bold", padding:"20px", color:"#020f57"
      }}>
        Vote Today. Shape Tomorrow.
      </div>
      <Footer />
    </>
  );
}

export default Home;