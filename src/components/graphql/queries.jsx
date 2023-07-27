// Import the request function from the 'graphql-request' library for making GraphQL requests
import { request } from 'graphql-request';

// Fetch all input shapes from the GraphQL server
export const getAllShapes = async () => {
  
  // Define the GraphQL query to fetch all input shapes
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
    // Execute the GraphQL query and return the response
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    // Log and return any errors that occur during the request
    console.error('Error getting inputs:', error);
    return null;
  }
};

// Fetch all components from the GraphQL server
export const getAllComponents = async () => {
  // Define the GraphQL query to fetch all components and their associated inputs
  const query = `{
  components {
    id
    name
    inputs {
      id
      type
      name
    }
    buttons {
      id
      type
      name
    }
  }
}`;

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    console.error('Error getting components:', error);
    return null;
  }
};

// Fetch only the names and IDs of all components from the GraphQL server
export const getAllComponentsNameAndId = async () => {
  const query = `{
  components {
    id
    name
  }
}`;  

  try {
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    console.error('Error getting components:', error);
    return null;
  }
};  

// Fetch all inputs associated with a specific component from the GraphQL server
export const getAllInputsOfComponent = async (componentId) => {
  const query = `
    query {
  inputsByComponent(componentId: "${componentId}") {
    id
    name
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
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    console.error('Error getting inputs:', error);
    return null;
  }
};

// Fetch all buttons associated with a specific component from the GraphQL server
export const getAllButtonsOfComponent = async (componentId) => {
  const query = `
    query {
  buttonsByComponent(componentId: "${componentId}") {
    id
    name
    type
    width
    height
    x
    y
    borderRadius
    strokeWidth
    strokeColor
    fillStyleColor
    text
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
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    console.error('Error getting buttons:', error);
    return null;
  }
};

// Fetch a specific component by its ID from the GraphQL server
export const getComponent = async (id) => {
  const query = `
query {
  component(id:${id}) {
    id
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






