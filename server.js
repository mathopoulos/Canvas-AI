import http from 'http';
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix';
import { schema } from './src/components/graphql/schema.js';
import { root } from './src/components/graphql/resolvers.js';


function receiveJSON(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Function to set CORS headers
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}


const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  console.log(url);
   setCORSHeaders(res); // Set the CORS headers for every response

  if (req.method === 'OPTIONS') {
    // CORS preflight request handling
    res.writeHead(204);
    res.end();
    return;
  }
  // Only intercept requests to the /graphql endpoint
  if (url.pathname === '/graphql') {
    // Check if the request is for the GraphiQL interface or a GraphQL query
    if (shouldRenderGraphiQL(req)) {
      // Return the interface
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderGraphiQL({}));
    } else {
      // Process the POST GraphQL query
      const request = {
        body: req.method === 'POST' ? await receiveJSON(req) : undefined,
        headers: req.headers,
        method: req.method,
        query: url.searchParams
      };

      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        rootValue: root
      });

      sendResult(result, res);
    }
  } else {
    // Serve static files or other routes
  }
});



let listener = server.listen(); 
console.log(`Server is running on http://localhost:${listener.address().port}/graphql`);