import React, { useState } from 'react';
import './../index.css'; // Import your CSS file
import Navbar from './Navbar';
import UploadButton from './UploadButton';
import axios from 'axios';

function Home() {

  const [isFileUploaded, setIsFileUploaded] = useState(false);


  const handleFileSelect = async (event) => {
    // Handle the selected file (e.g., upload to server, process, etc.)
    const file = event.target.files[0];
    console.log('Selected file:', file);

      // After the "upload" process, set the file uploaded state to true
      setIsFileUploaded(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:4100/file-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setIsFileUploaded(true);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
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
