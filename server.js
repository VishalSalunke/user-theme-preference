// third party dependancies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Internal dependancies
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.listen(process.env.PORT || 4444, () => {
    console.log("server has started");
  });
}

startServer();
