const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

// Import Middleware
import throwIfError from '../../middleware/throwValidationErrorMiddleware'

// Import Controllers
import * as userController from '../../controller/UserController'

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Related API
 * 
 * /api/v1/user/signup:
 *   post:
 *     tags: [User]
 *     summary: Create New User
 *     description: Create new user in the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The user's email.
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  description: The user's password.
 *                  example: password
 *                bio:
 *                  type: string
 *                  description: The user's bio.
 *                  example: Software Engineer
 *                professionId:
 *                  type: integer
 *                  description: The ID of the user's profession.
 *                  example: 1
 *                interests:
 *                  type: array
 *                  items:
 *                    type: integer
 *                  description: List of interest IDs.
 *                  example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('bio').isString().optional(),
  body('professionId').isInt(),
  body('interests').isArray().optional(),
  throwIfError,
  userController.signup
)
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags: [User]
 *     summary: Login User
 *     description: Login a user and get a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The user's email.
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  description: The user's password.
 *                  example: password
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */   
router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    throwIfError,
    userController.login
  );
  
/**
  * @swagger
  * /api/v1/user/{id}:
  *   put:
  *     tags: [User]
  *     summary: Update User
  *     description: Update an existing user
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description: The user's ID
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *              type: object
  *              properties:
  *                bio:
  *                  type: string
  *                  description: The user's bio.
  *                  example: Software Engineer
  *                professionId:
  *                  type: integer
  *                  description: The ID of the user's profession.
  *                  example: 1
  *                interests:
  *                  type: array
  *                  items:
  *                    type: integer
  *                  description: List of interest IDs.
  *                  example: [1, 2, 3]
  *     responses:
  *       200:
  *         description: User updated
  *       400:
  *         description: Bad Request
  *       404:
  *         description: User not found
  *       500:
  *         description: Internal Server Error
  */
  router.put(
    '/:id',
    body('bio').isString().optional(),
    body('professionId').isInt().optional(),
    body('interests').isArray().optional(),
    throwIfError,
    userController.updateUser
  );
/**
  * @swagger
  * /api/v1/user/{id}:
  *   delete:
  *     tags: [User]
  *     summary: Delete User
  *     description: Delete an existing user
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: integer
  *         description: The user's ID
  *     responses:
  *       204:
  *         description: User deleted
  *       404:
  *         description: User not found
  *       500:
  *         description: Internal Server Error
  */
  router.delete(
    '/:id',
    userController.deleteUser
  );

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags: [User]
 *     summary: Get current user info
 *     description: Get current user info
 *     responses:
 *       200:
 *         description: User info
 */
router.get(
    '/',
    userController.getAuthenticatedUserInfo
  )

export default router