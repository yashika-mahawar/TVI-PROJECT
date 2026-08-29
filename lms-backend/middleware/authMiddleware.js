import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Authorization header check kar rahe hain
  const authHeader = req.headers.authorization;
  
  // Agar header hi nahi hai, toh error return karo
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // "Bearer <token>" format se sirf token extract kar rahe hain
  const token = authHeader.split(" ")[1];

  try {
    // Token verify kar rahe hain
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // User data ko req.user mein set kar rahe hain
    req.user = decoded; 
    next(); // Agle step par jane ke liye
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;