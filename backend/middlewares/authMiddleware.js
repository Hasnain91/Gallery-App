const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from headers
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      req.user = await User.findById(decodedToken.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          status: "fail",
          message: "User Not Found!",
        });
      }

      next();
    } else {
      return res.status(401).json({
        status: "fail",
        message: "No Token Provided",
      });
    }
  } catch (error) {
    console.log("Auth Error: ", error);
    return res.status(401).json({
      status: "fail",
      message: "Invalid or Expired token",
    });
  }
};

module.exports = protect;
