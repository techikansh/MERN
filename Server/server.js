require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes")
const notesRoutes = require("./routes/notesRoutes")

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);



try {
  mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 8000);
  console.log(`Server running on port ${process.env.PORT}`);
} catch (error) {
  console.log(error);
}

module.exports = app;
