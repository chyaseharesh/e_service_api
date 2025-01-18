import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new user
export const register = async (req, res) => {
  const { firstName, lastName, role, email, phone, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const user = await prisma.user.create({
      data: { firstName, lastName, role, email, phone, password: hashedPassword },
    });

    res.status(200).json({
      user,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

// Get all users (excluding passwords)
export const getUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
