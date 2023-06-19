import { request } from 'graphql-request';

export const addNewInput = async (input) => {
  const { type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, borderSides } = input;
  
  const mutation = `
    mutation {
      addInput(
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

export const updateInputHeight = async (id, height) => {
  
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

export const updateInputWidth = async (id, width) => {
  
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

export const updateInputStrokeWidth = async (id, strokeWidth) => {
  
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