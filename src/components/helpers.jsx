// Import the request function from the 'graphql-request' library for making GraphQL requests
import { request } from 'graphql-request';

// Counters to keep track of the number of shapes created
let inputCounter = 1;
let squareCounter = 1;
let circleCounter = 1;

export function isMouseOverGroupShape(shapes, x, y) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.type === 'group') {
      const { x: shapeX, y: shapeY, width, height } = shape;
      if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
        return { result: true, groupId: shape.id };
      }
    }
  }
  return { result: false, groupId: null };
};


// Function to determine which shape (if any) is under the given x, y coordinates
export const findShapeUnderCursor = (shapes, x, y) => {
  // Iterate through the shapes in reverse order (topmost shape first)
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.type === 'square') {
      const { x: shapeX, y: shapeY, size } = shape;
      if (x >= shapeX - size / 2 && x <= shapeX + size / 2 && y >= shapeY - size / 2 && y <= shapeY + size / 2) {
        return i;
      }
    } else if (shape.type === 'circle') {
      const { x: centerX, y: centerY, radius } = shape;
      const dx = x - centerX;
      const dy = y - centerY;
      if (dx * dx + dy * dy <= radius * radius) {
        return i;
      }
    } else if (shape.type === 'input') {
      const { x: shapeX, y: shapeY, width, height } = shape;
      if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
        return i;
      }
    }
    else if (shape.type === 'button') {
      const { x: shapeX, y: shapeY, width, height } = shape;
      if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
        return i;
      }
    } else if (shape.type === 'text') {
      const { x: shapeX, y: shapeY, width, height } = shape;
      if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
        return i;
      }
    } else if (shape.type === 'group') {
      const { x: shapeX, y: shapeY, width, height } = shape;
      if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
        return i;
      }
    }
  }
  // Return null if no shape is found under the cursor
  return null;
};

export function isCursorOverCanvasBorder(canvasRef, e) {
  const rect = canvasRef.current.getBoundingClientRect();
  const { clientX, clientY } = e;
  const buffer = 10;

  const isInsideLeftBorder = clientX >= rect.left - buffer && clientX <= rect.left + buffer;
  const isInsideRightBorder = clientX >= rect.right - buffer && clientX <= rect.right + buffer;
  const isInsideTopBorder = clientY >= rect.top - buffer && clientY <= rect.top + buffer;
  const isInsideBottomBorder = clientY >= rect.bottom - buffer && clientY <= rect.bottom + buffer;

  const isOutsideLeftBorder = clientX < rect.left - buffer || clientX > rect.right + buffer;
  const isOutsideRightBorder = clientX > rect.right + buffer || clientX < rect.left - buffer;
  const isOutsideTopBorder = clientY < rect.top - buffer || clientY > rect.bottom + buffer;
  const isOutsideBottomBorder = clientY > rect.bottom + buffer || clientY < rect.top - buffer;

  return {
    topBorder: isInsideTopBorder || isOutsideTopBorder,
    bottomBorder: isInsideBottomBorder || isOutsideBottomBorder,
    leftBorder: isInsideLeftBorder || isOutsideLeftBorder,
    rightBorder: isInsideRightBorder || isOutsideRightBorder
  };
}

// Function to update the display and position of the resizing box based on the selected shape
export const updateResizingBox = (resizingBoxRef, selectedIndex, shapes) => {
  if (resizingBoxRef.current === null) {
    return;
  }

  const resizingBox = resizingBoxRef.current;

  if (selectedIndex === null) {
    resizingBox.style.display = 'none';
    return;
  }

  const selectedShape = shapes[selectedIndex];

  if (selectedShape.type === 'input') {
    resizingBox.style.display = 'block';
    resizingBox.style.left = `${selectedShape.x}px`;
    resizingBox.style.top = `${selectedShape.y}px`;
    resizingBox.style.width = `${selectedShape.width}px`;
    resizingBox.style.height = `${selectedShape.height}px`;
  } else if (selectedShape.type === 'button') {
    resizingBox.style.display = 'block';
    resizingBox.style.left = `${selectedShape.x}px`;
    resizingBox.style.top = `${selectedShape.y}px`;
    resizingBox.style.width = `${selectedShape.width}px`;
    resizingBox.style.height = `${selectedShape.height}px`;
  } else if (selectedShape.type === 'text') {
    resizingBox.style.display = 'block';
    resizingBox.style.left = `${selectedShape.x}px`;
    resizingBox.style.top = `${selectedShape.y}px`;
    resizingBox.style.width = `${selectedShape.width}px`;
    resizingBox.style.height = `${selectedShape.height}px`;
  }
  else {
    resizingBox.style.display = 'none';
  }
};

