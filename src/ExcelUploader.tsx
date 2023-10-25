// ExcelUploader.tsx

// delete@git-repo  /c/remove/repository (main-branch)
// $ rm -fr .git

import React, { useState } from 'react';
import axios from 'axios';

const ExcelUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mongoURI, setMongoURI] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleMongoURIChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMongoURI(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file || !mongoURI) return;

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await axios.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Data saved to MongoDB');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data to MongoDB');
    }
  };

  return (
    <div>
      <h1>Excel to MongoDB Uploader</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      
      <br />
      <br/>

      <textarea
        style={{ width: '500px' }}
        placeholder="MongoDB URI"
        value={mongoURI}
        onChange={handleMongoURIChange}
      />

      <br />

      <button onClick={handleSubmit}>Upload and Save to MongoDB</button>
    </div>
  );
};

export default ExcelUploader;
