const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose Schema
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  affiliation: { type: String, required: true },
  college: { type: String },
  id_type: { type: String, required: true },
  others: { type: String },
});

// Create Mongoose Model
const Form = mongoose.model("Form", formSchema);

// Define GraphQL Schema
const typeDefs = `
  type Form {
    id: ID!
    name: String!
    email: String!
    phone: String!
    affiliation: String!
    college: String
    id_type: String!
    others: String
  }

  input FormInput {
    name: String!
    email: String!
    phone: String!
    affiliation: String!
    college: String
    id_type: String!
    others: String
  }

  type Mutation {
    createForm(formInput: FormInput!): Form!
  }

  type Query {
    getForms: [Form!]!
  }
`;

// Define Resolvers
const resolvers = {
  Query: {
    getForms: async () => {
      try {
        return await Form.find();
      } catch (error) {
        throw new Error("Error fetching forms: " + error.message);
      }
    },
  },
  Mutation: {
    createForm: async (_, { formInput }) => {
      try {
        const newForm = new Form(formInput);
        return await newForm.save();
      } catch (error) {
        throw new Error("Error saving form: " + error.message);
      }
    },
  },
};

// Initialize Apollo Server
async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(
      `Server running at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}

startServer();
