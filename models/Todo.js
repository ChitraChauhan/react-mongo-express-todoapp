var mongoose = require("mongoose");

var TodoSchema = new mongoose.Schema({
  title: String,
  finished: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
