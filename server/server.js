require("dotenv").config();
const express = require("express"); // yarn add express
const { createHandler } = require("graphql-http/lib/use/express");
const path = require("path");
const db = require("./config/connection");
// const routes = require("./routes");
const { schema } = require("./graphql"); // this should be the file path to the index.js after I upadte with the schema.
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql");
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  // if (process.env.NODE_ENV === "production") {
  //   app.use(express.static(path.join(__dirname, "../client/build")));
  // }
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.use("/graphql", expressMiddleware(server));
  // app.use(routes);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

// db.once("open", () => {
//   app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
// });
