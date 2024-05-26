import React from 'react';
import axios from 'axios';

const UploadButton = ({ onFileSelect,isFileUploaded }) => {

  
  const downloadFile = async () => { 
    const response = await axios.get(`http://localhost:4100/download/${isFileUploaded}`, {
      responseType: 'blob', // Important to handle binary data
    });
    console.log(response)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${isFileUploaded}`); 

    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
  }

  const handleFileSelect = (e) => {
    if (e) {
      onFileSelect(e); // Pass the selected file to the parent component
    }
  };

  const copyLink = () => {
    const link = `http://localhost:3000/${isFileUploaded}`;
    navigator.clipboard.writeText(link)
        .then(() => {
            console.log('Link copied to clipboard');
            alert('Link copied to clipboard');
        })
        .catch((error) => {
            console.error('Failed to copy link:', error);
        });
};
  return (
    <>
    {!isFileUploaded && 
       <div className="flex justify-center items-center min-h-screen">
      <div className="border-dashed border-2 border-gray-400 rounded-lg p-8 text-center">
        <p className="text-white text-lg font-semibold mb-4">Upload your file here</p>
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Upload File
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={onFileSelect}
          />
        </label>
      </div>
    </div>
    }
      {isFileUploaded && (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="rounded-lg p-8 text-center">
                        <p className="text-white text-lg font-semibold mb-4">Your file is ready.</p>
                        <button className="bg-black text-white py-2 px-4 rounded mr-2" onClick={downloadFile}>
                            Download File
                        </button>
                        <button className="bg-black text-white py-2 px-4 rounded" onClick={copyLink}>
                            Copy Link
                        </button>
                    </div>
                </div>
            )}
    </>
  );
};

export default UploadButton;