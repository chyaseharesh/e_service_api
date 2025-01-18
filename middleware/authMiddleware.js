import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const authenticate = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from cookies
      const token = req.cookies.token;
      
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Attach the decoded user data to the request object
      req.user = decoded;

      // Check if the user role matches any of the required roles (if provided)
      if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }

      // Proceed to the next middleware or route handler
      next();

    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};
