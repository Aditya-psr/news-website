const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  image: String,
});

module.exports = mongoose.model("Article", ArticleSchema);
