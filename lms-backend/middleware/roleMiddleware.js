const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // req.user tabhi exist karega agar authMiddleware pehle call hua ho
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access Denied: You do not have permission",
      });
    }

    next();
  };
};

export default roleMiddleware;