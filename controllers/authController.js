import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email or password is incorret!" });
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Set the token as a cookie with HttpOnly, Secure, and SameSite flags
    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript from accessing the token
      secure: process.env.NODE_ENV === "PRODUCTION", // Use secure cookies in production (only sent over HTTPS)
      sameSite: "Strict", // Prevent the cookie from being sent with cross-origin requests
      maxAge: 60 * 60 * 1000, // Set expiration time for the cookie (1 hour in this case)
    });

    // Respond with a success message and user data (optional)
    return res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

  } catch (error) {
    return res.status(500).json({ error: "Error logging in" });
  }
};
