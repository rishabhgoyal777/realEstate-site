const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.post("/signup", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(422).json({ error: "please add all details" });
  }
  //   res.json({ message: "successfuly posted" });
  User.findOne({ name: name })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that username" });
      } else {
        bcrypt.hash(password, 12).then((hashedpasssword) => {
          const user = new User({
            name,
            password: hashedpasssword,
          });

          user
            .save()
            .then((user) => {
              res.json({ message: "saved successfuly" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(422).json({ error: "please add name or password" });
  } else {
    User.findOne({ name: name }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "invalid username or password" });
      } else {
        bcrypt
          .compare(password, savedUser.password)
          .then((doMatch) => {
            if (doMatch) {
              // res.json({ message: "signed in successfully" });
              const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
              const { _id, name } = savedUser;
              res.json({
                token,
                user: { _id, name },
              });
            } else {
              return res
                .status(422)
                .json({ error: "invalid username or password" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
});

module.exports = router;
