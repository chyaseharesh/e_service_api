import express from 'express';
import { register, getUsers } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected routes (authentication required)
router.get("/get-user", authenticate(['ADMIN','SUPERADMIN']), getUsers);

export default router;
