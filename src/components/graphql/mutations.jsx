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


export const updateInputStrokeColor = async (id, strokeColor) => {
  
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


export const updateInputFillStyleColor = async (id, fillStyleColor) => {
  
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

export const updateInputBorderSides = async (id, borderSides) => {
  
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


export const updateInputBorderRadius = async (id, borderRadius) => {
  
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

//updateInputPosition

export const updateInputPosition = async (id, x, y) => {
  
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

export const updateInputSize = async (id, height, width) => {
  
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

//deleteInput

export const deleteInput = async (id) => {
  
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

export const updateInputPlaceholderText = async (id, placeholderText) => {
  
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