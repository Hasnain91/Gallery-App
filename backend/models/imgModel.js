const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
  name: String,
  public_id: String,
  url: String,
});

module.exports = mongoose.model("Images", imgSchema);
