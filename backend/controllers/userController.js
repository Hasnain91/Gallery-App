const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate token for Authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Create new User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate Data
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message:
          "A required field is missing, please fill all the required fields",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      return res.status(201).json({
        status: "success",
        data: newUser,
      });
    }
  } catch (error) {
    console.log(`Somethin happened while registering the user: ${error}`);
    return res.status(500).json({
      status: "fail",
      message: `Soemthing Happened: ${error}`,
    });
  }
};

// Authenticate user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both, email and password.",
      });
    }

    //Check if user email exits
    const user = await User.findOne({ email });

    // Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid Email or Password",
      });
    }

    if (user && isMatch) {
      return res.status(200).json({
        status: "success",
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
        },
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      status: "fail",
      message: "Soemthing went wrong. Please try again.",
    });
  }
};

// Get Logged in user
const getUser = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Soemthing Happened",
    });
  }
};

module.exports = { registerUser, loginUser, getUser };
