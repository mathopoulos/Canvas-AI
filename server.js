import express from 'express';
import cheerio from 'cheerio';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import request from 'request';
import fs from "fs";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from "graphql";

console.log(graphqlHTTP);

const app = express();
app.use(bodyParser.json());


const schema = buildSchema(`
  type Query {
    shapes: [Input]
  }
  type Mutation {
    addInput(type: String!, width: Int!, height: Int!): Input
    updateInput(id: ID!, type: String!, width: Int!, height: Int!): Input
  }
  type Input {
    id: ID!
    type: String!
    width: Int!
    height: Int!
  }
`);

const shapesPromise = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./shapes.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const shapesData = JSON.parse(data);
          const shapes = shapesData.shapes || [];
          resolve(shapes);
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
  });
};

const root = {
  shapes: () => {
    return shapesPromise();
  },
  addInput: ({ type, width, height }) => {
    const newInput = {
      id: crypto.randomUUID(),
      type,
      width,
      height,
    };
    return shapesPromise().then(data => {
      const updatedShapes = [...data, newInput];
      const jsonData = JSON.stringify({ shapes: updatedShapes });
      fs.writeFile('./shapes.json', jsonData, 'utf8', (error) => {
        if (error) {
          console.log('Error Writing', error);
        } else {
          console.log('Written Successfully!');
        }
      });
      return newInput;
    });
  },
  updateInput: ({ id, type, width, height }) => {
    return shapesPromise().then(data => {
      const updatedShapes = data.map(shape => {
        if (shape.id === id) {
          return {
            ...shape,
            type,
            width,
            height,
          };
        }
        return shape;
      });
      const jsonData = JSON.stringify({ shapes: updatedShapes });
      fs.writeFile('./shapes.json', jsonData, 'utf8', (error) => {
        if (error) {
          console.log('Error Writing', error);
        } else {
          console.log('Written Successfully!');
        }
      });
      const updatedShape = updatedShapes.find(shape => shape.id === id);
      return updatedShape;
    });
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

const GITHUB_TOKEN = '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';
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