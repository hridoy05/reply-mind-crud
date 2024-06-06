import { Request, Response } from 'express';
import {prisma} from '../../prisma/prismaDB'

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit // Number of posts to skip
    const orders = await prisma.order.findMany({take: limit,
      skip});
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, productIds, quantities, paymentInfo } = req.body;

    const order = await prisma.order.create({
      data: {
        userId,
        productIds,
        quantities,
        paymentInfo,
      },
    });

   return  res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const { userId, productIds, quantities, paymentInfo } = req.body;

    // Check if the order with the provided ID exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order data
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        userId,
        // Ensure productIds and quantities are arrays before updating
        productIds: Array.isArray(productIds) ? productIds : existingOrder.productIds,
        quantities: typeof quantities === 'object' ? quantities : existingOrder.quantities,
        paymentInfo,
      },
    });

    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);

  try {
    await prisma.order.delete({
      where: { id: orderId },
    });
   return res.status(204).end();
  } catch (error) {
   return res.status(500).json({ error: 'Internal server error' });
  }
};
