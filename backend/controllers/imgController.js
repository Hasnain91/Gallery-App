const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

const upload = multer({ dest: "uploads/" });

const Img = require("../models/imgModel");

// Upload Image
// POST
// PROTECTED
const uploadImg = async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: uuidv4(),
    });

    const uploadedImg = await Img.create({
      name: req.file.originalname,
      public_id: result.public_id,
      url: result.secure_url,
      user: req.user._id,
    });

    console.log(result);
    res.status(200).json({
      message: "Image Upload Succesful!",
      image: uploadedImg,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// Get Images
// GET
// PROTECTED

const getImgs = async (req, res) => {
  try {
    const images = await Img.find({ user: req.user._id });
    // const images = await Img.find();

    res.status(200).send({
      results: images.length,
      status: "success in try",
      data: {
        images,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail in catch block",
      message: error,
    });
  }
};

// Delete image
const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Img.findById(id);

    //check if image exists
    if (!image) {
      return res.status(404).json({
        status: "fail",
        message: "Image Not Found",
      });
    }

    if (image.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "Not authorized to delete this image.",
      });
    }
    // Delete from cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from db
    await Img.findByIdAndDelete(id);
    // await Img.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail in catch",
      message: "An error occurred while deleting the image.",
      error: error.message,
    });
  }
};

// get single image
const getImg = async (req, res) => {
  try {
    const id = req.params.id;
    const img = await Img.findById(id);

    res.status(200).json({
      status: "Success",
      data: {
        img,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = { uploadImg, getImgs, getImg, deleteImg };
