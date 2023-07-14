import express from 'express';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import request from 'request';
import fs from "fs";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";
import cors from 'cors'; // <-- Import CORS module here
import syncCode from './syncCode.js';
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'neon',
  host: process.env['PGHOST'],
  database: 'neondb',
  password: process.env['PGPASSWORD'],
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});


const app = express();
app.use(bodyParser.json());

// <-- Use CORS middleware here
app.use(cors({
  origin: 'https://canvas-v-3-alexandrosmatho.replit.app' // only allow this origin
}));


const schema = buildSchema(`
  type Query {
    shapes: [Input]
  }
type Mutation {
    addInput(type: String!, width: Int!, height: Int!, x: Int!, y: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, placeholderText: String!, borderSides: BorderSidesInput, name: String!): Input
    updateInput(id: ID!, type: String, width: Int, height: Int, x: Int, y: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, borderSides: BorderSidesInput, name: String): Input
    deleteInput(id: ID!): Boolean
    syncCode: Status
  }

  

  type Status {
    status: String!
    message: String
  }
  
  type BorderSides {
    top: Boolean!
    right: Boolean!
    bottom: Boolean!
    left: Boolean!
  }

    input BorderSidesInput {
    top: Boolean!
    right: Boolean!
    bottom: Boolean!
    left: Boolean!
  }
  
  type Input {
    id: ID!
    type: String
    width: Int!
    height: Int!
    x: Int!
    y: Int!
    borderRadius: Int!
    strokeWidth: Int!
    strokeColor: String!
    fillStyleColor: String!
    placeholderText: String!
    borderSides: BorderSides
    name: String!
  }
`);

const shapesPromise = () => {
  return pool.query('SELECT data FROM shape_data')
    .then(res => res.rows.map(row => row.data))
    .catch(e => console.error(e.stack));
};


const root = {
  shapes: () => {
    return shapesPromise();
  },
addInput: ({ type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, borderSides, name }) => {
  const newInput = {
    id: crypto.randomUUID(),
    type,
    width,
    height,
    x, 
    y, 
    borderRadius,
    strokeWidth,
    strokeColor,
    fillStyleColor,
    placeholderText,
    borderSides,
    name, 
  };
  return pool.query('INSERT INTO shape_data(data) VALUES($1) RETURNING data', [newInput])
    .then(res => res.rows[0].data)
    .catch(e => console.error(e.stack));
},

updateInput: ({ id, ...updates }) => {
  return pool.query('UPDATE shape_data SET data = data || $1 WHERE data->>\'id\' = $2 RETURNING data', [updates, id])
    .then(res => res.rows[0].data)
    .catch(e => console.error(e.stack));
},

deleteInput: ({ id }) => {
  return pool.query('DELETE FROM shape_data WHERE data->>\'id\' = $1', [id])
    .then(res => true)
    .catch(e => {
      console.error(e.stack);
      return false;
    });
},

syncCode: () => {
    if(syncCode()) {
      return {
        status: 'success',
        message: 'Synced successfully'
      }
    
    } else {
      return 'Sync failed'
  };
},
};


function writeHtmlToFile(body) {
  fs.writeFile(__dirname + '/public/output.html', body, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('HTML written to file');
  });
}

const GITHUB_TOKEN = '';
const WEBHOOK_SECRET = 'nienatail39849u;2etina';

app.post('/webhook', (req, res) => {
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
        console.error(err);
        return res.sendStatus(500);
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

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at https://canvas-v3.alexandrosmatho.repl.co/graphql");
});

// Pass the variable to the frontend component using res.locals
//app.use((req, res, next) => {
//  res.locals.myToken = myToken;
//  next();
//});