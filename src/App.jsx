import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Vote from './pages/Vote';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from "./pages/AdminDashboard";
import AdminElections from "./pages/AdminElections";
import AdminElectionDetail from "./pages/AdminElectionDetail";
import CreateElection from "./pages/CreateElection";
import AddPosition from "./pages/AddPosition";
import AddCandidate from "./pages/AddCandidate";
import ElectionResults from "./pages/ElectionResults";
import AdminVoters from "./pages/AdminVoters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/elections" element={<AdminElections />} />
        <Route path="/admin/elections/new" element={<CreateElection />} />
        <Route path="/admin/elections/:id" element={<AdminElectionDetail />} />
        <Route path="/admin/elections/:id/edit" element={<CreateElection editMode />} />
        <Route path="/admin/elections/:id/positions/new" element={<AddPosition />} />
        <Route path="/admin/elections/:id/candidates/new" element={<AddCandidate />} />
        <Route path="/admin/elections/:id/results" element={<ElectionResults />} />
        <Route path="/admin/voters" element={<AdminVoters />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;