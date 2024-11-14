// swaggerOptions.js
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'API documentation for your project',
        },
        servers: [
            {
                url: 'https://spyne-backend-7brv.onrender.com', // Replace with your server URL
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files where Swagger comments are added
};

module.exports = {swaggerOptions};
