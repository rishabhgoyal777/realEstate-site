const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

router.get("/allpost", (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createpost", (req, res) => {
  const { title, body, pic, pic2 } = req.body;
  if (!title || !body || !pic || !pic2) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  const post = new Post({
    title,
    body,
    photo: pic,
    photo2: pic2,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deletepost/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId }).exec((err, post) => {
    if (err || !post) {
      return res.status(422).json({ error: err });
    }
    post
      .remove()
      .then((result) => {
        res.json(result);
        // res.json({ message: "successfully deleted post" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
