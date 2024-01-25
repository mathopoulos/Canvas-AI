// Import the request function from the 'graphql-request' library for making GraphQL requests
import { request } from 'graphql-request';


export const addCanvas = async (name, height, width, top, left) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      addCanvas(
      name: "${name}"
      height: ${height}
      width: ${width}
      top: ${top}
      left: ${left}
      ) {
    id
    name
    height
    width
    top
    left
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addCanvas;
  } catch (error) {
    console.error('Error adding new component:', error);
    return null;
  }
};

export const addGroup = async (parentId, group) => {

    const {height, width, x, y, type, name, borderRadius, align } = group;
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      addGroup(
          parentId: "${parentId}"
          name: "${name}"
          height: ${height}
          width: ${width}
          x: ${x}
          y: ${y}
          type: "${type}"
          borderRadius: ${borderRadius}
          align: "${align}"
      ) {
    id
    name
    height
    width
    x
    y
    type
    borderRadius
    parentId
    align
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addGroup;
  } catch (error) {
    console.error('Error adding new group:', error);
    return null;
  }
};

export const updateCanvasHeight = async (id, height) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      updateCanvas(
      id: "${id}"
      height: ${height}
      ) {
    id
    name
    height
    width
    top
    left
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateCanvas;
  } catch (error) {
    console.error('Error adding new component:', error);
    return null;
  }
};

export const updateCanvasWidth = async (id, width) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      updateCanvas(
      id: "${id}"
      width: ${width}
      ) {
    id
    name
    height
    width
    top
    left
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateCanvas;
  } catch (error) {
    console.error('Error adding updating canvas width:', error);
    return null;
  }
};

export const updateCanvasTop = async (id, top) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      updateCanvas(
      id: "${id}"
      top: ${top}
      ) {
    id
    name
    height
    width
    top
    left
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateCanvas;
  } catch (error) {
    console.error('Error adding new component:', error);
    return null;
  }
};

export const updateCanvasLeft = async (id, left) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      updateCanvas(
      id: "${id}"
      left: ${left}
      ) {
    id
    name
    height
    width
    top
    left
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateCanvas;
  } catch (error) {
    console.error('Error adding new component:', error);
    return null;
  }
};

export const updateCanvasWit = async (id, left) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      updateCanvas(
      id: "${id}"
      left: ${left}
      ) {
    id
    name
    height
    width
    top
    left
  }
  }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateCanvas;
  } catch (error) {
    console.error('Error adding new component:', error);
    return null;
  }
};


// Function to add a new component to the database
export const addNewComponent = async (name) => {
  // GraphQL mutation for adding a new component
  const mutation = `
    mutation {
      addComponent(name: "${name}"
      ) {
    id
    name
  }
}
  `;

  try {
    const response = await request('/graphql', mutation);
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
    const response = await request('/graphql', mutation);
    return response.deleteComponent;
  } catch (error) {
    console.error('Error deleting component:', error);
    return null;
  }
};

