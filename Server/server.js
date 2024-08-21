import express from "express";
import cors from "cors";
import { authenticateToken } from "./utlities.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({ data: "Hello World!" });
});

app.post("/register", async (req, res) => {
  
  const { fullname, email, password } = req.body;
  const isUser = await User.findOne({ email: email });
  
  if (isUser) {
    res.json({
      error: true,
      message: "User already exists!",
    });
  } 
  else {
    const user = new User({
      fullname,
      email,
      password,
    });
    console.log("user not saved yet!")
    await user.save();
    console.log("user saved!")

    const accesToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      user,
      accesToken,
      message: "Registeration Successful!",
    });
  }
});

app.post ("/login", async (req, res) => {

    const {email, password} = req.body;
    const userInfo = await User.findOne({email: email});

    if (!userInfo) {
        res.status(400).json({
            error: true,
            message: "User not found!"
        });
    }

    // If userInfo found, then compare email and password
    if (userInfo.password === password) {
        const user = {user: userInfo}
        const accesToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "36000m"});

        return res.json({
            error: false,
            message: "Login successful!",
            email,
            accesToken
        })
    }
    else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials!",
            email
        })
    }

})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
      console.log("Server is running...");
    });
  })
  .catch((err) => {
    console.log(process.env.MONGO_URI);
    console.error("Could not connect to MongoDB", err);
  });

export default app;
