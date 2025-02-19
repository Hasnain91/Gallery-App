const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUser);

module.exports = router;