// Function to update an existing component in the database
export const updateGroup = async (id, align) => {
  // GraphQL mutation for updating a component
  const mutation = `
    mutation {
      updateGroup(
        id: "${id}", 
        align: "${align}"
      ) {
        id
        align
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateGroup;
  } catch (error) {
    console.error('Error updating group:', error);
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
          placeholderTextFont 
          placeholderTextFillStyle
          placeholderTextSize
          borderSides {
            top
            right
            bottom
            left
          }
          name
          group
        }
                buttons {
        id
        name
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
        group
        }
        texts {
          id
          name
          type
          width
          height
          x
          y
          placeholderText
          placeholderTextFont
          placeholderTextFillStyle
          placeholderTextSize
          group
        }
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateComponent;
  } catch (error) {
    console.error('Error updating component:', error);
    return null;
  }
};

// Function to add a new input to a component in the database
export const addNewInput = async (parentId, input) => {
  // Destructure the input object to get individual fields
  const { id, type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, placeholderTextFont, placeholderTextFillStyle, placeholderTextSize, name, borderSides, group } = input;

  // GraphQL mutation for adding a new input to a component
  const mutation = `
    mutation {
      addInput(
        id: "${id}",
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
        placeholderTextFont: "${placeholderTextFont}" 
        placeholderTextFillStyle: 
        "${placeholderTextFillStyle}"
        placeholderTextSize: ${placeholderTextSize},
        name: "${name}",
        borderSides: {
        top: true,
        right: true,
        bottom: true,
        left: true
      },
      group: "${group}"
      ) {
        id
        type
        height
        x
        y
        borderRadius
        strokeWidth
        strokeColor
        fillStyleColor
        placeholderText
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
        name
        borderSides {
        top
        right
        bottom
        left
      }
      group
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding new input:', error);
    return null;
  }
};

// Function to add a new button to a component in the database
export const addNewButton = async (parentId, button) => {
  // Destructure the button object to get individual fields
  const { type, width, height, x, y, borderRadius, strokeWidth, strokeColor, fillStyleColor, placeholderText, name, borderSides, group } = button;

  // GraphQL mutation for adding a new input to a component
  const mutation = `
    mutation {
      addButton(
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
      group: "${group}"
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
      group
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addButton;
  } catch (error) {
    console.error('Error adding new button:', error);
    return null;
  }
};

// Function to add a new button to a component in the database
export const addNewText = async (parentId, text) => {
  // Destructure the button object to get individual fields
  const { type, width, height, x, y, placeholderText, placeholderTextFont, placeholderTextFillStyle, placeholderTextSize, name, group } = text;

  // GraphQL mutation for adding a new input to a component
  const mutation = `
    mutation {
      addText(
        parentId: "${parentId}", 
        name: "${name}",
        type: "${type}",
        width: ${width},
        height: ${height},
        x: ${x},
        y: ${y},
        placeholderText: "${placeholderText}",
        placeholderTextFont: "${placeholderTextFont}",
        placeholderTextFillStyle: "${placeholderTextFillStyle}",
        placeholderTextSize: ${placeholderTextSize},
        group: "${group}", 
      ) {
        id
          name
          type
          width
          height
          x
          y
          placeholderText
          placeholderTextFont
          placeholderTextFillStyle
          placeholderTextSize
          group
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addText;
  } catch (error) {
    console.error('Error adding text:', error);
    return null;
  }
};

// Function to update an input height 
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update an input height 
export const updateButtonHeight = async (id, height) => {
  // GraphQL mutation for updating the height of an input
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.addButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonWidth = async (id, width) => {
  // GraphQL mutation for updating the width of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonStrokeWidth = async (id, strokeWidth) => {
  // GraphQL mutation for updating the stroke width of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeHolderText
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonStrokeColor = async (id, strokeColor) => {
  // GraphQL mutation for updating the stroke color of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error  updating button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonFillStyleColor = async (id, fillStyleColor) => {
  // GraphQL mutation for updating the fill style color of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonBorderSides = async (id, borderSides) => {
  // GraphQL mutation for updating the border sides of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonBorderRadius = async (id, borderRadius) => {
  // GraphQL mutation for updating the border radius of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the postiton of an button in the database
export const updateButtonPosition = async (id, x, y) => {
  // GraphQL mutation for updating the position of an button
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
    return null;
  }
};

// Function to update the postiton of an button in the database
export const updateTextPosition = async (id, x, y) => {
  // GraphQL mutation for updating the position of an button
  const mutation = `
    mutation {
      updateText(
        id: "${id}",
        x: ${x}, 
        y: ${y}, 
      ) {
        id
        name
        width
        height
        x
        y
        placeholderText
        placeholderTextFont
        placeholderTextFillStyle
        placeholderTextSize
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.updateText;
  } catch (error) {
    console.error('Error updating button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an button in the database
export const updateButtonSize = async (id, height, width) => {
  // GraphQL mutation for updating the size of an input
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
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
    const response = await request('/graphql', mutation);
    return response.deleteInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to delete button
export const deleteButton = async (id) => {
  // GraphQL mutation for deleting an input
  const mutation = `
    mutation {
      deleteButton(
        id: "${id}",
      )
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.deleteButton;
  } catch (error) {
    console.error('Error deleting button:', error);
    return null;
  }
};

// Function to delete button
export const deleteText = async (id) => {
  // GraphQL mutation for deleting an input
  const mutation = `
    mutation {
      deleteText(
        id: "${id}",
      )
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.deleteText;
  } catch (error) {
    console.error('Error deleting button:', error);
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputPlaceholderTextFont = async (id, placeholderTextFont) => {
  // GraphQL mutation for updating the placeholder text of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        placeholderTextFont: "${placeholderTextFont}", 
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateTextPlaceholderTextFont = async (id, placeholderTextFont) => {
  // GraphQL mutation for updating the placeholder text of an input
  const mutation = `
    mutation {
      updateText(
        id: "${id}",
        placeholderTextFont: "${placeholderTextFont}", 
      ) {
        id
          name
          width
          height
          x
          y
          placeholderText
          placeholderTextFont
          placeholderTextFillStyle
          placeholderTextSize
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addText;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateTextPlaceholderText = async (id, placeholderText) => {
  // GraphQL mutation for updating the placeholder text of an input
  const mutation = `
    mutation {
      updateText(
        id: "${id}",
        placeholderText: "${placeholderText}", 
      ) {
        id
          name
          width
          height
          x
          y
          placeholderText
          placeholderTextFont
          placeholderTextFillStyle
          placeholderTextSize
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addText;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputPlaceholderTextSize = async (id, placeholderTextSize) => {
  // GraphQL mutation for updating the placeholder text of an input

  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        placeholderTextSize: ${placeholderTextSize}, 
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateTextPlaceholderTextSize = async (id, placeholderTextSize) => {
  // GraphQL mutation for updating the placeholder text of an input

  const mutation = `
    mutation {
      updateText(
        id: "${id}",
        placeholderTextSize: ${placeholderTextSize}, 
      ) {
        id
          name
          width
          height
          x
          y
          placeholderText
          placeholderTextFont
          placeholderTextFillStyle
          placeholderTextSize
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateTextPlaceholderTextStyle = async (id, placeholderTextFillStyle) => {
  // GraphQL mutation for updating the placeholder text of an input

  const mutation = `
    mutation {
      updateText(
        id: "${id}",
        placeholderTextFillStyle: "${placeholderTextFillStyle}", 
      ) {
        id
          name
          width
          height
          x
          y
          placeholderText
          placeholderTextFont
          placeholderTextFillStyle
          placeholderTextSize
      }
    }
  `;

  try {
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateInputPlaceholderTextFillStyle = async (id, placeholderTextFillStyle) => {
  // GraphQL mutation for updating the placeholder text of an input
  const mutation = `
    mutation {
      updateInput(
        id: "${id}",
        placeholderTextFillStyle: "${placeholderTextFillStyle}", 
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
        placeholderTextFont 
        placeholderTextFillStyle
        placeholderTextSize
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
    const response = await request('/graphql', mutation);
    return response.addInput;
  } catch (error) {
    console.error('Error adding updating input:', error);
    return null;
  }
};

// Function to update the border sides of an input in the database
export const updateButtonText = async (id, placeholderText) => {
  // GraphQL mutation for updating the placeholder text of an input
  const mutation = `
    mutation {
      updateButton(
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
    const response = await request('/graphql', mutation);
    return response.updateButton;
  } catch (error) {
    console.error('Error updating button:', error);
    return null;
  }
};