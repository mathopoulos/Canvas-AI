import pool from './dbConnection.js';

// Function to fetch shape data from the database
const shapesPromise = () => {
  return pool.query('SELECT data FROM component_data')
    .then(res => res.rows.map(row => row.data))
    .catch(e => console.error(e.stack));
};

export { shapesPromise };
