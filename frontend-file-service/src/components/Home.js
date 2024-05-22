import React, { useState } from 'react';
import './../index.css'; // Import your CSS file
import Navbar from './Navbar';
import UploadButton from './UploadButton';
function Home() {

  const [isFileUploaded, setIsFileUploaded] = useState(false);


  const handleFileSelect = (file) => {
    // Handle the selected file (e.g., upload to server, process, etc.)
    console.log('Selected file:', file);
    setTimeout(() => {
      // After the "upload" process, set the file uploaded state to true
      setIsFileUploaded(true);
    }, 1000); // Simulate a delay for file upload
  };


  return (
   <>
      <div className="bg-gray-500 min-h-screen"> 
        <Navbar/>
        <UploadButton onFileSelect={handleFileSelect} isFileUploaded={isFileUploaded}/>
      </div>
   </>
  );
}

export default Home;
