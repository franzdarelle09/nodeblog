const express = require("express");
const router = express.Router();

const postModel = require("../../models/Post");

router.post("/post/new", (req, res) => {
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

router.get("/posts", (req, res) => {
  postModel.find((err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

router.get("/post/:id", (req, res) => {
  postModel.findById(req.params.id, (err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

router.put("/post", (req, res) => {
  let id = req.body._id;
  let payload = req.body;
  postModel.findByIdAndUpdate(id, payload, (err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

router.delete("/post", (req, res) => {
  let id = req.body._id;
  postModel.deleteOne({ _id: id }, (err, data) => {
    if (err) res.status(400).json({ success: false });
    res.json({ success: true, data });
  });
});

module.exports = router;
