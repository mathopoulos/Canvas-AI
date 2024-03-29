// Import the PostgreSQL connection pool
import pool from '../db/dbConnection.js';
// Import the crypto module for generating unique IDs
import crypto from 'crypto';
// Import the shapesPromise function which fetches shape data from the database
import { shapesPromise } from '../db/queries.js';

// Define the root resolver for GraphQL. Resolvers define how the data for GraphQL queries and mutations is fetched.
export const root = {
  // Fetch all shapes
  shapes: () => {
    return shapesPromise();
  },

  // Fetch all components
  components: () => {
    return shapesPromise();
  },

// Fetch all groups
groupsByComponent: ({ componentId }) => {
  // You should filter by the 'parentId' field in your data
  return pool.query('SELECT data FROM group_data WHERE data @> $1::jsonb', [JSON.stringify({ parentId: componentId })])
    .then(res => res.rows.length > 0 ? res.rows.map(row => row.data) : [])
    .catch(e => console.error(e.stack));
},

  // Fetch a specific canvas by its ID
  canvas: ({ id }) => {
    return pool.query('SELECT data FROM canvas_data WHERE data->>\'id\' = $1', [id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));
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

  // Fetch inputs associated with a specific component
  buttonsByComponent: ({ componentId }) => {
    return shapesPromise()
      .then(shapes => {
        const shape = shapes.find(shape => shape.id === componentId);
        if (!shape) {
          console.error(`No shape found with id: ${componentId}`);
          return null; // Or however you want to handle this case
        }
        return shape.buttons;
      })
      .catch(e => console.error(e.stack));
  },

  // Fetch inputs associated with a specific component
  textsByComponent: ({ componentId }) => {
    return shapesPromise()
      .then(shapes => {
        const shape = shapes.find(shape => shape.id === componentId);
        if (!shape) {
          console.error(`No shape found with id: ${componentId}`);
          return null; // Or however you want to handle this case
        }
        return shape.texts;
      })
      .catch(e => console.error(e.stack));
  },

  // Add a new component to the database
  addCanvas: ({ name, height, width, top, left }) => {
    const newCanvas = {
      id: crypto.randomUUID(),
      name,
      height,
      width,
      top,
      left,
    };
    return pool.query('INSERT INTO canvas_data(data) VALUES($1) RETURNING data', [newCanvas])
      .then(res => res.rows[0].data)
      .catch(e => console.error(e.stack));
  },

  // Add a new component to the database
  addGroup: ({ parentId, name, height, width, x, y, type, borderRadius, align }) => {
    const newGroup = {
      id: crypto.randomUUID(),
      name,
      height,
      width,
      x,
      y,
      type,
      borderRadius,
      parentId, 
      align
    };
    return pool.query('INSERT INTO group_data(data) VALUES($1) RETURNING data', [newGroup])
      .then(res => res.rows[0].data)
      .catch(e => console.error(e.stack));
  },

  // Update existing canvas  by its ID
  updateCanvas: async ({ id, ...updates }) => {
    const canvas = await pool.query('SELECT data FROM canvas_data WHERE data->>\'id\' = $1', [id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));
    if (!canvas) {
      console.error(`No canvas found with id: ${id}`);
      return null;
    }
    const newCanvas = { ...canvas, ...updates };
    return pool.query('UPDATE canvas_data SET data = $1 WHERE data->>\'id\' = $2', [newCanvas, id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));

  },

  // Update group
  updateGroup: async ({ id, ...updates }) => {
    const canvas = await pool.query('SELECT data FROM group_data WHERE data->>\'id\' = $1', [id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));
    if (!canvas) {
      console.error(`No group found with id: ${id}`);
      return null;
    }
    const newGroup = { ...group, ...updates };
    return pool.query('UPDATE group_data SET data = $1 WHERE data->>\'id\' = $2', [newGroup, id])
      .then(res => res.rows.length > 0 ? res.rows[0].data : null)
      .catch(e => console.error(e.stack));

  },  

  // Add a new component to the database
  addComponent: ({ name }) => {
    const newComponent = {
      id: crypto.randomUUID(),
      name,
      inputs: [],
      buttons: [],
      texts: [],
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
  addInput: ({ id, parentId, type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, placeholderTextFont, placeholderTextFillStyle, placeholderTextSize, borderSides, name, group }) => {
    const newInput = {
      id,
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
      placeholderTextFont,
      placeholderTextFillStyle,
      placeholderTextSize,
      borderSides,
      name,
      group,
    };

    return pool.query(
      'UPDATE component_data SET data = jsonb_insert(data, \'{inputs,-1}\', $1::jsonb) WHERE data->>\'id\' = $2 RETURNING data',
      [JSON.stringify(newInput), parentId]
    )
      .then(res => res.rows[0].data)
      .catch(e => console.error(e.stack));
  },

  // Add a new button to a component in the database
  addButton: ({ parentId, type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, borderSides, name, group }) => {
    const newButton = {
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
      group,
    };

    return pool.query(
      'UPDATE component_data SET data = jsonb_insert(data, \'{buttons,-1}\', $1::jsonb) WHERE data->>\'id\' = $2 RETURNING data',
      [JSON.stringify(newButton), parentId]
    )
      .then(res => {
        if (res && res.rows && res.rows.length > 0) {
          const updatedData = res.rows[0].data;
          if (updatedData.buttons && updatedData.buttons.length) {
            return updatedData.buttons[updatedData.buttons.length - 1]; // Returns the last button which is the newly added one.
          } else {
            console.error('No buttons found or buttons array is empty:', updatedData);
            return null; // This might not be ideal; you could throw an error or handle it differently.
          }
        } else {
          console.error('Unexpected database response:', res);
          return null;
        }
      })
      .catch(e => {
        console.error(e.stack);
        throw new Error('Database error');
      });
  },

  // Add a new button to a component in the database
  addText: ({ parentId, type, width, height, x, y, placeholderText, placeholderTextFont, placeholderTextFillStyle, placeholderTextSize, name, group }) => {
    const newText = {
      id: crypto.randomUUID(),
      type,
      width,
      height,
      x,
      y,
      placeholderText,
      placeholderTextFont,
      placeholderTextFillStyle,
      placeholderTextSize,
      name,
      group,
    };

    return pool.query(
      'UPDATE component_data SET data = jsonb_insert(data, \'{texts,-1}\', $1::jsonb) WHERE data->>\'id\' = $2 RETURNING data',
      [JSON.stringify(newText), parentId]
    )
      .then(res => {
        if (res && res.rows && res.rows.length > 0) {
          const updatedData = res.rows[0].data;
          if (updatedData.texts && updatedData.texts.length) {
            return updatedData.buttons[updatedData.texts.length - 1]; // Returns the last button which is the newly added one.
          } else {
            console.error('No texts found or texts array is empty:', updatedData);
            return null; // This might not be ideal; you could throw an error or handle it differently.
          }
        } else {
          console.error('Unexpected database response:', res);
          return null;
        }
      })
      .catch(e => {
        console.error(e.stack);
        throw new Error('Database error');
      });
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

  // Update an existing button's properties by its ID
  updateButton: async ({ id, ...updates }) => {
    // Get the component that contains the button
    const component = await pool.query(
      'SELECT data FROM component_data WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(data-> \'buttons\') element WHERE element->>\'id\' = $1)',
      [id]
    );
    // If no component is found, return null
    if (component.rowCount === 0) {
      return null;
    }
    // Make a copy of the component's data
    const updatedComponent = { ...component.rows[0].data };
    // Find the button to be updated and apply the updates
    updatedComponent.buttons = updatedComponent.buttons.map(button => button.id === id ? { ...button, ...updates } : button);
    // Update the component data in the database
    const updated = await pool.query(
      'UPDATE component_data SET data = $1 WHERE data->>\'id\' = $2 RETURNING data',
      [JSON.stringify(updatedComponent), updatedComponent.id]
    );
    return updated.rows[0].data;
  },

  // Update an existing button's properties by its ID
  updateText: async ({ id, ...updates }) => {
    // Get the component that contains the button
    const component = await pool.query(
      'SELECT data FROM component_data WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(data-> \'texts\') element WHERE element->>\'id\' = $1)',
      [id]
    );
    // If no component is found, return null
    if (component.rowCount === 0) {
      return null;
    }
    // Make a copy of the component's data
    const updatedComponent = { ...component.rows[0].data };
    // Find the button to be updated and apply the updates
    updatedComponent.texts = updatedComponent.texts.map(text => text.id === id ? { ...text, ...updates } : text);
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

  // Delete a button by its ID
  deleteButton: async ({ id }) => {
    // Find the component that contains the button with the given ID
    const component = await pool.query(
      'SELECT data FROM component_data WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(data-> \'buttons\') element WHERE element->>\'id\' = $1)',
      [id]
    );
    // If no component is found, return false
    if (component.rowCount === 0) {
      return false;
    }
    // Make a copy of the component's data
    const updatedComponent = { ...component.rows[0].data };
    // Filter out the button with the specified ID
    updatedComponent.buttons = updatedComponent.buttons.filter(button => button.id !== id);
    // Update the component data in the database
    await pool.query(
      'UPDATE component_data SET data = $1 WHERE data->>\'id\' = $2',
      [JSON.stringify(updatedComponent), updatedComponent.id]
    );
    return true;

  },

  // Delete a button by its ID
  deleteText: async ({ id }) => {
    // Find the component that contains the button with the given ID
    const component = await pool.query(
      'SELECT data FROM component_data WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(data-> \'texts\') element WHERE element->>\'id\' = $1)',
      [id]
    );
    // If no component is found, return false
    if (component.rowCount === 0) {
      return false;
    }
    // Make a copy of the component's data
    const updatedComponent = { ...component.rows[0].data };
    // Filter out the button with the specified ID
    updatedComponent.texts = updatedComponent.texts.filter(text => text.id !== id);
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
