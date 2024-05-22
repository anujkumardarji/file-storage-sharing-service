import React from 'react';
import './index.css'; // Import your CSS file
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
function App() {
  
  return (
   <>
      <div className="bg-gray-500 min-h-screen"> 
        <Router>
        <Routes>
          <Route exact path="/" element ={<Home />} />
        </Routes>
      </Router>
      </div>
   </>
  );
}

export default App;
