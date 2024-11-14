const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors=require('cors')
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const {swaggerOptions}=require('./config/swaggerConfig')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dbUrl = process.env.db_url
mongoose.connect(dbUrl)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log('Database connected')
})

const app = express();
app.use(express.json());
app.use(cors("*"))
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);


app.listen(5000, () => (
    console.log("Server started on port", 5000)
))