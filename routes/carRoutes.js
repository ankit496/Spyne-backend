const express = require('express');
const { createCar, getAllCars, getCar, updateCar, deleteCar,searchCars } = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
/**
 * @swagger
* /api/cars:
*   post:
*     summary: Create a new car
*     description: This endpoint allows you to create a new car record by uploading images. The images will be uploaded to Cloudinary, and the car details will be saved to the database.
*     tags:
*       - Cars
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 description: The make of the car
*               description:
*                 type: string
*                 description: The model of the car
*               tags:
*                 type: array
*                 items:
*                   type: string
*                 description: Tags for the car (e.g., "SUV", "Electric", etc.)
*               images:
*                 type: array
*                 items:
*                   type: string
*                   format: binary
*                 description: The images of the car to upload (up to 10 images)
*     responses:
*       201:
*         description: Car created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 title:
*                   type: string
*                   description: The make of the car
*                 description:
*                   type: string
*                   description: The model of the car
*                 year:
*                   type: integer
*                   description: The year of the car
*                 images:
*                   type: array
*                   items:
*                     type: string
*                   description: URLs of the uploaded images
*       400:
*         description: Bad request (missing required fields or invalid file type)
*       401:
*         description: Unauthorized (invalid or missing token)
*       500:
*         description: Internal server error
*/

router.post('/', authMiddleware, createCar);
/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Get all cars
 *     description: This endpoint allows you to retrieve all car records. Authentication is required.
 *     tags:
 *       - Cars
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The make of the car
 *                   description:
 *                     type: string
 *                     description: The model of the car
 *                   year:
 *                     type: integer
 *                     description: The year of the car
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: URLs of the uploaded images
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Internal server error
 */

router.get('/', authMiddleware, getAllCars);
/**
 * @swagger
 * /api/cars/search:
 *   get:
 *     summary: Search cars by keyword
 *     description: This endpoint allows you to search cars by a keyword in the title, description, or tags. The search is case-insensitive and matches partial strings.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: The keyword to search for in the title, description, or tags of the car.
 *         schema:
 *           type: string
 *           example: "sedan"
 *     responses:
 *       200:
 *         description: Successfully retrieved cars that match the search keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: The make of the car
 *                   description:
 *                     type: string
 *                     description: The model of the car
 *                   year:
 *                     type: integer
 *                     description: The year of the car
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: URLs of the uploaded images
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue (e.g., "Error searching cars")
 */

router.get('/search',authMiddleware,searchCars)
/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a specific car by its ID
 *     description: This endpoint retrieves the details of a specific car by its unique ID. Requires user authentication via a valid JWT token.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the car to retrieve.
 *         schema:
 *           type: string
 *           example: "63a1d3e4b3e61f5f07d3fdb8"
 *     responses:
 *       200:
 *         description: Successfully retrieved the car details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The make of the car
 *                 description:
 *                   type: string
 *                   description: The model of the car
 *                 year:
 *                   type: integer
 *                   description: The year of the car
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs of the uploaded images
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: Car not found (invalid or non-existent ID)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue (e.g., "Error fetching car")
 */

router.get('/:id', authMiddleware, getCar);
/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Update an existing car's details
 *     description: This endpoint allows you to update the details of a car, including images, title, description, and tags. It also handles deleting images from Cloudinary if they are provided in the `deletedCars` field.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the car to update.
 *         schema:
 *           type: string
 *           example: "63a1d3e4b3e61f5f07d3fdb8"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated make of the car
 *               description:
 *                 type: string
 *                 description: The updated model of the car
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The updated tags of the car
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The new images of the car to upload (up to 10 images)
 *               deletedCars:
 *                 type: string
 *                 description: A JSON array of image URLs to be deleted from Cloudinary
 *                 example: '["https://res.cloudinary.com/yourimage.jpg"]'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs of the updated images
 *       400:
 *         description: Bad request (invalid file types, missing required fields, or malformed `deletedCars` field)
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: Car not found (invalid or non-existent ID)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue (e.g., "Error updating car")
 */

router.put('/:id', authMiddleware, updateCar);
/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car and its associated images
 *     description: This endpoint allows you to delete a car by its ID. It also deletes the images associated with the car from Cloudinary.
 *     tags:
 *       - Cars
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the car to delete.
 *         schema:
 *           type: string
 *           example: "63a1d3e4b3e61f5f07d3fdb8"
 *     responses:
 *       200:
 *         description: Car and associated images deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Car and associated images deleted successfully"
 *       400:
 *         description: Bad request (invalid ID format)
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       404:
 *         description: Car not found (invalid or non-existent ID)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue (e.g., "Error deleting car and images")
 */

router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
