// Importing the connection pool from 'dbConnection.js' to interact with the database
import pool from './dbConnection.js';

// Function to fetch shape data from the database
const shapesPromise = () => {
  // Using the pool to query the database
  return pool.query('SELECT data FROM component_data')
    .then(res => res.rows.map(row => row.data)) // Mapping over the result rows to extract the 'data' from each row
    .catch(e => console.error(e.stack));
};

// Exporting the shapesPromise function so it can be used elsewhere in the application
export { shapesPromise };
