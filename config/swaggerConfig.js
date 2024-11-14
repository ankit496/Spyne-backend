// swaggerOptions.js
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Spyne backend',
            version: '1.0.0',
            description: 'API documentation for car management',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Local server
            },
            {
                url: 'https://spyne-backend-7brv.onrender.com', // Production server
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', 
                },
            },
        },
        security: [
            {
                BearerAuth: [], 
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

module.exports = { swaggerOptions };
