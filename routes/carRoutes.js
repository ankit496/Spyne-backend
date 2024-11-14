const express = require('express');
const { createCar, getAllCars, getCar, updateCar, deleteCar,searchCars } = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createCar);
router.get('/', authMiddleware, getAllCars);
router.get('/search',authMiddleware,searchCars)
router.get('/:id', authMiddleware, getCar);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
