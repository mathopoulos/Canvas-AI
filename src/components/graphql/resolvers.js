// Import the PostgreSQL connection pool
import pool from '../db/dbConnection.js';
 // Import the crypto module for generating unique IDs
import crypto from 'crypto';
// Import the shapesPromise function which fetches shape data from the database
import { shapesPromise } from '../db/queries.js';

// Define the root resolver for GraphQL. Resolvers define how the data for GraphQL queries and mutations is fetched.
const root = {
  // Fetch all shapes
  shapes: () => {
    return shapesPromise();
  },

  // Fetch all components
  components: () => {
    return shapesPromise();
  },

  // Fetch a specific component by its ID
  component: ({ id }) => {
    return pool.query('SELECT data FROM component_data WHERE data->>\'id\' = $1', [id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));
  },

  // Fetch inputs associated with a specific component
  inputsByComponent: ({ componentId }) => {
    return shapesPromise()
      .then(shapes => shapes.find(shape => shape.id === componentId).inputs)
      .catch(e => console.error(e.stack));
  },

  // Add a new component to the database
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

  // Update the name of an existing component by its ID
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

  // Delete a component by its ID
  deleteComponent: async ({ id }) => {
    try {
      const response = await pool.query('DELETE FROM component_data WHERE data->>\'id\' = $1', [id]);
      return response.rowCount > 0;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  },

  // Add a new input to a component in the database
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

  // Update an existing input's properties by its ID
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

  // Delete an input by its ID
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

  // Sync code operation, returns a status
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

// Export the root resolver to be used in the GraphQL server setup
export default root;
