// Importing the connection pool from 'dbConnection.js' to interact with the database
import pool from './dbConnection.js';

// Function to fetch shape data from the database
const shapesPromise = () => {
  return pool.query('SELECT data FROM component_data')
    .then(res => {
        console.log(res.rows); // Logging the complete data
        return res.rows.map(row => row.data)
    })
    .catch(e => console.error(e.stack));
};


// Exporting the shapesPromise function so it can be used elsewhere in the application
export { shapesPromise };
