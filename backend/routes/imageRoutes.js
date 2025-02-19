const express = require("express");
const multer = require("multer");

const {
  uploadImg,
  getImgs,
  getImg,
  deleteImg,
} = require("../controllers/imgController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadImg);
router.get("/", getImgs);
router.get("/:id", getImg).delete("/:id", deleteImg);

module.exports = router;
