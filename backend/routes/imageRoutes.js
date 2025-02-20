const express = require("express");
const multer = require("multer");

const protect = require("../middlewares/authMiddleware");

const {
  uploadImg,
  getImgs,
  getImg,
  deleteImg,
} = require("../controllers/imgController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("file"), uploadImg);
router.get("/", protect, getImgs);
router.get("/:id", getImg).delete("/:id", protect, deleteImg);

module.exports = router;
