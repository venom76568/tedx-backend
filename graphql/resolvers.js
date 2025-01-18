const Form = require("../models/Form");

const resolvers = {
  Query: {
    getForms: async () => await Form.find(),
  },
  Mutation: {
    createForm: async (_, { createFormInput }) => {
      try {
        const form = new Form(createFormInput);
        const savedForm = await form.save();
        return {
          code: 200,
          message: "Form submitted successfully",
          data: savedForm,
        };
      } catch (err) {
        console.error("Error during form submission:", err);
        return {
          code: 400,
          message: "Form submission failed",
          data: null,
        };
      }
    },
  },
};

module.exports = resolvers;
