// Import the request function from the 'graphql-request' library for making GraphQL requests
import { request } from 'graphql-request';

// Function to add a new component to the database
export const addNewComponent = async (name) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      addComponent(
        name: "${name}", 
      ) {
        id
        name
        inputs {
          id
          type
          width
          height
          x
          y
          borderRadius
          strokeWidth
          strokeColor
          fillStyleColor
          placeholderText
          borderSides {
            top
            right
            bottom
            left
          }
          name
        }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addComponent;
  } catch (error) {
    console.error('Error adding new component:', error);
    return null;
  }
};

// Function to delete a component from the database
export const deleteComponent = async (id) => {
  // GraphQL mutation for deleting a component
  const mutation = `
    mutation {
      deleteComponent(
        id: "${id}", 
      )
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.deleteComponent;
  } catch (error) {
    console.error('Error deleting component:', error);
    return null;
  }
};

// Function to update an existing component in the database
export const updateComponent = async (id, name) => {
  // GraphQL mutation for updating a component
  const mutation = `
    mutation {
      updateComponent(
        id: "${id}", 
        name: "${name}"
      ) {
        id
        name
        inputs {
          id
          type
          width
          height
          x
          y
          borderRadius
          strokeWidth
          strokeColor
          fillStyleColor
          placeholderText
          borderSides {
            top
            right
            bottom
            left
          }
          name
        }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.updateComponent;
  } catch (error) {
    console.error('Error updating component:', error);
    return null;
  }
};

// Function to add a new input to a component in the database
export const addNewInput = async (parentId, input) => {
  // Destructure the input object to get individual fields
  const { type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, name, borderSides} = input;

  // GraphQL mutation for adding a new input to a component
  const mutation = `
    mutation {
      addInput(
        parentId: "${parentId}", 
        type: "${type}", 
        width: ${width}, 
        height: ${height}, 
        x: ${x}, 
        y: ${y}, 
        borderRadius: ${borderRadius}, 
        strokeWidth: ${strokeWidth}, 
        strokeColor: "${strokeColor}", 
        fillStyleColor: "${fillStyleColor}", 
        placeholderText: "${placeholderText}",
        name: "${name}",
        borderSides: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        name
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding new input:', error);
    return null;
  }
};

// Function to delete an input from a component in the database
export const updateInputHeight = async (id, height) => {
  // GraphQL mutation for updating the height of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        height: ${height}, 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputWidth = async (id, width) => {
  // GraphQL mutation for updating the width of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        width: ${width}, 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputStrokeWidth = async (id, strokeWidth) => {
  // GraphQL mutation for updating the stroke width of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        strokeWidth: ${strokeWidth}, 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputStrokeColor = async (id, strokeColor) => {
  // GraphQL mutation for updating the stroke color of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        strokeColor: "${strokeColor}", 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputFillStyleColor = async (id, fillStyleColor) => {
  // GraphQL mutation for updating the fill style color of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        fillStyleColor: "${fillStyleColor}", 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputBorderSides = async (id, borderSides) => {
  // GraphQL mutation for updating the border sides of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        borderSides: {
          top: ${borderSides.top},
          right: ${borderSides.right},
          bottom: ${borderSides.bottom},
          left: ${borderSides.left}
        } 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputBorderRadius = async (id, borderRadius) => {
  // GraphQL mutation for updating the border radius of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        borderRadius: ${borderRadius}, 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputPosition = async (id, x, y) => {
  // GraphQL mutation for updating the position of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        x: ${x}, 
        y: ${y}, 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputSize = async (id, height, width) => {
  // GraphQL mutation for updating the size of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        height: ${height}, 
        width: ${width}, 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const deleteInput = async (id) => {
  // GraphQL mutation for deleting an input
  const mutation = `
    mutation {
      deleteInput(
        id: "${id}",
      )
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.deleteInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputPlaceholderText = async (id, placeholderText) => {
  // GraphQL mutation for updating the placeholder text of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        placeholderText: "${placeholderText}", 
      ) {
        id
        type
        width
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        borderSides {
        top
        right
        bottom
        left
      }
      }
    }
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};