import React, { useState, ChangeEvent, FormEvent } from 'react';
import "../src/App.css";

const ExcelUploader: React.FC = () => {
  const [mongoUri, setMongoUri] = useState<string>('');
  const [message, setMessage] = useState<string>('');

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
      <form className='container' onSubmit={handleSubmit}>
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
          Enter Message:
          <input
            type="text"
            style={{ height: '50px', width: '500px' }}
            value={message}
            onChange={handleMessageChange}
            placeholder="Your message"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExcelUploader;
