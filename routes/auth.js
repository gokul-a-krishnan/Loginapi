const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../model/User");
const { validate } = require("../validation//validator");
const ValidationSchema = require("../validation/validation_schema");

router.post("/register", async (req, res) => {
  // input validation
  try {
    validate(req.body, ValidationSchema.registrationSchema);
  } catch (err) {
    return res.status(400).send({
      message: "failed",
      status: 400,
      user: null,
      error: err.message,
    });
  }

  // Check for existing user registration
  const userfromDb = await User.findOne({ email: req.body.email });
  if (userfromDb)
    return res.status(400).send({
      message: "failed",
      status: 400,
      user: null,
      error: "email is already registered",
    });

  // Password hashing
  const salt = await bcrypt.genSalt(parseInt(process.env.round));
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // prep  to write in db
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    // Registration Success
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.jwt_secret, {
      expiresIn: 3600,
    });
    return res.status(200).send({
      message: "Registered successfully",
      status: 200,
      user: {
        name: user.name,
        email: user.email,
        token: token,
      },
      error: null,
    });
  } catch (err) {
    //Database failure
    return res.status(400).send({
      message: "failed",
      status: 400,
      user: null,
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  // input validation
  try {
    validate(req.body, ValidationSchema.loginSchema);
  } catch (err) {
    return res.status(400).send({
      message: "failed",
      status: 400,
      user: null,
      error: err.message,
    });
  }

  // Check for user registration
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      message: "failed",
      status: 400,
      user: null,
      error: "email is not registered",
    });

  // password verification
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass)
    return res.status(400).send({
      message: "failed",
      status: 400,
      user: null,
      error: "Password is incorrect",
    });

  // Logging in
  const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
    expiresIn: 3600,
  });
  return res.send({
    message: "Login success",
    status: 200,
    user: {
      name: user.name,
      email: user.email,
      token: token,
    },
    error: null,
  });
});

module.exports = router;
