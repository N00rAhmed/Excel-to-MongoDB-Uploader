import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import "../src/App.css";
import * as XLSX from 'xlsx';

const ExcelUploader: React.FC = () => {
  const [mongoUri, setMongoUri] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState('');

  const [excelData, setExcelData] = useState(null);


  const readUploadFile = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const data = e.target.result;
            setExcelData(data); // store the file data in state

            // const workbook = XLSX.read(data, { type: "array" });
            // const sheetName = workbook.SheetNames[0];
            // const worksheet = workbook.Sheets[sheetName];
            // const json = XLSX.utils.sheet_to_json(worksheet);
            // console.log(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}

  const handleConvertExcelFile = () => {
    if (excelData) {
      const workbook = XLSX.read(excelData, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      console.log(json);
    }
    else{
      console.error('No file data available');
    }
  };

  


  const handleUriChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMongoUri(event.target.value);
  };

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mongoUri, excelData }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* onSubmit={handleSubmit} */}
      <form className='container' onSubmit={handleSubmit} >
        <label>
          Enter MongoDB URI:
          
          <input
            type="text"
            style={{ height: '50px', width: '500px' }}
            value={mongoUri}
            onChange={handleUriChange}
            placeholder="mongodb://username:password@host:port/database"
          />
        </label>

<label htmlFor="upload">Upload File</label>
    <input
        type="file"
        name="upload"
        id="upload"
        onChange={readUploadFile}
    />


        {/* <button type="submit">Submit</button> */}
        <button onClick={handleConvertExcelFile}>Convert/Send</button>

      </form>
    </div>
  );
};

export default ExcelUploader;
