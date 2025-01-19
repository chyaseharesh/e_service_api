import { z } from "zod";
export const registerSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    role: z.string().min(1, { message: "Role is required" }),
    email: z.string().email("Invalid email address").min(1, { message: "Email is required" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
// Schema for user login
export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Schema for updating user information

// Optional: You can define other validation schemas here as needed, such as for login or updating users
