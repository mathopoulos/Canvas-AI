import { request } from 'graphql-request';

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
    const response = await request('https://canvas-v3.alexandrosmatho.repl.co/graphql', query);
    return response;
  } catch (error) {
    console.error('Error getting inputs:', error);
    return null;
  }
};

export const getAllComponents = async () => {
  const query = `{
  components {
    id
    name
    inputs {
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






