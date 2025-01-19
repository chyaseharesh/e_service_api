import { PrismaClient } from "@prisma/client";
import { addCategorySchema } from "../utils/validators/categoryValidator.js";

const prisma = new PrismaClient();

// Create a new category
export const addCategory = async (req, res) => {
    const validated = addCategorySchema.safeParse(req.body);
    if (!validated.success) {
        return res.status(400).json({
            error: validated.error.errors.map((e) => ({
                message: e.message,
                field: e.path
            })),
        });
    }

    const { name, description } = req.body;
    try {
        const category = await prisma.category.create({
            data: { name, description },
        });
        res.status(200).json({
            category,
            message: "Category added successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error adding category." });
    }
};

// Get all categories
export const getAll = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching categories" });
    }
};

// Update a category
export const update = async (req, res) => {
    const validated = addCategorySchema.safeParse(req.body);
    if (!validated.success) {
        return res.status(400).json({
            error: validated.error.errors.map((e) => ({
                message: e.message,
                field: e.path
            })),
        });
    }
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await prisma.category.update({
            where: { id },
            data: { name, description },
        });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
            category,
            message: "Category updated successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating category" });
    }
};

// Get single category
export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error fetching category" });
    }
};

// Delete a category
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({ where: { id } });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error deleting category" });
    }
};
