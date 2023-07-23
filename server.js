// Import necassary modules
import express from 'express';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import request from 'request';
import fs from "fs";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";
import cors from 'cors'; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import syncCode from './syncCode.js'; // Custom module to synchronize code
import pg from 'pg';// PostgreSQL client for Node.js

// Destructure Pool from pg for creating a connection pool
const { Pool } = pg;

// Set up PostgreSQL connection pool with environment variables and other configurations
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

// Initialize Express app
const app = express();

// Set up middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for a specific origin
app.use(cors({
  origin: 'https://canvas-v-3-alexandrosmatho.replit.app' 
}));

// Define GraphQL schema
const schema = buildSchema(`
  type Query {
    shapes: [Input]
    components: [Component]
    component(id: ID!): Component
    inputsByComponent(componentId: ID!): [Input]
  }
type Mutation {
    addComponent(name: String!): Component
    deleteComponent(id: ID!): Boolean
    updateComponent(id: ID!, name: String!): Component
    addInput(parentId: ID!, type: String!, width: Int!, height: Int!, x: Int!, y: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, placeholderText: String!, borderSides: BorderSidesInput, name: String!): Input
    updateInput(id: ID!, type: String, width: Int, height: Int, x: Int, y: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, borderSides: BorderSidesInput, name: String): Input
    deleteInput(id: ID!): Boolean
    syncCode: Status
  }

  type Component {
    id: ID!
    name: String!
    inputs: [Input]
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

// Function to fetch shape data from the database
const shapesPromise = () => {
  return pool.query('SELECT data FROM component_data')
    .then(res => res.rows.map(row => row.data))
    .catch(e => console.error(e.stack));
};

// Define root resolver for GraphQL
const root = {
  shapes: () => {
    return shapesPromise();
  },
  components: () => {
    return shapesPromise();
  },
  component: ({ id }) => {
    return pool.query('SELECT data FROM component_data WHERE data->>\'id\' = $1', [id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));
  },
  inputsByComponent: ({ componentId }) => {
    return shapesPromise()
      .then(shapes => shapes.find(shape => shape.id === componentId).inputs)
      .catch(e => console.error(e.stack));
  },
  addComponent: ({ name }) => {
    const newComponent = {
      id: crypto.randomUUID(),
      name,
      inputs: [],
    };
    return pool.query('INSERT INTO component_data(data) VALUES($1) RETURNING data', [newComponent])
      .then(res => res.rows[0].data)
      .catch(e => console.error(e.stack));
  },
  updateComponent: async ({ id, name }) => {
    try {
      const response = await pool.query(
        'UPDATE component_data SET data = jsonb_set(data, $1, $2) WHERE data->>\'id\' = $3 RETURNING data',
        ['{name}', JSON.stringify(name), id]
      );
      return response.rows[0].data;
    } catch (error) {
      console.error('Error updating component:', error);
      return null;
    }
  },


  deleteComponent: async ({ id }) => {
    try {
      const response = await pool.query('DELETE FROM component_data WHERE data->>\'id\' = $1', [id]);
      return response.rowCount > 0;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  },
  addInput: ({ parentId, type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, borderSides, name }) => {
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

    return pool.query(
      'UPDATE component_data SET data = jsonb_insert(data, \'{inputs,-1}\', $1::jsonb) WHERE data->>\'id\' = $2 RETURNING data',
      [JSON.stringify(newInput), parentId]
    )
      .then(res => res.rows[0].data)
      .catch(e => console.error(e.stack));
  },


  updateInput: async ({ id, ...updates }) => {
    // Get the component that contains the input
    const component = await pool.query(
      'SELECT data FROM component_data WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(data->\'inputs\') element WHERE element->>\'id\' = $1)',
      [id]
    );

    // If no component is found, return null
    if (component.rowCount === 0) {
      return null;
    }

    // Make a copy of the component's data
    const updatedComponent = { ...component.rows[0].data };

    // Find the input to be updated and apply the updates
    updatedComponent.inputs = updatedComponent.inputs.map(input => input.id === id ? { ...input, ...updates } : input);

    // Update the component data in the database
    const updated = await pool.query(
      'UPDATE component_data SET data = $1 WHERE data->>\'id\' = $2 RETURNING data',
      [JSON.stringify(updatedComponent), updatedComponent.id]
    );

    return updated.rows[0].data;
  },
  deleteInput: async ({ id }) => {
    // Find the component that contains the input with the given ID
    const component = await pool.query(
      'SELECT data FROM component_data WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(data->\'inputs\') element WHERE element->>\'id\' = $1)',
      [id]
    );

    // If no component is found, return false
    if (component.rowCount === 0) {
      return false;
    }

    // Make a copy of the component's data
    const updatedComponent = { ...component.rows[0].data };

    // Filter out the input with the specified ID
    updatedComponent.inputs = updatedComponent.inputs.filter(input => input.id !== id);

    // Update the component data in the database
    await pool.query(
      'UPDATE component_data SET data = $1 WHERE data->>\'id\' = $2',
      [JSON.stringify(updatedComponent), updatedComponent.id]
    );

    return true;
  },


  syncCode: () => {
    if (syncCode()) {
      return {
        status: 'success',
        message: 'Synced successfully'
      }

    } else {
      return 'Sync failed'
    };
  },
};

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

// Set up GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server and listen on port 4000
app.listen(4000, () => {
  console.log("Running a GraphQL API server at https://canvas-v3.alexandrosmatho.repl.co/graphql");
});
