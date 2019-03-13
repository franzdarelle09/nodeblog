const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true });
mongoose.connection.on("connected", err => {
  if (err) throw err;
  console.log("Database connected");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  timestamp: String
});

const postModel = mongoose.model("post", postSchema);

app.post("/api/post/new", (req, res) => {
  let payload = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    timestamp: new Date().getTime()
  };

  let newPost = new postModel(payload);
  newPost.save((err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

app.get("/api/posts", (req, res) => {
  postModel.find((err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

app.get("/api/post/:id", (req, res) => {
  postModel.findById(req.params.id, (err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

app.put("/api/post", (req, res) => {
  let id = req.body._id;
  let payload = req.body;
  postModel.findByIdAndUpdate(id, payload, (err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

app.delete("/api/post", (req, res) => {
  let id = req.body._id;
  postModel.deleteOne({ _id: id }, (err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`listening to port ${PORT}`);
});
