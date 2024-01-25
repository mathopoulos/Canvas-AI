import http from 'http';
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix';
import { schema } from './src/components/graphql/schema.js';
import { root } from './src/components/graphql/resolvers.js';

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/graphql') {
    if (shouldRenderGraphiQL(req)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderGraphiQL({}));
    } else {
      const request = {
        body: req.method === 'POST' ? await receiveJSON(req) : undefined,
        headers: req.headers,
        method: req.method,
        query: url.searchParams,
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
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

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

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
