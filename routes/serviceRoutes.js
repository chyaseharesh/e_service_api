import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { add, getAll, getByCategory, getOne, remove, update } from '../controllers/serviceController.js';

const router = express.Router();

router.post("/add", authenticate(['ADMIN', 'SUPERADMIN']), add);
router.get("/", getAll);
router.put("/:id", authenticate(['ADMIN', 'SUPERADMIN']), update);
router.get("/:id", getOne);
router.get("/category/:categoryId", getByCategory);
router.delete("/:id", authenticate(['ADMIN', 'SUPERADMIN']), remove);
export default router;
