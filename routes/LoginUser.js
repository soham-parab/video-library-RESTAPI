const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { loginValidation } = require("../middlewares/Validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("loginnnnnnn");
});

router.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message).status(401);

  //Email exists?
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    return res.status(400).send("This email does not exist, please register");
  }

  //Is password Correct?
  const validPassword = await bcrypt.compare(
    req.body.password,
    userExists.password
  );

  if (!validPassword) {
    return res.status(400).send("Invalid Password");
  }

  const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({
    token: token,
    userExists: userExists,
  });
});

module.exports = router;
