import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import './App.css';
import axios from 'axios';



const App = () => {
  const [file, setFile] = useState(null);
  const [fileRequest, setFileRequest] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Capture the file object right away
    setFile(file);
  
    if (file) {
      const reader = new FileReader();
      
      // Set up the onload event
      reader.onload = function (readerEvent) {
        const content = readerEvent.target.result; // File content
        console.log(content); // You should see the file's content in the console
  
        // Make the axios request after reading the file content
        axios
          .post('http://localhost:3001/', { fileName: file.name, data: content }) // Use file.name here
          .then(function (response) {
            // Handle success
            console.log(response);
          })
          .catch(function (error) {
            // Handle error
            console.log(error);
          });
      };
  
      // Read the file as text
      reader.readAsText(file);
    }
  };

  const handleFileRequest = () => {
    console.log('File requested:', fileRequest);

    setIsDialogOpen(false);
    axios.post("http://localhost:3001/file-ask",{fileName: fileRequest})
    .then(function (response) {
      // handle success
      alert(JSON.stringify(response.data.data, null, 2))
      console.log(response.data.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  };



  return (
    <div className="medical-platform">
      <div className="container">
        <h1>Medical File Platform</h1>
        
        <div className="button-group">
          <label htmlFor="file-upload" className="button">
            <Upload size={20} className="button-icon" />
            <span>Upload File</span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
          
          <button 
            className="button"
            onClick={() => setIsDialogOpen(true)}
          >
            <FileText size={20} className="button-icon" />
            <span>Request File</span>
          </button>
        </div>

        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h2>Request File</h2>
              <input
                type="text"
                value={fileRequest}
                onChange={(e) => setFileRequest(e.target.value)}
                placeholder="Enter file name"
                className="dialog-input"
              />
              <div className="dialog-buttons">
                <button 
                  className="button"
                  onClick={handleFileRequest}
                >
                  Submit
                </button>
                <button 
                  className="button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;