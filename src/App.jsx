import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import './App.css';
import axios from 'axios';



const App = () => {
  const [file, setFile] = useState(null);
  const [fileRequest, setFileRequest] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function (readerEvent) {
        const content = readerEvent.target.result; 
  
        // Make the axios request after reading the file content
        axios
          .post('http://localhost:3001/file-send', { fileName: file.name, data: content }) // Use file.name here
          .then(function (response) {
            // Handle success

            console.log(response);
          })
          .catch(function (error) {
            // Handle error
            console.log(error);
          });
      };
      setShowThankYouMessage(true); // Show the thank-you message

      // Hide the message after 3 seconds
      setTimeout(() => {
        setShowThankYouMessage(false);
      }, 3000);
      // Read the file as text
      reader.readAsText(file);
    }
  };
  const renderData = (data) => {
    return Object.keys(data).map((key) => {
      const value = data[key];
  
      if (value === null) {
        return (
          <div className="data-section" key={key}>
            <strong>{key}:</strong> <span className="no-data">No Data Available</span>
          </div>
        );
      }
  
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return (
            <div className="data-section" key={key}>
              <strong>{key}:</strong> <span className="no-data">No Records Found</span>
            </div>
          );
        } else {
          return (
            <div className="data-section" key={key}>
              <strong>{key}:</strong> <span className="array-values">{value.join(', ')}</span>
            </div>
          );
        }
      }
  
      if (typeof value === 'object') {
        return (
          <div className="data-section" key={key}>
            <strong>{key}:</strong>
            <div className="subsection">
              {renderData(value)} {/* Recursively render nested objects */}
            </div>
          </div>
        );
      }
  
      return (
        <div className="data-section" key={key}>
          <strong>{key}:</strong> <span>{value.toString()}</span>
        </div>
      );
    });
  };
  


  const handleFileRequest = () => {
    console.log('File requested:', fileRequest);

    setIsDialogOpen(false);
    axios.post("http://localhost:3001/file-ask",{fileName: fileRequest})
    .then(function (response) {
      // handle success
      setApiData(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  };



  return (
    <div className="medical-platform">
      <div className="container">
        <h1>MedRelay</h1>
        {showThankYouMessage && (
          <div className="upload-message success">Thank you for submitting!</div> // Thank-you message
        )}
        
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
              <div className="dialog-input-wrapper">
              <input
                type="text"
                value={fileRequest}
                onChange={(e) => setFileRequest(e.target.value)}
                placeholder="Enter file name"
                className="dialog-input"
              />
              </div>
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
        {apiData ? renderData(apiData) : ''}
      </div>
    </div>
  );
};

export default App;