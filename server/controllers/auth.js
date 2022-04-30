const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const User = require("../models/user.js");
const { generateAccessToken } = require("../routes/authVerify");

// validate user info
const reqisterSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

async function register(req, res) {
  const isAlreadyExist = await User.findOne({ email: req.body.email });

  if (isAlreadyExist) {
    res.status(400).send("User with this email already exists");
    return;
  }

  const salt = await bcript.genSalt(10);
  const hashedPassword = await bcript.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const { error } = reqisterSchema.validateAsync(req.body);

    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    } else {
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  const validPassword = await bcript.compare(
    req.body.password,
    user?.password || ""
  );

  if (!user || !validPassword) {
    res.status(400).send({ message: "Email or password incorrect" });
    return;
  }

  try {
    const { error } = await loginSchema.validateAsync(req.body);

    if (error) {
      res.json({ success: false, error: error.details[0].message });
    } else {
      const token = generateAccessToken(user.id);
      res.json({
        success: true,
        accessToken: token,
        user: {
          email: user.email,
          username: user.username,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}

module.exports = {
  register,
  login,
};
