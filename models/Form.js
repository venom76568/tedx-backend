const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  affiliation: { type: String, required: true },
  college: { type: String },
  id_type: { type: String, required: true },
  others: { type: String },
});

module.exports = mongoose.model("Form", formSchema);
