import { PrismaClient, Role, BookingStatus } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password for users
  const hashedPassword = await bcrypt.hash('hary123', 10);

  // Create users
  const superadmin = await prisma.user.create({
    data: {
      email: 'hary@gmail.com',
      password: hashedPassword,
      phone: '1234567890',
      firstName: 'Super',
      lastName: 'Admin',
      role: Role.SUPERADMIN,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      phone: '1234567890',
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      phone: '0987654321',
      firstName: 'John',
      lastName: 'Doe',
      role: Role.USER,
    },
  });

  // Create categories
  const category1 = await prisma.category.create({
    data: {
        name: 'Beauty',
        description: 'Beauty related services',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Wellness',
      description: 'Wellness related services',
    },
  });

  // Create services
  const service1 = await prisma.service.create({
    data: {
      name: 'Haircut',
      description: 'A stylish haircut for men and women',
      price: 20.0,
      duration: 45,
      adminId: admin.id,
      categoryId: category1.id,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: 'Massage',
      description: 'Relaxing full-body massage',
      price: 50.0,
      duration: 60,
      adminId: admin.id,
      categoryId: category2.id,
    },
  });

  // Create slots for services
  const slot1 = await prisma.slot.create({
    data: {
      startTime: new Date('2025-01-19T09:00:00Z'),
      endTime: new Date('2025-01-19T09:45:00Z'),
      serviceId: service1.id,
    },
  });

  const slot2 = await prisma.slot.create({
    data: {
      startTime: new Date('2025-01-19T10:00:00Z'),
      endTime: new Date('2025-01-19T11:00:00Z'),
      serviceId: service2.id,
    },
  });

  // Create bookings
  const booking1 = await prisma.booking.create({
    data: {
      userId: user.id,
      serviceId: service1.id,
      slotId: slot1.id,
      status: BookingStatus.PENDING,
    },
  });

  // Create reviews
  const review1 = await prisma.reviews.create({
    data: {
      userId: user.id,
      rating: 5,
      comment: 'Excellent service!',
      serviceId: service1.id,
    },
  });

  // Add to cart
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      serviceId: service1.id,
      quantity: 2,
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
