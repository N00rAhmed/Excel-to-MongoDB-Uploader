import React, { useState } from 'react';
import axios from 'axios';

const ExcelUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mongoURI, setMongoURI] = useState('');
  const [collectionName, setCollectionName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleMongoURIChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMongoURI(e.target.value);
  };

  const handleCollectionNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCollectionName(e.target.value);
  };
  
  // mongodb+srv://tronn232003:ow3bcTm8yahnrrBF@cluster0.mceoov1.mongodb.net/?retryWrites=true&w=majority

  const handleSubmit = async () => {
    if (!file || !mongoURI || !collectionName) return;

    const formData = new FormData();
    formData.append('excelFile', file);
    formData.append('mongoURI', mongoURI);
    formData.append('collectionName', collectionName);
    
    try {
      const response = await axios.post("http://localhost:4000/api/upload", formData, {
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
  }
  return (
    <div>
      <h1>Excel to MongoDB Uploader</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      
      <br />
      <br/>

      <textarea
        // type="text"
        style={{ width: '500px' }}
        placeholder="MongoDB URI"
        value={mongoURI}
        onChange={handleMongoURIChange}
      />

      <br />

      <textarea
        // type="text"
        // style={{ width: '500px' }}
        placeholder="Collection Name"
        value={collectionName}
        onChange={handleCollectionNameChange}
      />

      <br />

      <button onClick={handleSubmit}>Upload and Save to MongoDB</button>
    </div>
  );
};

export default ExcelUploader;
