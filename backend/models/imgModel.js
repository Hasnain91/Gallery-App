const mongoose = require("mongoose");

const imgSchema = mongoose.Schema(
  {
    name: String,
    public_id: String,
    url: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Images", imgSchema);
