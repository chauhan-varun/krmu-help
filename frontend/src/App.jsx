import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Form from './pages/Form';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
