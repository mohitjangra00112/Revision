const express = require('express');
const session = require('express-session');

const app = express();

// Basic session configuration
app.use(session({
    secret: 'your-secret-key', // Change this in production
    resave: false,             // Don't save session if unmodified
    saveUninitialized: false,  // Don't create session until something stored
    cookie: {
        secure: false,         // Set to true with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.get('/', (req, res) => {
    if (!req.session.views) {
        req.session.views = 0;
    }
    req.session.views++;
    
    res.json({
        message: 'Session demo',
        views: req.session.views,
        sessionId: req.sessionID
    });
});

app.listen(3000, () => {
    console.log('Session server running on port 3000');
});

