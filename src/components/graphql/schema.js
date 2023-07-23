import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    shapes: [Input]
    components: [Component]
    component(id: ID!): Component
    inputsByComponent(componentId: ID!): [Input]
  }
type Mutation {
    addComponent(name: String!): Component
    deleteComponent(id: ID!): Boolean
    updateComponent(id: ID!, name: String!): Component
    addInput(parentId: ID!, type: String!, width: Int!, height: Int!, x: Int!, y: Int!, borderRadius: Int!, strokeWidth: Int!, strokeColor: String!, fillStyleColor: String!, placeholderText: String!, borderSides: BorderSidesInput, name: String!): Input
    updateInput(id: ID!, type: String, width: Int, height: Int, x: Int, y: Int, borderRadius: Int, strokeWidth: Int, strokeColor: String, fillStyleColor: String, placeholderText: String, borderSides: BorderSidesInput, name: String): Input
    deleteInput(id: ID!): Boolean
    syncCode: Status
  }

  type Component {
    id: ID!
    name: String!
    inputs: [Input]
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
`);

export default schema;