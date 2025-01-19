import { PrismaClient } from "@prisma/client";
import { addServiceSchema } from "../utils/validators/serviceValidator.js";

const prisma = new PrismaClient();

// Create a new service
export const add = async (req, res) => {
    const validated = addServiceSchema.safeParse(req.body);
    if (!validated.success) {
        return res.status(400).json({
            error: validated.error.errors.map((e) => ({
                message: e.message,
                field: e.path
            })),
        });
    }

    const { name, description, price, duration, categoryId, adminId } = req.body;
    try {
        const service = await prisma.service.create({
            data: {
                name,
                description,
                price,
                duration,
                adminId,
                categoryId,
            }
        });
        res.status(200).json({
            service,
            message: "Service added successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error adding service." });
    }
};

// Get all services
export const getAll = async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: "Error fetching services" });
    }
};

// Update a service
export const update = async (req, res) => {
    const validated = addServiceSchema.safeParse(req.body);
    if (!validated.success) {
        return res.status(400).json({
            error: validated.error.errors.map((e) => ({
                message: e.message,
                field: e.path
            })),
        });
    }
    const { name, description, price, duration, categoryId } = req.body;

    try {
        const { id } = req.params;
        const service = await prisma.service.update({
            where: { id },
            data: {
                name,
                description,
                price,
                duration,
                categoryId,
            },
        });
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json({
            service,
            message: "Service updated successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error updating service" });
    }
};

// Get single service
export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await prisma.service.findUnique({ where: { id } });
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.json(service);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error fetching service" });
    }
};

// Delete a service
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await prisma.service.delete({ where: { id } });
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json({
            message: "Service deleted successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error deleting service" });
    }
};

// Get services by category
export const getByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const services = await prisma.service.findMany({
            where: { categoryId },
        });
        res.json(services);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error fetching services by category" });
    }
};