const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res.status(400).json({ error: true, message: "Full Name is required :)" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required :)" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password is required :)" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({ error: true, message: "User already exists :(" });
  }

  const newUser = new User({ fullName, email, password });
  await newUser.save();

  console.log("newUser", newUser);

  const newToken = jwt.sign({ isUser: newUser }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  return res.status(201).json({
    error: false,
    newToken,
    newUser,
    message: "Registered successfully :)",
  });
};

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) {
     return res.status(400).json({ error: true, message: "Email is required :)" });
  }
  if (!password) {
     return res.status(400).json({ error: true, message: "Password is required :)" });
  }

  const isUser = await User.findOne({ email });
  if (!isUser) {
     return res.status(400).json({ error: true, message: "User doesn't exist :(" });
  } else {
    if (isUser.password !== password) {
       return res.status(400).json({ error: true, message: "Invalid Credentials :(" });
    }

    console.log("isUser", isUser);

    const newToken = jwt.sign({ isUser: isUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

     return res.status(201).json({
      error: false,
      newToken,
      email,
      message: "Login successful :)",
    });
  }
}

async function getUser (req, res) {
  const { isUser } = req.user;
  const fetchedUser = await User.findById(isUser._id);
  
  if (!fetchedUser) {
    return res.status(400).json({error: true, message: "User doesn't exist :("})
  }

  console.log(fetchedUser);

  const user = ({
    fullName: fetchedUser.fullName,
    email: fetchedUser.email,
    _id: fetchedUser._id,
    createdOn: fetchedUser.createdOn
  });
  
  return res.status(200).json({error: false, user});
}

module.exports = { register, login, getUser };
