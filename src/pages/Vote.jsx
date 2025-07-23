import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BACKEND_URL = "http://localhost:5000";

function Vote() {
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState({});
  const [votes, setVotes] = useState({});
  const [election, setElection] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = "/login";
      return;
    }

    
    fetch(`${BACKEND_URL}/admin/elections/active`, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.elections && data.elections.length > 0) {
          setElection(data.elections[0]); // use first active election
        }
      });

    // Fetch positions
    fetch(`${BACKEND_URL}/positions`, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        setPositions(data);
        // Fetch candidates for each position
        data.forEach(pos => {
          fetch(`${BACKEND_URL}/candidates?position_id=${pos.id}`, {
            headers: { "Authorization": "Bearer " + token }
          })
            .then(res => res.json())
            .then(cands => {
              setCandidates(prev => ({ ...prev, [pos.id]: cands }));
            });
        });
        setLoading(false);
      });
  }, []);

  function handleVoteChange(positionId, candidateId) {
    setVotes({ ...votes, [positionId]: candidateId });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    let missing = [];
    let payloads = [];

    positions.forEach(pos => {
      if (!votes[pos.id]) {
        missing.push(pos.name);
      } else {
        payloads.push({
          election_id: pos.election_id,
          position_id: pos.id,
          candidate_id: votes[pos.id]
        });
      }
    });

    if (missing.length > 0) {
      alert("Please vote for:\n\n" + missing.join("\n"));
      return;
    }

    for (let p of payloads) {
      const res = await fetch(`${BACKEND_URL}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(p)
      });
      const result = await res.json();
      if (res.status !== 201) {
        alert(result.message || "Voting failed.");
        return;
      }
    }
    window.location.href = "/thankyou";
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{
        maxWidth: "1000px", backgroundColor: "rgba(33,129,142,0.8)", padding: "30px", margin: "auto",
        borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", marginTop: "30px"
      }}>
         
        <h1>{election ? election.title : "Student Election"}</h1>

        {loading ? <div>Loading...</div> : (
          <form onSubmit={handleSubmit}>
            {positions.map(pos => (
              <div className="position" key={pos.id} style={{ marginBottom: "40px" }}>
                <h2>{pos.name}</h2>
                <div className="candidates-row" style={{
                  display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "15px"
                }}>
                  {(candidates[pos.id] || []).map(cand => (
                    <div className="candidate" key={cand.id} style={{
                      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "200px"
                    }}>
                      <img src={cand.photo_url || '/default.jpg'} alt={cand.name} style={{
                        width: "200px", height: "200px", objectFit: "cover", borderRadius: "5px", border: "2px solid #100101"
                      }} />
                      <label style={{
                                      marginTop: "10px",
                                      width: "60%",
                                      display: "inline-block",
                                      cursor: "pointer",
                                      backgroundColor: votes[pos.id] === cand.id ? "#007bff" : "#e0e0e0",
                                      color: votes[pos.id] === cand.id ? "#fff" : "#000",
                                      padding: "10px 15px",
                                      borderRadius: "5px",
                                      transition: "background-color 0.3s ease",
                                      fontWeight: "600",
                                      boxShadow: votes[pos.id] === cand.id ? "0 0 10px rgba(0, 123, 255, 0.4)" : "none",
                                      border: "1px solid #ccc",
                                      textAlign: "center"
                                    }}>
                                      <input
                                        type="radio"
                                        name={`position_${pos.id}`}
                                        value={cand.id}
                                        checked={votes[pos.id] === cand.id}
                                        onChange={() => handleVoteChange(pos.id, cand.id)}
                                        style={{ display: "none" }}
                                      />
                                      {cand.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" style={{
              display: "block", margin: "30px auto", padding: "12px 30px", fontSize: "16px",
              backgroundColor: "#1408eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer"
            }}>Submit Vote</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Vote;
