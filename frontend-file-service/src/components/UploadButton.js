import React from 'react';

const UploadButton = ({ onFileSelect }) => {
  const handleFileSelect = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      onFileSelect(file); // Pass the selected file to the parent component
    }
  };

  return (
    <>
       <div className="flex justify-center items-center min-h-screen">
      <div className="border-dashed border-2 border-gray-400 rounded-lg p-8 text-center">
        <p className="text-white text-lg font-semibold mb-4">Upload your files here</p>
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
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
    </>
  );
};

export default UploadButton;