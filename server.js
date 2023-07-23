// Import necassary modules
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import request from 'request';
import fs from "fs";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";
import cors from 'cors'; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import syncCode from './syncCode.js'; // Custom module to synchronize code
import pg from 'pg';// PostgreSQL client for Node.js
import schema from './src/components/graphql/schema.js';
import root from './src/components/graphql/resolvers.js';
import pool from './src/components/db/dbConnection.js'; 

// Destructure Pool from pg for creating a connection pool
const { Pool } = pg;

// Initialize Express app
const app = express();

// Set up middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for a specific origin
app.use(cors({
  origin: 'https://canvas-v-3-alexandrosmatho.replit.app' 
}));

// Function to write HTML content to a file
function writeHtmlToFile(body) {
  fs.writeFile(__dirname + '/public/output.html', body, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('HTML written to file');
  });
}

// Github webook cofigurations
const GITHUB_TOKEN = '';
const WEBHOOK_SECRET = 'nienatail39849u;2etina';

// Webhook endpoint for Github integration
app.post('/webhook', (req, res, next) => {
    const signature = req.headers['x-hub-signature'];
    const event = req.headers['x-github-event'];

    // Verify the signature of the webhook payload
    const hmac = crypto.createHmac('sha1', WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);
    const digest = 'sha1=' + hmac.update(payload).digest('hex');
    if (signature !== digest) {
        console.error('Invalid signature');
        return res.sendStatus(400);
    }

    // Check if the webhook event is a "push" event and if the file we're monitoring was changed
    if (event === 'push' && req.body.commits.some(commit => commit.modified.includes('index.html'))) {
        // Retrieve the latest commit that changed the file
        const commit = req.body.commits.find(commit => commit.modified.includes('index.html'));

        // Retrieve the contents of the file at the commit
        const options = {
            url: `https://api.github.com/repos/mathopoulos/canvas_data/contents/index.html?ref=${commit.id}`,
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'User-Agent': 'request',
                'Accept': 'application/vnd.github.v3.raw'
            }
        };

        request(options, (err, response, body) => {
            if (err) {
                return next(err);  // Pass the error to the error handler
            }
            if (response.statusCode !== 200) {
                console.error(`Failed to retrieve file contents: ${response.statusMessage}`);
                return res.sendStatus(500);
            }
            res.setHeader('Content-Type', 'text/html');
            res.send(body);
            writeHtmlToFile(body);
        });
    } else {
        res.sendStatus(200);
        console.log("success");
    }
});

// Set up GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace to the console

    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

// Start the server and listen on port 4000
app.listen(4000, () => {
  console.log("Running a GraphQL API server at https://canvas-v3.alexandrosmatho.repl.co/graphql");
});
