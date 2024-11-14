const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Auth - Registers a new user and returns a JWT token
 *     description: Accepts a username and password to register a new user and generate a JWT token for authentication.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successfully registered the user and returned the JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token that can be used for authentication.
 *       500:
 *         description: Error registering the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

router.post('/register', register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Auth - Login an existing user and return a JWT token
 *     description: Accepts a username and password to log in and returns a JWT token for authentication. If credentials are invalid, returns a 401 error.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successfully logged in and returned the JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue (e.g., "Invalid credentials").
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue (e.g., "Error logging in").
 */

router.post('/login', login);

module.exports = router;
