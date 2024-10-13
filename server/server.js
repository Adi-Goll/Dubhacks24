// import express from "express";
// import { exec } from "child_process";


// const app = express();

// app.listen(8080, () => {
//     console.log('server listening on port 8080')
// })

// // get parser info into here and then send it to the frontend

// // this function calls the parser and then retrieves the printed JSON obj from the stdout
// function runPythonScript() {
//     return new Promise((resolve, reject) => {
//       exec("python3 ./server/parser.py", (error, stdout, stderr) => {
//         if (error) {
//           console.error(`exec error: ${error}`);
//           reject(`Error: ${error.message}`);
//           return;
//         }
//         if (stderr) {
//           console.error(`stderr: ${stderr}`);
//           reject(`stderr: ${stderr}`);
//           return;
//         }
//         try {
//           const result = JSON.parse(stdout.trim());
//           resolve(result);
//         } catch (parseError) {
//           console.error(`Parse error: ${parseError}`);
//           reject(`Error parsing Python output: ${parseError}`);
//         }
//       });
//     });
//   }

//   let resp = await runPythonScript();
//   console.log(resp)

//   app.get('/patientParseInfo', async (req, res) => {
//     try {
//       const parseResponse = await runPythonScript();
//       res.json(parseResponse);
//     } catch (error) {
//       res.status(500).json({ error: `Server error: ${error}` });
//     }
//   });
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
const app = express();
const port = 3001;

// // Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());

// //`https://24saex3x6i.execute-api.us-west-2.amazonaws.com/dev/dey-test-bucket/${event.target.files[0].name}`
// // Upload file route
// app.post('/', (req, res) => {

//   console.log(req.body)
// });

// // File request route
// app.get('/file/:fileName', (req, res) => {
//   const fileName = req.params.fileName;

//   const params = {
//     Bucket: 'dey-test-bucket',
//     Key: `${fileName}.json`,
//   };

//   s3.getObject(params, (err, data) => {
//     if (err) {
//       console.log('Error retrieving file:', err);
//       res.status(500).send('Failed to retrieve file');
//     } else {
//       res.status(200).send(data.Body.toString('utf-8'));
//     }
//   });
// });

app.post('/file-send',(req,res) =>{
  const {fileName, data} = req.body;
  axios.put(`https://24saex3x6i.execute-api.us-west-2.amazonaws.com/dev/dey-test-bucket/${fileName}`, data)
  .then(function (response) {
    // handle success
    res.json({ message: `File ${fileName} sent successfully.`});
  })
})


app.post('/file-ask', (req,res) =>{
  const {fileName} = req.body;
  axios.get(`https://et307nrzq1.execute-api.us-west-2.amazonaws.com/dev/ehr-processed-s3/${fileName}.json`)
  .then(function (response) {
  // handle success
  res.json({data: response.data});
})
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});