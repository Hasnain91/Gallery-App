const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

connectDB();

// cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}...`);
});
