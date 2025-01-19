import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { addCategory, getAll, getOne, remove, update } from '../controllers/categoryController.js';

const router = express.Router();

router.post("/add", authenticate(['ADMIN', 'SUPERADMIN']), addCategory);
router.get("/", getAll);
router.put("/:id", authenticate(['ADMIN', 'SUPERADMIN']), update);
router.get("/:id", getOne);
router.delete("/:id", authenticate(['ADMIN', 'SUPERADMIN']), remove);
export default router;
