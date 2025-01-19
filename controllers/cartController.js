import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// add to cart
export const addToCart = async (req, res) => {
    const { serviceId, userId, quantity } = req.body;
    try {
        const existingCartItem = await prisma.cart.findFirst({
            where: {
                userId_serviceId: { userId, serviceId },
            },
        });

        if (existingCartItem) {
            res.status(201).json({
                message: "Service already in cart",
                cart: existingCartItem,
            })
        } else {
            await prisma.cart.create({
                data: { userId, serviceId, quantity },
            });
        }

        res.status(200).json({ message: "Service added to cart" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error adding service to cart" });
        
    }   
}

// get cart
export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await prisma.cart.findMany({
            where: { userId },
            include: {
                service: true,
            },
        });

        res.json(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching cart items" });
    }
}

// update cart item quantity
export const updateCartItemQuantity = async (req, res) => {
    const { quantity } = req.body;
    try {
        const cartId= params.cartId;
        const cartItem = await prisma.cart.update({
            where:{id:cartId},
            data:{quantity},
        });
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        res.status(200).json({ message: "Cart item quantity updated" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error updating cart item quantity" });
        
    }   
}

// remove cart item
export const removeCartItem = async (req, res) => {
    const { userId, serviceId } = req.params;
    try {
        const cartItem = await prisma.cart.findFirst({
            where: {
                userId_serviceId: { userId, serviceId },
            },
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        await prisma.cart.delete({
            where: {
                userId_serviceId: { userId, serviceId },
            },
        });

        res.status(200).json({ message: "Cart item removed" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error removing cart item" });
        
    }   
}
