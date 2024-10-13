const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    },
  }),
});

module.exports = { typeDefs, resolvers, schema };
