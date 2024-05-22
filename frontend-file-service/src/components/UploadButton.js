import React from 'react';

const UploadButton = ({ onFileSelect,isFileUploaded }) => {
  console.log("isFileUploaded",isFileUploaded)
  const handleFileSelect = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      onFileSelect(file); // Pass the selected file to the parent component
    }
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
       {isFileUploaded && 
       <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-lg p-8 text-center">
        <p className="text-white text-lg font-semibold mb-4">Click below to download your file.</p>
        <button className="bg-black text-white py-2 px-4 rounded">
            Download File
          </button>
      </div>
    </div>
    }
    </>
  );
};

export default UploadButton;