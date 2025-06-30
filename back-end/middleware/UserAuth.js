// middleware/UserAuth.js

import jwt from "jsonwebtoken";

const protection = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with "JWT"
  if (!authHeader || !authHeader.startsWith("JWT")) {
    return res.status(401).json({ message: "Not Authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "Youtube");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default protection;
