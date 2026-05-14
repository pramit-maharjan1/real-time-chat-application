const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // get token from headers
    const token = req.headers.authorization;

    // check token exists
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // save decoded data in request
    req.user = decoded;

    // move to next step
    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    });

  }
};

module.exports = authMiddleware;