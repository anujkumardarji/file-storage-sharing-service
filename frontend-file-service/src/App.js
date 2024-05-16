import React from 'react';
import './index.css'; // Import your CSS file
import Navbar from './components/Navbar';
import UploadButton from './components/UploadButton';
function App() {
  const handleFileSelect = (file) => {
    // Handle the selected file (e.g., upload to server, process, etc.)
    console.log('Selected file:', file);
  };


  return (
   <>
      <div className="bg-gray-500 min-h-screen"> 
        <Navbar/>
        <UploadButton onFileSelect={handleFileSelect} />
      </div>
   </>
  );
}

export default App;
