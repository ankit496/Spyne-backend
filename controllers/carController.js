const Car = require('../models/Car');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const cloudinary = require('cloudinary').v2; 

exports.createCar = [
    upload.array('images', 10),  
    async (req, res) => {
        try {
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'cars',
                });
                imageUrls.push(result.secure_url); 
            }
            const car = new Car({
                ...req.body,  
                images: imageUrls,  
                user: req.userId, 
            });

            await car.save();

            res.status(201).json(car);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
];



exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.userId });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: "Error fetching cars" });
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ error: "Car not found" });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: "Error fetching car" });
    }
};
exports.searchCars = async (req, res) => {
    const  keyword  = req.query.keyword;
    try {
        const cars = await Car.find({
            user: req.userId,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $elemMatch: { $regex: keyword, $options: 'i' } } }
            ]
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Error searching cars' });
    }
};
const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const publicId = fileNameWithExtension.split('.')[0]; 
    return `${parts[parts.length - 2]}/${publicId}`; 
};

exports.updateCar = [
    upload.array('images', 10),
    async (req, res) => {
        try {
            const imageUrls = req.files.map(file => file.path);
            const car = await Car.findOne({ _id: req.params.id, user: req.userId });
            if (!car) {
                return res.status(404).json({ error: 'Car not found' });
            }
            if (imageUrls.length > 0) {
                car.images.push(...imageUrls);
            }

            const deletedCars = JSON.parse(req.body.deletedCars); 
            const imageDeletionPromises= deletedCars.map((image) => {
                const publicId = getPublicIdFromUrl(image);
                car.images = car.images.filter(img => img !== image);
                if (publicId) {
                    return cloudinary.uploader.destroy(publicId);
                }
            });
            await Promise.all(imageDeletionPromises);

            car.title = req.body.title || car.title;
            car.description = req.body.description || car.description;
            car.tags = req.body.tags || car.tags;

            await car.save();
            res.status(200).json(car);
        } catch (error) {
            res.status(500).json({ error: 'Error updating car' });
        }
    }
];


exports.deleteCar = async (req, res) => {
    try {
        
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ error: "Car not found" });

        const imageDeletionPromises = car.images.map((image) => {
            return cloudinary.uploader.destroy(getPublicIdFromUrl(image));
        });

        await Promise.all(imageDeletionPromises);

        await Car.findByIdAndDelete(req.params.id);

        res.json({ message: "Car and associated images deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting car and images" });
    }
};

