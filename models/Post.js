const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  timestamp: String
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
