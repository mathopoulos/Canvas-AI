// Import the necessary function from the "graphql" library to build a GraphQL schema
import { buildSchema } from "graphql";

// Define the GraphQL schema
const schema = buildSchema(`
  type Query {
    shapes: [Input]
    components: [Component]
    component(id: ID!): Component
    inputsByComponent(componentId: ID!): [Input]
    buttonsByComponent(componentId: ID!): [Button]
  }
type Mutation {
    addComponent(name: String!): Component
    deleteComponent(id: ID!): Boolean
    updateComponent(id: ID!, name: String!): Component
    addInput(parentId: ID!, type: String!, width: Int!, height: Int!, x: Int!, y: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, placeholderText: String!, borderSides: BorderSidesInput, name: String!): Input
    updateInput(id: ID!, type: String, width: Int, height: Int, x: Int, y: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, borderSides: BorderSidesInput, name: String): Input
    deleteInput(id: ID!): Boolean
    addButton(parentId: ID!, type: String, x: Int!, y: Int!, width: Int!, height: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, placeholderText: String!, borderSides: BorderSidesInput, name: String!, placeholderText: String!): Button
    updateButton(id: ID!, x: Int, y: Int, width: Int, height: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, borderSides: BorderSidesInput, name: String): Button
    deleteButton(id: ID!): Boolean
    syncCode: Status
  }

  type Component {
    id: ID!
    name: String!
    inputs: [Input]
    buttons: [Button]
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
    borderSides: BorderSides
    name: String!
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
  }
`);

// Export the defined schema so it can be used in other parts of the application
export default schema;