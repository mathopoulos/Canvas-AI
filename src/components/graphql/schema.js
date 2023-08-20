// Import the necessary function from the "graphql" library to build a GraphQL schema
import { buildSchema } from "graphql";

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    shapes: [Input]
    components: [Component]
    groups: [Group]
    component(id: ID!): Component
    canvas (id: ID!): Canvas
    inputsByComponent(componentId: ID!): [Input]
    buttonsByComponent(componentId: ID!): [Button]
    textsByComponent(componentId: ID!): [Text]
    groupsByComponent(componentId: ID!): [Group]
  }
type Mutation {
    addGroup(parentId: ID!, name: String!, height: Int!, width: Int!, x: Int!, y: Int!, type: String!, borderRadius: Int!): Group
    addComponent(name: String!): Component
    addCanvas(name: String, height: Int, width: Int, top: Int, left: Int): Canvas
    deleteComponent(id: ID!): Boolean
    updateComponent(id: ID!, name: String!): Component
    updateCanvas(id: ID!, name: String, height: Int, width: Int, top: Int, left: Int): Canvas
    addInput(id: ID!, parentId: ID!, type: String!, width: Int!, height: Int!, x: Int!, y: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, placeholderText: String!, placeholderTextFont: String!, placeholderTextFillStyle: String!, placeholderTextSize: Int!, borderSides: BorderSidesInput, name: String!, group: ID): Input
    updateInput(id: ID!, type: String, width: Int, height: Int, x: Int, y: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, placeholderTextFont: String, placeholderTextFillStyle: String, placeholderTextSize: Int, borderSides: BorderSidesInput, name: String): Input
    deleteInput(id: ID!): Boolean
    addButton(parentId: ID!, type: String, x: Int!, y: Int!, width: Int!, height: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, borderSides: BorderSidesInput, name: String!, group: ID): Button
    updateButton(id: ID!, x: Int, y: Int, width: Int, height: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, borderSides: BorderSidesInput, name: String): Button
    deleteButton(id: ID!): Boolean
    addText(parentId: ID!, type: String, x: Int!, y: Int!, width: Int!, height: Int!, placeholderText: String!, placeholderTextFont: String!, placeholderTextFillStyle: String!, placeholderTextSize: Int!, name: String, group: ID): Text
    updateText(id: ID!, type: String, x: Int, y: Int, width: Int, height: Int, placeholderText: String, placeholderTextFont: String, placeholderTextFillStyle: String, placeholderTextSize: Int): Text
    deleteText(id: ID!): Boolean
    syncCode: Status
  }


  type Component {
    id: ID!
    name: String!
    inputs: [Input]
    buttons: [Button]
    texts: [Text]
  }

  type Status {
    status: String!
    message: String
  }
  
  type BorderSides {
    top: Boolean!
    right: Boolean!
    bottom: Boolean!
    left: Boolean!
  }

    input BorderSidesInput {
    top: Boolean!
    right: Boolean!
    bottom: Boolean!
    left: Boolean!
  }
  
  type Input {
    id: ID!
    type: String
    width: Int!
    height: Int!
    x: Int!
    y: Int!
    borderRadius: Int!
    strokeWidth: Int!
    strokeColor: String!
    fillStyleColor: String!
    placeholderText: String!
    placeholderTextFont: String!,  
    placeholderTextFillStyle: String!,
    placeholderTextSize: Int!,
    borderSides: BorderSides
    name: String!
    group: ID
  }

  type Button {
    id: ID!
    type: String
    width: Int!
    height: Int!
    x: Int!
    y: Int!
    borderRadius: Int!
    strokeWidth: Int!
    strokeColor: String!
    fillStyleColor: String!
    placeholderText: String!
    borderSides: BorderSides
    name: String!
    group: ID
  }
  
  type Text {
  id: ID!
  type: String!
  x: Int!
  y: Int!
  width: Int!
  height: Int!
  placeholderText: String!
  placeholderTextFont: String!,
  placeholderTextFillStyle: String,
  placeholderTextSize: Int!
  name: String!
  group: ID
  }

  type Canvas {
  id: ID!
  name: String!
  height: Int!
  width: Int!
  top: Int!
  left: Int!
  }

  type Group {
    id: ID!
    name: String!
    height: Int!
    width: Int!
    x: Int!
    y: Int!
    type: String!
    borderRadius: Int!
    parentId: ID!
  }
`);

// Export the defined schema so it can be used in other parts of the application
export default schema;