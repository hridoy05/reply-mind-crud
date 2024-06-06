import { Router } from 'express';
import { body, param } from 'express-validator';
import * as orderController from '../../controller/OrderController';
import throwIfError from '../../middleware/throwValidationErrorMiddleware';

const orderRoutes: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Related API
 * /api/v1/product/orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders
 *     description: Retrieve all orders
 *     responses:
 *       200:
 *         description: Successful response
 */
orderRoutes.get('/orders', orderController.getOrders);

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Related API
 * /api/v1/product/orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get order by ID
 *     description: Retrieve an order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *           example: ef8ea467-2601-4997-b5ac-4678e99afca1
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Order not found
 */
orderRoutes.get('/orders/:id', param('id').isNumeric(), throwIfError, orderController.getOrderById);

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Related API
 * /api/v1/product/order:
 *   post:
 *     tags: [Order]
 *     summary: Create a new order
 *     description: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User ID
 *                 example: 1
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of product IDs
 *                 example: [101, 102, 103]
 *               quantities:
 *                 type: object
 *                 description: Quantities of each product
 *                 example: {"101": 2, "102": 1, "103": 3}
 *               paymentInfo:
 *                 type: object
 *                 description: Payment information
 *                 example: {"paymentMethod": "Credit Card", "billingAddress": "123 Main Street"}
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input data
 */
orderRoutes.post(
  '/order',
  [
    body('userId').isNumeric(),
    body('productIds').isArray(),
    body('quantities').isObject(),
    body('paymentInfo').isObject(),
  ],
  throwIfError,
  orderController.createOrder
);

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Related API
 * /api/v1/product/orders/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Update an existing order
 *     description: Update an existing order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *           example: ef8ea467-2601-4997-b5ac-4678e99afca1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: User ID
 *                 example: 1
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of product IDs
 *                 example: [101, 102, 103]
 *               quantities:
 *                 type: object
 *                 description: Quantities of each product
 *                 example: {"101": 2, "102": 1, "103": 3}
 *               paymentInfo:
 *                 type: object
 *                 description: Payment information
 *                 example: {"paymentMethod": "Credit Card", "billingAddress": "123 Main Street"}
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Order not found
 */
orderRoutes.patch(
  '/orders/:id',
  param('id').isNumeric().exists(),
  body('userId').isNumeric().optional(),
  body('productIds').isArray().optional(),
  body('quantities').isObject().optional(),
  body('paymentInfo').isObject().optional(),
  throwIfError,
  orderController.updateOrder
);

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order Related API
 * /api/v1/product/orders/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete an order
 *     description: Delete an order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *           example: ef8ea467-2601-4997-b5ac-4678e99afca1
 *     responses:
 *       204:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
orderRoutes.delete('/orders/:id', param('id').isNumeric(), throwIfError, orderController.deleteOrder);

export default orderRoutes;
