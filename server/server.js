// get parser info into here and then send it to the frontend

// PRE CLOUD INTEGRATION: this function calls the parser and then retrieves the printed JSON obj from the stdout
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


// avoiding errors, enabling CORS and requests specifically from the loalhost the frontend runs on
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());


// if frontend sends a post request to ./file-send send a put request to AWS API Gateway with file name and the file data
app.post('/file-send',(req,res) =>{
  const {fileName, data} = req.body;
  axios.put(`https://24saex3x6i.execute-api.us-west-2.amazonaws.com/dev/dey-test-bucket/${fileName}`, data)
  .then(function (response) {
    // handle success
    res.json({ message: `File ${fileName} sent successfully.`});
  })
})


// frontend post request to ./file-ask then send get request to s3 bucket to ask for file info.
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