const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    res.status(400).json({ error: true, message: "Full Name is required :)" });
  }
  if (!email) {
    res.status(400).json({ error: true, message: "Email is required :)" });
  }
  if (!password) {
    res.status(400).json({ error: true, message: "Password is required :)" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    res.status(400).json({ error: true, message: "User already exists :(" });
  }

  const newUser = new User({ fullName, email, password });
  await newUser.save();

  const newToken = jwt.sign({ newUser }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  res.status(201).json({
    error: false,
    newToken,
    newUser,
    message: "Registered successfully :)",
  });
};

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ error: true, message: "Email is required :)" });
  }
  if (!password) {
    res.status(400).json({ error: true, message: "Password is required :)" });
  }

  const isUser = await User.findOne({ email });
  if (!isUser) {
    res.status(400).json({ error: true, message: "User doesn't exist :(" });
  } else {
    if (isUser.password !== password) {
      res.status(400).json({ error: true, message: "Invalid Credentials :(" });
    }

    const newToken = jwt.sign({ isUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    res.status(201).json({
      error: false,
      newToken,
      email,
      message: "Login successful :)",
    });
  }
}

module.exports = { register, login };
