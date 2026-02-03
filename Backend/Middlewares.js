
//  Built in middlewares

const express = require('express');
const app = express();

// Parse JSON bodies   // parse the payload of api / api incoding data using post 
app.use(express.json());
// app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies  // parse form data 
app.use(express.urlencoded({ extended: true }));

// Serve static files // from public folder 
app.use(express.static('public'));

// Custom static folder with prefix
app.use('/assets', express.static('assets'));

app.listen(3000);


//// Custom middlewares


// Logger middleware
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Important: call next() to continue
};

// Request timing middleware
const timer = (req, res, next) => {
    req.startTime = Date.now();
    
    // Override res.end to calculate duration
    const originalEnd = res.end;
    res.end = function(...args) {
        const duration = Date.now() - req.startTime;
        console.log(`Request took ${duration}ms`);
        originalEnd.apply(this, args);
    };
    
    next();
};

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token (simplified)
    if (token === 'Bearer valid-token') {
        req.user = { id: 1, name: 'John' };
        next();
    } else {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Apply middleware globally
app.use(logger);
app.use(timer);

// Apply middleware to specific routes
app.get('/public', (req, res) => {
    res.json({ message: 'Public route' });
});

app.get('/protected', authenticate, (req, res) => {
    res.json({ 
        message: 'Protected route',
        user: req.user 
    });
});

app.listen(3000);



//// Error handling and error handler middleware


// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        method: req.method,
        url: req.url
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message
    });
});



