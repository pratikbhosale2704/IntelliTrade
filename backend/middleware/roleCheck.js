// backend/middleware/roleCheck.js
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    // Ensure the user is authenticated and a role is available on req.user
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ message: "User not authenticated or role not found." });
    }
    // Check if the user's role matches the required role
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient privileges." });
    }
    next();
  };
};
