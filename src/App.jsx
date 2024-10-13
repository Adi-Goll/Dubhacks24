import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null); // State to hold the selected file

  const readFileContent = (file) => {
    const reader = new FileReader(); // Create a new FileReader object

    // Event listener for when the file has been successfully read
    reader.onload = function (event) {
      const content = event.target.result; // The file content
      console.log('File content:', content); // Log the content
      setFileContent(content); // Save the content in the state
    };

    // Read the file as text (you can also read as ArrayBuffer, Binary, etc.)
    reader.readAsText(file);
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0] === null) {
      console.log('No file selected');
    }

    readFileContent(e.target.files[0])
    const formData = new FormData();
    formData.append('file', e.target.files[0]); // Append the file to FormData

    // Send the file to the backend via POST request
    axios.post('/patientParseInfo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Important for file uploads
      }
    })
    .then(function (response) {
      console.log('File uploaded successfully:', response.data);
    })
    .catch(function (error) {
      console.log('Error uploading file:', error);
    });
  };

  return (
    <div className="App">
      <h1>Upload Patient File</h1>
      
      {/* File input */}
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}

export default App