// Function to update the cursor style based on its position relative to the resizing box
export const updateCursor = (resizingBoxRef, e) => {
  const resizingBox = resizingBoxRef.current;
  if (resizingBox) {
    const { left, top, width, height } = resizingBox.getBoundingClientRect();
    const buffer = 5;
    const isOnRightEdge = Math.abs(e.clientX - (left + width)) < buffer;
    const isOnLeftEdge = Math.abs(e.clientX - left) < buffer;
    const isOnTopEdge = Math.abs(e.clientY - top) < buffer;
    const isOnBottomEdge = Math.abs(e.clientY - (top + height)) < buffer;
    const isInsideBox = e.clientX > left && e.clientX < left + width && e.clientY > top && e.clientY < top + height;

    if (isOnRightEdge || isOnLeftEdge) {
      document.body.style.cursor = 'ew-resize';
    } else if (isOnTopEdge || isOnBottomEdge) {
      document.body.style.cursor = 'ns-resize';
    } else if (isInsideBox) {
      document.body.style.cursor = 'pointer';
    } else {
      resizingBox.style.cursor = 'default';
    }
  }
};

// Function to create a new shape object based on the given type and position
export const createNewShape = (shapeType, offsetX, offsetY) => {
  const newShape = { x: offsetX, y: offsetY, type: shapeType };
  if (shapeType === 'square') {
    newShape.name = `Square ${squareCounter}`;
    newShape.size = 50;
  } else if (shapeType === 'circle') {
    newShape.name = `Circle ${circleCounter}`;
    newShape.radius = 25;
  } else if (shapeType === 'input') {
    newShape.type = 'input';
    newShape.name = `Input ${inputCounter}`;
    newShape.width = 200;
    newShape.height = 50;
    newShape.borderRadius = 5;
    newShape.placeholderTextFont = 'Arial';
    newShape.placeholderTextFillStyle = 'blue'
    newShape.placeholderTextSize = 14;
    inputCounter++; // Increment the counter for the next input
  }
  else if (shapeType === 'button') {
    newShape.type = 'button';
    newShape.name = `Button ${inputCounter}`;
    newShape.width = 200;
    newShape.height = 50;
    newShape.borderRadius = 5;
    inputCounter++; // Increment the counter for the next input
  } else if (shapeType === 'text') {
    newShape.name = `Text ${inputCounter}`;
    newShape.placeholderTextFont = 'Arial';
    newShape.placeholderTextFillStyle = 'blue'
    newShape.placeholderTextSize = 14;
    newShape.height = 50;
    newShape.width = 200;
    newShape.group = ""
  } else if (shapeType === 'group') {
    newShape.x = 10;
    newShape.y = 10; 
    newShape.type = 'group';
    newShape.name = `Group ${inputCounter}`;
    newShape.width = 300;
    newShape.height = 10;
    newShape.borderRadius = 0;
  }


  return newShape;
};

// Function to update the index values of shapes based on a new order
export const updateShapeIndexes = (shapes, newOrder) => {
  return newOrder.map((newIndex, oldIndex) => {
    const shape = shapes[oldIndex];
    return { ...shape, index: newIndex };
  });
};

// Function to add a new input shape to the database
export const addNewInput = async (input) => {
  const { type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, borderSides, name } = input;

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

// Function to retrieve all input shapes from the database
export const getAllInputs = async () => {
  const query = `
    query {
      shapes {
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
  `;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    console.error('Error getting inputs:', error);
    return null;
  }
};

// Function to update the height of an input shape in the database
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

// Function to update the width of an input shape in the database
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

// Function to synchronize the code with the server
export function syncCodeFunction() {
  // Send a GraphQL mutation request to sync the code
  fetch('https://canvas-v3.alexandrosmatho.repl.co/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation {
        syncCode {
          status
          message
        }
      }
    `,
    }),
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
}
