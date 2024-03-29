// Import the request function from the 'graphql-request' library for making GraphQL requests
import { request } from 'graphql-request';

let url = 'https://091c38e0-8a35-4e4a-9896-9cade1fb32f2-00-1l7u3irpf53bq.worf.replit.dev/graphql'; 

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
    const response = await request(url, query);
    return response;
  } catch (error) {
    // Log and return any errors that occur during the request
    console.error('Error getting inputs:', error);
    return null;
  }
};

// Fetch all components from the GraphQL server
export const getGroupsOfComponent = async (componentId) => {
  // Define the GraphQL query to fetch all components and their associated inputs
  const query = `{
  groupsByComponent(componentId: "${componentId}"){
    id
    name
    height
    width
    x
    y
    type
    borderRadius
    parentId
    }
}`;

  try {
    const response = await request(url, query);
    return response;
  } catch (error) {
    console.error('Error getting groups:', error);
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
      group
    }
    buttons {
      id
      type
      name
      group
    }
    texts {
    id
    type
    name
    group
    }
  }
    }
`;

  try {
    const response = await request(url, query);
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
    const response = await request(url, query);
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
    placeholderTextFont, 
    placeholderTextFillStyle,
    placeholderTextSize
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
    const response = await request(url, query);
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
    placeholderText
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
    const response = await request(url, query);
    return response;
  } catch (error) {
    console.error('Error getting buttons:', error);
    return null;
  }
};

// Fetch all buttons associated with a specific component from the GraphQL server
export const getAllTextsOfComponent = async (componentId) => {
  const query = `
    query {
  textsByComponent(componentId: "${componentId}") {
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
    const response = await request(url, query);
    return response;
  } catch (error) {
    console.error('Error getting texts:', error);
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
    const response = await request(url, query);
    return response;
  } catch (error) {
    console.error('Error getting inputs:', error);
    return null;
  }
};

// Fetch a specific component by its ID from the GraphQL server
export const getCanvas = async (id) => {
  const query = `
query {
  canvas(id: "${id}") {
    id
    name
    height
    top
    left
    width
  }
}
  `;

  try {
    const response = await request(url, query);
    return response.canvas;
  } catch (error) {
    console.error('Error getting canvas:', error);
    return null;
  }
};




