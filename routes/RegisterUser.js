const express = require("express");
const Joi = require("joi");
const router = express.Router();
const User = require("../models/user.model");
const { registerValidation } = require("../middlewares/validation");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("Register yourself!");
});

router.post("/", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message).status(401);

  //does email exist
  const emailAlreadyExists = await User.findOne({ email: req.body.email });
  if (emailAlreadyExists)
    return res.status(400).send("This email already exists, please log in!");

  //hashpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ User: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
