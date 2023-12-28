import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import "../src/App.css";
import * as XLSX from 'xlsx';

const ExcelUploader: React.FC = () => {
  const [mongoUri, setMongoUri] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState('');

  const handleConvert = () => {
    //     e.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target!.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(JSON.stringify(json, null, 2)); // Update jsonData state
      };
      reader.readAsBinaryString(file);
      }
  };
  
  useEffect(() => {
    console.log(jsonData); // This will log the updated state whenever jsonData changes
  }, [jsonData]);
    

  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log(jsonData);

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
        body: JSON.stringify({ mongoUri, message }),
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
      <form className='container' >
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
        <label>
          Enter File:
          {/* <input
            type="text"
            style={{ height: '50px', width: '500px' }}
            value={message}
            onChange={handleMessageChange}
            placeholder="Your message"
          /> */}
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
      />

        </label>


        {/* <label>
          Enter Message:
          <input
            type="file"
            style={{ height: '50px', width: '500px' }}
            value={message}
            onChange={handleMessageChange}
            placeholder="Your message"
          />
        </label>
 */}


        {/* <button type="submit">Submit</button> */}
        <button onClick={handleConvert}>Convert</button>
        <pre>{jsonData}</pre>

      </form>
    </div>
  );
};

export default ExcelUploader;
