require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./utlities");
const User = require("./models/user.model");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/create-user", async (req, res) => {

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
});


app.post("/login", async (req, res) => {

    const { email, password } = req.body;
    
    if (!email) {
      res.status(400).json({ error: true, message: "Email is required :)" });
    }
    if (!password) {
      res.status(400).json({ error: true, message: "Password is required :)" });
    }
  
    const isUser = await User.findOne({ email });
    if (!isUser) {
      res.status(400).json({ error: true, message: "Invalid Credentials :(" });
    }
    else {
        console.log(isUser);
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
  });



try {
  mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 8000);
  console.log(`Server running on port ${process.env.PORT}`);
} catch (error) {
  console.log(error);
}

module.exports = app;
