import express from "express";
import { exec } from "child_process";


const app = express();

app.listen(8080, () => {
    console.log('server listening on port 8080')
})

// DOESN'T WORK YET

// get parser info into here and then send it to the frontend

// this function calls the parser and then retrieves the printed JSON obj from the stdout
function runPythonScript() {
    return new Promise((resolve, reject) => {
      exec("python3 parser.py", (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(`stderr: ${stderr}`);
          return;
        }
        try {
          const result = JSON.parse(stdout.trim());
          resolve(result);
        } catch (parseError) {
          console.error(`Parse error: ${parseError}`);
          reject(`Error parsing Python output: ${parseError}`);
        }
      });
    });
  }

  runPythonScript();

  app.get('/patientParseInfo', async (req, res) => {
    try {
      const parseResponse = await runPythonScript();
      res.json(parseResponse);
    } catch (error) {
      res.status(500).json({ error: `Server error: ${error}` });
    }
  });
