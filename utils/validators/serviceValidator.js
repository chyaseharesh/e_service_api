import { z } from 'zod';

// Define the Zod schema for the Service model
export const addServiceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    duration: z.number().int().positive("Duration must be a positive integer"),
    categoryId: z.string().min(1, "Category ID is required"),
});
