const express = require('express');
const cors = require('cors'); // npm install cors
const app = express();

// Basic CORS
app.use(cors());

// Custom CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'https://mydomain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    credentials: true, // Allow cookies
    maxAge: 86400 // Preflight cache time
};

app.use(cors(corsOptions));

// Manual CORS headers
const customCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

// API routes
app.get('/api/data', (req, res) => {
    res.json({
        message: 'CORS-enabled response',
        origin: req.get('Origin'),
        timestamp: new Date().toISOString()
    });
});

app.listen(3000);